
import React, { useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { Button } from "@/components/button";

interface Lesson {
  id: string;
  title: string;
  chineseTitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  completed: boolean;
  locked: boolean;
  xpReward: number;
}

const lessonData: Record<string, Lesson[]> = {
  basics: [
    {
      id: 'hello-world',
      title: 'Hello World',
      chineseTitle: '你好世界',
      description: 'Learn basic greetings and introductions',
      difficulty: 'beginner',
      duration: 10,
      completed: true,
      locked: false,
      xpReward: 20,
    },
    {
      id: 'numbers',
      title: 'Numbers 1-10',
      chineseTitle: '数字一到十',
      description: 'Master counting from 1 to 10',
      difficulty: 'beginner',
      duration: 15,
      completed: true,
      locked: false,
      xpReward: 25,
    },
    {
      id: 'family',
      title: 'Family Members',
      chineseTitle: '家庭成员',
      description: 'Talk about your family',
      difficulty: 'beginner',
      duration: 20,
      completed: false,
      locked: false,
      xpReward: 30,
    },
    {
      id: 'colors',
      title: 'Colors',
      chineseTitle: '颜色',
      description: 'Describe things with colors',
      difficulty: 'intermediate',
      duration: 18,
      completed: false,
      locked: true,
      xpReward: 35,
    },
  ],
  greetings: [
    {
      id: 'morning-greetings',
      title: 'Morning Greetings',
      chineseTitle: '早上问候',
      description: 'Start your day with proper greetings',
      difficulty: 'beginner',
      duration: 12,
      completed: true,
      locked: false,
      xpReward: 20,
    },
    {
      id: 'formal-introductions',
      title: 'Formal Introductions',
      chineseTitle: '正式介绍',
      description: 'Professional and formal settings',
      difficulty: 'intermediate',
      duration: 25,
      completed: false,
      locked: false,
      xpReward: 40,
    },
  ],
  shopping: [
    {
      id: 'market-basics',
      title: 'At the Market',
      chineseTitle: '在市场',
      description: 'Buy fruits and vegetables',
      difficulty: 'intermediate',
      duration: 30,
      completed: false,
      locked: false,
      xpReward: 45,
    },
  ],
};

const categoryTitles: Record<string, { title: string; chinese: string }> = {
  basics: { title: 'Basic Conversations', chinese: '基础对话' },
  greetings: { title: 'Greetings & Introductions', chinese: '问候语' },
  shopping: { title: 'Shopping & Markets', chinese: '购物' },
  restaurant: { title: 'Restaurant & Food', chinese: '餐厅' },
  travel: { title: 'Travel & Transportation', chinese: '旅行' },
};

export default function LessonCategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const lessons = lessonData[category] || [];
  const categoryInfo = categoryTitles[category] || { title: 'Lessons', chinese: '课程' };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.success;
      case 'intermediate': return colors.secondary;
      case 'advanced': return colors.error;
      default: return colors.textLight;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'star';
      case 'intermediate': return 'star.fill';
      case 'advanced': return 'flame';
      default: return 'star';
    }
  };

  const renderLesson = (lesson: Lesson, index: number) => (
    <Pressable
      key={lesson.id}
      style={[
        styles.lessonCard,
        { opacity: lesson.locked ? 0.6 : 1 },
        lesson.completed && styles.completedCard,
      ]}
      onPress={() => {
        if (!lesson.locked) {
          console.log(`Starting lesson: ${lesson.id}`);
          router.push(`/lesson/${lesson.id}`);
        }
      }}
      disabled={lesson.locked}
    >
      <View style={styles.lessonHeader}>
        <View style={styles.lessonNumber}>
          <Text style={styles.lessonNumberText}>{index + 1}</Text>
        </View>
        
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonChineseTitle}>{lesson.chineseTitle}</Text>
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
        </View>
        
        <View style={styles.lessonMeta}>
          {lesson.completed ? (
            <View style={styles.completedBadge}>
              <IconSymbol name="checkmark.circle.fill" color={colors.success} size={24} />
            </View>
          ) : lesson.locked ? (
            <IconSymbol name="lock" color={colors.textLight} size={20} />
          ) : (
            <IconSymbol name="play.circle" color={colors.primary} size={24} />
          )}
        </View>
      </View>
      
      <View style={styles.lessonFooter}>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(lesson.difficulty) + '20' }]}>
          <IconSymbol 
            name={getDifficultyIcon(lesson.difficulty) as any} 
            color={getDifficultyColor(lesson.difficulty)} 
            size={12} 
          />
          <Text style={[styles.difficultyText, { color: getDifficultyColor(lesson.difficulty) }]}>
            {lesson.difficulty}
          </Text>
        </View>
        
        <View style={styles.lessonStats}>
          <View style={styles.statItem}>
            <IconSymbol name="clock" color={colors.textLight} size={14} />
            <Text style={styles.statText}>{lesson.duration}min</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="star" color={colors.accent} size={14} />
            <Text style={styles.statText}>{lesson.xpReward} XP</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: categoryInfo.title,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.categoryTitle}>{categoryInfo.chinese}</Text>
          <Text style={styles.categorySubtitle}>{categoryInfo.title}</Text>
          <Text style={styles.categoryDescription}>
            Master real-world conversations through interactive lessons
          </Text>
        </View>
        
        <View style={styles.lessonsContainer}>
          {lessons.map(renderLesson)}
        </View>
        
        {lessons.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="book" color={colors.textLight} size={48} />
            <Text style={styles.emptyTitle}>Coming Soon!</Text>
            <Text style={styles.emptyDescription}>
              New lessons are being prepared for this category.
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 16,
  },
  categoryTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.chinese,
    textAlign: 'center',
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  categoryDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  lessonsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  lessonCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  completedCard: {
    borderWidth: 2,
    borderColor: colors.success + '40',
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  lessonChineseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.chinese,
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  lessonMeta: {
    marginLeft: 12,
  },
  completedBadge: {
    alignItems: 'center',
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  lessonStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
});
