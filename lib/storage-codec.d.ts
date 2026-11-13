export type StoredRecord = {
  id: string;
  title: string;
  detail: string;
  done: boolean;
  sample?: boolean;
};
export type DecodeResult =
  | { ok: true; records: StoredRecord[]; migrated: boolean }
  | { ok: false; reason: "invalid-json" | "invalid-data" | "unsupported-version" };
export const CURRENT_STORAGE_VERSION: number;
export function isStoredRecord(value: unknown): value is StoredRecord;
export function decodeCollection(raw: string): DecodeResult;
export function encodeCollection(records: StoredRecord[]): string;
