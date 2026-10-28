"use client";

import Image from "next/image";
import { ActionLink } from "@/components/actions/Action";
import { LocalizedTree } from "@/components/alliance/AllianceLocale";
import { RevealWords } from "@/components/home/JourneyMotion";
import styles from "./EducationIntro.module.css";

export default function EducationIntro() {
  return <LocalizedTree><section id="education" className={styles.intro} aria-labelledby="education-title">
    <div className={styles.photo} data-reveal="picture">
      <Image src="/images/university-campus.jpg" alt="Университетский кампус" fill sizes="(max-width: 760px) 90vw, 45vw" />
    </div>
    <div className={styles.copy}>
      <h2 id="education-title" className={styles.title} data-reveal><RevealWords>Документы для учёбы</RevealWords></h2>
      <p data-reveal>Для школы или университета: приглашение, учебная виза и документы сопровождающих членов семьи.</p>
      <ul className={styles.steps}>
        <li data-reveal><h3>Учебная цель</h3><p>Уровень обучения и предполагаемая страна.</p></li>
        <li data-reveal><h3>Виза и документы</h3><p>Приглашение и порядок подготовки к подаче.</p></li>
        <li data-reveal><h3>Планы семьи</h3><p>Вопросы переезда сопровождающих.</p></li>
      </ul>
      <div className={styles.actions} data-reveal>
        <ActionLink href="/consultation?goal=education">Разобрать планы учёбы</ActionLink>
        <ActionLink href="/journal/uk-student-visa" variant="quiet">Гайд по учебной визе</ActionLink>
      </div>
    </div>
  </section></LocalizedTree>;
}
