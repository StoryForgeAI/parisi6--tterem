"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/site";

function FAQAccordion({ item }: { item: typeof faqItems[number] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-400/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
      >
        <span className="font-serif text-base sm:text-lg font-medium text-foreground pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gold-400 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="w-8 h-0.5 gold-gradient mb-3" />
              <p className="text-sm text-muted leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="section-padding relative overflow-hidden">
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
            Kérdések
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold gold-text">
            Gyakori kérdések
          </h2>
          <div className="w-16 h-0.5 gold-gradient mx-auto mt-6 mb-6" />
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Válaszok a leggyakoribb kérdésekre éttermünkkel kapcsolatban.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-3xl mx-auto space-y-4"
        >
          {faqItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <FAQAccordion item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
