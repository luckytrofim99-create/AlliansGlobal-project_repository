import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageClosing, PageHero, PageLink, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import { articles } from "@/lib/content";
import styles from "@/components/pages/EditorialLayouts.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: "Материал не найден" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <PageShell>
      <PageHero title={article.title} intro={article.excerpt} image={article.image} imageAlt="">
        <div className={styles.articleMeta}>
          <span>{article.category}</span>
          <span>{article.readTime} чтения</span>
          <span>Alliance Global</span>
        </div>
        <PageLink href="/journal" quiet>Все материалы</PageLink>
      </PageHero>

      <PageSection>
        <div className={styles.articleLayout}>
          <nav className={styles.toc} aria-label="Содержание материала">
            <p>В этом материале</p>
            <ol>
              {article.sections.map((section, index) => (
                <li key={section.title}><a href={`#section-${index + 1}`}>{section.title}</a></li>
              ))}
            </ol>
          </nav>

          <article>
            <PageReading>
              {article.sections.map((section, index) => (
                <section className={styles.articleSection} id={`section-${index + 1}`} key={section.title} data-reveal>
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </section>
              ))}
              <aside className={styles.note} data-reveal>
                <p>Материал посвящён подготовке. Требования к программам и документам проверяются по стране и вашей ситуации.</p>
              </aside>
              <PageLink href="/journal" quiet>Все материалы</PageLink>
            </PageReading>
          </article>
        </div>
      </PageSection>

      <PageClosing title="Подготовьте вопросы по своему обращению" text="Укажите цель и вопросы для консультации." />
    </PageShell>
  );
}
