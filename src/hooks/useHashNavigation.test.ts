import { describe, expect, it } from 'vitest';

import { hashFor, parseHash } from './useHashNavigation';

describe('hash navigation', () => {
  it('maps top-level product pages', () => {
    expect(parseHash('#/')).toEqual({ page: 'home' });
    expect(parseHash('#/learn')).toEqual({ page: 'learn' });
    expect(parseHash('#/practice')).toEqual({ page: 'practice' });
    expect(parseHash('#/code')).toEqual({ page: 'code' });
    expect(parseHash('#/code/classic-binary-search')).toEqual({ page: 'code', codeProblemId: 'classic-binary-search' });
    expect(parseHash('#/progress')).toEqual({ page: 'progress' });
  });

  it('deep-links directly to a known lesson', () => {
    expect(parseHash('#/lesson/binary-search')).toEqual({
      page: 'lesson',
      patternId: 'binary-search',
    });
  });

  it('falls back to the library for an unknown lesson id', () => {
    expect(parseHash('#/lesson/not-a-real-pattern')).toEqual({ page: 'learn' });
  });

  it('creates stable shareable hashes', () => {
    expect(hashFor('home')).toBe('#/');
    expect(hashFor('practice')).toBe('#/practice');
    expect(hashFor('code')).toBe('#/code');
    expect(hashFor('code', 'classic-binary-search')).toBe('#/code/classic-binary-search');
    expect(hashFor('lesson', 'sliding-window')).toBe('#/lesson/sliding-window');
  });
});
