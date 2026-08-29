import { Link } from "@tanstack/react-router";
import { BreadcrumbJsonLd, type Crumb } from "@/components/StructuredData";

/**
 * Visible breadcrumb trail plus its BreadcrumbList structured data. The two are
 * emitted together so the markup can never drift from the schema.
 *
 * "Home" is prepended automatically; pass the trail below it.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...trail];

  return (
    <>
      <BreadcrumbJsonLd crumbs={crumbs} />
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href ? (
                <Link to={c.href} className="hover:text-foreground transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-foreground/80">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
