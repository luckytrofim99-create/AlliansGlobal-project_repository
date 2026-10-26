import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import styles from "./Action.module.css";

export type ActionVariant = "primary" | "secondary" | "light" | "quiet";
type ActionIcon = "arrow" | "download" | false;
type Appearance = {
  children: ReactNode;
  className?: string;
  variant?: ActionVariant;
  size?: "default" | "compact";
  tone?: "default" | "inverse";
  icon?: ActionIcon;
};

function actionClass({ variant = "primary", size = "default", tone = "default", className = "" }: Omit<Appearance, "children">) {
  return [styles.action, styles[variant], size === "compact" ? styles.compact : "", tone === "inverse" ? styles.inverse : "", className].filter(Boolean).join(" ");
}

export function ActionContent({ children, icon = "arrow" }: { children: ReactNode; icon?: ActionIcon }) {
  return <>
    <span className={styles.label}>{children}</span>
    {icon && <span className={styles.icon} aria-hidden="true">{icon === "download" ? <Download size={18} strokeWidth={1.5} /> : <ArrowRight size={19} strokeWidth={1.5} />}</span>}
  </>;
}

export function ActionLink({ children, className, variant, size, tone, icon, ...props }: Appearance & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return <Link {...props} className={actionClass({ className, variant, size, tone })}><ActionContent icon={icon}>{children}</ActionContent></Link>;
}

export function ActionButton({ children, className, variant, size, tone, icon, type = "button", ...props }: Appearance & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">) {
  return <button {...props} type={type} className={actionClass({ className, variant, size, tone })}><ActionContent icon={icon}>{children}</ActionContent></button>;
}
