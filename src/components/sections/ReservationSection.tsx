"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarDays, Clock, Users, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const reservationSchema = z.object({
  name: z
    .string()
    .min(2, "A név legalább 2 karakter hosszú legyen")
    .max(100, "A név túl hosszú"),
  email: z
    .string()
    .email("Kérjük, adjon meg egy érvényes e-mail címet"),
  phone: z
    .string()
    .min(6, "Kérjük, adjon meg egy érvényes telefonszámot")
    .max(20, "A telefonszám túl hosszú"),
  guests: z
    .string()
    .min(1, "Kérjük, válassza ki a vendégek számát"),
  date: z
    .string()
    .min(1, "Kérjük, válassza ki a dátumot"),
  time: z
    .string()
    .min(1, "Kérjük, válassza ki az időpontot"),
  notes: z
    .string()
    .max(500, "A megjegyzés maximum 500 karakter lehet")
    .optional()
    .or(z.literal("")),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const guestOptions = Array.from({ length: 10 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `${i + 1} fő`,
}));

const timeOptions = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30",
];

export function ReservationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Sikertelen foglalás");

      setIsSuccess(true);
      toast({
        title: "Sikeres foglalás!",
        description: "Köszönjük! Visszaigazoló e-mailt küldtünk a megadott címre.",
        variant: "success",
      });
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      toast({
        title: "Hiba történt",
        description: "Kérjük, próbálja újra később, vagy hívjon minket telefonon.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reservation" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold-400 font-medium">
            Foglalás
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold gold-text">
            Asztalfoglalás
          </h2>
          <div className="w-16 h-0.5 gold-gradient mx-auto mt-6 mb-6" />
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Foglalja le asztalát még ma, és garantálja a felejthetetlen
            gasztroélményt!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 rounded-xl border border-success/30 bg-success/5"
            >
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-2">
                Köszönjük foglalását!
              </h3>
              <p className="text-muted">
                Visszaigazoló e-mailt küldtünk a megadott címre. Várjuk
                szeretettel!
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 p-8 rounded-xl border border-border bg-surface/80 backdrop-blur-sm"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="name">Teljes név</Label>
                  <Input
                    id="name"
                    placeholder="Pl. Kovács János"
                    {...register("name")}
                    className={errors.name ? "border-error" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-error mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail cím</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="pelda@email.hu"
                    {...register("email")}
                    className={errors.email ? "border-error" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-error mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonszám</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+36 30 123 4567"
                    {...register("phone")}
                    className={errors.phone ? "border-error" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-error mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Vendégek száma</Label>
                  <Select
                    onValueChange={(val) => setValue("guests", val)}
                  >
                    <SelectTrigger
                      className={errors.guests ? "border-error" : ""}
                    >
                      <SelectValue placeholder="Válasszon..." />
                    </SelectTrigger>
                    <SelectContent>
                      {guestOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.guests && (
                    <p className="text-xs text-error mt-1">
                      {errors.guests.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Dátum</Label>
                  <Input
                    id="date"
                    type="date"
                    min={today}
                    {...register("date")}
                    className={errors.date ? "border-error" : ""}
                  />
                  {errors.date && (
                    <p className="text-xs text-error mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Időpont</Label>
                  <Select
                    onValueChange={(val) => setValue("time", val)}
                  >
                    <SelectTrigger
                      className={errors.time ? "border-error" : ""}
                    >
                      <SelectValue placeholder="Válasszon..." />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && (
                    <p className="text-xs text-error mt-1">
                      {errors.time.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Megjegyzés (opcionális)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Allergiák, különleges kérések..."
                    {...register("notes")}
                    className={errors.notes ? "border-error" : ""}
                  />
                  {errors.notes && (
                    <p className="text-xs text-error mt-1">
                      {errors.notes.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full text-sm tracking-widest uppercase"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Foglalás...
                  </>
                ) : (
                  <>
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Foglalás elküldése
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted">
                Foglalásának visszaigazolásáról e-mailben értesítjük.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
