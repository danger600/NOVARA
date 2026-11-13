import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { useI18n } from "@/lib/i18n";

export default function WorkspaceScreen() {
  const { t } = useI18n();
  const modules = [
    { title: t("moduleTasks"), detail: t("moduleTasksDetail"), icon: "checkbox-outline" as const, href: "/tasks" as const },
    { title: t("moduleNotes"), detail: t("moduleNotesDetail"), icon: "document-text-outline" as const, href: "/notes" as const },
    { title: t("moduleGoals"), detail: t("moduleGoalsDetail"), icon: "flag-outline" as const, href: "/goals" as const },
    { title: t("moduleCalendar"), detail: t("moduleCalendarDetail"), icon: "calendar-outline" as const, href: "/calendar" as const },
    { title: t("moduleLearning"), detail: t("moduleLearningDetail"), icon: "school-outline" as const, href: "/learning" as const },
    { title: t("moduleBusiness"), detail: t("moduleBusinessDetail"), icon: "briefcase-outline" as const, href: "/business" as const },
    { title: t("moduleAI"), detail: t("moduleAIDetail"), icon: "sparkles-outline" as const, href: "/ai" as const },
    { title: t("moduleAnalytics"), detail: t("moduleAnalyticsDetail"), icon: "analytics-outline" as const, href: "/analytics" as const },
    { title: t("moduleMessages"), detail: t("moduleMessagesDetail"), icon: "chatbubbles-outline" as const, href: "/messages" as const },
    { title: t("moduleNotifications"), detail: t("moduleNotificationsDetail"), icon: "notifications-outline" as const, href: "/notifications" as const },
    { title: t("moduleSettings"), detail: t("moduleSettingsDetail"), icon: "settings-outline" as const, href: "/settings" as const },
    { title: t("moduleHelp"), detail: t("moduleHelpDetail"), icon: "help-circle-outline" as const, href: "/help" as const },
  ];

  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.brand}><View style={styles.brandIcon}><Ionicons name="aperture" size={18} color={theme.colors.gold} /></View><Text style={styles.brandText}>NOVARA</Text></View>
    <Text style={styles.kicker}>{t("workspaceEyebrow")}</Text><Text style={styles.title}>{t("workspaceTitle")}</Text><Text style={styles.sub}>{t("workspaceDescription")}</Text>
    <View style={styles.banner}><Ionicons name="layers-outline" size={25} color={theme.colors.gold} /><View style={{flex:1}}><Text style={styles.bannerTitle}>{t("workspaceBannerTitle")}</Text><Text style={styles.bannerText}>{t("workspaceBannerBody")}</Text></View></View>
    <View style={styles.grid}>{modules.map((item) => <Link key={item.href} href={item.href} asChild><Pressable accessibilityRole="button" style={styles.card}><View style={styles.cardIcon}><Ionicons name={item.icon} size={21} color={theme.colors.navy} /></View><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardDetail}>{item.detail}</Text><View style={styles.cardArrow}><Ionicons name="arrow-up-right-box" size={16} color={theme.colors.goldDeep} /></View></Pressable></Link>)}</View>
    <View style={styles.tip}><Ionicons name="shield-checkmark-outline" size={18} color={theme.colors.navy} /><Text style={styles.tipText}>{t("workspaceNotice")}</Text></View>
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