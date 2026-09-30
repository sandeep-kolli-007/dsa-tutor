import { recordActivity } from './activity';

export type CodingProblemStats = {
  attempts: number;
  solved: boolean;
  solvedAt?: string;
};

export type CodingStats = {
  attempts: number;
  solved: string[];
  byProblem: Record<string, CodingProblemStats>;
};

const storageKey = 'dsa-tutor-coding-v1';

const emptyStats: CodingStats = {
  attempts: 0,
  solved: [],
  byProblem: {},
};

export function loadCodingStats(): CodingStats {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || 'null') as CodingStats | null;
    if (!parsed) return emptyStats;
    return {
      attempts: parsed.attempts ?? 0,
      solved: parsed.solved ?? [],
      byProblem: parsed.byProblem ?? {},
    };
  } catch {
    return emptyStats;
  }
}

export function recordCodingAttempt(problemId: string, solved: boolean, patternId?: import('../types/lesson').PatternId): CodingStats {
  const current = loadCodingStats();
  const previous = current.byProblem[problemId] ?? { attempts: 0, solved: false };
  const nowSolved = previous.solved || solved;

  const next: CodingStats = {
    attempts: current.attempts + 1,
    solved: nowSolved && !current.solved.includes(problemId)
      ? [...current.solved, problemId]
      : current.solved,
    byProblem: {
      ...current.byProblem,
      [problemId]: {
        attempts: previous.attempts + 1,
        solved: nowSolved,
        solvedAt: nowSolved ? (previous.solvedAt ?? new Date().toISOString()) : undefined,
      },
    },
  };

  localStorage.setItem(storageKey, JSON.stringify(next));
  recordActivity({ kind: 'coding_attempt', problemId, patternId, success: solved });
  return next;
}
