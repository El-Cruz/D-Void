import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export const metadata: Metadata = {
  title: "D-VOID // EXPEDIENTES · REGISTRO DE EVENTOS 2026",
  description: "Registro oficial, expedientes y base de datos interactiva de eventos 2026 de D-VOID Quito.",
  icons: {
    icon: "/Resources/dvoid/void-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="bg-[#080808] text-[#F4F4F0] min-h-screen selection:bg-[#C98A2B]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
