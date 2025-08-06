'use client';

import { PaginationProps } from '../../types';

export default function Pagination({ currentPage, totalPages, onPageChange, disabled = false }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => !disabled && onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        className="px-3 py-2 text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => !disabled && onPageChange(page)}
          disabled={disabled}
          className={`px-3 py-2 rounded-lg transition-all duration-200 ${
            currentPage === page
              ? 'bg-accent text-text-primary shadow-lg'
              : 'text-text-secondary hover:text-text-primary hover:bg-secondary'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => !disabled && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        className="px-3 py-2 text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}