const CURRENT_STORAGE_VERSION = 2;
const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function isStoredRecord(value) {
  return isPlainObject(value) &&
    typeof value.id === "string" && value.id.length > 0 && value.id.length <= 128 &&
    typeof value.title === "string" && value.title.trim().length > 0 && value.title.length <= 500 &&
    typeof value.detail === "string" && value.detail.length <= 5000 &&
    typeof value.done === "boolean" &&
    (value.sample === undefined || typeof value.sample === "boolean");
}

function migrateLegacyRecords(value) {
  if (!Array.isArray(value)) return null;
  const records = [];
  for (let index = 0; index < value.length; index += 1) {
    const item = value[index];
    if (!isPlainObject(item) || typeof item.title !== "string" || !item.title.trim()) return null;
    const record = {
      id: typeof item.id === "string" && item.id.length > 0 ? item.id : `legacy-${index + 1}`,
      title: item.title.slice(0, 500),
      detail: typeof item.detail === "string" ? item.detail.slice(0, 5000) : "",
      done: typeof item.done === "boolean" ? item.done : false,
    };
    if (!isStoredRecord(record)) return null;
    records.push(record);
  }
  return records;
}

function decodeCollection(raw) {
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch { return { ok: false, reason: "invalid-json" }; }

  if (Array.isArray(parsed)) {
    const records = migrateLegacyRecords(parsed);
    return records ? { ok: true, records, migrated: true } : { ok: false, reason: "invalid-data" };
  }
  if (!isPlainObject(parsed) || !Number.isInteger(parsed.schemaVersion) || !Array.isArray(parsed.records)) {
    return { ok: false, reason: "invalid-data" };
  }
  if (parsed.schemaVersion === 1) {
    const records = migrateLegacyRecords(parsed.records);
    return records ? { ok: true, records, migrated: true } : { ok: false, reason: "invalid-data" };
  }
  if (parsed.schemaVersion !== CURRENT_STORAGE_VERSION) return { ok: false, reason: "unsupported-version" };
  if (!parsed.records.every(isStoredRecord)) return { ok: false, reason: "invalid-data" };

  const ids = new Set(parsed.records.map((record) => record.id));
  if (ids.size !== parsed.records.length) return { ok: false, reason: "invalid-data" };

  const records = parsed.records.map(({ id, title, detail, done, sample }) =>
    sample === undefined ? { id, title, detail, done } : { id, title, detail, done, sample },
  );
  return { ok: true, records, migrated: false };
}

function encodeCollection(records) {
  if (!Array.isArray(records) || !records.every(isStoredRecord)) {
    throw new TypeError("Cannot save invalid NOVARA collection data.");
  }
  const ids = new Set(records.map((record) => record.id));
  if (ids.size !== records.length) throw new TypeError("Collection record IDs must be unique.");
  const safeRecords = records.map(({ id, title, detail, done, sample }) =>
    sample === undefined ? { id, title, detail, done } : { id, title, detail, done, sample },
  );
  return JSON.stringify({ schemaVersion: CURRENT_STORAGE_VERSION, records: safeRecords });
}

exports.CURRENT_STORAGE_VERSION = CURRENT_STORAGE_VERSION;
exports.isStoredRecord = isStoredRecord;
exports.decodeCollection = decodeCollection;
exports.encodeCollection = encodeCollection;
