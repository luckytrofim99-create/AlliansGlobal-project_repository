"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TravelDossier.module.css";

function GlobeEmblem() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="36" />
      <ellipse cx="50" cy="50" rx="17" ry="36" />
      <ellipse cx="50" cy="50" rx="36" ry="14" />
      <path d="M14 50h72M50 14v72M22 28c17 13 39 13 56 0M22 72c17-13 39-13 56 0" />
      <path d="M9 50H3m94 0h-6M50 3v6m0 82v6" opacity=".55" />
      <circle cx="50" cy="50" r="44" opacity=".3" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="m5 8 2 2 4-4" />
    </svg>
  );
}

/** A decorative client dossier, rather than an official travel document. */
export default function TravelDossier() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 901px)",
          mobile: "(max-width: 900px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (matchContext) => {
          const { desktop, reduceMotion } = matchContext.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };
          if (reduceMotion) return;

          const section = sectionRef.current;
          if (!section) return;
          const book = section.querySelector('[data-dossier="book"]');
          const routeCard = section.querySelector(
            '[data-dossier="route-card"]',
          );
          const documentsCard = section.querySelector(
            '[data-dossier="documents-card"]',
          );
          const route = section.querySelector<SVGPathElement>(
            '[data-dossier="route"]',
          );
          const progress = section.querySelector('[data-dossier="progress"]');

          if (desktop) {
            section.dataset.animated = "true";
            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            });

            timeline
              .fromTo(
                book,
                { transform: "translate3d(-2%, 8%, 0) rotate(-9deg)" },
                {
                  transform: "translate3d(-17%, 4%, 0) rotate(-17deg)",
                  duration: 1,
                },
                0,
              )
              .fromTo(
                routeCard,
                { transform: "translate3d(-22%, 25%, 0) rotate(-5deg)" },
                {
                  transform: "translate3d(7%, -7%, 0) rotate(7deg)",
                  duration: 0.82,
                },
                0.06,
              )
              .fromTo(
                documentsCard,
                { transform: "translate3d(-33%, -22%, 0) rotate(-8deg)" },
                {
                  transform: "translate3d(5%, 3%, 0) rotate(4deg)",
                  duration: 0.8,
                },
                0.14,
              )
              .fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);

            if (route) {
              const routeLength = route.getTotalLength();
              timeline.fromTo(
                route,
                { strokeDasharray: routeLength, strokeDashoffset: routeLength },
                { strokeDashoffset: 0, duration: 0.8 },
                0.12,
              );
            }
            return () => {
              delete section.dataset.animated;
            };
          } else {
            gsap.fromTo(
              section.querySelectorAll("[data-dossier-reveal]"),
              { opacity: 0, transform: "translate3d(0, 18px, 0)" },
              {
                opacity: 1,
                transform: "translate3d(0, 0, 0)",
                duration: 0.65,
                stagger: 0.07,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 82%",
                  once: true,
                },
              },
            );
          }
        },
      );
    }, sectionRef);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="travel-dossier-title"
    >
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.copy} data-dossier-reveal>
            <p className={styles.eyebrow}>
              <span />
              Личная стратегия переезда
            </p>
            <h2 id="travel-dossier-title">
              Не просто <br />
              документы.
              <br />
              <em>
                Начало новой
                <br className={styles.desktopBreak} /> главы.
              </em>
            </h2>
            <p className={styles.description}>
              Цель поездки определяет вопросы к документам. Разберём приглашение, визовую историю и планируемый формат пребывания.
            </p>
            <div className={styles.principles}>
              <div>
                <span>01</span>
                <p>Уточняем цель поездки</p>
              </div>
              <div>
                <span>02</span>
                <p>Определяем перечень документов</p>
              </div>
              <div>
                <span>03</span>
                <p>Согласуем порядок подготовки</p>
              </div>
            </div>
            <div className={styles.progress} aria-hidden="true">
              <div className={styles.progressTrack}>
                <span data-dossier="progress" />
              </div>
              <span>Сначала цель. Затем — путь.</span>
              <span>AG / 01—03</span>
            </div>
          </div>

          <div className={styles.visual} data-dossier-reveal aria-hidden="true">
            <div className={styles.stage}>
              <div className={styles.mapSurface}>
                <svg viewBox="0 0 640 640" fill="none">
                  <circle cx="330" cy="320" r="244" />
                  <ellipse cx="330" cy="320" rx="130" ry="244" />
                  <ellipse cx="330" cy="320" rx="244" ry="97" />
                  <path d="M86 320h488M330 76v488M135 174c110 76 279 76 390 0M135 466c110-76 279-76 390 0" />
                  <path d="m65 80 8 0m-4-4v8m492 456h8m-4-4v8M75 563h8m-4-4v8m479-473h8m-4-4v8" />
                </svg>
              </div>
              <div className={styles.surfaceShadow} />
              <svg
                className={styles.routeDrawing}
                viewBox="0 0 640 640"
                fill="none"
              >
                <path
                  className={styles.routeGhost}
                  d="M79 485C39 406 97 236 253 255c181 22 292-63 291-147"
                />
                <path
                  data-dossier="route"
                  className={styles.routePath}
                  d="M79 485C39 406 97 236 253 255c181 22 292-63 291-147"
                />
                <circle cx="79" cy="485" r="6" className={styles.routeDot} />
                <circle cx="544" cy="108" r="6" className={styles.routeDot} />
                <circle cx="79" cy="485" r="14" className={styles.routeHalo} />
                <circle cx="544" cy="108" r="14" className={styles.routeHalo} />
                <path d="m537 115 7-7-1 10" className={styles.routeArrow} />
              </svg>
              <span className={styles.originLabel}>ВАША ОТПРАВНАЯ ТОЧКА</span>
              <span className={styles.destinationLabel}>НОВАЯ ГЛАВА</span>

              <div className={styles.routeCard} data-dossier="route-card">
                <div className={styles.cardHeader}>
                  <span>ПЕРСОНАЛЬНЫЙ МАРШРУТ</span>
                  <span>01</span>
                </div>
                <div className={styles.cardTitle}>Ваша цель</div>
                <p className={styles.cardSubheading}>
                  Больше возможностей.
                  <br />
                  Ближе к тому, что важно.
                </p>
                <div className={styles.miniRoute}>
                  <span />
                  <i />
                  <svg viewBox="0 0 22 22" fill="none">
                    <path d="m3 12 15-7-6 15-2-8-7-0Z" />
                    <path d="m10 12 8-7" />
                  </svg>
                  <i />
                  <span />
                </div>
                <div className={styles.cardFooter}>
                  <span>СЕГОДНЯ</span>
                  <span>ВАШЕ БУДУЩЕЕ</span>
                </div>
              </div>

              <div
                className={styles.documentCard}
                data-dossier="documents-card"
              >
                <div className={styles.cardHeader}>
                  <span>ВАШЕ ЛИЧНОЕ ДОСЬЕ</span>
                  <span>02</span>
                </div>
                <div className={styles.cardTitle}>Документы</div>
                <div className={styles.checklist}>
                  <div>
                    <CheckMark />
                    <span>Всё необходимое — в одном плане</span>
                  </div>
                  <div>
                    <CheckMark />
                    <span>Внимание к каждой детали</span>
                  </div>
                  <div>
                    <CheckMark />
                    <span>Понятный следующий шаг</span>
                  </div>
                </div>
                <div className={styles.documentBottom}>
                  <span>ПОДГОТОВЛЕНО С ЗАБОТОЙ</span>
                  <span className={styles.signature}>Alliance</span>
                </div>
              </div>

              <div className={styles.book} data-dossier="book">
                <div className={styles.bookBody}>
                  <div className={styles.bookSpine} />
                  <div className={styles.bookPages} />
                  <div className={styles.bookCover}>
                    <div className={styles.coverCornerTop} />
                    <div className={styles.bookBrand}>
                      ALLIANCE<span>GLOBAL</span>
                    </div>
                    <div className={styles.bookEmblem}>
                      <GlobeEmblem />
                    </div>
                    <div className={styles.bookChapter}>
                      YOUR NEXT
                      <br />
                      CHAPTER
                    </div>
                    <div className={styles.coverRule} />
                    <div className={styles.bookFoot}>
                      A WORLD OF POSSIBILITIES
                    </div>
                    <div className={styles.coverCornerBottom} />
                  </div>
                </div>
              </div>
              <div className={styles.visualFooter}>
                <span>ALLIANCE GLOBAL</span>
                <span>Ваша история — в центре маршрута.</span>
                <span>EST. YOUR FUTURE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
