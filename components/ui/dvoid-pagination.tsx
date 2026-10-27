"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DvoidPaginationProps {
  totalPages: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export default function DvoidPagination({
  totalPages,
  activeIndex,
  onPrev,
  onNext,
  onDotClick,
}: DvoidPaginationProps) {
  if (totalPages <= 0) return null;

  return (
    <div className="flex items-center justify-center gap-4 select-none py-4">
      {/* SVG Filter for Liquid Metal / Magnetic Snap Effect */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Previous Arrow */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onPrev}
        disabled={activeIndex === 0}
        aria-label="Anterior"
        className="text-[#F4F4F0] hover:text-[#C98A2B] hover:bg-white/5 disabled:opacity-20 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Technical Bars with Gooey / Magnetic Filter */}
      <div
        className="flex items-center gap-2.5 px-2 py-2"
        style={{ filter: "url(#goo)" }}
      >
        {Array.from({ length: totalPages }).map((_, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onDotClick(index)}
              aria-label={`Ir al slide ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              className="relative w-8 h-2 rounded-sm bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute inset-0 rounded-sm bg-[#C98A2B]"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Arrow */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={activeIndex === totalPages - 1}
        aria-label="Siguiente"
        className="text-[#F4F4F0] hover:text-[#C98A2B] hover:bg-white/5 disabled:opacity-20 transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
