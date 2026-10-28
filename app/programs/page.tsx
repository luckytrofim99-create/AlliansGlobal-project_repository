import type { Metadata } from "next";
import { PageCard, PageClosing, PageColumns, PageHero, PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import SectionConnector from "@/components/SectionConnector";
import ProgramCards from "@/components/pages/ProgramCards";

export const metadata: Metadata = {
  title: "Образование и переезд",
  description:
    "Подготовка к учёбе за рубежом и переезду для работы, спорта, бизнеса и семьи.",
};

export default function ProgramsPage() {
  return (
    <PageShell>
      <PageHero
        title="Документы для учёбы и переезда"
        intro="Учебная виза, приглашение на работу или переезд с семьёй. Выберите цель и узнайте, что подготовить."
        image="/images/education-campus.jpg"
        imageAlt="Выпускники университета на фоне города"
      >
        <PageLink href="#education">Подготовиться к учёбе</PageLink>
        <PageLink href="#explore" quiet>Другие цели переезда</PageLink>
      </PageHero>

      <SectionConnector from="Цель переезда" to="Выбрать программу" href="#explore" />

      <PageSection id="explore">
        <ProgramCards />
      </PageSection>

      <SectionConnector from="Программа" to="Документы семьи" href="#family-preparation" />
      <PageSection id="family-preparation" title="Документы семьи">
        <PageReading>
          <p data-reveal>Работа, учёба и бизнес могут затрагивать нескольких членов семьи.</p>
          <p data-reveal>Укажите участников переезда, их цели и имеющиеся приглашения. Это поможет определить вопросы к документам и основаниям.</p>
          <p data-reveal>Доступные варианты и объём сопровождения проверяются по вашей ситуации.</p>
          <PageLink href="/countries" secondary>Изучить направления</PageLink>
        </PageReading>
      </PageSection>

      <SectionConnector from="Планы семьи" to="Что подготовить" href="#request-preparation" />
      <PageSection id="request-preparation" title="Что нужно для разбора">
        <PageColumns>
          <PageCard title="Какова цель переезда?" body="Укажите работу, учёбу, бизнес или семейную причину переезда." />
          <PageCard title="Какие условия обязательны?" body="Определите требования к работе, образованию и совместному проживанию семьи." />
          <PageCard title="Какие документы уже есть?" body="Подготовьте сведения о приглашениях, семье и предыдущих обращениях." />
        </PageColumns>
      </PageSection>
      <PageClosing title="Основания для переезда" text="Опишите цель и обстоятельства для предварительного разбора." />
    </PageShell>
  );
}
