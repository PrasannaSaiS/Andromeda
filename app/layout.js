import { Abril_Fatface, Nunito } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import AmbientCanvas from "@/components/ui/AmbientCanvas";
import { SITE } from "@/lib/constants";
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
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  keywords: ["AI", "SaaS", "developer tools", "machine learning", "backend systems", "full stack", SITE.name],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
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
        {/* Minimal ambient starfield — subtle, behind everything */}
        <AmbientCanvas />
        <Navbar />
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
