"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./ui";
import homeStyles from "./home/HomeHeader.module.css";

const links = [
  { href: "/about", label: "Компания" },
  { href: "/services", label: "Услуги" },
  { href: "/countries", label: "Направления" },
  { href: "/approach", label: "Наш подход" },
  { href: "/journal", label: "Журнал" },
];
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);
  if (pathname === "/") {
    return (
      <header
        className={`${homeStyles.header}${scrolled ? ` ${homeStyles.scrolled}` : ""}`}
      >
        <div className={homeStyles.inner}>
          <Logo />
          <a href="#consultation" className={homeStyles.action}>
            Запросить консультацию
          </a>
        </div>
      </header>
    );
  }
  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Основная навигация">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname.startsWith(link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <span className="language-label" aria-label="Язык сайта — русский">
              RU
            </span>
            <Link href="/consultation" className="header-consult">
              Консультация
              <ArrowUpRight size={17} />
            </Link>
            <button
              className="menu-toggle"
              onClick={() => dialog.current?.showModal()}
              aria-label="Открыть меню"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <Logo />
            <button
              className="icon-button"
              onClick={() => dialog.current?.close()}
              aria-label="Закрыть меню"
            >
              <X />
            </button>
          </div>
          <span className="micro-label">ВАШ МИР. ВАШ МАРШРУТ.</span>
          <nav aria-label="Мобильная навигация">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => dialog.current?.close()}
              >
                <span>0{i + 1}</span>
                {link.label}
                <ArrowUpRight />
              </Link>
            ))}
            <Link href="/programs" onClick={() => dialog.current?.close()}>
              <span>06</span>Ваши задачи
              <ArrowUpRight />
            </Link>
          </nav>
          <Link
            href="/consultation"
            className="button button-navy"
            onClick={() => dialog.current?.close()}
          >
            Обсудить мою задачу
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </dialog>
    </>
  );
}
