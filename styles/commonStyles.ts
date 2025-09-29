import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FF6B35',     // Vibrant orange
  secondary: '#F7931E',   // Golden orange
  accent: '#FFD23F',      // Bright yellow
  success: '#4CAF50',     // Green for correct answers
  error: '#F44336',       // Red for incorrect answers
  background: '#FFFFFF',  // Clean white background
  backgroundAlt: '#F8F9FA', // Light gray background
  text: '#2C3E50',        // Dark text for readability
  textLight: '#7F8C8D',   // Light gray text
  card: '#FFFFFF',        // White cards
  border: '#E9ECEF',      // Light border
  chinese: '#DC143C',     // Red for Chinese text (traditional)
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  chineseText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.chinese,
    textAlign: 'center',
    marginBottom: 8,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    margin: 16,
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
    elevation: 6,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
  badge: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
});
