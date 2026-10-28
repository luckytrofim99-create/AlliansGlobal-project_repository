"use client";

/*
Dev2 retains the feature branch journeys with dev's architectural visual language.
Education leads the offer and follows the hero; the other services remain available.
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
    text: "Разберём цель поездки, визовую историю и документы для подачи.",
    href: "/services/visas",
    label: "Подробнее о визах",
    image: "/images/europe-paris.jpg",
    photo: "Париж",
  },
  {
    name: "ВНЖ и ПМЖ",
    title: "Основание для ВНЖ",
    text: "Рассмотрим основания для проживания с учётом работы и планов семьи.",
    href: "/services/residence",
    label: "Подробнее о переезде",
    image: "/images/canada-toronto.jpg",
    photo: "Торонто",
  },
  {
    name: "Гражданство",
    title: "Основания для гражданства",
    text: "Изучим личную историю и документы для проверки оснований.",
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
    text: "Уточним цель переезда и документы для проверки оснований.",
  },
  {
    slug: "usa",
    name: "США",
    image: "/images/usa-new-york.jpg",
    text: "Разберём цель поездки, приглашение и визовую историю.",
  },
  {
    slug: "europe",
    name: "Европа",
    image: "/images/europe-paris.jpg",
    text: "Сравним направления по работе, учёбе и планам семьи.",
  },
  {
    slug: "uk",
    name: "Великобритания",
    image: "/images/uk-london.jpg",
    text: "Определим вопросы к документам и принимающей стороне.",
  },
  {
    slug: "australia",
    name: "Австралия",
    image: "/images/australia-sydney.jpg",
    text: "Рассмотрим цель переезда и порядок подготовки.",
  },
  {
    slug: "new-zealand",
    name: "Новая Зеландия",
    image: "/images/new-zealand-queenstown.jpg",
    text: "Уточним основание для проверки и планы семьи.",
  },
  {
    slug: "south-korea",
    name: "Южная Корея",
    image: "/images/korea-seoul.jpg",
    text: "Уточним цель поездки и необходимые документы.",
  },
];
const goals = [
  {
    slug: "education",
    name: "Учиться",
    title: "Переезд для учёбы",
    text: "Разберём визовые вопросы по приглашению школы или университета.",
    image: "/images/university-campus.jpg",
  },
  {
    slug: "work",
    name: "Работать",
    title: "Переезд по работе",
    text: "Рассмотрим приглашение работодателя и документы для переезда.",
    image: "/images/usa-new-york.jpg",
  },
  {
    slug: "family",
    name: "Переехать с семьёй",
    title: "Переезд с семьёй",
    text: "Учтём документы и обстоятельства каждого участника переезда.",
    image: "/images/new-zealand-queenstown.jpg",
  },
  {
    slug: "business",
    name: "Развивать бизнес",
    title: "Переезд для бизнеса",
    text: "Определим миграционные вопросы для бизнеса и инвестиций.",
    image: "/images/uk-london.jpg",
  },
  {
    slug: "sport",
    name: "Заниматься спортом",
    title: "Переезд для спорта",
    text: "Рассмотрим визовые вопросы по приглашению клуба или учебного заведения.",
    image: "/images/education-campus.jpg",
  },
  {
    slug: "digital-nomad",
    name: "Работать удалённо",
    title: "Переезд с удалённой работой",
    text: "Разберём модель занятости и вопросы для проверки по выбранной стране.",
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
          <RevealWords>Учёба за рубежом</RevealWords>
          <br />
          <span className={styles.titleMuted}><RevealWords>визы и переезд</RevealWords></span>
        </h1>
        <p className={styles.lead} data-reveal="copy" data-motion-delay="80">
          Образование — одно из основных направлений Alliance Global. Разберём учебные планы, визовые вопросы и документы для переезда.
        </p>
        <div className={styles.heroActions} data-reveal="copy" data-motion-delay="140">
          <PillLink href="#education">Обучение за рубежом</PillLink>
          <ActionLink href="#services" variant="quiet" className={styles.quietLink}>
            Другие услуги
          </ActionLink>
        </div>
      </div>
      <HeroArchitecture progress={smooth} reduced={!!reduce} narrow={narrow} />
    </section></LocalizedTree>
  );
}

function Education() {
  return <LocalizedTree><section id="education" className={styles.education} aria-labelledby="education-title">
    <div className={styles.educationPhoto} data-reveal="picture">
      <Image src="/images/university-campus.jpg" alt="Университетский кампус" fill sizes="(max-width: 760px) 90vw, 45vw" />
    </div>
    <div className={styles.educationCopy}>
      <h2 id="education-title" data-reveal="heading"><RevealWords>Образование за рубежом</RevealWords></h2>
      <p>Школа, университет или продолжение обучения. Начнём с учебной цели и подготовки к поездке.</p>
      <ul className={styles.educationSteps}>
        <li><h3>Учебные планы</h3><p>Уровень обучения и предполагаемая страна.</p></li>
        <li><h3>Виза и документы</h3><p>Приглашение и порядок подготовки к подаче.</p></li>
        <li><h3>Планы семьи</h3><p>Вопросы переезда сопровождающих.</p></li>
      </ul>
      <div className={styles.educationActions}>
        <PillLink href="/consultation?goal=education">Обсудить обучение</PillLink>
        <ActionLink href="/programs#education" variant="quiet">Подготовка к учёбе</ActionLink>
      </div>
    </div>
  </section></LocalizedTree>;
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
          <h2 id="services-title" data-reveal="heading"><RevealWords>Выберите задачу</RevealWords></h2>
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
        <h2 id="destinations-title" data-reveal="heading"><RevealWords>Выберите страну</RevealWords></h2>
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
            Подробнее о направлении
          </PillLink>
        </div>
      </div>
      <div className={styles.countryQuestion}>
        <p>Страна ещё не выбрана?</p>
        <ActionLink variant="quiet" tone="inverse" className={styles.quietLink} href="/services/consulting">
          Поможем разобраться
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
          <PillLink href={`/programs#${item.slug}`} secondary>
            Подготовка по вашей задаче
          </PillLink>
        </ChangingCopy>
      </div>
    </section></LocalizedTree>
  );
}

function Process() {
  return (
    <LocalizedTree><section className={styles.process} aria-labelledby="process-title">
      <div className={styles.sectionIntro}>
        <h2 id="process-title" data-reveal="heading"><RevealWords>Узнайте порядок работы</RevealWords></h2>
        <AccentLine />
      </div>
      <div className={styles.processBody}>
        <div className={styles.processSteps}>
          <article data-reveal="copy">
            <h3>Разбор вашей задачи</h3>
            <p>Уточняем цель, страну и историю обращений.</p>
          </article>
          <article data-reveal="copy">
            <h3>План подготовки</h3>
            <p>Определяем документы и порядок действий.</p>
          </article>
          <article data-reveal="copy">
            <h3>Подготовка к подаче</h3>
            <p>Проверяем документы и готовность к подаче.</p>
          </article>
        </div>
        <div className={styles.processAside} data-reveal="copy">
          <p>
            Согласуйте объём работы
            <br />
            до начала подготовки
          </p>
          <PillLink variant="light" href="/approach">
            Как мы работаем
          </PillLink>
          <ActionLink href="/services/complex-cases" variant="quiet" tone="inverse" className={styles.quietLink}>
            Разбор отказа и смены статуса
          </ActionLink>
        </div>
      </div>
    </section></LocalizedTree>
  );
}

export default function HomeJourney() {
  const ref = useRef<HTMLDivElement>(null);
  useJourneyMotion(ref);
  useEffect(() => {
    const target = ["#consultation", "#education", "#services", "#destinations"].includes(
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
        <Education />
        <ServiceScene />
        <Destinations />
        <Purpose />
        <Process />
        <QuickConsultation />
      </div>
    </MotionConfig>
  );
}
