"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-surface border-t border-border">
      <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-30" />

      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <span className="font-serif text-2xl tracking-[0.3em] gold-text">
              PARISI 6
            </span>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Budapesti magyar étterem, ahol a hagyományos ízek találkoznak az
              elegáns környezettel. Gyertyafényes vacsora, prémium kiszolgálás.
            </p>
            {/* SOCIAL LINKS - Cserélje ki a href értékeket a valós közösségi média linkekre */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-gold-400 hover:border-gold-400 transition-all duration-300 text-xs font-bold"
                aria-label="TripAdvisor"
              >
                TA
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-gold-400 mb-5">
              Nyitvatartás
            </h3>
            <ul className="space-y-3">
              {siteConfig.openingHours.map((oh) => (
                <li key={oh.day} className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {oh.day}
                  </span>
                  <span className="text-sm text-foreground mt-0.5">
                    {oh.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-gold-400 mb-5">
              Kapcsolat
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="h-4 w-4 text-gold-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                    {siteConfig.location.address}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.location.phone}`}
                  className="flex items-center gap-3 group"
                >
                  <Phone className="h-4 w-4 text-gold-400 shrink-0" />
                  <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                    {siteConfig.location.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.location.email}`}
                  className="flex items-center gap-3 group"
                >
                  <Mail className="h-4 w-4 text-gold-400 shrink-0" />
                  <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                    {siteConfig.location.email}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-gold-400 mb-5">
              Hírlevél
            </h3>
            <p className="text-sm text-muted mb-4">
              Iratkozzon fel hírlevelünkre, és értesüljön elsőként akcióinkról és
              rendezvényeinkről!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Az Ön e-mail címe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
              <Button type="submit" className="w-full text-xs tracking-wider uppercase">
                {subscribed ? "Feliratkozva!" : "Feliratkozás"}
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Minden jog
            fenntartva.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-gold-400 transition-colors">
              Adatvédelmi irányelvek
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-gold-400 transition-colors">
              Impresszum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
