"use client";

import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  isValidElement,
  useMemo,
  useRef,
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
  const metadata = useRef(new WeakMap<Element, { source: string; applied: string }>());

  useEffect(() => {
    document.documentElement.lang = locale;
    const updateMetadata = () => {
      document.head.querySelectorAll('title, meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[property="og:image:alt"], meta[name="twitter:title"], meta[name="twitter:description"]').forEach((element) => {
        const current = element.tagName === "TITLE" ? element.textContent ?? "" : element.getAttribute("content") ?? "";
        const previous = metadata.current.get(element);
        const source = previous && current === previous.applied ? previous.source : current;
        const applied = translate(locale, source);
        metadata.current.set(element, { source, applied });
        if (applied !== current) {
          if (element.tagName === "TITLE") element.textContent = applied;
          else element.setAttribute("content", applied);
        }
      });
    };
    updateMetadata();
    const observer = new MutationObserver(updateMetadata);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["content"] });
    return () => observer.disconnect();
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
  // React.Children also resolves lazy server-rendered children from the RSC
  // stream. A manual array walk leaves those subtrees untranslated.
  return Children.map(node, (child) => {
    if (typeof child === "string") return translate(locale, child);
    if (isValidElement<{ children?: ReactNode }>(child)) {
      const translatedProps: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(child.props)) {
        if (key !== "children" && copyProps.has(key) && typeof value === "string") {
          translatedProps[key] = translate(locale, value);
        }
      }
      if (child.props.children !== undefined) {
        translatedProps.children = translateNode(child.props.children, locale);
      }
      return cloneElement(child, translatedProps);
    }
    return child;
  });
}

const copyProps = new Set([
  "title", "intro", "body", "text", "label", "action", "name",
  "description", "placeholder", "alt", "question", "answer",
  "aria-label", "aria-description", "summary",
]);

/** Localizes authored text while preserving the existing server-rendered page tree. */
export function LocalizedTree({ children }: { children: ReactNode }) {
  const { locale } = useAllianceLocale();
  return <>{translateNode(children, locale)}</>;
}
