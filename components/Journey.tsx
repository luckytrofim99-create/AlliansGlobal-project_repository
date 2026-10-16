import { processSteps } from "@/lib/content";
import { Eyebrow, TextLink } from "./ui";
export default function Journey() {
  const selected = [
    processSteps[0],
    processSteps[1],
    processSteps[2],
    processSteps[3],
    processSteps[5],
  ];
  return (
    <section className="journey-scroll">
      <div className="journey-sticky">
        <div className="container journey-inner">
          <div className="journey-heading">
            <Eyebrow>Как мы работаем</Eyebrow>
            <h2>
              Большие перемены.
              <br />
              <em>Понятные шаги.</em>
            </h2>
            <p>
              Вам не нужно знать весь путь заранее.
              <br />
              Для этого рядом есть мы.
            </p>
            <TextLink href="/approach">Наш подход к работе</TextLink>
          </div>
          <div className="journey-body">
            <div className="journey-step-list">
              <div className="journey-progress">
                <div className="journey-progress-fill" />
              </div>
              {selected.map((step, i) => (
                <div
                  key={step.number}
                  className={`journey-step${i === 0 ? " active" : ""}`}
                >
                  <span>0{i + 1}</span>
                  <p>{step.title}</p>
                </div>
              ))}
            </div>
            <div className="journey-panels">
              {selected.map((step, i) => (
                <div className="journey-panel" key={step.number}>
                  <span className="journey-big-number">0{i + 1}</span>
                  <svg
                    className="journey-orbit"
                    viewBox="0 0 400 240"
                    fill="none"
                    aria-hidden="true"
                  >
                    <ellipse
                      cx="200"
                      cy="120"
                      rx="185"
                      ry="80"
                      stroke="currentColor"
                      strokeWidth=".6"
                      transform="rotate(-25 200 120)"
                    />
                    <ellipse
                      cx="200"
                      cy="120"
                      rx="140"
                      ry="115"
                      stroke="currentColor"
                      strokeWidth=".6"
                      transform="rotate(25 200 120)"
                    />
                    <path
                      className="draw-line"
                      pathLength="1"
                      strokeDasharray="1"
                      d="M32 180C110 30 260 215 370 60"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <circle cx="370" cy="60" r="5" fill="currentColor" />
                  </svg>
                  <span className="micro-label">ШАГ 0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
