import type { PatternId } from '../types/lesson';

export type PatternPracticeStats = {
  answered: number;
  correct: number;
};

export type PracticeStats = {
  answered: number;
  correct: number;
  byPattern: Partial<Record<PatternId, PatternPracticeStats>>;
};

const storageKey = 'dsa-tutor-practice-v1';

const emptyStats: PracticeStats = {
  answered: 0,
  correct: 0,
  byPattern: {},
};

export function loadPracticeStats(): PracticeStats {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || 'null') as PracticeStats | null;
    if (!parsed) return emptyStats;
    return {
      answered: parsed.answered ?? 0,
      correct: parsed.correct ?? 0,
      byPattern: parsed.byPattern ?? {},
    };
  } catch {
    return emptyStats;
  }
}

export function recordPracticeAnswer(patternId: PatternId, isCorrect: boolean): PracticeStats {
  const current = loadPracticeStats();
  const pattern = current.byPattern[patternId] ?? { answered: 0, correct: 0 };

  const next: PracticeStats = {
    answered: current.answered + 1,
    correct: current.correct + (isCorrect ? 1 : 0),
    byPattern: {
      ...current.byPattern,
      [patternId]: {
        answered: pattern.answered + 1,
        correct: pattern.correct + (isCorrect ? 1 : 0),
      },
    },
  };

  localStorage.setItem(storageKey, JSON.stringify(next));
  return next;
}
