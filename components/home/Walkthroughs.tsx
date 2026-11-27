import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { WalkthroughPlayer } from "@/components/projects/WalkthroughPlayer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, walkthroughSlugs } from "@/data/projects";
import { cn } from "@/lib/cn";

/** Animated 3D walkthroughs of designs, each linking to its project. */
export function Walkthroughs() {
  const items = walkthroughSlugs.flatMap((slug) => {
    const p = projects.find((x) => x.slug === slug);
    return p?.walkthrough ? [{ ...p, walkthrough: p.walkthrough }] : [];
  });
  if (!items.length) return null;

  return (
    <section className="section-y edge-top">
      <div className="container-x">
        <SectionHeader eyebrow="3D walkthroughs" title="Walk through it before it is built." lead="See our designs from every side, from daylight to a rainy night." />
        {/* On wide screens the columns follow the videos' shapes (16:9 beside two 9:16), so all three stand the same height. */}
        <ul className="block-gap grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-[3.1605fr_1fr_1fr] lg:gap-x-5">
          {items.map((p, i) => {
            const landscape = p.walkthrough.width > p.walkthrough.height;
            return (
              <Reveal as="li" key={p.slug} delay={i * 0.08} className={cn(landscape && "col-span-2 lg:col-span-1")}>
                <WalkthroughPlayer
                  title={p.title}
                  walkthrough={p.walkthrough}
                  sizes={landscape ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
                />
                <Link href={`/projects/${p.slug}`} className="group mt-3 flex items-start justify-between gap-2 text-sm font-medium tracking-tight sm:text-base">
                  <span className="text-balance">{p.title}</span>
                  <ArrowRight size={18} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 transition-transform duration-500 ease-smooth group-hover:translate-x-1" />
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
