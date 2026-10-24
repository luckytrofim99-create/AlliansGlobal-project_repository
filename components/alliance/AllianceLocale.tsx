"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  isValidElement,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translate } from "@/lib/translations";

export type AllianceLocale = "ru" | "en";

const storageKey = "alliance-global-language";
const listeners = new Set<() => void>();
let memoryLocale: AllianceLocale = "ru";

function readLocale(): AllianceLocale {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved === "en" || saved === "ru" ? saved : memoryLocale;
  } catch {
    return memoryLocale;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function updateLocale(locale: AllianceLocale) {
  memoryLocale = locale;
  try {
    window.localStorage.setItem(storageKey, locale);
  } catch {
    // Keep language switching available when browser storage is unavailable.
  }
  listeners.forEach((listener) => listener());
}

const serverLocale = (): AllianceLocale => "ru";
const LocaleContext = createContext<{
  locale: AllianceLocale;
  setLocale: typeof updateLocale;
} | null>(null);

export function AllianceLocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, serverLocale);
  const value = useMemo(() => ({ locale, setLocale: updateLocale }), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useAllianceLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("AllianceLocaleProvider is required.");
  return value;
}

export function tx(locale: AllianceLocale, text: string) {
  return translate(locale, text);
}

function translateNode(node: ReactNode, locale: AllianceLocale): ReactNode {
  if (typeof node === "string") return translate(locale, node);
  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const translated = translateNode(child, locale);
      if (isValidElement(translated) && translated.key === null) {
        return cloneElement(translated, { key: `localized-${index}` });
      }
      return translated;
    });
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const translatedProps: Record<string, unknown> = {};
    // Page components often receive copy as props (title, intro, card body),
    // while native elements expose the same copy as text/accessible labels.
    const copyProps = new Set([
      "title", "intro", "body", "text", "label", "action", "name",
      "description", "placeholder", "alt", "question", "answer",
      "aria-label", "aria-description", "summary",
    ]);
    for (const [key, value] of Object.entries(node.props)) {
      if (key !== "children" && copyProps.has(key) && typeof value === "string") {
        translatedProps[key] = translate(locale, value);
      }
    }
    if (node.props.children !== undefined) {
      translatedProps.children = translateNode(node.props.children, locale);
    }
    return cloneElement(node, translatedProps);
  }
  return node;
}

/** Localizes authored text while preserving the existing server-rendered page tree. */
export function LocalizedTree({ children }: { children: ReactNode }) {
  const { locale } = useAllianceLocale();
  return <>{translateNode(children, locale)}</>;
}
