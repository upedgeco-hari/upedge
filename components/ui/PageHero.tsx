import { Rise } from "@/components/ui/Rise";

type Props = {
  title: string;
  lead?: string;
};

/** Compact, typographic header for inner pages (light surface, ink text). */
export function PageHero({ title, lead }: Props) {
  return (
    <header className="container-x pb-14 pt-32 sm:pb-20">
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
