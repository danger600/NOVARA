import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";

export default function WorkspaceScreen() {
  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.kicker}>YOUR SPACE</Text><Text style={styles.title}>Workspace</Text><Text style={styles.sub}>Keep your plans, projects, and progress in one place.</Text>
    <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name="briefcase-outline" size={30} color={theme.colors.goldDeep} /></View><Text style={styles.emptyTitle}>Your workspace starts here</Text><Text style={styles.emptyText}>Create your first project when the core NOVARA workflow is defined.</Text></View>
    <View style={styles.tip}><Ionicons name="information-circle-outline" size={19} color={theme.colors.navy} /><Text style={styles.tipText}>This starter workspace is a design foundation. Project saving and cloud sync will be connected in a later milestone.</Text></View>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 22, gap: 16, width: "100%", maxWidth: 900, alignSelf: "center" },
  kicker: { color: theme.colors.goldDeep, fontSize: 10, fontWeight: "800", letterSpacing: 2.2, marginTop: 10 },
  title: { color: theme.colors.navy, fontSize: 32, fontWeight: "800" },
  sub: { color: theme.colors.muted, fontSize: 13, lineHeight: 20 },
  empty: { backgroundColor: theme.colors.surface, borderRadius: 24, borderWidth: 1, borderColor: theme.colors.border, padding: 28, alignItems: "center", marginTop: 14 },
  emptyIcon: { width: 62, height: 62, borderRadius: 20, backgroundColor: "#F1EBDD", alignItems: "center", justifyContent: "center" },
  emptyTitle: { color: theme.colors.navy, fontSize: 17, fontWeight: "800", marginTop: 17 },
  emptyText: { color: theme.colors.muted, fontSize: 12, lineHeight: 19, textAlign: "center", marginTop: 8, maxWidth: 270 },
  tip: { backgroundColor: "#E9F0FA", borderRadius: 15, padding: 14, flexDirection: "row", gap: 10, alignItems: "flex-start" },
  tipText: { flex: 1, color: theme.colors.navy, fontSize: 11, lineHeight: 17 },
});