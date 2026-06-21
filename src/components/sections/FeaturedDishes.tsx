"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { dishes } from "@/data/site";
import { Badge } from "@/components/ui/badge";

const categoryColors: Record<string, string> = {
  Levesek: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Főételek: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Előételek: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Desszertek: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

/*
  KÉPEK CSERÉJE:
  Az ételek képeinek cseréjéhez módosítsa a dish.image értékeket a src/data/site.ts fájlban.
  Javasolt formátum: 600x400px, tálalt ételek fotói.
  Helyezze a képeket a public/images/dishes/ mappába.
*/

export function FeaturedDishes() {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", ...new Set(dishes.map((d) => d.category))];

  const filtered =
    filter === "all" ? dishes : dishes.filter((d) => d.category === filter);

  return (
    <section id="dishes" className="section-padding relative overflow-hidden bg-surface/50">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-medium">
            Különlegességeink
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold gold-text">
            Ajánlott ételeink
          </h2>
          <div className="w-16 h-0.5 gold-gradient mx-auto mt-6 mb-6" />
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Válogasson a magyar konyha legfinomabb fogásai közül, melyeket
            séfünk a legnagyobb gondossággal készít el Önnek.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-300 border ${
                filter === cat
                  ? "border-gold-400 gold-gradient text-background"
                  : "border-border text-muted-foreground hover:border-gold-400/40 hover:text-gold-300"
              }`}
            >
              {cat === "all" ? "Összes" : cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface transition-all duration-500 hover:border-gold-400/30 hover:shadow-xl hover:shadow-gold-500/5"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${dish.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="outline"
                    className={`text-[10px] tracking-wider border ${
                      categoryColors[dish.category] || "border-gold-400/30 text-gold-300 bg-gold-400/5"
                    }`}
                  >
                    {dish.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-gold-400 transition-colors">
                    {dish.name}
                  </h3>
                  <span className="text-sm font-semibold gold-text shrink-0">
                    {dish.price}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
