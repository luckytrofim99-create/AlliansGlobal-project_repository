import type { Metadata } from "next";
import {
  PageColumns,
  PageHero,
  PageLink,
  PageList,
  PageReading,
  PageSection,
  PageShell,
} from "@/components/pages/PageKit";
import styles from "./Contacts.module.css";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Начните знакомство с Alliance Global: расскажите о вашей цели и подготовьте обращение.",
};

export default function ContactsPage() {
  return (
    <PageShell>
      <PageHero
        title="Запрос на разбор переезда"
        intro="Укажите цель поездки или переезда и вопросы для консультации."
        compact
      >
        <PageLink href="/consultation">Разобрать мою ситуацию</PageLink>
      </PageHero>
      <PageSection title="3 пункта для первого обращения">
        <PageColumns className={styles.columns}>
          <PageReading>
            <p>
              Для подготовки обращения укажите:
            </p>
            <PageList
              items={[
                "Цель поездки или переезда и выбранную страну.",
                "Участников поездки или переезда.",
                "Вопросы для консультации.",
              ]}
            />
          </PageReading>
          <aside className={styles.status} aria-labelledby="contacts-status">
            <h3 id="contacts-status">Отправка не подключена</h3>
            <p>
              Контакты компании будут добавлены после согласования. Сейчас можно заполнить форму и скачать черновик.
            </p>
            <p className={styles.note}>
              Данные остаются на странице до её перезагрузки.
            </p>
            <PageLink href="/consultation" secondary>
              Подготовить запрос
            </PageLink>
          </aside>
        </PageColumns>
      </PageSection>
    </PageShell>
  );
}
