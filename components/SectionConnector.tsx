"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LocalizedTree } from "@/components/alliance/AllianceLocale";
import styles from "./SectionConnector.module.css";

export default function SectionConnector({ from, to, href }: { from: string; to: string; href: string }) {
  return <LocalizedTree><div className={styles.bridge} data-section-connector>
    <div className={styles.row}>
      <span className={styles.from}>{from}</span>
      <span className={styles.line} aria-hidden="true" />
      <Link href={href} className={styles.link}><span>{to}</span><ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" /></Link>
    </div>
  </div></LocalizedTree>;
}
