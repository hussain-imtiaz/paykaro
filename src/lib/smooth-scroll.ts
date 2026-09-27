import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scrolls through Lenis when it is running, so programmatic jumps share its easing. */
export function scrollToTarget(target: HTMLElement | number, { immediate = false, offset = 0 } = {}) {
  const lenis = instance;
  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target, { immediate, offset, force: true });
    return;
  }
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "auto" });
}
