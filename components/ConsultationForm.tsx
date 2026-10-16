"use client";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Download,
  Globe2,
  GraduationCap,
  House,
  LockKeyhole,
  Plane,
  Users,
} from "lucide-react";
import { countries } from "@/lib/content";

const goals = [
  { name: "Поездка и виза", icon: Plane },
  { name: "Жизнь за рубежом", icon: House },
  { name: "Работа и бизнес", icon: BriefcaseBusiness },
  { name: "Образование", icon: GraduationCap },
  { name: "Переезд с семьёй", icon: Users },
  { name: "Пока изучаю варианты", icon: Globe2 },
];
export default function ConsultationForm({
  initialCountry = "undecided",
}: {
  initialCountry?: string;
}) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [country, setCountry] = useState(
    countries.some((c) => c.slug === initialCountry)
      ? initialCountry
      : "undecided",
  );
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const countryName =
    countries.find((c) => c.slug === country)?.name ?? "Ещё выбираю";
  const next = () => {
    setError("");
    if (step === 1 && !goal) {
      setError("Выберите задачу, которая ближе вашим планам.");
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  };
  const brief = () =>
    `ALLIANCE GLOBAL\nЧерновик обращения\n\nИмя: ${name}\nСпособ связи: ${contact}\nЗадача: ${goal}\nНаправление: ${countryName}\n\nМоя ситуация:\n${description || "Подробности обсудим на консультации."}\n\nПодготовлено на сайте Alliance Global. Это локальный черновик; данные не отправлены компании.`;
  const download = () => {
    const blob = new Blob(["\uFEFF" + brief()], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Alliance-Global-мои-планы.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const restart = () => {
    setDone(false);
    setStep(1);
    setError("");
  };
  return (
    <div className="consultation-form" id="consultation-form">
      {done ? (
        <div className="form-success" role="status" aria-live="polite">
          <span className="success-symbol">
            <Check size={29} strokeWidth={1} />
          </span>
          <span className="form-step-label">ОТПРАВНАЯ ТОЧКА НАЙДЕНА</span>
          <h2>
            {name},<br />
            <em>начало положено.</em>
          </h2>
          <p>
            Ваше обращение подготовлено. Скачайте его, чтобы сохранить мысли и
            вернуться к ним перед разговором.
          </p>
          <p className="form-note">
            Это демонстрационная версия сайта. Данные остались в вашем браузере
            и не отправлялись компании.
          </p>
          <button className="button button-navy" onClick={download}>
            Скачать обращение
            <Download size={17} />
          </button>
          <button className="text-link" onClick={restart}>
            Изменить мой запрос
            <ArrowLeft size={17} />
          </button>
        </div>
      ) : (
        <>
          <div className="form-progress" aria-label={`Шаг ${step} из 3`}>
            {[1, 2, 3].map((i) => (
              <span key={i} className={i <= step ? "complete" : ""} />
            ))}
          </div>
          <span className="form-step-label">
            ШАГ 0{step} / 03 &nbsp; — &nbsp;{" "}
            {step === 1
              ? "ВАША ЦЕЛЬ"
              : step === 2
                ? "ВАШ МАРШРУТ"
                : "ЗНАКОМСТВО"}
          </span>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (step < 3) {
                next();
                return;
              }
              if (!name.trim() || !contact.trim()) {
                setError("Укажите имя и удобный способ связи.");
                return;
              }
              setError("");
              setDone(true);
            }}
          >
            {step === 1 && (
              <div className="form-step">
                <h2>
                  Что для вас
                  <br />
                  <em>важно сейчас?</em>
                </h2>
                <p className="form-description">
                  Выберите ближайшую к вашим планам задачу.
                </p>
                <fieldset className="goal-options">
                  <legend>Цель обращения</legend>
                  {goals.map(({ name: goalName, icon: Icon }) => (
                    <button
                      type="button"
                      key={goalName}
                      aria-pressed={goal === goalName}
                      className={`goal-option${goal === goalName ? " selected" : ""}`}
                      onClick={() => {
                        setGoal(goalName);
                        setError("");
                      }}
                    >
                      <Icon />
                      <span>{goalName}</span>
                      <span className="selection-dot" />
                    </button>
                  ))}
                </fieldset>
              </div>
            )}
            {step === 2 && (
              <div className="form-step">
                <h2>
                  Куда направлены
                  <br />
                  <em>ваши мысли?</em>
                </h2>
                <p className="form-description">
                  Можно выбрать страну или оставить вопрос открытым.
                </p>
                <div className="form-field">
                  <label htmlFor="country">Направление</label>
                  <select
                    id="country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                  >
                    <option value="undecided">Ещё выбираю</option>
                    {countries.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="situation">
                    Несколько слов о ваших планах <span>(необязательно)</span>
                  </label>
                  <textarea
                    id="situation"
                    rows={4}
                    maxLength={3000}
                    placeholder="Что вы хотите изменить? Кто планирует переезд? Какие вопросы вас волнуют?"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <p className="form-note">
                  Не указывайте паспортные данные или другую чувствительную
                  информацию.
                </p>
              </div>
            )}
            {step === 3 && (
              <div className="form-step">
                <h2>
                  Давайте
                  <br />
                  <em>познакомимся.</em>
                </h2>
                <p className="form-description">
                  Добавьте детали к вашему обращению.
                </p>
                <div className="form-summary">
                  <span>{goal}</span>
                  <span>{countryName}</span>
                </div>
                <div className="form-field">
                  <label htmlFor="name">Как к вам обращаться</label>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ваше имя"
                    autoComplete="given-name"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact">Удобный способ связи</label>
                  <input
                    id="contact"
                    name="contact"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder="Email, телефон или Telegram"
                    autoComplete="off"
                    required
                    maxLength={200}
                  />
                </div>
                <p className="form-note">
                  В этой версии сайта вы подготовите обращение и сможете скачать
                  его. Отправка консультанту пока не подключена.
                </p>
              </div>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="form-controls">
              {step > 1 && (
                <button
                  type="button"
                  className="form-back"
                  onClick={() => {
                    setError("");
                    setStep((s) => s - 1);
                  }}
                >
                  <ArrowLeft size={15} />
                  Назад
                </button>
              )}
              <button type="submit" className="button button-navy">
                {step === 3 ? "Подготовить обращение" : "Продолжить"}
                <ArrowUpRight size={17} />
              </button>
            </div>
          </form>
          <p className="form-privacy">
            <LockKeyhole />
            Информация не покидает ваш браузер. Вы сами решаете, чем поделиться.
          </p>
        </>
      )}
    </div>
  );
}
