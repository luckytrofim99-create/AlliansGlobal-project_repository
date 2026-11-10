"use client";

import { useSyncExternalStore } from "react";
import { useAllianceLocale, type AllianceLocale } from "./AllianceLocale";
import styles from "./LanguageSwitcher.module.css";

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function LanguageSwitcher() {
  const { locale, setLocale } = useAllianceLocale();
  const ready = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
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
          disabled={!ready}
          lang={language}
          aria-label={language === "ru" ? (locale === "en" ? "Russian" : "Русский") : "English"}
          aria-pressed={locale === language}
          onClick={() => setLocale(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
