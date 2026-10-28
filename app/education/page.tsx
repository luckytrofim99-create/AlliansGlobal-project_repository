import type { Metadata } from "next";
import EducationIntro from "@/components/pages/EducationIntro";
import { PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";

export const metadata: Metadata = {
  title: "Образование за рубежом",
  description: "Учебные планы, визовые документы и вопросы переезда семьи. Подготовка к поездке в школу или университет.",
};

export default function EducationPage() {
  return <PageShell>
    <EducationIntro />
    <PageSection id="preparation" title="Перед консультацией об учёбе">
      <PageReading>
        <p data-reveal>Укажите уровень обучения, страну и предполагаемую дату начала. Если есть приглашение, подготовьте его для разбора.</p>
        <div data-reveal><PageLink href="/journal/uk-student-visa" quiet>Студенческая виза в Великобританию</PageLink></div>
      </PageReading>
    </PageSection>
  </PageShell>;
}
