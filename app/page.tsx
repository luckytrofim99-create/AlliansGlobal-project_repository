import type { Metadata } from "next";
import "@fontsource/manrope/cyrillic-700.css";
import "@fontsource/manrope/latin-700.css";
import HomeJourney from "@/components/home/HomeJourney";

export const metadata: Metadata = {
  title: "Визы и переезд с понятным планом",
  description:
    "Поможем выбрать основание для переезда, подготовить документы и пройти этапы подачи. Для вас, вашей семьи и бизнеса.",
};

export default function Home() {
  return <HomeJourney />;
}
