import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, CTA, Eyebrow, PageHero, TextLink } from "@/components/ui";

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
    <>
      <PageHero
        eyebrow="О компании"
        title="Международные задачи."
        accent="Личное внимание."
        description="Для нас переезд начинается с человека: его целей, семьи, работы и представления о будущем. Именно эта картина задаёт направление всей дальнейшей работе."
      />

      <section className="section container" id="explore">
        <div className="split-section">
          <div data-reveal>
            <Eyebrow>Alliance Global</Eyebrow>
            <h2>
              За каждым маршрутом —<br />
              <em>чья-то новая глава.</em>
            </h2>
            <div className="prose">
              <p>
                Международные планы редко укладываются в один вопрос. Вместе с
                новым предложением о работе возникают семейные задачи. Рядом с
                поступлением — вопросы поездки и проживания. За спортивным
                приглашением стоит целый следующий этап жизни.
              </p>
              <p>
                Alliance Global объединяет эти вопросы в последовательный
                разговор: что вы хотите сделать, какие обстоятельства нужно
                учитывать и с чего стоит начать подготовку.
              </p>
              <p>
                Наша отправная точка — не готовый ответ для всех, а внимательное
                понимание вашей ситуации.
              </p>
            </div>
          </div>
          <div className="image-frame" data-arched="true" data-reveal>
            <Image
              src="/images/office-interior.jpg"
              alt="Светлое пространство для спокойной и сосредоточенной работы"
              width={1000}
              height={1200}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head" data-reveal>
          <Eyebrow>Наши принципы</Eyebrow>
          <h2>
            Важные решения
            <br />
            <em>заслуживают ясности.</em>
          </h2>
        </div>
        <ol className="numbered-list">
          {principles.map((principle, index) => (
            <li key={principle.title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section container">
        <div className="split-section">
          <div className="image-frame" data-reveal>
            <Image
              src="/images/university-campus.jpg"
              alt="Архитектура университетского кампуса"
              width={1200}
              height={1000}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          <div data-reveal>
            <Eyebrow>Связь с Alliance Sport Group</Eyebrow>
            <h2>
              Знакомый контекст.
              <br />
              <em>Более широкий взгляд.</em>
            </h2>
            <div className="prose">
              <p>
                Alliance Global развивает международную повестку, связанную с
                Alliance Sport Group, с отдельным вниманием к визам, проживанию
                и вопросам переезда.
              </p>
              <p>
                Спорт остаётся одной из жизненных ситуаций, с которыми может
                быть связан международный маршрут. Наряду с ним мы рассматриваем
                работу, образование, предпринимательские и семейные планы.
              </p>
              <p>
                Спортивная карьера и миграционные документы требуют
                самостоятельного рассмотрения. Важно видеть их связь и при этом
                понимать, какая задача решается на каждом этапе.
              </p>
            </div>
            <TextLink href="/programs#sport">
              Спорт и международные планы
            </TextLink>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="split-section" data-reveal>
          <div>
            <Eyebrow>Подход к работе</Eyebrow>
            <h2>
              Не терять человека
              <br />
              <em>за процессом.</em>
            </h2>
          </div>
          <div className="prose">
            <p>
              На каждом этапе полезно понимать, что уже известно, какие вопросы
              открыты и кто отвечает за следующее действие. Такая
              последовательность помогает принимать решения осознанно.
            </p>
            <ButtonLink href="/approach" variant="outline">
              Как мы работаем
            </ButtonLink>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
