import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/constants/theme";
import { LocalizationProvider } from "@/lib/i18n";

export default function RootLayout() {
  return (
    <LocalizationProvider>
      <StatusBar style="light" backgroundColor={theme.colors.navy} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }} />
    </LocalizationProvider>
  );
}
