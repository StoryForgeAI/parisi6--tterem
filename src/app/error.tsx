"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center max-w-md px-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-error/10 flex items-center justify-center mb-6">
          <span className="text-3xl">!</span>
        </div>
        <h1 className="font-serif text-3xl text-foreground mb-3">
          Hiba történt
        </h1>
        <p className="text-muted mb-8">
          Elnézést kérünk a kellemetlenségért. Kérjük, próbálja újra, vagy
          látogasson vissza később.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center h-11 px-6 rounded-md gold-gradient text-background font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Újrapróbálkozás
        </button>
      </div>
    </div>
  );
}
