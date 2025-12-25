import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Header from "../components/Header";
import ThemedView from "../components/ThemedView";
import { useTheme } from "../components/ThemeProvider";

export default function SettingsScreen() {
  const {
    mode,
    setMode,
    accent,
    setAccent,
    accents,
    theme,
    fontFamily,
    setFontFamily,
    fonts,
    fontsLoaded,
  } = useTheme();
  if (!fontsLoaded) return null;

  // Optional: Set bg color in web body correctly (fixes white flashes)
  useEffect(() => {
    if (Platform.OS !== "web") return;
    document.body.style.backgroundColor = theme.card;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [theme.card]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title="Settings" />
      <View style={{ padding: 22 }}>
        <Text
          style={{
            color: theme.text,
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 8,
            fontFamily: theme.fontFamily,
          }}
        >
          Theme
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 24, gap: 10 }}>
          {["system", "light", "dark"].map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setMode(m)}
              style={{
                backgroundColor: mode === m ? theme.accent : theme.card,
                borderColor: theme.pill,
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 18,
                paddingVertical: 8,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  color: mode === m ? "#fff" : theme.text,
                  fontWeight: "bold",
                  fontFamily: theme.fontFamily,
                }}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={{
            color: theme.text,
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 8,
            fontFamily: theme.fontFamily,
          }}
        >
          Accent Color
        </Text>
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 18 }}>
          {accents.map((c) => (
            <TouchableOpacity key={c} onPress={() => setAccent(c)}>
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  marginRight: 12,
                  backgroundColor: c,
                  borderWidth: 3,
                  borderColor: accent === c ? theme.text : "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {accent === c && (
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      backgroundColor: theme.background,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={{
            color: theme.text,
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 8,
            fontFamily: theme.fontFamily,
          }}
        >
          Font
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 18, gap: 10 }}>
          {fonts.map((font) => (
            <TouchableOpacity
              key={font.name}
              onPress={() => setFontFamily(font.fontFamily)}
              style={{
                backgroundColor:
                  fontFamily === font.fontFamily ? theme.accent : theme.card,
                borderColor: theme.pill,
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: font.fontFamily || undefined,
                  color: fontFamily === font.fontFamily ? "#fff" : theme.text,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {font.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={{
            color: theme.text,
            opacity: 0.8,
            fontFamily: theme.fontFamily,
          }}
        >
          Switch theme, accent and font for the whole app. "System" follows your
          device’s dark/light.
        </Text>
      </View>
    </ThemedView>
  );
}
