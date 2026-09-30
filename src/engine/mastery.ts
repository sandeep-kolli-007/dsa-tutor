import type { PatternPracticeStats } from '../state/practice';

export type MasteryInput = {
  lessonComplete: boolean;
  recognition?: PatternPracticeStats;
  hasCodingProblem: boolean;
  implementationSolved: boolean;
};

export type MasteryResult = {
  score: number;
  label: 'NEW' | 'LEARNING' | 'RECOGNIZING' | 'PRACTICED' | 'MASTERED';
  lessonPoints: number;
  recognitionPoints: number;
  implementationPoints: number;
};

export function calculateMastery(input: MasteryInput): MasteryResult {
  const lessonPoints = input.lessonComplete ? 40 : 0;

  const attempts = input.recognition?.answered ?? 0;
  const correct = input.recognition?.correct ?? 0;
  const accuracy = attempts ? correct / attempts : 0;
  const confidence = Math.min(1, attempts / 3);
  const recognitionPoints = 30 * accuracy * confidence;

  const implementationPoints = input.hasCodingProblem && input.implementationSolved ? 30 : 0;
  const availablePoints = input.hasCodingProblem ? 100 : 70;
  const raw = lessonPoints + recognitionPoints + implementationPoints;
  const score = Math.round((raw / availablePoints) * 100);

  let label: MasteryResult['label'] = 'NEW';
  if (score >= 90) label = 'MASTERED';
  else if (score >= 75) label = 'PRACTICED';
  else if (score >= 50) label = 'RECOGNIZING';
  else if (score >= 20) label = 'LEARNING';

  return {
    score,
    label,
    lessonPoints,
    recognitionPoints: Math.round(recognitionPoints),
    implementationPoints,
  };
}
