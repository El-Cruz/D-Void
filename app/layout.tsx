import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-coverflow";

export const metadata: Metadata = {
  metadataBase: new URL("https://dvoid.vercel.app"),
  title: "D-VOID // EVENT PORTFOLIO",
  description: "Event Portfolio by Nicolas Cruz",
  icons: {
    icon: "/Resources/dvoid/void-logo.png",
  },
  openGraph: {
    title: "D-VOID // EVENT PORTFOLIO",
    description: "Event Portfolio by Nicolas Cruz",
    url: "https://dvoid.vercel.app",
    siteName: "D-VOID",
    images: [
      {
        url: "/assets/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "D-VOID // EVENT PORTFOLIO BY NICOLAS CRUZ",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D-VOID // EVENT PORTFOLIO",
    description: "Event Portfolio by Nicolas Cruz",
    images: ["/assets/og-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="bg-[#050505] text-white min-h-screen selection:bg-[#D90429]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
