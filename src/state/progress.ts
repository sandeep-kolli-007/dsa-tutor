import type { PatternId } from '../types/lesson';

const storageKey = 'dsa-tutor-progress-v1';

export function loadProgress(): PatternId[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

export function saveProgress(progress: PatternId[]) {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}
