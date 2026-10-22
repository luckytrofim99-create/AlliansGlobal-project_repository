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
        title="Давайте познакомимся."
        intro="Для первого разговора не нужны готовая стратегия и полный комплект документов. Достаточно рассказать, что вы хотите изменить."
        compact
      >
        <PageLink href="/consultation">Обсудить мои планы</PageLink>
      </PageHero>
      <PageSection title="Всё начинается с вашей истории.">
        <PageColumns className={styles.columns}>
          <PageReading>
            <p>
              Поездка, обучение, работа или переезд — у каждого запроса своя
              отправная точка. Чтобы подготовиться к знакомству, можно
              обозначить главное:
            </p>
            <PageList
              items={[
                "Чего вы хотите достичь и какое направление рассматриваете.",
                "Кто планирует поездку или переезд вместе с вами.",
                "Какие вопросы хочется обсудить в первую очередь.",
              ]}
            />
          </PageReading>
          <aside className={styles.status} aria-labelledby="contacts-status">
            <h3 id="contacts-status">Пока — черновик обращения.</h3>
            <p>
              Контактные каналы компании будут добавлены после согласования.
              Сейчас в форме можно описать задачу и скачать локальный черновик.
            </p>
            <p className={styles.note}>
              Данные остаются в вашем браузере. Отправка консультанту ещё не
              подключена.
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
