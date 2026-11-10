import type { Metadata } from "next";

export const socialTitle = "Alliance Global — Ваше будущее без границ";
export const socialDescription =
  "Визы, ВНЖ, ПМЖ и гражданство. Подготовка документов и сопровождение переезда для вас, семьи и бизнеса.";
export const socialImage = "/images/alliance-global-social-v1.jpg";

export const socialOpenGraph = {
  type: "website",
  locale: "ru_RU",
  siteName: "Alliance Global",
  title: socialTitle,
  description: socialDescription,
  images: [{
    url: socialImage,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: "Alliance Global — Ваше будущее без границ. Визы, ВНЖ и гражданство.",
  }],
} satisfies Metadata["openGraph"];
