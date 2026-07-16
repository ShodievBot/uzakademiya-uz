import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="text-6xl font-bold text-blue-600">404</div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Page not found
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            The page you are looking for does not exist, was moved, or the link
            is incorrect.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Go to Home
            </Link>

            <Link
              href="/journals"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Open Journals Catalog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
