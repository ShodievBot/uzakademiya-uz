type Props = {
  params: Promise<{locale: string}>;
};

export default async function LocalizedLegislationPage({params}: Props) {
  const {locale} = await params;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Legislation</h1>
        <p className="mt-4 text-slate-600">
          Временная локализованная страница законодательства.
        </p>

        <p className="mt-6 text-sm text-slate-500">Locale: {locale}</p>
      </div>
    </main>
  );
}
