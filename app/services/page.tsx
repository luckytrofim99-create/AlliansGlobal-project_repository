import type { Metadata } from "next";
import { Compass, Globe2, House, BookUser, Route } from "lucide-react";
import FAQ from "@/components/FAQ";
import { PageClosing, PageHero, PageLink, PageSection, PageShell } from "@/components/pages/PageKit";
import { OverviewCards } from "@/components/pages/OverviewCards";
import styles from "@/components/pages/OverviewPages.module.css";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Документы для визы, проживания и гражданства. Выбор страны и дальнейшие действия после отказа.",
};

const services = [
  { id: "visas", title: "Визы", text: "Документы и порядок подачи для вашей поездки.", icon: BookUser, href: "/services/visas" },
  { id: "residence", title: "ВНЖ и ПМЖ", text: "Основание для проживания и план переезда.", icon: House, href: "/services/residence" },
  { id: "citizenship", title: "Гражданство", text: "Основания и документы для вашего обращения.", icon: Globe2, href: "/services/citizenship" },
  { id: "consulting", title: "Выбор страны", text: "Сравните направления под ваши цели и бюджет.", icon: Compass, href: "/services/consulting" },
  { id: "complex-cases", title: "Отказ или смена статуса", text: "Проверьте причины и возможные дальнейшие действия.", icon: Route, href: "/services/complex-cases" },
];

const questions = [
  { question: "Что подготовить к консультации?", answer: "Цель поездки, страну и имеющиеся документы." },
  { question: "Как узнать сроки и стоимость?", answer: "Объём помощи и сроки согласуются до начала работы. Сборы и сторонние услуги учитываются отдельно." },
  { question: "Кто принимает решение по визе?", answer: "Уполномоченное ведомство. Сроки работы агентства закрепляются в договоре." },
];

export default function ServicesPage() {
  return <PageShell className={styles.page}>
    <PageHero
      title="Визы и переезд"
      intro="Узнайте, какие документы нужны для визы, проживания или гражданства."
      image="/images/office-interior.jpg"
      imageAlt="Светлый интерьер для обсуждения планов переезда"
    >
      <PageLink href="#explore">Выбрать услугу</PageLink>
      <PageLink href="/consultation" quiet>Обсудить задачу</PageLink>
    </PageHero>

    <PageSection id="explore" title="С чего начать?">
      <OverviewCards items={services} layout="services" />
    </PageSection>

    <PageSection title="Перед консультацией">
      <div className={styles.faq} data-reveal><FAQ items={questions} /></div>
    </PageSection>

    <PageClosing title="Составьте план подготовки" text="Опишите цель поездки и вашу ситуацию." action="Обсудить задачу" />
  </PageShell>;
}
