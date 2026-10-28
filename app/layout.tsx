import type { Metadata } from "next";
import "@fontsource/manrope/cyrillic-400.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/cyrillic-500.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/cyrillic-600.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/cyrillic-700.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/cormorant-garamond/cyrillic-400.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/cyrillic-500.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/cyrillic-400-italic.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { AllianceLocaleProvider } from "@/components/alliance/AllianceLocale";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Alliance Global — Визы и переезд",
    template: "%s · Alliance Global",
  },
  description:
    "Подготовка к визе и переезду: основания, документы и порядок подачи. Alliance Global.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <AllianceLocaleProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </AllianceLocaleProvider>
      </body>
    </html>
  );
}
