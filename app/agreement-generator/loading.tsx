export default function AgreementGeneratorLoading() {
  return (
    <main aria-busy="true" aria-live="polite" className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
      <div className="h-10 w-60 animate-pulse rounded-xl bg-surface-container-highest" />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="h-[560px] animate-pulse rounded-3xl bg-surface-container-highest lg:col-span-5" />
        <div className="h-[560px] animate-pulse rounded-3xl bg-surface-container-highest lg:col-span-7" />
      </div>
    </main>
  );
}
