"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import { type ReactNode, useEffect, useRef } from "react";
import { setScrollLocked } from "@/lib/scroll-lock";

type Props = {
  /** Names the dialog for screen readers. */
  label: string;
  src: string;
  poster: string;
  width?: number;
  height?: number;
  onClose: () => void;
  /** A link or note shown under the video. */
  children?: ReactNode;
};

/**
 * A video over the page. A native modal dialog: focus stays inside, Esc closes it,
 * and the video is only downloaded once someone opens it.
 */
export function VideoDialog({ label, src, poster, width, height, onClose, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
    setScrollLocked(true);
    return () => {
      document.documentElement.style.overflow = "";
      setScrollLocked(false);
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-label={label}
      onClose={onClose}
      // A tap on the dark area around the video closes it.
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      data-lenis-prevent
      data-inverse
      className="m-auto max-h-[100dvh] max-w-[100vw] overflow-visible bg-transparent p-4 text-on-inverse backdrop:bg-black/85"
    >
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          aria-label="Close video"
          onClick={() => dialog.current?.close()}
          className="grid size-11 place-items-center self-end rounded-full bg-on-inverse/15 transition-colors duration-300 hover:bg-on-inverse hover:text-inverse"
        >
          <X size={20} weight="light" />
        </button>
        <video
          src={src}
          poster={poster}
          width={width}
          height={height}
          controls
          autoPlay
          playsInline
          className="h-auto max-h-[calc(100dvh-8rem)] w-auto max-w-full rounded-card bg-black"
        >
          Your browser cannot play this video.
        </video>
        {children}
      </div>
    </dialog>
  );
}
