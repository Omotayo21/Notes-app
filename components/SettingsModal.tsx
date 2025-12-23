import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Colors } from "../constants/Colors";
import * as Haptics from "expo-haptics"
interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  settings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    color: string;
  };
  onSave: (settings: any) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  settings,
  onSave,
}) => {
  const [pomodoro, setPomodoro] = useState(settings.pomodoro.toString());
  const [shortBreak, setShortBreak] = useState(settings.shortBreak.toString());
  const [longBreak, setLongBreak] = useState(settings.longBreak.toString());
  const [selectedColor, setSelectedColor] = useState(settings.color);

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSave({
      pomodoro: parseInt(pomodoro) || 25,
      shortBreak: parseInt(shortBreak) || 5,
      longBreak: parseInt(longBreak) || 15,
      color: selectedColor,
    });
    onClose();
  };

  const colors = [
    { name: "red", value: Colors.red },
    { name: "cyan", value: Colors.cyan },
    { name: "purple", value: Colors.purple },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.sectionTitle}>TIME (MINUTES)</Text>

            <View style={styles.timeInputs}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>pomodoro</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={pomodoro}
                    onChangeText={setPomodoro}
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>short break</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={shortBreak}
                    onChangeText={setShortBreak}
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>long break</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={longBreak}
                    onChangeText={setLongBreak}
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>COLOUR</Text>
            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.name}
                  style={[styles.colorButton, { backgroundColor: color.value }]}
                  onPress={() => {
                  
                    setSelectedColor(color.value);
                  }}
                >
            
                  {selectedColor === color.value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.applyButton} onPress={handleSave}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E1E1",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.background,
  },
  closeButton: {
    fontSize: 24,
    color: Colors.textSecondary,
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.background,
    letterSpacing: 4,
    marginBottom: 16,
    marginTop: 16,
  },
  timeInputs: {
    gap: 12,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  inputContainer: {
    backgroundColor: "#EFF1FA",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 100,
  },
  input: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.background,
    textAlign: "center",
  },
  colorOptions: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    marginVertical: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  applyButton: {
    backgroundColor: Colors.red,
    margin: 24,
    marginTop: -10,
    paddingVertical: 16,
    borderRadius: 26,
    alignItems: "center",
  },
  applyText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
