"use client";

import Image from "next/image";
import { Building2, BriefcaseBusiness, GraduationCap, Laptop, Pause, Play, Trophy, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ActionLink } from "@/components/actions/Action";
import { LocalizedTree, tx, useAllianceLocale } from "@/components/alliance/AllianceLocale";
import { RevealWords } from "./JourneyMotion";
import styles from "./HomeInterlude.module.css";

const topics = [
  { label: "Учёба за рубежом", mark: "Учёба", Icon: GraduationCap },
  { label: "Переезд по работе", mark: "Работа", Icon: BriefcaseBusiness },
  { label: "Переезд с семьёй", mark: "Семья", Icon: UsersRound },
  { label: "Переезд для бизнеса", mark: "Бизнес", Icon: Building2 },
  { label: "Переезд для спорта", mark: "Спорт", Icon: Trophy },
  { label: "Переезд с удалённой работой", mark: "Удалённая работа", Icon: Laptop },
];
const checks = [
  { title: "Основания", text: "Условия страны под вашу цель." },
  { title: "Документы", text: "Перечень и порядок подготовки." },
  { title: "Сроки", text: "Этапы и расходы по договору." },
];

export default function HomeInterlude() {
  const { locale } = useAllianceLocale();
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return <LocalizedTree><section className={styles.band} ref={root} aria-labelledby="preparation-title">
    <div className={styles.backdrop} aria-hidden="true"><Image src="/images/hero-arch.jpg" alt="" fill sizes="46vw" /></div>
    <div className={styles.inner}>
      <div className={styles.headingRow}>
        <h2 id="preparation-title" className={styles.heading} data-reveal><RevealWords>Что проверить до подачи</RevealWords></h2>
        <ActionLink href="/approach" variant="quiet" tone="inverse">Порядок подготовки</ActionLink>
      </div>
      <div className={styles.checks}>
        {checks.map((item, index) => <div className={styles.check} data-reveal data-motion-delay={index * 60} key={item.title}>
          <h3 className={styles.label}>{item.title}</h3><p className={styles.detail}>{item.text}</p>
        </div>)}
      </div>
    </div>
    <div className={styles.ticker} data-paused={paused || !inView}>
      <ul className={styles.srOnly} aria-label="Задачи для сопровождения">{topics.map(topic => <li key={topic.label}>{topic.label}</li>)}</ul>
      <div className={styles.tickerWindow} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1, 2].map(copy => <div className={styles.group} key={copy}>{topics.map(({ label, mark, Icon }) => <span className={styles.topic} key={label}><Icon size={30} strokeWidth={1.35} /><span>{mark}</span></span>)}</div>)}
        </div>
      </div>
      <button className={styles.pause} type="button" onClick={() => setPaused(value => !value)} aria-label={tx(locale, paused ? "Продолжить бегущую строку" : "Остановить бегущую строку")} aria-pressed={paused}>
        {paused ? <Play size={17} strokeWidth={1.5} aria-hidden="true" /> : <Pause size={17} strokeWidth={1.5} aria-hidden="true" />}
      </button>
    </div>
  </section></LocalizedTree>;
}
