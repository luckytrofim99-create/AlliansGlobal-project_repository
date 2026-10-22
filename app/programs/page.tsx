import type { Metadata } from "next";
import { PageCard, PageClosing, PageColumns, PageHero, PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import { programs } from "@/lib/content";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = {
  title: "Ваши задачи",
  description:
    "Спорт, работа, образование, бизнес, семья и удалённая работа. Начните с вашей цели, даже если название программы ещё неизвестно.",
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
        title="Сначала ваша цель. Затем направление."
        intro="Вы можете ещё не знать название нужной программы. Достаточно понимать, какой следующий шаг вы хотите сделать."
        image="/images/education-campus.jpg"
        imageAlt="Кампус в окружении зелени"
      >
        <PageLink href="#explore">Найти свою задачу</PageLink>
      </PageHero>

      <PageSection id="explore" title="Международные планы. Личные причины.">
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

      <PageSection title="Ваш маршрут может соединять несколько целей.">
        <PageReading>
          <p data-reveal>Работа одного человека меняет планы всей семьи. Образование может быть частью спортивной карьеры. Развитие бизнеса — причиной нового образа жизни.</p>
          <p data-reveal>Мы начинаем с целой картины: кто планирует переезд, что уже определено и какие обстоятельства необходимо учесть. Это помогает сформулировать задачу до выбора конкретного основания.</p>
          <p data-reveal>Не все сценарии доступны в каждой стране. Возможные варианты и состав сопровождения уточняются применительно к вашему запросу.</p>
          <PageLink href="/countries" secondary>Изучить направления</PageLink>
        </PageReading>
      </PageSection>

      <PageSection title="До выбора программы — три простых вопроса.">
        <PageColumns>
          <PageCard title="Что вы хотите изменить?" body="Опишите цель своими словами. Не ограничивайте её названием визы или программы, которое встретили при поиске." />
          <PageCard title="Что важно сохранить?" body="Работу, возможность жить вместе с близкими, образовательную траекторию, собственное дело или привычный ритм жизни." />
          <PageCard title="Что уже известно?" body="Приглашение, предполагаемая страна, состав семьи и предыдущие обращения помогают определить отправную точку." />
        </PageColumns>
      </PageSection>
      <PageClosing title="Одна цель может открыть несколько маршрутов." text="Расскажите о ваших планах. Начнём с обстоятельств, которые имеют значение именно для вас." />
    </PageShell>
  );
}
