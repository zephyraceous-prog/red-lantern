
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';
import { LEVELS } from '@/data/levelSystem';
import { Level, Unit } from '@/types/levelSystem';

export default function LevelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const level = LEVELS.find(l => l.id === id);
  
  if (!level) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Level not found</Text>
        <Button variant="outline" onPress={() => router.back()}>
          Go Back
        </Button>
      </View>
    );
  }

  const renderLevelHeader = () => (
    <View style={[styles.levelHeader, { backgroundColor: level.color + '20' }]}>
      <View style={[styles.levelIcon, { backgroundColor: level.color }]}>
        <IconSymbol name={level.icon as any} color="white" size={32} />
      </View>
      
      <Text style={styles.levelName}>{level.name}</Text>
      <Text style={styles.levelChineseName}>{level.chineseName}</Text>
      <Text style={styles.levelDescription}>{level.description}</Text>
      
      <View style={styles.levelStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{level.units.length}</Text>
          <Text style={styles.statLabel}>Units</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {level.units.reduce((total, unit) => total + unit.lessons.length, 0)}
          </Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{level.minXP}-{level.maxXP}</Text>
          <Text style={styles.statLabel}>XP Range</Text>
        </View>
      </View>
    </View>
  );

  const renderUnit = (unit: Unit, index: number) => (
    <View key={unit.id} style={styles.unitCard}>
      <View style={styles.unitHeader}>
        <View style={styles.unitNumber}>
          <Text style={styles.unitNumberText}>{index + 1}</Text>
        </View>
        
        <View style={styles.unitInfo}>
          <Text style={styles.unitName}>{unit.name}</Text>
          <Text style={styles.unitChineseName}>{unit.chineseName}</Text>
          <Text style={styles.unitDescription}>{unit.description}</Text>
        </View>
        
        <View style={styles.unitStatus}>
          {unit.completed ? (
            <IconSymbol name="checkmark.circle.fill" color={colors.success} size={24} />
          ) : unit.unlocked ? (
            <IconSymbol name="play.circle" color={colors.primary} size={24} />
          ) : (
            <IconSymbol name="lock" color={colors.textLight} size={20} />
          )}
        </View>
      </View>
      
      <View style={styles.unitProgress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${unit.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{unit.progress}%</Text>
      </View>
      
      <View style={styles.unitMeta}>
        <View style={styles.metaItem}>
          <IconSymbol name="book" color={colors.textLight} size={16} />
          <Text style={styles.metaText}>{unit.lessons.length} lessons</Text>
        </View>
        <View style={styles.metaItem}>
          <IconSymbol name="clock" color={colors.textLight} size={16} />
          <Text style={styles.metaText}>{unit.estimatedTime}min</Text>
        </View>
        <View style={styles.metaItem}>
          <IconSymbol name="star" color={colors.accent} size={16} />
          <Text style={styles.metaText}>{unit.xpReward} XP</Text>
        </View>
      </View>
      
      <View style={styles.lessonsPreview}>
        <Text style={styles.lessonsTitle}>Lessons:</Text>
        {unit.lessons.slice(0, 3).map((lesson, lessonIndex) => (
          <View key={lesson.id} style={styles.lessonPreview}>
            <View style={[styles.lessonTypeIcon, { backgroundColor: getLessonTypeColor(lesson.type) }]}>
              <IconSymbol name={getLessonTypeIcon(lesson.type) as any} color="white" size={12} />
            </View>
            <Text style={styles.lessonPreviewText}>{lesson.title}</Text>
            {lesson.completed && (
              <IconSymbol name="checkmark" color={colors.success} size={14} />
            )}
          </View>
        ))}
        {unit.lessons.length > 3 && (
          <Text style={styles.moreLessons}>+{unit.lessons.length - 3} more lessons</Text>
        )}
      </View>
      
      <Button
        variant={unit.unlocked ? "primary" : "outline"}
        onPress={() => {
          if (unit.unlocked) {
            console.log(`Starting unit: ${unit.id}`);
            router.push(`/unit/${unit.id}`);
          }
        }}
        disabled={!unit.unlocked}
        style={styles.unitButton}
      >
        {unit.completed ? 'Review Unit' : unit.unlocked ? 'Start Unit' : 'Locked'}
      </Button>
    </View>
  );

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'vocabulary': return colors.primary;
      case 'grammar': return colors.secondary;
      case 'conversation': return colors.success;
      case 'listening': return colors.accent;
      case 'reading': return colors.chinese;
      case 'writing': return colors.error;
      default: return colors.textLight;
    }
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'textformat.abc';
      case 'grammar': return 'book';
      case 'conversation': return 'message';
      case 'listening': return 'ear';
      case 'reading': return 'doc.text';
      case 'writing': return 'pencil';
      default: return 'book';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: level.name,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderLevelHeader()}
        
        <View style={styles.unitsContainer}>
          <Text style={styles.sectionTitle}>Learning Units</Text>
          <Text style={styles.sectionSubtitle}>
            Complete units in order to progress through the level
          </Text>
          
          {level.units.map(renderUnit)}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    marginBottom: 20,
  },
  levelHeader: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  levelIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  levelChineseName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.chinese,
    marginBottom: 16,
  },
  levelDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  levelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
  unitsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  unitCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  unitNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  unitNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  unitInfo: {
    flex: 1,
  },
  unitName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  unitChineseName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.chinese,
    marginBottom: 8,
  },
  unitDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  unitStatus: {
    marginLeft: 12,
  },
  unitProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
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
  unitMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  lessonsPreview: {
    marginBottom: 16,
  },
  lessonsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  lessonPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  lessonTypeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  lessonPreviewText: {
    fontSize: 14,
    color: colors.textLight,
    flex: 1,
  },
  moreLessons: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: 'italic',
    marginTop: 4,
  },
  unitButton: {
    marginTop: 8,
  },
});
