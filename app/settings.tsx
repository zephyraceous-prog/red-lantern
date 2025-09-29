
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Switch, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { Button } from "@/components/button";

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const settingSections = [
    {
      title: 'Learning Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          description: 'Get reminders to practice',
          icon: 'bell',
          type: 'toggle' as const,
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: 'daily-reminders',
          title: 'Daily Reminders',
          description: 'Remind me to practice daily',
          icon: 'clock',
          type: 'toggle' as const,
          value: dailyReminders,
          onToggle: setDailyReminders,
        },
        {
          id: 'sound-effects',
          title: 'Sound Effects',
          description: 'Play sounds for correct/incorrect answers',
          icon: 'speaker.wave.2',
          type: 'toggle' as const,
          value: soundEffects,
          onToggle: setSoundEffects,
        },
        {
          id: 'auto-play',
          title: 'Auto-play Audio',
          description: 'Automatically play pronunciation',
          icon: 'play.circle',
          type: 'toggle' as const,
          value: autoPlay,
          onToggle: setAutoPlay,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Edit Profile',
          description: 'Update your personal information',
          icon: 'person.circle',
          type: 'navigation' as const,
          onPress: () => {
            console.log('Edit profile');
            Alert.alert('Coming Soon', 'Profile editing will be available in a future update.');
          },
        },
        {
          id: 'progress',
          title: 'Learning Progress',
          description: 'View detailed statistics',
          icon: 'chart.bar',
          type: 'navigation' as const,
          onPress: () => {
            console.log('View progress');
            router.push('/profile');
          },
        },
        {
          id: 'achievements',
          title: 'Achievements',
          description: 'View your badges and milestones',
          icon: 'trophy',
          type: 'navigation' as const,
          onPress: () => {
            console.log('View achievements');
            router.push('/profile');
          },
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          description: 'Get help and find answers',
          icon: 'questionmark.circle',
          type: 'navigation' as const,
          onPress: () => {
            console.log('Help center');
            Alert.alert('Help Center', 'Visit our website for comprehensive help and tutorials.');
          },
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          description: 'Help us improve the app',
          icon: 'envelope',
          type: 'navigation' as const,
          onPress: () => {
            console.log('Send feedback');
            Alert.alert('Feedback', 'Thank you for wanting to help us improve! Feedback feature coming soon.');
          },
        },
        {
          id: 'rate',
          title: 'Rate the App',
          description: 'Leave a review in the App Store',
          icon: 'star',
          type: 'navigation' as const,
          onPress: () => {
            console.log('Rate app');
            Alert.alert('Rate ChineseChat', 'Thank you for considering rating our app!');
          },
        },
      ],
    },
    {
      title: 'Privacy & Legal',
      items: [
        {
          id: 'privacy',
          title: 'Privacy Policy',
          icon: 'lock.shield',
          type: 'navigation' as const,
          onPress: () => {
            console.log('Privacy policy');
            Alert.alert('Privacy Policy', 'Your privacy is important to us. Full policy available on our website.');
          },
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          icon: 'doc.text',
          type: 'navigation' as const,
          onPress: () => {
            console.log('Terms of service');
            Alert.alert('Terms of Service', 'Terms of service available on our website.');
          },
        },
        {
          id: 'about',
          title: 'About ChineseChat',
          icon: 'info.circle',
          type: 'navigation' as const,
          onPress: () => {
            console.log('About app');
            Alert.alert(
              'About ChineseChat',
              'ChineseChat v1.0\n\nA gamified Chinese learning app focused on natural conversations.\n\nMade with ❤️ for language learners.'
            );
          },
        },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        {
          id: 'reset-progress',
          title: 'Reset Progress',
          description: 'Clear all learning progress',
          icon: 'arrow.clockwise',
          type: 'action' as const,
          onPress: () => {
            Alert.alert(
              'Reset Progress',
              'Are you sure you want to reset all your learning progress? This action cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Reset', 
                  style: 'destructive',
                  onPress: () => {
                    console.log('Reset progress');
                    Alert.alert('Progress Reset', 'Your learning progress has been reset.');
                  }
                },
              ]
            );
          },
        },
        {
          id: 'delete-account',
          title: 'Delete Account',
          description: 'Permanently delete your account',
          icon: 'trash',
          type: 'action' as const,
          onPress: () => {
            Alert.alert(
              'Delete Account',
              'Are you sure you want to delete your account? This will permanently remove all your data and cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Delete', 
                  style: 'destructive',
                  onPress: () => {
                    console.log('Delete account');
                    Alert.alert('Account Deleted', 'Your account has been scheduled for deletion.');
                  }
                },
              ]
            );
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <Pressable
      key={item.id}
      style={[
        styles.settingItem,
        item.id.includes('delete') || item.id.includes('reset') ? styles.dangerItem : null,
      ]}
      onPress={item.onPress}
      disabled={item.type === 'toggle'}
    >
      <View style={styles.settingIcon}>
        <IconSymbol 
          name={item.icon as any} 
          color={item.id.includes('delete') || item.id.includes('reset') ? colors.error : colors.textLight} 
          size={20} 
        />
      </View>
      
      <View style={styles.settingContent}>
        <Text style={[
          styles.settingTitle,
          item.id.includes('delete') || item.id.includes('reset') ? styles.dangerText : null,
        ]}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={styles.settingDescription}>{item.description}</Text>
        )}
      </View>
      
      {item.type === 'toggle' && item.onToggle && (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: colors.backgroundAlt, true: colors.primary + '40' }}
          thumbColor={item.value ? colors.primary : colors.textLight}
        />
      )}
      
      {item.type === 'navigation' && (
        <IconSymbol name="chevron.right" color={colors.textLight} size={16} />
      )}
    </Pressable>
  );

  const renderSection = (section: { title: string; items: SettingItem[] }) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map(renderSettingItem)}
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your learning experience</Text>
        </View>
        
        {settingSections.map(renderSection)}
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>ChineseChat v1.0.0</Text>
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
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dangerItem: {
    backgroundColor: colors.error + '05',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  dangerText: {
    color: colors.error,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 14,
    color: colors.textLight,
  },
});
