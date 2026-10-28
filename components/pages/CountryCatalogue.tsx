"use client";

import { Search, X } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";
import type { Country } from "@/lib/content";
import { ActionButton } from "@/components/actions/Action";
import { PageCard, PageColumns, PageLink } from "./PageKit";
import styles from "./CountryCatalogue.module.css";
import { useAllianceLocale, tx } from "@/components/alliance/AllianceLocale";

export default function CountryCatalogue({ items, initialQuery = "" }: { items: Country[]; initialQuery?: string }) {
  const inputId = useId();
  const { locale } = useAllianceLocale();
  const input = useRef<HTMLInputElement>(null);
  const [region, setRegion] = useState("");
  const [query, setQuery] = useState(initialQuery);
  const regions = useMemo(() => [...new Set(items.map((item) => item.region))], [items]);
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("ru");
    return items.filter((country) =>
      (!region || country.region === region) &&
      `${country.name} ${country.en} ${country.region} ${country.slug}`.toLocaleLowerCase("ru").includes(search),
    );
  }, [items, query, region]);

  return <div className={styles.catalogue}>
    <div className={styles.controls}>
      <div className={styles.regions} role="group" aria-label={tx(locale, "Фильтр по региону")}>
        {["", ...regions].map((item) => <button
          type="button"
          key={item}
          aria-pressed={region === item}
          onClick={() => setRegion(item)}
        >{item ? tx(locale, item) : tx(locale, "Все направления")}</button>)}
      </div>
      <div className={styles.search}>
        <label htmlFor={inputId}>{tx(locale, "Найти направление")}</label>
        <div className={styles.searchControl}>
          <Search size={18} strokeWidth={1.5} aria-hidden="true" />
          <input ref={input} id={inputId} type="search" placeholder={tx(locale, "Страна или регион")} value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" />
          {query && <button type="button" onClick={() => { setQuery(""); input.current?.focus(); }} aria-label={tx(locale, "Очистить поиск")}><X size={18} aria-hidden="true" /></button>}
        </div>
      </div>
    </div>
    <p className={styles.result} role="status" aria-live="polite" aria-atomic="true">{locale === "ru" ? "Направления" : "Destinations"}: {filtered.length} {locale === "ru" ? "из" : "of"} {items.length}</p>
    {filtered.length ? <PageColumns>
      {filtered.map((country) => <PageCard
        key={country.slug}
        title={tx(locale, country.name)}
        label={tx(locale, country.region)}
        body={tx(locale, country.description)}
        image={country.image}
        href={`/countries/${country.slug}`}
        action={locale === "ru" ? `Изучить направление: ${country.name}` : `Explore ${tx(locale, country.name)}`}
      />)}
    </PageColumns> : <div className={styles.empty}>
      <h3>{tx(locale, "Направление не найдено")}</h3>
      <p>{tx(locale, "Измените название или сбросьте фильтры. Другое направление можно обсудить на консультации.")}</p>
      <div className={styles.emptyActions}>
        <ActionButton type="button" onClick={() => { setQuery(""); setRegion(""); input.current?.focus(); }}>{tx(locale, "Сбросить фильтры")}</ActionButton>
        <PageLink href="/consultation" quiet>{tx(locale, "Обсудить другое направление")}</PageLink>
      </div>
    </div>}
  </div>;
}
