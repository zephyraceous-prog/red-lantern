
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { Button } from "@/components/button";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

interface UserStats {
  totalXP: number;
  currentLevel: number;
  streak: number;
  lessonsCompleted: number;
  conversationsCompleted: number;
  timeSpent: number; // in minutes
  wordsLearned: number;
}

export default function ProfileScreen() {
  const [userStats] = useState<UserStats>({
    totalXP: 1250,
    currentLevel: 5,
    streak: 7,
    lessonsCompleted: 23,
    conversationsCompleted: 8,
    timeSpent: 180,
    wordsLearned: 156,
  });

  const achievements: Achievement[] = [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: 'star.fill',
      earned: true,
      earnedDate: new Date('2024-01-15'),
    },
    {
      id: 'week-streak',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: 'flame.fill',
      earned: true,
      earnedDate: new Date('2024-01-20'),
    },
    {
      id: 'conversation-master',
      title: 'Conversation Master',
      description: 'Complete 10 conversations',
      icon: 'message.fill',
      earned: false,
    },
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      description: 'Complete 5 lessons in one day',
      icon: 'bolt.fill',
      earned: false,
    },
    {
      id: 'vocabulary-builder',
      title: 'Vocabulary Builder',
      description: 'Learn 200 new words',
      icon: 'book.fill',
      earned: false,
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Get 100% on 10 lessons',
      icon: 'checkmark.seal.fill',
      earned: false,
    },
  ];

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarEmoji}>👤</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{userStats.currentLevel}</Text>
        </View>
      </View>
      
      <Text style={styles.userName}>Chinese Learner</Text>
      <Text style={styles.userTitle}>Intermediate Student</Text>
      
      <View style={styles.xpContainer}>
        <Text style={styles.xpText}>{userStats.totalXP} XP</Text>
        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: `${(userStats.totalXP % 500) / 5}%` }]} />
        </View>
        <Text style={styles.nextLevelText}>
          {500 - (userStats.totalXP % 500)} XP to level {userStats.currentLevel + 1}
        </Text>
      </View>
    </View>
  );

  const renderStatsGrid = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Your Progress</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <IconSymbol name="flame.fill" color={colors.primary} size={24} />
          <Text style={styles.statNumber}>{userStats.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        
        <View style={styles.statCard}>
          <IconSymbol name="book.fill" color={colors.secondary} size={24} />
          <Text style={styles.statNumber}>{userStats.lessonsCompleted}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        
        <View style={styles.statCard}>
          <IconSymbol name="message.fill" color={colors.success} size={24} />
          <Text style={styles.statNumber}>{userStats.conversationsCompleted}</Text>
          <Text style={styles.statLabel}>Conversations</Text>
        </View>
        
        <View style={styles.statCard}>
          <IconSymbol name="clock.fill" color={colors.accent} size={24} />
          <Text style={styles.statNumber}>{Math.floor(userStats.timeSpent / 60)}h {userStats.timeSpent % 60}m</Text>
          <Text style={styles.statLabel}>Time Spent</Text>
        </View>
        
        <View style={styles.statCard}>
          <IconSymbol name="textformat.abc" color={colors.chinese} size={24} />
          <Text style={styles.statNumber}>{userStats.wordsLearned}</Text>
          <Text style={styles.statLabel}>Words Learned</Text>
        </View>
        
        <View style={styles.statCard}>
          <IconSymbol name="trophy.fill" color={colors.primary} size={24} />
          <Text style={styles.statNumber}>{achievements.filter(a => a.earned).length}</Text>
          <Text style={styles.statLabel}>Achievements</Text>
        </View>
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
        {achievements.map((achievement) => (
          <View
            key={achievement.id}
            style={[
              styles.achievementCard,
              { opacity: achievement.earned ? 1 : 0.5 }
            ]}
          >
            <View style={[
              styles.achievementIcon,
              { backgroundColor: achievement.earned ? colors.primary : colors.backgroundAlt }
            ]}>
              <IconSymbol 
                name={achievement.icon as any} 
                color={achievement.earned ? 'white' : colors.textLight} 
                size={24} 
              />
            </View>
            
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
            
            {achievement.earned && achievement.earnedDate && (
              <Text style={styles.achievementDate}>
                {achievement.earnedDate.toLocaleDateString()}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.settingsContainer}>
      <Text style={styles.sectionTitle}>Settings</Text>
      
      <Pressable style={styles.settingItem} onPress={() => console.log('Notifications')}>
        <IconSymbol name="bell" color={colors.textLight} size={20} />
        <Text style={styles.settingText}>Notifications</Text>
        <IconSymbol name="chevron.right" color={colors.textLight} size={16} />
      </Pressable>
      
      <Pressable style={styles.settingItem} onPress={() => console.log('Language')}>
        <IconSymbol name="globe" color={colors.textLight} size={20} />
        <Text style={styles.settingText}>Language</Text>
        <IconSymbol name="chevron.right" color={colors.textLight} size={16} />
      </Pressable>
      
      <Pressable style={styles.settingItem} onPress={() => console.log('Privacy')}>
        <IconSymbol name="lock" color={colors.textLight} size={20} />
        <Text style={styles.settingText}>Privacy</Text>
        <IconSymbol name="chevron.right" color={colors.textLight} size={16} />
      </Pressable>
      
      <Pressable style={styles.settingItem} onPress={() => console.log('Help')}>
        <IconSymbol name="questionmark.circle" color={colors.textLight} size={20} />
        <Text style={styles.settingText}>Help & Support</Text>
        <IconSymbol name="chevron.right" color={colors.textLight} size={16} />
      </Pressable>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        {renderStatsGrid()}
        {renderAchievements()}
        {renderSettings()}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarEmoji: {
    fontSize: 80,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 24,
  },
  xpContainer: {
    width: '100%',
    alignItems: 'center',
  },
  xpText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  xpBar: {
    width: '80%',
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    marginBottom: 8,
  },
  xpFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  nextLevelText: {
    fontSize: 14,
    color: colors.textLight,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  achievementsContainer: {
    paddingLeft: 20,
    marginBottom: 32,
  },
  achievementsScroll: {
    paddingRight: 20,
  },
  achievementCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 140,
    marginRight: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 8,
  },
  achievementDate: {
    fontSize: 10,
    color: colors.textLight,
    textAlign: 'center',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
});
