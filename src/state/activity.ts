import type { PatternId } from '../types/lesson';

export type ActivityKind = 'lesson_complete' | 'recognition_answer' | 'prediction_answer' | 'coding_attempt' | 'interview_attempt';

export type LearningActivity = {
  id: string;
  kind: ActivityKind;
  patternId?: PatternId;
  problemId?: string;
  success?: boolean;
  at: number;
};

const storageKey = 'dsa-tutor-activity-v1';
const maxEvents = 250;

export function loadActivity(): LearningActivity[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]') as LearningActivity[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordActivity(event: Omit<LearningActivity, 'id' | 'at'> & { at?: number }) {
  const current = loadActivity();
  const at = event.at ?? Date.now();
  const next: LearningActivity = {
    ...event,
    at,
    id: `${at}-${event.kind}-${event.patternId ?? event.problemId ?? 'global'}`,
  };

  localStorage.setItem(storageKey, JSON.stringify([next, ...current].slice(0, maxEvents)));
  return next;
}
