import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA, Eyebrow, TextLink } from "@/components/ui";
import { articles } from "@/lib/content";

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
    <>
      <header className="article-hero container">
        <div className="breadcrumb">
          <Link href="/">Главная</Link>
          <span>/</span>
          <Link href="/journal">Полезное</Link>
          <span>/</span>
          <span>{article.category}</span>
        </div>
        <Eyebrow>{article.category}</Eyebrow>
        <h1 data-reveal>{article.title}</h1>
        <div className="article-meta" data-reveal>
          <span>Alliance Global</span>
          <span>{article.readTime} чтения</span>
        </div>
      </header>

      <div className="article-cover image-frame container" data-reveal>
        <Image src={article.image} alt="" fill priority sizes="88vw" />
      </div>

      <div className="article-body-layout container">
        <aside
          className="article-toc"
          aria-label="Содержание материала"
          data-reveal
        >
          <span className="micro-label">В этом материале</span>
          {article.sections.map((section, index) => (
            <a href={`#section-${index + 1}`} key={section.title}>
              {section.title}
            </a>
          ))}
        </aside>

        <article className="prose">
          <p className="article-intro" data-reveal>
            {article.excerpt}
          </p>
          {article.sections.map((section, index) => (
            <section
              id={`section-${index + 1}`}
              key={section.title}
              data-reveal
            >
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <p className="article-note" data-reveal>
            Этот материал посвящён общей подготовке. Условия конкретных
            программ, требования к документам и возможные действия необходимо
            проверять отдельно с учётом страны и вашей ситуации.
          </p>
          <div data-reveal>
            <TextLink href="/journal">Все материалы</TextLink>
          </div>
        </article>
      </div>

      <CTA
        title={
          <>
            От общего понимания —<br />
            <em>к вашей ситуации.</em>
          </>
        }
        text="Расскажите, что вы планируете. Определим вопросы, с которых стоит начать дальнейшее обсуждение."
      />
    </>
  );
}
