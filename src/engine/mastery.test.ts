import { describe, expect, it } from 'vitest';

import { calculateMastery } from './mastery';

describe('mastery scoring', () => {
  it('starts at zero without evidence', () => {
    expect(calculateMastery({
      lessonComplete: false,
      hasCodingProblem: true,
      implementationSolved: false,
    }).score).toBe(0);
  });

  it('requires repeated recognition evidence before full recognition credit', () => {
    const oneTry = calculateMastery({
      lessonComplete: true,
      recognition: { answered: 1, correct: 1 },
      hasCodingProblem: true,
      implementationSolved: false,
    });
    const threeTries = calculateMastery({
      lessonComplete: true,
      recognition: { answered: 3, correct: 3 },
      hasCodingProblem: true,
      implementationSolved: false,
    });

    expect(oneTry.recognitionPoints).toBe(10);
    expect(threeTries.recognitionPoints).toBe(30);
    expect(threeTries.score).toBe(70);
  });

  it('reaches mastery with lesson, recognition and implementation evidence', () => {
    const result = calculateMastery({
      lessonComplete: true,
      recognition: { answered: 4, correct: 4 },
      hasCodingProblem: true,
      implementationSolved: true,
    });

    expect(result.score).toBe(100);
    expect(result.label).toBe('MASTERED');
  });

  it('normalizes patterns that do not yet have a coding problem', () => {
    const result = calculateMastery({
      lessonComplete: true,
      recognition: { answered: 3, correct: 3 },
      hasCodingProblem: false,
      implementationSolved: false,
    });

    expect(result.score).toBe(100);
  });
});
