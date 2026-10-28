import type { Metadata } from "next";
import { PageCard, PageClosing, PageColumns, PageHero, PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import { programs } from "@/lib/content";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = {
  title: "Ваши задачи",
  description:
    "Подготовка к переезду для работы, учёбы, спорта, бизнеса и семьи.",
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
        title="Выберите цель переезда"
        intro="Найдите свою задачу и узнайте вопросы для подготовки."
        image="/images/education-campus.jpg"
        imageAlt="Кампус в окружении зелени"
      >
        <PageLink href="#explore">Найти свою задачу</PageLink>
      </PageHero>

      <PageSection id="explore" title="Найдите свою задачу">
        <div className={styles.pair}>
          {programs.map((program) => (
            <div className={styles.anchorCard} id={program.slug} key={program.slug}>
              <PageCard
                title={program.title}
                body={program.description}
                label={program.tag}
                image={images[program.slug]}
                href="/consultation"
                action="Обсудить мою ситуацию"
              />
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="Учтите планы всей семьи">
        <PageReading>
          <p data-reveal>Работа, учёба и бизнес могут затрагивать нескольких членов семьи.</p>
          <p data-reveal>Укажите участников переезда, их цели и имеющиеся приглашения. Это поможет определить вопросы к документам и основаниям.</p>
          <p data-reveal>Доступные варианты и объём сопровождения проверяются по вашей ситуации.</p>
          <PageLink href="/countries" secondary>Изучить направления</PageLink>
        </PageReading>
      </PageSection>

      <PageSection title="Подготовьте сведения для выбора программы">
        <PageColumns>
          <PageCard title="Какова цель переезда?" body="Укажите работу, учёбу, бизнес или семейную причину переезда." />
          <PageCard title="Какие условия обязательны?" body="Определите требования к работе, образованию и совместному проживанию семьи." />
          <PageCard title="Какие документы уже есть?" body="Подготовьте сведения о приглашениях, семье и предыдущих обращениях." />
        </PageColumns>
      </PageSection>
      <PageClosing title="Проверьте основания для переезда" text="Опишите цель и обстоятельства для предварительного разбора." />
    </PageShell>
  );
}
