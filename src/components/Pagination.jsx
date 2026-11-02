import React, { memo, useMemo } from "react";

import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Pagination = memo(function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange
}) {
  const { start, end } = useMemo(() => ({
    start: total === 0 ? 0 : (page - 1) * limit + 1,
    end: Math.min(page * limit, total)
  }), [page, limit, total]);

  const pages = useMemo(() => {
    const result = [];

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      result.push(i);
    }

    return result;
  }, [page, totalPages]);

  return (
    <div className="pagination-container">

      <div className="pagination-info">
        Showing <strong>{start}-{end}</strong> of{" "}
        <strong>{total}</strong> results
      </div>

      <div className="pagination-controls">

        <button
          className="page-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((number) => (
          <button
            key={number}
            className={`page-btn ${
              page === number ? "active" : ""
            }`}
            onClick={() => onPageChange(number)}
            aria-current={page === number ? "page" : undefined}
          >
            {number}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
});

export default Pagination;