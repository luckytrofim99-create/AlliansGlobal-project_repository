import type { Metadata } from "next";
import CountryExplorer from "@/components/CountryExplorer";
import { ButtonLink, CTA, Eyebrow, PageHero, TextLink } from "@/components/ui";
import { countries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Направления",
  description:
    "Канада, США, Европа, Великобритания, Австралия, Новая Зеландия и Южная Корея. Изучите направления Alliance Global и начните с вашей цели.",
};

export default function CountriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Направления"
        title="Новые координаты."
        accent="Вашей жизни."
        description="Важен не только пункт назначения, но и жизнь, которую вы хотите построить. Найдите направление для следующей главы."
      />
      <section className="section container" id="explore">
        <div className="section-head">
          <div>
            <Eyebrow>География возможностей</Eyebrow>
            <h2 data-reveal>
              Каждая страна —<br />
              <em>другая перспектива.</em>
            </h2>
          </div>
          <div className="section-head-aside">
            <p>
              Семь направлений. Разные обстоятельства. Один подход: начинать с
              того, что важно вам.
            </p>
          </div>
        </div>
        <CountryExplorer items={countries} />
      </section>
      <section className="section container">
        <div className="split-section">
          <div data-reveal>
            <Eyebrow>Когда выбор ещё впереди</Eyebrow>
            <h2>
              Можно начать
              <br />
              <em>без точки на карте.</em>
            </h2>
          </div>
          <div className="prose" data-reveal>
            <p>
              Если вы пока сравниваете страны, сначала определите цель. Что вы
              хотите изменить, что сохранить и кто будет рядом на новом этапе?
            </p>
            <p>
              Работа, образование, семья и собственное дело формируют разные
              запросы. Возможные основания, формат обращения и состав помощи
              рассматриваются применительно к конкретной ситуации.
            </p>
            <TextLink href="/programs">Начать с моей задачи</TextLink>
            <ButtonLink variant="outline">Обсудить мои планы</ButtonLink>
          </div>
        </div>
      </section>
      <CTA
        title={
          <>
            Не обязательно знать страну.
            <br />
            <em>Достаточно знать свою цель.</em>
          </>
        }
        text="Расскажите, каким вы видите следующий этап. Вместе определим вопросы, с которых стоит начать."
      />
    </>
  );
}
