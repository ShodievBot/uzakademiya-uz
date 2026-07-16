import Link from "next/link";
import type { UsefulSource } from "@/types/useful-page";

export function SourceBadge({ source }: { source: UsefulSource }) {
  return (
    <span className="group relative ml-1 inline-flex align-super">
      <Link
        href={source.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Источник: ${source.title}`}
        className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700 transition hover:bg-slate-900 hover:text-white"
      >
        ?
      </Link>

      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 hidden w-72 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-[11px] leading-4 text-white shadow-lg group-hover:block">
        <span className="font-semibold">Источник</span>
        <br />
        {source.title}
      </span>
    </span>
  );
}
