"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

/** One entrance per mount. Default/server HTML stays visible and interactive. */
export function useHeroEntrance(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const hero = root.current;
    if (!hero) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    const title = hero.querySelector<HTMLElement>('[data-hero-enter="title"]');
    const description = hero.querySelector<HTMLElement>('[data-hero-enter="description"]');
    const guarantee = hero.querySelector<HTMLElement>('[data-hero-enter="guarantee"]');
    const action = hero.querySelector<HTMLAnchorElement>('[data-hero-enter="action"]');
    if (!title || !description || !action) return;

    const mobile = window.matchMedia("(max-width: 760px)").matches;
    let entrance: gsap.core.Timeline;
    const context = gsap.context(() => {
      entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
      entrance
        .fromTo(title, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, clearProps: "opacity,transform",
        }, 0)
        .fromTo(guarantee ? [description, guarantee] : [description], { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: mobile ? 0.06 : 0.08,
          clearProps: "opacity,transform",
        }, mobile ? 0.12 : 0.2)
        // Fade the link without moving its hit area or overriding its press feedback.
        .fromTo(action, { opacity: 0 }, {
          opacity: 1, duration: mobile ? 0.35 : 0.45, clearProps: "opacity",
        }, mobile ? 0.32 : 0.45);
    }, hero);

    const finish = () => { entrance.progress(1); };
    const onPress = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("a, button")) finish();
    };
    const onPreferenceChange = () => { if (preference.matches) finish(); };
    // No display/visibility/pointer-events lock. Focus and the first press reveal
    // the final state before the native link action, including during its delay.
    hero.addEventListener("focusin", finish);
    hero.addEventListener("pointerdown", onPress, true);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      hero.removeEventListener("focusin", finish);
      hero.removeEventListener("pointerdown", onPress, true);
      preference.removeEventListener("change", onPreferenceChange);
      context.revert();
    };
  }, [root]);
}
