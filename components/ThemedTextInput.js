import React from 'react';
import { TextInput } from 'react-native';
import { useTheme } from './ThemeProvider';

export default function ThemedTextInput({ style, ...props }) {
  const { theme } = useTheme();
  return (
    <TextInput
      placeholderTextColor={theme.isDark ? '#9CA3AF' : '#6B7280'}
      style={[{
        backgroundColor: theme.card,
        color: theme.text,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
      }, style]}
      {...props}
    />
  );
}

