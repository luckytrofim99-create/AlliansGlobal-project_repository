import Image from "next/image";
import { PageSection } from "./PageKit";
import { PagePhotoMotion } from "./PageMotion";
import styles from "./ServicePages.module.css";

export default function ServiceVisaStory() {
  return <PageSection title="Подготовьте документы под цель поездки">
    <div className={styles.visaStory}>
      <div className={styles.visaObject} data-reveal="picture" aria-hidden="true">
        <PagePhotoMotion><Image src="/images/journey-wallet.webp" alt="" fill sizes="(min-width: 1000px) 45vw, 90vw" /></PagePhotoMotion>
      </div>
      <div className={styles.visaCopy} data-reveal>
        <p>Цель поездки определяет вопросы к документам. Разберём приглашение, визовую историю и планируемый формат пребывания.</p>
        <ul className={styles.principles}>
          <li>Уточняем цель поездки</li>
          <li>Определяем перечень документов</li>
          <li>Согласуем порядок подготовки</li>
        </ul>
      </div>
    </div>
  </PageSection>;
}
