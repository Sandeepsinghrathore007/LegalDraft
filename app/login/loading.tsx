export default function LoginLoading() {
  return (
    <main aria-busy="true" aria-live="polite" className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto h-96 max-w-xl animate-pulse rounded-3xl bg-surface-container-highest" />
    </main>
  );
}
