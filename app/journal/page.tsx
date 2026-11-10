import type { Metadata } from "next";
import { PageCard, PageClosing, PageHero, PageLink, PageSection, PageShell } from "@/components/pages/PageKit";
import { articles } from "@/lib/content";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = {
  title: "Журнал",
  description:
    "Как выбрать страну, подготовиться к консультации и согласовать объём сопровождения.",
};

export default function JournalPage() {
  return (
    <PageShell>
      <PageHero
        title="Визы и документы в деталях"
        intro="Обучение, визы, работа и переезд. Материалы по семи направлениям и подготовке документов."
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
        title="Разбор вашей ситуации"
        text="Опишите цель и документы для разбора на консультации."
      />
    </PageShell>
  );
}
