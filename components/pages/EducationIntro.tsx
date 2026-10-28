"use client";

import Image from "next/image";
import { ActionLink } from "@/components/actions/Action";
import { LocalizedTree } from "@/components/alliance/AllianceLocale";
import { RevealWords } from "@/components/home/JourneyMotion";
import styles from "./EducationIntro.module.css";

export default function EducationIntro() {
  return <LocalizedTree><section id="education" className={styles.intro} aria-labelledby="education-title">
    <div className={styles.photo} data-reveal="picture">
      <Image src="/images/university-campus.jpg" alt="Университетский кампус" fill priority sizes="(max-width: 760px) 90vw, 45vw" />
    </div>
    <div className={styles.copy}>
      <ActionLink href="/" variant="quiet" size="compact" className={styles.back}>На главную</ActionLink>
      <h1 id="education-title" className={styles.title} data-reveal><RevealWords>Образование за рубежом</RevealWords></h1>
      <p data-reveal>Школа, университет или продолжение обучения. Учебная цель определяет документы и подготовку к поездке.</p>
      <ul className={styles.steps}>
        <li data-reveal><h2>Учебные планы</h2><p>Уровень обучения и предполагаемая страна.</p></li>
        <li data-reveal><h2>Виза и документы</h2><p>Приглашение и порядок подготовки к подаче.</p></li>
        <li data-reveal><h2>Планы семьи</h2><p>Вопросы переезда сопровождающих.</p></li>
      </ul>
      <div className={styles.actions} data-reveal>
        <ActionLink href="/consultation?goal=education">Обсудить обучение</ActionLink>
        <ActionLink href="#preparation" variant="quiet">Подготовка к учёбе</ActionLink>
      </div>
    </div>
  </section></LocalizedTree>;
}
