
import { Level, PlacementTest, PlacementQuestion } from '@/types/levelSystem';
import { colors } from '@/styles/commonStyles';

export const LEVELS: Level[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    chineseName: '初学者',
    description: 'Start your Chinese journey with basic words and phrases',
    minXP: 0,
    maxXP: 1000,
    color: colors.success,
    icon: 'star',
    units: [
      {
        id: 'basics-1',
        name: 'First Steps',
        chineseName: '第一步',
        description: 'Essential greetings and introductions',
        lessons: [
          {
            id: 'hello-world',
            title: 'Hello World',
            chineseTitle: '你好世界',
            type: 'vocabulary',
            difficulty: 'beginner',
            xpReward: 20,
            duration: 10,
            completed: false,
            locked: false,
          },
          {
            id: 'numbers-1-10',
            title: 'Numbers 1-10',
            chineseTitle: '数字一到十',
            type: 'vocabulary',
            difficulty: 'beginner',
            xpReward: 25,
            duration: 15,
            completed: false,
            locked: false,
          },
        ],
        unlocked: true,
        completed: false,
        progress: 0,
        xpReward: 100,
        estimatedTime: 60,
      },
      {
        id: 'basics-2',
        name: 'Family & Friends',
        chineseName: '家人和朋友',
        description: 'Talk about people in your life',
        lessons: [
          {
            id: 'family-members',
            title: 'Family Members',
            chineseTitle: '家庭成员',
            type: 'vocabulary',
            difficulty: 'beginner',
            xpReward: 30,
            duration: 20,
            completed: false,
            locked: true,
          },
          {
            id: 'describing-people',
            title: 'Describing People',
            chineseTitle: '描述人物',
            type: 'grammar',
            difficulty: 'beginner',
            xpReward: 35,
            duration: 25,
            completed: false,
            locked: true,
          },
        ],
        unlocked: false,
        completed: false,
        progress: 0,
        xpReward: 150,
        estimatedTime: 90,
      },
    ],
    requirements: [
      {
        type: 'lessons_completed',
        target: 10,
        current: 0,
        description: 'Complete 10 lessons',
      },
      {
        type: 'vocabulary_learned',
        target: 50,
        current: 0,
        description: 'Learn 50 new words',
      },
    ],
  },
  {
    id: 'elementary',
    name: 'Elementary',
    chineseName: '初级',
    description: 'Build foundation with everyday conversations',
    minXP: 1000,
    maxXP: 3000,
    color: colors.secondary,
    icon: 'book',
    units: [
      {
        id: 'daily-life-1',
        name: 'Daily Routines',
        chineseName: '日常生活',
        description: 'Talk about your daily activities',
        lessons: [
          {
            id: 'morning-routine',
            title: 'Morning Routine',
            chineseTitle: '早晨例行公事',
            type: 'conversation',
            difficulty: 'elementary',
            xpReward: 40,
            duration: 30,
            completed: false,
            locked: true,
          },
        ],
        unlocked: false,
        completed: false,
        progress: 0,
        xpReward: 200,
        estimatedTime: 120,
      },
    ],
    requirements: [
      {
        type: 'lessons_completed',
        target: 25,
        current: 0,
        description: 'Complete 25 lessons',
      },
      {
        type: 'conversations_completed',
        target: 10,
        current: 0,
        description: 'Complete 10 conversations',
      },
      {
        type: 'vocabulary_learned',
        target: 150,
        current: 0,
        description: 'Learn 150 new words',
      },
    ],
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    chineseName: '中级',
    description: 'Express complex ideas and opinions',
    minXP: 3000,
    maxXP: 6000,
    color: colors.primary,
    icon: 'message',
    units: [
      {
        id: 'complex-conversations',
        name: 'Complex Conversations',
        chineseName: '复杂对话',
        description: 'Discuss abstract topics and express opinions',
        lessons: [
          {
            id: 'expressing-opinions',
            title: 'Expressing Opinions',
            chineseTitle: '表达意见',
            type: 'conversation',
            difficulty: 'intermediate',
            xpReward: 60,
            duration: 45,
            completed: false,
            locked: true,
          },
        ],
        unlocked: false,
        completed: false,
        progress: 0,
        xpReward: 300,
        estimatedTime: 180,
      },
    ],
    requirements: [
      {
        type: 'lessons_completed',
        target: 50,
        current: 0,
        description: 'Complete 50 lessons',
      },
      {
        type: 'conversations_completed',
        target: 25,
        current: 0,
        description: 'Complete 25 conversations',
      },
      {
        type: 'vocabulary_learned',
        target: 400,
        current: 0,
        description: 'Learn 400 new words',
      },
      {
        type: 'accuracy_rate',
        target: 85,
        current: 0,
        description: 'Maintain 85% accuracy',
      },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    chineseName: '高级',
    description: 'Master nuanced communication and cultural contexts',
    minXP: 6000,
    maxXP: 10000,
    color: colors.accent,
    icon: 'brain',
    units: [
      {
        id: 'cultural-nuances',
        name: 'Cultural Nuances',
        chineseName: '文化细节',
        description: 'Understand cultural context and subtleties',
        lessons: [
          {
            id: 'business-etiquette',
            title: 'Business Etiquette',
            chineseTitle: '商务礼仪',
            type: 'conversation',
            difficulty: 'advanced',
            xpReward: 80,
            duration: 60,
            completed: false,
            locked: true,
          },
        ],
        unlocked: false,
        completed: false,
        progress: 0,
        xpReward: 400,
        estimatedTime: 240,
      },
    ],
    requirements: [
      {
        type: 'lessons_completed',
        target: 100,
        current: 0,
        description: 'Complete 100 lessons',
      },
      {
        type: 'conversations_completed',
        target: 50,
        current: 0,
        description: 'Complete 50 conversations',
      },
      {
        type: 'vocabulary_learned',
        target: 800,
        current: 0,
        description: 'Learn 800 new words',
      },
      {
        type: 'accuracy_rate',
        target: 90,
        current: 0,
        description: 'Maintain 90% accuracy',
      },
      {
        type: 'streak_days',
        target: 30,
        current: 0,
        description: 'Maintain 30-day streak',
      },
    ],
  },
  {
    id: 'expert',
    name: 'Expert',
    chineseName: '专家',
    description: 'Achieve near-native fluency and cultural mastery',
    minXP: 10000,
    maxXP: 15000,
    color: colors.error,
    icon: 'crown',
    units: [
      {
        id: 'native-fluency',
        name: 'Native Fluency',
        chineseName: '母语流利度',
        description: 'Master idioms, literature, and professional communication',
        lessons: [
          {
            id: 'chinese-literature',
            title: 'Chinese Literature',
            chineseTitle: '中国文学',
            type: 'reading',
            difficulty: 'expert',
            xpReward: 100,
            duration: 90,
            completed: false,
            locked: true,
          },
        ],
        unlocked: false,
        completed: false,
        progress: 0,
        xpReward: 500,
        estimatedTime: 360,
      },
    ],
    requirements: [
      {
        type: 'lessons_completed',
        target: 200,
        current: 0,
        description: 'Complete 200 lessons',
      },
      {
        type: 'conversations_completed',
        target: 100,
        current: 0,
        description: 'Complete 100 conversations',
      },
      {
        type: 'vocabulary_learned',
        target: 1500,
        current: 0,
        description: 'Learn 1500 new words',
      },
      {
        type: 'accuracy_rate',
        target: 95,
        current: 0,
        description: 'Maintain 95% accuracy',
      },
      {
        type: 'streak_days',
        target: 100,
        current: 0,
        description: 'Maintain 100-day streak',
      },
    ],
  },
];

export const PLACEMENT_TEST: PlacementTest = {
  id: 'chinese-placement-test',
  timeLimit: 30,
  description: 'This test will help us determine your current Chinese level and create a personalized learning path.',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      question: 'How do you say "Hello" in Chinese?',
      choices: ['你好', '再见', '谢谢', '对不起'],
      correctAnswer: 0,
      level: 'beginner',
      points: 10,
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      question: 'What does "谢谢" mean?',
      chinese: '谢谢',
      pinyin: 'xiè xie',
      choices: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
      correctAnswer: 2,
      level: 'beginner',
      points: 10,
    },
    {
      id: 'q3',
      type: 'translation',
      question: 'Translate: "I am a student"',
      choices: ['我是学生', '我是老师', '我是医生', '我是工人'],
      correctAnswer: 0,
      level: 'elementary',
      points: 20,
    },
    {
      id: 'q4',
      type: 'multiple_choice',
      question: 'Which sentence correctly expresses "I think Chinese is interesting"?',
      choices: [
        '我觉得中文很有趣',
        '我认为中文很难',
        '我喜欢中文很多',
        '我学习中文很好'
      ],
      correctAnswer: 0,
      level: 'intermediate',
      points: 30,
    },
    {
      id: 'q5',
      type: 'reading_comprehension',
      question: 'Read the passage and choose the best answer: "虽然学习中文很困难，但是我觉得很有意思。我每天都练习说中文。" What is the main idea?',
      chinese: '虽然学习中文很困难，但是我觉得很有意思。我每天都练习说中文。',
      choices: [
        'Chinese is too difficult to learn',
        'The person finds Chinese interesting despite its difficulty',
        'The person only studies Chinese occasionally',
        'Chinese is the easiest language to learn'
      ],
      correctAnswer: 1,
      level: 'advanced',
      points: 40,
    },
  ],
};

export function getCurrentLevel(xp: number): Level {
  return LEVELS.find(level => xp >= level.minXP && xp < level.maxXP) || LEVELS[0];
}

export function getNextLevel(currentLevel: string): Level | null {
  const currentIndex = LEVELS.findIndex(level => level.id === currentLevel);
  return currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;
}

export function calculatePlacementLevel(score: number): string {
  if (score >= 140) return 'advanced';
  if (score >= 100) return 'intermediate';
  if (score >= 60) return 'elementary';
  return 'beginner';
}
