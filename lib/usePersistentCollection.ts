import { useCallback, useEffect, useRef, useState } from "react";
import { loadCollection, saveCollection, type CollectionKey } from "@/lib/storage";
import type { StoredRecord } from "@/lib/storage-format";

export type CollectionStatus = "loading" | "ready" | "saving" | "saved" | "error";
type ErrorPhase = "load" | "save";

export function usePersistentCollection(
  key: CollectionKey | undefined,
  initialRecords: StoredRecord[],
  enabled: boolean,
) {
  const [records, setRecords] = useState(initialRecords);
  const [status, setStatus] = useState<CollectionStatus>(enabled ? "loading" : "ready");
  const [error, setError] = useState<string | null>(null);
  const [errorPhase, setErrorPhase] = useState<ErrorPhase | null>(null);
  const latestSave = useRef(0);

  const load = useCallback(async () => {
    if (!enabled || !key) {
      setRecords(initialRecords);
      setStatus("ready");
      setError(null);
      setErrorPhase(null);
      return;
    }
    setStatus("loading");
    setError(null);
    setErrorPhase(null);
    try {
      const stored = await loadCollection(key, initialRecords);
      setRecords(stored);
      setStatus("ready");
    } catch (cause) {
      setStatus("error");
      setErrorPhase("load");
      setError(cause instanceof Error ? cause.message : "Saved data could not be loaded.");
    }
  }, [enabled, initialRecords, key]);

  useEffect(() => { void load(); }, [load]);

  const persist = useCallback(async (nextRecords: StoredRecord[]) => {
    if (!enabled || !key) {
      setRecords(nextRecords);
      return;
    }
    const saveId = ++latestSave.current;
    setRecords(nextRecords);
    setStatus("saving");
    setError(null);
    setErrorPhase(null);
    try {
      await saveCollection(key, nextRecords);
      if (latestSave.current === saveId) setStatus("saved");
    } catch (cause) {
      if (latestSave.current === saveId) {
        setStatus("error");
        setErrorPhase("save");
        setError(cause instanceof Error ? cause.message : "Saved data could not be written.");
      }
    }
  }, [enabled, key]);

  const addRecord = useCallback((title: string, detail: string) => {
    const value = title.trim();
    if (!value || status === "loading" || status === "error") return;
    const next: StoredRecord[] = [{
      id: `${Date.now()}-${records.length}`,
      title: value,
      detail,
      done: false,
    }, ...records];
    void persist(next);
  }, [persist, records, status]);

  const toggleRecord = useCallback((id: string) => {
    if (status === "loading" || status === "error") return;
    const next = records.map((record) => record.id === id ? { ...record, done: !record.done } : record);
    void persist(next);
  }, [persist, records, status]);

  const retry = useCallback(() => {
    if (errorPhase === "load") void load();
    else void persist(records);
  }, [errorPhase, load, persist, records]);

  return { records, status, error, errorPhase, retry, addRecord, toggleRecord };
}
