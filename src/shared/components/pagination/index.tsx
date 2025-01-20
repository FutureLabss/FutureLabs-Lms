import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, pageSize, onPageChange }: PaginationProps) {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = pageSize; // Maximum number of visible pagination buttons

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
    <nav className="md:flex items-center md:justify-center space-x-2 my-8">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {currentPage > Math.floor(renderPageNumbers().length / 2) + 1 && (
        <>
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-900 hover:bg-gray-300"
            onClick={() => handleClick(1)}
          >
            1
          </button>
          {currentPage > Math.floor(renderPageNumbers().length / 2) + 2 && <span className="px-2">...</span>}
        </>
      )}
      {renderPageNumbers().map((number) => (
        <button
          key={number}
          className={`px-4 py-2 rounded ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
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
            className="px-4 py-2 rounded bg-gray-200 text-gray-900 hover:bg-gray-300"
            onClick={() => handleClick(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
