import { BackLink } from "@/components/ui/BackLink";
import { Rise } from "@/components/ui/Rise";

type Props = {
  title: string;
  lead?: string;
  /** Route back to this page's index, for detail pages. */
  back?: { href: string; label: string };
};

/** Compact, typographic header for inner pages (light surface, ink text). */
export function PageHero({ title, lead, back }: Props) {
  return (
    <header className="container-x pb-16 pt-32 sm:pb-24">
      <Rise className="mb-8">
        {back ? <BackLink href={back.href}>{back.label}</BackLink> : <span className="block h-px w-9 bg-accent" aria-hidden="true" />}
      </Rise>
      <Rise>
        <h1 className="display-1 max-w-5xl text-balance">{title}</h1>
      </Rise>
      {lead && (
        <Rise delay={0.1} className="mt-8">
          <p className="lead">{lead}</p>
        </Rise>
      )}
    </header>
  );
}
