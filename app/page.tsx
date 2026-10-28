import type { Metadata } from "next";
import "@fontsource/manrope/cyrillic-700.css";
import "@fontsource/manrope/latin-700.css";
import HomeJourney from "@/components/home/HomeJourney";

export const metadata: Metadata = {
  title: "Визы и переезд с планом действий",
  description:
    "Визы, ВНЖ, ПМЖ и гражданство. Юридическая помощь за рубежом для вас, семьи и бизнеса. Сроки нашей работы закрепляем в договоре.",
};

export default function Home() {
  return <HomeJourney />;
}
