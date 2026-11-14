/**
 * Bridge between the smooth scroller and anything that needs the page to hold still
 * (the mobile menu, the project lightbox).
 *
 * Setting `overflow: hidden` on <html> is enough for native scrolling, but Lenis keeps
 * its own virtual scroll position and would carry on moving underneath an open overlay.
 * Whoever opens the overlay calls setScrollLocked(true); the scroller registers itself
 * here so the two never need to import each other.
 */

type Scroller = { start: () => void; stop: () => void };

let scroller: Scroller | null = null;
let locked = false;

/** Called by <SmoothScroll>. Returns the unregister function. */
export function registerScroller(instance: Scroller) {
  scroller = instance;
  if (locked) instance.stop();
  return () => {
    if (scroller === instance) scroller = null;
  };
}

export function setScrollLocked(value: boolean) {
  locked = value;
  if (!scroller) return;
  if (value) scroller.stop();
  else scroller.start();
}
