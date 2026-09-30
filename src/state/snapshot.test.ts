import { describe, expect, it } from 'vitest';

import { validateSnapshot } from './snapshot';

describe('snapshot validation', () => {
  it('accepts a version-1 learning snapshot', () => {
    expect(validateSnapshot({
      version: 1,
      exportedAt: '2026-01-01T00:00:00.000Z',
      progress: [],
      practice: { answered: 0, correct: 0, byPattern: {} },
      coding: { attempts: 0, solved: [], byProblem: {} },
      activity: [],
      drafts: {},
    })).toBe(true);
  });

  it('rejects malformed or unsupported snapshots', () => {
    expect(validateSnapshot(null)).toBe(false);
    expect(validateSnapshot({ version: 2 })).toBe(false);
    expect(validateSnapshot({ version: 1, progress: 'bad' })).toBe(false);
  });
});
