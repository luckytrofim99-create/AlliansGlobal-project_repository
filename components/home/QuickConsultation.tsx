"use client";

import { useId, useState, type FormEvent } from "react";
import { countries } from "@/lib/content";
import styles from "./QuickConsultation.module.css";
import { AccentLine, RevealWords } from "./JourneyMotion";
import { LocalizedTree, useAllianceLocale, tx } from "@/components/alliance/AllianceLocale";

const goals = [
  { value: "visa", label: "Виза" },
  { value: "residence", label: "ВНЖ и ПМЖ" },
  { value: "citizenship", label: "Гражданство" },
  { value: "choosing", label: "Выбор страны" },
  { value: "complex", label: "Сложный случай" },
];

type QuickConsultationProps = {
  initialGoal?: string;
  initialCountry?: string;
};

type FieldErrors = { contact?: string; consent?: string };

export default function QuickConsultation({
  initialGoal = "",
  initialCountry = "",
}: QuickConsultationProps) {
  const { locale } = useAllianceLocale();
  const id = useId();
  const [goal, setGoal] = useState(
    goals.some((item) => item.value === initialGoal) ? initialGoal : "",
  );
  const [country, setCountry] = useState(
    countries.some((item) => item.slug === initialCountry)
      ? initialCountry
      : "",
  );
  const [method, setMethod] = useState<"telegram" | "phone">("telegram");
  const [contacts, setContacts] = useState({ telegram: "", phone: "" });
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const contact = contacts[method];

  function validateContact(value: string) {
    if (!value.trim()) return tx(locale, "Укажите контакт для ответа.");
    if (
      method === "telegram" &&
      !/^(?:@|(?:https?:\/\/)?t\.me\/)?[a-zA-Z0-9_]{5,32}\/?$/.test(
        value.trim(),
      )
    ) {
      return tx(locale, "Укажите имя пользователя Telegram, например @username.");
    }
    if (method === "phone") {
      const digits = value.replace(/\D/g, "");
      if (
        !/^\+?[\d\s().-]+$/.test(value.trim()) ||
        digits.length < 8 ||
        digits.length > 15
      ) {
        return tx(locale, "Укажите телефон с кодом страны, например +7 999 123-45-67.");
      }
    }
    return "";
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const contactInput = form.elements.namedItem("contact") as HTMLInputElement;
    const consentInput = form.elements.namedItem("consent") as HTMLInputElement;
    const contactError = validateContact(contact);
    contactInput.setCustomValidity(contactError);
    consentInput.setCustomValidity(
      consent ? "" : tx(locale, "Нужно ваше согласие на обработку данных для ответа."),
    );
    if (!form.checkValidity()) {
      setErrors({
        contact: contactError || undefined,
        consent: consent
          ? undefined
          : tx(locale, "Нужно ваше согласие на обработку данных для ответа."),
      });
      form.querySelector<HTMLElement>(":invalid")?.focus();
      return;
    }
    setErrors({});
    setDownloaded(false);
    // This prototype has no submission endpoint. Keep the form intact and
    // never show a sent/success state without an actual server confirmation.
    setSubmissionAttempted(true);
  }

  function downloadDraft() {
    const task = tx(locale,
      goals.find((item) => item.value === goal)?.label ?? "Пока не определена",
    );
    const destination = tx(locale,
      countries.find((item) => item.slug === country)?.name ?? "Ещё не выбрана",
    );
    const text = [
      "ALLIANCE GLOBAL — черновик обращения",
      "",
      `${locale === "ru" ? "Задача" : "Goal"}: ${task}`,
      `${locale === "ru" ? "Страна" : "Destination"}: ${destination}`,
      `${method === "telegram" ? "Telegram" : tx(locale, "Телефон")}: ${contact.trim()}`,
      `${locale === "ru" ? "Комментарий" : "Note"}: ${comment.trim() || tx(locale, "Не добавлен")}`,
      "",
      locale === "ru" ? "Это локальный черновик. Обращение не отправлено компании." : "This is a local draft. Nothing has been sent to the company.",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = locale === "ru" ? "Alliance-Global-черновик.txt" : "Alliance-Global-draft.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  return (
    <LocalizedTree><section
      className={styles.section}
      id="consultation"
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id={`${id}-title`} data-reveal="heading"><RevealWords>Разберём вашу ситуацию</RevealWords></h2>
          <AccentLine wide />
          <p>Начнём с того, что важно вам.</p>
        </div>

        <form
          data-reveal="copy"
          className={styles.form}
          onSubmit={submit}
          noValidate
          onInvalid={(event) => event.preventDefault()}
        >
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor={`${id}-goal`}>Ваша задача</label>
              <select
                id={`${id}-goal`}
                name="goal"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
              >
                <option value="">Пока выбираю</option>
                {goals.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-country`}>Страна</label>
              <select
                id={`${id}-country`}
                name="country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <option value="">Ещё не выбрана</option>
                {countries.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={`${styles.field} ${styles.contactField}`}>
              <fieldset className={styles.contactMethods}>
                <legend>Как с вами связаться</legend>
                <div className={styles.methodOptions}>
                  {(["telegram", "phone"] as const).map((value) => (
                    <label
                      key={value}
                      className={
                        method === value ? styles.activeMethod : undefined
                      }
                    >
                      <input
                        type="radio"
                        name="contactMethod"
                        value={value}
                        checked={method === value}
                        onChange={() => {
                          setMethod(value);
                          setErrors((current) => ({
                            ...current,
                            contact: undefined,
                          }));
                        }}
                      />
                      <span>
                        {value === "telegram" ? "Telegram" : "Телефон"}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={styles.contactLabel} htmlFor={`${id}-contact`}>
                {method === "telegram" ? "Ваш Telegram" : "Номер телефона"}
                <span aria-hidden="true"> *</span>
              </label>
              <input
                id={`${id}-contact`}
                name="contact"
                type={method === "phone" ? "tel" : "text"}
                autoComplete={method === "phone" ? "tel" : "off"}
                autoCapitalize="none"
                spellCheck={false}
                placeholder={
                  method === "phone" ? "+7 999 123-45-67" : "@username"
                }
                required
                maxLength={64}
                value={contact}
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={
                  errors.contact ? `${id}-contact-error` : `${id}-required`
                }
                onChange={(event) => {
                  event.currentTarget.setCustomValidity("");
                  setContacts((current) => ({
                    ...current,
                    [method]: event.target.value,
                  }));
                  setErrors((current) => ({ ...current, contact: undefined }));
                }}
              />
              {errors.contact && (
                <p
                  className={styles.error}
                  id={`${id}-contact-error`}
                  role="alert"
                >
                  {errors.contact}
                </p>
              )}
            </div>

            <details className={styles.commentField}>
              <summary>Добавить комментарий</summary>
              <div className={styles.field}>
                <label htmlFor={`${id}-comment`}>
                  Пара слов о ситуации <span>необязательно</span>
                </label>
                <textarea
                  id={`${id}-comment`}
                  name="comment"
                  placeholder="Что хотелось бы обсудить?"
                  rows={2}
                  maxLength={2000}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </div>
            </details>
          </div>

          <div className={styles.consent}>
            <label htmlFor={`${id}-consent`}>
              <input
                id={`${id}-consent`}
                name="consent"
                type="checkbox"
                required
                checked={consent}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={
                  errors.consent ? `${id}-consent-error` : undefined
                }
                onChange={(event) => {
                  event.currentTarget.setCustomValidity("");
                  setConsent(event.target.checked);
                  setErrors((current) => ({ ...current, consent: undefined }));
                }}
              />
              <span>
                Я ознакомился с{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  информацией о конфиденциальности
                </a>{" "}
                и согласен на обработку данных для ответа на обращение.
              </span>
            </label>
            {errors.consent && (
              <p
                className={styles.error}
                id={`${id}-consent-error`}
                role="alert"
              >
                {errors.consent}
              </p>
            )}
            <small>Документы будут финализированы до запуска.</small>
          </div>

          <div className={styles.actions}>
            <button className={styles.submit} type="submit">
              Запросить консультацию
            </button>
            <div className={styles.next}>
              <p>
                Укажите страну и задачу. Свяжемся с вами, чтобы уточнить детали
                и согласовать консультацию.
              </p>
              <small>Прототип: отправка пока не подключена</small>
            </div>
          </div>
          <p id={`${id}-required`} className={styles.required}>
            * Контакт и согласие обязательны. Остальное — по желанию.
          </p>

          <div
            className={styles.liveRegion}
            aria-live="polite"
            aria-atomic="true"
          >
            {submissionAttempted && (
              <div className={styles.prototypeStatus}>
                <p>
                  <strong>Отправка пока не подключена.</strong> Данные остались
                  в форме на этой странице до её перезагрузки. Можно изменить
                  запрос и попробовать снова или скачать черновик.
                </p>
                <button
                  className={styles.download}
                  type="button"
                  onClick={downloadDraft}
                >
                  Скачать черновик
                </button>
                {downloaded && (
                  <small>
                    Черновик подготовлен для скачивания. Обращение не
                    отправлено.
                  </small>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </section></LocalizedTree>
  );
}
