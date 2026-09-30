import { describe, expect, it } from 'vitest';

import { codeProblems } from './codeProblems';

function loadFunction(code: string, functionName: string) {
  return new Function(
    code + '\nreturn typeof ' + functionName + " === 'function' ? " + functionName + ' : null;'
  )();
}

describe('coding problem bank', () => {
  it('has unique ids and function names', () => {
    expect(new Set(codeProblems.map((problem) => problem.id)).size).toBe(codeProblems.length);
    expect(new Set(codeProblems.map((problem) => problem.functionName)).size).toBe(codeProblems.length);
  });

  it('starter snippets compile and expose the expected function', () => {
    for (const problem of codeProblems) {
      expect(typeof loadFunction(problem.starterCode, problem.functionName)).toBe('function');
    }
  });

  it('reference solutions pass every public and hidden test', () => {
    for (const problem of codeProblems) {
      const fn = loadFunction(problem.solutionCode, problem.functionName);
      expect(typeof fn).toBe('function');

      for (const testCase of problem.tests) {
        const args = structuredClone(testCase.args);
        expect(fn(...args), `${problem.id}: ${testCase.name}`).toEqual(testCase.expected);
      }
    }
  });
});
