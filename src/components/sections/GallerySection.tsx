"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { galleryImages } from "@/data/site";

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const current = selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    if (selectedIndex !== null) {
      const next = (selectedIndex + 1) % galleryImages.length;
      setSelectedIndex(next);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [selectedIndex]);

  const goPrev = useCallback(() => {
    if (selectedIndex !== null) {
      const prev = (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
      setSelectedIndex(prev);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [selectedIndex]);

  const toggleZoom = useCallback(() => {
    setScale((prev) => (prev === 1 ? 2 : 1));
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(3, s + 0.5));
      if (e.key === "-") setScale((s) => Math.max(0.5, s - 0.5));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, closeLightbox, goNext, goPrev]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setScale((s) => Math.min(3, s + 0.1));
    } else {
      setScale((s) => Math.max(0.5, s - 0.1));
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  }, [isDragging, scale]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const elapsed = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && elapsed < 300) {
      if (dx > 0) goPrev();
      else goNext();
    }
  }, [goNext, goPrev]);

  const containerStyle: React.CSSProperties = {
    backgroundImage: current ? `url(${current.src})` : undefined,
    backgroundSize: `${scale * 100}%`,
    backgroundPosition: `${50 + position.x / (scale * 2)}% ${50 + position.y / (scale * 2)}%`,
    cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
  };

  return (
    <section id="gallery" className="section-padding relative overflow-hidden bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-medium">
            Galéria
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold gold-text">
            Hangulatunk
          </h2>
          <div className="w-16 h-0.5 gold-gradient mx-auto mt-6 mb-6" />
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Pillantson be éttermünk hangulatába.
          </p>
        </motion.div>
      </div>

      <div className="mt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => openLightbox(i)}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl border border-border/50 hover:border-gold-400/30 transition-all duration-500"
            >
              <div
                className="w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${image.src})`,
                  aspectRatio: `${image.width} / ${image.height}`,
                }}
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-sm font-medium tracking-wider uppercase border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  Megnyitás
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/98 flex flex-col"
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
              <span className="text-sm text-white/70">
                {selectedIndex + 1} / {galleryImages.length}
                {current.alt && (
                  <span className="hidden sm:inline"> &mdash; {current.alt}</span>
                )}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleZoom}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  aria-label={scale > 1 ? "Kicsinyítés" : "Nagyítás"}
                >
                  {scale > 1 ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Bezárás"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Előző kép"
            >
              <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Következő kép"
            >
              <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>

            {/* Image container */}
            <div
              className="flex-1 flex items-center justify-center p-4 sm:p-8"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-center"
              >
                <div
                  ref={imageRef}
                  className="w-full h-full max-w-[90vw] max-h-[85vh] bg-contain bg-center bg-no-repeat transition-transform duration-100 ease-out rounded-lg"
                  style={{
                    backgroundImage: `url(${current.src})`,
                    transform: `scale(${scale})`,
                  }}
                />
              </motion.div>
            </div>

            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-sm text-white/80 text-center">
                {current.alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
