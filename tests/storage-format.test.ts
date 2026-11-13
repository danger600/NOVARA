import assert from "node:assert/strict";
import test from "node:test";
import { decodeCollection, encodeCollection, StorageFormatError, type StoredRecord } from "../lib/storage-format";

const sample: StoredRecord[] = [
  { id: "task-1", title: "Plan the week", detail: "Choose three priorities", done: false },
];

test("encodes and decodes the current versioned schema", () => {
  const encoded = encodeCollection(sample, "2026-11-13T08:00:00.000Z");
  const decoded = decodeCollection(encoded);
  assert.deepEqual(decoded.records, sample);
  assert.equal(decoded.needsMigration, false);
});

test("reads the legacy bare-array format and marks it for migration", () => {
  const decoded = decodeCollection(JSON.stringify(sample));
  assert.deepEqual(decoded.records, sample);
  assert.equal(decoded.needsMigration, true);
});

test("reads a version-one envelope and marks it for migration", () => {
  const decoded = decodeCollection(JSON.stringify({ version: 1, records: sample }));
  assert.deepEqual(decoded.records, sample);
  assert.equal(decoded.needsMigration, true);
});

test("rejects malformed JSON", () => {
  assert.throws(() => decodeCollection("{broken"), StorageFormatError);
});

test("rejects invalid fields instead of silently discarding user data", () => {
  assert.throws(() => decodeCollection(JSON.stringify([{ id: "x", title: "", detail: "", done: false }])), StorageFormatError);
});

test("rejects duplicate identifiers", () => {
  assert.throws(() => decodeCollection(JSON.stringify([...sample, ...sample])), StorageFormatError);
});

test("rejects unsupported schema versions", () => {
  assert.throws(() => decodeCollection(JSON.stringify({ version: 99, records: sample })), StorageFormatError);
});

test("rejects an invalid timestamp when encoding", () => {
  assert.throws(() => encodeCollection(sample, "not-a-date"), StorageFormatError);
});
