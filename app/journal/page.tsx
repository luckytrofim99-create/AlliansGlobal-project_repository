import type { Metadata } from "next";
import { PageCard, PageClosing, PageHero, PageLink, PageSection, PageShell } from "@/components/pages/PageKit";
import { articles } from "@/lib/content";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = {
  title: "Полезное",
  description:
    "Материалы о подготовке к переезду, выборе направления и первом разговоре со специалистом. Больше понимания перед следующим шагом.",
};

export default function JournalPage() {
  return (
    <PageShell>
      <PageHero
        title="Больше понимания. До следующего шага."
        intro="Мысли, вопросы и ориентиры, которые помогут подготовиться к разговору о ваших международных планах. Начните с того, что важно сейчас."
        compact
      >
        <PageLink href="#explore" secondary>Выбрать материал</PageLink>
      </PageHero>

      <PageSection id="explore">
        <div className={styles.pair} aria-label="Материалы о подготовке к переезду">
          {articles.map((article) => (
            <PageCard
              key={article.slug}
              title={article.title}
              body={article.excerpt}
              image={article.image}
              label={`${article.category} · ${article.readTime} чтения`}
              href={`/journal/${article.slug}`}
              action="Читать материал"
            />
          ))}
        </div>
      </PageSection>

      <PageClosing
        title="Ваш вопрос заслуживает отдельного разговора."
        text="Материалы помогают сориентироваться. Ваши обстоятельства подскажут, с чего стоит начать дальше."
      />
    </PageShell>
  );
}
