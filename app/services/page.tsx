import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import { ButtonLink, CTA, Eyebrow, PageHero, TextLink } from "@/components/ui";
import { faq, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Визы, проживание, гражданство и иммиграционный консалтинг. От отдельного вопроса к последовательному плану действий.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="От отдельного вопроса"
        accent="к целому маршруту."
        description="Иногда нужен конкретный документ. Иногда — целая стратегия. Сначала определяем вашу задачу, затем согласуем объём сопровождения."
      />

      <section className="section container" id="explore">
        <div className="section-head" data-reveal>
          <Eyebrow>С чем мы помогаем</Eyebrow>
          <h2>
            Большие планы.
            <br />
            <em>Понятные задачи.</em>
          </h2>
          <p>
            Выберите вопрос, с которого хотите начать. Если ваша ситуация
            затрагивает несколько направлений, рассмотрим их вместе.
          </p>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article
              className="service-row"
              id={service.slug}
              key={service.slug}
              data-reveal
            >
              <span aria-hidden="true">{service.number}</span>
              <div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <TextLink href={`/services/${service.slug}`}>
                  Подробнее о сопровождении
                </TextLink>
              </div>
              <ul className="numbered-list">
                {service.includes.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="split-section" data-reveal>
          <div>
            <Eyebrow>До начала работы</Eyebrow>
            <h2>
              Ясность —<br />
              <em>часть сопровождения.</em>
            </h2>
          </div>
          <div className="prose">
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
            <ButtonLink href="/approach" variant="outline">
              Как устроена работа
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head" data-reveal>
          <Eyebrow>Перед обращением</Eyebrow>
          <h2>
            Вопросы,
            <br />
            <em>с которых стоит начать.</em>
          </h2>
        </div>
        <div data-reveal>
          <FAQ items={faq} />
        </div>
      </section>
      <CTA />
    </>
  );
}
