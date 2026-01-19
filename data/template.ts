import type { QuestionAnswerItem } from '@/types';

export const templateItems: readonly QuestionAnswerItem[] = [
  {
    id: 'template-1',
    question: '질문을 입력하세요',
    answer: '답변을 입력하세요',
    categoryType: 'cs-knowledge',
    tags: ['태그1', '태그2'],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  },
] as const;
