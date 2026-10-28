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
  ["Ваша цель", "Работа, учёба, бизнес или семейная причина переезда."],
  ["Личная история", "Гражданство, место проживания, предыдущие обращения и уже полученные решения."],
  ["Семья и работа", "Участники переезда и их рабочие обязательства."],
  ["Приоритеты", "Бюджет, желаемые даты и обязательные условия."],
];

export default function ApproachPage() {
  return (
    <PageShell>
      <PageHero title="Узнайте порядок сопровождения" intro="От разбора задачи до подготовки документов и подачи. Содержание этапов зависит от страны и основания.">
        <PageLink href="#explore">Посмотреть этапы</PageLink>
      </PageHero>

      <PageSection id="explore">
        <div className={styles.split}>
          <div className={styles.copy} data-reveal>
            <h2>Этапы работы над обращением</h2>
            <p>Согласуем содержание этапов по вашей ситуации.</p>
            <p>Определим необходимые документы, действия клиента и задачи команды.</p>
            <PageLink href="/consultation" secondary>Обсудить задачу</PageLink>
          </div>
          <ol className={styles.steps} aria-label="Этапы сопровождения">
            {processSteps.map((step) => <li key={step.number} data-reveal><h3>{step.title}</h3><p>{step.description}</p></li>)}
          </ol>
        </div>
      </PageSection>

      <PageSection title="Что влияет на план переезда" intro="Для оценки нужны цель, история обращений и ограничения.">
        <div className={styles.pair}>
          {circumstances.map(([title, text]) => <PageCard key={title} title={title} body={text} />)}
        </div>
      </PageSection>

      <PageSection title="Разберите отказ или смену статуса">
        <PageReading>
          <p data-reveal>Подготовьте решения по прошлым обращениям и документы о текущем статусе.</p>
          <p data-reveal>Восстановим хронологию и определим вопросы для проверки. После анализа оценим возможность сопровождения.</p>
          <p data-reveal>Анализ выявляет возможные действия и ограничения. Он не гарантирует результат.</p>
          <PageLink href="/services/complex-cases" quiet>Подробнее о разборе ситуации</PageLink>
        </PageReading>
      </PageSection>

      <PageSection>
        <div className={styles.split}>
          <div className={styles.copy} data-reveal>
            <h2>Уточните условия до начала работы</h2>
            <p>Согласуйте задачи команды, своё участие и результат этапа.</p>
            <PageLink href="/consultation" secondary>Обсудить задачу</PageLink>
          </div>
          <div data-reveal><FAQ items={[faq[3], faq[4], faq[5]]} /></div>
        </div>
      </PageSection>
      <PageClosing title="Подготовьте запрос на консультацию" />
    </PageShell>
  );
}
