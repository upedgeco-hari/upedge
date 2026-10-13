import { ChevronPattern } from "@/components/media/ChevronPattern";
import { cn } from "@/lib/cn";

/**
 * Labelled stand-in for a Cloudinary image that has not been uploaded yet.
 * Says exactly which file belongs here. Centred (or pinned to the top for hero frames) so it never collides with overlay text.
 */
export function Placeholder({ label, className, top }: { label: string; className?: string; top?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image. ${label}`}
      className={cn("absolute inset-0 grid overflow-hidden bg-inverse-2 px-6 text-center text-on-inverse-muted", top ? "items-start justify-items-center pt-32" : "place-items-center", className)}
    >
      <ChevronPattern className="opacity-[0.14]" />
      <p className="relative max-w-[34ch] text-xs leading-snug sm:text-[0.8125rem]">
        <span className="mb-1 block font-medium text-on-inverse">Image placeholder</span>
        {label}
      </p>
    </div>
  );
}
