import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Header from "../../components/Header";
import ThemedView from "../../components/ThemedView";
import ThemedTextInput from "../../components/ThemedTextInput";
import TagPills from "../../components/TagPills";
import {
  getNotes,
  addOrUpdateNote,
  archiveNote,
  deleteNote,
} from "../../utils/notes";
import { useTheme } from "../../components/ThemeProvider";

export default function NoteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState({
    title: "",
    body: "",
    tags: [],
    archived: false,
  });
  const [isNew, setIsNew] = useState(id === "new");
  const [input, setInput] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    if (id === "new") {
      setIsNew(true);
      setNote({ title: "", body: "", tags: [], archived: false });
      setInput("");
    } else {
      getNotes(true).then((notes) => {
        const n = notes.find((x) => x.id === id);
        if (n) setNote(n);
        setInput("");
        setIsNew(false);
      });
    }
  }, [id]);

  const update = (fields) => setNote((n) => ({ ...n, ...fields }));

  async function saveHandler() {
    let finalNote = { ...note };
    if (input.trim() && !finalNote.tags.includes(input.trim())) {
      finalNote.tags = [...(finalNote.tags || []), input.trim()];
    }
    setInput("");
    if (!finalNote.title.trim() && !finalNote.body.trim()) {
      Alert.alert("Empty note", "Add a title or body to save.");
      return;
    }
    await addOrUpdateNote(finalNote);
    router.back();
  }

  async function archiveHandler() {
    if (!isNew && note.id) {
      await archiveNote(note.id);
      router.back();
    }
  }

  async function deleteHandler() {
    if (!isNew && note.id) {
      Alert.alert("Delete?", "This note will be permanently deleted.", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteNote(note.id);
            router.back();
          },
        },
      ]);
    }
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title={isNew ? "New Note" : "Edit Note"} showArchive={false} />
      <View style={{ flex: 1, padding: 18 }}>
        <ThemedTextInput
          placeholder="Title"
          value={note.title}
          onChangeText={(t) => update({ title: t })}
          style={{ fontWeight: "bold", fontSize: 22, marginBottom: 10 }}
        />
        <ThemedTextInput
          placeholder="Type your note here..."
          value={note.body}
          onChangeText={(t) => update({ body: t })}
          style={{ fontSize: 17, minHeight: 110, textAlignVertical: "top" }}
          multiline
        />
        <TagPills
          tags={note.tags}
          input={input}
          onInputChange={setInput}
          editable
          onAdd={(tag) => update({ tags: [...(note.tags || []), tag] })}
          onRemove={(tag) =>
            update({ tags: (note.tags || []).filter((t) => t !== tag) })
          }
        />
        <View style={{ flexDirection: "row", marginTop: 12, gap: 14 }}>
          <TouchableOpacity
            onPress={saveHandler}
            style={{
              backgroundColor: theme.accent,
              padding: 14,
              borderRadius: 8,
              flex: 1,
            }}
          >
            <Text
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              Save
            </Text>
          </TouchableOpacity>
          {!isNew && (
            <TouchableOpacity
              onPress={archiveHandler}
              style={{
                backgroundColor: theme.pill,
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: theme.accent, fontWeight: "bold" }}>
                Archive
              </Text>
            </TouchableOpacity>
          )}
          {!isNew && (
            <TouchableOpacity
              onPress={deleteHandler}
              style={{
                backgroundColor: "#EC4899",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ThemedView>
  );
}
