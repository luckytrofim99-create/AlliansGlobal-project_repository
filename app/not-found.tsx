import { PageHero, PageLink, PageShell } from "@/components/pages/PageKit";
import styles from "@/components/pages/EditorialLayouts.module.css";

export default function NotFound() {
  return (
    <PageShell>
      <div className={styles.empty}>
        <PageHero title="Страница не найдена" intro="Ошибка 404. Проверьте адрес или выберите раздел сайта." compact>
          <PageLink href="/">На главную</PageLink>
          <PageLink href="/countries" secondary>Изучить направления</PageLink>
        </PageHero>
      </div>
    </PageShell>
  );
}
