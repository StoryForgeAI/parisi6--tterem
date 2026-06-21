"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews, whyGuestsLoveUs } from "@/data/site";
import { Card, CardContent } from "@/components/ui/card";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-gold-400 text-gold-400"
              : "text-border"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="section-padding relative overflow-hidden bg-surface/50">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-medium">
            Vendégeink véleménye
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold gold-text">
            Miért szeretik vendégeink
          </h2>
          <div className="w-16 h-0.5 gold-gradient mx-auto mt-6 mb-6" />
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Több mint 11 000 elégedett vendég véleménye alapján
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyGuestsLoveUs.map((item, i) => {
            const Icon = motion.create(
              ({ className }: { className?: string }) => {
                const icons: Record<string, React.ReactNode> = {
                  sparkles: <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />,
                  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
                  clock: <circle cx="12" cy="12" r="10" />,
                  palette: <circle cx="13.5" cy="6.5" r="2.5" />,
                  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
                  crown: <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />,
                };
                const path = icons[item.icon] || icons.star;
                return (
                  <svg
                    className={className}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {path}
                  </svg>
                );
              },
            );

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-xl border border-border bg-surface hover:border-gold-400/20 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/5"
              >
                <div className="w-12 h-12 mx-auto rounded-full gold-gradient/20 bg-gold-400/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-center font-serif text-2xl sm:text-3xl gold-text mb-10">
            Mit mondanak vendégeink
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-border bg-surface hover:border-gold-400/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <Quote className="h-6 w-6 text-gold-400/50 mb-3" />
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-4">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="mt-auto">
                      <Stars rating={review.rating} />
                      <p className="text-sm font-medium text-foreground mt-2">
                        {review.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
