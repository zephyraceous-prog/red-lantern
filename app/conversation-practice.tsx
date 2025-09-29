
import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { Button } from "@/components/button";

interface Message {
  id: string;
  sender: 'user' | 'ai';
  chinese?: string;
  pinyin?: string;
  english: string;
  timestamp: Date;
}

const conversationTopics = [
  {
    id: 'coffee-shop',
    title: 'At a Coffee Shop',
    chinese: '在咖啡店',
    description: 'Order drinks and chat with the barista',
    difficulty: 'beginner',
    emoji: '☕',
  },
  {
    id: 'taxi',
    title: 'Taking a Taxi',
    chinese: '坐出租车',
    description: 'Give directions and make small talk',
    difficulty: 'intermediate',
    emoji: '🚕',
  },
  {
    id: 'shopping',
    title: 'Shopping for Clothes',
    chinese: '买衣服',
    description: 'Ask about sizes, colors, and prices',
    difficulty: 'intermediate',
    emoji: '👕',
  },
  {
    id: 'restaurant',
    title: 'At a Restaurant',
    chinese: '在餐厅',
    description: 'Order food and ask about ingredients',
    difficulty: 'advanced',
    emoji: '🍜',
  },
];

export default function ConversationPracticeScreen() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const startConversation = (topicId: string) => {
    setSelectedTopic(topicId);
    const topic = conversationTopics.find(t => t.id === topicId);
    
    // Initialize conversation with AI greeting
    const initialMessage: Message = {
      id: '1',
      sender: 'ai',
      chinese: '你好！欢迎！',
      pinyin: 'Nǐ hǎo! Huānyíng!',
      english: 'Hello! Welcome!',
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
    console.log(`Starting conversation: ${topicId}`);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      english: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        {
          chinese: '很好！',
          pinyin: 'Hěn hǎo!',
          english: 'Very good!',
        },
        {
          chinese: '我明白了。',
          pinyin: 'Wǒ míngbái le.',
          english: 'I understand.',
        },
        {
          chinese: '你说得对。',
          pinyin: 'Nǐ shuō de duì.',
          english: 'You\'re right.',
        },
        {
          chinese: '还有别的吗？',
          pinyin: 'Hái yǒu bié de ma?',
          english: 'Anything else?',
        },
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        chinese: randomResponse.chinese,
        pinyin: randomResponse.pinyin,
        english: randomResponse.english,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const renderTopicSelection = () => (
    <ScrollView style={styles.topicsContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose a Conversation</Text>
        <Text style={styles.subtitle}>Practice real-world scenarios with AI</Text>
      </View>

      {conversationTopics.map((topic) => (
        <Pressable
          key={topic.id}
          style={styles.topicCard}
          onPress={() => startConversation(topic.id)}
        >
          <View style={styles.topicEmoji}>
            <Text style={styles.emojiText}>{topic.emoji}</Text>
          </View>
          
          <View style={styles.topicInfo}>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <Text style={styles.topicChinese}>{topic.chinese}</Text>
            <Text style={styles.topicDescription}>{topic.description}</Text>
            
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{topic.difficulty}</Text>
            </View>
          </View>
          
          <IconSymbol name="chevron.right" color={colors.textLight} size={20} />
        </Pressable>
      ))}
    </ScrollView>
  );

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.sender === 'user' ? styles.userMessage : styles.aiMessage,
      ]}
    >
      {message.sender === 'ai' && (
        <View style={styles.aiAvatar}>
          <Text style={styles.avatarText}>🤖</Text>
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        message.sender === 'user' ? styles.userBubble : styles.aiBubble,
      ]}>
        {message.chinese && (
          <Text style={styles.messageChineseText}>{message.chinese}</Text>
        )}
        {message.pinyin && (
          <Text style={styles.messagePinyinText}>{message.pinyin}</Text>
        )}
        <Text style={[
          styles.messageEnglishText,
          message.sender === 'user' ? styles.userMessageText : styles.aiMessageText,
        ]}>
          {message.english}
        </Text>
      </View>
      
      {message.sender === 'user' && (
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
      )}
    </View>
  );

  const renderConversation = () => {
    const topic = conversationTopics.find(t => t.id === selectedTopic);
    
    return (
      <View style={styles.conversationContainer}>
        <View style={styles.conversationHeader}>
          <Pressable
            style={styles.backButton}
            onPress={() => setSelectedTopic(null)}
          >
            <IconSymbol name="chevron.left" color={colors.primary} size={20} />
            <Text style={styles.backText}>Topics</Text>
          </Pressable>
          
          <View style={styles.topicInfo}>
            <Text style={styles.conversationTitle}>{topic?.title}</Text>
            <Text style={styles.conversationChinese}>{topic?.chinese}</Text>
          </View>
        </View>

        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.map(renderMessage)}
          
          {isTyping && (
            <View style={[styles.messageContainer, styles.aiMessage]}>
              <View style={styles.aiAvatar}>
                <Text style={styles.avatarText}>🤖</Text>
              </View>
              <View style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}>
                <Text style={styles.typingText}>Typing...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message in English..."
            placeholderTextColor={colors.textLight}
            multiline
            maxLength={200}
          />
          <Pressable
            style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <IconSymbol name="arrow.up.circle.fill" color={colors.primary} size={32} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Conversation Practice",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
        }}
      />
      
      <View style={styles.container}>
        {selectedTopic ? renderConversation() : renderTopicSelection()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topicsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  topicCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  topicEmoji: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emojiText: {
    fontSize: 28,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  topicChinese: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.chinese,
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
  },
  difficultyBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'capitalize',
  },
  conversationContainer: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 4,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  conversationChinese: {
    fontSize: 14,
    color: colors.chinese,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarText: {
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageChineseText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.chinese,
    marginBottom: 4,
  },
  messagePinyinText: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  messageEnglishText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: colors.text,
  },
  typingBubble: {
    backgroundColor: colors.backgroundAlt,
  },
  typingText: {
    fontSize: 15,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
