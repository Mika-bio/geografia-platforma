import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Single Google font for faster first paint; serif uses system stack */
const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GEOGRAPHY PRO — 8–9 сынып | Олимпиада • PISA • Тест",
  description:
    "GEOGRAPHIC WORLD & PISA — Қазақстан 8–9 сынып география платформасы: тақырыптар, олимпиада, PISA, тесттер, интерактивті карта.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const serifStyle = {
    ["--font-serif"]: 'Georgia, "Times New Roman", ui-serif, serif',
  } as CSSProperties;

  return (
    <html lang="kk">
      <body className={`${sans.variable} font-sans antialiased`} style={serifStyle}>
        <AuthProvider>
          <div className="geo-canvas flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
