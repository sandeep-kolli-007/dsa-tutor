import { describe, expect, it } from 'vitest';

import { buildExploreFrames } from './frameGenerators';

describe('foundational explore frame generators', () => {
  it('slides a fixed window while reusing the running sum', () => {
    const result = buildExploreFrames('sliding-window', [4, 7, 3, 9, 6, 8], 3);

    expect(result.error).toBeUndefined();
    expect(result.frames).toHaveLength(4);
    expect(result.frames?.at(-1)?.windowStart).toBe(3);
    expect(result.frames?.at(-1)?.windowEnd).toBe(5);
    expect(result.frames?.at(-1)?.metric).toContain('BEST 23');
  });

  it('finds a target pair with two pointers', () => {
    const result = buildExploreFrames('two-pointers', [2, 4, 7, 11, 18], 15);

    expect(result.error).toBeUndefined();
    expect(result.frames?.at(-1)?.metric).toContain('15 ✓');
    expect(result.frames?.at(-1)?.left).toBe(1);
    expect(result.frames?.at(-1)?.right).toBe(3);
  });

  it('finds a target with binary search', () => {
    const result = buildExploreFrames('binary-search', [2, 4, 7, 11, 18, 25, 31], 25);

    expect(result.error).toBeUndefined();
    expect(result.frames?.at(-1)?.mid).toBe(5);
    expect(result.frames?.at(-1)?.metric).toBe('INDEX 5 ✓');
  });

  it('rejects unsorted input for elimination-based search patterns', () => {
    const result = buildExploreFrames('binary-search', [7, 2, 4], 4);

    expect(result.frames).toBeUndefined();
    expect(result.error).toContain('ascending sorted order');
  });

  it('rejects invalid window sizes', () => {
    const result = buildExploreFrames('sliding-window', [1, 2, 3], 4);

    expect(result.frames).toBeUndefined();
    expect(result.error).toContain('Window size');
  });
});
