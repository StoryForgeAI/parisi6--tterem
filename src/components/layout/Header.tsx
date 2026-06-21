"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Rólunk", href: "#about" },
  { label: "Étlap", href: "#dishes" },
  { label: "Galéria", href: "#gallery" },
  { label: "Vélemények", href: "#reviews" },
  { label: "Kapcsolat", href: "#contact" },
  { label: "GYIK", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          <a href="#" className="relative z-10">
            <span className="font-serif text-xl md:text-2xl tracking-[0.3em] gold-text">
              PARISI 6
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-gold-400 transition-colors duration-300 tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${siteConfig.location.phone}`}>
              <Button variant="ghost" size="icon" className="rounded-full text-gold-400 hover:text-gold-300 hover:bg-gold-400/10">
                <Phone className="h-4 w-4" />
              </Button>
            </a>
            <a href="#reservation">
              <Button size="sm" className="text-xs tracking-wider uppercase">
                <Calendar className="h-3.5 w-3.5 mr-2" />
                Asztalfoglalás
              </Button>
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2 text-foreground hover:text-gold-400 transition-colors"
            aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-0 bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-serif text-foreground hover:text-gold-400 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4"
              >
                <a href="#reservation" onClick={() => setMobileOpen(false)}>
                  <Button size="lg" className="text-sm tracking-wider uppercase">
                    <Calendar className="h-4 w-4 mr-2" />
                    Asztalfoglalás
                  </Button>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
