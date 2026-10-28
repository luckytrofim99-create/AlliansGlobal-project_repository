"use client";

import Link from "next/link";
import { useId } from "react";
import { ArrowRight, GraduationCap, MapPin, Plane, Search, Settings2 } from "lucide-react";
import { countries } from "@/lib/content";
import { LocalizedTree, tx, useAllianceLocale } from "@/components/alliance/AllianceLocale";
import { RevealWords } from "./JourneyMotion";
import styles from "./HomeInterlude.module.css";

export default function HomeInterlude() {
  const searchId = useId();
  const { locale } = useAllianceLocale();

  return <LocalizedTree><section className={styles.band} aria-labelledby="preparation-title">
    <div className={styles.inner}>
      <div className={`${styles.card} ${styles.countryCard}`} data-reveal>
        <form className={styles.search} action="/countries#explore" method="get" role="search">
          <label className={styles.srOnly} htmlFor={searchId}>Найти страну</label>
          <input id={searchId} name="q" type="search" list={`${searchId}-countries`} placeholder="Найти страну" maxLength={80} autoComplete="off" />
          <datalist id={`${searchId}-countries`}>
            {countries.map(country => <option key={country.slug} value={tx(locale, country.name)} />)}
          </datalist>
          <button type="submit" aria-label="Найти страну"><Search size={21} strokeWidth={1.5} aria-hidden="true" /></button>
        </form>
        <h2 id="preparation-title" className={styles.heading}><RevealWords>Выберите свою страну</RevealWords></h2>
      </div>

      <Link href="/programs#education" className={`${styles.card} ${styles.studyCard}`} data-reveal data-motion-delay="60">
        <span className={styles.symbol} aria-hidden="true"><GraduationCap size={22} strokeWidth={1.4} /></span>
        <div className={styles.journey} aria-hidden="true">
          <svg viewBox="0 0 120 72" fill="none"><path d="M2 2c5 30 40 48 72 34S116 4 109 1" stroke="currentColor" strokeWidth="1" /></svg>
          <Plane className={styles.plane} size={23} strokeWidth={1.4} />
          <MapPin className={styles.pin} size={16} strokeWidth={1.5} />
        </div>
        <h3 className={styles.label}>Учёба за рубежом</h3>
        <p className={styles.detail}>Виза и документы к поездке.</p>
        <ArrowRight className={styles.linkArrow} size={18} strokeWidth={1.5} aria-hidden="true" />
      </Link>

      <Link href="/approach" className={`${styles.card} ${styles.processCard}`} data-reveal data-motion-delay="120">
        <span className={styles.symbol} aria-hidden="true"><Settings2 size={21} strokeWidth={1.4} /></span>
        <h3 className={styles.label}>Переезд по шагам</h3>
        <p className={styles.detail}>Этапы и сроки по договору.</p>
        <div className={styles.process} aria-hidden="true"><span /><i /><span /><i /><span className={styles.finalStep}><ArrowRight size={13} strokeWidth={1.6} /></span></div>
      </Link>
    </div>
  </section></LocalizedTree>;
}
