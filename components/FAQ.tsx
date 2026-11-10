"use client";

import { useId } from "react";
import styles from "./FAQ.module.css";
import { useAllianceLocale, tx } from "./alliance/AllianceLocale";

export default function FAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const id = useId();
  const { locale } = useAllianceLocale();
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details
          key={item.question}
          className={styles.item}
          name={`faq-${id}`}
          onToggle={(event) => {
            if (
              !event.currentTarget.open ||
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) return;
            event.currentTarget.querySelector("p")?.animate(
              [{ opacity: 0.65 }, { opacity: 1 }],
              { duration: 160, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
            );
          }}
        >
          <summary>
            <span>{tx(locale, item.question)}</span>
            <span className={styles.indicator} aria-hidden="true" />
          </summary>
          <div className={styles.answer}><p>{tx(locale, item.answer)}</p></div>
        </details>
      ))}
    </div>
  );
}
