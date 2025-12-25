import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ThemedView from "../components/ThemedView";
import Header from "../components/Header";
import { getNotes } from "../utils/notes";
import { useRouter } from "expo-router";
import { useTheme } from "../components/ThemeProvider";

export default function TagsScreen() {
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const load = async () => {
      const notes = await getNotes(true);
      setTags(Array.from(new Set(notes.flatMap((n) => n.tags || []))));
    };
    load();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title="Tags" showArchive={false} />
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", padding: 20, gap: 10 }}
      >
        {tags.length === 0 ? (
          <Text style={{ color: theme.text, opacity: 0.7 }}>No tags found</Text>
        ) : (
          tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={{
                backgroundColor: theme.pill,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 7,
                marginRight: 10,
                marginBottom: 10,
              }}
              onPress={() => router.push({ pathname: "/", params: { tag } })}
            >
              <Text
                style={{
                  color: theme.accent,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ThemedView>
  );
}
