import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow${light ? " light" : ""}`}>
      <span />
      {children}
    </div>
  );
}
export function ButtonLink({
  children,
  href = "/consultation",
  variant = "navy",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "navy" | "light" | "outline";
  className?: string;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      <span>{children}</span>
      <ArrowUpRight size={18} strokeWidth={1.4} />
    </Link>
  );
}
export function TextLink({
  children,
  href,
  light = false,
}: {
  children: ReactNode;
  href: string;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`text-link${light ? " light" : ""}`}>
      <span>{children}</span>
      <ArrowRight size={20} strokeWidth={1.3} />
    </Link>
  );
}
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo${light ? " light" : ""}`}
      aria-label="Alliance Global — главная"
    >
      <svg
        className="logo-symbol"
        width="54"
        height="58"
        viewBox="0 0 60 62"
        aria-hidden="true"
      >
        <ellipse
          cx="29"
          cy="31"
          rx="23"
          ry="27"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(22 29 31)"
        />
        <path
          d="M13 48 31 10l16 38M21 34h19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M48 19C37 5 21 18 22 33c.5 16 17 23 27 10V32H36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span className="wordmark">
        ALLIANCE<span>G L O B A L</span>
      </span>
    </Link>
  );
}
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero container">
      <div className="breadcrumb">
        <Link href="/">Главная</Link>
        <span>/</span>
        <span>{eyebrow}</span>
      </div>
      <div className="page-hero-grid">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 data-reveal>
            {title}
            {accent && (
              <>
                <br />
                <em>{accent}</em>
              </>
            )}
          </h1>
        </div>
        <div className="page-hero-aside" data-reveal>
          <p>{description}</p>
          {children ?? (
            <a
              href="#explore"
              className="circle-link"
              aria-label="Перейти к содержанию"
            >
              <ArrowDown size={20} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
export function CTA({
  eyebrow = "Ваш следующий шаг",
  title = (
    <>
      Следующая глава
      <br />
      <em>начинается с разговора.</em>
    </>
  ),
  text = "Расскажите, что вы планируете. Начнём с ваших целей и найдём отправную точку.",
}: {
  eyebrow?: string;
  title?: ReactNode;
  text?: string;
}) {
  return (
    <section className="cta-section">
      <div className="cta-orbits" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="container cta-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 data-reveal>{title}</h2>
        <p data-reveal>{text}</p>
        <div data-reveal>
          <ButtonLink>Обсудить мои планы</ButtonLink>
        </div>
        <span className="cta-coordinate">
          ВАШ МИР &nbsp; / &nbsp; ВАШ МАРШРУТ &nbsp; / &nbsp; ВАША СЛЕДУЮЩАЯ
          ГЛАВА
        </span>
      </div>
    </section>
  );
}
