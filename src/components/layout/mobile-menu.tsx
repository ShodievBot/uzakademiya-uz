'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';

type NavItem = {href: string; label: string};

type MobileMenuProps = {
  locale: string;
  navItems: NavItem[];
  copy: {
    menu: string;
    close: string;
    contactCta: string;
    contactHref: string;
  };
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileMenu({navItems, copy}: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-mobile-nav"
        aria-label={open ? copy.close : copy.menu}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#EADCD2] bg-white text-[#111111] transition hover:border-[#FF6C26] hover:bg-[#FFF3EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6C26]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      <div
        id="site-mobile-nav"
        hidden={!open}
        className="border-t border-[#F0E2D8] pb-4 pt-4 lg:hidden absolute left-0 right-0 top-full bg-white shadow-[0_14px_34px_rgba(17,17,17,0.06)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="grid gap-2" aria-label={copy.menu}>
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={close}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'rounded-2xl px-4 py-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6C26]',
                    active
                      ? 'bg-[#FF6C26] font-bold text-white'
                      : 'border border-[#F1E5DC] bg-white font-medium text-[#444444] hover:bg-[#FFF6F0]'
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={copy.contactHref}
              prefetch={false}
              onClick={close}
              className="mt-2 inline-flex justify-center rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
            >
              {copy.contactCta}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
