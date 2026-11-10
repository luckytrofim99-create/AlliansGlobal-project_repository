import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import styles from "./OverviewPages.module.css";

type OverviewCard = {
  id: string;
  title: string;
  text: string;
  icon: LucideIcon;
  href?: string;
};

export function OverviewCards({ items, layout = "benefits" }: {
  items: OverviewCard[];
  layout?: "services" | "benefits";
}) {
  return <div className={layout === "services" ? styles.servicesGrid : styles.benefitsGrid}>
    {items.map(({ icon: Icon, ...item }, index) => {
      const content = <>
        <Icon className={styles.cardIcon} size={42} strokeWidth={1.35} aria-hidden="true" />
        <div className={styles.cardCopy}>
          <h3 id={`${item.id}-title`}>{item.title}</h3>
          <p id={`${item.id}-text`}>{item.text}</p>
        </div>
        {item.href && <ArrowRight className={styles.cardArrow} size={20} strokeWidth={1.5} aria-hidden="true" />}
      </>;
      return <article key={item.id} id={item.id} className={styles.card} data-reveal data-motion-delay={index * 60}>
        {item.href
          ? <Link href={item.href} className={styles.cardLink} aria-labelledby={`${item.id}-title`} aria-describedby={`${item.id}-text`}>{content}</Link>
          : <div className={styles.cardBody}>{content}</div>}
      </article>;
    })}
  </div>;
}
