import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="text-base font-semibold text-slate-900">
            UzAkademiya.uz
          </div>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Каталог научных журналов и справочная платформа по Scopus, OAK,
            законодательству и публикационным требованиям.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link href="/journals" className="transition hover:text-slate-900">
            Журналы
          </Link>
          <Link href="/scopus" className="transition hover:text-slate-900">
            Scopus
          </Link>
          <Link href="/oak" className="transition hover:text-slate-900">
            OAK
          </Link>
          <Link
            href="/legislation"
            className="transition hover:text-slate-900"
          >
            Законодательство
          </Link>
          <Link href="/contacts" className="transition hover:text-slate-900">
            Контакты
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          <span>© 2026 UzAkademiya.uz</span>
          <span>Все права защищены</span>
        </div>
      </div>
    </footer>
  );
}
