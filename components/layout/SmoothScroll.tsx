"use client";

import { useEffect } from "react";
import { registerScroller } from "@/lib/scroll-lock";

/**
 * Lenis smooth scrolling, skipped for reduced-motion users.
 *
 * Tuned for weight rather than speed: lerp mode (every frame eases a fixed fraction of the
 * remaining distance) tracks a trackpad continuously, where duration mode restarts its
 * easing curve on each wheel event and reads as stepped. The wheel is damped slightly
 * below 1 so a flick travels a little further than it would natively, and touch is left on
 * the platform's own scrolling, which is already smooth and much cheaper on battery.
 *
 * It starts on the frame after mount rather than on an idle callback: waiting up to two
 * seconds meant the first scrolls of a visit felt native and then suddenly changed weight.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let cleanup = () => {};
    let cancelled = false;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.95,
        smoothWheel: true,
        // Native touch scrolling: iOS and Android momentum already feels right, and
        // synthesising it costs a composited frame per touchmove.
        syncTouch: false,
        // Anchor jumps land below the floating header instead of under it.
        anchors: { offset: -112 },
      });

      const unregister = registerScroller(lenis);
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanup = () => {
        unregister();
        lenis.destroy();
      };
    };

    const handle = requestAnimationFrame(start);
    return () => {
      cancelled = true;
      cancelAnimationFrame(handle);
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return null;
}
