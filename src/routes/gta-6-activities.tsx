import { createFileRoute, notFound } from "@tanstack/react-router";
import { LongFormArticle } from "@/components/LongFormArticle";
import { SiteShell } from "@/components/SiteShell";
import { pageByPath } from "@/data/pages";
import { articleHead } from "@/lib/seo";

// pageByPath is gated: this URL 404s until the entry's publishAt has passed.
export const Route = createFileRoute("/gta-6-activities")({
  loader: () => {
    const page = pageByPath("/gta-6-activities");
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) =>
    loaderData
      ? articleHead({
          path: loaderData.path,
          title: loaderData.seoTitle,
          description: loaderData.metaDescription,
          canonicalOverride: loaderData.canonicalOverride,
          crumbs: [{ name: loaderData.title, path: loaderData.path }],
        })
      : { meta: [], links: [] },
  component: PageRoute,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-extrabold">Page not found</h1>
      </div>
    </SiteShell>
  ),
});

function PageRoute() {
  return <LongFormArticle page={Route.useLoaderData()} />;
}
