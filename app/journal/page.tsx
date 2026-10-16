import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTA, PageHero } from "@/components/ui";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Полезное",
  description:
    "Материалы о подготовке к переезду, выборе направления и первом разговоре со специалистом. Больше понимания перед следующим шагом.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Полезное"
        title="Больше понимания."
        accent="До следующего шага."
        description="Мысли, вопросы и ориентиры, которые помогут подготовиться к разговору о ваших международных планах. Начните с того, что важно сейчас."
      />

      <section
        className="journal-page section container"
        id="explore"
        aria-label="Материалы о подготовке к переезду"
      >
        <div className="journal-grid">
          {articles.map((article) => (
            <Link
              href={`/journal/${article.slug}`}
              className="article-card"
              key={article.slug}
              data-reveal
            >
              <div className="article-image image-frame">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 88vw, 44vw"
                />
              </div>
              <div className="article-meta">
                <span>{article.category}</span>
                <span>{article.readTime} чтения</span>
              </div>
              <h3>{article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              <div className="article-read">
                <span>Читать материал</span>
                <ArrowUpRight size={18} strokeWidth={1.3} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA
        title={
          <>
            Ваш вопрос заслуживает
            <br />
            <em>отдельного разговора.</em>
          </>
        }
        text="Материалы помогают сориентироваться. Ваши обстоятельства подскажут, с чего стоит начать дальше."
      />
    </>
  );
}
