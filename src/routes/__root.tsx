import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "../components/SiteShell";

function NotFoundComponent() {
  return (
    <SiteShell>
      <div className="container-page py-24 text-center">
        <div className="chip chip-hot mx-auto">404</div>
        <h1 className="mt-4 text-4xl font-extrabold">Signal lost</h1>
        <p className="mt-2 text-muted-foreground">This intel doesn't exist in our database.</p>
        <Link to="/" className="inline-block mt-6 chip chip-neon">
          ← Return to dashboard
        </Link>
      </div>
    </SiteShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <SiteShell>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-extrabold">System fault</h1>
        <p className="mt-2 text-muted-foreground">A module failed to load. Try again.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 chip chip-hot"
        >
          Retry
        </button>
      </div>
    </SiteShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AllThingsGTA6 — GTA 6 News, Wiki, Analysis & Tools" },
      {
        name: "description",
        content:
          "The GTA 6 intelligence platform: real-time news, structured wiki, deep editorial analysis, and interactive tools for Grand Theft Auto VI.",
      },
      { property: "og:title", content: "AllThingsGTA6 — GTA 6 News, Wiki, Analysis & Tools" },
      {
        property: "og:description",
        content:
          "The GTA 6 intelligence platform: real-time news, structured wiki, deep editorial analysis, and interactive tools for Grand Theft Auto VI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AllThingsGTA6" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AllThingsGTA6 — GTA 6 News, Wiki, Analysis & Tools" },
      {
        name: "twitter:description",
        content:
          "The GTA 6 intelligence platform: real-time news, structured wiki, deep editorial analysis, and interactive tools for Grand Theft Auto VI.",
      },
      { property: "og:image", content: "https://allthingsgta6.com/og-cover.png" },
      { name: "twitter:image", content: "https://allthingsgta6.com/og-cover.png" },
    ],
    // The favicon was undetectable because nothing declared one and no icon
    // asset existed to fall back on — a bare /favicon.ico request 404s on this
    // origin. Both files live in /public and are served from the site root.
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
