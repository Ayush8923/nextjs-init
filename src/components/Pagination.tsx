import React from "react";

type PaginationProps = {
  currentPage?: number;
  lastPage?: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange?: (page: number) => void;
};

const Pagination = ({
  currentPage = 1,
  lastPage = 1,
  onPageChange,
}: PaginationProps) => {
  const getPaginationPages = (
    current: number,
    last: number
  ): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 1;

    for (let i = 1; i <= last; i++) {
      if (
        i === 1 ||
        i === last ||
        (i >= current - delta && i <= current + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return (
    lastPage > 1 && (
      <div className="flex justify-end mt-4 mb-[30px]">
        <div className="inline-flex items-center space-x-2 text-base">
          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {getPaginationPages(currentPage, lastPage).map((page, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-primary-100 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } ${page === "..." ? "cursor-default" : ""}`}
              onClick={() => typeof page === "number" && onPageChange?.(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            onClick={() =>
              currentPage < lastPage && onPageChange?.(currentPage + 1)
            }
            disabled={currentPage === lastPage}
          >
            {">"}
          </button>
        </div>
      </div>
    )
  );
};

export default Pagination;
