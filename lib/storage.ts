import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeCollection, encodeCollection, type StoredRecord } from "@/lib/storage-format";

export type CollectionKey = "tasks" | "notes" | "goals";

const collectionStorageKey = (key: CollectionKey) => `novara:collections:v2:${key}`;
const legacyStorageKeys: Record<CollectionKey, string> = {
  tasks: "novara:v1:collection-tasks-focus",
  notes: "novara:v1:collection-notes-ideas",
  goals: "novara:v1:collection-goals-habits",
};
const preferenceStorageKey = (key: string) => `novara:preferences:v1:${key}`;
const writeQueues = new Map<string, Promise<void>>();

export class StorageError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = "StorageError";
  }
}

async function setItemSerially(key: string, value: string): Promise<void> {
  const previous = writeQueues.get(key) ?? Promise.resolve();
  const next = previous.catch(() => undefined).then(() => AsyncStorage.setItem(key, value));
  writeQueues.set(key, next);
  try {
    await next;
  } finally {
    if (writeQueues.get(key) === next) writeQueues.delete(key);
  }
}

export async function loadCollection(key: CollectionKey, defaults: StoredRecord[]): Promise<StoredRecord[]> {
  const currentKey = collectionStorageKey(key);
  try {
    const current = await AsyncStorage.getItem(currentKey);
    if (current !== null) {
      const decoded = decodeCollection(current);
      if (decoded.needsMigration) await setItemSerially(currentKey, encodeCollection(decoded.records));
      return decoded.records;
    }

    const legacyKey = legacyStorageKeys[key];
    const legacy = await AsyncStorage.getItem(legacyKey);
    if (legacy === null) return defaults;

    const migrated = decodeCollection(legacy);
    await setItemSerially(currentKey, encodeCollection(migrated.records));
    await AsyncStorage.removeItem(legacyKey);
    return migrated.records;
  } catch (error) {
    if (error instanceof StorageError) throw error;
    throw new StorageError("NOVARA could not read saved data on this device.", error);
  }
}

export async function saveCollection(key: CollectionKey, records: StoredRecord[]): Promise<void> {
  try {
    await setItemSerially(collectionStorageKey(key), encodeCollection(records));
  } catch (error) {
    if (error instanceof StorageError) throw error;
    throw new StorageError("NOVARA could not save data on this device.", error);
  }
}

export async function readPreference(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(preferenceStorageKey(key));
  } catch (error) {
    throw new StorageError("NOVARA could not read this preference.", error);
  }
}

export async function writePreference(key: string, value: string): Promise<void> {
  try {
    await setItemSerially(preferenceStorageKey(key), value);
  } catch (error) {
    throw new StorageError("NOVARA could not save this preference.", error);
  }
}

export async function readLegacyPreference(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(`novara:v1:${key}`);
  } catch (error) {
    throw new StorageError("NOVARA could not read the previous preference.", error);
  }
}

export async function removeLegacyPreference(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(`novara:v1:${key}`);
  } catch (error) {
    throw new StorageError("NOVARA could not finish migrating a preference.", error);
  }
}
