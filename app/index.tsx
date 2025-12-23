import React, {useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { CircularProgress } from "../components/CircularProgress";
import { TimerButton } from "../components/TimerButton";
import { SettingsModal } from "../components/SettingsModal";
import { useTimer } from "../hooks/useTimer";
import { Colors } from "../constants/Colors";
import * as SplashScreen from "expo-splash-screen";
import * as Haptics from 'expo-haptics'

SplashScreen.preventAutoHideAsync();
export default function Index() {
    useEffect(() => {
      SplashScreen.hideAsync();
    }, []);
  const {
    mode,
    settings,
    timeLeft,
    isRunning,
    settingsVisible,
    setSettingsVisible,
    toggleTimer,
    changeMode,
    formatTime,
    getProgress,
    saveSettings,
  } = useTimer();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>pomodoro</Text>

        {/* Mode Selector */}
        <View style={styles.modeSelector}>
          <TimerButton
            label="pomodoro"
            isActive={mode === "pomodoro"}
            onPress={() => changeMode("pomodoro")}
            color={settings.color}
          />
          <TimerButton
            label="short break"
            isActive={mode === "short"}
            onPress={() => changeMode("short")}
            color={settings.color}
          />
          <TimerButton
            label="long break"
            isActive={mode === "long"}
            onPress={() => changeMode("long")}
            color={settings.color}
          />
        </View>

        {/* Timer Circle */}
        <View style={styles.timerContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <CircularProgress
                size={280}
                strokeWidth={10}
                progress={getProgress()}
                color={settings.color}
              />
              <View style={styles.timerContent}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                <TouchableOpacity onPress={toggleTimer}>
                  <Text style={styles.actionText}>
                    {isRunning ? "PAUSE" : "START"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setSettingsVisible(true)}}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Modal */}
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        settings={settings}
        onSave={saveSettings}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 40,
  },
  modeSelector: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 31,
    padding: 8,
    marginBottom: 60,
  },
  timerContainer: {
    marginBottom: 60,
  },
  outerCircle: {
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "#0E112A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#272C5A",
    shadowOffset: { width: -50, height: -50 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 10,
  },
  innerCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  timerContent: {
    position: "absolute",
    alignItems: "center",
  },
  timerText: {
    fontSize: 80,
    fontWeight: "700",
    color: Colors.text,
    letterSpacing: -4,
    marginBottom: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    letterSpacing: 13,
  },
  settingsButton: {
    padding: 10,
  },
  settingsIcon: {
    fontSize: 24,
  },
});
