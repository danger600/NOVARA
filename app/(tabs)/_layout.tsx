import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { useI18n } from "@/lib/i18n";

export default function TabLayout() {
  const { t } = useI18n();
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.goldDeep,
      tabBarInactiveTintColor: theme.colors.muted,
      tabBarStyle: { height: 72, paddingTop: 9, paddingBottom: 10, borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface, elevation: 0 },
      tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
    }}>
      <Tabs.Screen name="index" options={{ title: t("home"), tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="discover" options={{ title: t("discover"), tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="tasks" options={{ title: t("tasks"), tabBarIcon: ({ color, size }) => <Ionicons name="checkbox-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="workspace" options={{ title: t("workspace"), tabBarIcon: ({ color, size }) => <Ionicons name="briefcase-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: t("profile"), tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="settings" options={{ title: t("settings"), tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}