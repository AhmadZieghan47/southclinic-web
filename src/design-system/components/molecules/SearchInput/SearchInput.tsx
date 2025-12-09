import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { Spinner } from '../../atoms/Spinner';
import type { SearchInputProps } from './SearchInput.types';
import styles from './SearchInput.module.css';

/**
 * SearchInput Component
 *
 * Input field optimized for search with icon and clear button.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      size = 'md',
      clearable = true,
      onClear,
      loading = false,
      fullWidth = false,
      value,
      className,
      ...props
    },
    ref,
  ) => {
    const hasValue = value !== undefined && value !== '';
    const showClear = clearable && hasValue && !loading;

    const wrapperClasses = [
      styles.wrapper,
      styles[size],
      fullWidth && styles.fullWidth,
      showClear && styles.hasClear,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

    return (
      <div className={wrapperClasses}>
        <span className={styles.searchIcon}>
          <Search size={iconSize} />
        </span>
        <input ref={ref} type="search" className={styles.input} value={value} {...props} />
        {loading ? (
          <span className={styles.spinner}>
            <Spinner size="sm" />
          </span>
        ) : null}
        {showClear ? (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={onClear}
            aria-label="Clear search"
          >
            <X size={iconSize} />
          </button>
        ) : null}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
