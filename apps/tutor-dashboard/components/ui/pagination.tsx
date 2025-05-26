import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (page: number, size: number) => void;
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
  const shouldShowPagination = totalPages > 1 || hasNextPage || hasPrevPage;
  const isPrevDisabled = hasPrevPage !== undefined ? !hasPrevPage : currentPage <= 1;
  const isNextDisabled = hasNextPage !== undefined ? !hasNextPage : currentPage >= totalPages;

  if (!shouldShowPagination) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Simple case when total pages is small
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } 
    // Complex case with many pages
    else {
      let startPage: number;
      let endPage: number;

      // Current page near start
      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxVisiblePages;
      } 
      // Current page near end
      else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } 
      // Current page in middle
      else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      // Add page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (startPage > 1) {
        pages.unshift(1);
        if (startPage > 2) {
          pages.splice(1, 0, -1); // -1 represents ellipsis
        }
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(-1); // -1 represents ellipsis
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0 space-x-0 md:space-x-2 py-4 px-4 bg-white border rounded-lg mt-4">
      <nav className="flex items-center space-x-2" aria-label="Pagination Navigation">
        {/* Previous Button */}
        <button
          className="px-3 py-1 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPrevDisabled}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => (
          pageNum === -1 ? (
            <span key={`ellipsis-${index}`} className="px-2">...</span>
          ) : (
            <button
              key={pageNum}
              className={`px-3 py-1 border rounded ${
                currentPage === pageNum
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => onPageChange(pageNum)}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          )
        ))}

        {/* Next Button */}
        <button
          className="px-3 py-1 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
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