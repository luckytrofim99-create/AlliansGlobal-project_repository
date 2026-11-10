"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import styles from "./HeroArchitecture.module.css";
import { tx, useAllianceLocale } from "@/components/alliance/AllianceLocale";

export default function HeroArchitecture({ progress, reduced, narrow }: {
  progress: MotionValue<number>;
  reduced: boolean;
  narrow: boolean;
}) {
  const { locale } = useAllianceLocale();
  const y = useTransform(progress, [0, 1], [0, narrow ? -12 : -30]);
  return (
    <div className={styles.stage} data-hero-art>
      <div className={styles.arch} data-motion-object="place" data-motion-delay="180">
        <motion.div className={styles.photo} style={reduced ? undefined : { y }}>
          <Image src="/images/hero-arch.jpg" alt={tx(locale, "Вид на Рим через светлую каменную арку")} fill priority sizes="(max-width: 760px) 90vw, 44vw" />
        </motion.div>
        <div className={styles.shade} />
      </div>
    </div>
  );
}
