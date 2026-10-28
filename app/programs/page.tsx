import type { Metadata } from "next";
import { PageCard, PageClosing, PageColumns, PageHero, PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import EducationIntro from "@/components/pages/EducationIntro";
import { programs } from "@/lib/content";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = {
  title: "Образование и переезд",
  description:
    "Подготовка к учёбе за рубежом и переезду для работы, спорта, бизнеса и семьи.",
};

const images: Record<string, string> = {
  sport: "/images/university-campus.jpg",
  work: "/images/office-interior.jpg",
  education: "/images/education-campus.jpg",
  business: "/images/usa-new-york.jpg",
  family: "/images/home-figma/travelers.jpg",
  "digital-nomad": "/images/new-zealand-queenstown.jpg",
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

      <EducationIntro />

      <PageSection id="explore" title="Ещё 5 целей переезда">
        <div className={styles.pair}>
          {programs.filter(program => program.slug !== "education").map((program) => (
            <div className={styles.anchorCard} id={program.slug} key={program.slug}>
              <PageCard
                title={program.title}
                body={program.description}
                image={images[program.slug]}
                href="/consultation"
                action="Разобрать мою ситуацию"
              />
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="Документы семьи">
        <PageReading>
          <p data-reveal>Работа, учёба и бизнес могут затрагивать нескольких членов семьи.</p>
          <p data-reveal>Укажите участников переезда, их цели и имеющиеся приглашения. Это поможет определить вопросы к документам и основаниям.</p>
          <p data-reveal>Доступные варианты и объём сопровождения проверяются по вашей ситуации.</p>
          <PageLink href="/countries" secondary>Изучить направления</PageLink>
        </PageReading>
      </PageSection>

      <PageSection title="Что нужно для разбора">
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
