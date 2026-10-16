import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FAQ from "@/components/FAQ";
import TravelDossier from "@/components/TravelDossier";
import { ButtonLink, CTA, Eyebrow, PageHero, TextLink } from "@/components/ui";
import { faq, processSteps, services } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

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

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.title}
        accent="В контексте вашей жизни."
        description={service.description}
      >
        <ButtonLink>Обсудить мою ситуацию</ButtonLink>
      </PageHero>

      {slug === "visas" && <TravelDossier />}

      <section className="section container" id="explore">
        <div className="split-section">
          <div data-reveal>
            <Eyebrow>Направление {service.number}</Eyebrow>
            <h2>{service.short}</h2>
          </div>
          <div data-reveal>
            <Eyebrow>Что рассматриваем</Eyebrow>
            <ul className="numbered-list">
              {service.includes.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <div className="prose">
              <p>
                Конкретный перечень действий определяется после анализа запроса.
                Если обстоятельства меняются, следующие шаги и объём помощи
                необходимо согласовать заново.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head" data-reveal>
          <Eyebrow>Последовательность</Eyebrow>
          <h2>
            Видеть маршрут.
            <br />
            <em>Понимать каждый шаг.</em>
          </h2>
          <p>
            Общая логика помогает сориентироваться. Содержание каждого этапа
            зависит от страны, основания и вашей личной ситуации.
          </p>
        </div>
        <div className="approach-timeline">
          {processSteps.map((step) => (
            <article className="approach-step" key={step.number} data-reveal>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head" data-reveal>
          <Eyebrow>Важные детали</Eyebrow>
          <h2>
            До первого
            <br />
            <em>решения.</em>
          </h2>
        </div>
        <div data-reveal>
          <FAQ items={[faq[3], faq[4], faq[5]]} />
        </div>
      </section>

      <section className="section container">
        <div className="section-head" data-reveal>
          <Eyebrow>Другие задачи</Eyebrow>
          <h2>
            Посмотреть
            <br />
            <em>на ситуацию шире.</em>
          </h2>
        </div>
        <div className="service-list">
          {services
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
            .map((item) => (
              <article className="service-row" key={item.slug} data-reveal>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.short}</p>
                </div>
                <TextLink href={`/services/${item.slug}`}>
                  Изучить направление
                </TextLink>
              </article>
            ))}
        </div>
      </section>
      <CTA text="Опишите вашу задачу и текущие обстоятельства. Начнём с вопросов, от которых зависит следующий шаг." />
    </>
  );
}
