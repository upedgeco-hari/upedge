import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

/**
 * The way out of a detail page.
 *
 * Service, project and article pages are where most visits land from search, and they had
 * no route back up to their index except the main navigation. The disc leans in the
 * direction of travel on hover, and the whole link is a 44px target.
 */
export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 py-1.5 text-sm text-muted transition-colors duration-[var(--dur-2)] hover:text-ink"
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line-strong)] transition-[background-color,color,box-shadow] duration-[var(--dur-2)] ease-smooth group-hover:bg-ink group-hover:text-paper group-hover:shadow-[inset_0_0_0_1px_var(--ink)]"
        aria-hidden="true"
      >
        <ArrowLeft
          size={14}
          weight="light"
          className="transition-transform duration-[var(--dur-3)] ease-spring group-hover:-translate-x-0.5"
        />
      </span>
      {children}
    </Link>
  );
}
