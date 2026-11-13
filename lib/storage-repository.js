const { decodeCollection, encodeCollection } = require("./storage-codec");

const CURRENT_PREFIX = "novara:v2:";
const LEGACY_COLLECTION_KEYS = {
  tasks: "novara:v1:collection-tasks-focus",
  notes: "novara:v1:collection-notes-ideas",
  goals: "novara:v1:collection-goals-habits",
};

class StorageRepositoryError extends Error {
  constructor(code, message, cause) {
    super(message);
    this.name = "StorageRepositoryError";
    this.code = code;
    this.cause = cause;
  }
}

function createStorageRepository(adapter) {
  const writeQueues = new Map();

  async function getItem(key) {
    try { return await adapter.getItem(key); }
    catch (error) { throw new StorageRepositoryError("unavailable", "Local storage could not be read.", error); }
  }

  async function setItem(key, value) {
    const previous = writeQueues.get(key) || Promise.resolve();
    const next = previous.catch(() => undefined).then(async () => {
      try { await adapter.setItem(key, value); }
      catch (error) { throw new StorageRepositoryError("write-failed", "Changes could not be saved on this device.", error); }
    });
    writeQueues.set(key, next);
    try { await next; }
    finally { if (writeQueues.get(key) === next) writeQueues.delete(key); }
  }

  async function removeItem(key) {
    try { await adapter.removeItem(key); }
    catch (error) { throw new StorageRepositoryError("migration-cleanup-failed", "Data was migrated, but old local data could not be cleaned up.", error); }
  }

  async function loadCollection(name, defaults = []) {
    if (!Object.prototype.hasOwnProperty.call(LEGACY_COLLECTION_KEYS, name)) {
      throw new StorageRepositoryError("invalid-key", "Unknown NOVARA collection.");
    }
    const currentKey = `${CURRENT_PREFIX}${name}`;
    const currentRaw = await getItem(currentKey);
    if (currentRaw !== null) {
      const decoded = decodeCollection(currentRaw);
      if (!decoded.ok) throw new StorageRepositoryError("corrupt-data", "Saved data could not be read safely. The original data has been kept.");
      if (decoded.migrated) await setItem(currentKey, encodeCollection(decoded.records));
      return decoded.records;
    }

    const legacyKey = LEGACY_COLLECTION_KEYS[name];
    const legacyRaw = await getItem(legacyKey);
    if (legacyRaw !== null) {
      const decoded = decodeCollection(legacyRaw);
      if (!decoded.ok) throw new StorageRepositoryError("corrupt-data", "Older saved data could not be migrated safely. The original data has been kept.");
      await setItem(currentKey, encodeCollection(decoded.records));
      await removeItem(legacyKey);
      return decoded.records;
    }
    return defaults;
  }

  async function saveCollection(name, records) {
    if (!Object.prototype.hasOwnProperty.call(LEGACY_COLLECTION_KEYS, name)) {
      throw new StorageRepositoryError("invalid-key", "Unknown NOVARA collection.");
    }
    await setItem(`${CURRENT_PREFIX}${name}`, encodeCollection(records));
  }

  async function loadPreference(name, fallback, validate) {
    const currentKey = `${CURRENT_PREFIX}preferences:${name}`;
    const currentRaw = await getItem(currentKey);
    if (currentRaw !== null) return validate(currentRaw) ? currentRaw : fallback;
    const legacyKey = `novara:v1:${name}`;
    const legacyRaw = await getItem(legacyKey);
    if (legacyRaw === null || !validate(legacyRaw)) return fallback;
    await setItem(currentKey, legacyRaw);
    await removeItem(legacyKey);
    return legacyRaw;
  }

  async function savePreference(name, value) {
    await setItem(`${CURRENT_PREFIX}preferences:${name}`, value);
  }

  return { loadCollection, saveCollection, loadPreference, savePreference };
}

exports.StorageRepositoryError = StorageRepositoryError;
exports.createStorageRepository = createStorageRepository;
