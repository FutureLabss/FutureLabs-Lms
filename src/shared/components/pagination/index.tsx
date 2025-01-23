import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (page: number, size: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange, 
}) => {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full space-x-2 space-y-5 py-10 px-7 bg-white">
      <div className="flex items-center">
        <label htmlFor="rows-per-page" className="mr-2 text-gray-700">
          Show
        </label>
        <select
          id="rows-per-page"
          value={pageSize}
          onChange={(e) => onPageSizeChange(1, Number(e.target.value))} // Change handler to call onPageSizeChange
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 10, 20, 30].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="ml-2 text-gray-700">Rows</span>
      </div>
      <nav className="flex items-center space-x-5 md:pr-44">
        <button
          className="px-3 py-1 border rounded bg-[#D8D8D8] text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {currentPage > Math.floor(renderPageNumbers().length / 2) + 1 && (
          <>
            <button
              className="px-3 py-1 border rounded bg-[#D8D8D8] text-gray-600 hover:bg-gray-200"
              onClick={() => handleClick(1)}
            >
              1
            </button>
            {currentPage > Math.floor(renderPageNumbers().length / 2) + 2 && (
              <span className="px-2">...</span>
            )}
          </>
        )}
        {renderPageNumbers().map((number) => (
          <button
            key={number}
            className={`px-3 py-1 border rounded ${
              currentPage === number
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => handleClick(number)}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages - Math.floor(renderPageNumbers().length / 2) && (
          <>
            {currentPage < totalPages - Math.floor(renderPageNumbers().length / 2) - 1 && (
              <span className="px-2">...</span>
            )}
            <button
              className="px-3 py-1 border rounded bg-[#D8D8D8] text-gray-600 hover:bg-gray-200"
              onClick={() => handleClick(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          className="px-3 py-1 border rounded bg-[#D8D8D8] text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </nav>
    </div>
  );
};
export default Pagination;

