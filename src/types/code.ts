import type { PatternId } from './lesson';

export type CodeDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type CodeTestCase = {
  name: string;
  args: unknown[];
  expected: unknown;
  hidden?: boolean;
};

export type CodeProblem = {
  id: string;
  patternId: PatternId;
  title: string;
  difficulty: CodeDifficulty;
  prompt: string;
  whyPattern: string;
  functionName: string;
  signature: string;
  examples: { input: string; output: string }[];
  constraints: string[];
  hints: string[];
  starterCode: string;
  solutionCode: string;
  tests: CodeTestCase[];
};

export type CodeRunResult = {
  name: string;
  passed: boolean;
  expected: unknown;
  actual?: unknown;
  error?: string;
  durationMs?: number;
};

export type CodeRunSummary = {
  passed: number;
  total: number;
  results: CodeRunResult[];
  timedOut?: boolean;
};
