"use client";

import React, { useEffect, useState } from "react";
import { groupedEvents, allEvents } from "@/lib/data/events";
import { EventCarousel } from "@/components/ui/EventCarousel";

export default function EventsHubPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalEvents = allEvents.length;
  const completedEvents = allEvents.filter((e) =>
    e.status?.includes("Completado")
  ).length;

  return (
    <div className="min-h-screen bg-[#080808] text-[#F4F4F0] bg-grain relative selection:bg-[#C98A2B]/40 selection:text-white">
      {/* Subtle Ambient Radial Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#0047AB]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#C98A2B]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#0047AB]/5 rounded-full blur-[180px]" />
      </div>

      {/* Top Technical Status Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-[#080808]/70 sticky top-0 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C98A2B] animate-ping" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.25em] font-semibold text-[#F4F4F0] uppercase">
            D-VOID // ARCHIVE
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
          <span className="hidden sm:inline-block border border-white/10 px-2.5 py-0.5 rounded-full bg-white/[0.02]">
            QUITO · EC
          </span>
          <span className="text-[#C98A2B] font-semibold">
            {completedEvents}/{totalEvents} PRODUCCIÓN ACTIVA
          </span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 text-center max-w-5xl mx-auto">
        {/* Technical Label Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C98A2B]" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-300">
            SISTEMA CENTRAL DE EVENTOS
          </span>
        </div>

        {/* Massive Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-sans leading-[0.95] drop-shadow-2xl">
          <span className="text-[#F4F4F0]">D-VOID</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-[#F4F4F0] to-zinc-400">
            // EXPEDIENTES
          </span>
        </h1>

        {/* Technical Subtitle */}
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-mono tracking-[0.35em] sm:tracking-[0.45em] text-[#C98A2B] uppercase font-semibold">
          REGISTRO DE EVENTOS 2026
        </p>

        {/* Hero Metadata & Stats Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
          <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              TOTAL EVENTOS
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#F4F4F0] mt-1 block">
              {totalEvents}
            </span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              COMPLETADOS
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#14663F] mt-1 block">
              {completedEvents}
            </span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              TEMPORADA
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#F4F4F0] mt-1 block">
              2026
            </span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              ESTADO DEL HUB
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#C98A2B] mt-1 block">
              EN LÍNEA
            </span>
          </div>
        </div>
      </section>

      {/* MONTHLY SECTIONS MAPPING */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-16 sm:space-y-24">
        {groupedEvents.map((monthGroup, idx) => (
          <section
            key={monthGroup.month}
            className="relative border border-white/5 rounded-3xl bg-black/40 p-4 sm:p-8 backdrop-blur-sm"
          >
            {/* Monolithic Month Section Header with Technical Dividers */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-[#C98A2B] tracking-widest uppercase">
                  // SECCIÓN {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C98A2B]/40 via-white/10 to-transparent" />
                <span className="text-xs font-mono text-zinc-500 tracking-wider">
                  [{monthGroup.events.length} REGISTROS]
                </span>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-sans uppercase tracking-tight text-[#F4F4F0]">
                  {monthGroup.month}
                </h2>
                <span className="text-xs font-mono text-zinc-400 tracking-[0.2em] uppercase">
                  D-VOID ARCHIVES · CICLO DE PRODUCCIÓN
                </span>
              </div>
            </div>

            {/* Event Carousel with Hydration Guard */}
            {mounted ? (
              <EventCarousel events={monthGroup.events} />
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center border border-white/5 rounded-2xl bg-[#0a0a0c]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#C98A2B] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                    CARGANDO EXPEDIENTES...
                  </span>
                </div>
              </div>
            )}
          </section>
        ))}
      </main>

      {/* TECHNICAL BRUTALIST FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050505] py-8 sm:py-12 px-4 sm:px-8 text-center sm:text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-sans font-black text-lg tracking-tighter text-[#F4F4F0]">
              D-VOID
            </span>
            <p className="text-xs font-mono text-zinc-500 mt-1 tracking-wider">
              SISTEMA INTEGRAL DE EXPERIENCIAS NOCTURNAS Y RESERVAS
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
            <a
              href="https://dvoid.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C98A2B] transition-colors"
            >
              PORTAL PRINCIPAL ↗
            </a>
            <span className="text-zinc-600">/</span>
            <a
              href="https://docs.google.com/spreadsheets/d/1iRA4PMaWkM2MDbfGt8btb7nTKUMR1e90WaU9W4btMhE/edit"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C98A2B] transition-colors"
            >
              BASE DE DATOS DRIVE ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
