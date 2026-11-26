import { existsSync } from "node:fs";
import { join } from "node:path";
import { ReelCard } from "@/components/home/ReelCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { instagramPosts, site } from "@/data/site";

/** public/videos/{name}.mp4, if that file has been added. Checked when the page is built. */
function videoFor(name: string) {
  return existsSync(join(process.cwd(), "public", "videos", `${name}.mp4`)) ? `/videos/${name}.mp4` : undefined;
}

/** Recent reels from the company's Instagram: played here when the video file exists, else linked. */
export function InstagramPosts() {
  const profile = site.socials.find((s) => s.label === "Instagram" && s.href);
  if (!profile) return null;

  return (
    <section className="section-y edge-top">
      <div className="container-x">
        <SectionHeader
          eyebrow="On Instagram"
          title="See the work as it happens."
          lead={`Reels and updates from ${profile.handle}.`}
        />
        <ul className="block-gap grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {instagramPosts.map((post, i) => (
            <Reveal as="li" key={post.href} delay={(i % 4) * 0.08}>
              <ReelCard caption={post.caption} href={post.href} poster={`/images/instagram/${post.image}.jpg`} video={videoFor(post.image)} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="cta-gap">
          <Button href={profile.href} variant="outline">
            Follow {profile.handle}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
