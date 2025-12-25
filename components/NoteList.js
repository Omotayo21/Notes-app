import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeProvider';
import NoteCard from './NoteCard';
import TagPills from './TagPills';

export default function NoteList({ notes, onNotePress, selectedTag, onSelectTag }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  // Collect unique tags from notes
  const tags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));
  // Filter notes
  const filtered = notes.filter(
    (n) =>
      (!selectedTag || (n.tags || []).includes(selectedTag)) &&
      ((n.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (n.body || '').toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search notes..."
        placeholderTextColor={theme.isDark ? '#999' : '#888'}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          borderRadius: 8,
          padding: 12,
          marginVertical: 12,
          fontSize: 16,
        }}
      />
    
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={() => onNotePress(item)} />
        )}
        ListEmptyComponent={<Text style={{ color: theme.text, opacity: 0.7, textAlign: 'center', marginTop: 32 }}>No notes found</Text>}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

