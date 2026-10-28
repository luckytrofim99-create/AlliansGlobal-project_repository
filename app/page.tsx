import type { Metadata } from "next";
import "@fontsource/manrope/cyrillic-700.css";
import "@fontsource/manrope/latin-700.css";
import HomeJourney from "@/components/home/HomeJourney";

export const metadata: Metadata = {
  title: "Учёба за рубежом — визы и переезд",
  description:
    "Образование за рубежом, визовые вопросы и подготовка к переезду. Разберём учебные планы и документы для вас и семьи.",
};

export default function Home() {
  return <HomeJourney />;
}
