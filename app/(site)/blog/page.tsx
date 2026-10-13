import Link from "next/link";
import { CloudImage } from "@/components/media/CloudImage";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Rise } from "@/components/ui/Rise";
import { posts } from "@/data/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Practical advice on planning, budgeting and building, from the UPEDGE team.",
  path: "/blog",
});

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero title="Notes on building well" lead="Practical guidance on planning, budgeting and building, written for people about to start a project." />
      <section className="container-x pb-28 sm:pb-40">
        <Rise>
          <Link href={`/blog/${lead.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="bezel lg:col-span-7">
              <div className="relative aspect-[16/9] overflow-hidden rounded-inner">
                <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]">
                  <CloudImage media={lead.cover} sizes="(min-width: 1024px) 58vw, 100vw" priority />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm text-muted">
                {lead.category}, {fmt(lead.date)}
              </p>
              <h2 className="display-2 mt-4 text-balance">{lead.title}</h2>
              <p className="lead mt-5">{lead.excerpt}</p>
              <p className="mt-6 font-medium underline decoration-accent decoration-2 underline-offset-8">Read the article</p>
            </div>
          </Link>
        </Rise>

        <ul className="mt-24 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08}>
              <Link href={`/blog/${p.slug}`} className="group block">
                <div className="bezel">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-inner">
                    <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]">
                      <CloudImage media={p.cover} sizes="(min-width: 768px) 46vw, 100vw" />
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted">
                  {p.category}, {fmt(p.date)}
                </p>
                <h2 className="display-3 mt-2 text-balance">{p.title}</h2>
                <p className="mt-3 max-w-[52ch] text-ink-2">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
