import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeProvider';
import TagPills from './TagPills';

export default function NoteCard({ note, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: theme.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: theme.isDark ? '#000' : '#888',
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 1,
    }}>
      <Text numberOfLines={1} style={{ fontWeight: 'bold', color: theme.text, fontSize: 18 }}>{note.title || 'Untitled Note'}</Text>
      <Text numberOfLines={2} style={{ color: theme.text, opacity: 0.7, marginTop: 4, minHeight: 40 }}>{note.body}</Text>
      <TagPills tags={note.tags || []} editable={false} />
    </TouchableOpacity>
  );
}

