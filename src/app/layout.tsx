import type { Metadata } from "next";
import "./globals.css";
import { ThemeContext } from "@/context/themeContext/provider";
import { Libre_Baskerville, Playfair_Display } from "next/font/google";

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
});
const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Jornal Teresa",
  description:
    "Jornal Teresa é o portal de notícias do IFRN, trazendo informações atualizadas, reportagens, eventos e novidades da comunidade acadêmica.",
  keywords:
    "Jornal Teresa, IFRN, notícias IFRN, jornal IFRN, eventos IFRN, atualidades IFRN, Rio Grande do Norte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${libre.variable} ${playFair.variable}`}>
        <ThemeContext>
          {children}
          </ThemeContext>
      </body>
    </html>
  );
}
