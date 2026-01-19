import type { CategoryType } from '@/types';
import { CATEGORY_TYPES, CATEGORY_ORDER } from '@/constants/categories';

interface CategoryFilterProps {
  readonly selectedCategory: CategoryType | 'all';
  readonly onCategoryChange: (category: CategoryType | 'all') => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-lg font-medium transition-colors touch-manipulation ${
          selectedCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 active:bg-gray-300 dark:active:bg-gray-600'
        }`}
      >
        전체
      </button>
      {CATEGORY_ORDER.map((categoryType) => {
        const category = CATEGORY_TYPES[categoryType];
        const isSelected = selectedCategory === categoryType;
        return (
          <button
            key={categoryType}
            onClick={() => onCategoryChange(categoryType)}
            className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-lg font-medium transition-colors touch-manipulation ${
              isSelected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 active:bg-gray-300 dark:active:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
