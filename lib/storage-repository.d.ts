import type { StoredRecord } from "./storage-codec";
export type CollectionName = "tasks" | "notes" | "goals";
export type StorageAdapter = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};
export type StorageErrorCode =
  | "unavailable" | "write-failed" | "migration-cleanup-failed" | "invalid-key" | "corrupt-data";
export class StorageRepositoryError extends Error {
  readonly code: StorageErrorCode;
  readonly cause?: unknown;
  constructor(code: StorageErrorCode, message: string, cause?: unknown);
}
export function createStorageRepository(adapter: StorageAdapter): {
  loadCollection(name: CollectionName, defaults?: StoredRecord[]): Promise<StoredRecord[]>;
  saveCollection(name: CollectionName, records: StoredRecord[]): Promise<void>;
  loadPreference<T extends string>(name: string, fallback: T, validate: (value: string) => boolean): Promise<T>;
  savePreference(name: string, value: string): Promise<void>;
};
