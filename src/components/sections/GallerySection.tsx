"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/data/site";

/*
  KÉPEK CSERÉJE:
  A galéria képeinek cseréjéhez módosítsa a galleryImages tömböt a src/data/site.ts fájlban.
  Javasolt formátumok: 800x600 (vízszintes), 600x800 (függőleges), 600x600 (négyzet).
  Helyezze a képeket a public/images/gallery/ mappába.
*/

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + galleryImages.length) % galleryImages.length,
      );
    }
  };

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
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
            Pillantson be éttermünk hangulatába, és győződjön meg róla, miért
            szeretik vendégeink ezt a helyet.
          </p>
        </motion.div>
      </div>

      <div className="mt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="masonry-grid">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => openLightbox(i)}
              className={`masonry-item cursor-pointer group relative overflow-hidden rounded-xl ${
                image.height > image.width
                  ? "row-span-2"
                  : image.height === image.width
                    ? "row-span-1"
                    : "row-span-1"
              }`}
              style={{
                gridRowEnd: `span ${Math.ceil(image.height / 200)}`,
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image.src})` }}
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-sm font-medium tracking-wider uppercase">
                  Megtekintés
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Bezárás"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 sm:left-8 text-white/70 hover:text-gold-400 transition-colors z-10"
              aria-label="Előző"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-full min-h-[50vh] sm:min-h-[70vh] bg-contain bg-center bg-no-repeat rounded-xl"
                style={{
                  backgroundImage: `url(${galleryImages[selectedIndex].src})`,
                }}
              />
              <p className="text-center text-sm text-white/60 mt-4">
                {selectedIndex + 1} / {galleryImages.length}
              </p>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 sm:right-8 text-white/70 hover:text-gold-400 transition-colors z-10"
              aria-label="Következő"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          grid-auto-rows: 200px;
        }
        @media (min-width: 640px) {
          .masonry-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1280px) {
          .masonry-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .masonry-item {
          overflow: hidden;
          min-height: 200px;
        }
        .masonry-item:nth-child(2) {
          grid-row: span 2;
        }
        .masonry-item:nth-child(5) {
          grid-row: span 2;
        }
        .masonry-item:nth-child(7) {
          grid-row: span 2;
        }
      `}</style>
    </section>
  );
}
