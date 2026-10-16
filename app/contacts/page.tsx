import type { Metadata } from "next";
import { Globe2 } from "lucide-react";
import { ButtonLink, Eyebrow, PageHero } from "@/components/ui";
export const metadata: Metadata = { title: "Контакты" };
export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="В любой точке мира."
        accent="В диалоге с вами."
        description="Важные решения начинаются с простого знакомства. Расскажите, о чём вы думаете и с чем нужна помощь."
      />
      <section className="section container split-section" id="explore">
        <div className="prose">
          <Eyebrow>Первый контакт</Eyebrow>
          <h2>
            У каждого запроса
            <br />
            <em>есть своя история.</em>
          </h2>
          <p>
            Если вы рассматриваете поездку, обучение, работу или переезд,
            начните с нескольких слов о вашей цели. Укажите направление и
            вопросы, которые хочется обсудить.
          </p>
          <p>
            Для первого знакомства не нужны готовая стратегия или полный
            комплект документов.
          </p>
          <ButtonLink>Подготовить мой запрос</ButtonLink>
        </div>
        <div className="contact-panel">
          <Eyebrow light>Alliance Global</Eyebrow>
          <h2>
            Ближе к вашей
            <br />
            <em>следующей главе.</em>
          </h2>
          <p>
            Выберите задачу, расскажите о планах и подготовьте обращение в
            удобном формате.
          </p>
          <ButtonLink variant="light">Начать знакомство</ButtonLink>
          <p className="form-note">
            Контактные каналы компании будут добавлены после согласования.
            Сейчас доступна подготовка локального черновика обращения.
          </p>
          <Globe2 aria-hidden="true" />
        </div>
      </section>
    </>
  );
}
