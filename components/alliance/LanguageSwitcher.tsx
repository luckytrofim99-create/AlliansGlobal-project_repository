"use client";

import { useAllianceLocale, type AllianceLocale } from "./AllianceLocale";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const { locale, setLocale } = useAllianceLocale();
  return (
    <div
      className={styles.switcher}
      role="group"
      aria-label={locale === "ru" ? "Язык сайта" : "Website language"}
    >
      {(["ru", "en"] as const).map((language: AllianceLocale) => (
        <button
          key={language}
          className={styles.option}
          type="button"
          lang={language}
          aria-label={language === "ru" ? "Русский" : "English"}
          aria-pressed={locale === language}
          onClick={() => setLocale(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
