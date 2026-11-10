import Link from "next/link";
import { Logo } from "@/components/ui";
import styles from "./HomeFooter.module.css";
import { LocalizedTree } from "@/components/alliance/AllianceLocale";

const groups = [
  {
    title: "Услуги и страны",
    links: [
      ["/services", "Услуги"],
      ["/countries", "Направления"],
      ["/programs", "Ваши задачи"],
    ],
  },
  {
    title: "О компании",
    links: [
      ["/about", "Alliance Global"],
      ["/approach", "Как мы работаем"],
      ["/contacts", "Контакты"],
    ],
  },
  {
    title: "Подготовка к обращению",
    links: [
      ["/journal", "Журнал"],
      ["/consultation", "Консультация"],
      ["/privacy", "Конфиденциальность"],
    ],
  },
];

export default function HomeFooter() {
  return (
    <LocalizedTree>
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p>Международный консалтинг</p>
        </div>
        <nav className={styles.links} aria-label="Разделы сайта">
          {groups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([href, title]) => (
                <Link href={href} key={href}>
                  {title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Alliance Global</span>
        <Link href="/privacy">Информация о конфиденциальности</Link>
        <a href="https://goldy.company/">разработка сайта и продвижение бренда</a>
      </div>
    </footer>
    </LocalizedTree>
  );
}
