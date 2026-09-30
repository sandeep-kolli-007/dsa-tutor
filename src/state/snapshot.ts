import { loadActivity } from './activity';
import { loadCodingStats } from './coding';
import { loadPracticeStats } from './practice';
import { loadProgress } from './progress';

export type TutorSnapshot = {
  version: 1;
  exportedAt: string;
  progress: ReturnType<typeof loadProgress>;
  practice: ReturnType<typeof loadPracticeStats>;
  coding: ReturnType<typeof loadCodingStats>;
  activity: ReturnType<typeof loadActivity>;
  drafts: Record<string, string>;
};

const keys = {
  progress: 'dsa-tutor-progress-v1',
  practice: 'dsa-tutor-practice-v1',
  coding: 'dsa-tutor-coding-v1',
  activity: 'dsa-tutor-activity-v1',
};

export function createSnapshot(): TutorSnapshot {
  const drafts: Record<string, string> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('dsa-tutor-code-draft-')) {
      drafts[key] = localStorage.getItem(key) ?? '';
    }
  }

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: loadProgress(),
    practice: loadPracticeStats(),
    coding: loadCodingStats(),
    activity: loadActivity(),
    drafts,
  };
}

export function snapshotJson() {
  return JSON.stringify(createSnapshot(), null, 2);
}

export function validateSnapshot(value: unknown): value is TutorSnapshot {
  if (!value || typeof value !== 'object') return false;
  const snapshot = value as Partial<TutorSnapshot>;
  return (
    snapshot.version === 1 &&
    Array.isArray(snapshot.progress) &&
    Boolean(snapshot.practice && typeof snapshot.practice === 'object') &&
    Boolean(snapshot.coding && typeof snapshot.coding === 'object') &&
    Array.isArray(snapshot.activity) &&
    Boolean(snapshot.drafts && typeof snapshot.drafts === 'object')
  );
}

export function restoreSnapshot(snapshot: TutorSnapshot) {
  localStorage.setItem(keys.progress, JSON.stringify(snapshot.progress));
  localStorage.setItem(keys.practice, JSON.stringify(snapshot.practice));
  localStorage.setItem(keys.coding, JSON.stringify(snapshot.coding));
  localStorage.setItem(keys.activity, JSON.stringify(snapshot.activity));

  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('dsa-tutor-code-draft-')) localStorage.removeItem(key);
  }
  for (const [key, value] of Object.entries(snapshot.drafts)) {
    if (key.startsWith('dsa-tutor-code-draft-')) localStorage.setItem(key, value);
  }
}

export function clearTutorData() {
  Object.values(keys).forEach((key) => localStorage.removeItem(key));
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('dsa-tutor-code-draft-')) localStorage.removeItem(key);
  }
}
