"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { countries, type Country } from "@/lib/content";

const REGIONS = [
  "Все направления",
  ...new Set(countries.map((country) => country.region)),
];

export default function CountryExplorer({
  items = countries,
}: {
  items?: Country[];
}) {
  const inputId = useId();
  const [region, setRegion] = useState(REGIONS[0]);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("ru");
    return items.filter(
      (country) =>
        (region === REGIONS[0] || country.region === region) &&
        `${country.name} ${country.en} ${country.region}`
          .toLocaleLowerCase("ru")
          .includes(search),
    );
  }, [items, query, region]);

  const reset = () => {
    setQuery("");
    setRegion(REGIONS[0]);
  };

  return (
    <div>
      <div className="country-filters">
        <div role="group" aria-label="Фильтр по региону">
          {REGIONS.map((item) => (
            <button
              key={item}
              className={`filter-chip${region === item ? " active" : ""}`}
              type="button"
              aria-pressed={region === item}
              onClick={() => setRegion(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="search-field">
          <label htmlFor={inputId}>Найти направление</label>
          <div>
            <Search size={17} strokeWidth={1.4} aria-hidden="true" />
            <input
              id={inputId}
              type="search"
              placeholder="Страна или регион"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Очистить поиск"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
      <p
        className="micro-label"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        НАПРАВЛЕНИЯ: {String(filtered.length).padStart(2, "0")} /{" "}
        {String(items.length).padStart(2, "0")}
      </p>
      {filtered.length > 0 ? (
        <div className="country-grid">
          {filtered.map((country) => (
            <Link
              key={country.slug}
              className="country-card"
              href={`/countries/${country.slug}`}
            >
              <div className="country-card-image image-frame">
                <Image
                  src={country.image}
                  alt={
                    country.slug === "europe"
                      ? "Париж, Франция — одно из европейских направлений"
                      : `Пейзаж направления «${country.name}»`
                  }
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
                <span>{country.en}</span>
              </div>
              <div className="country-card-info">
                <span className="micro-label">{country.region}</span>
                <div>
                  <h3>{country.name}</h3>
                  <ArrowUpRight
                    size={24}
                    strokeWidth={1.2}
                    aria-hidden="true"
                  />
                </div>
                <p>{country.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="micro-label">ДРУГАЯ ТОЧКА НА КАРТЕ</span>
          <h3>Здесь пока нет совпадений.</h3>
          <p>
            Попробуйте другое название или выберите все регионы. Если нужного
            направления нет в списке, его можно обсудить на консультации.
          </p>
          <button
            className="button button-outline"
            type="button"
            onClick={reset}
          >
            Сбросить фильтры
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
