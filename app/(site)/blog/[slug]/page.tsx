import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/home/CtaBanner";
import { CloudImage } from "@/components/media/CloudImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { getPost, posts } from "@/data/posts";
import { site } from "@/data/site";
import { cloudinaryReady, imageUrl, ogImageUrl } from "@/lib/cloudinary";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const live = !p.cover.placeholder && cloudinaryReady;
  return buildMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
    image: live ? ogImageUrl(p.cover.publicId) : undefined,
    type: "article",
  });
}

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const live = !post.cover.placeholder && cloudinaryReady;

  return (
    <>
      <article>
        <header className="container-x pb-12 pt-32">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm text-muted">
              {post.category}, {fmt(post.date)}, {post.readingMinutes} min read
            </p>
            <h1 className="display-1 mt-5 text-balance">{post.title}</h1>
            <p className="lead mt-6">{post.excerpt}</p>
          </Reveal>
        </header>

        <div className="container-x">
          <div className="bezel mx-auto max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-inner">
              <CloudImage media={post.cover} sizes="(min-width: 1100px) 1000px, 100vw" priority />
            </div>
          </div>
        </div>

        <div className="container-x pb-24 pt-14 sm:pb-32 sm:pt-20">
          <div className="mx-auto max-w-[44rem] space-y-6 text-[1.0625rem] leading-[1.75] text-ink-2">
            {post.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i} className="display-3 pt-6 text-ink">{b.text}</h2>;
              if (b.type === "ul")
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 marker:text-accent-deep">
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </div>
        </div>
      </article>

      <section className="border-t border-line">
        <div className="container-x py-20">
          <h2 className="display-3">Keep reading</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block rounded-card bg-surface p-7 shadow-[inset_0_0_0_1px_var(--line)] transition-colors duration-500 ease-smooth hover:bg-surface-2">
                  <p className="text-sm text-muted">{p.category}</p>
                  <h3 className="display-3 mt-2 text-[1.5rem]!">{p.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/upedge-wordmark.svg") } },
            ...(live ? { image: imageUrl(post.cover.publicId) } : {}),
          },
        ]}
      />
    </>
  );
}
