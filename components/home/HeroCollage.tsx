"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import styles from "./HeroCollage.module.css";

/** Independent Figma layers, not a flattened screenshot. Positions use the
 * supplied 390 × 304.19 mobile composition as their coordinate system. */
export default function HeroCollage({
  progress,
  reduced,
  narrow,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  narrow: boolean;
}) {
  const a = narrow ? 0.55 : 1;
  const mountain = useTransform(progress, [0, 0.8], ["translate(0px, 0px) rotate(-7.73deg)", `translate(${-105 * a}px, ${-52 * a}px) rotate(-18deg)`]);
  const travelers = useTransform(progress, [0, 0.8], ["translate(0px, 0px) rotate(4.3deg)", `translate(${94 * a}px, ${-36 * a}px) rotate(14deg)`]);
  const circle = useTransform(progress, [0, 0.8], ["translate(0px, 0px) rotate(0deg)", `translate(${-24 * a}px, ${-75 * a}px) rotate(-12deg)`]);
  const plane = useTransform(progress, [0, 0.8], ["translate(0px, 0px) rotate(0deg)", `translate(${230 * a}px, ${-170 * a}px) rotate(-7deg)`]);
  const stamp = useTransform(progress, [0, 0.8], ["translate(0px, 0px) rotate(0deg)", `translate(${80 * a}px, ${25 * a}px) rotate(19deg)`]);
  return (
    <div className={styles.stage} aria-hidden="true" data-hero-collage>
      <motion.div className={styles.travelers} style={reduced || narrow ? undefined : { transform: travelers }}>
        <div className={styles.arrival} data-motion-object="drop" data-motion-delay="272">
          <Image src="/images/home-figma/travelers.jpg" alt="" fill priority sizes="(max-width: 760px) 34vw, 300px" />
        </div>
      </motion.div>
      <motion.div className={styles.mountain} style={reduced || narrow ? undefined : { transform: mountain }}>
        <div className={styles.arrival} data-motion-object="rise" data-motion-delay="360">
          <div className={styles.print}><Image src="/images/home-figma/everest.png" alt="" fill priority sizes="(max-width: 760px) 60vw, 535px" /></div>
          <div className={styles.tape}><div className={styles.arrival} data-motion-object="press" data-motion-delay="384"><Image src="/images/home-figma/tape.png" alt="" fill sizes="110px" /></div></div>
          <div className={styles.note}><div className={styles.arrival} data-motion-object="write" data-motion-delay="440"><Image src="/images/home-figma/handwritten-note.png" alt="" fill sizes="160px" /></div></div>
          <div className={styles.lukla}><div className={styles.arrival} data-motion-object="drop" data-motion-delay="400"><Image src="/images/home-figma/lukla-tag.png" alt="" fill sizes="(max-width: 760px) 29vw, 255px" /></div></div>
        </div>
      </motion.div>
      <motion.div className={styles.stamp} style={reduced || narrow ? undefined : { transform: stamp }}>
        <div className={styles.arrival} data-motion-object="press" data-motion-delay="328"><Image src="/images/home-figma/approved-stamp.png" alt="" fill sizes="140px" /></div>
      </motion.div>
      <motion.div className={styles.aircraft} style={reduced || narrow ? undefined : { transform: plane }}>
        <div className={styles.arrival} data-motion-object="place" data-motion-delay="184"><Image src="/images/home-figma/aircraft.png" alt="" fill priority sizes="(max-width: 760px) 51vw, 450px" /></div>
      </motion.div>
      <motion.div className={styles.circle} style={reduced || narrow ? undefined : { transform: circle }}>
        <div className={styles.arrival} data-motion-object="place" data-motion-delay="256">
          <Image src="/images/home-figma/travel-circle.png" alt="" fill priority sizes="(max-width: 760px) 46vw, 405px" />
          <div className={styles.kathmandu}><div className={styles.arrival} data-motion-object="drop" data-motion-delay="288"><Image src="/images/home-figma/kathmandu-tag.png" alt="" fill sizes="(max-width: 760px) 29vw, 255px" /></div></div>
          <span className={styles.travel}><span data-motion-object="write" data-motion-delay="304">TRAVEL</span></span>
        </div>
      </motion.div>
    </div>
  );
}
