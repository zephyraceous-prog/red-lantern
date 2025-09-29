
import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { Button } from "@/components/button";

interface Challenge {
  id: string;
  type: 'vocabulary' | 'translation' | 'listening' | 'conversation';
  question: string;
  chinese?: string;
  pinyin?: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  xpReward: number;
}

const dailyChallenges: Challenge[] = [
  {
    id: '1',
    type: 'vocabulary',
    question: 'What does "谢谢" mean?',
    chinese: '谢谢',
    pinyin: 'Xiè xiè',
    choices: ['Hello', 'Thank you', 'Goodbye', 'Sorry'],
    correctAnswer: 1,
    explanation: '"谢谢" (xiè xiè) is the most common way to say "thank you" in Chinese.',
    xpReward: 15,
  },
  {
    id: '2',
    type: 'translation',
    question: 'How do you say "Good morning" in Chinese?',
    choices: ['晚上好', '早上好', '下午好', '晚安'],
    correctAnswer: 1,
    explanation: '"早上好" (zǎo shàng hǎo) means "good morning" in Chinese.',
    xpReward: 20,
  },
  {
    id: '3',
    type: 'vocabulary',
    question: 'What does "水" mean?',
    chinese: '水',
    pinyin: 'Shuǐ',
    choices: ['Fire', 'Earth', 'Water', 'Air'],
    correctAnswer: 2,
    explanation: '"水" (shuǐ) means "water" in Chinese. It\'s one of the basic elements.',
    xpReward: 15,
  },
  {
    id: '4',
    type: 'conversation',
    question: 'Complete the conversation: A: "你好!" B: "____"',
    choices: ['再见', '你好', '谢谢', '对不起'],
    correctAnswer: 1,
    explanation: 'When someone says "你好" (hello), the appropriate response is also "你好".',
    xpReward: 25,
  },
  {
    id: '5',
    type: 'translation',
    question: 'Translate: "I love you"',
    choices: ['我喜欢你', '我爱你', '我想你', '我需要你'],
    correctAnswer: 1,
    explanation: '"我爱你" (wǒ ài nǐ) is the direct translation of "I love you" in Chinese.',
    xpReward: 30,
  },
];

export default function DailyChallengeScreen() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  const challenge = dailyChallenges[currentChallenge];
  const isLastChallenge = currentChallenge === dailyChallenges.length - 1;
  const totalChallenges = dailyChallenges.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === challenge.correctAnswer;
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + challenge.xpReward);
      setCompletedChallenges([...completedChallenges, challenge.id]);
    }

    setTimeout(() => {
      if (isLastChallenge) {
        const finalScore = score + (isCorrect ? challenge.xpReward : 0);
        Alert.alert(
          'Daily Challenge Complete!',
          `Congratulations! You earned ${finalScore} XP today!\n\nCome back tomorrow for new challenges!`,
          [{ text: 'Great!', onPress: () => router.back() }]
        );
      } else {
        setCurrentChallenge(currentChallenge + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 2000);
  };

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'textformat.abc';
      case 'translation': return 'arrow.left.arrow.right';
      case 'listening': return 'ear';
      case 'conversation': return 'message';
      default: return 'questionmark';
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'vocabulary': return colors.primary;
      case 'translation': return colors.secondary;
      case 'listening': return colors.success;
      case 'conversation': return colors.accent;
      default: return colors.textLight;
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.timerContainer}>
        <IconSymbol name="clock" color={colors.primary} size={20} />
        <Text style={styles.timerText}>New challenges in {formatTime(timeLeft)}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Challenge {currentChallenge + 1} of {totalChallenges}
        </Text>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill, 
            { width: `${((currentChallenge + 1) / totalChallenges) * 100}%` }
          ]} />
        </View>
      </View>
      
      <View style={styles.scoreContainer}>
        <IconSymbol name="star.fill" color={colors.accent} size={20} />
        <Text style={styles.scoreText}>{score} XP</Text>
      </View>
    </View>
  );

  const renderChallenge = () => (
    <View style={styles.challengeContainer}>
      <View style={styles.challengeHeader}>
        <View style={[
          styles.challengeTypeIcon,
          { backgroundColor: getChallengeColor(challenge.type) }
        ]}>
          <IconSymbol 
            name={getChallengeIcon(challenge.type) as any} 
            color="white" 
            size={24} 
          />
        </View>
        
        <View style={styles.challengeTypeInfo}>
          <Text style={styles.challengeTypeText}>
            {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
          </Text>
          <Text style={styles.challengeReward}>+{challenge.xpReward} XP</Text>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{challenge.question}</Text>
        
        {challenge.chinese && (
          <View style={styles.chineseContainer}>
            <Text style={styles.chineseText}>{challenge.chinese}</Text>
            {challenge.pinyin && (
              <Text style={styles.pinyinText}>{challenge.pinyin}</Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.choicesContainer}>
        {challenge.choices.map((choice, index) => (
          <Pressable
            key={index}
            style={[
              styles.choiceButton,
              selectedAnswer === index && styles.selectedChoice,
              showFeedback && index === challenge.correctAnswer && styles.correctChoice,
              showFeedback && selectedAnswer === index && index !== challenge.correctAnswer && styles.incorrectChoice,
            ]}
            onPress={() => handleAnswerSelect(index)}
            disabled={showFeedback}
          >
            <Text style={[
              styles.choiceText,
              selectedAnswer === index && styles.selectedChoiceText,
              showFeedback && index === challenge.correctAnswer && styles.correctChoiceText,
            ]}>
              {choice}
            </Text>
          </Pressable>
        ))}
      </View>

      {selectedAnswer !== null && !showFeedback && (
        <Button
          variant="primary"
          onPress={handleSubmitAnswer}
          style={styles.submitButton}
        >
          Submit Answer
        </Button>
      )}

      {showFeedback && (
        <View style={[
          styles.feedbackContainer,
          selectedAnswer === challenge.correctAnswer ? styles.correctFeedback : styles.incorrectFeedback
        ]}>
          <View style={styles.feedbackHeader}>
            <IconSymbol 
              name={selectedAnswer === challenge.correctAnswer ? "checkmark.circle.fill" : "xmark.circle.fill"} 
              color={selectedAnswer === challenge.correctAnswer ? colors.success : colors.error} 
              size={32} 
            />
            <Text style={styles.feedbackTitle}>
              {selectedAnswer === challenge.correctAnswer ? 'Correct!' : 'Not quite right'}
            </Text>
          </View>
          
          <Text style={styles.explanationText}>{challenge.explanation}</Text>
          
          {selectedAnswer === challenge.correctAnswer && (
            <Text style={styles.xpEarnedText}>+{challenge.xpReward} XP earned!</Text>
          )}
        </View>
      )}
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Daily Challenge",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderChallenge()}
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
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 8,
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
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  challengeContainer: {
    padding: 20,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  challengeTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  challengeTypeInfo: {
    flex: 1,
  },
  challengeTypeText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
  challengeReward: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  chineseContainer: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  chineseText: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.chinese,
    marginBottom: 8,
  },
  pinyinText: {
    fontSize: 18,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  choicesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  choiceButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedChoice: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  correctChoice: {
    borderColor: colors.success,
    backgroundColor: colors.success + '10',
  },
  incorrectChoice: {
    borderColor: colors.error,
    backgroundColor: colors.error + '10',
  },
  choiceText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  selectedChoiceText: {
    color: colors.primary,
    fontWeight: '600',
  },
  correctChoiceText: {
    color: colors.success,
    fontWeight: '600',
  },
  submitButton: {
    marginBottom: 24,
  },
  feedbackContainer: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  correctFeedback: {
    backgroundColor: colors.success + '10',
    borderWidth: 1,
    borderColor: colors.success + '30',
  },
  incorrectFeedback: {
    backgroundColor: colors.error + '10',
    borderWidth: 1,
    borderColor: colors.error + '30',
  },
  feedbackHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  explanationText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  xpEarnedText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
  },
});
