import Image from "next/image";
import { PageSection } from "./PageKit";
import { PagePhotoMotion } from "./PageMotion";
import styles from "./ServicePages.module.css";

export default function ServiceVisaStory() {
  return <PageSection title="Документы под цель поездки">
    <div className={styles.visaStory}>
      <div className={styles.visaObject} data-reveal="picture" aria-hidden="true">
        <PagePhotoMotion><Image src="/images/journey-wallet.webp" alt="" fill sizes="(min-width: 1000px) 45vw, 90vw" /></PagePhotoMotion>
      </div>
      <div className={styles.visaCopy} data-reveal>
        <p>Цель поездки определяет перечень документов. Для разбора понадобятся приглашение, визовая история и планируемый срок пребывания.</p>
        <ul className={styles.principles}>
          <li>Цель и даты поездки</li>
          <li>Перечень документов</li>
          <li>Порядок подготовки</li>
        </ul>
      </div>
    </div>
  </PageSection>;
}
