"use client";

/*
DIRECTION: Apple-inspired physical controls on Idadu's observed paper ground.
DESIGN_VARIANCE 7 / MOTION_INTENSITY 6 / VISUAL_DENSITY 3.
FIRST VIEWPORT: plain-language Figma offer; one primary pill; a travel print, tickets and stamps assemble into a collage. No slogans, section counters or diagonal arrows.
SIGNATURE: independent printed objects assemble with distinct physical entrances; the mobile
composition is authored separately. Native scrolling remains in charge.
MOTION: Motion owns this homepage; GSAP remains isolated on inner routes.
FINISH: verify desktop/mobile behavior and record the built system in DESIGN.md.
*/
import Image from "next/image";
import Link from "next/link";
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
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type PanInfo,
} from "motion/react";
import QuickConsultation from "./QuickConsultation";
import HeroCollage from "./HeroCollage";
import { AccentLine, ChangingCopy, RevealWords, useJourneyMotion } from "./JourneyMotion";
import styles from "./HomeJourney.module.css";
import theme from "./HomeTheme.module.css";

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
    title: "Для поездки, которую вы планируете.",
    text: "К близким, на деловую встречу или обучение. Начнём с цели и подготовки документов.",
    href: "/services/visas",
    label: "Подробнее о визах",
    image: "/images/europe-paris.jpg",
    photo: "Париж",
  },
  {
    name: "ВНЖ и ПМЖ",
    title: "Когда одной поездки уже мало.",
    text: "Работа, семья и жизнь в новой стране. Рассмотрим основания для переезда и дальнейшие шаги.",
    href: "/services/residence",
    label: "Подробнее о переезде",
    image: "/images/canada-toronto.jpg",
    photo: "Торонто",
  },
  {
    name: "Гражданство",
    title: "Для долгосрочных решений.",
    text: "Личная история, семейные связи, подтверждённые основания. Разберём возможности в вашей ситуации.",
    href: "/services/citizenship",
    label: "Подробнее о гражданстве",
    image: "/images/hero-rome.jpg",
    photo: "Рим",
  },
];
const countries = [
  {
    slug: "canada",
    name: "Канада",
    image: "/images/canada-toronto.jpg",
    text: "Работа, образование или переезд с семьёй. Всё начинается с вашей цели.",
  },
  {
    slug: "usa",
    name: "США",
    image: "/images/usa-new-york.jpg",
    text: "Деловые, учебные и личные планы. Рассмотрим вопросы поездки и переезда.",
  },
  {
    slug: "europe",
    name: "Европа",
    image: "/images/europe-paris.jpg",
    text: "Разные страны и возможности. Сопоставим ваши планы с исходными обстоятельствами.",
  },
  {
    slug: "uk",
    name: "Великобритания",
    image: "/images/uk-london.jpg",
    text: "Учёба, профессиональные и семейные планы. Определим, с чего начать подготовку.",
  },
  {
    slug: "australia",
    name: "Австралия",
    image: "/images/australia-sydney.jpg",
    text: "Новая страна для следующего этапа жизни. Обсудим цель и горизонт планирования.",
  },
  {
    slug: "new-zealand",
    name: "Новая Зеландия",
    image: "/images/new-zealand-queenstown.jpg",
    text: "Профессиональные, образовательные или семейные планы. Начнём с общей картины.",
  },
  {
    slug: "south-korea",
    name: "Южная Корея",
    image: "/images/korea-seoul.jpg",
    text: "Учёба, деловые задачи или поездка к близким. Уточним цель и необходимые документы.",
  },
];
const goals = [
  {
    slug: "work",
    name: "Работать",
    title: "Новый этап карьеры.",
    text: "Предложение работодателя или планы на международный переезд. Учтём вашу профессиональную ситуацию.",
    image: "/images/usa-new-york.jpg",
  },
  {
    slug: "education",
    name: "Учиться",
    title: "Легализация через обучение",
    text: "Школа, университет или продолжение обучения. Свяжем вашу цель с визовыми вопросами.",
    image: "/images/university-campus.jpg",
  },
  {
    slug: "family",
    name: "Переехать с семьёй",
    title: "План, который учитывает каждого.",
    text: "Начать новую главу вместе или воссоединиться с близкими. Рассмотрим ситуацию всех участников переезда.",
    image: "/images/new-zealand-queenstown.jpg",
  },
  {
    slug: "business",
    name: "Развивать бизнес",
    title: "Новые рынки для ваших планов.",
    text: "Собственное дело или инвестиционные цели. Определим миграционные вопросы и необходимую экспертизу.",
    image: "/images/uk-london.jpg",
  },
  {
    slug: "sport",
    name: "Заниматься спортом",
    title: "Карьера в движении.",
    text: "Приглашение клуба или спортивное образование. Рассмотрим документы в контексте ваших планов.",
    image: "/images/education-campus.jpg",
  },
  {
    slug: "digital-nomad",
    name: "Работать удалённо",
    title: "Работа с вами. Страна меняется.",
    text: "Сохранить международную занятость и переехать. Начнём с вашей модели работы и целей.",
    image: "/images/australia-sydney.jpg",
  },
];

function PillLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${styles.pill}${secondary ? ` ${styles.secondary}` : ""}`}
    >
      {children}
    </Link>
  );
}

function subscribeNarrow(callback: () => void) {
  const media = window.matchMedia("(max-width: 1023px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function narrowSnapshot() {
  return window.matchMedia("(max-width: 1023px)").matches;
}
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
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
    <section className={styles.hero} ref={ref} aria-labelledby="home-title">
      <div className={styles.heroCopy}>
        <h1 id="home-title" data-reveal="title">
          <RevealWords>Визы и переезд</RevealWords>
          <br />
          <span className={styles.titleMuted}><RevealWords>с понятным планом.</RevealWords></span>
        </h1>
        <p className={styles.lead} data-reveal="copy" data-motion-delay="80">
          Поможем выбрать основание для переезда, подготовить документы и пройти
          этапы подачи. Для вас, вашей семьи и бизнеса.
        </p>
        <div className={styles.heroActions} data-reveal="copy" data-motion-delay="140">
          <PillLink href="#consultation">Запросить консультацию</PillLink>
          <a href="#services" className={styles.quietLink}>
            Посмотреть услуги
          </a>
        </div>
        <p className={styles.heroHelper} data-reveal="copy" data-motion-delay="240">
          Укажите страну и задачу. Свяжемся с вами, чтобы уточнить детали и
          согласовать консультацию.
        </p>
      </div>
      <HeroCollage progress={smooth} reduced={!!reduce} narrow={narrow} />
    </section>
  );
}

function ServiceScene() {
  const [selected, setSelected] = useState(0);
  const [manual, setManual] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
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
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });
  // Scroll state is discrete. Continuous values stay outside React rendering.
  useEffect(() => {
    let previous = -1;
    const compact = window.matchMedia(
      "(min-width:761px) and (max-height:760px), (max-width:760px) and (max-height:720px)",
    );
    return scrollYProgress.on("change", (progress) => {
      if (!manual && !reduce && !compact.matches) {
        const next = Math.min(2, Math.floor(Math.max(0, progress) * 3));
        if (next !== previous) {
          previous = next;
          setSelected(next);
        }
      }
    });
  }, [manual, reduce, scrollYProgress]);
  const item = services[selected];
  const choose = (index: number, fromKeyboard = false) => {
    setKeyboard(fromKeyboard);
    setManual(true);
    setSelected(index);
  };
  function endDrag(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const projected = info.offset.x + info.velocity.x * 0.17;
    if (Math.abs(projected) > 75)
      choose(Math.max(0, Math.min(2, selected + (projected < 0 ? 1 : -1))));
    void animate(x, 0, { ...spring, velocity: info.velocity.x });
  }
  return (
    <section
      id="services"
      ref={root}
      className={`${styles.services}${reduce ? ` ${styles.staticScene}` : ""}`}
      aria-labelledby="services-title"
    >
      <div className={styles.servicesSticky}>
        <div className={styles.sectionIntro}>
          <h2 id="services-title" data-reveal="heading"><RevealWords>Что нужно сейчас?</RevealWords></h2>
        <AccentLine />
          <p>Поездка, переезд или долгосрочный план.</p>
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
        <Link href="/services" className={styles.quietLink}>
          Все услуги
        </Link>
      </div>
    </section>
  );
}

function Destinations() {
  const [selected, setSelected] = useState(0);
  const [keyboard, setKeyboard] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const item = countries[selected];
  return (
    <section
      className={styles.destinations}
      id="destinations"
      aria-labelledby="destinations-title"
    >
      <div className={styles.sectionIntro}>
        <h2 id="destinations-title" data-reveal="heading"><RevealWords>Куда хочется вам?</RevealWords></h2>
        <AccentLine />
        <p>
          Выберите направление. Или начните с цели, если страна ещё не
          определена.
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
          <PillLink secondary href={`/countries/${item.slug}`}>
            Подробнее о направлении
          </PillLink>
        </div>
      </div>
      <div className={styles.countryQuestion}>
        <p>Страна ещё не выбрана?</p>
        <Link className={styles.quietLink} href="/services/consulting">
          Поможем разобраться
        </Link>
      </div>
    </section>
  );
}

function Purpose() {
  const [selected, setSelected] = useState(1);
  const [keyboard, setKeyboard] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const item = goals[selected];
  return (
    <section
      className={styles.purpose}
      ref={ref}
      aria-labelledby="purpose-title"
    >
      <div className={styles.purposeIntro}>
        <h2 id="purpose-title" data-reveal="heading">
          <RevealWords>Начните с того,</RevealWords>
          <br />
          <RevealWords>что важно вам.</RevealWords>
        </h2>
        <AccentLine />
        <p>Название программы можно выбрать позже.</p>
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
          <PillLink href={`/programs#${item.slug}`} secondary>
            Подробнее о вашем маршруте
          </PillLink>
        </ChangingCopy>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className={styles.process} aria-labelledby="process-title">
      <div className={styles.sectionIntro}>
        <h2 id="process-title" data-reveal="heading"><RevealWords>Рядом на каждом этапе.</RevealWords></h2>
        <AccentLine />
      </div>
      <div className={styles.processBody}>
        <div className={styles.processSteps}>
          <article data-reveal="copy">
            <h3>Разберём ситуацию</h3>
            <p>Цель, страна и исходные обстоятельства.</p>
          </article>
          <article data-reveal="copy">
            <h3>Составим план</h3>
            <p>Основания, документы и последовательность действий.</p>
          </article>
          <article data-reveal="copy">
            <h3>Пройдём этапы вместе</h3>
            <p>В согласованном объёме сопровождения.</p>
          </article>
        </div>
        <div className={styles.processAside} data-reveal="copy">
          <p>
            Понятный следующий шаг.
            <br />
            Даже если всё кажется сложным.
          </p>
          <PillLink secondary href="/approach">
            Как мы работаем
          </PillLink>
          <Link href="/services/complex-cases" className={styles.quietLink}>
            Был отказ или нужна смена статуса?
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomeJourney() {
  const ref = useRef<HTMLDivElement>(null);
  useJourneyMotion(ref);
  useEffect(() => {
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
        <ServiceScene />
        <Destinations />
        <Purpose />
        <Process />
        <QuickConsultation />
      </div>
    </MotionConfig>
  );
}
