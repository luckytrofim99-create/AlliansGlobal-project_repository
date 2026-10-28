import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck2, FileCheck2, Route, UsersRound } from "lucide-react";
import { PageClosing, PageHero, PageLink, PageSection, PageShell } from "@/components/pages/PageKit";
import { PagePhotoMotion } from "@/components/pages/PageMotion";
import { RevealWords } from "@/components/home/JourneyMotion";
import { OverviewCards } from "@/components/pages/OverviewCards";
import styles from "@/components/pages/OverviewPages.module.css";

export const metadata: Metadata = {
  title: "О компании",
  description: "Ваш план переезда: основания, документы, сроки и расходы. Визовые вопросы для учёбы, работы и семьи.",
};

const benefits = [
  { id: "grounds", title: "Основание для переезда", text: "Поймёте, подходит ли вам выбранный путь.", icon: Route },
  { id: "documents", title: "Документы для подачи", text: "Список и порядок подготовки.", icon: FileCheck2 },
  { id: "family", title: "Планы всей семьи", text: "Учёба, работа и документы близких.", icon: UsersRound },
  { id: "terms", title: "Сроки и расходы", text: "Согласованы до начала работы.", icon: CalendarCheck2 },
];

export default function AboutPage() {
  return <PageShell className={styles.page}>
    <PageHero
      title="Ваш план переезда"
      intro="Визовые вопросы и документы для учёбы, работы и жизни за рубежом."
      image="/images/office-interior.jpg"
      imageAlt="Светлый интерьер для обсуждения вашего переезда"
    >
      <PageLink href="/consultation">Обсудить переезд</PageLink>
      <PageLink href="/approach" quiet>Порядок работы</PageLink>
    </PageHero>

    <PageSection title="До подачи вы будете знать">
      <OverviewCards items={benefits} />
    </PageSection>

    <PageSection>
      <div className={styles.story}>
        <div className={styles.photo} data-reveal="picture">
          <PagePhotoMotion><Image src="/images/university-campus.jpg" alt="Университетский кампус в окружении зелени" fill sizes="(max-width: 760px) 90vw, 45vw" /></PagePhotoMotion>
        </div>
        <div>
          <h2 data-reveal><RevealWords>Для учёбы и спорта</RevealWords></h2>
          <p data-reveal>Визовые вопросы по приглашению учебного заведения или клуба.</p>
          <p data-reveal>Alliance Global связан с Alliance Sport Group. Спортивные и миграционные задачи обсуждаются отдельно.</p>
          <div className={styles.storyActions} data-reveal>
            <PageLink href="/education" quiet>Подготовка к учёбе</PageLink>
            <PageLink href="/programs#sport" quiet>Спортивный переезд</PageLink>
          </div>
        </div>
      </div>
    </PageSection>

    <PageClosing title="Обсудите ваш переезд" text="Укажите цель переезда и имеющиеся документы." action="Обсудить переезд" />
  </PageShell>;
}
