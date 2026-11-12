import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";

const areas = [
  { icon: "bulb-outline" as const, title: "Ideas & inspiration", text: "A space for fresh thinking and creative exploration." },
  { icon: "school-outline" as const, title: "Learning journeys", text: "Build skills through focused learning experiences." },
  { icon: "people-outline" as const, title: "Community", text: "Connect, collaborate, and share what you create." },
  { icon: "sparkles-outline" as const, title: "AI experiences", text: "Discover helpful intelligent tools as they arrive." },
];

export default function DiscoverScreen() {
  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.kicker}>EXPLORE</Text><Text style={styles.title}>Find your next{ "\n" }possibility.</Text><Text style={styles.sub}>Explore the spaces that make NOVARA yours.</Text>
    {areas.map((item, index) => <View key={item.title} style={styles.card}><View style={[styles.icon, { backgroundColor: index % 2 ? "#ECEBFA" : "#F1EBDD" }]}><Ionicons name={item.icon} size={23} color={theme.colors.navy} /></View><View style={{ flex: 1 }}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardText}>{item.text}</Text></View><Ionicons name="chevron-forward" size={18} color={theme.colors.muted} /></View>)}
    <Text style={styles.note}>More experiences will be added as the product requirements are finalized.</Text>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 22, gap: 17, width: "100%", maxWidth: 900, alignSelf: "center" },
  kicker: { color: theme.colors.goldDeep, fontSize: 10, fontWeight: "800", letterSpacing: 2.2, marginTop: 10 },
  title: { color: theme.colors.navy, fontSize: 34, lineHeight: 40, fontWeight: "800" },
  sub: { color: theme.colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 8 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 18, borderWidth: 1, borderColor: theme.colors.border, padding: 16, flexDirection: "row", alignItems: "center", gap: 13 },
  icon: { width: 46, height: 46, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  cardTitle: { color: theme.colors.text, fontSize: 14, fontWeight: "800" },
  cardText: { color: theme.colors.muted, fontSize: 11, lineHeight: 17, marginTop: 4 },
  note: { color: theme.colors.muted, fontSize: 11, lineHeight: 18, marginTop: 5 },
});