import { useState, useCallback, useRef, useEffect } from 'react';
import { SEARCH } from '@/constants';
import { isValidString } from '@/utils/validation';

interface SearchBarProps {
  readonly onSearch: (query: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
}

export function SearchBar({
  onSearch,
  placeholder = '검색어를 입력하세요...',
  className = '',
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearch = useCallback(
    (query: string) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onSearch(query);
        timeoutRef.current = null;
      }, SEARCH.debounceDelay);
    },
    [onSearch]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newQuery = event.target.value;
      setSearchQuery(newQuery);
      
      if (isValidString(newQuery) && newQuery.length >= SEARCH.minQueryLength) {
        debouncedSearch(newQuery);
      } else if (newQuery.length === 0) {
        onSearch('');
      }
    },
    [debouncedSearch, onSearch]
  );

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          aria-label="검색 입력"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {isValidString(searchQuery) && searchQuery.length > 0 && (
          <button
            onClick={() => {
              setSearchQuery('');
              onSearch('');
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="검색어 지우기"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
