"use client";

/*
Dev2 retains the feature branch journeys with dev's architectural visual language.
The hero presents the agency; a compact preparation strip connects the journeys.
*/
import Image from "next/image";
import { ActionLink, type ActionVariant } from "@/components/actions/Action";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type PanInfo,
} from "motion/react";
import QuickConsultation from "./QuickConsultation";
import HeroArchitecture from "./HeroArchitecture";
import HomeInterlude from "./HomeInterlude";
import { AccentLine, ChangingCopy, RevealWords, useJourneyMotion } from "./JourneyMotion";
import styles from "./HomeJourney.module.css";
import theme from "./HomeTheme.module.css";
import { LocalizedTree } from "@/components/alliance/AllianceLocale";

const spring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 34,
  mass: 0.9,
};
const enterEase = [0.2, 0.72, 0.22, 1] as const;

const services = [
  {
    name: "Визы",
    title: "Подготовка к визе",
    text: "Узнайте, какие документы нужны под вашу цель поездки и визовую историю.",
    href: "/services/visas",
    label: "Документы для визы",
    image: "/images/europe-paris.jpg",
    photo: "Париж",
  },
  {
    name: "ВНЖ и ПМЖ",
    title: "Основание для ВНЖ",
    text: "Проверьте основания для проживания с учётом работы и планов семьи.",
    href: "/services/residence",
    label: "Основания для проживания",
    image: "/images/canada-toronto.jpg",
    photo: "Торонто",
  },
  {
    name: "Гражданство",
    title: "Основания для гражданства",
    text: "Узнайте, какие личные и семейные документы подтверждают ваши основания.",
    href: "/services/citizenship",
    label: "Основания для гражданства",
    image: "/images/hero-rome.jpg",
    photo: "Рим",
  },
];
const countries = [
  {
    slug: "canada",
    name: "Канада",
    image: "/images/canada-toronto.jpg",
    text: "Проверьте основания для учёбы, работы или переезда с семьёй.",
  },
  {
    slug: "usa",
    name: "США",
    image: "/images/usa-new-york.jpg",
    text: "Подготовьте приглашение и визовую историю под цель поездки.",
  },
  {
    slug: "europe",
    name: "Европа",
    image: "/images/europe-paris.jpg",
    text: "Сравните страны по работе, учёбе и планам семьи.",
  },
  {
    slug: "uk",
    name: "Великобритания",
    image: "/images/uk-london.jpg",
    text: "Проверьте приглашение и документы принимающей стороны.",
  },
  {
    slug: "australia",
    name: "Австралия",
    image: "/images/australia-sydney.jpg",
    text: "Узнайте порядок подготовки под вашу цель переезда.",
  },
  {
    slug: "new-zealand",
    name: "Новая Зеландия",
    image: "/images/new-zealand-queenstown.jpg",
    text: "Уточните основание для переезда и документы членов семьи.",
  },
  {
    slug: "south-korea",
    name: "Южная Корея",
    image: "/images/korea-seoul.jpg",
    text: "Подготовьте документы под цель и срок поездки.",
  },
];
const goals = [
  {
    slug: "education",
    name: "Учиться",
    title: "Переезд для учёбы",
    text: "Подготовьте учебную визу и документы по приглашению школы или университета.",
    image: "/images/university-campus.jpg",
  },
  {
    slug: "work",
    name: "Работать",
    title: "Переезд по работе",
    text: "Проверьте приглашение работодателя и документы для переезда.",
    image: "/images/usa-new-york.jpg",
  },
  {
    slug: "family",
    name: "Переехать с семьёй",
    title: "Переезд с семьёй",
    text: "Узнайте, что подготовить каждому участнику переезда.",
    image: "/images/new-zealand-queenstown.jpg",
  },
  {
    slug: "business",
    name: "Развивать бизнес",
    title: "Переезд для бизнеса",
    text: "Проверьте основания для проживания при ведении бизнеса или инвестициях.",
    image: "/images/uk-london.jpg",
  },
  {
    slug: "sport",
    name: "Заниматься спортом",
    title: "Переезд для спорта",
    text: "Подготовьте визовые документы по приглашению клуба или учебного заведения.",
    image: "/images/education-campus.jpg",
  },
  {
    slug: "digital-nomad",
    name: "Работать удалённо",
    title: "Переезд с удалённой работой",
    text: "Проверьте требования выбранной страны к вашей удалённой работе.",
    image: "/images/australia-sydney.jpg",
  },
];

function PillLink({ href, children, secondary = false, variant }: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  variant?: ActionVariant;
}) {
  return <ActionLink href={href} variant={variant ?? (secondary ? "secondary" : "primary")} className={styles.pill}>{children}</ActionLink>;
}

function subscribeNarrow(callback: () => void) {
  const media = window.matchMedia("(max-width: 1023px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function narrowSnapshot() {
  return window.matchMedia("(max-width: 1023px)").matches;
}
function subscribeReduced(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function reducedSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useStableReducedMotion() {
  return useSyncExternalStore(subscribeReduced, reducedSnapshot, () => false);
}
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useStableReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 35 });
  const narrow = useSyncExternalStore(
    subscribeNarrow,
    narrowSnapshot,
    () => false,
  );
  return (
    <LocalizedTree><section className={styles.hero} ref={ref} aria-labelledby="home-title">
      <div className={styles.heroCopy}>
        <h1 id="home-title" data-reveal="title">
          <RevealWords>Визы и переезд</RevealWords>
          <br />
          <RevealWords>с планом действий</RevealWords>
        </h1>
        <p className={styles.lead} data-reveal="copy" data-motion-delay="80">
          Узнайте основания для визы, ВНЖ или гражданства и перечень документов для учёбы, работы и переезда с семьёй.
        </p>
        <div className={styles.heroGuarantee} data-reveal="copy">
          <p><strong>Юридическая гарантия соблюдения сроков</strong></p>
          <p>Сроки подготовки закреплены в вашем договоре.</p>
        </div>
        <div className={styles.heroActions} data-reveal="copy" data-motion-delay="140">
          <PillLink href="#consultation">Разобрать мою ситуацию</PillLink>
          <ActionLink href="#services" variant="quiet" className={styles.quietLink}>
            Документы и услуги
          </ActionLink>
        </div>
      </div>
      <HeroArchitecture progress={smooth} reduced={!!reduce} narrow={narrow} />
    </section></LocalizedTree>
  );
}

function ServiceScene() {
  const [selected, setSelected] = useState(0);
  const [keyboard, setKeyboard] = useState(false);
  const reduce = useStableReducedMotion();
  const x = useMotionValue(0);
  const carrier = useRef<HTMLDivElement>(null);
  const [dragDistance, setDragDistance] = useState(220);
  useEffect(() => {
    const element = carrier.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setDragDistance(Math.min(300, entries[0].contentRect.width * 0.72));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const item = services[selected];
  const choose = (index: number, fromKeyboard = false) => {
    setKeyboard(fromKeyboard);
    setSelected(index);
  };
  function endDrag(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const projected = info.offset.x + info.velocity.x * 0.17;
    if (Math.abs(projected) > 75)
      choose(Math.max(0, Math.min(2, selected + (projected < 0 ? 1 : -1))));
    void animate(x, 0, { ...spring, velocity: info.velocity.x });
  }
  return (
    <LocalizedTree><section
      id="services"
      className={styles.services}
      aria-labelledby="services-title"
    >
      <div className={styles.servicesSticky}>
        <div className={styles.sectionIntro}>
          <h2 id="services-title" data-reveal="heading"><RevealWords>Документы под вашу задачу</RevealWords></h2>
        <AccentLine />
          <p>Виза, проживание или гражданство.</p>
        </div>
        <div
          className={styles.segmented}
          role="group"
          aria-label="Выберите услугу"
        >
          {services.map((service, index) => (
            <button
              key={service.name}
              type="button"
              aria-pressed={selected === index}
              aria-controls="service-detail"
              onClick={(event) => choose(index, event.detail === 0)}
            >
              {selected === index && (
                <motion.span
                  className={styles.segmentThumb}
                  layoutId="service-thumb"
                  transition={reduce || keyboard ? { duration: 0 } : spring}
                />
              )}
              <span>{service.name}</span>
            </button>
          ))}
        </div>
        <motion.div
          className={styles.serviceCarrier}
          ref={carrier}
          style={{ x }}
          drag={reduce ? false : "x"}
          dragConstraints={{
            left: selected === 2 ? 0 : -dragDistance,
            right: selected === 0 ? 0 : dragDistance,
          }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={endDrag}
        >
          <div
            id="service-detail"
            className={styles.serviceSurface}
            aria-live="polite"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={item.name}
                className={styles.servicePhoto}
                initial={
                  reduce || keyboard
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "translate3d(18px, 16px, 0) rotate(1.2deg) scale(.972)" }
                }
                animate={{ opacity: 1, transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)" }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduce || keyboard ? 0 : 0.32,
                  ease: enterEase,
                }}
              >
                <div className={styles.photoReveal} data-reveal="picture">
                <Image
                  src={item.image}
                  alt={item.photo}
                  fill
                  sizes="(max-width: 760px) 90vw, 45vw"
                />
                </div>
              </motion.div>
            </AnimatePresence>
            <ChangingCopy className={styles.serviceContent} key={`copy-${item.name}`} instant={!!reduce || keyboard}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <PillLink href={item.href} secondary>
                {item.label}
              </PillLink>
            </ChangingCopy>
          </div>
        </motion.div>
        <ActionLink href="/services" variant="quiet" className={styles.quietLink}>
          Все услуги
        </ActionLink>
      </div>
    </section></LocalizedTree>
  );
}

function Destinations() {
  const [selected, setSelected] = useState(0);
  const [keyboard, setKeyboard] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useStableReducedMotion();
  const item = countries[selected];
  return (
    <LocalizedTree><section
      className={styles.destinations}
      id="destinations"
      aria-labelledby="destinations-title"
    >
      <div className={styles.sectionIntro}>
        <h2 id="destinations-title" data-reveal="heading"><RevealWords>7 направлений для переезда</RevealWords></h2>
        <AccentLine />
        <p>
          Посмотрите задачи и подготовку по каждому направлению.
        </p>
      </div>
      <div
        className={styles.countryChoices}
        ref={scroller}
        role="group"
        aria-label="Выберите страну"
      >
        {countries.map((country, index) => (
          <button
            key={country.slug}
            type="button"
            aria-pressed={index === selected}
            aria-controls="country-detail"
            onClick={(event) => {
              setKeyboard(event.detail === 0);
              setSelected(index);
              event.currentTarget.scrollIntoView({
                behavior: reduce || event.detail === 0 ? "instant" : "smooth",
                block: "nearest",
                inline: "nearest",
              });
            }}
          >
            {index === selected && (
              <motion.span
                layoutId="country-thumb"
                className={styles.countryThumb}
                transition={reduce || keyboard ? { duration: 0 } : spring}
              />
            )}
            <span>{country.name}</span>
          </button>
        ))}
      </div>
      <div
        className={styles.countrySurface}
        id="country-detail"
        aria-live="polite"
      >
        <div className={styles.countryView}>
          <AnimatePresence initial={false}>
            <motion.div
              key={item.slug}
              className={styles.countryImage}
              initial={
                reduce || keyboard
                  ? { opacity: 0 }
                  : { opacity: 0, transform: "translate3d(-26px, 16px, 0) rotate(-1.4deg) scale(.972)" }
              }
              animate={{ opacity: 1, transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)" }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduce || keyboard ? 0 : 0.36,
                ease: enterEase,
              }}
            >
              <div className={styles.photoReveal} data-reveal="picture">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 760px) 90vw, 80vw"
              />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.countryInfo}>
          <div>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
          </div>
          <PillLink variant="light" href={`/countries/${item.slug}`}>
            Документы для поездки
          </PillLink>
        </div>
      </div>
      <div className={styles.countryQuestion}>
        <p>Страна ещё не выбрана?</p>
        <ActionLink variant="quiet" tone="inverse" className={styles.quietLink} href="/services/consulting">
          Сравнить страны
        </ActionLink>
      </div>
    </section></LocalizedTree>
  );
}

function Purpose() {
  const [selected, setSelected] = useState(0);
  const [keyboard, setKeyboard] = useState(false);
  const reduce = useStableReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const item = goals[selected];
  return (
    <LocalizedTree><section
      className={styles.purpose}
      ref={ref}
      aria-labelledby="purpose-title"
    >
      <div className={styles.purposeIntro}>
        <h2 id="purpose-title" data-reveal="heading">
          <RevealWords>Выберите цель переезда</RevealWords>
        </h2>
        <AccentLine />
        <div className={styles.goalChoices} role="group" aria-label="Ваша цель">
          {goals.map((goal, index) => (
            <button
              key={goal.slug}
              type="button"
              aria-controls="goal-detail"
              aria-pressed={index === selected}
              onClick={(event) => {
                setKeyboard(event.detail === 0);
                setSelected(index);
              }}
            >
              {index === selected && (
                <motion.span
                  layoutId="goal-thumb"
                  className={styles.goalThumb}
                  transition={reduce || keyboard ? { duration: 0 } : spring}
                />
              )}
              <span>{goal.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.goalDetail} id="goal-detail" aria-live="polite">
        <motion.div
          className={styles.goalPhoto}
          style={reduce ? undefined : { y: photoY }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={item.slug}
              className={styles.goalImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce || keyboard ? 0 : 0.26 }}
            >
              <div className={styles.photoReveal} data-reveal="picture">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 760px) 90vw, 42vw"
              />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <ChangingCopy className={styles.goalCopy} key={`copy-${item.slug}`} instant={!!reduce || keyboard}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <PillLink href={item.slug === "education" ? "/programs#education" : `/programs#${item.slug}`} secondary>
            Документы по моей цели
          </PillLink>
        </ChangingCopy>
      </div>
    </section></LocalizedTree>
  );
}

export default function HomeJourney() {
  const ref = useRef<HTMLDivElement>(null);
  useJourneyMotion(ref);
  useEffect(() => {
    if (location.hash === "#education") {
      window.location.replace("/programs#education");
      return;
    }
    const target = ["#consultation", "#services", "#destinations"].includes(
      location.hash,
    )
      ? location.hash.slice(1)
      : null;
    if (!target) return;
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    const events = ["wheel", "touchstart", "keydown"] as const;
    events.forEach((event) =>
      window.addEventListener(event, cancel, { once: true, passive: true }),
    );
    void document.fonts.ready.then(() =>
      requestAnimationFrame(() => {
        if (!cancelled && ref.current)
          document
            .getElementById(target)
            ?.scrollIntoView({ behavior: "instant", block: "start" });
      }),
    );
    return () => {
      cancelled = true;
      events.forEach((event) => window.removeEventListener(event, cancel));
    };
  }, []);
  return (
    <MotionConfig reducedMotion="user" transition={spring}>
      <div
        className={`${theme.surface} ${styles.journey}`}
        ref={ref}
        data-home-journey
      >
        <Hero />
        <HomeInterlude />
        <ServiceScene />
        <Destinations />
        <Purpose />
        <QuickConsultation />
      </div>
    </MotionConfig>
  );
}
