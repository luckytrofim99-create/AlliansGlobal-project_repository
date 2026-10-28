import Image from "next/image";
import type { ReactNode } from "react";
import { ActionLink } from "@/components/actions/Action";
import theme from "@/components/home/HomeTheme.module.css";
import { RevealWords } from "@/components/home/JourneyMotion";
import { PageMotion, PagePhotoMotion } from "./PageMotion";
import styles from "./PageKit.module.css";
import { LocalizedTree } from "@/components/alliance/AllianceLocale";

type Children = { children: ReactNode; className?: string };

export function PageShell({ children, className = "" }: Children) {
  return <div className={`${theme.surface} ${styles.page} ${className}`} data-paper-page><PageMotion><LocalizedTree>{children}</LocalizedTree></PageMotion></div>;
}

export function PageHero({ title, intro, image, imageAlt = "", compact = false, children }: {
  title: string; intro?: string; image?: string; imageAlt?: string; compact?: boolean; children?: ReactNode;
}) {
  return <header className={`${styles.hero} ${image ? styles.heroSplit : ""} ${compact ? styles.compact : ""}`}>
    <div className={styles.heroCopy}>
      <ActionLink href="/" variant="quiet" size="compact" className={styles.back}>На главную</ActionLink>
      <h1 data-reveal><RevealWords>{title}</RevealWords></h1>
      {intro && <p className={styles.lead} data-reveal>{intro}</p>}
      {children && <div className={styles.actions} data-reveal>{children}</div>}
    </div>
    {image && <div className={styles.heroFigure} data-reveal="picture"><PagePhotoMotion><Image src={image} alt={imageAlt} fill sizes="(min-width: 1000px) 46vw, 90vw" loading="eager" /></PagePhotoMotion></div>}
  </header>;
}

export function PageSection({ title, intro, id, children, className = "" }: {
  title?: ReactNode; intro?: string; id?: string; children: ReactNode; className?: string;
}) {
  return <section className={`${styles.section} ${className}`} id={id}>
    {(title || intro) && <div className={styles.sectionHead} data-reveal>{title && <h2>{typeof title === "string" ? <RevealWords>{title}</RevealWords> : title}</h2>}{intro && <p>{intro}</p>}</div>}
    {children}
  </section>;
}

export function PageColumns({ children, className = "" }: Children) {
  return <div className={`${styles.columns} ${className}`}>{children}</div>;
}

export function PageCard({ title, body, image, href, action = "Подробнее", label, children }: {
  title: string; body?: string; image?: string; href?: string; action?: string; label?: string; children?: ReactNode;
}) {
  return <article className={styles.card} data-reveal>
    {image && <div className={styles.cardImage}><Image src={image} alt="" fill sizes="(min-width: 1100px) 32vw, (min-width: 700px) 46vw, 90vw" /></div>}
    <div className={styles.cardBody}><h3>{title}</h3>{label && <p className={styles.context}>{label}</p>}{body && <p>{body}</p>}{children}{href && <PageLink href={href} quiet>{action}</PageLink>}</div>
  </article>;
}

export function PageLink({ href, children, secondary = false, quiet = false, variant }: {
  href: string; children: ReactNode; secondary?: boolean; quiet?: boolean; variant?: "primary" | "secondary" | "light" | "quiet";
}) {
  const appearance = variant ?? (quiet ? "quiet" : secondary ? "secondary" : "primary");
  return <ActionLink href={href} variant={appearance} className={appearance === "quiet" ? styles.quiet : styles.action}>{children}</ActionLink>;
}

export function PageList({ items }: { items: readonly string[] }) {
  return <ul className={styles.list}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function PageClosing({ title = "Определите первый шаг", text = "Опишите задачу и имеющиеся документы для разбора.", href = "/consultation", action = "Запросить консультацию" }: {
  title?: ReactNode; text?: string; href?: string; action?: string;
}) {
  return <section className={styles.closing} data-reveal><div><h2>{title}</h2><p>{text}</p></div><PageLink href={href} variant="light">{action}</PageLink></section>;
}

export function PageReading({ children, className = "" }: Children) {
  return <div className={`${styles.reading} ${className}`}>{children}</div>;
}
