"use client";

import { Search, X } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";
import type { Country } from "@/lib/content";
import { PageCard, PageColumns, PageLink } from "./PageKit";
import styles from "./CountryCatalogue.module.css";

export default function CountryCatalogue({ items }: { items: Country[] }) {
  const inputId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [region, setRegion] = useState("");
  const [query, setQuery] = useState("");
  const regions = useMemo(() => [...new Set(items.map((item) => item.region))], [items]);
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("ru");
    return items.filter((country) =>
      (!region || country.region === region) &&
      `${country.name} ${country.en} ${country.region}`.toLocaleLowerCase("ru").includes(search),
    );
  }, [items, query, region]);

  return <div className={styles.catalogue}>
    <div className={styles.controls}>
      <div className={styles.regions} role="group" aria-label="Фильтр по региону">
        {["", ...regions].map((item) => <button
          type="button"
          key={item}
          aria-pressed={region === item}
          onClick={() => setRegion(item)}
        >{item || "Все направления"}</button>)}
      </div>
      <div className={styles.search}>
        <label htmlFor={inputId}>Найти направление</label>
        <div className={styles.searchControl}>
          <Search size={18} strokeWidth={1.5} aria-hidden="true" />
          <input ref={input} id={inputId} type="search" placeholder="Страна или регион" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" />
          {query && <button type="button" onClick={() => { setQuery(""); input.current?.focus(); }} aria-label="Очистить поиск"><X size={18} aria-hidden="true" /></button>}
        </div>
      </div>
    </div>
    <p className={styles.result} role="status" aria-live="polite" aria-atomic="true">Направления: {filtered.length} из {items.length}</p>
    {filtered.length ? <PageColumns>
      {filtered.map((country) => <PageCard
        key={country.slug}
        title={country.name}
        label={country.region}
        body={country.description}
        image={country.image}
        href={`/countries/${country.slug}`}
        action={`Изучить направление: ${country.name}`}
      />)}
    </PageColumns> : <div className={styles.empty}>
      <h3>Здесь пока нет совпадений.</h3>
      <p>Попробуйте другое название или выберите все регионы. Если нужного направления нет в списке, его можно обсудить на консультации.</p>
      <div className={styles.emptyActions}>
        <button type="button" onClick={() => { setQuery(""); setRegion(""); input.current?.focus(); }}>Сбросить фильтры</button>
        <PageLink href="/consultation" quiet>Обсудить другое направление</PageLink>
      </div>
    </div>}
  </div>;
}
