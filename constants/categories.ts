import type { CategoryType, Category } from '@/types';

export const CATEGORY_TYPES: Record<CategoryType, Category> = {
  'cs-knowledge': {
    id: 'cs-knowledge',
    name: 'CS 지식',
    description: '컴퓨터 과학 기초 지식',
  },
  os: {
    id: 'os',
    name: 'OS',
    description: '운영체제 및 시스템',
  },
  assignment: {
    id: 'assignment',
    name: '과제 풀이',
    description: '과제 해결 방법과 풀이',
  },
  front: {
    id: 'front',
    name: 'Front',
    description: '프론트엔드 렌더링과 아키텍처',
  },
} as const;

export const CATEGORY_ORDER: readonly CategoryType[] = ['cs-knowledge', 'os', 'assignment', 'front'] as const;
