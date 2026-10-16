import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Eyebrow, TextLink } from "@/components/ui";
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
      "Страна может стать частью образовательного, профессионального или семейного плана. Важно связать эти цели между собой и понять, какие исходные данные уже есть.",
    tasks: [
      "Учебное или спортивное приглашение и связанные с ним вопросы",
      "Профессиональные планы и участие принимающей стороны",
      "Совместный маршрут для членов семьи",
      "История предыдущих поездок и обращений",
    ],
    questions: [
      {
        title: "Что станет основой вашего маршрута?",
        text: "Учёба, приглашение, работа или семейные обстоятельства. Опишите главную цель и то, что уже определено.",
      },
      {
        title: "Как вы представляете повседневную жизнь?",
        text: "Город, язык общения, работа близких и образование детей помогают сделать запрос конкретнее.",
      },
      {
        title: "Кто участвует в планах вместе с вами?",
        text: "Ситуация каждого члена семьи может влиять на последовательность подготовки. Её полезно обозначить в начале.",
      },
    ],
  },
  usa: {
    location: "Нью-Йорк, США",
    introduction:
      "Краткая поездка и долгосрочный переезд начинаются с разных вопросов. Прежде чем выбирать маршрут, важно сформулировать цель, роль приглашения и личные обстоятельства.",
    tasks: [
      "Цель поездки и предполагаемый формат пребывания",
      "Учебные, спортивные или профессиональные приглашения",
      "Материалы предыдущих обращений и полученных решений",
      "Планы семьи и их связь с основной задачей",
    ],
    questions: [
      {
        title: "О какой задаче идёт речь сейчас?",
        text: "Отделите ближайшую поездку от долгосрочных намерений. Это поможет определить предмет первого разговора.",
      },
      {
        title: "Есть ли принимающая сторона?",
        text: "Расскажите об учебном заведении, клубе, работодателе или близких, если они участвуют в ваших планах.",
      },
      {
        title: "Что важно знать о вашей истории?",
        text: "Предыдущие обращения, решения и изменения обстоятельств стоит собрать в последовательную хронологию.",
      },
    ],
  },
  europe: {
    location: "Париж, Франция",
    introduction:
      "Европа объединяет разные страны и разные условия жизни. Сначала стоит определить конкретное направление и критерии, по которым вы будете сравнивать возможные решения.",
    tasks: [
      "Сравнение личных приоритетов для нескольких стран",
      "Работа, предпринимательство или удалённая занятость",
      "Образовательные планы и переезд с близкими",
      "Вопросы к конкретной стране и возможным основаниям",
    ],
    questions: [
      {
        title: "Какие страны вы уже рассматриваете?",
        text: "Название конкретной страны делает разговор предметным. Если вариантов несколько, обозначьте причины вашего выбора.",
      },
      {
        title: "Как вы планируете работать и жить?",
        text: "Собственный бизнес, приглашение работодателя и удалённая работа требуют разного контекста для анализа.",
      },
      {
        title: "Что для вас определяет выбор?",
        text: "Язык, семья, образование, профессиональная среда или привычный ритм. Разделите обязательные условия и пожелания.",
      },
    ],
  },
  uk: {
    location: "Лондон, Великобритания",
    introduction:
      "Учебные, профессиональные и семейные планы стоит рассматривать в общей картине. Для начала полезно понять вашу цель, имеющиеся документы и роль принимающей стороны.",
    tasks: [
      "Приглашение на обучение и планы сопровождающих",
      "Профессиональная задача и сведения от работодателя",
      "Семейные обстоятельства и взаимосвязь документов",
      "История поездок и предполагаемый горизонт планирования",
    ],
    questions: [
      {
        title: "Что уже определено в ваших планах?",
        text: "Приглашение, выбранная программа обучения или рабочее предложение помогают обозначить отправную точку.",
      },
      {
        title: "Какие события задают ориентиры?",
        text: "Начало учебного года, профессиональные обязательства и семейные планы полезно собрать на одной временной линии.",
      },
      {
        title: "Какие вопросы связаны с близкими?",
        text: "Укажите, кто планирует поездку или переезд вместе с вами и какие личные цели необходимо учесть.",
      },
    ],
  },
  australia: {
    location: "Сидней, Австралия",
    introduction:
      "Планы на другом конце света затрагивают не только документы. Образование, работа, близкие и организация повседневной жизни складываются в единую задачу, которую важно разобрать заранее.",
    tasks: [
      "Образовательная или профессиональная цель переезда",
      "Имеющиеся приглашения и исходные документы",
      "Совместный план семьи и последовательность подготовки",
      "Практические ориентиры для длительного переезда",
    ],
    questions: [
      {
        title: "Какую жизнь вы планируете после переезда?",
        text: "Опишите профессиональные, образовательные и личные цели. Страна должна рассматриваться в их контексте.",
      },
      {
        title: "Что связывает вас с направлением уже сейчас?",
        text: "Учебное заведение, работодатель, близкие или предыдущий опыт проживания помогут понять исходную ситуацию.",
      },
      {
        title: "Какой горизонт вы рассматриваете?",
        text: "Даты и продолжительность пока могут быть ориентировочными. Важно понимать события, с которыми связаны ваши планы.",
      },
    ],
  },
  "new-zealand": {
    location: "Куинстаун, Новая Зеландия",
    introduction:
      "Новый ритм жизни начинается с ясной цели. До выбора города и билетов стоит связать личные ожидания с профессиональными, образовательными и семейными обстоятельствами.",
    tasks: [
      "Определение основной причины и горизонта переезда",
      "Профессиональные или образовательные предпосылки",
      "Обстоятельства каждого участника семейного маршрута",
      "Вопросы, которые нужно проверить до начала подготовки",
    ],
    questions: [
      {
        title: "Почему вы рассматриваете именно эту страну?",
        text: "Разделите личные ожидания и обстоятельства, на которых может основываться дальнейшая подготовка.",
      },
      {
        title: "Что важно сохранить после переезда?",
        text: "Работу, профессиональную траекторию, образование или привычные связи. Эти приоритеты стоит назвать заранее.",
      },
      {
        title: "К каким переменам готова ваша семья?",
        text: "Обсудите расстояние, повседневный уклад и планы каждого. Общая картина поможет сформировать содержательный запрос.",
      },
    ],
  },
  "south-korea": {
    location: "Сеул, Южная Корея",
    introduction:
      "Учёба, спорт, деловая поездка и семейные планы формируют разные запросы. Чёткое описание цели помогает понять, какую информацию и документы необходимо рассмотреть в первую очередь.",
    tasks: [
      "Учебное, спортивное или деловое приглашение",
      "Цель и предполагаемый формат поездки",
      "Языковые и организационные вопросы подготовки",
      "Семейные обстоятельства и предыдущие обращения",
    ],
    questions: [
      {
        title: "Какова главная цель поездки?",
        text: "Опишите её своими словами и обозначьте, что уже согласовано с принимающей стороной.",
      },
      {
        title: "Какие документы и контакты уже есть?",
        text: "Приглашение, переписка с организацией и материалы предыдущих обращений помогают восстановить контекст.",
      },
      {
        title: "Что требует внимания до начала подготовки?",
        text: "Планы семьи, язык взаимодействия, сроки приглашения и организационные задачи полезно обсудить вместе.",
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
    title: `${country.name} — ваше направление`,
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
    <>
      <section className="country-detail-hero container">
        <div className="breadcrumb">
          <Link href="/">Главная</Link>
          <span>/</span>
          <Link href="/countries">Направления</Link>
          <span>/</span>
          <span>{country.name}</span>
        </div>
        <div className="split-section">
          <div>
            <Eyebrow>
              {country.region} / {country.en}
            </Eyebrow>
            <h1 data-reveal>
              {country.name}
              <br />
              <em>В вашей истории.</em>
            </h1>
            <p className="lead" data-reveal>
              {country.description}
            </p>
            <div data-reveal>
              <ButtonLink href={consultationHref}>
                Обсудить мои планы
              </ButtonLink>
            </div>
            <dl className="country-facts" data-reveal>
              <div>
                <dt>Направление</dt>
                <dd>{country.region}</dd>
              </div>
              <div>
                <dt>Отправная точка</dt>
                <dd>Ваша личная цель</dd>
              </div>
              <div>
                <dt>Подход</dt>
                <dd>Индивидуальный маршрут</dd>
              </div>
            </dl>
          </div>
          <figure className="country-detail-image image-frame" data-reveal>
            <Image
              src={country.image}
              alt={context.location}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
              data-parallax
            />
            <figcaption>
              {context.location}
              <span>{country.en.toUpperCase()}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section container" id="explore">
        <div className="split-section">
          <div data-reveal>
            <Eyebrow>Сначала контекст</Eyebrow>
            <h2>
              Одно направление.
              <br />
              <em>Ваша личная задача.</em>
            </h2>
            <div className="prose">
              <p>{context.introduction}</p>
            </div>
            <TextLink href="/services">Изучить форматы сопровождения</TextLink>
          </div>
          <div data-reveal>
            <Eyebrow>Что разберём вместе</Eyebrow>
            <ul className="numbered-list">
              {context.tasks.map((task, index) => (
                <li key={task}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{task}</p>
                </li>
              ))}
            </ul>
            <div className="prose">
              <p>
                Возможные варианты и состав сопровождения определяются после
                изучения вашей ситуации. Сроки, условия и перечень документов
                уточняются для конкретного обращения.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <Eyebrow>Ваша отправная точка</Eyebrow>
            <h2 data-reveal>
              Начните с цели.
              <br />
              <em>Она задаёт направление.</em>
            </h2>
          </div>
          <div className="section-head-aside">
            <p>
              Эти задачи помогают сформулировать запрос. Доступность конкретного
              маршрута необходимо рассматривать отдельно.
            </p>
          </div>
        </div>
        <div className="program-grid">
          {relatedPrograms.map((program, index) => (
            <article key={program.slug} className="program-card" data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Eyebrow>{program.tag}</Eyebrow>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <TextLink href={`/programs#${program.slug}`}>
                Подробнее о задаче
              </TextLink>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head" data-reveal>
          <div>
            <Eyebrow>До выбора маршрута</Eyebrow>
            <h2>
              Три вопроса.
              <br />
              <em>Больше ясности.</em>
            </h2>
          </div>
        </div>
        <ol className="numbered-list">
          {context.questions.map((question, index) => (
            <li key={question.title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{question.title}</h3>
                <p>{question.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <Eyebrow>Первые шаги</Eyebrow>
            <h2 data-reveal>
              От большого плана
              <br />
              <em>к понятному началу.</em>
            </h2>
          </div>
          <TextLink href="/approach">Как мы работаем</TextLink>
        </div>
        <div className="approach-timeline">
          {processSteps.slice(0, 3).map((step) => (
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
          <div>
            <Eyebrow>Посмотреть шире</Eyebrow>
            <h2>
              Другие координаты.
              <br />
              <em>Та же ваша цель.</em>
            </h2>
          </div>
          <TextLink href="/countries">Все направления</TextLink>
        </div>
        <div className="country-grid">
          {countries
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
            .map((item) => (
              <Link
                className="country-card"
                href={`/countries/${item.slug}`}
                key={item.slug}
                data-reveal
              >
                <div className="country-card-image image-frame">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                  <span>{item.en}</span>
                </div>
                <div className="country-card-info">
                  <span className="micro-label">{item.region}</span>
                  <div>
                    <h3>{item.name}</h3>
                    <ArrowUpRight
                      size={24}
                      strokeWidth={1.2}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-orbits" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="container cta-inner">
          <Eyebrow>Следующая глава</Eyebrow>
          <h2 data-reveal>
            {country.name} —<br />
            <em>начнём с ваших планов.</em>
          </h2>
          <p data-reveal>
            Расскажите, почему вы рассматриваете это направление. Сформулируем
            задачу и определим отправную точку.
          </p>
          <div data-reveal>
            <ButtonLink href={consultationHref}>Обсудить мои планы</ButtonLink>
          </div>
          <span className="cta-coordinate">
            {country.en.toUpperCase()} &nbsp; / &nbsp; ВАШ НОВЫЙ ГОРИЗОНТ
          </span>
        </div>
      </section>
    </>
  );
}
