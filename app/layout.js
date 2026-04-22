import { Abril_Fatface, Nunito } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import CosmicCanvas from "@/components/ui/CosmicCanvas";
import "./globals.css";

const abrilFatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-abril",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Andromeda — We build what comes next",
  description:
    "Andromeda is an AI-first company building backend systems, SaaS platforms, AI/ML solutions, and developer tools for the future.",
  keywords: ["AI", "SaaS", "developer tools", "machine learning", "backend systems", "Andromeda"],
  openGraph: {
    title: "Andromeda — We build what comes next",
    description: "AI-first infrastructure for the next generation of technology.",
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
      <body id="top" suppressHydrationWarning={true}>
        {/* Cosmic starfield — fixed behind everything */}
        <CosmicCanvas />
        <Navbar />
        {/* All page content sits above the canvas */}
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
