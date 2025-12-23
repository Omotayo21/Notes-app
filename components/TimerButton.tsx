import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

interface TimerButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  color: string;
}

export const TimerButton: React.FC<TimerButtonProps> = ({
  label,
  isActive,
  onPress,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 26,
    backgroundColor: "transparent",
  },
  text: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  activeText: {
    color: Colors.background,
  },
});
