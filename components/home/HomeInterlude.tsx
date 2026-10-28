"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Building2, BriefcaseBusiness, CalendarClock, FileCheck2, GraduationCap, Laptop, Route, Trophy, UsersRound } from "lucide-react";
import { ActionLink } from "@/components/actions/Action";
import { LocalizedTree } from "@/components/alliance/AllianceLocale";
import { RevealWords } from "./JourneyMotion";
import styles from "./HomeInterlude.module.css";

const topics = [
  { label: "Учёба за рубежом", Icon: GraduationCap },
  { label: "Переезд по работе", Icon: BriefcaseBusiness },
  { label: "Переезд с семьёй", Icon: UsersRound },
  { label: "Переезд для бизнеса", Icon: Building2 },
  { label: "Переезд для спорта", Icon: Trophy },
  { label: "Переезд с удалённой работой", Icon: Laptop },
];
const checks = [
  { title: "Основания", text: "Условия страны под вашу цель.", href: "/programs", Icon: Route },
  { title: "Документы", text: "Перечень и порядок подготовки.", href: "/services", Icon: FileCheck2 },
  { title: "Сроки", text: "Этапы и расходы по договору.", href: "/approach", Icon: CalendarClock },
];

export default function HomeInterlude() {
  return <LocalizedTree><section className={styles.band} aria-labelledby="preparation-title">
    <div className={styles.inner}>
      <div className={styles.headingRow}>
        <h2 id="preparation-title" className={styles.heading} data-reveal><RevealWords>Что проверить до подачи</RevealWords></h2>
        <ActionLink href="/approach" variant="quiet">Порядок подготовки</ActionLink>
      </div>
      <div className={styles.checks}>
        {checks.map(({ title, text, href, Icon }, index) => <Link href={href} className={`${styles.check} ${index === 1 ? styles.featured : ""}`} data-reveal data-motion-delay={index * 60} key={title}>
          <span className={styles.symbol} aria-hidden="true"><Icon size={28} strokeWidth={1.4} /></span>
          <div className={styles.cardCopy}><h3 className={styles.label}>{title}</h3><p className={styles.detail}>{text}</p></div>
          <span className={styles.cardArrow} aria-hidden="true"><ArrowRight size={18} strokeWidth={1.5} /></span>
        </Link>)}
      </div>
    </div>
    <div className={styles.ticker} style={{ "--ticker-count": topics.length } as CSSProperties}>
      <ul className={styles.srOnly} aria-label="Задачи для сопровождения">{topics.map(topic => <li key={topic.label}>{topic.label}</li>)}</ul>
      <div className={styles.tickerWindow} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1, 2].map(copy => <div className={styles.group} key={copy}>{topics.map(({ label, Icon }) => <span className={styles.topic} key={label}><Icon size={64} strokeWidth={1.2} /></span>)}</div>)}
        </div>
      </div>
    </div>
  </section></LocalizedTree>;
}
