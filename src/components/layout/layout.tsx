import Link from "next/link";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/journals", label: "Журналы" },
  { href: "/scopus", label: "Scopus" },
  { href: "/oak", label: "OAK" },
  { href: "/news", label: "Новости" },
  { href: "/legislation", label: "Законодательство" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Journal Platform UZ
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
