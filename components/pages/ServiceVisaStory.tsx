import Image from "next/image";
import { PageSection } from "./PageKit";
import { PagePhotoMotion } from "./PageMotion";
import styles from "./ServicePages.module.css";

export default function ServiceVisaStory() {
  return <PageSection title="Не просто документы. Начало новой главы.">
    <div className={styles.visaStory}>
      <div className={styles.visaObject} data-reveal="picture" aria-hidden="true">
        <PagePhotoMotion><Image src="/images/journey-wallet.webp" alt="" fill sizes="(min-width: 1000px) 45vw, 90vw" /></PagePhotoMotion>
      </div>
      <div className={styles.visaCopy} data-reveal>
        <p>За каждой визой — чья-то большая идея. Учиться, быть рядом с семьёй, открыть своё дело. Мы начинаем с вашей цели и выстраиваем подготовку вокруг того, что важно именно вам.</p>
        <ul className={styles.principles}>
          <li>Понимаем вашу ситуацию</li>
          <li>Собираем понятный маршрут</li>
          <li>Готовим каждый следующий шаг</li>
        </ul>
      </div>
    </div>
  </PageSection>;
}
