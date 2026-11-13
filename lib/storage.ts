import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStorageRepository, type CollectionName, type StorageAdapter, type StorageErrorCode, StorageRepositoryError } from "./storage-repository.mjs";
import type { StoredRecord } from "./storage-codec.mjs";

const adapter: StorageAdapter = {
  getItem: (key) => AsyncStorage.getItem(key),
  setItem: (key, value) => AsyncStorage.setItem(key, value),
  removeItem: (key) => AsyncStorage.removeItem(key),
};

const repository = createStorageRepository(adapter);

export type { CollectionName, StoredRecord, StorageErrorCode };
export { StorageRepositoryError };
export const loadCollection = repository.loadCollection;
export const saveCollection = repository.saveCollection;
export const loadPreference = repository.loadPreference;
export const savePreference = repository.savePreference;
