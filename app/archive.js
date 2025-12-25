import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import ThemedView from '../components/ThemedView';
import NoteCard from '../components/NoteCard';
import { getNotes, restoreNote, deleteNote } from '../utils/notes';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeProvider';

export default function ArchiveScreen() {
  const [archived, setArchived] = useState([]);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const load = async () => setArchived((await getNotes(true)).filter(n => n.archived));
    load();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title="Archive" showArchive={false} />
      <View style={{ flex: 1, padding: 18 }}>
        {archived.length === 0 ? (
          <Text style={{ color: theme.text, opacity: 0.7, marginTop: 32, textAlign: 'center' }}>No archived notes</Text>
        ) : (
          archived.map((note) => (
            <View key={note.id} style={{ marginBottom: 14 }}>
              <NoteCard note={note} onPress={() => router.push(`/note/${note.id}`)} />
              <View style={{ flexDirection: 'row', gap: 16, marginTop: 6 }}>
                <TouchableOpacity onPress={async() => { await restoreNote(note.id); router.replace('/archive'); }}>
                  <Text style={{ color: theme.accent, marginRight: 16, fontWeight: 'bold' }}>Restore</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async() => { await deleteNote(note.id); router.replace('/archive'); }}>
                  <Text style={{ color: '#EC4899', fontWeight: 'bold' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ThemedView>
  );
}

