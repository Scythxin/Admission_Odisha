import React from 'react';

const ROW_OPTIONS = [5, 10, 15, 20, 25, 50];

function getPaginationItems(page, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", page, "...", totalPages];
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  setPage, 
  rowsPerPage, 
  setRowsPerPage, 
  totalItems
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-500">
        Showing{" "}
        {totalItems === 0
          ? 0
          : (currentPage - 1) * rowsPerPage + 1}{" "}
        to {Math.min(currentPage * rowsPerPage, totalItems)} of{" "}
        {totalItems} entries
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
          >
            {ROW_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage <= 1}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100"
          >
            Previous
          </button>
          {getPaginationItems(currentPage, totalPages).map(
            (item, index) => (
              <button
                key={`${item}-${index}`}
                type="button"
                onClick={() => typeof item === "number" && setPage(item)}
                disabled={item === "..."}
                className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-xl border px-3 text-sm transition ${
                  item === currentPage
                    ? "border-blue-600 bg-blue-600 text-white"
                    : item === "..."
                      ? "cursor-default border-transparent text-slate-400"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() =>
              setPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage >= totalPages}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
