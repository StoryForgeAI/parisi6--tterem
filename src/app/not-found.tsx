import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center max-w-md px-6">
        <span className="font-serif text-8xl gold-text font-bold">404</span>
        <h1 className="font-serif text-3xl text-foreground mt-4 mb-3">
          Az oldal nem található
        </h1>
        <p className="text-muted mb-8">
          A keresett oldal nem létezik vagy eltávolításra került. Kérjük,
          térjen vissza a főoldalra.
        </p>
        <Link href="/">
          <Button size="lg" className="text-sm tracking-widest uppercase">
            Vissza a főoldalra
          </Button>
        </Link>
      </div>
    </div>
  );
}
