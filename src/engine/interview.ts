import { patterns } from '../data/patterns';
import type { CodeProblem } from '../types/code';
import type { PatternId } from '../types/lesson';

export type InterviewPatternOption = {
  id: PatternId;
  label: string;
};

export function interviewPatternOptions(problem: CodeProblem): InterviewPatternOption[] {
  const correctIndex = patterns.findIndex((pattern) => pattern.id === problem.patternId);
  const candidates = [problem.patternId];
  const offsets = [5, 11, 19, 29, 37];

  for (const offset of offsets) {
    const candidate = patterns[(correctIndex + offset) % patterns.length]?.id;
    if (candidate && !candidates.includes(candidate)) candidates.push(candidate);
    if (candidates.length === 4) break;
  }

  const options = candidates.map((id) => {
    const pattern = patterns.find((item) => item.id === id)!;
    return { id, label: pattern.title };
  });

  const rotation = problem.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % options.length;
  return [...options.slice(rotation), ...options.slice(0, rotation)];
}

export function interviewScore(input: {
  patternCorrect: boolean;
  reasoningLength: number;
  passedTests: number;
  totalTests: number;
}) {
  const recognition = input.patternCorrect ? 25 : 0;
  const reasoning = Math.min(25, Math.floor(Math.max(0, input.reasoningLength) / 4));
  const implementation = input.totalTests
    ? Math.round((input.passedTests / input.totalTests) * 50)
    : 0;

  return {
    recognition,
    reasoning,
    implementation,
    total: recognition + reasoning + implementation,
  };
}
