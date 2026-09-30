import type { PatternId } from '../types/lesson';
import { recordActivity } from './activity';

export type PredictionPatternStats = {
  answered: number;
  correct: number;
};

export type PredictionStats = {
  answered: number;
  correct: number;
  byPattern: Partial<Record<PatternId, PredictionPatternStats>>;
};

const storageKey = 'dsa-tutor-prediction-v1';

const emptyStats: PredictionStats = {
  answered: 0,
  correct: 0,
  byPattern: {},
};

export function loadPredictionStats(): PredictionStats {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || 'null') as PredictionStats | null;
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

export function recordPredictionAnswer(patternId: PatternId, isCorrect: boolean): PredictionStats {
  const current = loadPredictionStats();
  const pattern = current.byPattern[patternId] ?? { answered: 0, correct: 0 };

  const next: PredictionStats = {
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
  recordActivity({ kind: 'prediction_answer', patternId, success: isCorrect });
  return next;
}
