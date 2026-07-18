import type {Metadata} from 'next';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import {getUsefulPages, pickLocale} from '@/lib/useful';

export const metadata: Metadata = {
  title: 'Useful pages | Admin'
};

export default async function AdminUsefulPagesListPage() {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'SUPERADMIN' && user.role !== 'EDITOR') {
    redirect('/admin');
  }

  const pages = await getUsefulPages();

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-white via-[#FFF9F5] to-[#FFF4ED] p-6 shadow-[0_16px_42px_rgba(17,17,17,0.06)] sm:p-8">
        <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
          Useful pages
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#111111] sm:text-[36px]">
          Useful pages editor
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5B5B5B] sm:text-[15px]">
          Open any useful material page and manage multilingual text, sources,
          and structured content blocks.
        </p>

        <div className="mt-6">
          <Link
            href="/admin"
            className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
          >
            Back to dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => (
          <article
            key={page.slug}
            className="flex h-full flex-col rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_10px_28px_rgba(17,17,17,0.05)]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B56A42]">
              /{page.slug}
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#111111]">
              {pickLocale(page.title, 'ru')}
            </h2>

            <p className="mt-3 flex-1 text-sm leading-7 text-[#5B5B5B]">
              {pickLocale(page.cardText, 'ru')}
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#6B6B6B]">
              <span className="rounded-full bg-[#FFF8F3] px-3 py-1">
                Blocks: {page.blocks.length}
              </span>
              <span className="rounded-full bg-[#FFF8F3] px-3 py-1">
                Sources: {page.sources.length}
              </span>
            </div>

            <Link
              href={`/admin/useful/${page.slug}`}
              style={{color: '#ffffff'}}
              className="mt-6 inline-flex min-w-[160px] items-center justify-center rounded-2xl bg-[#111111] px-5 py-3 text-sm font-semibold leading-none whitespace-nowrap transition hover:bg-[#2A2A2A]"
            >
              <span style={{color: '#ffffff'}}>Edit page</span>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
