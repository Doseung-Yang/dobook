import { memo } from 'react';
import type { ViewMode } from '@/types';

interface ModeToggleProps {
  readonly currentMode: ViewMode;
  readonly onModeChange: (mode: ViewMode) => void;
}

function ModeToggleComponent({ currentMode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 mb-4 md:mb-6">
      <button
        onClick={() => onModeChange('study')}
        className={`flex-1 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base rounded-md font-medium transition-colors touch-manipulation ${
          currentMode === 'study'
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 active:text-gray-900 dark:active:text-gray-200'
        }`}
      >
        학습 모드
      </button>
      <button
        onClick={() => onModeChange('game')}
        className={`flex-1 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base rounded-md font-medium transition-colors touch-manipulation ${
          currentMode === 'game'
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 active:text-gray-900 dark:active:text-gray-200'
        }`}
      >
        게임 모드
      </button>
    </div>
  );
}

export const ModeToggle = memo(ModeToggleComponent);
