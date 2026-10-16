import type { Metadata } from "next";
import { ButtonLink, CTA, Eyebrow, PageHero, TextLink } from "@/components/ui";
import { programs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ваши задачи",
  description:
    "Спорт, работа, образование, бизнес, семья и удалённая работа. Начните с вашей цели, даже если название программы ещё неизвестно.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Ваши задачи"
        title="Сначала ваша цель."
        accent="Затем направление."
        description="Вы можете ещё не знать название нужной программы. Достаточно понимать, какой следующий шаг вы хотите сделать."
      />

      <section className="section container" id="explore">
        <div className="section-head" data-reveal>
          <Eyebrow>Жизненные ситуации</Eyebrow>
          <h2>
            Международные планы.
            <br />
            <em>Личные причины.</em>
          </h2>
        </div>
        <div className="program-grid">
          {programs.map((program, index) => (
            <article
              className="program-card"
              id={program.slug}
              key={program.slug}
              data-reveal
            >
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Eyebrow>{program.tag}</Eyebrow>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <TextLink href="/consultation">Обсудить мою ситуацию</TextLink>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="split-section" data-reveal>
          <div>
            <Eyebrow>Общий взгляд</Eyebrow>
            <h2>
              Ваш маршрут может
              <br />
              <em>соединять несколько целей.</em>
            </h2>
          </div>
          <div className="prose">
            <p>
              Работа одного человека меняет планы всей семьи. Образование может
              быть частью спортивной карьеры. Развитие бизнеса — причиной нового
              образа жизни.
            </p>
            <p>
              Мы начинаем с целой картины: кто планирует переезд, что уже
              определено и какие обстоятельства необходимо учесть. Это помогает
              сформулировать задачу до выбора конкретного основания.
            </p>
            <p>
              Не все сценарии доступны в каждой стране. Возможные варианты и
              состав сопровождения уточняются применительно к вашему запросу.
            </p>
            <ButtonLink href="/countries" variant="outline">
              Изучить направления
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head" data-reveal>
          <Eyebrow>Что стоит обдумать</Eyebrow>
          <h2>
            До выбора программы —<br />
            <em>три простых вопроса.</em>
          </h2>
        </div>
        <ol className="numbered-list" data-reveal>
          <li>
            <span>01</span>
            <div>
              <h3>Что вы хотите изменить?</h3>
              <p>
                Опишите цель своими словами. Не ограничивайте её названием визы
                или программы, которое встретили при поиске.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Что важно сохранить?</h3>
              <p>
                Работу, возможность жить вместе с близкими, образовательную
                траекторию, собственное дело или привычный ритм жизни.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Что уже известно?</h3>
              <p>
                Приглашение, предполагаемая страна, состав семьи и предыдущие
                обращения помогают определить отправную точку.
              </p>
            </div>
          </li>
        </ol>
      </section>
      <CTA
        title={
          <>
            Одна цель может открыть
            <br />
            <em>несколько маршрутов.</em>
          </>
        }
        text="Расскажите о ваших планах. Начнём с обстоятельств, которые имеют значение именно для вас."
      />
    </>
  );
}
