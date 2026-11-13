export const STORAGE_SCHEMA_VERSION = 2 as const;

export type StoredRecord = {
  id: string;
  title: string;
  detail: string;
  done: boolean;
};

export type DecodedCollection = {
  records: StoredRecord[];
  needsMigration: boolean;
};

export class StorageFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageFormatError";
  }
}

const MAX_RECORDS = 5000;
const MAX_ID_LENGTH = 160;
const MAX_TITLE_LENGTH = 300;
const MAX_DETAIL_LENGTH = 2000;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateRecords(value: unknown): StoredRecord[] {
  if (!Array.isArray(value)) {
    throw new StorageFormatError("Stored collection is not a list.");
  }
  if (value.length > MAX_RECORDS) {
    throw new StorageFormatError("Stored collection exceeds the supported size.");
  }

  const ids = new Set<string>();
  return value.map((candidate, index) => {
    if (!isObject(candidate)) {
      throw new StorageFormatError(`Stored item ${index + 1} is invalid.`);
    }
    const { id, title, detail, done } = candidate;
    if (
      typeof id !== "string" || id.length === 0 || id.length > MAX_ID_LENGTH ||
      typeof title !== "string" || title.trim().length === 0 || title.length > MAX_TITLE_LENGTH ||
      typeof detail !== "string" || detail.length > MAX_DETAIL_LENGTH ||
      typeof done !== "boolean"
    ) {
      throw new StorageFormatError(`Stored item ${index + 1} has invalid fields.`);
    }
    if (ids.has(id)) {
      throw new StorageFormatError("Stored collection contains duplicate item identifiers.");
    }
    ids.add(id);
    return { id, title, detail, done };
  });
}

export function decodeCollection(raw: string): DecodedCollection {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    throw new StorageFormatError("Stored collection contains invalid JSON.");
  }

  // Version 1 used a bare array. Keep it readable so existing preview data is not lost.
  if (Array.isArray(parsed)) {
    return { records: validateRecords(parsed), needsMigration: true };
  }

  if (!isObject(parsed) || !Array.isArray(parsed.records)) {
    throw new StorageFormatError("Stored collection has an unsupported format.");
  }

  if (parsed.version === 1) {
    return { records: validateRecords(parsed.records), needsMigration: true };
  }

  if (parsed.version === STORAGE_SCHEMA_VERSION && typeof parsed.updatedAt === "string") {
    return { records: validateRecords(parsed.records), needsMigration: false };
  }

  throw new StorageFormatError("Stored collection version is not supported.");
}

export function encodeCollection(records: StoredRecord[], updatedAt = new Date().toISOString()): string {
  const safeRecords = validateRecords(records);
  if (Number.isNaN(Date.parse(updatedAt))) {
    throw new StorageFormatError("Collection timestamp is invalid.");
  }
  return JSON.stringify({
    version: STORAGE_SCHEMA_VERSION,
    updatedAt,
    records: safeRecords,
  });
}
