import Image from "next/image";
import { Plus } from "lucide-react";
import { programs } from "@/lib/content";
import { PageLink } from "./PageKit";
import styles from "./ProgramCards.module.css";

const images: Record<string, string> = {
  sport: "/images/university-campus.jpg",
  work: "/images/office-interior.jpg",
  education: "/images/education-campus.jpg",
  business: "/images/usa-new-york.jpg",
  family: "/images/home-figma/travelers.jpg",
  "digital-nomad": "/images/new-zealand-queenstown.jpg",
};

export default function ProgramCards() {
  return <div className={styles.grid}>
    {programs.map(program => <details className={styles.card} id={program.slug} key={program.slug} data-reveal>
      <summary className={styles.summary}>
        <span className={styles.image}><Image src={images[program.slug]} alt="" fill sizes="(min-width: 761px) 44vw, 90vw" /></span>
        <div className={styles.copy}>
          <h2 className={styles.title}>{program.title}</h2>
          <span className={styles.trigger}>
            <span className={styles.show}>Описание и рекомендации</span>
            <span className={styles.hide}>Свернуть рекомендации</span>
            <span className={styles.icon} aria-hidden="true"><Plus size={20} strokeWidth={1.5} /></span>
          </span>
        </div>
      </summary>
      <div className={styles.body}>
        <p className={styles.description}>{program.description}</p>
        <h3 className={styles.subheading}>С чего начать</h3>
        <ul className={styles.recommendations}>{program.recommendations.map(item => <li key={item}>{item}</li>)}</ul>
        <PageLink href={program.slug === "education" ? "/consultation?goal=education" : "/consultation"}>
          {program.slug === "education" ? "Разобрать планы учёбы" : "Разобрать мою ситуацию"}
        </PageLink>
      </div>
    </details>)}
  </div>;
}
