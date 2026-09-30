import type { PatternId } from '../types/lesson';
import type { PracticeStats } from '../state/practice';

const DAY = 24 * 60 * 60 * 1000;

export function reviewDelayMs(correct: boolean, streak: number) {
  if (!correct) return DAY;
  const days = [1, 3, 7, 14, 30][Math.min(Math.max(streak - 1, 0), 4)];
  return days * DAY;
}

export function dueReviewCount(
  candidates: PatternId[],
  stats: PracticeStats,
  now = Date.now()
) {
  return candidates.filter((id) => {
    const item = stats.byPattern[id];
    return item?.nextReviewAt !== undefined && item.nextReviewAt <= now;
  }).length;
}

export function pickNextReview(
  candidates: PatternId[],
  stats: PracticeStats,
  currentId?: PatternId,
  now = Date.now()
): PatternId {
  const eligible = candidates.length ? candidates : [];
  if (!eligible.length) throw new Error('Review queue requires at least one candidate.');

  const ranked = eligible.map((id, curriculumIndex) => {
    const item = stats.byPattern[id];
    const answered = item?.answered ?? 0;
    const accuracy = answered ? (item?.correct ?? 0) / answered : 0;
    const nextReviewAt = item?.nextReviewAt;

    let bucket = 1;
    if (nextReviewAt !== undefined && nextReviewAt <= now) bucket = 0;
    else if (answered > 0) bucket = 2;

    return {
      id,
      curriculumIndex,
      bucket,
      accuracy,
      nextReviewAt: nextReviewAt ?? Number.MAX_SAFE_INTEGER,
      answered,
      isCurrent: id === currentId,
    };
  });

  ranked.sort((a, b) =>
    a.bucket - b.bucket ||
    Number(a.isCurrent) - Number(b.isCurrent) ||
    (a.bucket === 0 ? a.nextReviewAt - b.nextReviewAt : 0) ||
    a.accuracy - b.accuracy ||
    a.answered - b.answered ||
    a.curriculumIndex - b.curriculumIndex
  );

  return ranked[0].id;
}
