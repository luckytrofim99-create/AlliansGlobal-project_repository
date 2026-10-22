import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import { PageCard, PageClosing, PageHero, PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import { faq, processSteps } from "@/lib/content";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = {
  title: "Как мы работаем",
  description:
    "От знакомства и анализа ситуации до подготовки документов и дальнейших шагов. Понятная последовательность и согласованный объём сопровождения.",
};

const circumstances = [
  ["Ваша цель", "Что должно измениться после переезда и каким вы видите следующий этап жизни."],
  ["Личная история", "Гражданство, место проживания, предыдущие обращения и уже полученные решения."],
  ["Семья и работа", "Кто планирует переезд вместе с вами и какие профессиональные задачи важно учесть."],
  ["Приоритеты", "Предполагаемый бюджет, временные ориентиры и обстоятельства, которые нельзя оставить без внимания."],
];

export default function ApproachPage() {
  return (
    <PageShell>
      <PageHero title="Важное решение. Понятный процесс." intro="Сложный путь становится понятнее, когда виден следующий шаг. Обсуждаем цель, определяем исходные данные и согласуем последовательность действий.">
        <PageLink href="#explore">Посмотреть этапы</PageLink>
      </PageHero>

      <PageSection id="explore">
        <div className={styles.split}>
          <div className={styles.copy} data-reveal>
            <h2>Шаг за шагом. С общей картиной в фокусе.</h2>
            <p>Это общая логика сопровождения. Содержание каждого этапа зависит от страны, основания, личных обстоятельств и согласованного состава работы.</p>
            <p>Мы начинаем с вашей цели. К ней возвращаемся, когда сравниваем варианты, определяем приоритеты и обсуждаем дальнейшие действия.</p>
            <PageLink href="/consultation" secondary>Обсудить задачу</PageLink>
          </div>
          <ol className={styles.steps} aria-label="Этапы сопровождения">
            {processSteps.map((step) => <li key={step.number} data-reveal><h3>{step.title}</h3><p>{step.description}</p></li>)}
          </ol>
        </div>
      </PageSection>

      <PageSection title="Стратегия начинается с ваших обстоятельств." intro="Не только страна назначения. Несколько взаимосвязанных факторов определяют, какие вопросы нужно рассмотреть в первую очередь.">
        <div className={styles.pair}>
          {circumstances.map(([title, text]) => <PageCard key={title} title={title} body={text} />)}
        </div>
      </PageSection>

      <PageSection title="Когда нет стандартного ответа.">
        <PageReading>
          <p data-reveal>Предыдущий отказ, смена статуса, подача из другой страны или нестандартная история — повод начать с подробного разбора обстоятельств.</p>
          <p data-reveal>Сначала восстанавливаем хронологию и определяем, какие документы доступны. Затем выясняем, что требует дополнительной проверки и возможно ли дальнейшее сопровождение.</p>
          <p data-reveal>Задача анализа — увидеть возможные действия и ограничения. Он не означает обещания решить любую ситуацию или получить определённый результат.</p>
          <PageLink href="/services/complex-cases" quiet>Подробнее о разборе ситуации</PageLink>
        </PageReading>
      </PageSection>

      <PageSection>
        <div className={styles.split}>
          <div className={styles.copy} data-reveal>
            <h2>Понимать, как мы движемся вместе.</h2>
            <p>До начала сопровождения важно согласовать задачи команды, ваше участие, условия работы и границы следующего этапа.</p>
            <PageLink href="/consultation" secondary>Обсудить задачу</PageLink>
          </div>
          <div data-reveal><FAQ items={[faq[3], faq[4], faq[5]]} /></div>
        </div>
      </PageSection>
      <PageClosing title="Понятный следующий шаг начинается здесь." />
    </PageShell>
  );
}
