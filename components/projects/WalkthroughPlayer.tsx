"use client";

import Image from "next/image";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { VideoDialog } from "@/components/media/VideoDialog";
import type { Walkthrough } from "@/lib/types";

type Props = {
  title: string;
  walkthrough: Walkthrough;
  sizes: string;
};

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

/** The still of a walkthrough, in the video's own shape. Pressing it plays the video. */
export function WalkthroughPlayer({ title, walkthrough, sizes }: Props) {
  const [open, setOpen] = useState(false);
  const { src, poster, width, height, seconds } = walkthrough;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play the ${title} walkthrough, ${seconds} seconds`}
        className="group relative block w-full overflow-hidden rounded-card bg-surface"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image src={poster} alt="" fill sizes={sizes} className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]" />
        <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-ink shadow-accent transition-transform duration-500 ease-spring group-hover:scale-110 sm:size-16">
            <Play size={26} weight="fill" />
          </span>
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs tabular-nums text-white" aria-hidden="true">
          {clock(seconds)}
        </span>
      </button>
      {open && <VideoDialog label={`${title} walkthrough`} src={src} poster={poster} width={width} height={height} onClose={() => setOpen(false)} />}
    </>
  );
}
