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
    "Подготовка к визе, ВНЖ и гражданству. Выбор страны и разбор отказа.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        title="Выберите услугу для поездки или переезда"
        intro="Разберём основания, документы и порядок подачи. Объём помощи согласуем по вашей задаче."
        image="/images/office-interior.jpg"
        imageAlt="Светлый интерьер для спокойного разговора"
      >
        <PageLink href="#explore">Выбрать задачу</PageLink>
        <PageLink href="/consultation" secondary>Обсудить мою ситуацию</PageLink>
      </PageHero>

      <PageSection
        id="explore"
        title="Найдите нужную услугу"
        intro="Выберите задачу для изучения состава работы."
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

      <PageSection title="Согласуйте состав и стоимость работы">
        <PageReading>
          <p>
            До начала работы согласуем задачи команды, ваше участие и вопросы для профильных специалистов.
          </p>
          <p>
            Уточните стоимость сопровождения и внешние расходы. Предварительная оценка не гарантирует решение по заявлению.
          </p>
          <PageLink href="/approach" quiet>Как устроена работа</PageLink>
        </PageReading>
      </PageSection>

      <PageSection title="Ответы перед обращением">
        <PageReading><FAQ items={faq} /></PageReading>
      </PageSection>
      <PageClosing />
    </PageShell>
  );
}
