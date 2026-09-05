'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

type NavItem = {href: string; label: string};

type NavLinksProps = {
  items: NavItem[];
  className?: string;
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks({items, className}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={[
              className || '',
              'rounded-2xl px-4 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6C26]',
              active
                ? 'bg-[#FF6C26] font-bold text-white shadow-[0_8px_18px_rgba(255,108,38,0.24)]'
                : 'font-medium text-[#4C4C4C] hover:bg-[#FFF3EB] hover:text-[#111111]'
            ].join(' ')}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
