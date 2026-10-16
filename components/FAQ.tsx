"use client";
import { Plus } from "lucide-react";
export default function FAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={item.question} className="faq-item" name="faq">
          <summary>
            <span className="faq-number">0{i + 1}</span>
            <span>{item.question}</span>
            <Plus size={20} strokeWidth={1.3} />
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
