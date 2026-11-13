import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { useI18n, type Locale, type MessageKey } from "@/lib/i18n";

const languages: { code: Locale; native: string; label: MessageKey }[] = [
  { code: "en", native: "English", label: "languageEnglish" },
  { code: "rw", native: "Ikinyarwanda", label: "languageKinyarwanda" },
  { code: "fr", native: "Français", label: "languageFrench" },
];

export default function SettingsScreen() {
  const { locale, setLocale, t, preferenceError } = useI18n();
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.brand}><Ionicons name="aperture" size={22} color={theme.colors.goldDeep} /><Text style={styles.brandText}>NOVARA</Text></View>
        <Text style={styles.kicker}>{t("settingsEyebrow")}</Text>
        <Text style={styles.title}>{t("settingsTitle")}</Text>
        <Text style={styles.sub}>{t("settingsSub")}</Text>
        <Text style={styles.section}>{t("chooseLanguage")}</Text>
        {languages.map((language) => (
          <Pressable
            key={language.code}
            onPress={() => setLocale(language.code)}
            style={styles.option}
            accessibilityRole="radio"
            accessibilityState={{ selected: locale === language.code }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.language}>{language.native}</Text>
              <Text style={styles.english}>{t(language.label)}</Text>
            </View>
            <Ionicons name={locale === language.code ? "radio-button-on" : "radio-button-off"} size={21} color={locale === language.code ? theme.colors.goldDeep : theme.colors.muted} />
          </Pressable>
        ))}
        <View style={styles.notice}>
          <Ionicons name="phone-portrait-outline" size={18} color={theme.colors.navy} />
          <Text style={styles.noticeText}>{preferenceError ? t("languageSaveFailed") : t("languageSaved")}</Text>
        </View>
        <View style={styles.notice}>
          <Ionicons name="information-circle-outline" size={18} color={theme.colors.navy} />
          <Text style={styles.noticeText}>{t("settingsSaved")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 22, gap: 14, width: "100%", maxWidth: 760, alignSelf: "center" },
  brand: { flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 12 },
  brandText: { fontSize: 15, fontWeight: "900", letterSpacing: 2, color: theme.colors.navy },
  kicker: { fontSize: 10, fontWeight: "900", letterSpacing: 2, color: theme.colors.goldDeep },
  title: { fontSize: 30, fontWeight: "900", color: theme.colors.navy },
  sub: { fontSize: 13, lineHeight: 19, color: theme.colors.muted, marginBottom: 8 },
  section: { color: theme.colors.muted, fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  option: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 15, padding: 16, flexDirection: "row", alignItems: "center" },
  language: { fontSize: 14, fontWeight: "800", color: theme.colors.text },
  english: { fontSize: 11, color: theme.colors.muted, marginTop: 4 },
  notice: { flexDirection: "row", gap: 10, padding: 14, borderRadius: 14, backgroundColor: "#E9F0FA" },
  noticeText: { flex: 1, color: theme.colors.navy, fontSize: 11, lineHeight: 17 },
});