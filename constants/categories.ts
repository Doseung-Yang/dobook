import type { CategoryType, Category } from '@/types';

export const CATEGORY_TYPES: Record<CategoryType, Category> = {
  'cs-knowledge': {
    id: 'cs-knowledge',
    name: 'CS 지식',
    description: '컴퓨터 과학 기초 지식',
  },
  assignment: {
    id: 'assignment',
    name: '과제 풀이',
    description: '과제 해결 방법과 풀이',
  },
} as const;

export const CATEGORY_ORDER: readonly CategoryType[] = ['cs-knowledge', 'assignment'] as const;
