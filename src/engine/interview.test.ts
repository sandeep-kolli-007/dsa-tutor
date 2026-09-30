import { describe, expect, it } from 'vitest';

import { codeProblems } from '../data/codeProblems';
import { interviewPatternOptions, interviewScore } from './interview';

describe('interview engine', () => {
  it('always includes the correct pattern with four unique options', () => {
    for (const problem of codeProblems) {
      const options = interviewPatternOptions(problem);
      expect(options).toHaveLength(4);
      expect(new Set(options.map((option) => option.id)).size).toBe(4);
      expect(options.some((option) => option.id === problem.patternId)).toBe(true);
    }
  });

  it('scores recognition, reasoning and implementation independently', () => {
    expect(interviewScore({
      patternCorrect: true,
      reasoningLength: 100,
      passedTests: 4,
      totalTests: 4,
    })).toEqual({
      recognition: 25,
      reasoning: 25,
      implementation: 50,
      total: 100,
    });

    expect(interviewScore({
      patternCorrect: false,
      reasoningLength: 20,
      passedTests: 2,
      totalTests: 4,
    }).total).toBe(30);
  });
});
