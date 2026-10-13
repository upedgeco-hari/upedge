"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query. `serverValue` is what the server render (and first hydration pass) assumes. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
