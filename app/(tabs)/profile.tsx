import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { useI18n } from "@/lib/i18n";

export default function ProfileScreen() {
  const { messages } = useI18n();
  const rows = [
    { icon: "person-outline" as const, title: messages.profile.personal },
    { icon: "shield-checkmark-outline" as const, title: messages.profile.privacy },
    { icon: "notifications-outline" as const, title: messages.profile.notifications },
    { icon: "help-circle-outline" as const, title: messages.profile.help },
  ];
  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.kicker}>{messages.profile.kicker}</Text><Text style={styles.title}>{messages.profile.title}</Text>
    <View style={styles.profileCard}><View style={styles.avatar}><Ionicons name="person" size={30} color={theme.colors.gold} /></View><Text style={styles.name}>{messages.profile.welcome}</Text><Text style={styles.email}>{messages.profile.placeholder}</Text><View style={styles.tag}><Text style={styles.tagText}>{messages.profile.guest}</Text></View></View>
    <Text style={styles.section}>{messages.profile.preferences}</Text>
    {rows.map((row) => <View key={row.title} style={styles.row}><Ionicons name={row.icon} size={20} color={theme.colors.navy} /><Text style={styles.rowText}>{row.title}</Text><Ionicons name="chevron-forward" size={17} color={theme.colors.muted} /></View>)}
    <Text style={styles.disclaimer}>{messages.profile.disclaimer}</Text>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 22, gap: 15, width: "100%", maxWidth: 900, alignSelf: "center" },
  kicker: { color: theme.colors.goldDeep, fontSize: 10, fontWeight: "800", letterSpacing: 2.2, marginTop: 10 },
  title: { color: theme.colors.navy, fontSize: 32, fontWeight: "800" },
  profileCard: { backgroundColor: theme.colors.navy, borderRadius: 23, padding: 25, alignItems: "center", marginTop: 5 },
  avatar: { width: 66, height: 66, borderRadius: 23, backgroundColor: "#263653", alignItems: "center", justifyContent: "center" },
  name: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", marginTop: 14 },
  email: { color: "#C7D0DE", fontSize: 11, marginTop: 5 },
  tag: { backgroundColor: "#2B3B58", paddingHorizontal: 11, paddingVertical: 6, borderRadius: 20, marginTop: 14 },
  tagText: { color: theme.colors.gold, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  section: { color: theme.colors.muted, fontSize: 10, fontWeight: "800", letterSpacing: 1.6, marginTop: 9 },
  row: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 15, padding: 16, flexDirection: "row", alignItems: "center", gap: 13 },
  rowText: { color: theme.colors.text, flex: 1, fontSize: 13, fontWeight: "600" },
  disclaimer: { color: theme.colors.muted, fontSize: 11, lineHeight: 18, marginTop: 3 },
});
