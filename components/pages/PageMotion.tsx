"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { useJourneyMotion } from "@/components/home/JourneyMotion";
import styles from "./PageKit.module.css";

function MotionSurface({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useJourneyMotion(root);
  return <div ref={root}>{children}</div>;
}

/** Reuse the homepage's visible-first word and photographic entrances. */
export function PageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <MotionSurface key={pathname}>{children}</MotionSurface>;
}

/** Small photo-only displacement, with native scrolling and a static fallback. */
export function PagePhotoMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start end", "end start"] });
  const transform = useTransform(scrollYProgress, (value) => `translate3d(0, ${(value - .5) * 24}px, 0) scale(1.07)`);
  return <div ref={root} className={styles.photoTrack}><motion.div className={styles.photoInner} style={{ transform }}>{children}</motion.div></div>;
}
