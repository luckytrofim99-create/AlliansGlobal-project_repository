import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  Globe2,
  MapPin,
  MoveUpRight,
  ShieldCheck,
} from "lucide-react";
import { Eyebrow, ButtonLink, TextLink, CTA } from "@/components/ui";
import ScenarioExplorer from "@/components/ScenarioExplorer";
import Journey from "@/components/Journey";
import Globe from "@/components/Globe";
import FAQ from "@/components/FAQ";
import { services, countries, articles, faq } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="home-hero container">
        <div className="hero-copy">
          <Eyebrow>Иммиграция и международный консалтинг</Eyebrow>
          <h1 className="hero-title">
            <span className="line">
              <span className="line-inner">
                Ваше будущее <span className="hero-dash">—</span>
              </span>
            </span>
            <span className="line">
              <em className="line-inner">без границ.</em>
            </span>
          </h1>
          <p className="hero-description" data-reveal>
            Новая страна. Новые возможности.
            <br />
            Визы, переезд и стратегия для жизни,
            <br className="desktop-break" /> которую вы выбираете.
          </p>
          <div className="hero-buttons" data-reveal>
            <ButtonLink>Обсудить мою задачу</ButtonLink>
            <TextLink href="/services">Наши услуги</TextLink>
          </div>
          <div className="hero-bottom" data-reveal>
            <a href="#possibilities" className="hero-scroll">
              <span className="circle-link">
                <ArrowDown size={17} />
              </span>
              <span>ВПЕРЕДИ — БОЛЬШЕ</span>
            </a>
            <span className="hero-asg">
              Новый горизонт
              <br />
              <strong>Alliance Sport Group</strong>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <span className="hero-side-label">A WORLD OF POSSIBILITIES</span>
          <div className="hero-arch">
            <Image
              className="hero-photo"
              src="/images/hero-arch.jpg"
              alt="Вид на Рим через светлую каменную арку"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <div className="hero-image-shade" />
            <div className="hero-image-label">
              <MapPin size={13} />
              <span>НОВЫЕ КООРДИНАТЫ ВАШЕЙ ЖИЗНИ</span>
            </div>
          </div>
          <div className="hero-floating-note">
            <span className="note-symbol">
              <MoveUpRight size={25} strokeWidth={1} />
            </span>
            <span>
              Мир меняется.
              <br />
              <strong>Вы выбираете направление.</strong>
            </span>
            <span className="note-dot" />
          </div>
          <div className="hero-coordinate">
            41° 54′ N &nbsp; 12° 29′ E<span>ROME, ITALY</span>
          </div>
        </div>
      </section>
      <div className="values-rail container">
        <span>
          <Compass />
          Ваша цель — основа стратегии
        </span>
        <span>
          <Globe2 />
          Международный взгляд
        </span>
        <span>
          <ShieldCheck />
          Внимание к каждой детали
        </span>
        <span className="rail-end">PERSONAL ROUTE. GLOBAL THINKING.</span>
      </div>
      <section className="section container home-services" id="possibilities">
        <div className="section-head">
          <div>
            <Eyebrow>Возможности</Eyebrow>
            <h2 data-reveal>
              Для жизни,
              <br />
              <em>которую вы выбираете.</em>
            </h2>
          </div>
          <div className="section-head-aside">
            <p>
              От одного документа до нового этапа жизни. Соединяем ваши планы с
              понятным маршрутом.
            </p>
            <TextLink href="/services">Все услуги</TextLink>
          </div>
        </div>
        <div className="home-service-grid">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`home-service${i === 4 ? " service-wide" : ""}`}
              data-reveal
            >
              <span className="service-index">0{i + 1} /</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
              </div>
              <ArrowUpRight size={28} strokeWidth={1} />
            </Link>
          ))}
        </div>
      </section>
      <section className="world-section">
        <div className="world-grid-lines" aria-hidden="true" />
        <div className="container world-inner">
          <div className="world-copy">
            <Eyebrow light>География ваших планов</Eyebrow>
            <h2 data-reveal>
              Мир шире
              <br />
              <em>одного маршрута.</em>
            </h2>
            <p data-reveal>
              Место, которое станет вашим.
              <br />
              Начните со страны — или с мечты.
            </p>
            <div className="world-destinations">
              {countries.slice(0, 4).map((country, i) => (
                <Link key={country.slug} href={`/countries/${country.slug}`}>
                  <span>0{i + 1}</span>
                  {country.name}
                  <ArrowUpRight size={17} />
                </Link>
              ))}
            </div>
            <TextLink href="/countries" light>
              Открыть все направления
            </TextLink>
          </div>
          <div className="world-visual">
            <Globe />
            <span className="globe-cross cross-one">+</span>
            <span className="globe-cross cross-two">+</span>
            <div className="globe-location">
              <span className="pulsing-dot" />
              ВАШ МИР. ВАШ МАРШРУТ.
            </div>
            <div className="globe-annotation">
              GLOBAL PERSPECTIVE
              <br />
              <span>PERSONAL APPROACH</span>
            </div>
          </div>
        </div>
        <div className="world-footnote container">
          <span>
            СЕВЕРНАЯ АМЕРИКА &nbsp; / &nbsp; ЕВРОПА &nbsp; / &nbsp; АЗИЯ &nbsp;
            / &nbsp; ОКЕАНИЯ
          </span>
          <span>Возможности определяются вашей ситуацией</span>
        </div>
      </section>
      <section className="section container">
        <div className="section-head">
          <div>
            <Eyebrow>Ваша отправная точка</Eyebrow>
            <h2 data-reveal>
              У каждого переезда
              <br />
              <em>своя история.</em>
            </h2>
          </div>
          <div className="section-head-aside">
            <p>
              Карьера, семья, образование или свобода менять города. Что важно
              именно для вас?
            </p>
          </div>
        </div>
        <ScenarioExplorer />
      </section>
      <section className="about-home section">
        <div className="container about-home-grid">
          <div className="about-image-composition" data-reveal>
            <div className="about-arch image-frame">
              <Image
                src="/images/office-interior.jpg"
                alt="Светлое пространство для новых идей"
                fill
                sizes="(max-width: 760px) 100vw, 40vw"
                data-parallax
              />
            </div>
            <div className="about-stamp">
              <span>ALLIANCE</span>
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <path
                  d="M8 31 20 7l12 24M13 23h14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth=".5"
                />
              </svg>
              <span>GLOBAL</span>
            </div>
          </div>
          <div className="about-home-copy">
            <Eyebrow>Знакомство</Eyebrow>
            <h2 data-reveal>
              Международный опыт.
              <br />
              <em>Личное внимание.</em>
            </h2>
            <p className="lead" data-reveal>
              Важные перемены требуют большего, чем стандартное решение.
            </p>
            <p data-reveal>
              Alliance Global развивает международное направление Alliance Sport
              Group. В центре нашей работы — человек, его обстоятельства и планы
              на будущее.
            </p>
            <p data-reveal>
              Сначала мы слушаем. Затем вместе определяем, с чего начать и какие
              шаги предпринять.
            </p>
            <TextLink href="/about">Ближе познакомиться</TextLink>
            <div className="asg-signature">
              <span className="asg-text">
                ASG<span>ALLIANCE SPORT GROUP</span>
              </span>
              <span className="signature-line" />
              <span>
                Общий взгляд.
                <br />
                Новые горизонты.
              </span>
            </div>
          </div>
        </div>
      </section>
      <Journey />
      <section className="complex-section">
        <div className="container complex-inner">
          <span className="complex-symbol" aria-hidden="true">
            ↗
          </span>
          <div>
            <Eyebrow light>Нестандартные обстоятельства</Eyebrow>
            <h2 data-reveal>
              Не каждый путь
              <br />
              <em>начинается с чистого листа.</em>
            </h2>
            <p>
              Предыдущий отказ, смена статуса или подача из другой страны.
              Давайте внимательно разберём вашу историю.
            </p>
          </div>
          <ButtonLink href="/services/complex-cases" variant="outline">
            Разобрать ситуацию
          </ButtonLink>
        </div>
      </section>
      <section className="section container">
        <div className="section-head">
          <div>
            <Eyebrow>Журнал Alliance Global</Eyebrow>
            <h2 data-reveal>
              Больше ясности.
              <br />
              <em>Меньше неизвестности.</em>
            </h2>
          </div>
          <TextLink href="/journal">Все материалы</TextLink>
        </div>
        <div className="journal-grid">
          {articles.slice(0, 3).map((article) => (
            <Link
              className="article-card"
              href={`/journal/${article.slug}`}
              key={article.slug}
              data-reveal
            >
              <div className="article-image image-frame">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <div className="article-meta">
                <span>{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <span className="article-read">
                Читать материал
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section faq-section container">
        <div>
          <Eyebrow>Перед первым шагом</Eyebrow>
          <h2 data-reveal>
            Возможно, вы
            <br />
            <em>хотели спросить.</em>
          </h2>
          <p>
            Несколько ответов, чтобы начать
            <br />
            разговор было проще.
          </p>
        </div>
        <FAQ items={faq} />
      </section>
      <CTA />
    </>
  );
}
