import { describe, expect, it } from 'vitest';

import { dueReviewCount, pickNextReview, reviewDelayMs } from './reviewScheduler';
import type { PracticeStats } from '../state/practice';

const DAY = 24 * 60 * 60 * 1000;

describe('recognition review scheduler', () => {
  it('expands correct-answer spacing with streak', () => {
    expect(reviewDelayMs(true, 1)).toBe(DAY);
    expect(reviewDelayMs(true, 2)).toBe(3 * DAY);
    expect(reviewDelayMs(true, 3)).toBe(7 * DAY);
    expect(reviewDelayMs(true, 5)).toBe(30 * DAY);
    expect(reviewDelayMs(false, 8)).toBe(DAY);
  });

  it('prioritizes due reviews over unseen patterns', () => {
    const now = 1_000_000;
    const stats: PracticeStats = {
      answered: 1,
      correct: 0,
      byPattern: {
        'binary-search': {
          answered: 1,
          correct: 0,
          streak: 0,
          nextReviewAt: now - 1,
          lastAnsweredAt: now - DAY,
        },
      },
    };

    expect(pickNextReview(
      ['sliding-window','binary-search'],
      stats,
      undefined,
      now
    )).toBe('binary-search');
    expect(dueReviewCount(['sliding-window','binary-search'], stats, now)).toBe(1);
  });

  it('prefers unseen curriculum items when nothing is due', () => {
    const now = 1_000_000;
    const stats: PracticeStats = {
      answered: 1,
      correct: 1,
      byPattern: {
        'sliding-window': {
          answered: 1,
          correct: 1,
          streak: 1,
          nextReviewAt: now + DAY,
          lastAnsweredAt: now,
        },
      },
    };

    expect(pickNextReview(
      ['sliding-window','two-pointers','binary-search'],
      stats,
      undefined,
      now
    )).toBe('two-pointers');
  });
});
