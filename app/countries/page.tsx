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

export default async function CountriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const initialQuery = (Array.isArray(q) ? q[0] : q)?.slice(0, 80) ?? "";
  return (
    <PageShell>
      <PageHero
        title="7 направлений для переезда"
        intro="Сравните направления по цели поездки и планам семьи."
      >
        <PageLink href="#explore">Выбрать направление</PageLink>
        <PageLink href="/programs" secondary>Начать с моей цели</PageLink>
      </PageHero>

      <PageSection
        id="explore"
        title="Сравните условия переезда"
        intro="Найдите направление и узнайте, какие документы и обстоятельства нужно проверить."
      >
        <CountryCatalogue key={initialQuery} items={countries} initialQuery={initialQuery} />
      </PageSection>

      <PageSection title="Не выбрали страну?">
        <PageReading>
          <p>
            Определите цель переезда и обязательные условия: работа, образование или проживание с семьёй.
          </p>
          <p>
            Возможные основания и объём помощи зависят от страны и ваших обстоятельств.
          </p>
          <PageLink href="/programs" quiet>Начать с моей задачи</PageLink>
        </PageReading>
      </PageSection>

      <PageClosing
        title="Страна под вашу цель"
        text="Укажите цель и ограничения для сравнения направлений."
        action="Разобрать мою ситуацию"
      />
    </PageShell>
  );
}
