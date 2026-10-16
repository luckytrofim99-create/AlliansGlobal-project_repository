import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import { ButtonLink, CTA, Eyebrow, PageHero, TextLink } from "@/components/ui";
import { faq, processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Как мы работаем",
  description:
    "От знакомства и анализа ситуации до подготовки документов и дальнейших шагов. Понятная последовательность и согласованный объём сопровождения.",
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Как мы работаем"
        title="Важное решение."
        accent="Понятный процесс."
        description="Сложный путь становится понятнее, когда виден следующий шаг. Обсуждаем цель, определяем исходные данные и согласуем последовательность действий."
      />

      <section className="section container" id="explore">
        <div className="split-section">
          <div data-reveal>
            <Eyebrow>От первого разговора</Eyebrow>
            <h2>
              Шаг за шагом.
              <br />
              <em>С общей картиной в фокусе.</em>
            </h2>
            <div className="prose">
              <p>
                Это общая логика сопровождения. Содержание каждого этапа зависит
                от страны, основания, личных обстоятельств и согласованного
                состава работы.
              </p>
              <p>
                Мы начинаем с вашей цели. К ней возвращаемся, когда сравниваем
                варианты, определяем приоритеты и обсуждаем дальнейшие действия.
              </p>
            </div>
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
        </div>
      </section>

      <section className="section container">
        <div className="section-head" data-reveal>
          <Eyebrow>Индивидуальный подход</Eyebrow>
          <h2>
            Стратегия начинается
            <br />
            <em>с ваших обстоятельств.</em>
          </h2>
          <p>
            Не только страна назначения. Несколько взаимосвязанных факторов
            определяют, какие вопросы нужно рассмотреть в первую очередь.
          </p>
        </div>
        <div className="program-grid">
          {[
            [
              "Ваша цель",
              "Что должно измениться после переезда и каким вы видите следующий этап жизни.",
            ],
            [
              "Личная история",
              "Гражданство, место проживания, предыдущие обращения и уже полученные решения.",
            ],
            [
              "Семья и работа",
              "Кто планирует переезд вместе с вами и какие профессиональные задачи важно учесть.",
            ],
            [
              "Приоритеты",
              "Предполагаемый бюджет, временные ориентиры и обстоятельства, которые нельзя оставить без внимания.",
            ],
          ].map(([title, text], index) => (
            <article className="program-card" key={title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="split-section" data-reveal>
          <div>
            <Eyebrow>Сложные ситуации</Eyebrow>
            <h2>
              Когда нет
              <br />
              <em>стандартного ответа.</em>
            </h2>
          </div>
          <div className="prose">
            <p>
              Предыдущий отказ, смена статуса, подача из другой страны или
              нестандартная история — повод начать с подробного разбора
              обстоятельств.
            </p>
            <p>
              Сначала восстанавливаем хронологию и определяем, какие документы
              доступны. Затем выясняем, что требует дополнительной проверки и
              возможно ли дальнейшее сопровождение.
            </p>
            <p>
              Задача анализа — увидеть возможные действия и ограничения. Он не
              означает обещания решить любую ситуацию или получить определённый
              результат.
            </p>
            <TextLink href="/services/complex-cases">
              Подробнее о разборе ситуации
            </TextLink>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="split-section">
          <div data-reveal>
            <Eyebrow>Общие договорённости</Eyebrow>
            <h2>
              Понимать,
              <br />
              <em>как мы движемся вместе.</em>
            </h2>
            <div className="prose">
              <p>
                До начала сопровождения важно согласовать задачи команды, ваше
                участие, условия работы и границы следующего этапа.
              </p>
            </div>
            <ButtonLink href="/consultation" variant="outline">
              Обсудить задачу
            </ButtonLink>
          </div>
          <div data-reveal>
            <FAQ items={[faq[3], faq[4], faq[5]]} />
          </div>
        </div>
      </section>
      <CTA
        title={
          <>
            Понятный следующий шаг
            <br />
            <em>начинается здесь.</em>
          </>
        }
      />
    </>
  );
}
