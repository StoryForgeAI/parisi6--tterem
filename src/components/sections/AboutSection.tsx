"use client";

import { motion } from "framer-motion";
import { Utensils, Sparkles, Heart, BadgePercent } from "lucide-react";
import { siteConfig } from "@/data/site";

/*
  KÉPEK CSERÉJE:
  Az "about" kép cseréjéhez módosítsa az aboutImage URL-t.
  Javasolt formátum: 800x1000px, elegáns éttermi belső tér.
*/

const aboutImage =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

const highlights = [
  {
    icon: Utensils,
    title: "Autentikus magyar konyha",
    description:
      "Hagyományos magyar ételek modern köntösben, a legjobb hazai alapanyagokból.",
  },
  {
    icon: Sparkles,
    title: "Elegáns környezet",
    description:
      "Gyertyafényes vacsorák, letisztult dizájn és meghitt atmoszféra.",
  },
  {
    icon: Heart,
    title: "Figyelmes kiszolgálás",
    description:
      "Szakértő személyzetünk mindent megtesz a felejthetetlen élményért.",
  },
  {
    icon: BadgePercent,
    title: "Kiváló ár-érték arány",
    description:
      `Prémium minőség ${siteConfig.priceRange} közötti áron, ami páratlan a belvárosban.`,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl">
              <div
                className="aspect-[4/5] bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${aboutImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-xl" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 gold-gradient rounded-xl flex items-center justify-center shadow-2xl hidden sm:flex">
              <div className="text-center">
                <span className="block text-3xl font-bold text-background">
                  {siteConfig.rating.score}
                </span>
                <span className="block text-xs text-background/80 font-medium">
                  Google ★
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-medium">
              Üdvözöljük a
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold gold-text">
              Parisi 6-ban
            </h2>
            <div className="w-16 h-0.5 gold-gradient mt-6 mb-6" />
            <p className="text-muted leading-relaxed text-base sm:text-lg">
              Budapest szívében, a Párizsi utcában található éttermünk a magyar
              gasztronómia legjavát kínálja elegáns, mégis barátságos
              környezetben. Legyen szó egy romantikus vacsoráról, baráti
              összejövetelről vagy üzleti ebédről, nálunk garantáltan
              felejthetetlen élményben lesz része.
            </p>
            <p className="mt-4 text-muted leading-relaxed text-base sm:text-lg">
              Séfünk a legkiválóbb magyar alapanyagokból dolgozik, ötvözve a
              hagyományos receptúrákat a modern tálalás művészetével.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-gold-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
