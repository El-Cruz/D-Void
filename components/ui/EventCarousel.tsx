"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import DvoidPagination from "./dvoid-pagination";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

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
  const [activeIndex, setActiveIndex] = useState(0);

  if (!events || events.length === 0) {
    return null;
  }

  const isLoop = events.length > 2;

  return (
    <div
      className={`w-full py-8 md:py-12 bg-transparent select-none relative overflow-hidden ${className}`}
    >
      {/* Month Header Banner (if provided) */}
      {month && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 md:mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C98A2B] animate-pulse" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.25em] font-mono text-[#F4F4F0]/80">
              {month}
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 tracking-wider">
            {events.length} {events.length === 1 ? "EVENTO" : "EVENTOS"}
          </span>
        </div>
      )}

      {/* Swiper Main Container */}
      <div className="relative w-full px-4 md:px-12">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          coverflowEffect={{
            rotate: 22,
            stretch: 0,
            depth: 180,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={isLoop}
          className="dvoid-swiper !pb-8 !overflow-visible"
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
                  className="group relative block w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0c] border border-white/10 hover:border-[#C98A2B]/70 shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_50px_rgba(201,138,43,0.18)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
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
                      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#0047AB]/10 blur-2xl group-hover:bg-[#C98A2B]/15 transition-all duration-500" />
                      <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-[#C98A2B]/10 blur-xl group-hover:bg-[#0047AB]/15 transition-all duration-500" />

                      {/* Header Badge in Placeholder */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C98A2B] bg-[#C98A2B]/10 px-2.5 py-1 rounded-full border border-[#C98A2B]/20">
                          D-VOID OFFICIAL
                        </span>
                        <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/40 group-hover:text-[#F4F4F0] group-hover:border-[#C98A2B]/40 transition-colors">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-5 sm:p-6 z-20 pointer-events-none">
                    {/* Category or Theme */}
                    {categoryTag && (
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C98A2B] font-semibold mb-1 line-clamp-1">
                        {categoryTag}
                      </span>
                    )}

                    {/* Event Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#F4F4F0] font-sans leading-tight tracking-tight group-hover:text-white transition-colors duration-200 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Event Date (JetBrains Mono style) */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                      <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#C98A2B]">
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

        {/* Magnetic D-VOID Pagination (Hidden when 1 or fewer events) */}
        {events.length > 1 && (
          <DvoidPagination
            totalPages={events.length}
            activeIndex={activeIndex}
            onPrev={() => swiperInstance?.slidePrev()}
            onNext={() => swiperInstance?.slideNext()}
            onDotClick={(idx) =>
              isLoop
                ? swiperInstance?.slideToLoop(idx)
                : swiperInstance?.slideTo(idx)
            }
          />
        )}
      </div>
    </div>
  );
};

export default EventCarousel;
