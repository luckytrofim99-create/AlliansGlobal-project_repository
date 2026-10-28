import type { Metadata } from "next";
import Image from "next/image";
import { PageCard, PageClosing, PageHero, PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import { PagePhotoMotion } from "@/components/pages/PageMotion";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Помощь с визами и переездом. Состав сопровождения и связь Alliance Global с Alliance Sport Group.",
};

const principles = [
  {
    title: "Разбор вашей задачи",
    text: "Уточняем цель поездки, состав семьи и ограничения.",
  },
  {
    title: "Порядок действий",
    text: "Объясняем этапы, документы и действия клиента.",
  },
  {
    title: "Учёт планов семьи",
    text: "Проверяем связь рабочих, учебных и семейных задач.",
  },
  {
    title: "Состав помощи",
    text: "Согласуем задачи команды и участие профильных специалистов.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        title="Помощь с визами и переездом"
        intro="Alliance Global рассматривает вопросы поездки и проживания с учётом работы, учёбы и планов семьи."
        image="/images/office-interior.jpg"
        imageAlt="Светлое пространство для спокойной и сосредоточенной работы"
      >
        <PageLink href="/approach">Как мы работаем</PageLink>
      </PageHero>

      <PageSection id="explore" title="Поездка и переезд для всей семьи">
        <PageReading>
          <p data-reveal>Работа, поступление или спортивное приглашение могут затрагивать документы нескольких членов семьи.</p>
          <p data-reveal>Определяем задачи каждого участника и порядок подготовки.</p>
          <p data-reveal>Объём помощи согласуем после разбора документов.</p>
        </PageReading>
      </PageSection>

      <PageSection title="Что вы согласуете с командой">
        <div className={styles.pair}>
          {principles.map((principle) => <PageCard key={principle.title} title={principle.title} body={principle.text} />)}
        </div>
      </PageSection>

      <PageSection>
        <div className={styles.split}>
          <div className={styles.figure} data-reveal="picture">
            <PagePhotoMotion><Image src="/images/university-campus.jpg" alt="Архитектура университетского кампуса" fill sizes="(min-width: 1000px) 44vw, 90vw" /></PagePhotoMotion>
          </div>
          <div className={styles.copy} data-reveal>
            <h2>Визы для спортивных планов</h2>
            <p>Alliance Global связан с Alliance Sport Group и рассматривает вопросы виз, проживания и переезда.</p>
            <p>Кроме спорта рассматриваем рабочие, учебные, деловые и семейные задачи.</p>
            <p>Спортивную карьеру и миграционные документы рассматриваем отдельно.</p>
            <PageLink href="/programs#sport" quiet>Подготовка к спортивной поездке</PageLink>
          </div>
        </div>
      </PageSection>

      <PageSection title="Уточняйте статус подготовки">
        <PageReading>
          <p data-reveal>Согласуйте ответственных, открытые вопросы и следующее действие на каждом этапе.</p>
          <PageLink href="/approach" secondary>Как мы работаем</PageLink>
        </PageReading>
      </PageSection>
      <PageClosing />
    </PageShell>
  );
}
