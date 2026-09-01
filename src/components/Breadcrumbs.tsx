import { Link } from "@tanstack/react-router";
import type { Crumb } from "@/lib/seo";

/**
 * The visible breadcrumb trail.
 *
 * This renders markup only. Breadcrumb JSON-LD is emitted once per route
 * through breadcrumbJsonLd() in the route head (see src/lib/seo.ts), which is
 * the single source of that structured data — so a page can never emit two
 * BreadcrumbList blocks, and the current page always gets an absolute `item`.
 *
 * "Home" is prepended automatically; pass the trail below it.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => {
          const isCurrent = i === crumbs.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isCurrent ? (
                <span aria-current="page" className="text-foreground/80">
                  {c.name}
                </span>
              ) : (
                <Link to={c.path} className="hover:text-foreground transition-colors">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
