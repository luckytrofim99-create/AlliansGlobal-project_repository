import type { Metadata } from "next";
import CountryCatalogue from "@/components/pages/CountryCatalogue";
import {
  PageClosing,
  PageHero,
  PageLink,
  PageReading,
  PageSection,
  PageShell,
} from "@/components/pages/PageKit";
import { countries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Направления",
  description:
    "Канада, США, Европа, Великобритания, Австралия, Новая Зеландия и Южная Корея. Изучите направления Alliance Global и начните с вашей цели.",
};

export default function CountriesPage() {
  return (
    <PageShell>
      <PageHero
        title="Новые координаты вашей жизни."
        intro="Важен не только пункт назначения, но и жизнь, которую вы хотите построить. Найдите направление для следующей главы."
      >
        <PageLink href="#explore">Выбрать направление</PageLink>
        <PageLink href="/programs" secondary>Начать с моей цели</PageLink>
      </PageHero>

      <PageSection
        id="explore"
        title="Каждая страна — другая перспектива."
        intro="Семь направлений. Разные обстоятельства. Один подход: начинать с того, что важно вам."
      >
        <CountryCatalogue items={countries} />
      </PageSection>

      <PageSection title="Можно начать без точки на карте.">
        <PageReading>
          <p>
            Если вы пока сравниваете страны, сначала определите цель. Что вы
            хотите изменить, что сохранить и кто будет рядом на новом этапе?
          </p>
          <p>
            Работа, образование, семья и собственное дело формируют разные
            запросы. Возможные основания, формат обращения и состав помощи
            рассматриваются применительно к конкретной ситуации.
          </p>
          <PageLink href="/programs" quiet>Начать с моей задачи</PageLink>
        </PageReading>
      </PageSection>

      <PageClosing
        title="Не обязательно знать страну. Достаточно знать свою цель."
        text="Расскажите, каким вы видите следующий этап. Вместе определим вопросы, с которых стоит начать."
        action="Обсудить мои планы"
      />
    </PageShell>
  );
}
