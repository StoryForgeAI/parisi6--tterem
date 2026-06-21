"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Phone, Calendar, ChevronDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { Badge } from "@/components/ui/badge";

/*
  KÉPEK CSERÉJE:
  A hero háttérkép cseréjéhez módosítsa a heroImage változóban lévő URL-t.
  Javasolt formátum: 1920x1080px, sötét tónusú éttermi/ételek fotó.
*/

const heroImage =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 section-container text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge variant="gold" className="mb-6 px-4 py-1.5 text-xs tracking-[0.2em] uppercase">
            <Award className="h-3 w-3 mr-1.5" />
            Budapest legkedveltebb étterme
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-balance"
        >
          <span className="gold-text">Parisi 6</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-muted font-light tracking-wide"
        >
          Magyar konyha eleganciával
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-2"
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 fill-gold-400 text-gold-400"
              />
            ))}
          </div>
          <span className="text-sm text-foreground font-medium">
            {siteConfig.rating.score}
          </span>
          <span className="text-sm text-muted">
            ({siteConfig.rating.reviews.toLocaleString("hu-HU")} értékelés)
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#reservation">
            <Button
              size="xl"
              className="text-sm tracking-widest uppercase shadow-2xl shadow-gold-500/30"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Asztalfoglalás
            </Button>
          </a>
          <a href={`tel:${siteConfig.location.phone}`}>
            <Button
              variant="outline"
              size="xl"
              className="text-sm tracking-widest uppercase"
            >
              <Phone className="h-4 w-4 mr-2" />
              Hívás most
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
