import {prisma} from '@/lib/prisma';

function StatCard({
  label,
  value
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_10px_28px_rgba(17,17,17,0.05)]">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B56A42]">
        {label}
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight text-[#111111]">
        {value}
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [journalsCount, legislationCount, usefulPagesCount, usersCount] =
    await Promise.all([
      prisma.journal.count(),
      prisma.legislationDocument.count(),
      prisma.usefulPage.count(),
      prisma.user.count()
    ]);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-white via-[#FFF9F5] to-[#FFF4ED] p-6 shadow-[0_16px_42px_rgba(17,17,17,0.06)] sm:p-8">
        <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
          Overview
        </div>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#111111] sm:text-[36px]">
          Admin dashboard
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5B5B5B] sm:text-[15px]">
          This area is now protected. Next, we will connect real CRUD sections for journals,
          legislation, useful materials, and site settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Journals" value={journalsCount} />
        <StatCard label="Legislation" value={legislationCount} />
        <StatCard label="Useful pages" value={usefulPagesCount} />
        <StatCard label="Admins / users" value={usersCount} />
      </div>

      <div className="rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_10px_28px_rgba(17,17,17,0.05)] sm:p-7">
        <h3 className="text-xl font-bold tracking-tight text-[#111111]">
          Recommended next implementation order
        </h3>

        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-[#5B5B5B] sm:text-[15px]">
          <li>Site settings editor</li>
          <li>Useful pages CRUD</li>
          <li>Legislation CRUD</li>
          <li>Journals CRUD</li>
        </ol>
      </div>
    </div>
  );
}
