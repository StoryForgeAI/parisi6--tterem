"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";

/*
  TÉRKÉP CSERÉJE:
  A Google Maps beágyazás cseréjéhez módosítsa a googleMapsEmbed URL-t a src/data/site.ts fájlban.
*/

export function ContactSection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-surface/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-medium">
            Kapcsolat
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold gold-text">
            Keressen minket
          </h2>
          <div className="w-16 h-0.5 gold-gradient mx-auto mt-6 mb-6" />
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Látogasson el hozzánk, vagy vegye fel velünk a kapcsolatot az
            alábbi elérhetőségeken.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  Cím
                </h3>
                <p className="text-muted">{siteConfig.location.address}</p>
                <a
                  href={siteConfig.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-400 hover:text-gold-300 transition-colors mt-1 inline-block"
                >
                  Útvonaltervezés →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  Telefon
                </h3>
                <a
                  href={`tel:${siteConfig.location.phone}`}
                  className="text-muted hover:text-gold-400 transition-colors"
                >
                  {siteConfig.location.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  E-mail
                </h3>
                <a
                  href={`mailto:${siteConfig.location.email}`}
                  className="text-muted hover:text-gold-400 transition-colors"
                >
                  {siteConfig.location.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  Nyitvatartás
                </h3>
                <div className="space-y-1">
                  {siteConfig.openingHours.map((oh) => (
                    <div key={oh.day} className="flex gap-4 text-sm">
                      <span className="text-muted min-w-[160px]">{oh.day}</span>
                      <span className="text-foreground">{oh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a href="#reservation">
                <Button size="lg" className="text-sm tracking-widest uppercase">
                  Asztalfoglalás
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden border border-border h-[400px] lg:h-auto min-h-[400px]"
          >
            <iframe
              src={siteConfig.location.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Parisi 6 elhelyezkedése"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
