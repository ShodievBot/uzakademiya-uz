export function PageSkeleton() {
  return (
    <main className="pb-16" aria-busy="true" aria-live="polite">
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div className="animate-pulse rounded-[40px] border border-[#F1D8C8] bg-[#FFF9F5] p-8 sm:p-10">
          <div className="mb-5 h-6 w-40 rounded-full bg-[#F1E5DC]" />
          <div className="mb-4 h-10 w-3/4 rounded-2xl bg-[#F1E5DC]" />
          <div className="mb-2 h-4 w-2/3 rounded bg-[#F1E5DC]" />
          <div className="h-4 w-1/2 rounded bg-[#F1E5DC]" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 rounded-[26px] bg-white/70" />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-3xl border border-[#ECE3DC] bg-white"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
