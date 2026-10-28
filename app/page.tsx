import type { Metadata } from "next";
import "@fontsource/manrope/cyrillic-700.css";
import "@fontsource/manrope/latin-700.css";
import HomeJourney from "@/components/home/HomeJourney";

export const metadata: Metadata = {
  title: "Визы и переезд от выбора до подачи",
  description:
    "Поможем определить основание, подготовить документы и составить план подачи.",
};

export default function Home() {
  return <HomeJourney />;
}
