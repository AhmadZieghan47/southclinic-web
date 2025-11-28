import { forwardRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.css';

/**
 * Generate page numbers to display
 */
const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'ellipsis')[] => {
  const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const pages: (number | 'ellipsis')[] = [];

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    pages.push(...leftRange, 'ellipsis', totalPages);
  } else if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
    );
    pages.push(1, 'ellipsis', ...rightRange);
  } else {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    pages.push(1, 'ellipsis', ...middleRange, 'ellipsis', totalPages);
  }

  return pages;
};

/**
 * Pagination Component
 * 
 * Page navigation with configurable display options.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onChange,
      size = 'md',
      showFirstLast = true,
      siblingCount = 1,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const pages = useMemo(
      () => getPageNumbers(currentPage, totalPages, siblingCount),
      [currentPage, totalPages, siblingCount]
    );

    const classes = [styles.pagination, styles[size], className]
      .filter(Boolean)
      .join(' ');

    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

    return (
      <nav ref={ref} className={classes} aria-label="Pagination" {...props}>
        {showFirstLast && (
          <button
            className={styles.btn}
            onClick={() => onChange(1)}
            disabled={disabled || currentPage === 1}
            aria-label="First page"
          >
            <ChevronsLeft size={iconSize} />
          </button>
        )}

        <button
          className={styles.btn}
          onClick={() => onChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={iconSize} />
        </button>

        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={page}
              className={`${styles.btn} ${currentPage === page ? styles.active : ''}`}
              onClick={() => onChange(page)}
              disabled={disabled}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          className={styles.btn}
          onClick={() => onChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={iconSize} />
        </button>

        {showFirstLast && (
          <button
            className={styles.btn}
            onClick={() => onChange(totalPages)}
            disabled={disabled || currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronsRight size={iconSize} />
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
