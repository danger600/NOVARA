import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { useI18n } from "@/lib/i18n";

const modules = [
  { id: "tasks", href: "/tasks", icon: "checkbox-outline" as const },
  { id: "notes", href: "/notes", icon: "document-text-outline" as const },
  { id: "goals", href: "/goals", icon: "flag-outline" as const },
  { id: "calendar", href: "/calendar", icon: "calendar-outline" as const },
  { id: "learning", href: "/learning", icon: "school-outline" as const },
  { id: "business", href: "/business", icon: "briefcase-outline" as const },
  { id: "ai", href: "/ai", icon: "sparkles-outline" as const },
  { id: "analytics", href: "/analytics", icon: "analytics-outline" as const },
  { id: "messages", href: "/messages", icon: "chatbubbles-outline" as const },
  { id: "notifications", href: "/notifications", icon: "notifications-outline" as const },
  { id: "settings", href: "/settings", icon: "settings-outline" as const },
  { id: "help", href: "/help", icon: "help-circle-outline" as const },
] as const;

export default function WorkspaceScreen() {
  const { messages } = useI18n();
  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.brand}><View style={styles.brandIcon}><Ionicons name="aperture" size={18} color={theme.colors.gold} /></View><Text style={styles.brandText}>NOVARA</Text></View>
    <Text style={styles.kicker}>{messages.workspace.kicker}</Text><Text style={styles.title}>{messages.workspace.title}</Text><Text style={styles.sub}>{messages.workspace.subtitle}</Text>
    <View style={styles.banner}><Ionicons name="layers-outline" size={25} color={theme.colors.gold} /><View style={{flex:1}}><Text style={styles.bannerTitle}>{messages.workspace.bannerTitle}</Text><Text style={styles.bannerText}>{messages.workspace.bannerText}</Text></View></View>
    <View style={styles.grid}>{modules.map((item) => {
      const copy = messages.workspace.modules[item.id];
      return <Link key={item.id} href={item.href} asChild><Pressable accessibilityRole="button" style={styles.card}>
        <View style={styles.cardIcon}><Ionicons name={item.icon} size={21} color={theme.colors.navy} /></View>
        <Text style={styles.cardTitle}>{copy.title}</Text><Text style={styles.cardDetail}>{copy.detail}</Text>
        <View style={styles.cardArrow}><Ionicons name="arrow-up-right-box" size={16} color={theme.colors.goldDeep} /></View>
      </Pressable></Link>;
    })}</View>
    <View style={styles.tip}><Ionicons name="shield-checkmark-outline" size={18} color={theme.colors.navy} /><Text style={styles.tipText}>{messages.workspace.tip}</Text></View>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20, paddingBottom: 40, gap: 15, width: "100%", maxWidth: 1040, alignSelf: "center" },
  brand: { flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 9 },
  brandIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: theme.colors.navy, alignItems: "center", justifyContent: "center" },
  brandText: { color: theme.colors.navy, fontSize: 14, fontWeight: "900", letterSpacing: 2.5 },
  kicker: { color: theme.colors.goldDeep, fontSize: 10, fontWeight: "900", letterSpacing: 2 },
  title: { color: theme.colors.navy, fontSize: 32, fontWeight: "900" },
  sub: { color: theme.colors.muted, fontSize: 13, lineHeight: 20 },
  banner: { backgroundColor: theme.colors.navy, borderRadius: 19, padding: 17, flexDirection: "row", alignItems: "center", gap: 13, marginVertical: 5 },
  bannerTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  bannerText: { color: "#C7D0DE", fontSize: 10, marginTop: 4 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 11 },
  card: { width: "48%", flexGrow: 1, minWidth: 145, backgroundColor: theme.colors.surface, borderRadius: 17, borderWidth: 1, borderColor: theme.colors.border, padding: 14, minHeight: 137 },
  cardIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: "#F1EBDD", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  cardTitle: { color: theme.colors.text, fontSize: 12, fontWeight: "800" },
  cardDetail: { color: theme.colors.muted, fontSize: 10, lineHeight: 15, marginTop: 5, paddingRight: 8 },
  cardArrow: { position: "absolute", right: 12, top: 13 },
  tip: { backgroundColor: "#E9F0FA", borderRadius: 14, padding: 13, flexDirection: "row", gap: 9, alignItems: "flex-start", marginTop: 4 },
  tipText: { flex: 1, color: theme.colors.navy, fontSize: 10, lineHeight: 16 },
});
