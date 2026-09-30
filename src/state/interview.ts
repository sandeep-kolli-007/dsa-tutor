import type { PatternId } from '../types/lesson';
import { recordActivity } from './activity';

export type InterviewProblemStats = {
  submissions: number;
  patternCorrect: number;
  solved: boolean;
  bestPassedTests: number;
  lastAttemptAt: number;
};

export type InterviewStats = {
  submissions: number;
  solved: string[];
  patternCorrect: number;
  byProblem: Record<string, InterviewProblemStats>;
};

const storageKey = 'dsa-tutor-interview-v1';

const emptyStats: InterviewStats = {
  submissions: 0,
  solved: [],
  patternCorrect: 0,
  byProblem: {},
};

export function loadInterviewStats(): InterviewStats {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || 'null') as InterviewStats | null;
    if (!parsed) return emptyStats;
    return {
      submissions: parsed.submissions ?? 0,
      solved: parsed.solved ?? [],
      patternCorrect: parsed.patternCorrect ?? 0,
      byProblem: parsed.byProblem ?? {},
    };
  } catch {
    return emptyStats;
  }
}

export function recordInterviewSubmission(input: {
  problemId: string;
  patternId: PatternId;
  recognizedPattern: boolean;
  passedTests: number;
  totalTests: number;
  at?: number;
}): InterviewStats {
  const current = loadInterviewStats();
  const previous = current.byProblem[input.problemId] ?? {
    submissions: 0,
    patternCorrect: 0,
    solved: false,
    bestPassedTests: 0,
    lastAttemptAt: 0,
  };
  const solved = previous.solved || input.passedTests === input.totalTests;
  const at = input.at ?? Date.now();

  const next: InterviewStats = {
    submissions: current.submissions + 1,
    solved: solved && !current.solved.includes(input.problemId)
      ? [...current.solved, input.problemId]
      : current.solved,
    patternCorrect: current.patternCorrect + (input.recognizedPattern ? 1 : 0),
    byProblem: {
      ...current.byProblem,
      [input.problemId]: {
        submissions: previous.submissions + 1,
        patternCorrect: previous.patternCorrect + (input.recognizedPattern ? 1 : 0),
        solved,
        bestPassedTests: Math.max(previous.bestPassedTests, input.passedTests),
        lastAttemptAt: at,
      },
    },
  };

  localStorage.setItem(storageKey, JSON.stringify(next));
  recordActivity({
    kind: 'interview_attempt',
    problemId: input.problemId,
    patternId: input.patternId,
    success: input.passedTests === input.totalTests && input.recognizedPattern,
    at,
  });
  return next;
}
