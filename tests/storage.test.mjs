import test from "node:test";
import assert from "node:assert/strict";
import { decodeCollection, encodeCollection, CURRENT_STORAGE_VERSION } from "../lib/storage-codec.mjs";
import { createStorageRepository } from "../lib/storage-repository.mjs";
import { resolveLocale } from "../lib/locale-utils.mjs";

class MemoryAdapter {
  values = new Map();
  failWrites = false;
  async getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  async setItem(key, value) {
    if (this.failWrites) throw new Error("simulated write failure");
    this.values.set(key, value);
  }
  async removeItem(key) { this.values.delete(key); }
}
const sample = [{ id: "t-1", title: "Plan work", detail: "Break down priorities", done: false }];

test("encodes and decodes the current versioned format", () => {
  const encoded = encodeCollection(sample);
  const decoded = decodeCollection(encoded);
  assert.equal(CURRENT_STORAGE_VERSION, 2);
  assert.deepEqual(decoded, { ok: true, records: sample, migrated: false });
});
test("migrates the legacy unversioned array without losing records", () => {
  assert.deepEqual(decodeCollection(JSON.stringify(sample)), { ok: true, records: sample, migrated: true });
});
test("migrates a version-one envelope", () => {
  const decoded = decodeCollection(JSON.stringify({ schemaVersion: 1, records: sample }));
  assert.equal(decoded.ok, true);
  if (decoded.ok) { assert.equal(decoded.migrated, true); assert.equal(decoded.records[0].title, "Plan work"); }
});
test("rejects corrupt, malformed, future, and duplicate-id data", () => {
  assert.deepEqual(decodeCollection("{"), { ok: false, reason: "invalid-json" });
  assert.deepEqual(decodeCollection(JSON.stringify({ schemaVersion: 99, records: [] })), { ok: false, reason: "unsupported-version" });
  assert.deepEqual(decodeCollection(JSON.stringify({ schemaVersion: 2, records: [{ id: "", title: "", detail: "", done: false }] })), { ok: false, reason: "invalid-data" });
  assert.throws(() => encodeCollection([{ ...sample[0], id: "same" }, { ...sample[0], id: "same" }]), /unique/);
});
test("migrates task data to v2 and removes the old key only after writing", async () => {
  const adapter = new MemoryAdapter();
  const legacyKey = "novara:v1:collection-tasks-focus";
  adapter.values.set(legacyKey, JSON.stringify(sample));
  const records = await createStorageRepository(adapter).loadCollection("tasks");
  assert.deepEqual(records, sample);
  assert.equal(adapter.values.has("novara:v2:tasks"), true);
  assert.equal(adapter.values.has(legacyKey), false);
  assert.deepEqual(decodeCollection(adapter.values.get("novara:v2:tasks")), { ok: true, records: sample, migrated: false });
});
test("keeps legacy data when migration write fails", async () => {
  const adapter = new MemoryAdapter();
  const legacyKey = "novara:v1:collection-notes-ideas";
  adapter.values.set(legacyKey, JSON.stringify(sample));
  adapter.failWrites = true;
  await assert.rejects(createStorageRepository(adapter).loadCollection("notes"), { code: "write-failed" });
  assert.equal(adapter.values.has(legacyKey), true);
});
test("surfaces corrupt saved data instead of overwriting it", async () => {
  const adapter = new MemoryAdapter();
  adapter.values.set("novara:v2:goals", "{broken");
  await assert.rejects(createStorageRepository(adapter).loadCollection("goals"), { code: "corrupt-data" });
  assert.equal(adapter.values.get("novara:v2:goals"), "{broken");
});
test("migrates a saved language preference and validates fallback values", async () => {
  const adapter = new MemoryAdapter();
  adapter.values.set("novara:v1:locale", "rw");
  const repository = createStorageRepository(adapter);
  const locale = await repository.loadPreference("locale", "en", (value) => ["en", "rw", "fr"].includes(value));
  assert.equal(locale, "rw");
  assert.equal(adapter.values.get("novara:v2:preferences:locale"), "rw");
  assert.equal(adapter.values.has("novara:v1:locale"), false);
  assert.equal(await repository.loadPreference("other", "en", (value) => ["en", "rw", "fr"].includes(value)), "en");
});
test("resolves supported device languages and falls back to English", () => {
  assert.equal(resolveLocale("rw-RW"), "rw");
  assert.equal(resolveLocale("fr_FR"), "fr");
  assert.equal(resolveLocale("en"), "en");
  assert.equal(resolveLocale("sw-TZ"), "en");
  assert.equal(resolveLocale(undefined), "en");
});
