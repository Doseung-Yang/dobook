import type { QuestionAnswerItem, GameQuestion } from '@/types';
import { removeDuplicates } from './array';

export function convertToGameQuestion(
  item: QuestionAnswerItem,
  allItems: readonly QuestionAnswerItem[]
): GameQuestion {
  const wrongAnswers = allItems
    .filter((otherItem) => otherItem.id !== item.id)
    .map((otherItem) => otherItem.answer)
    .slice(0, 3);

  const allChoices = [item.answer, ...wrongAnswers];
  const shuffledChoices = shuffleArray([...allChoices]);
  const correctAnswerIndex = shuffledChoices.findIndex((choice) => choice === item.answer);

  return {
    ...item,
    choices: shuffledChoices,
    correctAnswerIndex,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

export function generateGameQuestions(
  items: readonly QuestionAnswerItem[],
  count: number
): GameQuestion[] {
  const shuffled = shuffleArray([...items]);
  const selected = shuffled.slice(0, Math.min(count, items.length));
  return selected.map((item) => convertToGameQuestion(item, items));
}
