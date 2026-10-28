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
        title="Подготовьте обращение"
        intro="Укажите цель поездки или переезда и вопросы для консультации."
        compact
      >
        <PageLink href="/consultation">Обсудить мои планы</PageLink>
      </PageHero>
      <PageSection title="Что указать в обращении">
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
              Подготовить обращение
            </PageLink>
          </aside>
        </PageColumns>
      </PageSection>
    </PageShell>
  );
}
