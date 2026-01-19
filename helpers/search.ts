import type { QuestionAnswerItem } from '@/types';
import { SEARCH } from '@/constants';
import { isValidString } from '@/utils/validation';

export function isItemMatchingQuery(item: QuestionAnswerItem, query: string): boolean {
  if (!isValidString(query) || query.length < SEARCH.minQueryLength) {
    return false;
  }

  const normalizedQuery = query.toLowerCase().trim();
  const searchableText = `${item.question} ${item.answer} ${item.categoryType} ${item.tags.join(' ')}`.toLowerCase();

  return searchableText.includes(normalizedQuery);
}

export function filterItemsByQuery(
  items: readonly QuestionAnswerItem[],
  query: string
): QuestionAnswerItem[] {
  if (!isValidString(query) || query.length < SEARCH.minQueryLength) {
    return [];
  }

  const filtered = items.filter((item) => isItemMatchingQuery(item, query));
  return filtered.slice(0, SEARCH.maxResults);
}
