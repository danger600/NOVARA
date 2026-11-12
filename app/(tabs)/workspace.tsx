import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";

const modules = [
  { title: "Tasks & focus", detail: "Priorities and action lists", icon: "checkbox-outline" as const, href: "/tasks" as const },
  { title: "Notes & ideas", detail: "Capture and organize knowledge", icon: "document-text-outline" as const, href: "/notes" as const },
  { title: "Goals & habits", detail: "Build momentum over time", icon: "flag-outline" as const, href: "/goals" as const },
  { title: "Calendar", detail: "Events and planning", icon: "calendar-outline" as const, href: "/calendar" as const },
  { title: "Learning studio", detail: "Skills and study paths", icon: "school-outline" as const, href: "/learning" as const },
  { title: "Business hub", detail: "Teams and operations", icon: "briefcase-outline" as const, href: "/business" as const },
  { title: "NOVARA AI", detail: "Intelligent workflows (planned)", icon: "sparkles-outline" as const, href: "/ai" as const },
  { title: "Analytics", detail: "Progress and reports", icon: "analytics-outline" as const, href: "/analytics" as const },
  { title: "Messages", detail: "Collaboration (planned)", icon: "chatbubbles-outline" as const, href: "/messages" as const },
  { title: "Notifications", detail: "Updates and reminders", icon: "notifications-outline" as const, href: "/notifications" as const },
  { title: "Settings", detail: "Preferences and controls", icon: "settings-outline" as const, href: "/settings" as const },
  { title: "Help center", detail: "Guides and support", icon: "help-circle-outline" as const, href: "/help" as const },
];

export default function WorkspaceScreen() {
  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.brand}><View style={styles.brandIcon}><Ionicons name="aperture" size={18} color={theme.colors.gold} /></View><Text style={styles.brandText}>NOVARA</Text></View>
    <Text style={styles.kicker}>YOUR DIGITAL HQ</Text><Text style={styles.title}>Workspace</Text><Text style={styles.sub}>Your tools for planning, learning, creating, and working — organized in one place.</Text>
    <View style={styles.banner}><Ionicons name="layers-outline" size={25} color={theme.colors.gold} /><View style={{flex:1}}><Text style={styles.bannerTitle}>One connected workspace</Text><Text style={styles.bannerText}>Open a module to explore its current capabilities.</Text></View></View>
    <View style={styles.grid}>{modules.map((item) => <Link key={item.title} href={item.href} asChild><Pressable accessibilityRole="button" style={styles.card}><View style={styles.cardIcon}><Ionicons name={item.icon} size={21} color={theme.colors.navy} /></View><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardDetail}>{item.detail}</Text><View style={styles.cardArrow}><Ionicons name="arrow-up-right" size={16} color={theme.colors.goldDeep} /></View></Pressable></Link>)}</View>
    <View style={styles.tip}><Ionicons name="shield-checkmark-outline" size={18} color={theme.colors.navy} /><Text style={styles.tipText}>Some modules are interactive previews. Cloud sync, authentication, messaging, and AI services are not connected yet.</Text></View>
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