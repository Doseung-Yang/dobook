export type CategoryType = 'cs-knowledge' | 'assignment' | 'os';

export interface QuestionAnswerItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly categoryType: CategoryType;
  readonly tags: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface GameQuestion extends QuestionAnswerItem {
  readonly choices: readonly string[];
  readonly correctAnswerIndex: number;
}

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon?: string;
}

export interface HandbookConfig {
  readonly title: string;
  readonly description: string;
  readonly categories: readonly Category[];
  readonly items: readonly QuestionAnswerItem[];
}

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface ResponsiveConfig {
  readonly mobile: number;
  readonly tablet: number;
  readonly desktop: number;
}

export type ComponentSize = 'small' | 'medium' | 'large';

export type ComponentVariant = 'primary' | 'secondary' | 'tertiary';

export type ViewMode = 'study' | 'game';

export interface GameStats {
  readonly totalQuestions: number;
  readonly correctAnswers: number;
  readonly wrongAnswers: number;
  readonly currentStreak: number;
}
