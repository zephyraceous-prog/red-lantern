
export interface Level {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: string;
  units: Unit[];
  requirements: LevelRequirement[];
}

export interface Unit {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  lessons: UnitLesson[];
  unlocked: boolean;
  completed: boolean;
  progress: number;
  xpReward: number;
  estimatedTime: number; // in minutes
}

export interface UnitLesson {
  id: string;
  title: string;
  chineseTitle: string;
  type: 'vocabulary' | 'grammar' | 'conversation' | 'listening' | 'reading' | 'writing';
  difficulty: 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'expert';
  xpReward: number;
  duration: number;
  completed: boolean;
  locked: boolean;
  score?: number;
}

export interface LevelRequirement {
  type: 'lessons_completed' | 'conversations_completed' | 'vocabulary_learned' | 'streak_days' | 'accuracy_rate';
  target: number;
  current: number;
  description: string;
}

export interface UserLevelProgress {
  currentLevel: string;
  currentXP: number;
  totalXP: number;
  unitsCompleted: number;
  lessonsCompleted: number;
  vocabularyLearned: number;
  conversationsCompleted: number;
  streakDays: number;
  averageAccuracy: number;
  timeSpent: number; // in minutes
  placementTestTaken: boolean;
  placementLevel?: string;
}

export interface PlacementTest {
  id: string;
  questions: PlacementQuestion[];
  timeLimit: number; // in minutes
  description: string;
}

export interface PlacementQuestion {
  id: string;
  type: 'multiple_choice' | 'translation' | 'listening' | 'reading_comprehension';
  question: string;
  chinese?: string;
  pinyin?: string;
  audio?: string;
  choices: string[];
  correctAnswer: number;
  level: string;
  points: number;
}
