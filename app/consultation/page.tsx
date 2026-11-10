import type { Metadata } from "next";
import ConsultationForm from "@/components/ConsultationForm";
import { PageHero, PageShell } from "@/components/pages/PageKit";

export const metadata: Metadata = {
  title: "Обсудить вашу ситуацию",
  description:
    "Расскажите о вашей цели, выберите направление и подготовьтесь к первому разговору с Alliance Global.",
};

export default async function ConsultationPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; goal?: string }>;
}) {
  const { country, goal } = await searchParams;
  return (
    <PageShell>
      <PageHero
        title="Разбор вашей ситуации"
        intro="Укажите цель и страну, чтобы подготовить вопросы об основаниях, документах и сроках."
        compact
      />
      <ConsultationForm initialCountry={country} initialGoal={goal} />
    </PageShell>
  );
}
