
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';
import { PLACEMENT_TEST, calculatePlacementLevel } from '@/data/levelSystem';
import { PlacementQuestion } from '@/types/levelSystem';

export default function PlacementTestScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(PLACEMENT_TEST.timeLimit * 60); // Convert to seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [recommendedLevel, setRecommendedLevel] = useState('');

  const currentQuestion = PLACEMENT_TEST.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === PLACEMENT_TEST.questions.length - 1;

  useEffect(() => {
    if (testStarted && !testCompleted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !testCompleted) {
      handleTestComplete();
    }
  }, [testStarted, testCompleted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    console.log('Starting placement test');
    setTestStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleTestComplete();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleTestComplete = () => {
    console.log('Completing placement test');
    
    // Calculate score
    let totalScore = 0;
    PLACEMENT_TEST.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore += question.points;
      }
    });
    
    const level = calculatePlacementLevel(totalScore);
    
    setScore(totalScore);
    setRecommendedLevel(level);
    setTestCompleted(true);
  };

  const handleRetakeTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setTimeRemaining(PLACEMENT_TEST.timeLimit * 60);
    setTestStarted(false);
    setTestCompleted(false);
    setScore(0);
    setRecommendedLevel('');
  };

  const handleAcceptLevel = () => {
    console.log(`Accepting recommended level: ${recommendedLevel}`);
    Alert.alert(
      'Level Set!',
      `Your learning level has been set to ${recommendedLevel}. You can always change this later in your profile.`,
      [
        {
          text: 'Start Learning',
          onPress: () => router.push('/'),
        },
      ]
    );
  };

  const renderTestIntro = () => (
    <View style={styles.introContainer}>
      <View style={styles.introIcon}>
        <IconSymbol name="graduationcap" color={colors.primary} size={48} />
      </View>
      
      <Text style={styles.introTitle}>Chinese Placement Test</Text>
      <Text style={styles.introDescription}>{PLACEMENT_TEST.description}</Text>
      
      <View style={styles.testInfo}>
        <View style={styles.infoItem}>
          <IconSymbol name="clock" color={colors.textLight} size={20} />
          <Text style={styles.infoText}>{PLACEMENT_TEST.timeLimit} minutes</Text>
        </View>
        
        <View style={styles.infoItem}>
          <IconSymbol name="questionmark.circle" color={colors.textLight} size={20} />
          <Text style={styles.infoText}>{PLACEMENT_TEST.questions.length} questions</Text>
        </View>
        
        <View style={styles.infoItem}>
          <IconSymbol name="target" color={colors.textLight} size={20} />
          <Text style={styles.infoText}>Adaptive difficulty</Text>
        </View>
      </View>
      
      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructionsText}>• Answer all questions to the best of your ability</Text>
        <Text style={styles.instructionsText}>• Don't worry if some questions seem difficult</Text>
        <Text style={styles.instructionsText}>• The test adapts to your skill level</Text>
        <Text style={styles.instructionsText}>• You can retake the test anytime</Text>
      </View>
      
      <Button
        variant="primary"
        onPress={handleStartTest}
        style={styles.startButton}
      >
        Start Test
      </Button>
    </View>
  );

  const renderQuestion = () => (
    <View style={styles.questionContainer}>
      <View style={styles.questionHeader}>
        <View style={styles.progressInfo}>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1} of {PLACEMENT_TEST.questions.length}
          </Text>
          <Text style={styles.timeRemaining}>{formatTime(timeRemaining)}</Text>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / PLACEMENT_TEST.questions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.questionContent}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        {currentQuestion.chinese && (
          <Text style={styles.chineseText}>{currentQuestion.chinese}</Text>
        )}
        
        {currentQuestion.pinyin && (
          <Text style={styles.pinyinText}>{currentQuestion.pinyin}</Text>
        )}
        
        <View style={styles.choicesContainer}>
          {currentQuestion.choices.map((choice, index) => (
            <Pressable
              key={index}
              style={[
                styles.choiceButton,
                selectedAnswers[currentQuestionIndex] === index && styles.selectedChoice,
              ]}
              onPress={() => handleAnswerSelect(index)}
            >
              <Text style={[
                styles.choiceText,
                selectedAnswers[currentQuestionIndex] === index && styles.selectedChoiceText,
              ]}>
                {choice}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      
      <View style={styles.questionActions}>
        <Button
          variant="primary"
          onPress={handleNextQuestion}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
          style={styles.nextButton}
        >
          {isLastQuestion ? 'Complete Test' : 'Next Question'}
        </Button>
      </View>
    </View>
  );

  const renderResults = () => (
    <View style={styles.resultsContainer}>
      <View style={styles.resultsIcon}>
        <IconSymbol name="trophy" color={colors.primary} size={48} />
      </View>
      
      <Text style={styles.resultsTitle}>Test Complete!</Text>
      <Text style={styles.scoreText}>Your Score: {score} points</Text>
      
      <View style={styles.levelRecommendation}>
        <Text style={styles.recommendationTitle}>Recommended Level:</Text>
        <Text style={styles.recommendedLevel}>{recommendedLevel.toUpperCase()}</Text>
        <Text style={styles.recommendationDescription}>
          Based on your performance, we recommend starting at the {recommendedLevel} level. 
          This will provide you with the right balance of challenge and support.
        </Text>
      </View>
      
      <View style={styles.resultsActions}>
        <Button
          variant="primary"
          onPress={handleAcceptLevel}
          style={styles.actionButton}
        >
          Accept & Start Learning
        </Button>
        
        <Button
          variant="outline"
          onPress={handleRetakeTest}
          style={styles.actionButton}
        >
          Retake Test
        </Button>
        
        <Button
          variant="outline"
          onPress={() => router.push('/levels')}
          style={styles.actionButton}
        >
          Choose Level Manually
        </Button>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Placement Test",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
          headerLeft: testStarted && !testCompleted ? () => (
            <Pressable
              onPress={() => {
                Alert.alert(
                  'Exit Test?',
                  'Your progress will be lost. Are you sure you want to exit?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Exit', style: 'destructive', onPress: () => router.back() },
                  ]
                );
              }}
              style={styles.exitButton}
            >
              <IconSymbol name="xmark" color={colors.error} size={20} />
            </Pressable>
          ) : undefined,
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!testStarted && !testCompleted && renderTestIntro()}
        {testStarted && !testCompleted && renderQuestion()}
        {testCompleted && renderResults()}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  introContainer: {
    padding: 24,
    alignItems: 'center',
  },
  introIcon: {
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  introDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  testInfo: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  instructions: {
    width: '100%',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
    lineHeight: 20,
  },
  startButton: {
    minWidth: 200,
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  questionHeader: {
    marginBottom: 32,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  timeRemaining: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  questionContent: {
    flex: 1,
    marginBottom: 32,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 28,
  },
  chineseText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.chinese,
    textAlign: 'center',
    marginBottom: 8,
  },
  pinyinText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  choicesContainer: {
    gap: 12,
  },
  choiceButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedChoice: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  choiceText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  selectedChoiceText: {
    color: colors.primary,
    fontWeight: '600',
  },
  questionActions: {
    alignItems: 'center',
  },
  nextButton: {
    minWidth: 200,
  },
  resultsContainer: {
    padding: 24,
    alignItems: 'center',
  },
  resultsIcon: {
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 32,
  },
  levelRecommendation: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  recommendedLevel: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
  },
  recommendationDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  resultsActions: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  exitButton: {
    padding: 8,
  },
});
