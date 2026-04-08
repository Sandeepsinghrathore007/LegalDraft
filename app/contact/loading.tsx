export default function ContactLoading() {
  return (
    <main aria-busy="true" aria-live="polite" className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="h-64 animate-pulse rounded-3xl bg-surface-container-highest lg:col-span-4" />
        <div className="h-96 animate-pulse rounded-3xl bg-surface-container-highest lg:col-span-8" />
      </div>
    </main>
  );
}
