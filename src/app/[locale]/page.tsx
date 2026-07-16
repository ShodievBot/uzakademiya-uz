type Props = {
  params: Promise<{locale: string}>;
};

export default async function LocaleHomePage({params}: Props) {
  const {locale} = await params;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-slate-900">UzAkademiya.uz</h1>
        <p className="mt-4 text-slate-600">
          Это временная локализованная главная страница.
        </p>
        <p className="mt-6 text-sm text-slate-500">Locale: {locale}</p>
      </div>
    </main>
  );
}
