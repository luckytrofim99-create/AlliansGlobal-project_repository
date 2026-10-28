"use client";

import { Fragment, useLayoutEffect, type ReactNode, type RefObject } from "react";
import styles from "./JourneyMotion.module.css";

const entrance = "cubic-bezier(0.2, 0.72, 0.22, 1)";

/** Words remain real, selectable, accessible text; layout and line wrapping are
 * native. No duplicate heading or measured character-by-character DOM. */
export function RevealWords({ children }: { children: string }) {
  return children.split(" ").map((word, index) => (
    <Fragment key={`${index}-${word}`}>
      {index > 0 ? " " : null}
      <span className={styles.wordMask}><span data-motion-word>{word}</span></span>
    </Fragment>
  ));
}

export function AccentLine({ wide = false }: { wide?: boolean }) {
  return (
    <span className={`${styles.accent}${wide ? ` ${styles.wide}` : ""}`} aria-hidden="true" data-motion-ink />
  );
}

/** CSS starts from the visible server state; no Motion initial opacity is
 * serialized into fallback HTML. Key changes represent a new editorial item. */
export function ChangingCopy({ children, className, instant }: { children: ReactNode; className: string; instant: boolean }) {
  return <div className={`${className} ${styles.changingCopy}${instant ? ` ${styles.instant}` : ""}`}>{children}</div>;
}

/** One-shot editorial entrances, distinct from continuous scroll transforms.
 * Default HTML is visible. No-JS, restored scroll and keyboard focus remain usable. */
export function useJourneyMotion(root: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const surface = root.current;
    if (!surface) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    let generation = 0;
    let imageTimeout: ReturnType<typeof setTimeout> | undefined;
    const artwork = surface.querySelector<HTMLElement>("[data-hero-art]");
    const finishAll = () => {
      generation++;
      clearTimeout(imageTimeout);
      if (artwork) artwork.style.removeProperty("opacity");
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const setup = () => {
      finishAll();
      if (preference.matches) return;
      const mobile = matchMedia("(max-width: 760px)").matches;
      const play = (element: HTMLElement, keyframes: Keyframe[], duration: number, delay = 0) => {
        const animation = element.animate(keyframes, { duration, delay, easing: element.dataset.motionObject === "press" ? "cubic-bezier(.3,1.5,.5,1)" : element.dataset.motionObject === "drop" ? "cubic-bezier(.24,.68,.26,1)" : entrance, fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => { animations.delete(animation); animation.cancel(); };
      };
      const reveal = (element: HTMLElement) => {
        if (element.dataset.motionDone) return;
        element.dataset.motionDone = "true";
        const words = element.querySelectorAll<HTMLElement>("[data-motion-word]");
        if (words.length) {
          words.forEach((word, index) => play(word, [
            { transform: "translate3d(0, 110%, 0) rotate(2deg)", opacity: 0 },
            { transform: "translate3d(0, 0, 0) rotate(0deg)", opacity: 1 },
          ], mobile ? 350 : 810, Math.min(index * 20, 160)));
        } else if (element.dataset.reveal === "picture") {
          const radius = getComputedStyle(element).borderTopLeftRadius;
          play(element, [
            { clipPath: `inset(14% round ${radius})`, transform: "translate3d(0, 16px, 0) scale(.98)" },
            { clipPath: `inset(0% round ${radius})`, transform: "translate3d(0, 0, 0) scale(1)" },
          ], mobile ? 420 : 600);
        } else {
          play(element, [
            { opacity: 0, transform: `translate3d(0, ${mobile ? 10 : 20}px, 0)` },
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
          ], mobile ? 300 : 450, Number(element.dataset.motionDelay || 0));
        }
      };
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          observer?.unobserve(element);
          if (element.dataset.motionDone) return;
          // Native anchors/deep restoration must never make a user wait for copy.
          if (location.hash && element.getBoundingClientRect().top < 160) return;
          if (element.hasAttribute("data-motion-ink")) {
            element.dataset.motionDone = "true";
            play(element, [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], 500, 120);
          } else reveal(element);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
      surface.querySelectorAll<HTMLElement>("[data-reveal], [data-motion-ink]").forEach((element) => observer?.observe(element));
      // Only the decorative artwork waits for decoding. The offer, CTA and
      // native scrolling are ready immediately. A bounded fallback prevents a
      // stalled image request from keeping the composition hidden indefinitely.
      const run = generation;
      let artworkStarted = false;
      const startArtwork = () => {
        if (artworkStarted) return;
        if (run !== generation || preference.matches) return;
        artworkStarted = true;
        clearTimeout(imageTimeout);
        imageTimeout = undefined;
        artwork?.style.removeProperty("opacity");
        if (artwork && artwork.getBoundingClientRect().bottom <= 0) return;
        surface.querySelectorAll<HTMLElement>("[data-motion-object]").forEach((element) => {
        const kind = element.dataset.motionObject;
        const end = { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)" };
        const recipes: Record<string, { frames: Keyframe[]; desktop: number; phone: number }> = {
          place: { frames: [{ opacity: 0, transform: "translate3d(0, 10px, 0) scale(.985)" }, end], desktop: 400, phone: 310 },
          rise: { frames: [{ opacity: 0, transform: "translate3d(0, 26px, 0) scale(.968)" }, end], desktop: 450, phone: 390 },
          drop: { frames: [{ opacity: 0, transform: "translate3d(14px, -16px, 0) rotate(-2.6deg) scale(.95)" }, { opacity: 1, transform: "translate3d(0, 0, 0) rotate(.8deg) scale(1.008)", offset: .64 }, end], desktop: 470, phone: 390 },
          press: { frames: [{ opacity: 0, transform: "scale(.84)" }, end], desktop: 380, phone: 280 },
          write: { frames: [{ opacity: 0, transform: "translate3d(-5px, 4px, 0)" }, end], desktop: 340, phone: 260 },
        };
        const recipe = recipes[kind || "place"] || recipes.place;
        play(element, recipe.frames, mobile ? recipe.phone : recipe.desktop, Number(element.dataset.motionDelay || 180));
      });
      };
      if (artwork) artwork.style.opacity = "0";
      imageTimeout = setTimeout(startArtwork, 2000);
      void Promise.all(Array.from(artwork?.querySelectorAll("img") || []).map((image) => image.decode().catch(() => undefined))).then(() => {
        if (imageTimeout !== undefined) startArtwork();
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      // A keyboard user can focus below an arriving surface immediately.
      const parent = event.target.closest<HTMLElement>("[data-reveal]");
      if (!parent) return;
      parent.dataset.motionDone = "true";
      observer?.unobserve(parent);
      parent.querySelectorAll<HTMLElement>("[data-reveal], [data-motion-ink]").forEach((element) => {
        element.dataset.motionDone = "true";
        observer?.unobserve(element);
      });
      parent.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    };
    setup();
    preference.addEventListener("change", setup);
    surface.addEventListener("focusin", onFocus);
    return () => {
      finishAll();
      preference.removeEventListener("change", setup);
      surface.removeEventListener("focusin", onFocus);
    };
  }, [root]);
}
