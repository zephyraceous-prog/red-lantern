
import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { Button } from "@/components/button";

interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  lessonsCompleted: number;
  conversationsCompleted: number;
}

interface LessonCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  locked: boolean;
}

export default function HomeScreen() {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    xp: 150,
    streak: 3,
    lessonsCompleted: 5,
    conversationsCompleted: 2,
  });

  const lessonCategories: LessonCategory[] = [
    {
      id: 'basics',
      title: '基础对话',
      description: 'Basic Conversations',
      icon: 'message.circle',
      color: colors.primary,
      progress: 60,
      locked: false,
    },
    {
      id: 'greetings',
      title: '问候语',
      description: 'Greetings & Introductions',
      icon: 'hand.wave',
      color: colors.secondary,
      progress: 80,
      locked: false,
    },
    {
      id: 'shopping',
      title: '购物',
      description: 'Shopping & Markets',
      icon: 'bag',
      color: colors.accent,
      progress: 30,
      locked: false,
    },
    {
      id: 'restaurant',
      title: '餐厅',
      description: 'Restaurant & Food',
      icon: 'fork.knife',
      color: colors.success,
      progress: 0,
      locked: true,
    },
    {
      id: 'travel',
      title: '旅行',
      description: 'Travel & Transportation',
      icon: 'airplane',
      color: colors.error,
      progress: 0,
      locked: true,
    },
  ];

  const renderProgressCard = () => (
    <View style={[commonStyles.progressCard, styles.progressCard]}>
      <View style={styles.progressHeader}>
        <View>
          <Text style={styles.levelText}>Level {userProgress.level}</Text>
          <Text style={styles.xpText}>{userProgress.xp} XP</Text>
        </View>
        <View style={styles.streakContainer}>
          <IconSymbol name="flame" color={colors.primary} size={24} />
          <Text style={styles.streakText}>{userProgress.streak} day streak</Text>
        </View>
      </View>
      
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(userProgress.xp % 200) / 2}%` }]} />
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProgress.lessonsCompleted}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProgress.conversationsCompleted}</Text>
          <Text style={styles.statLabel}>Conversations</Text>
        </View>
      </View>
    </View>
  );

  const renderLessonCategory = (category: LessonCategory) => (
    <Pressable
      key={category.id}
      style={[
        styles.categoryCard,
        { opacity: category.locked ? 0.6 : 1 }
      ]}
      onPress={() => {
        if (!category.locked) {
          console.log(`Opening category: ${category.id}`);
          router.push(`/lessons/${category.id}`);
        }
      }}
      disabled={category.locked}
    >
      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
        <IconSymbol name={category.icon as any} color="white" size={28} />
      </View>
      
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.categoryProgress, { width: `${category.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{category.progress}%</Text>
        </View>
      </View>
      
      {category.locked && (
        <View style={styles.lockIcon}>
          <IconSymbol name="lock" color={colors.textLight} size={20} />
        </View>
      )}
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        console.log("Opening profile");
        router.push('/profile');
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="person.circle" color={colors.primary} size={28} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        console.log("Opening settings");
        router.push('/settings');
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="gear" color={colors.primary} size={28} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "ChineseChat",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderProgressCard()}
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose Your Adventure</Text>
          <Text style={styles.sectionSubtitle}>Practice real conversations in Chinese</Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          {lessonCategories.map(renderLessonCategory)}
        </View>
        
        <View style={styles.quickActionsContainer}>
          <Button
            variant="primary"
            onPress={() => {
              console.log("Starting daily challenge");
              router.push('/daily-challenge');
            }}
            style={styles.actionButton}
          >
            🎯 Daily Challenge
          </Button>
          
          <Button
            variant="outline"
            onPress={() => {
              console.log("Opening conversation practice");
              router.push('/conversation-practice');
            }}
            style={styles.actionButton}
          >
            💬 Free Conversation
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressCard: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  xpText: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 3,
    marginRight: 12,
  },
  categoryProgress: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
    minWidth: 35,
  },
  lockIcon: {
    marginLeft: 12,
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  headerButton: {
    padding: 8,
  },
});
