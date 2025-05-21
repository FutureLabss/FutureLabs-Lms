import React, { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (page: number, size: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  hasNextPage,
  hasPrevPage,
}) => {
  // Log pagination props for debugging
  useEffect(() => {
    console.log("Pagination props:", { currentPage, totalPages, pageSize, hasNextPage, hasPrevPage });
  }, [currentPage, totalPages, pageSize, hasNextPage, hasPrevPage]);

  const handleClick = (page: number) => {
    if (page >= 1 && (page <= totalPages || (page > currentPage && hasNextPage) || (page < currentPage && hasPrevPage)) && page !== currentPage) {
      console.log("Changing to page:", page);
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    // If totalPages is unreliable (API doesn't provide total), we can use a different approach
    if (!totalPages || totalPages <= 0) {
      // Just show a window around current page
      const start = Math.max(1, currentPage - 2);
      const end = currentPage + 2;
      
      for (let i = start; i <= end; i++) {
        // Only add pages that make sense (we know current page exists)
        if (i >= 1) {
          // For pages after current, only add if hasNextPage is true or undefined
          if (i <= currentPage || hasNextPage === undefined || hasNextPage) {
            // For final page, only add if we're not sure there are more pages
            if (i < end || hasNextPage === undefined || hasNextPage) {
              pageNumbers.push(i);
            }
          }
        }
      }
    } else {
      // Traditional approach with known totalPages
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  // Default to enabling next/prev based on hasNextPage/hasPrevPage if provided
  const isPrevDisabled = hasPrevPage !== undefined ? !hasPrevPage : currentPage <= 1;
  const isNextDisabled = hasNextPage !== undefined ? !hasNextPage : currentPage >= totalPages;

  // Don't render pagination if we know there's only one page
  // if (totalPages === 1 && !hasNextPage) {
  //   return null;
  // }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0 space-x-0 md:space-x-2 py-4 px-4 bg-white border rounded-lg mt-4">
      <nav className="flex items-center space-x-2" aria-label="Pagination Navigation">
        {/* Previous Button */}
        <button
          className="px-3 py-1 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleClick(currentPage - 1)}
          disabled={isPrevDisabled}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {/* First page & leading ellipsis - only show if we have reliable total pages */}
        {totalPages > 0 && currentPage > 3 && (
          <>
            <button
              className="px-3 py-1 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
              onClick={() => handleClick(1)}
              aria-label={`Go to page 1`}
            >
              1
            </button>
            {currentPage > 4 && <span className="px-2">...</span>}
          </>
        )}

        {/* Page Number Buttons */}
        {renderPageNumbers().map((number) => (
          <button
            key={number}
            className={`px-3 py-1 border rounded ${
              currentPage === number
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handleClick(number)}
            aria-current={currentPage === number ? "page" : undefined}
            aria-label={`Go to page ${number}`}
          >
            {number}
          </button>
        ))}

        {/* Trailing ellipsis & last page - only show if we have reliable total pages */}
        {totalPages > 0 && currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="px-2">...</span>}
            <button
              className="px-3 py-1 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
              onClick={() => handleClick(totalPages)}
              aria-label={`Go to page ${totalPages}`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          className="px-3 py-1 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleClick(currentPage + 1)}
          disabled={isNextDisabled}
          aria-label="Next page"
        >
          &gt;
        </button>
      </nav>

      <div className="text-sm text-gray-500">
        Page {currentPage}{totalPages > 0 ? ` of ${totalPages}` : ''}
      </div>
    </div>
  );
};

export default Pagination;