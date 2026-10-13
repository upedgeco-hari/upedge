import { PageHero } from "@/components/ui/PageHero";

type Section = { heading: string; body: string[] };

/** Shared layout for the privacy policy and terms. */
export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: Section[] }) {
  return (
    <>
      <PageHero title={title} lead={`Last updated: ${updated}`} />
      <div className="container-x pb-28 sm:pb-40">
        <div className="mx-auto max-w-[44rem] space-y-12">
          <p className="rounded-card bg-accent-tint p-5 text-sm text-ink">
            This is a starting template, not legal advice. Have it reviewed by a qualified professional and complete every [BRACKETED] item before launch.
          </p>
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="display-3">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-ink-2">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
