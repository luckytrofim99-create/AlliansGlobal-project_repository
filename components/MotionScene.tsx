"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionScene() {
  const pathname = usePathname();
  useEffect(() => {
    // The homepage owns its scoped scroll scenes and their cleanup.
    if (pathname === "/") return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const desktop = gsap.matchMedia();
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 93%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
        if (document.querySelector(".hero-title")) {
          gsap.from(".hero-title .line-inner", {
            yPercent: 110,
            opacity: 0,
            duration: 1.5,
            stagger: 0.13,
            ease: "power4.out",
            delay: 0.12,
          });
          gsap.from(".hero-arch", {
            clipPath: "inset(12% 0 0 0 round 46% 46% 0 0)",
            opacity: 0,
            duration: 1.7,
            ease: "power3.out",
          });
          gsap.to(".hero-photo", {
            yPercent: 12,
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: ".home-hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          gsap.to(".hero-floating-note", {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: ".home-hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
        desktop.add("(min-width: 900px)", () => {
          const scene = document.querySelector(".journey-scroll");
          if (!scene) return;
          scene.classList.add("is-animated");
          const panels = gsap.utils.toArray<HTMLElement>(".journey-panel");
          const steps = gsap.utils.toArray<HTMLElement>(".journey-step");
          gsap.set(panels.slice(1), { opacity: 0 });
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
            onUpdate() {
              const index = Math.min(
                panels.length - 1,
                Math.max(0, Math.floor(this.time() + 0.35)),
              );
              steps.forEach((step, i) =>
                step.classList.toggle("active", i === index),
              );
            },
          });
          panels.forEach((panel, i) => {
            if (i === 0) return;
            timeline
              .to(
                panels[i - 1],
                { opacity: 0, y: -24, duration: 0.25 },
                i - 0.6,
              )
              .fromTo(
                panel,
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, duration: 0.35 },
                i - 0.35,
              );
          });
          gsap.to(".journey-progress-fill", {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          });
          return () => scene.classList.remove("is-animated");
        });
        gsap.utils.toArray<SVGPathElement>(".draw-line").forEach((path) => {
          gsap.fromTo(
            path,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: path.closest("section"),
                start: "top 75%",
                end: "bottom 70%",
                scrub: 1,
              },
            },
          );
        });
      });
      return () => {
        desktop.revert();
        ctx.revert();
      };
    });
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      clearTimeout(timer);
      media.revert();
    };
  }, [pathname]);
  return null;
}
