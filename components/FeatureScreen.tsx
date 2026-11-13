import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { loadCollection, saveCollection, type StoredRecord } from "@/lib/storage";
import { useI18n } from "@/lib/i18n";
import type { FeatureId } from "@/lib/translations";

type Props = { featureId: FeatureId; icon: keyof typeof Ionicons.glyphMap };

export function FeatureScreen({ featureId, icon }: Props) {
  const { messages } = useI18n();
  const copy = messages.features[featureId];
  const collection = copy.collection;
  const editable = collection !== null;
  const sampleRecords = useMemo<StoredRecord[]>(
    () => copy.items.map((item) => ({ ...item, done: false, sample: true })),
    [copy.items],
  );
  const [records, setRecords] = useState<StoredRecord[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(editable ? "loading" : "ready");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "error">("idle");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!collection) {
      setRecords(sampleRecords);
      setLoadState("ready");
      return;
    }

    let active = true;
    setLoadState("loading");
    setSaveState("idle");
    loadCollection(collection, sampleRecords)
      .then((saved) => {
        if (!active) return;
        const savedSamples = new Map(saved.filter((item) => item.sample).map((item) => [item.id, item]));
        const userItems = saved.filter((item) => !item.sample);
        const translatedSamples = sampleRecords.map((sample) => ({
          ...sample,
          done: savedSamples.get(sample.id)?.done ?? false,
        }));
        setRecords([...translatedSamples, ...userItems]);
        setLoadState("ready");
      })
      .catch(() => {
        if (active) setLoadState("error");
      });
    return () => { active = false; };
  }, [collection, sampleRecords, loadAttempt]);

  useEffect(() => {
    if (!collection || loadState !== "ready") return;
    let active = true;
    setSaveState("saving");
    saveCollection(collection, records)
      .then(() => { if (active) setSaveState("idle"); })
      .catch(() => { if (active) setSaveState("error"); });
    return () => { active = false; };
  }, [collection, records, loadState]);

  const visible = useMemo(
    () => records.filter((item) => (item.title + " " + item.detail).toLowerCase().includes(query.toLowerCase())),
    [records, query],
  );
  const completed = records.filter((item) => item.done).length;

  const addItem = () => {
    const value = draft.trim();
    if (!value || !collection || loadState !== "ready") return;
    setRecords((current) => [{
      id: `user-${Date.now()}-${current.length}`,
      title: value,
      detail: messages.common.userAdded,
      done: false,
      sample: false,
    }, ...current]);
    setDraft("");
  };

  const toggleItem = (id: string) => {
    if (!editable || loadState !== "ready") return;
    setRecords((current) => current.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedLabel = messages.common.completed
    .replace("{completed}", String(completed))
    .replace("{total}", String(records.length));
  const shownLabel = messages.common.shown.replace("{count}", String(visible.length));
  const capabilityLabel = messages.common.capabilities.replace("{count}", String(records.length));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.brand}><View style={styles.brandIcon}><Ionicons name="aperture" size={18} color={theme.colors.gold} /></View><Text style={styles.brandText}>NOVARA</Text></View>
          <View style={styles.previewPill}><View style={styles.dot} /><Text style={styles.previewText}>{messages.common.preview}</Text></View>
        </View>
        <Text style={styles.kicker}>{copy.eyebrow}</Text>
        <Text style={styles.title}>{copy.title}</Text>
        <Text style={styles.description}>{copy.description}</Text>

        {loadState === "loading" && (
          <View style={styles.statusCard}>
            <Ionicons name="hourglass-outline" size={20} color={theme.colors.navy} />
            <Text style={styles.statusText}>{messages.common.loading}</Text>
          </View>
        )}
        {loadState === "error" && (
          <View style={styles.errorCard}>
            <Ionicons name="alert-circle-outline" size={22} color={theme.colors.danger} />
            <Text style={styles.errorText}>{messages.common.loadError}</Text>
            <Pressable accessibilityRole="button" onPress={() => setLoadAttempt((value) => value + 1)} style={styles.retryButton}>
              <Text style={styles.retryText}>{messages.common.retry}</Text>
            </Pressable>
          </View>
        )}

        {loadState === "ready" && (
          <>
            <View style={styles.summary}>
              <View style={styles.summaryIcon}><Ionicons name={icon} size={22} color={theme.colors.goldDeep} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.summaryTitle}>{editable ? messages.common.items : messages.common.tools}</Text>
                <Text style={styles.summarySub}>{editable ? completedLabel : capabilityLabel}</Text>
              </View>
              <Text style={styles.summaryCount}>{records.length}</Text>
            </View>
            {editable && (
              <View style={styles.addRow}>
                <TextInput value={draft} onChangeText={setDraft} onSubmitEditing={addItem} placeholder={copy.inputHint} placeholderTextColor={theme.colors.muted} style={styles.input} returnKeyType="done" accessibilityLabel={copy.inputHint} />
                <Pressable accessibilityRole="button" accessibilityLabel={messages.common.addAccessibility} onPress={addItem} style={styles.addButton}>
                  <Ionicons name="add" size={22} color="#FFFFFF" />
                </Pressable>
              </View>
            )}
            <View style={styles.search}>
              <Ionicons name="search-outline" size={18} color={theme.colors.muted} />
              <TextInput value={query} onChangeText={setQuery} placeholder={messages.common.search} placeholderTextColor={theme.colors.muted} style={styles.searchInput} accessibilityLabel={messages.common.searchAccessibility} />
            </View>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>{editable ? messages.common.items : messages.common.tools}</Text>
              <Text style={styles.listMeta}>{shownLabel}</Text>
            </View>
            {visible.map((item) => (
              <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ checked: item.done }} onPress={() => toggleItem(item.id)} style={styles.item}>
                <View style={[styles.itemIcon, item.done && styles.itemIconDone]}>
                  <Ionicons name={item.done ? "checkmark" : "chevron-forward"} size={18} color={item.done ? "#FFFFFF" : theme.colors.navy} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemTitle, item.done && styles.done]}>{item.title}</Text>
                  <Text style={styles.itemDetail}>{item.detail}</Text>
                </View>
                <Ionicons name={item.done ? "checkmark-circle" : "ellipse-outline"} size={19} color={item.done ? theme.colors.success : theme.colors.muted} />
              </Pressable>
            ))}
            {visible.length === 0 && (
              <View style={styles.empty}>
                <Ionicons name="search-outline" size={25} color={theme.colors.muted} />
                <Text style={styles.emptyText}>{messages.common.noResults}</Text>
              </View>
            )}
            {editable && (
              <View style={styles.notice}>
                <Ionicons name="information-circle-outline" size={18} color={theme.colors.navy} />
                <Text style={styles.noticeText}>{messages.common.localOnly}</Text>
              </View>
            )}
            {!editable && (
              <View style={styles.notice}>
                <Ionicons name="information-circle-outline" size={18} color={theme.colors.navy} />
                <Text style={styles.noticeText}>{copy.previewNote}</Text>
              </View>
            )}
            {saveState === "saving" && <Text style={styles.saveStatus}>{messages.common.saving}</Text>}
            {saveState === "error" && <Text accessibilityRole="alert" style={styles.saveError}>{messages.common.saveError}</Text>}
          </>
        )}
        <Text style={styles.footer}>NOVARA · ONE PLATFORM. INFINITE POSSIBILITIES.</Text>
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
  search: { flexDirection: "row", alignItems: "center", gap: 9, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, paddingHorizontal: 13, minHeight: 46 },
  searchInput: { flex: 1, color: theme.colors.text, fontSize: 12, paddingVertical: 10 },
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
  statusCard: { flexDirection: "row", gap: 10, alignItems: "center", backgroundColor: theme.colors.surface, borderRadius: 14, padding: 16 },
  statusText: { color: theme.colors.muted, fontSize: 12 },
  errorCard: { backgroundColor: "#FFF0EF", borderRadius: 15, padding: 16, gap: 10, alignItems: "flex-start" },
  errorText: { color: theme.colors.text, fontSize: 12, lineHeight: 18 },
  retryButton: { backgroundColor: theme.colors.navy, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 11 },
  retryText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  saveStatus: { color: theme.colors.muted, fontSize: 10 },
  saveError: { color: theme.colors.danger, fontSize: 11, lineHeight: 16 },
  footer: { color: theme.colors.muted, fontSize: 9, letterSpacing: 1.2, textAlign: "center", marginTop: 12 },
});
