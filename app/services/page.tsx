import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import {
  PageCard,
  PageClosing,
  PageHero,
  PageLink,
  PageList,
  PageReading,
  PageSection,
  PageShell,
} from "@/components/pages/PageKit";
import styles from "@/components/pages/ServicePages.module.css";
import { faq, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Визы, проживание, гражданство и иммиграционный консалтинг. От отдельного вопроса к последовательному плану действий.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        title="От отдельного вопроса к целому маршруту."
        intro="Иногда нужен конкретный документ. Иногда — целая стратегия. Сначала определяем вашу задачу, затем согласуем объём сопровождения."
        image="/images/office-interior.jpg"
        imageAlt="Светлый интерьер для спокойного разговора"
      >
        <PageLink href="#explore">Выбрать задачу</PageLink>
        <PageLink href="/consultation" secondary>Обсудить мою ситуацию</PageLink>
      </PageHero>

      <PageSection
        id="explore"
        title="Большие планы. Понятные задачи."
        intro="Выберите вопрос, с которого хотите начать. Если ваша ситуация затрагивает несколько направлений, рассмотрим их вместе."
      >
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <div id={service.slug} key={service.slug} className={styles.serviceAnchor}>
              <PageCard
                title={service.title}
                body={service.description}
                href={`/services/${service.slug}`}
                action="Подробнее о сопровождении"
              >
                <h4>Что рассматриваем</h4>
                <PageList items={service.includes} />
              </PageCard>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="Ясность — часть сопровождения.">
        <PageReading>
          <p>
            У любой задачи есть границы. До начала работы важно понимать, что
            делает команда, какие действия остаются за вами и какие вопросы
            потребуют отдельного участия специалистов.
          </p>
          <p>
            Объём помощи, условия и возможные внешние расходы обсуждаются
            применительно к вашей ситуации. Предварительная оценка маршрута не
            означает гарантии решения по заявлению.
          </p>
          <PageLink href="/approach" quiet>Как устроена работа</PageLink>
        </PageReading>
      </PageSection>

      <PageSection title="Вопросы, с которых стоит начать.">
        <PageReading><FAQ items={faq} /></PageReading>
      </PageSection>
      <PageClosing />
    </PageShell>
  );
}
