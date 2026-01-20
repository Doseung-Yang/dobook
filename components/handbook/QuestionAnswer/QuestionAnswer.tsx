import { memo, useRef, useCallback } from 'react';
import type { QuestionAnswerItem } from '@/types';
import { Card } from '@/components/ui/Card';
import { CATEGORY_TYPES } from '@/constants/categories';
import { formatAnswerText } from '@/utils/formatAnswer';

interface QuestionAnswerProps {
  readonly item: QuestionAnswerItem;
  readonly isExpanded?: boolean;
  readonly onToggleItem?: (itemId: string) => void;
}

function QuestionAnswerComponent({
  item,
  isExpanded = false,
  onToggleItem,
}: QuestionAnswerProps) {
  const mouseDownRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = useCallback((event: React.MouseEvent): void => {
    mouseDownRef.current = { x: event.clientX, y: event.clientY };
  }, []);

  const handleClick = useCallback((event: React.MouseEvent): void => {
    if (!onToggleItem) {
      return;
    }

    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }

    if (mouseDownRef.current) {
      const deltaX = Math.abs(event.clientX - mouseDownRef.current.x);
      const deltaY = Math.abs(event.clientY - mouseDownRef.current.y);
      
      if (deltaX > 5 || deltaY > 5) {
        return;
      }
    }

    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }

    onToggleItem(item.id);
  }, [onToggleItem, item.id]);

  return (
    <Card
      isInteractive={true}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className="mb-4"
    >
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 flex-1 leading-snug">
            {item.question}
          </h3>
          <button
            onClick={onToggleItem ? () => onToggleItem(item.id) : undefined}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 touch-manipulation"
            aria-label={isExpanded ? '답변 접기' : '답변 펼치기'}
            aria-expanded={isExpanded}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {isExpanded && (
          <div className="pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2.5 md:space-y-3">
              {formatAnswerText(item.answer).map((segment, index) => {
                if (segment.type === 'list' && segment.items) {
                  return (
                    <ul
                      key={index}
                      className="space-y-1.5 md:space-y-2 pl-5 md:pl-6 list-disc list-outside marker:text-gray-400 dark:marker:text-gray-500"
                    >
                      {segment.items.map((listItem, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed pl-2"
                        >
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed md:leading-relaxed whitespace-pre-line"
                  >
                    {segment.content}
                  </p>
                );
              })}
            </div>
            <div className="mt-4 md:mt-5 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md">
                {CATEGORY_TYPES[item.categoryType].name}
              </span>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export const QuestionAnswer = memo(QuestionAnswerComponent);
