import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../components/Header';
import ThemedView from '../components/ThemedView';
import NoteList from '../components/NoteList';
import { getNotes } from '../utils/notes';
import { useTheme } from '../components/ThemeProvider';

export default function HomeScreen() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const [notes, setNotes] = useState([]);
  const [selectedTag, setSelectedTag] = useState(searchParams.tag || null);
  const { theme } = useTheme();

  useEffect(() => {
    const load = async () => setNotes(await getNotes());
    load();
  }, []);

  // If params change (e.g., tag from tags page), update selectedTag
  useEffect(() => {
    setSelectedTag(searchParams.tag || null);
  }, [searchParams.tag]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title={selectedTag ? `Notes: ${selectedTag}` : "Notes"} />
      <NoteList
        notes={notes}
        onNotePress={(note) => router.push(`/note/${note.id}`)}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
      />
      <TouchableOpacity
        accessible accessibilityLabel="Add Note"
        style={{
          backgroundColor: theme.accent,
          padding: 18, borderRadius: 30,
          position: 'absolute', bottom: 26, right: 26, shadowOpacity: 0.15, shadowRadius: 7, elevation: 4,
        }}
        onPress={() => router.push('/note/new')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 26 }}>+</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}
