import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import { PageCard, PageClosing, PageColumns, PageHero, PageLink, PageList, PageSection, PageShell } from "@/components/pages/PageKit";
import { notFound } from "next/navigation";

import styles from "@/components/pages/CountryDetail.module.css";
import { countries, processSteps, programs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
type CountryContext = {
  location: string;
  introduction: string;
  tasks: string[];
  questions: { title: string; text: string }[];
};

const CONTEXT: Record<string, CountryContext> = {
  canada: {
    location: "Торонто, Канада",
    introduction:
      "Для разбора подготовьте сведения о цели переезда, приглашении и семье.",
    tasks: [
      "Учебное или спортивное приглашение и связанные с ним вопросы",
      "Профессиональные планы и участие принимающей стороны",
      "Совместный маршрут для членов семьи",
      "История предыдущих поездок и обращений",
    ],
    questions: [
      {
        title: "Каково основание для переезда?",
        text: "Учёба, приглашение, работа или семейные обстоятельства. Опишите главную цель и то, что уже определено.",
      },
      {
        title: "Какой город и язык вам подходят?",
        text: "Город, язык общения, работа близких и образование детей помогают сделать запрос конкретнее.",
      },
      {
        title: "Кто переезжает с вами?",
        text: "Укажите состав семьи и документы каждого участника.",
      },
    ],
  },
  usa: {
    location: "Нью-Йорк, США",
    introduction:
      "Разделите цель ближайшей поездки и долгосрочного переезда. Укажите приглашение и визовую историю.",
    tasks: [
      "Цель поездки и предполагаемый формат пребывания",
      "Учебные, спортивные или профессиональные приглашения",
      "Материалы предыдущих обращений и полученных решений",
      "Планы семьи и их связь с основной задачей",
    ],
    questions: [
      {
        title: "Какова цель поездки?",
        text: "Укажите цель ближайшей поездки и долгосрочные планы.",
      },
      {
        title: "Есть ли принимающая сторона?",
        text: "Укажите учебное заведение, клуб, работодателя или приглашающих близких.",
      },
      {
        title: "Какие решения уже получены?",
        text: "Составьте хронологию обращений, решений и изменений статуса.",
      },
    ],
  },
  europe: {
    location: "Париж, Франция",
    introduction:
      "Укажите страны для сравнения и обязательные условия по работе, учёбе и семье.",
    tasks: [
      "Сравнение личных приоритетов для нескольких стран",
      "Работа, предпринимательство или удалённая занятость",
      "Образовательные планы и переезд с близкими",
      "Вопросы к конкретной стране и возможным основаниям",
    ],
    questions: [
      {
        title: "Какие страны вы сравниваете?",
        text: "Перечислите страны и критерии сравнения.",
      },
      {
        title: "Как вы планируете работать?",
        text: "Укажите форму занятости: работа по приглашению, бизнес или удалённая работа.",
      },
      {
        title: "Какие условия обязательны?",
        text: "Разделите обязательные условия и пожелания к языку, работе и образованию.",
      },
    ],
  },
  uk: {
    location: "Лондон, Великобритания",
    introduction:
      "Подготовьте приглашение и сведения о работе, учёбе и сопровождающих членах семьи.",
    tasks: [
      "Приглашение на обучение и планы сопровождающих",
      "Профессиональная задача и сведения от работодателя",
      "Семейные обстоятельства и взаимосвязь документов",
      "История поездок и планируемые даты",
    ],
    questions: [
      {
        title: "Есть ли приглашение?",
        text: "Подготовьте приглашение, сведения об учёбе или предложение работодателя.",
      },
      {
        title: "Какие даты нужно учесть?",
        text: "Укажите даты начала учёбы, работы и семейные обязательства.",
      },
      {
        title: "Кто едет вместе с вами?",
        text: "Укажите участников поездки и цель каждого.",
      },
    ],
  },
  australia: {
    location: "Сидней, Австралия",
    introduction:
      "Укажите цель переезда, участников и предполагаемые даты. Отдельно обозначьте рабочие и учебные обязательства.",
    tasks: [
      "Образовательная или профессиональная цель переезда",
      "Имеющиеся приглашения и исходные документы",
      "Совместный план семьи и последовательность подготовки",
      "Практические ориентиры для длительного переезда",
    ],
    questions: [
      {
        title: "Какова цель переезда?",
        text: "Укажите цель: работа, учёба или переезд с семьёй.",
      },
      {
        title: "Есть ли связь с принимающей стороной?",
        text: "Укажите приглашение, контакты принимающей стороны или опыт проживания.",
      },
      {
        title: "На какой срок вы планируете переезд?",
        text: "Укажите предполагаемые даты и продолжительность пребывания.",
      },
    ],
  },
  "new-zealand": {
    location: "Куинстаун, Новая Зеландия",
    introduction:
      "Опишите цель переезда и обстоятельства каждого участника. Укажите условия по работе и образованию.",
    tasks: [
      "Цель и планируемый срок переезда",
      "Профессиональные или образовательные предпосылки",
      "Обстоятельства каждого участника семейного маршрута",
      "Вопросы, которые нужно проверить до начала подготовки",
    ],
    questions: [
      {
        title: "Почему выбрана эта страна?",
        text: "Укажите причину выбора страны и возможное основание для переезда.",
      },
      {
        title: "Какие условия жизни обязательны?",
        text: "Укажите требования к работе, образованию и связи с близкими.",
      },
      {
        title: "Какие ограничения есть у семьи?",
        text: "Укажите ограничения по расстоянию, датам и условиям жизни.",
      },
    ],
  },
  "south-korea": {
    location: "Сеул, Южная Корея",
    introduction:
      "Для разбора укажите цель поездки, сведения о приглашении и историю обращений.",
    tasks: [
      "Учебное, спортивное или деловое приглашение",
      "Цель и предполагаемый формат поездки",
      "Языковые и организационные вопросы подготовки",
      "Семейные обстоятельства и предыдущие обращения",
    ],
    questions: [
      {
        title: "Какова цель поездки?",
        text: "Укажите цель и договорённости с принимающей стороной.",
      },
      {
        title: "Какие документы и контакты уже есть?",
        text: "Подготовьте приглашение, переписку и решения по прошлым обращениям.",
      },
      {
        title: "Какие вопросы ещё не решены?",
        text: "Укажите вопросы к датам, языку, приглашению и участию семьи.",
      },
    ],
  },
};

export function generateStaticParams() {
  return countries.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  if (!country) notFound();
  return {
    title: `Визы и переезд: ${country.name}`,
    description: country.description,
    openGraph: {
      title: `${country.name} · Alliance Global`,
      description: country.description,
      images: [{ url: country.image, alt: country.name }],
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  if (!country) notFound();
  const context = CONTEXT[slug];
  const consultationHref = `/consultation?country=${country.slug}`;
  const relatedPrograms = programs.filter((program) =>
    ["education", "work", "family"].includes(program.slug),
  );

  return (
    <PageShell>
      <PageHero
        title={`Визы и переезд: ${country.name}`}
        intro={country.description}
        image={country.image}
        imageAlt={context.location}
      >
        <PageLink href={consultationHref}>Разобрать мою ситуацию</PageLink>
        <PageLink href="/countries" quiet>Все направления</PageLink>
        <p className={styles.location}>{context.location} · {country.en}</p>
      </PageHero>

      <PageSection
        id="explore"
        title="Что проверить перед поездкой"
        intro={context.introduction}
      >
        <div className={styles.context}>
          <article className={styles.preparation} data-reveal>
            <h3>Ваши исходные данные</h3>
            <PageList items={context.tasks} />
            <p>
              Возможные действия, сроки и документы уточняются после изучения вашей ситуации.
            </p>
            <PageLink href="/services" quiet>Изучить форматы сопровождения</PageLink>
          </article>
          <div className={styles.questions} data-reveal>
            <h3>Вопросы для подготовки</h3>
            <FAQ items={context.questions.map((question) => ({ question: question.title, answer: question.text }))} />
          </div>
        </div>
      </PageSection>

      <PageSection
        title="Выберите цель обращения"
        intro="Возможные основания проверяются по вашей ситуации."
      >
        <PageColumns>
          {relatedPrograms.map((program) => <PageCard
            key={program.slug}
            title={program.title}
            label={program.tag}
            body={program.description}
            href={program.slug === "education" ? "/programs#education" : `/programs#${program.slug}`}
            action="Подробнее о задаче"
          />)}
        </PageColumns>
      </PageSection>

      <PageSection title="3 шага до подготовки документов">
        <PageColumns>
          {processSteps.slice(0, 3).map((step) => <PageCard
            key={step.number}
            title={step.title}
            body={step.description}
          />)}
        </PageColumns>
        <div className={styles.sectionAction}><PageLink href="/approach" quiet>Как мы работаем</PageLink></div>
      </PageSection>

      <PageSection title="Сравните другие страны">
        <PageColumns>
          {countries.filter((item) => item.slug !== slug).slice(0, 3).map((item) => <PageCard
            key={item.slug}
            title={item.name}
            label={item.region}
            image={item.image}
            href={`/countries/${item.slug}`}
            action={`Изучить направление: ${item.name}`}
          />)}
        </PageColumns>
      </PageSection>

      <PageClosing
        title="План вашей поездки"
        text="Укажите цель поездки и документы для предварительного разбора."
        href={consultationHref}
        action="Разобрать мою ситуацию"
      />
    </PageShell>
  );
}
