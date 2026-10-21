"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeFooter from "./home/HomeFooter";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./ui";
export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return <HomeFooter />;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo light />
            <p className="footer-tagline">
              Ваш мир.
              <br />
              Ваш следующий шаг.
            </p>
          </div>
          <div className="footer-nav">
            <span className="micro-label">ИССЛЕДУЙТЕ</span>
            <Link href="/services">Услуги</Link>
            <Link href="/programs">Ваши задачи</Link>
            <Link href="/countries">Направления</Link>
            <Link href="/journal">Журнал</Link>
          </div>
          <div className="footer-nav">
            <span className="micro-label">ALLIANCE GLOBAL</span>
            <Link href="/about">О компании</Link>
            <Link href="/approach">Как мы работаем</Link>
            <Link href="/consultation">Консультация</Link>
            <Link href="/contacts">Контакты</Link>
          </div>
          <div className="footer-note">
            <span className="micro-label">НАЧНЁМ С ГЛАВНОГО</span>
            <Link href="/consultation">
              Какие у вас планы?
              <ArrowUpRight size={28} strokeWidth={1} />
            </Link>
            <p>
              У каждой большой перемены
              <br />
              есть первый разговор.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Alliance Global</span>
          <span>Международный консалтинг</span>
          <Link href="/privacy">Конфиденциальность</Link>
          <span className="footer-prototype">Концепция сайта · Preview</span>
        </div>
      </div>
    </footer>
  );
}
