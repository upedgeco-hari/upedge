"use client";

import Image from "next/image";
import { ArrowUpRight, InstagramLogo, Play } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { VideoDialog } from "@/components/media/VideoDialog";

type Props = {
  caption: string;
  /** The reel on Instagram. */
  href: string;
  poster: string;
  /** A video file in public/. When present the card plays it here instead of leaving the site. */
  video?: string;
};

const card =
  "group flex h-full w-full flex-col rounded-card bg-surface p-2 text-left shadow-[inset_0_0_0_1px_var(--line)] transition-colors duration-500 ease-smooth hover:bg-surface-2 sm:p-3";

export function ReelCard({ caption, href, poster, video }: Props) {
  const [open, setOpen] = useState(false);

  const body = (
    <>
      <span className="relative block aspect-[4/5] overflow-hidden rounded-inner">
        {/* Decorative: the caption below names the control. */}
        <Image
          src={poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 24vw, 48vw"
          className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
        />
        {video && (
          <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
            <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-ink shadow-accent transition-transform duration-500 ease-spring group-hover:scale-110">
              <Play size={24} weight="fill" />
            </span>
          </span>
        )}
      </span>
      <span className="block grow px-2 pt-4 text-sm font-medium tracking-tight text-balance sm:text-base">{caption}</span>
      <span className="flex items-center justify-between px-2 pb-2 pt-5 text-sm text-muted">
        <span className="flex items-center gap-2">
          {video ? <Play size={18} weight="light" aria-hidden="true" /> : <InstagramLogo size={20} weight="light" aria-hidden="true" />}
          {video ? "Play video" : "Watch reel"}
        </span>
        {!video && <ArrowUpRight size={18} weight="light" aria-hidden="true" className="transition-transform duration-500 ease-smooth group-hover:-translate-y-px group-hover:translate-x-0.5" />}
      </span>
    </>
  );

  if (!video) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={card}>
        {body}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <>
      <button type="button" className={card} onClick={() => setOpen(true)}>
        {body}
      </button>
      {open && (
        <VideoDialog label={caption} src={video} poster={poster} onClose={() => setOpen(false)}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="link-line inline-block text-sm text-on-inverse">
            View on Instagram
          </a>
        </VideoDialog>
      )}
    </>
  );
}
