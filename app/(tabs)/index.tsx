import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View, Pressable, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { useI18n } from "@/lib/i18n";



export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const wide = width >= 760;
  const { messages } = useI18n();
  const quickActions = [
    { icon: "sparkles-outline" as const, title: messages.home.ai, detail: messages.home.aiDetail, tint: "#F1EBDD", href: "/ai" as const },
    { icon: "book-outline" as const, title: messages.home.learning, detail: messages.home.learningDetail, tint: "#E9F0FA", href: "/learning" as const },
    { icon: "layers-outline" as const, title: messages.home.projects, detail: messages.home.projectsDetail, tint: "#ECEBFA", href: "/business" as const },
    { icon: "analytics-outline" as const, title: messages.home.insights, detail: messages.home.insightsDetail, tint: "#E7F2EE", href: "/analytics" as const },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={[styles.content, wide && styles.wideContent]}>
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}><Ionicons name="aperture" size={22} color={theme.colors.gold} /></View>
            <Text style={styles.brand}>NOVARA</Text>
          </View>
          <Link href="/notifications" asChild><Pressable accessibilityRole="button" accessibilityLabel={messages.home.notifications} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={21} color={theme.colors.text} />
            <View style={styles.notificationDot} />
          </Pressable></Link>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroGlow} />
          <Text style={styles.eyebrow}>{messages.home.eyebrow}</Text>
          <Text style={styles.heroTitle}>{messages.home.title}</Text>
          <Text style={styles.heroCopy}>{messages.home.description}</Text>
          <Link href="/discover" asChild><Pressable accessibilityRole="button" style={styles.heroButton}>
            <Text style={styles.heroButtonText}>{messages.home.explore}</Text>
            <Ionicons name="arrow-forward" size={17} color={theme.colors.navy} />
          </Pressable></Link>
          <View style={styles.heroOrb}><Ionicons name="aperture" size={76} color="#D9C58D" /></View>
        </View>

        <View style={styles.sectionHeading}>
          <View><Text style={styles.sectionTitle}>{messages.home.overview}</Text><Text style={styles.sectionSub}>{messages.home.freshStart}</Text></View>
          <Text style={styles.today}>{messages.home.today}</Text>
        </View>

        <View style={[styles.statsRow, wide && styles.statsRowWide]}>
          <View style={styles.statCard}><Text style={styles.statLabel}>{messages.home.activeProjects}</Text><Text style={styles.statValue}>—</Text><Text style={styles.statFoot}>{messages.home.readyWhen}</Text></View>
          <View style={styles.statCard}><Text style={styles.statLabel}>{messages.home.learningTime}</Text><Text style={styles.statValue}>—</Text><Text style={styles.statFoot}>{messages.home.journeyStarts}</Text></View>
          <View style={styles.statCard}><Text style={styles.statLabel}>{messages.home.momentum}</Text><Text style={styles.statValue}>{messages.home.newLabel}</Text><Text style={styles.statFoot}>{messages.home.buildHabit}</Text></View>
        </View>

        <View style={styles.sectionHeading}><View><Text style={styles.sectionTitle}>{messages.home.possibilities}</Text><Text style={styles.sectionSub}>{messages.home.chooseBegin}</Text></View></View>
        <View style={[styles.actionGrid, wide && styles.actionGridWide]}>
          {quickActions.map((item) => (
            <Link key={item.title} href={item.href} asChild><Pressable accessibilityRole="button" style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: item.tint }]}><Ionicons name={item.icon} size={22} color={theme.colors.navy} /></View>
              <View style={{ flex: 1 }}><Text style={styles.actionTitle}>{item.title}</Text><Text style={styles.actionDetail}>{item.detail}</Text></View>
              <Ionicons name="arrow-up-right-box" size={18} color={theme.colors.muted} />
            </Pressable></Link>
          ))}
        </View>

        <View style={styles.footer}><Text style={styles.footerBrand}>NOVARA</Text><Text style={styles.footerCopy}>{messages.home.tagline}</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20, paddingBottom: 36, gap: 24, width: "100%", maxWidth: 1120, alignSelf: "center" },
  wideContent: { paddingHorizontal: 34, gap: 28 },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandMark: { width: 38, height: 38, borderRadius: 13, backgroundColor: theme.colors.navy, alignItems: "center", justifyContent: "center" },
  brand: { color: theme.colors.navy, fontSize: 17, letterSpacing: 3, fontWeight: "800" },
  iconButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: theme.colors.surface, alignItems: "center", justifyContent: "center" },
  notificationDot: { position: "absolute", width: 7, height: 7, borderRadius: 4, backgroundColor: theme.colors.goldDeep, top: 9, right: 10 },
  hero: { minHeight: 265, borderRadius: 28, backgroundColor: theme.colors.navy, padding: 26, overflow: "hidden", justifyContent: "center" },
  heroGlow: { position: "absolute", width: 240, height: 240, borderRadius: 120, backgroundColor: "#243654", right: -75, top: -80 },
  eyebrow: { color: theme.colors.gold, fontSize: 10, fontWeight: "800", letterSpacing: 2.4, marginBottom: 13 },
  heroTitle: { color: "#FFFFFF", fontSize: 34, lineHeight: 39, fontWeight: "700", maxWidth: 360 },
  heroCopy: { color: "#C7D0DE", fontSize: 13, lineHeight: 20, marginTop: 10, maxWidth: 330 },
  heroButton: { marginTop: 20, borderRadius: 14, backgroundColor: theme.colors.gold, paddingHorizontal: 16, paddingVertical: 12, alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 12 },
  heroButtonText: { color: theme.colors.navy, fontSize: 12, fontWeight: "800" },
  heroOrb: { position: "absolute", right: 28, bottom: 26, opacity: 0.82 },
  sectionHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { color: theme.colors.text, fontSize: 19, fontWeight: "800" },
  sectionSub: { color: theme.colors.muted, fontSize: 12, marginTop: 4 },
  today: { color: theme.colors.goldDeep, fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  statsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  statsRowWide: { flexWrap: "nowrap" },
  statCard: { flexGrow: 1, flexBasis: 100, backgroundColor: theme.colors.surface, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: theme.colors.border },
  statLabel: { color: theme.colors.muted, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  statValue: { color: theme.colors.navy, fontSize: 25, fontWeight: "800", marginTop: 10 },
  statFoot: { color: theme.colors.muted, fontSize: 10, marginTop: 5 },
  actionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  actionGridWide: { flexWrap: "nowrap" },
  actionCard: { minWidth: "47%", flexGrow: 1, backgroundColor: theme.colors.surface, borderRadius: 18, padding: 15, borderWidth: 1, borderColor: theme.colors.border, flexDirection: "row", alignItems: "center", gap: 11 },
  actionIcon: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  actionTitle: { color: theme.colors.text, fontSize: 12, fontWeight: "800" },
  actionDetail: { color: theme.colors.muted, fontSize: 10, marginTop: 4 },
  footer: { borderTopWidth: 1, borderTopColor: theme.colors.border, paddingTop: 18, alignItems: "center" },
  footerBrand: { color: theme.colors.navy, fontWeight: "800", letterSpacing: 3, fontSize: 11 },
  footerCopy: { color: theme.colors.muted, fontSize: 10, marginTop: 5 },
});