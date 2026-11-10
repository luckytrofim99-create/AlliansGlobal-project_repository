import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FAQ from "@/components/FAQ";
import ServiceVisaStory from "@/components/pages/ServiceVisaStory";
import {
  PageCard,
  PageClosing,
  PageColumns,
  PageHero,
  PageLink,
  PageList,
  PageReading,
  PageSection,
  PageShell,
} from "@/components/pages/PageKit";
import styles from "@/components/pages/ServicePages.module.css";
import { faq, processSteps, services } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

const PHOTOGRAPHS: Record<string, { image: string; alt: string }> = {
  visas: { image: "/images/hero-rome.jpg", alt: "Рим, Италия" },
  residence: { image: "/images/canada-toronto.jpg", alt: "Торонто, Канада" },
  citizenship: { image: "/images/europe-paris.jpg", alt: "Париж, Франция" },
  consulting: { image: "/images/office-interior.jpg", alt: "Светлый интерьер" },
  "complex-cases": { image: "/images/uk-london.jpg", alt: "Лондон, Великобритания" },
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Услуга не найдена" };
  return { title: service.title, description: service.description };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const photograph = PHOTOGRAPHS[slug];

  return (
    <PageShell>
      <PageHero
        title={slug === "residence" ? "Вид на жительство" : service.title}
        intro={service.description}
        image={photograph.image}
        imageAlt={photograph.alt}
      >
        <PageLink href="/consultation">Разобрать мою ситуацию</PageLink>
        <PageLink href="/services" quiet>Все услуги</PageLink>
      </PageHero>

      {slug === "visas" && <ServiceVisaStory />}

      <PageSection id="explore" title={service.short}>
        <PageReading>
          <h3>Что входит в разбор</h3>
          <PageList items={service.includes} />
          <p>
            План составляется по вашим документам. Если обстоятельства изменятся, порядок действий и объём помощи пересматриваются.
          </p>
        </PageReading>
      </PageSection>

      <PageSection
        title="6 этапов вашего обращения"
        intro="Этапы и объём работы согласуем по стране, основанию и вашим документам."
      >
        <ol className={styles.steps}>
          {processSteps.map((step) => <li key={step.number} data-reveal>
            <span className={styles.stepNumber} aria-hidden="true">{step.number}</span>
            <div><h3>{step.title}</h3><p>{step.description}</p></div>
          </li>)}
        </ol>
        <div className={styles.sectionAction}><PageLink href="/approach" quiet>Как устроена работа</PageLink></div>
      </PageSection>

      <PageSection title="Объём помощи и расходы">
        <PageReading><FAQ items={[faq[3], faq[4], faq[5]]} /></PageReading>
      </PageSection>

      <PageSection title="Выберите другую услугу">
        <PageColumns>
          {services.filter((item) => item.slug !== slug).slice(0, 3).map((item) => <PageCard
            key={item.slug}
            title={item.title}
            body={item.short}
            href={`/services/${item.slug}`}
            action="Подробнее об услуге"
          />)}
        </PageColumns>
      </PageSection>
      <PageClosing text="Укажите задачу и имеющиеся документы для предварительного разбора." />
    </PageShell>
  );
}
