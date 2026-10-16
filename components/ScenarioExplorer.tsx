"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { programs } from "@/lib/content";
const pictures = [
  "/images/university-campus.jpg",
  "/images/office-interior.jpg",
  "/images/education-campus.jpg",
  "/images/uk-london.jpg",
  "/images/europe-paris.jpg",
  "/images/australia-sydney.jpg",
];
export default function ScenarioExplorer() {
  const [active, setActive] = useState(0);
  return (
    <div className="scenario-explorer">
      <div className="scenario-visual">
        <div className="scenario-image" key={active}>
          <Image
            src={pictures[active]}
            alt={programs[active].title}
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
        </div>
        <div className="scenario-caption">
          <span className="micro-label">ВАША ОТПРАВНАЯ ТОЧКА</span>
          <h3>{programs[active].title}</h3>
          <p>{programs[active].description}</p>
          <Link href={`/programs#${programs[active].slug}`}>
            Найти свой маршрут
            <ArrowUpRight size={19} />
          </Link>
        </div>
        <span className="photo-index">
          0{active + 1} <span>/ 06</span>
        </span>
      </div>
      <div className="scenario-choices" aria-label="Выберите вашу задачу">
        {programs.map((program, i) => (
          <button
            key={program.slug}
            onClick={() => setActive(i)}
            className={`scenario-choice${active === i ? " active" : ""}`}
            aria-pressed={active === i}
          >
            <span className="choice-number">0{i + 1}</span>
            <span className="choice-name">
              {program.title}
              <small>{program.tag}</small>
            </span>
            <ArrowUpRight size={22} strokeWidth={1} />
          </button>
        ))}
      </div>
    </div>
  );
}
