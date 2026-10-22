import type { Metadata } from "next";
import Image from "next/image";
import { PageCard, PageClosing, PageHero, PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import { PagePhotoMotion } from "@/components/pages/PageMotion";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Alliance Global — внимание к личной ситуации и последовательный подход к международным планам. Связь с Alliance Sport Group и принципы сопровождения.",
};

const principles = [
  {
    title: "Сначала слушать",
    text: "Маршрут имеет смысл, когда отвечает вашей цели. Начинаем с обстоятельств, приоритетов и вопросов, которые действительно важны для вас.",
  },
  {
    title: "Говорить понятно",
    text: "Объясняем последовательность действий, участие клиента и границы работы. Сложность задачи не должна превращаться в неясность общения.",
  },
  {
    title: "Смотреть на целое",
    text: "Работа, образование, семья и долгосрочные планы связаны между собой. Рассматриваем задачу в контексте жизни, а не только одного документа.",
  },
  {
    title: "Разделять ответственность",
    text: "Миграционные, спортивные, корпоративные и другие вопросы требуют разной экспертизы. Состав участия специалистов и объём помощи согласуются отдельно.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        title="Международные задачи. Личное внимание."
        intro="Для нас переезд начинается с человека: его целей, семьи, работы и представления о будущем. Именно эта картина задаёт направление всей дальнейшей работе."
        image="/images/office-interior.jpg"
        imageAlt="Светлое пространство для спокойной и сосредоточенной работы"
      >
        <PageLink href="/approach">Как мы работаем</PageLink>
      </PageHero>

      <PageSection id="explore" title="За каждым маршрутом — чья-то новая глава.">
        <PageReading>
          <p data-reveal>Международные планы редко укладываются в один вопрос. Вместе с новым предложением о работе возникают семейные задачи. Рядом с поступлением — вопросы поездки и проживания. За спортивным приглашением стоит целый следующий этап жизни.</p>
          <p data-reveal>Alliance Global объединяет эти вопросы в последовательный разговор: что вы хотите сделать, какие обстоятельства нужно учитывать и с чего стоит начать подготовку.</p>
          <p data-reveal>Наша отправная точка — не готовый ответ для всех, а внимательное понимание вашей ситуации.</p>
        </PageReading>
      </PageSection>

      <PageSection title="Важные решения заслуживают ясности.">
        <div className={styles.pair}>
          {principles.map((principle) => <PageCard key={principle.title} title={principle.title} body={principle.text} />)}
        </div>
      </PageSection>

      <PageSection>
        <div className={styles.split}>
          <div className={styles.figure} data-reveal="picture">
            <PagePhotoMotion><Image src="/images/university-campus.jpg" alt="Архитектура университетского кампуса" fill sizes="(min-width: 1000px) 44vw, 90vw" /></PagePhotoMotion>
          </div>
          <div className={styles.copy} data-reveal>
            <h2>Знакомый контекст. Более широкий взгляд.</h2>
            <p>Alliance Global развивает международную повестку, связанную с Alliance Sport Group, с отдельным вниманием к визам, проживанию и вопросам переезда.</p>
            <p>Спорт остаётся одной из жизненных ситуаций, с которыми может быть связан международный маршрут. Наряду с ним мы рассматриваем работу, образование, предпринимательские и семейные планы.</p>
            <p>Спортивная карьера и миграционные документы требуют самостоятельного рассмотрения. Важно видеть их связь и при этом понимать, какая задача решается на каждом этапе.</p>
            <PageLink href="/programs#sport" quiet>Спорт и международные планы</PageLink>
          </div>
        </div>
      </PageSection>

      <PageSection title="Не терять человека за процессом.">
        <PageReading>
          <p data-reveal>На каждом этапе полезно понимать, что уже известно, какие вопросы открыты и кто отвечает за следующее действие. Такая последовательность помогает принимать решения осознанно.</p>
          <PageLink href="/approach" secondary>Как мы работаем</PageLink>
        </PageReading>
      </PageSection>
      <PageClosing />
    </PageShell>
  );
}
