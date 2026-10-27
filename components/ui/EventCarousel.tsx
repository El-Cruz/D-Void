"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper styles
import "swiper/css";

export interface CarouselEvent {
  id?: string;
  title: string;
  date: string;
  url: string;
  imagePath?: string;
  category?: string;
  theme?: string;
  status?: string;
}

export interface EventCarouselProps {
  month?: string;
  events: CarouselEvent[];
  className?: string;
}

export const EventCarousel: React.FC<EventCarouselProps> = ({
  month,
  events = [],
  className = "",
}) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!events || events.length === 0) {
    return null;
  }

  const syncBounds = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div
      className={`w-full py-6 md:py-10 bg-black select-none relative overflow-hidden ${className}`}
    >
      {/* Month Header Banner (if provided) */}
      {month && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 md:mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D90429] animate-pulse" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.25em] font-mono text-white/90">
              {month}
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 tracking-wider">
            {events.length} {events.length === 1 ? "EVENTO" : "EVENTOS"}
          </span>
        </div>
      )}

      {/* Swiper Main Container */}
      <div className="relative w-full md:px-12">
        {/* Desktop Navigation Arrows (Íconos limpios sin fondo, solo visibles en PC) */}
        {events.length > 1 && (
          <div className="hidden md:flex pointer-events-none absolute inset-y-0 left-0 right-0 items-center justify-between z-30">
            <button
              type="button"
              onClick={() => swiperInstance?.slidePrev()}
              disabled={isBeginning}
              aria-label="Anterior evento"
              className="pointer-events-auto p-1 text-white hover:text-[#D90429] disabled:opacity-20 disabled:hover:text-white disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="w-8 h-8 stroke-[1.75]" />
            </button>
            <button
              type="button"
              onClick={() => swiperInstance?.slideNext()}
              disabled={isEnd}
              aria-label="Siguiente evento"
              className="pointer-events-auto p-1 text-white hover:text-[#D90429] disabled:opacity-20 disabled:hover:text-white disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              <ChevronRight className="w-8 h-8 stroke-[1.75]" />
            </button>
          </div>
        )}

        <Swiper
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={"auto"}
          spaceBetween={24}
          loop={false}
          watchOverflow={true}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            syncBounds(swiper);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          onFromEdge={syncBounds}
          onResize={syncBounds}
          className="dvoid-swiper !py-2"
        >
          {events.map((event, index) => {
            const hasImage = Boolean(event.imagePath && event.imagePath.trim().length > 0);
            const categoryTag = event.category || event.theme;

            return (
              <SwiperSlide
                key={event.id || `${event.date}-${index}`}
                className="!w-[280px] !h-[400px] sm:!w-[320px] sm:!h-[450px]"
              >
                <a
                  href={event.url}
                  className="group relative block w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0c] border border-white/10 hover:border-[#D90429]/70 shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_50px_rgba(217,4,41,0.25)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  {/* Poster Image or High-End Obsidian Placeholder */}
                  {hasImage ? (
                    <img
                      src={event.imagePath}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#121217] via-[#08080a] to-[#040405] relative flex flex-col justify-between p-6 overflow-hidden">
                      {/* Geometric Background Accents */}
                      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#D90429]/10 blur-2xl group-hover:bg-[#D90429]/20 transition-all duration-500" />
                      <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-white/5 blur-xl group-hover:bg-[#D90429]/10 transition-all duration-500" />

                      {/* Header Badge in Placeholder */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D90429] bg-[#D90429]/10 px-2.5 py-1 rounded-full border border-[#D90429]/20">
                          D-VOID OFFICIAL
                        </span>
                        <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/40 group-hover:text-white group-hover:border-[#D90429]/50 transition-colors">
                          ↗
                        </div>
                      </div>

                      {/* Center Watermark Artwork */}
                      <div className="relative z-10 my-auto text-center py-6 opacity-30 group-hover:opacity-75 transition-opacity duration-300">
                        <span className="text-4xl sm:text-5xl font-black tracking-tighter text-white font-sans">
                          D-VOID
                        </span>
                        <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-400 mt-1">
                          QUITO · ECUADOR
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Dark Vignette / Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-5 sm:p-6 z-20 pointer-events-none">
                    {/* Category or Theme */}
                    {categoryTag && (
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D90429] font-semibold mb-1 line-clamp-1">
                        {categoryTag}
                      </span>
                    )}

                    {/* Event Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-white font-sans leading-tight tracking-tight transition-colors duration-200 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Event Date (D-VOID Blood Red) */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                      <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#D90429]">
                        {event.date}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
                        <span>ACCEDER</span>
                        <span className="transform group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default EventCarousel;
