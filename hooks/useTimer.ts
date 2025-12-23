import { useState, useEffect, useRef, useCallback } from 'react';
import { Audio} from "expo-av"
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from "expo-haptics";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useTimer = () => {
  const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    color: "#F87070",
  });
  // Light haptic for button presses
  const hapticLight = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Medium haptic for mode changes
  const hapticMedium = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Heavy haptic for timer complete
  const hapticHeavy = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  // Notification haptic for timer complete
  const hapticNotification = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
    requestNotificationPermissions();
    loadSound();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem("pomodoroSettings");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        setTimeLeft(parsed.pomodoro * 60);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const saveSettings = async (newSettings: typeof settings) => {
    try {
      await AsyncStorage.setItem(
        "pomodoroSettings",
        JSON.stringify(newSettings)
      );
      setSettings(newSettings);

      // Update time based on current mode
      if (mode === "pomodoro") setTimeLeft(newSettings.pomodoro * 60);
      if (mode === "short") setTimeLeft(newSettings.shortBreak * 60);
      if (mode === "long") setTimeLeft(newSettings.longBreak * 60);

      setIsRunning(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/complete.mp3")
      );
      soundRef.current = sound;
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Notification permissions are required!");
    }
  };

  const playSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const sendNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: null,
    });
  };
  const handleTimerComplete = useCallback(async () => {
    setIsRunning(false);
    hapticNotification();
    playSound();

    if (mode === "pomodoro") {
      await sendNotification("Pomodoro Complete! 🎉", "Time for a break!");
    } else {
      await sendNotification("Break Complete! ⏰", "Ready to focus again?");
    }
  }, [mode]);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, handleTimerComplete]);

  const toggleTimer = () => {
    hapticLight();
    setIsRunning(!isRunning);
  };

  const changeMode = (newMode: "pomodoro" | "short" | "long") => {
    hapticMedium();
    setMode(newMode);
    setIsRunning(false);

    if (newMode === "pomodoro") setTimeLeft(settings.pomodoro * 60);
    if (newMode === "short") setTimeLeft(settings.shortBreak * 60);
    if (newMode === "long") setTimeLeft(settings.longBreak * 60);
  };

  const resetTimer = () => {
    hapticLight();
    setIsRunning(false);
    if (mode === "pomodoro") setTimeLeft(settings.pomodoro * 60);
    if (mode === "short") setTimeLeft(settings.shortBreak * 60);
    if (mode === "long") setTimeLeft(settings.longBreak * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    const totalTime =
      mode === "pomodoro"
        ? settings.pomodoro * 60
        : mode === "short"
        ? settings.shortBreak * 60
        : settings.longBreak * 60;

    return timeLeft / totalTime; // Changed from: 1 - (timeLeft / totalTime)
  };

  return {
    mode,
    settings,
    timeLeft,
    isRunning,
    settingsVisible,
    setSettingsVisible,
    toggleTimer,
    changeMode,
    resetTimer,
    formatTime,
    getProgress,
    saveSettings,
    hapticLight,
    hapticMedium,
  };
};