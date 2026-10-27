import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-coverflow";

export const metadata: Metadata = {
  metadataBase: new URL("https://dvoid.vercel.app"),
  title: "D-VOID // EVENT PORTFOLIO",
  description: "Event Portfolio by Nicolas Cruz",
  applicationName: "D-VOID",
  authors: [{ name: "Nicolas Cruz" }],
  creator: "Nicolas Cruz",
  publisher: "Nicolas Cruz",
  icons: {
    icon: "/Resources/dvoid/void-logo.png",
  },
  openGraph: {
    title: "D-VOID // EVENT PORTFOLIO",
    description: "Event Portfolio by Nicolas Cruz",
    url: "https://dvoid.vercel.app",
    siteName: "D-VOID",
    locale: "es_EC",
    type: "website",
    images: [
      {
        url: "https://dvoid.vercel.app/assets/og-preview.jpg",
        secureUrl: "https://dvoid.vercel.app/assets/og-preview.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "D-VOID // EVENT PORTFOLIO BY NICOLAS CRUZ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D-VOID // EVENT PORTFOLIO",
    description: "Event Portfolio by Nicolas Cruz",
    images: ["https://dvoid.vercel.app/assets/og-preview.jpg"],
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
