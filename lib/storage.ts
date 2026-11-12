import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "novara:v1:";
export type StoredRecord = { id: string; title: string; detail: string; done: boolean };

export async function readCollection(key: string): Promise<StoredRecord[] | null> {
  try {
    const raw = await AsyncStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((item): item is StoredRecord =>
      !!item && typeof item === "object" &&
      typeof (item as StoredRecord).id === "string" &&
      typeof (item as StoredRecord).title === "string" &&
      typeof (item as StoredRecord).detail === "string" &&
      typeof (item as StoredRecord).done === "boolean"
    );
  } catch {
    return null;
  }
}

export async function writeCollection(key: string, records: StoredRecord[]): Promise<void> {
  await AsyncStorage.setItem(PREFIX + key, JSON.stringify(records));
}

export async function readPreference<T extends string>(key: string, fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(PREFIX + key);
    return value ? value as T : fallback;
  } catch {
    return fallback;
  }
}

export async function writePreference(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(PREFIX + key, value);
}
