export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mx-auto" />
        <p className="mt-6 text-sm text-muted font-medium tracking-wider uppercase">
          Betöltés...
        </p>
      </div>
    </div>
  );
}
