import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

const FONTS = [
  { name: "System", fontFamily: undefined },
  { name: "PTSerif", fontFamily: "PTSerif_400Regular" },
  { name: "RobotoMono", fontFamily: "RobotoMono_400Regular" },
];

const LIGHT = (fontFamily) => ({
  isDark: false,
  background: "#FFF",
  card: "#f9f9f9",
  text: "#222",
  accent: "#5c62f5",
  pill: "#ececff",
  fontFamily,
});
const DARK = (fontFamily) => ({
  isDark: true,
  background: "#181824",
  card: "#232336",
  text: "#f8f8ff",
  accent: "#5c62f5",
  pill: "#292e7a",
  fontFamily,
});

const ThemeContext = createContext();
const ACCENTS = ["#5c62f5", "#FB923C", "#22D3EE", "#A21CAF"];
const FONT_KEY = "fontFamily";

export function ThemeProvider({ children }) {
  const colorScheme = Appearance.getColorScheme();
  const [fontFamily, setFontFamily] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [theme, setTheme] = useState(colorScheme === "dark" ? DARK() : LIGHT());
  const [accent, setAccent] = useState(LIGHT().accent);
  const [mode, setMode] = useState("system");

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        PTSerif_400Regular: require("../assets/font/PTSerif-Regular.ttf"),
        RobotoMono_400Regular: require("../assets/font/RobotoMono-Regular.ttf"),
      });
      setFontsLoaded(true);
      const modeValue = (await AsyncStorage.getItem("themeMode")) || "system";
      setMode(modeValue);
      const accentColor = (await AsyncStorage.getItem("accentColor")) || LIGHT().accent;
      setAccent(accentColor);
      const storedFont = await AsyncStorage.getItem(FONT_KEY);
      setFontFamily(storedFont);
      setTheme(getTheme(modeValue, accentColor, storedFont));
    })();
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (mode === "system") setTheme(getTheme("system", accent, fontFamily));
    });
    return () => sub.remove();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTheme(getTheme(mode, accent, fontFamily));
    // eslint-disable-next-line
  }, [mode, accent, fontFamily]);

  function getTheme(mode, accent, font) {
    const base = mode === "system"
      ? (Appearance.getColorScheme() === "dark" ? DARK(font) : LIGHT(font))
      : mode === "dark"
        ? DARK(font)
        : LIGHT(font);
    base.accent = accent;
    return base;
  }
  const changeMode = async (m) => {
    setMode(m);
    await AsyncStorage.setItem("themeMode", m);
    setTheme(getTheme(m, accent, fontFamily));
  };
  const changeAccent = async (color) => {
    setAccent(color);
    await AsyncStorage.setItem("accentColor", color);
    setTheme(getTheme(mode, color, fontFamily));
  };
  const changeFont = async (ff) => {
    setFontFamily(ff);
    await AsyncStorage.setItem(FONT_KEY, ff);
    setTheme(getTheme(mode, accent, ff));
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, accent, setMode: changeMode, setAccent: changeAccent, accents: ACCENTS,
      fontFamily, setFontFamily: changeFont, fonts: FONTS, fontsLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
