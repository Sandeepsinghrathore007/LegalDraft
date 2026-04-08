export default function PricingLoading() {
  return (
    <main aria-busy="true" aria-live="polite" className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="h-10 w-56 animate-pulse rounded-xl bg-surface-container-highest" />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-72 animate-pulse rounded-3xl bg-surface-container-highest" />
        <div className="h-72 animate-pulse rounded-3xl bg-surface-container-highest" />
        <div className="h-72 animate-pulse rounded-3xl bg-surface-container-highest" />
      </div>
    </main>
  );
}
