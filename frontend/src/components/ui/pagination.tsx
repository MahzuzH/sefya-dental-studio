import * as React from "react";
import { Button } from "@/components/ui/button";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (p: number) => void;
};

function range(start: number, end: number) {
    const out = [] as number[];
    for (let i = start; i <= end; i++) out.push(i);
    return out;
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
    if (totalPages <= 1) return null;

    const pages: (number | "...")[] = [];

    // Option B: consistent window behavior
    // If few pages, show all
    if (totalPages <= 6) {
        pages.push(...range(1, totalPages));
    } else {
        // always show first
        pages.push(1);

        // near start: show 1..4, then ellipsis, last
        if (page <= 3) {
            pages.push(...range(2, 4));
            pages.push("...");
            pages.push(totalPages);
        } else if (page >= totalPages - 2) {
            // near end: show first, ellipsis, last-3..last
            pages.push("...");
            pages.push(...range(totalPages - 3, totalPages - 1));
            pages.push(totalPages);
        } else {
            // middle: first, ellipsis, page-1, page, page+1, ellipsis, last
            pages.push("...");
            pages.push(...range(page - 1, page + 1));
            pages.push("...");
            pages.push(totalPages);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button
                aria-label="Previous"
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="h-8 w-8 flex items-center justify-center rounded-md text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
                ‹
            </button>

            {pages.map((p, idx) =>
                p === "..." ? (
                    <span
                        key={`e${idx}`}
                        className="px-2 text-sm text-slate-400"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        aria-current={p === page ? "page" : undefined}
                        onClick={() => onPageChange(Number(p))}
                        className={`min-w-[36px] h-8 flex items-center justify-center text-sm select-none transition-all duration-150 ${
                            p === page
                                ? "bg-violet-500 text-white rounded-md shadow-md hover:bg-violet-600"
                                : "text-slate-700 hover:bg-slate-50 rounded-md"
                        } cursor-pointer`}
                        title={`Page ${p}`}
                    >
                        {p}
                    </button>
                ),
            )}

            <button
                aria-label="Next"
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="h-8 w-8 flex items-center justify-center rounded-md text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
                ›
            </button>
        </div>
    );
}

export default Pagination;
