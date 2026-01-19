import { useState, useCallback } from 'react';
import type { GameQuestion, QuestionAnswerItem, GameStats } from '@/types';
import { generateGameQuestions } from '@/utils/game';
import { Card } from '@/components/ui/Card';

interface GameModeProps {
  readonly items: readonly QuestionAnswerItem[];
  readonly onBack: () => void;
}

interface GameState {
  readonly questions: GameQuestion[];
  readonly currentQuestionIndex: number;
  readonly selectedAnswerIndex: number | null;
  readonly stats: GameStats;
  readonly showResult: boolean;
}

function createInitialGameState(items: readonly QuestionAnswerItem[]): GameState {
  if (items.length === 0) {
    return {
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswerIndex: null,
      stats: {
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        currentStreak: 0,
      },
      showResult: false,
    };
  }

  const questions = generateGameQuestions(items, 10);
  return {
    questions,
    currentQuestionIndex: 0,
    selectedAnswerIndex: null,
    stats: {
      totalQuestions: questions.length,
      correctAnswers: 0,
      wrongAnswers: 0,
      currentStreak: 0,
    },
    showResult: false,
  };
}

export function GameMode({ items, onBack }: GameModeProps) {
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState(items));

  const { questions: gameQuestions, currentQuestionIndex, selectedAnswerIndex, stats, showResult } = gameState;

  const handleAnswerSelect = useCallback(
    (answerIndex: number): void => {
      if (selectedAnswerIndex !== null || showResult) {
        return;
      }

      const currentQuestion = gameQuestions[currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctAnswerIndex;

      setGameState((prev) => ({
        ...prev,
        selectedAnswerIndex: answerIndex,
        showResult: true,
        stats: {
          ...prev.stats,
          correctAnswers: isCorrect ? prev.stats.correctAnswers + 1 : prev.stats.correctAnswers,
          wrongAnswers: isCorrect ? prev.stats.wrongAnswers : prev.stats.wrongAnswers + 1,
          currentStreak: isCorrect ? prev.stats.currentStreak + 1 : 0,
        },
      }));
    },
    [selectedAnswerIndex, showResult, gameQuestions, currentQuestionIndex]
  );

  const handleNextQuestion = useCallback((): void => {
    if (currentQuestionIndex < gameQuestions.length - 1) {
      setGameState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswerIndex: null,
        showResult: false,
      }));
    }
  }, [currentQuestionIndex, gameQuestions.length]);

  const handleRestart = useCallback((): void => {
    setGameState(createInitialGameState(items));
  }, [items]);

  if (gameQuestions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        게임을 시작할 질문이 없습니다.
      </div>
    );
  }

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === gameQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / gameQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <button
          onClick={onBack}
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 active:text-gray-900 dark:active:text-gray-200 touch-manipulation"
        >
          ← 뒤로가기
        </button>
        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          {currentQuestionIndex + 1} / {gameQuestions.length}
        </div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-4 md:mb-6 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
        <div className="px-2 md:px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
          정답: {stats.correctAnswers}
        </div>
        <div className="px-2 md:px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
          오답: {stats.wrongAnswers}
        </div>
        <div className="px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
          연속 정답: {stats.currentStreak}
        </div>
      </div>

      <Card className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-2 md:space-y-3">
          {currentQuestion.choices.map((choice, index) => {
            const isSelected = selectedAnswerIndex === index;
            const isCorrect = index === currentQuestion.correctAnswerIndex;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            let buttonClasses =
              'w-full text-left px-3 md:px-4 py-3 md:py-3.5 text-sm md:text-base rounded-lg font-medium transition-all border-2 touch-manipulation ';
            if (showResult) {
              if (showCorrect) {
                buttonClasses += 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200';
              } else if (showWrong) {
                buttonClasses += 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200';
              } else {
                buttonClasses += 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400';
              }
            } else {
              buttonClasses +=
                'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 active:border-blue-500 active:bg-blue-50 dark:active:bg-blue-900';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={buttonClasses}
              >
                <div className="flex items-center justify-between">
                  <span>{choice}</span>
                  {showCorrect && <span className="text-green-600 dark:text-green-400">✓</span>}
                  {showWrong && <span className="text-red-600 dark:text-red-400">✗</span>}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {showResult && (
        <div className="flex gap-3">
          {!isLastQuestion ? (
            <button
              onClick={handleNextQuestion}
              className="flex-1 px-4 md:px-6 py-3 md:py-3.5 text-sm md:text-base bg-blue-600 text-white rounded-lg font-medium active:bg-blue-700 transition-colors touch-manipulation"
            >
              다음 문제
            </button>
          ) : (
            <div className="flex-1 space-y-3">
              <Card className="text-center">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  게임 종료!
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
                  정답률: {Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%
                </p>
                <button
                  onClick={handleRestart}
                  className="px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base bg-blue-600 text-white rounded-lg font-medium active:bg-blue-700 transition-colors touch-manipulation"
                >
                  다시 시작
                </button>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
