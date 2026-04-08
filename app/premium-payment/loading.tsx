export default function PremiumPaymentLoading() {
  return (
    <main aria-busy="true" aria-live="polite" className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="h-10 w-72 animate-pulse rounded-xl bg-surface-container-highest" />
      <div className="mt-8 h-[420px] animate-pulse rounded-3xl bg-surface-container-highest" />
    </main>
  );
}
