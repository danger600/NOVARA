import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { featureCopy, type FeatureKey } from "@/lib/feature-copy";
import { useI18n } from "@/lib/i18n";
import { usePersistentCollection } from "@/lib/usePersistentCollection";
import type { CollectionKey } from "@/lib/storage";

type Props = {
  feature: FeatureKey;
  icon: keyof typeof Ionicons.glyphMap;
  editable?: boolean;
  collectionKey?: CollectionKey;
};

export function FeatureScreen({ feature, icon, editable = false, collectionKey }: Props) {
  const { locale, t } = useI18n();
  const copy = featureCopy[locale][feature];
  const initialRecords = useMemo(() => copy.items.map((item, index) => ({
    id: `${feature}-${index}`,
    title: item.title,
    detail: item.detail,
    done: false,
  })), [copy, feature]);
  const { records, status, errorPhase, retry, addRecord, toggleRecord } =
    usePersistentCollection(collectionKey, initialRecords, editable && Boolean(collectionKey));
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const visible = useMemo(
    () => records.filter((item) => (item.title + " " + item.detail).toLowerCase().includes(query.toLowerCase())),
    [records, query],
  );
  const completed = records.filter((item) => item.done).length;
  const canEdit = editable && (status === "ready" || status === "saved");

  const handleAdd = () => {
    if (!draft.trim() || !canEdit) return;
    addRecord(draft, t("savedOnDevice"));
    setDraft("");
  };

  const statusLabel = status === "loading" ? t("loading")
    : status === "saving" ? t("saving")
    : status === "saved" ? t("saved")
    : t("ready");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.brandIcon}><Ionicons name="aperture" size={18} color={theme.colors.gold} /></View>
            <Text style={styles.brandText}>NOVARA</Text>
          </View>
          <View style={styles.previewPill}><View style={styles.dot} /><Text style={styles.previewText}>{t("previewMode")}</Text></View>
        </View>

        <Text style={styles.kicker}>{copy.eyebrow}</Text>
        <Text style={styles.title}>{copy.title}</Text>
        <Text style={styles.description}>{copy.description}</Text>

        <View style={styles.summary}>
          <View style={styles.summaryIcon}><Ionicons name={icon} size={22} color={theme.colors.goldDeep} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>{editable ? t("yourItems") : t("availableTools")}</Text>
            <Text style={styles.summarySub}>{editable ? t("completedCount").replace("{count}", String(completed)) : t("savedOnDevice")}</Text>
          </View>
          <Text style={styles.summaryCount}>{records.length}</Text>
        </View>

        {editable && (
          <View style={styles.addRow}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={handleAdd}
              placeholder={copy.inputHint ?? t("addItem")}
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
              returnKeyType="done"
              editable={canEdit}
              accessibilityLabel={copy.inputHint ?? t("addItem")}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("addItem")}
              disabled={!canEdit || !draft.trim()}
              onPress={handleAdd}
              style={[styles.addButton, (!canEdit || !draft.trim()) && styles.disabled]}
            >
              <Ionicons name="add" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        )}

        <View style={styles.search}>
          <Ionicons name="search-outline" size={18} color={theme.colors.muted} />
          <TextInput value={query} onChangeText={setQuery} placeholder={t("searchPlaceholder")} placeholderTextColor={theme.colors.muted} style={styles.searchInput} />
        </View>

        {editable && (
          <View style={styles.statusRow} accessibilityLiveRegion="polite">
            {status === "loading" || status === "saving"
              ? <ActivityIndicator size="small" color={theme.colors.goldDeep} />
              : <Ionicons name={status === "error" ? "alert-circle-outline" : "cloud-done-outline"} size={16} color={status === "error" ? "#B45309" : theme.colors.success} />}
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        )}

        {status === "error" && editable && (
          <View style={styles.errorPanel}>
            <Text style={styles.errorText}>{errorPhase === "load" ? t("storageLoadError") : t("storageSaveError")}</Text>
            <Pressable accessibilityRole="button" onPress={retry} style={styles.retryButton}>
              <Text style={styles.retryText}>{t("retry")}</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>{editable ? t("yourItems") : t("availableTools")}</Text>
          <Text style={styles.listMeta}>{t("shownCount").replace("{count}", String(visible.length))}</Text>
        </View>

        {visible.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole={editable ? "button" : undefined}
            accessibilityState={editable ? { checked: item.done } : undefined}
            disabled={!canEdit}
            onPress={() => toggleRecord(item.id)}
            style={styles.item}
          >
            <View style={[styles.itemIcon, item.done && styles.itemIconDone]}>
              <Ionicons name={item.done ? "checkmark" : "chevron-forward"} size={18} color={item.done ? "#FFFFFF" : theme.colors.navy} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.itemTitle, item.done && styles.done]}>{item.title}</Text>
              <Text style={styles.itemDetail}>{item.detail}</Text>
            </View>
            {editable && <Ionicons name={item.done ? "checkmark-circle" : "ellipse-outline"} size={19} color={item.done ? theme.colors.success : theme.colors.muted} />}
          </Pressable>
        ))}

        {visible.length === 0 && <View style={styles.empty}><Ionicons name="search-outline" size={25} color={theme.colors.muted} /><Text style={styles.emptyText}>{t("noResults")}</Text></View>}

        <View style={styles.notice}>
          <Ionicons name="information-circle-outline" size={18} color={theme.colors.navy} />
          <Text style={styles.noticeText}>{copy.previewNote ?? t("settingsSaved")}</Text>
        </View>
        <Text style={styles.footer}>NOVARA · {t("footerTagline").toUpperCase()}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20, paddingBottom: 40, gap: 14, width: "100%", maxWidth: 920, alignSelf: "center" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: theme.colors.navy, alignItems: "center", justifyContent: "center" },
  brandText: { color: theme.colors.navy, fontSize: 14, fontWeight: "900", letterSpacing: 2.5 },
  previewPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#F1EBDD", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.goldDeep },
  previewText: { color: theme.colors.navy, fontSize: 9, fontWeight: "800", letterSpacing: 0.7 },
  kicker: { color: theme.colors.goldDeep, fontSize: 10, fontWeight: "900", letterSpacing: 2 },
  title: { color: theme.colors.navy, fontSize: 32, fontWeight: "900" },
  description: { color: theme.colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 5 },
  summary: { flexDirection: "row", alignItems: "center", gap: 13, backgroundColor: theme.colors.navy, borderRadius: 20, padding: 17, marginVertical: 4 },
  summaryIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: "#2A3A56", alignItems: "center", justifyContent: "center" },
  summaryTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  summarySub: { color: "#C7D0DE", fontSize: 10, marginTop: 5 },
  summaryCount: { color: theme.colors.gold, fontSize: 24, fontWeight: "900" },
  addRow: { flexDirection: "row", gap: 9 },
  input: { flex: 1, minHeight: 48, borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, paddingHorizontal: 14, color: theme.colors.text, fontSize: 13 },
  addButton: { width: 48, borderRadius: 14, backgroundColor: theme.colors.navy, alignItems: "center", justifyContent: "center" },
  disabled: { opacity: 0.45 },
  search: { flexDirection: "row", alignItems: "center", gap: 9, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, paddingHorizontal: 13, minHeight: 46 },
  searchInput: { flex: 1, color: theme.colors.text, fontSize: 12, paddingVertical: 10 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 8, minHeight: 22 },
  statusText: { color: theme.colors.muted, fontSize: 10 },
  errorPanel: { backgroundColor: "#FFF7ED", borderColor: "#F3D2A8", borderWidth: 1, borderRadius: 14, padding: 13, gap: 10 },
  errorText: { color: "#854D0E", fontSize: 11, lineHeight: 17 },
  retryButton: { alignSelf: "flex-start", backgroundColor: theme.colors.navy, borderRadius: 10, paddingHorizontal: 13, paddingVertical: 8 },
  retryText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  listHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 },
  listTitle: { color: theme.colors.text, fontSize: 15, fontWeight: "900" },
  listMeta: { color: theme.colors.muted, fontSize: 10 },
  item: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, padding: 14 },
  itemIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: "#F1EBDD", alignItems: "center", justifyContent: "center" },
  itemIconDone: { backgroundColor: theme.colors.success },
  itemTitle: { color: theme.colors.text, fontSize: 12, fontWeight: "800" },
  done: { textDecorationLine: "line-through", color: theme.colors.muted },
  itemDetail: { color: theme.colors.muted, fontSize: 10, lineHeight: 15, marginTop: 4 },
  empty: { alignItems: "center", gap: 9, padding: 24 },
  emptyText: { color: theme.colors.muted, fontSize: 11 },
  notice: { flexDirection: "row", gap: 9, alignItems: "flex-start", backgroundColor: "#E9F0FA", borderRadius: 14, padding: 13, marginTop: 4 },
  noticeText: { flex: 1, color: theme.colors.navy, fontSize: 10, lineHeight: 16 },
  footer: { color: theme.colors.muted, fontSize: 9, letterSpacing: 1.2, textAlign: "center", marginTop: 12 },
});
