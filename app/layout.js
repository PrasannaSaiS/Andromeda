import { Abril_Fatface, Nunito } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

const abrilFatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Andromeda — We build what comes next",
  description:
    "Andromeda is an AI-first company building backend systems, SaaS platforms, AI/ML solutions, and developer tools for the future.",
  keywords: [
    "AI",
    "SaaS",
    "developer tools",
    "machine learning",
    "backend systems",
    "Andromeda",
  ],
  openGraph: {
    title: "Andromeda — We build what comes next",
    description:
      "AI-first infrastructure for the next generation of technology.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${abrilFatface.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body id="top">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
