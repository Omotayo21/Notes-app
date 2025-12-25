import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'themeMode';
const ACCENT_KEY = 'accentColor';

export async function getThemeMode() {
  return (await AsyncStorage.getItem(THEME_KEY)) || 'system';
}
export async function setThemeMode(mode) {
  await AsyncStorage.setItem(THEME_KEY, mode);
}
export async function getAccentColor() {
  return (await AsyncStorage.getItem(ACCENT_KEY)) || '#5c62f5';
}
export async function setAccentColor(color) {
  await AsyncStorage.setItem(ACCENT_KEY, color);
}

