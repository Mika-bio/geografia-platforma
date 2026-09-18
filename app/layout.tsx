import type { Metadata } from "next";
import { Source_Serif_4, Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serif = Source_Serif_4({
  subsets: ["cyrillic", "latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "География Әлемі — 8–9 сынып",
  description:
    "Қазақстан мектептеріне арналған география платформасы: карталар, ЖИ КМЖ/БЖБ/ТЖБ, PISA, олимпиада, тесттер.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col bg-mountain-gradient bg-leaf-pattern">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
