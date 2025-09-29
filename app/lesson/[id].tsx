
import React, { useState, useEffect } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { Button } from "@/components/button";

interface ConversationStep {
  id: string;
  type: 'dialogue' | 'choice' | 'translation' | 'audio';
  speaker?: 'user' | 'character';
  chinese: string;
  pinyin: string;
  english: string;
  choices?: string[];
  correctAnswer?: number;
  characterName?: string;
  characterEmoji?: string;
}

const lessonContent: Record<string, ConversationStep[]> = {
  'hello-world': [
    {
      id: '1',
      type: 'dialogue',
      speaker: 'character',
      chinese: '你好！',
      pinyin: 'Nǐ hǎo!',
      english: 'Hello!',
      characterName: 'Li Wei',
      characterEmoji: '👨‍💼',
    },
    {
      id: '2',
      type: 'choice',
      chinese: 'How do you respond?',
      pinyin: '',
      english: 'Choose the correct response:',
      choices: ['你好！', '再见！', '谢谢！', '不客气！'],
      correctAnswer: 0,
    },
    {
      id: '3',
      type: 'dialogue',
      speaker: 'character',
      chinese: '我叫李伟。你叫什么名字？',
      pinyin: 'Wǒ jiào Lǐ Wěi. Nǐ jiào shénme míngzì?',
      english: 'My name is Li Wei. What is your name?',
      characterName: 'Li Wei',
      characterEmoji: '👨‍💼',
    },
    {
      id: '4',
      type: 'translation',
      chinese: 'Translate to Chinese: "My name is..."',
      pinyin: '',
      english: 'Type the Chinese translation:',
      choices: ['我叫...', '你好', '再见', '谢谢'],
      correctAnswer: 0,
    },
  ],
  'numbers': [
    {
      id: '1',
      type: 'dialogue',
      speaker: 'character',
      chinese: '我们来学数字吧！',
      pinyin: 'Wǒmen lái xué shùzì ba!',
      english: 'Let\'s learn numbers!',
      characterName: 'Teacher Wang',
      characterEmoji: '👩‍🏫',
    },
    {
      id: '2',
      type: 'choice',
      chinese: '一，二，三，？',
      pinyin: 'Yī, èr, sān, ?',
      english: 'What comes next?',
      choices: ['五', '四', '六', '七'],
      correctAnswer: 1,
    },
  ],
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const steps = lessonContent[id] || [];
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    console.log(`Starting lesson: ${id}`);
  }, [id]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentStepData.correctAnswer;
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 10);
    } else {
      setHearts(hearts - 1);
      if (hearts <= 1) {
        Alert.alert(
          'Out of Hearts!',
          'You\'ve run out of hearts. Try again tomorrow or watch an ad to continue.',
          [
            { text: 'Try Again', onPress: () => router.back() },
            { text: 'Continue', onPress: () => setHearts(3) },
          ]
        );
        return;
      }
    }

    setTimeout(() => {
      if (isLastStep) {
        // Lesson completed
        Alert.alert(
          'Lesson Complete!',
          `Great job! You earned ${score + (isCorrect ? 10 : 0)} XP!`,
          [{ text: 'Continue', onPress: () => router.back() }]
        );
      } else {
        setCurrentStep(currentStep + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 1500);
  };

  const renderDialogue = (step: ConversationStep) => (
    <View style={styles.dialogueContainer}>
      <View style={styles.characterInfo}>
        <Text style={styles.characterEmoji}>{step.characterEmoji}</Text>
        <Text style={styles.characterName}>{step.characterName}</Text>
      </View>
      
      <View style={styles.speechBubble}>
        <Text style={styles.chineseText}>{step.chinese}</Text>
        <Text style={styles.pinyinText}>{step.pinyin}</Text>
        <Text style={styles.englishText}>{step.english}</Text>
      </View>
      
      <Button
        variant="primary"
        onPress={() => {
          if (isLastStep) {
            Alert.alert('Lesson Complete!', `You earned ${score} XP!`, [
              { text: 'Continue', onPress: () => router.back() }
            ]);
          } else {
            setCurrentStep(currentStep + 1);
          }
        }}
        style={styles.continueButton}
      >
        {isLastStep ? 'Complete Lesson' : 'Continue'}
      </Button>
    </View>
  );

  const renderChoice = (step: ConversationStep) => (
    <View style={styles.choiceContainer}>
      <Text style={styles.questionText}>{step.chinese}</Text>
      {step.english && <Text style={styles.questionSubtext}>{step.english}</Text>}
      
      <View style={styles.choicesGrid}>
        {step.choices?.map((choice, index) => (
          <Pressable
            key={index}
            style={[
              styles.choiceButton,
              selectedAnswer === index && styles.selectedChoice,
              showFeedback && index === step.correctAnswer && styles.correctChoice,
              showFeedback && selectedAnswer === index && index !== step.correctAnswer && styles.incorrectChoice,
            ]}
            onPress={() => handleAnswerSelect(index)}
            disabled={showFeedback}
          >
            <Text style={[
              styles.choiceText,
              selectedAnswer === index && styles.selectedChoiceText,
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
          Check Answer
        </Button>
      )}
      
      {showFeedback && (
        <View style={[
          styles.feedbackContainer,
          selectedAnswer === step.correctAnswer ? styles.correctFeedback : styles.incorrectFeedback
        ]}>
          <IconSymbol 
            name={selectedAnswer === step.correctAnswer ? "checkmark.circle" : "xmark.circle"} 
            color={selectedAnswer === step.correctAnswer ? colors.success : colors.error} 
            size={24} 
          />
          <Text style={styles.feedbackText}>
            {selectedAnswer === step.correctAnswer ? 'Correct! Well done!' : 'Not quite right. Try again!'}
          </Text>
        </View>
      )}
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentStep + 1) / steps.length) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{currentStep + 1} / {steps.length}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.heartsContainer}>
        {[...Array(3)].map((_, index) => (
          <IconSymbol
            key={index}
            name="heart.fill"
            color={index < hearts ? colors.error : colors.backgroundAlt}
            size={20}
          />
        ))}
      </View>
      <Text style={styles.scoreText}>{score} XP</Text>
    </View>
  );

  if (!currentStepData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Lesson",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
        }}
      />
      
      <View style={styles.container}>
        {renderHeader()}
        {renderProgressBar()}
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {currentStepData.type === 'dialogue' && renderDialogue(currentStepData)}
          {(currentStepData.type === 'choice' || currentStepData.type === 'translation') && renderChoice(currentStepData)}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  heartsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dialogueContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  characterInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  characterEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  characterName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
  speechBubble: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    maxWidth: '90%',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  chineseText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.chinese,
    textAlign: 'center',
    marginBottom: 8,
  },
  pinyinText: {
    fontSize: 18,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  englishText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  continueButton: {
    minWidth: 200,
  },
  choiceContainer: {
    paddingVertical: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  questionSubtext: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  choicesGrid: {
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
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  selectedChoiceText: {
    color: colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 16,
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  correctFeedback: {
    backgroundColor: colors.success + '20',
  },
  incorrectFeedback: {
    backgroundColor: colors.error + '20',
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: colors.text,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
    marginTop: 100,
  },
});
