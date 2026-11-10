import type { Metadata } from "next";
import { PageHero, PageReading, PageSection, PageShell } from "@/components/pages/PageKit";
import styles from "@/components/pages/EditorialLayouts.module.css";

export const metadata: Metadata = { title: "Конфиденциальность прототипа" };

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero title="Как используются данные" intro="Обработка данных в прототипе Alliance Global." compact />
      <PageSection id="explore">
        <PageReading>
          <article className={styles.legal}>
            <section data-reveal>
              <h2>Демонстрационная версия</h2>
              <p>Этот сайт — проект концепции Alliance Global. Он не принимает заявки и не отправляет сведения консультантам. Контакты оператора и окончательная политика обработки персональных данных будут размещены перед запуском действующего сайта.</p>
            </section>
            <section data-reveal>
              <h2>Форма обращения</h2>
              <p>Введённые имя, контакт и описание ситуации обрабатываются только в памяти вашей страницы. Они не сохраняются на сервере или в хранилище браузера. При перезагрузке страницы черновик очищается.</p>
              <p>Кнопка скачивания создаёт текстовый файл на вашем устройстве. Вы самостоятельно решаете, где его хранить и кому передавать. Не добавляйте в форму паспортные, финансовые и другие чувствительные сведения.</p>
            </section>
            <section data-reveal>
              <h2>Технические ресурсы</h2>
              <p>Фотографии и шрифты включены в проект и загружаются с сайта. Аналитика, рекламные трекеры и сторонние формы не подключены. Технические сведения об обращении к сайту могут обрабатываться средой размещения для обеспечения его работы.</p>
            </section>
          </article>
        </PageReading>
      </PageSection>
    </PageShell>
  );
}
