import type { Metadata } from "next";
import { Compass, MessageCircle, Route } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";
import { Eyebrow, PageHero } from "@/components/ui";
export const metadata: Metadata = {
  title: "Обсудить вашу ситуацию",
  description:
    "Расскажите о вашей цели, выберите направление и подготовьтесь к первому разговору с Alliance Global.",
};
export default async function ConsultationPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
  const { country } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Консультация"
        title="Ваши планы заслуживают"
        accent="внимательного разговора."
        description="Страна уже выбрана или вы только думаете о переменах — начнём с того, что важно для вас."
      />
      <section className="container consultation-layout" id="explore">
        <div className="consultation-intro">
          <Eyebrow>Место для ваших планов</Eyebrow>
          <h2>
            Необязательно знать
            <br />
            <em>все ответы.</em>
          </h2>
          <p>
            Достаточно рассказать, какой следующий шаг вы хотите сделать.
            Остальные вопросы разберём последовательно.
          </p>
          <div className="consultation-points">
            <div className="consultation-point">
              <MessageCircle />
              <div>
                <strong>Сначала — ваша история</strong>
                <p>Учитываем личные обстоятельства, цели и предыдущий опыт.</p>
              </div>
            </div>
            <div className="consultation-point">
              <Compass />
              <div>
                <strong>Затем — возможные направления</strong>
                <p>Определяем, что стоит изучить и какие вопросы проверить.</p>
              </div>
            </div>
            <div className="consultation-point">
              <Route />
              <div>
                <strong>В итоге — следующий шаг</strong>
                <p>Понимание отправной точки и состава дальнейшей работы.</p>
              </div>
            </div>
          </div>
        </div>
        <ConsultationForm initialCountry={country} />
      </section>
    </>
  );
}
