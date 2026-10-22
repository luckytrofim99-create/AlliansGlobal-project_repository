"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./ui";
import home from "./home/HomeHeader.module.css";
import styles from "./pages/InnerHeader.module.css";

const links = [
  { href: "/countries", label: "Страны" },
  { href: "/programs", label: "Программы" },
  { href: "/services", label: "Услуги" },
  { href: "/about", label: "О компании" },
  { href: "/approach", label: "Как работаем" },
  { href: "/journal", label: "Журнал" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const outsideDown = useRef(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { dialog.current?.close(); }, [pathname]);
  useEffect(() => {
    const desktop = matchMedia("(min-width: 1150px)");
    const close = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);
  const close = () => dialog.current?.close();
  return <>
    <header className={`${home.header}${isHome ? ` ${home.homeHeader}` : ""}${scrolled ? ` ${home.scrolled}` : ""}`}>
      <div className={`${home.inner} ${isHome ? "" : styles.inner}`}>
        <Logo />
        {!isHome && <nav className={styles.desktop} aria-label="Основная навигация">{links.map((link) => <Link href={link.href} key={link.href} aria-current={pathname === link.href ? "page" : pathname.startsWith(`${link.href}/`) ? "location" : undefined}>{link.label}</Link>)}</nav>}
        <div className={styles.actions}>
          {isHome ? <a href="#consultation" className={home.action}>Запросить консультацию</a> : <Link href="/consultation" className={home.action}>Консультация</Link>}
          {!isHome && <button ref={trigger} type="button" className={styles.menuButton} aria-label="Открыть меню" aria-haspopup="dialog" aria-controls="site-menu" aria-expanded={open} onClick={(event) => { setInstant(event.detail === 0); dialog.current?.showModal(); setOpen(true); }}><Menu size={21} strokeWidth={1.5} aria-hidden="true" /></button>}
        </div>
      </div>
    </header>
    {!isHome && <dialog ref={dialog} id="site-menu" className={styles.dialog} data-instant={instant} aria-labelledby="site-menu-title" onClose={() => { setOpen(false); if (trigger.current && getComputedStyle(trigger.current).display !== "none") trigger.current.focus({ preventScroll: true }); }} onPointerDown={(event) => { const r = event.currentTarget.getBoundingClientRect(); outsideDown.current = event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom; }} onPointerUp={(event) => { const r = event.currentTarget.getBoundingClientRect(); if (outsideDown.current && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) close(); outsideDown.current = false; }}>
      <div className={styles.menuTop}><h2 id="site-menu-title">Куда дальше?</h2><button type="button" className={styles.close} onClick={close} aria-label="Закрыть меню" autoFocus><X size={22} strokeWidth={1.5} aria-hidden="true" /></button></div>
      <nav className={styles.mobile} aria-label="Разделы сайта">{[{ href: "/", label: "Главная" }, ...links, { href: "/contacts", label: "Контакты" }].map((link) => <Link key={link.href} href={link.href} onClick={close} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
      <Link href="/consultation" className={`${home.action} ${styles.menuCta}`} onClick={close}>Запросить консультацию</Link>
    </dialog>}
  </>;
}
