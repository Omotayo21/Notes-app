import { Stack, Slot } from "expo-router";
import React from "react";
import { View, Image, Text } from "react-native";
import { ThemeProvider, useTheme } from "../components/ThemeProvider";
import TabBar from "../components/TabBar";

function LogoHeader() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 18,
        backgroundColor: theme.card,
        borderBottomWidth: 1,
        borderColor: theme.pill,
        paddingTop: 38,
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 36, height: 36, marginRight: 10 }}
      />
      <Text
        style={{
          color: theme.text,
          fontSize: 30,
          fontWeight: "bold",
          fontFamily: theme.fontFamily || undefined,
          fontStyle: "italic",
        }}
      >
        Notes
      </Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LogoHeader />
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <TabBar />
    </ThemeProvider>
  );
}
