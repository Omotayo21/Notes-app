import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeProvider';

export default function Header({ title }) {
  const { theme } = useTheme();
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      backgroundColor: theme.card, padding: 18, paddingTop: 40, borderBottomWidth: 1, borderColor: theme.pill
    }}>
      <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
    </View>
  );
}
