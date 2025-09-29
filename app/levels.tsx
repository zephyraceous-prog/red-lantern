
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';
import { LEVELS, getCurrentLevel, getNextLevel } from '@/data/levelSystem';
import { Level, UserLevelProgress } from '@/types/levelSystem';

export default function LevelsScreen() {
  const [userProgress, setUserProgress] = useState<UserLevelProgress>({
    currentLevel: 'beginner',
    currentXP: 150,
    totalXP: 150,
    unitsCompleted: 0,
    lessonsCompleted: 5,
    vocabularyLearned: 25,
    conversationsCompleted: 2,
    streakDays: 3,
    averageAccuracy: 85,
    timeSpent: 120,
    placementTestTaken: false,
  });

  const currentLevel = getCurrentLevel(userProgress.currentXP);
  const nextLevel = getNextLevel(currentLevel.id);

  const renderLevelProgress = () => {
    const progressPercentage = ((userProgress.currentXP - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100;
    
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <View style={styles.currentLevelBadge}>
            <IconSymbol name={currentLevel.icon as any} color="white" size={24} />
            <Text style={styles.currentLevelText}>{currentLevel.name}</Text>
            <Text style={styles.currentLevelChinese}>{currentLevel.chineseName}</Text>
          </View>
          
          <View style={styles.xpContainer}>
            <Text style={styles.xpText}>{userProgress.currentXP} XP</Text>
            <Text style={styles.xpSubtext}>
              {nextLevel ? `${nextLevel.minXP - userProgress.currentXP} XP to ${nextLevel.name}` : 'Max Level!'}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
        
        <Text style={styles.progressDescription}>{currentLevel.description}</Text>
      </View>
    );
  };

  const renderLevelRequirements = () => (
    <View style={styles.requirementsContainer}>
      <Text style={styles.sectionTitle}>Level Requirements</Text>
      <Text style={styles.sectionSubtitle}>Complete these to unlock the next level</Text>
      
      {currentLevel.requirements.map((requirement, index) => {
        const progress = Math.min((requirement.current / requirement.target) * 100, 100);
        const isCompleted = requirement.current >= requirement.target;
        
        return (
          <View key={index} style={styles.requirementItem}>
            <View style={styles.requirementHeader}>
              <IconSymbol 
                name={isCompleted ? "checkmark.circle.fill" : "circle"} 
                color={isCompleted ? colors.success : colors.textLight} 
                size={20} 
              />
              <Text style={[styles.requirementText, isCompleted && styles.completedText]}>
                {requirement.description}
              </Text>
            </View>
            
            <View style={styles.requirementProgress}>
              <View style={styles.requirementProgressBar}>
                <View style={[styles.requirementProgressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.requirementProgressText}>
                {requirement.current}/{requirement.target}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderLevelPath = () => (
    <View style={styles.levelPathContainer}>
      <Text style={styles.sectionTitle}>Your Learning Path</Text>
      <Text style={styles.sectionSubtitle}>Progress through structured levels</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelPathScroll}>
        {LEVELS.map((level, index) => {
          const isCurrentLevel = level.id === currentLevel.id;
          const isCompleted = userProgress.currentXP >= level.maxXP;
          const isLocked = userProgress.currentXP < level.minXP;
          
          return (
            <Pressable
              key={level.id}
              style={[
                styles.levelPathItem,
                { backgroundColor: level.color + '20' },
                isCurrentLevel && styles.currentLevelPathItem,
                isLocked && styles.lockedLevelPathItem,
              ]}
              onPress={() => {
                if (!isLocked) {
                  console.log(`Opening level: ${level.id}`);
                  router.push(`/level/${level.id}`);
                }
              }}
              disabled={isLocked}
            >
              <View style={[styles.levelPathIcon, { backgroundColor: level.color }]}>
                <IconSymbol 
                  name={isCompleted ? "checkmark" : level.icon as any} 
                  color="white" 
                  size={20} 
                />
              </View>
              
              <Text style={[styles.levelPathName, isLocked && styles.lockedText]}>
                {level.name}
              </Text>
              <Text style={[styles.levelPathChinese, isLocked && styles.lockedText]}>
                {level.chineseName}
              </Text>
              
              <Text style={[styles.levelPathXP, isLocked && styles.lockedText]}>
                {level.minXP}-{level.maxXP} XP
              </Text>
              
              {isLocked && (
                <View style={styles.lockOverlay}>
                  <IconSymbol name="lock" color={colors.textLight} size={16} />
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderPlacementTest = () => {
    if (userProgress.placementTestTaken) return null;
    
    return (
      <View style={styles.placementTestContainer}>
        <View style={styles.placementTestIcon}>
          <IconSymbol name="graduationcap" color={colors.primary} size={32} />
        </View>
        
        <Text style={styles.placementTestTitle}>Take Placement Test</Text>
        <Text style={styles.placementTestDescription}>
          Not sure where to start? Take our placement test to find your perfect starting level.
        </Text>
        
        <Button
          variant="primary"
          onPress={() => {
            console.log('Starting placement test');
            router.push('/placement-test');
          }}
          style={styles.placementTestButton}
        >
          Start Placement Test
        </Button>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Learning Levels",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderLevelProgress()}
        {renderPlacementTest()}
        {renderLevelRequirements()}
        {renderLevelPath()}
        
        <View style={styles.actionsContainer}>
          <Button
            variant="primary"
            onPress={() => {
              console.log('Continue learning');
              router.push('/');
            }}
            style={styles.actionButton}
          >
            Continue Learning
          </Button>
          
          <Button
            variant="outline"
            onPress={() => {
              console.log('View detailed progress');
              router.push('/profile');
            }}
            style={styles.actionButton}
          >
            View Detailed Progress
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
  progressContainer: {
    margin: 16,
    padding: 24,
    backgroundColor: colors.card,
    borderRadius: 20,
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
    elevation: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentLevelBadge: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    minWidth: 120,
  },
  currentLevelText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginTop: 8,
  },
  currentLevelChinese: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginTop: 4,
  },
  xpContainer: {
    alignItems: 'flex-end',
  },
  xpText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  xpSubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 6,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  progressDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
  },
  requirementsContainer: {
    margin: 16,
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  requirementItem: {
    marginBottom: 16,
  },
  requirementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  completedText: {
    color: colors.success,
    textDecorationLine: 'line-through',
  },
  requirementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 3,
    marginRight: 12,
  },
  requirementProgressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  requirementProgressText: {
    fontSize: 12,
    color: colors.textLight,
    minWidth: 40,
  },
  levelPathContainer: {
    margin: 16,
    marginTop: 0,
  },
  levelPathScroll: {
    paddingVertical: 8,
  },
  levelPathItem: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    position: 'relative',
  },
  currentLevelPathItem: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  lockedLevelPathItem: {
    opacity: 0.6,
  },
  levelPathIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelPathName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  levelPathChinese: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.chinese,
    textAlign: 'center',
    marginBottom: 8,
  },
  levelPathXP: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  lockedText: {
    color: colors.textLight,
  },
  lockOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 4,
  },
  placementTestContainer: {
    margin: 16,
    padding: 24,
    backgroundColor: colors.card,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '30',
    borderStyle: 'dashed',
  },
  placementTestIcon: {
    marginBottom: 16,
  },
  placementTestTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  placementTestDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  placementTestButton: {
    minWidth: 200,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
});
