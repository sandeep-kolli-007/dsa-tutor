import type { Frame, PatternId } from '../types/lesson';

export type ExplorePatternId = 'sliding-window' | 'two-pointers' | 'binary-search';

export function supportsExplore(id: PatternId): id is ExplorePatternId {
  return id === 'sliding-window' || id === 'two-pointers' || id === 'binary-search';
}

export function buildExploreFrames(
  id: ExplorePatternId,
  nums: number[],
  parameter: number
): { frames?: Frame[]; error?: string } {
  if (nums.length === 0) return { error: 'Enter at least one number.' };
  if (nums.some((value) => !Number.isFinite(value))) return { error: 'Every array item must be a valid number.' };

  if (id === 'sliding-window') return buildSlidingWindow(nums, parameter);
  if (!isSorted(nums)) return { error: 'This explorer expects the array in ascending sorted order.' };
  if (id === 'two-pointers') return { frames: buildTwoPointers(nums, parameter) };
  return { frames: buildBinarySearch(nums, parameter) };
}

function buildSlidingWindow(nums: number[], k: number): { frames?: Frame[]; error?: string } {
  if (!Number.isInteger(k) || k < 1 || k > nums.length) {
    return { error: `Window size must be an integer from 1 to ${nums.length}.` };
  }

  const frames: Frame[] = [];
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;

  frames.push({
    title: 'Build the first window',
    explanation: `The first ${k} values sum to ${sum}. This becomes the initial best.`,
    values: nums,
    windowStart: 0,
    windowEnd: k - 1,
    active: range(0, k - 1),
    metric: `SUM ${sum} · BEST ${best}`,
    codeLine: 1,
  });

  for (let right = k; right < nums.length; right++) {
    const outgoing = right - k;
    const previous = sum;
    sum += nums[right] - nums[outgoing];
    best = Math.max(best, sum);
    frames.push({
      title: `Slide to [${outgoing + 1}..${right}]`,
      explanation: `Reuse the previous sum: ${previous} - ${nums[outgoing]} + ${nums[right]} = ${sum}.`,
      values: nums,
      windowStart: outgoing + 1,
      windowEnd: right,
      active: range(outgoing + 1, right),
      dimmed: range(0, outgoing),
      outgoing,
      incoming: right,
      metric: `SUM ${sum} · BEST ${best}`,
      codeLine: 4,
    });
  }

  return { frames };
}

function buildTwoPointers(nums: number[], target: number): Frame[] {
  const frames: Frame[] = [];
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    const active = [left, right];

    if (sum === target) {
      frames.push({
        title: 'Target pair found',
        explanation: `${nums[left]} + ${nums[right]} = ${target}. The two boundaries now satisfy the condition.`,
        values: nums,
        left,
        right,
        active,
        dimmed: outside(left, right, nums.length),
        metric: `${nums[left]} + ${nums[right]} = ${target} ✓`,
        codeLine: 4,
      });
      return frames;
    }

    if (sum < target) {
      frames.push({
        title: 'Sum is too small',
        explanation: `${nums[left]} + ${nums[right]} = ${sum}. Because the input is sorted, move only the left pointer right to increase the sum.`,
        values: nums,
        left,
        right,
        active,
        dimmed: outside(left, right, nums.length),
        metric: `${sum} < ${target} · LEFT →`,
        codeLine: 5,
      });
      left++;
    } else {
      frames.push({
        title: 'Sum is too large',
        explanation: `${nums[left]} + ${nums[right]} = ${sum}. Because the input is sorted, move only the right pointer left to decrease the sum.`,
        values: nums,
        left,
        right,
        active,
        dimmed: outside(left, right, nums.length),
        metric: `${sum} > ${target} · ← RIGHT`,
        codeLine: 6,
      });
      right--;
    }
  }

  frames.push({
    title: 'No pair matches the target',
    explanation: 'The pointers met after every remaining candidate pair was ruled out.',
    values: nums,
    left,
    right,
    active: [left],
    dimmed: outside(left, right, nums.length),
    metric: 'NO PAIR',
    codeLine: 8,
  });
  return frames;
}

function buildBinarySearch(nums: number[], target: number): Frame[] {
  const frames: Frame[] = [];
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = nums[mid];

    if (value === target) {
      frames.push({
        title: 'Target found at the middle',
        explanation: `nums[${mid}] is ${target}, so the search ends.`,
        values: nums,
        left,
        right,
        mid,
        active: [mid],
        dimmed: outside(left, right, nums.length),
        metric: `INDEX ${mid} ✓`,
        codeLine: 4,
      });
      return frames;
    }

    if (value < target) {
      frames.push({
        title: 'Discard the lower half',
        explanation: `${value} < ${target}. Every value at or left of index ${mid} is too small, so move left to mid + 1.`,
        values: nums,
        left,
        right,
        mid,
        active: [mid],
        dimmed: outside(left, right, nums.length),
        metric: `${value} < ${target} · LEFT → ${mid + 1}`,
        codeLine: 5,
      });
      left = mid + 1;
    } else {
      frames.push({
        title: 'Discard the upper half',
        explanation: `${value} > ${target}. Every value at or right of index ${mid} is too large, so move right to mid - 1.`,
        values: nums,
        left,
        right,
        mid,
        active: [mid],
        dimmed: outside(left, right, nums.length),
        metric: `${value} > ${target} · RIGHT → ${mid - 1}`,
        codeLine: 6,
      });
      right = mid - 1;
    }
  }

  frames.push({
    title: 'Search space is empty',
    explanation: `Left moved beyond right, so ${target} is not present in the array.`,
    values: nums,
    left: Math.max(0, Math.min(left, nums.length - 1)),
    right: Math.max(0, Math.min(right, nums.length - 1)),
    dimmed: range(0, nums.length - 1),
    metric: 'NOT FOUND',
    codeLine: 8,
  });
  return frames;
}

function range(start: number, end: number) {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function outside(left: number, right: number, length: number) {
  return Array.from({ length }, (_, index) => index).filter((index) => index < left || index > right);
}

function isSorted(nums: number[]) {
  return nums.every((value, index) => index === 0 || nums[index - 1] <= value);
}
