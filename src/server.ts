import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { renderSitemap } from "./lib/sitemap";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/**
 * Scheduled content activates on the clock, not on a deploy. A cached response
 * from before publishAt would therefore outlive the moment it stopped being
 * true — a 404 pinned in front of a page that is now public, or an index that
 * has not noticed today's article.
 *
 * A short shared max-age with stale-while-revalidate keeps the edge useful
 * without letting it hold a pre-publication answer for long: the first request
 * after the window refreshes from the origin, and publishAt boundaries land
 * within it. Immutable hashed assets are untouched by this; they are served
 * straight from .output/public with their own year-long header.
 */
const HTML_CACHE_CONTROL = "public, max-age=0, s-maxage=60, stale-while-revalidate=60";

function withFreshnessHeaders(response: Response): Response {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;
  if (response.headers.has("cache-control")) return response;

  const headers = new Headers(response.headers);
  headers.set("cache-control", HTML_CACHE_CONTROL);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * The sitemap is generated per request from the same accessors the routes use,
 * so a URL enters it at exactly the moment its route starts answering. It was
 * previously a static file written at build time, which meant it could only
 * ever describe the site as it stood at the last deployment.
 */
function sitemapResponse(): Response {
  return new Response(renderSitemap(), {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": HTML_CACHE_CONTROL,
    },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (new URL(request.url).pathname === "/sitemap.xml") {
        return sitemapResponse();
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withFreshnessHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
