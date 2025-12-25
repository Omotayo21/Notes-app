import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useTheme } from "./ThemeProvider";
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const tabs = [
  {
    name: "Home",
    route: "/",
    icon: (color) => <Feather name="home" size={24} color={color} />,
  },
  {
    name: "Archives",
    route: "/archive",
    icon: (color) => (
      <Ionicons name="archive-outline" size={24} color={color} />
    ),
  },
  {
    name: "Tags",
    route: "/tags",
    icon: (color) => <FontAwesome5 name="tags" size={22} color={color} />,
  },
  {
    name: "Settings",
    route: "/settings",
    icon: (color) => <Feather name="settings" size={23} color={color} />,
  },
];

export default function TabBar() {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: theme.card,
        borderTopWidth: 1,
        borderColor: theme.pill,
        paddingVertical: 4,
      }}
    >
      {tabs.map((tab) => {
        // Matches route exactly, or as prefix for subroutes (e.g. /settings/other)
        const isActive =
          pathname === tab.route ||
          (tab.route !== "/" && pathname.startsWith(tab.route));
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.replace(tab.route)}
            style={{ alignItems: "center", flex: 1, padding: 8 }}
          >
            {tab.icon(isActive ? theme.accent : theme.text)}
            <Text
              style={{
                color: isActive ? theme.accent : theme.text,
                fontSize: 12,
                fontWeight: isActive ? "bold" : "normal",
                marginTop: 1,
                fontFamily: theme.fontFamily,
              }}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
