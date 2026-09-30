import type { CodeProblem } from '../types/code';

export const codeProblems: CodeProblem[] = [
  {
    id: 'max-fixed-window-sum',
    patternId: 'sliding-window',
    title: 'Maximum Fixed Window Sum',
    difficulty: 'EASY',
    prompt: 'Given an integer array nums and a positive integer k, return the maximum sum of any contiguous subarray of length exactly k.',
    whyPattern: 'Neighboring length-k subarrays share k-1 elements, so reuse the previous sum instead of recalculating every window.',
    functionName: 'maxFixedWindowSum',
    signature: 'maxFixedWindowSum(nums, k) → number',
    examples: [
      { input: '[4,7,3,9,6,8], 3', output: '23' },
      { input: '[-5,-2,-3], 2', output: '-5' },
    ],
    constraints: ['1 ≤ k ≤ nums.length', 'nums may contain negative values', 'Aim for O(n) time and O(1) extra space'],
    hints: ['Compute the first window once.', 'When the window moves, subtract the outgoing value and add the incoming value.'],
    starterCode: `function maxFixedWindowSum(nums, k) {
  // Return the best sum of any contiguous window of size k.
  
}`,
    solutionCode: `function maxFixedWindowSum(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;

  for (let right = k; right < nums.length; right++) {
    sum += nums[right] - nums[right - k];
    best = Math.max(best, sum);
  }

  return best;
}`,
    tests: [
      { name: 'sample', args: [[4,7,3,9,6,8],3], expected: 23 },
      { name: 'all negative', args: [[-5,-2,-3],2], expected: -5 },
      { name: 'whole array', args: [[2,4,6],3], expected: 12 },
      { name: 'single cell', args: [[9,-1,3],1], expected: 9, hidden: true },
    ],
  },
  {
    id: 'sorted-pair-target',
    patternId: 'two-pointers',
    title: 'Pair With Target in Sorted Array',
    difficulty: 'EASY',
    prompt: 'Given an ascending sorted array nums and target, return true if two distinct values sum to target. Otherwise return false.',
    whyPattern: 'Sorted order tells you which pointer movement safely eliminates impossible pairs.',
    functionName: 'hasPairWithTarget',
    signature: 'hasPairWithTarget(nums, target) → boolean',
    examples: [
      { input: '[2,4,7,11,18], 15', output: 'true' },
      { input: '[1,3,8,12], 10', output: 'false' },
    ],
    constraints: ['nums is sorted ascending', 'Use two distinct indices', 'Aim for O(n) time and O(1) extra space'],
    hints: ['Start at both ends.', 'Too small means the left value must increase; too large means the right value must decrease.'],
    starterCode: `function hasPairWithTarget(nums, target) {
  // Use the sorted order instead of a nested loop.
  
}`,
    solutionCode: `function hasPairWithTarget(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }

  return false;
}`,
    tests: [
      { name: 'pair exists', args: [[2,4,7,11,18],15], expected: true },
      { name: 'no pair', args: [[1,3,8,12],10], expected: false },
      { name: 'negative values', args: [[-8,-3,1,4,10],1], expected: true },
      { name: 'cannot reuse same index', args: [[1,2,4],8], expected: false, hidden: true },
    ],
  },
  {
    id: 'classic-binary-search',
    patternId: 'binary-search',
    title: 'Classic Binary Search',
    difficulty: 'EASY',
    prompt: 'Return the index of target in an ascending sorted array of unique integers. Return -1 when target is absent.',
    whyPattern: 'Each comparison proves that one half of the remaining search space cannot contain the answer.',
    functionName: 'binarySearch',
    signature: 'binarySearch(nums, target) → index',
    examples: [
      { input: '[2,4,7,11,18,25,31], 25', output: '5' },
      { input: '[2,4,7,11], 6', output: '-1' },
    ],
    constraints: ['nums is sorted and contains unique integers', 'Return -1 if absent', 'Aim for O(log n) time'],
    hints: ['Use a closed [left,right] interval.', 'Once mid is ruled out, remove it with mid + 1 or mid - 1.'],
    starterCode: `function binarySearch(nums, target) {
  // Return the target index or -1.
  
}`,
    solutionCode: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
    tests: [
      { name: 'find middle-right', args: [[2,4,7,11,18,25,31],25], expected: 5 },
      { name: 'absent', args: [[2,4,7,11],6], expected: -1 },
      { name: 'first value', args: [[3,8,12,20],3], expected: 0 },
      { name: 'last value', args: [[3,8,12,20],20], expected: 3, hidden: true },
    ],
  },
  {
    id: 'range-sum-queries',
    patternId: 'prefix-sum',
    title: 'Range Sum Queries',
    difficulty: 'EASY',
    prompt: 'Given nums and a list of inclusive [left,right] queries, return the sum for every query.',
    whyPattern: 'One prefix array turns each later range query into two O(1) lookups.',
    functionName: 'rangeSums',
    signature: 'rangeSums(nums, queries) → number[]',
    examples: [
      { input: '[2,5,1,4], [[0,1],[1,3]]', output: '[7,10]' },
    ],
    constraints: ['0 ≤ left ≤ right < nums.length', 'Many queries may be supplied', 'Aim for O(n + q) total time'],
    hints: ['Let prefix[i+1] include nums[i].', 'sum(left..right) = prefix[right+1] - prefix[left].'],
    starterCode: `function rangeSums(nums, queries) {
  // Build once, answer many ranges.
  
}`,
    solutionCode: `function rangeSums(nums, queries) {
  const prefix = Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  return queries.map(([left, right]) =>
    prefix[right + 1] - prefix[left]
  );
}`,
    tests: [
      { name: 'two ranges', args: [[2,5,1,4],[[0,1],[1,3]]], expected: [7,10] },
      { name: 'single cells', args: [[3,-2,8],[[0,0],[1,1],[2,2]]], expected: [3,-2,8] },
      { name: 'full range', args: [[1,2,3,4],[[0,3]]], expected: [10] },
      { name: 'mixed ranges', args: [[5,1,7,2,4],[[1,3],[2,4],[0,2]]], expected: [10,13,13], hidden: true },
    ],
  },
  {
    id: 'next-greater-elements',
    patternId: 'monotonic-stack',
    title: 'Next Greater Element',
    difficulty: 'MEDIUM',
    prompt: 'For every element, return the first greater value to its right. Return -1 when no greater value exists.',
    whyPattern: 'A decreasing stack stores unresolved values; one larger incoming value can resolve many of them at once.',
    functionName: 'nextGreater',
    signature: 'nextGreater(nums) → number[]',
    examples: [
      { input: '[2,1,5,3,4]', output: '[5,5,-1,4,-1]' },
    ],
    constraints: ['Return values, not indices', 'Aim for O(n) time', 'Each index should enter and leave the stack at most once'],
    hints: ['Store indices whose answer is still unknown.', 'While current > value at stack top, current is that index’s answer.'],
    starterCode: `function nextGreater(nums) {
  // Return the first greater value to the right for each index.
  
}`,
    solutionCode: `function nextGreater(nums) {
  const answer = Array(nums.length).fill(-1);
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      answer[stack.pop()] = nums[i];
    }
    stack.push(i);
  }

  return answer;
}`,
    tests: [
      { name: 'mixed', args: [[2,1,5,3,4]], expected: [5,5,-1,4,-1] },
      { name: 'decreasing', args: [[5,4,3]], expected: [-1,-1,-1] },
      { name: 'increasing', args: [[1,2,3,4]], expected: [2,3,4,-1] },
      { name: 'duplicates', args: [[2,2,3]], expected: [3,3,-1], hidden: true },
    ],
  },
  {
    id: 'merge-overlapping-intervals',
    patternId: 'merge-intervals',
    title: 'Merge Overlapping Intervals',
    difficulty: 'MEDIUM',
    prompt: 'Merge all overlapping inclusive intervals and return non-overlapping intervals sorted by start.',
    whyPattern: 'After sorting by start, only the most recently merged interval can overlap the next interval.',
    functionName: 'mergeIntervals',
    signature: 'mergeIntervals(intervals) → number[][]',
    examples: [
      { input: '[[1,3],[2,6],[8,10],[9,12]]', output: '[[1,6],[8,12]]' },
    ],
    constraints: ['Intervals are [start,end] with start ≤ end', 'Touching at the same endpoint counts as overlap', 'Aim for O(n log n) due to sorting'],
    hints: ['Sort by start first.', 'Compare next.start with the end of the last merged interval.'],
    starterCode: `function mergeIntervals(intervals) {
  // Return merged intervals sorted by start.
  
}`,
    solutionCode: `function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  const sorted = intervals.map(x => [...x]).sort((a,b) => a[0] - b[0]);
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const next = sorted[i];
    if (next[0] <= last[1]) last[1] = Math.max(last[1], next[1]);
    else merged.push(next);
  }

  return merged;
}`,
    tests: [
      { name: 'multiple overlaps', args: [[[1,3],[2,6],[8,10],[9,12]]], expected: [[1,6],[8,12]] },
      { name: 'already separate', args: [[[1,2],[4,5]]], expected: [[1,2],[4,5]] },
      { name: 'contained interval', args: [[[1,10],[3,4],[5,7]]], expected: [[1,10]] },
      { name: 'touching endpoints', args: [[[1,2],[2,4],[6,8]]], expected: [[1,4],[6,8]], hidden: true },
    ],
  },
  {
    id: 'unweighted-shortest-distance',
    patternId: 'graph-traversal',
    title: 'Shortest Distance in an Unweighted Graph',
    difficulty: 'MEDIUM',
    prompt: 'Given n vertices labeled 0..n-1, undirected edges, start and target, return the minimum number of edges from start to target. Return -1 if unreachable.',
    whyPattern: 'BFS explores nodes in increasing distance layers, so the first time target is discovered its distance is minimal.',
    functionName: 'shortestDistance',
    signature: 'shortestDistance(n, edges, start, target) → number',
    examples: [
      { input: '5, [[0,1],[1,2],[0,3],[3,4],[4,2]], 0, 2', output: '2' },
    ],
    constraints: ['Graph is undirected and unweighted', 'Vertices are 0..n-1', 'Aim for O(V+E)'],
    hints: ['Build an adjacency list.', 'Mark a node visited when enqueuing it, not later when dequeuing.'],
    starterCode: `function shortestDistance(n, edges, start, target) {
  // BFS by distance layers.
  
}`,
    solutionCode: `function shortestDistance(n, edges, start, target) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a,b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const queue = [start];
  const dist = Array(n).fill(-1);
  dist[start] = 0;

  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    if (node === target) return dist[node];

    for (const next of graph[node]) {
      if (dist[next] !== -1) continue;
      dist[next] = dist[node] + 1;
      queue.push(next);
    }
  }

  return -1;
}`,
    tests: [
      { name: 'two edges away', args: [5,[[0,1],[1,2],[0,3],[3,4],[4,2]],0,2], expected: 2 },
      { name: 'same node', args: [3,[[0,1]],1,1], expected: 0 },
      { name: 'unreachable', args: [4,[[0,1],[2,3]],0,3], expected: -1 },
      { name: 'direct edge wins', args: [5,[[0,1],[1,2],[2,3],[0,3],[3,4]],0,4], expected: 2, hidden: true },
    ],
  },
  {
    id: 'climbing-stairs-dp',
    patternId: 'dynamic-programming',
    title: 'Climbing Stairs',
    difficulty: 'EASY',
    prompt: 'You may climb 1 or 2 steps at a time. Return the number of distinct ways to reach exactly step n.',
    whyPattern: 'Every route to n must come from n-1 or n-2, so those solved states are reusable.',
    functionName: 'climbStairs',
    signature: 'climbStairs(n) → number',
    examples: [
      { input: '5', output: '8' },
    ],
    constraints: ['1 ≤ n ≤ 40', 'Aim for O(n) time', 'O(1) space is possible'],
    hints: ['Define dp[i] as ways to reach step i.', 'The transition is dp[i-1] + dp[i-2].'],
    starterCode: `function climbStairs(n) {
  // Reuse the previous two solved states.
  
}`,
    solutionCode: `function climbStairs(n) {
  if (n <= 2) return n;
  let twoBack = 1;
  let oneBack = 2;

  for (let step = 3; step <= n; step++) {
    const current = oneBack + twoBack;
    twoBack = oneBack;
    oneBack = current;
  }

  return oneBack;
}`,
    tests: [
      { name: 'one step', args: [1], expected: 1 },
      { name: 'five steps', args: [5], expected: 8 },
      { name: 'ten steps', args: [10], expected: 89 },
      { name: 'larger', args: [20], expected: 10946, hidden: true },
    ],
  },
  {
    id: 'maximum-subarray-sum',
    patternId: 'kadane',
    title: 'Maximum Subarray Sum',
    difficulty: 'MEDIUM',
    prompt: 'Return the maximum possible sum of one non-empty contiguous subarray.',
    whyPattern: 'At each position, the only useful history is the best subarray that must end at the previous index.',
    functionName: 'maxSubarraySum',
    signature: 'maxSubarraySum(nums) → number',
    examples: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
    ],
    constraints: ['nums is non-empty', 'Subarray must be contiguous', 'Handle all-negative arrays'],
    hints: ['For each x, choose between starting fresh at x or extending current.', 'Keep a second variable for the best value seen anywhere.'],
    starterCode: `function maxSubarraySum(nums) {
  // Best subarray must be non-empty.
  
}`,
    solutionCode: `function maxSubarraySum(nums) {
  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }

  return best;
}`,
    tests: [
      { name: 'classic', args: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { name: 'all negative', args: [[-8,-3,-6,-2,-5]], expected: -2 },
      { name: 'single', args: [[9]], expected: 9 },
      { name: 'best at end', args: [[-4,2,3,-1,5]], expected: 9, hidden: true },
    ],
  },
  {
    id: 'range-add-updates',
    patternId: 'difference-array',
    title: 'Apply Many Range Add Updates',
    difficulty: 'MEDIUM',
    prompt: 'Start with an array of n zeros. Each update is [left,right,delta]. Apply all inclusive range additions and return the final array.',
    whyPattern: 'Each additive range update can be represented by one start boundary and one stop boundary, then expanded with one prefix pass.',
    functionName: 'applyRangeUpdates',
    signature: 'applyRangeUpdates(n, updates) → number[]',
    examples: [
      { input: '6, [[1,4,3],[2,3,2]]', output: '[0,3,5,5,3,0]' },
    ],
    constraints: ['0 ≤ left ≤ right < n', 'Updates are offline', 'Aim for O(n + updates.length)'],
    hints: ['Add delta at left.', 'Subtract delta at right + 1 when that index exists, then prefix-sum the diff array.'],
    starterCode: `function applyRangeUpdates(n, updates) {
  // Use boundary deltas, then reconstruct once.
  
}`,
    solutionCode: `function applyRangeUpdates(n, updates) {
  const diff = Array(n + 1).fill(0);

  for (const [left, right, delta] of updates) {
    diff[left] += delta;
    if (right + 1 < n) diff[right + 1] -= delta;
  }

  const result = Array(n).fill(0);
  let running = 0;
  for (let i = 0; i < n; i++) {
    running += diff[i];
    result[i] = running;
  }

  return result;
}`,
    tests: [
      { name: 'overlapping updates', args: [6,[[1,4,3],[2,3,2]]], expected: [0,3,5,5,3,0] },
      { name: 'full range', args: [4,[[0,3,5]]], expected: [5,5,5,5] },
      { name: 'negative delta', args: [5,[[0,2,4],[1,4,-1]]], expected: [4,3,3,-1,-1] },
      { name: 'single index update', args: [3,[[1,1,7]]], expected: [0,7,0], hidden: true },
    ],
  },
  {
    id: 'kth-smallest-quickselect',
    patternId: 'quickselect',
    title: 'Kth Smallest Element',
    difficulty: 'MEDIUM',
    prompt: 'Return the kth smallest value in an unsorted array, where k is 1-based.',
    whyPattern: 'A partition fixes one pivot rank permanently, letting you recurse only toward the rank that contains k.',
    functionName: 'kthSmallest',
    signature: 'kthSmallest(nums, k) → number',
    examples: [
      { input: '[7,2,9,4,5,1], 4', output: '5' },
    ],
    constraints: ['1 ≤ k ≤ nums.length', 'You may mutate a local copy', 'Target average O(n) time'],
    hints: ['Convert k to zero-based target index.', 'After partition, compare pivot index with target and discard one whole side.'],
    starterCode: `function kthSmallest(nums, k) {
  // Use partition rank; do not fully sort.
  
}`,
    solutionCode: `function kthSmallest(nums, k) {
  const a = [...nums];
  const target = k - 1;
  let left = 0, right = a.length - 1;

  while (left <= right) {
    const pivotValue = a[right];
    let p = left;

    for (let i = left; i < right; i++) {
      if (a[i] <= pivotValue) {
        [a[p], a[i]] = [a[i], a[p]];
        p++;
      }
    }

    [a[p], a[right]] = [a[right], a[p]];

    if (p === target) return a[p];
    if (p < target) left = p + 1;
    else right = p - 1;
  }
}`,
    tests: [
      { name: 'middle rank', args: [[7,2,9,4,5,1],4], expected: 5 },
      { name: 'minimum', args: [[8,3,6,2],1], expected: 2 },
      { name: 'maximum', args: [[8,3,6,2],4], expected: 8 },
      { name: 'duplicates', args: [[4,2,4,1,3],3], expected: 3, hidden: true },
    ],
  },
  {
    id: 'minimum-coins',
    patternId: 'coin-change',
    title: 'Minimum Coins',
    difficulty: 'MEDIUM',
    prompt: 'Given reusable positive coin denominations and amount, return the minimum coins required to make exactly amount. Return -1 if impossible.',
    whyPattern: 'Every optimal amount x can be formed by choosing one final coin and reusing the already-solved state x - coin.',
    functionName: 'minCoins',
    signature: 'minCoins(coins, amount) → number',
    examples: [
      { input: '[1,3,4], 6', output: '2' },
    ],
    constraints: ['Coins may be reused unlimited times', 'amount ≥ 0', 'Return -1 if unreachable'],
    hints: ['Set dp[0] = 0 and everything else to Infinity.', 'For each amount, try every coin that can be the last coin.'],
    starterCode: `function minCoins(coins, amount) {
  // Return -1 when the target cannot be formed.
  
}`,
    solutionCode: `function minCoins(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let x = 1; x <= amount; x++) {
    for (const coin of coins) {
      if (coin <= x) dp[x] = Math.min(dp[x], 1 + dp[x - coin]);
    }
  }

  return Number.isFinite(dp[amount]) ? dp[amount] : -1;
}`,
    tests: [
      { name: 'simple', args: [[1,3,4],6], expected: 2 },
      { name: 'impossible', args: [[2,4],7], expected: -1 },
      { name: 'zero amount', args: [[2,5],0], expected: 0 },
      { name: 'non-greedy optimum', args: [[1,3,4],10], expected: 3, hidden: true },
    ],
  },
  {
    id: 'first-duplicate',
    patternId: 'frequency-map',
    title: 'First Duplicate Value',
    difficulty: 'EASY',
    prompt: 'Return the first value that appears for the second time while scanning left to right. Return null if every value is unique.',
    whyPattern: 'A set summarizes exactly which values have already appeared, turning repeated membership checks into average O(1).',
    functionName: 'firstDuplicate',
    signature: 'firstDuplicate(nums) → number | null',
    examples: [{ input: '[2,1,3,5,3,2]', output: '3' }],
    constraints: ['Preserve scan order', 'Return the value, not the index', 'Aim for O(n) average time'],
    hints: ['Maintain a Set of seen values.', 'The first value already in the set is the answer.'],
    starterCode: `function firstDuplicate(nums) {
  // Return the first value whose second occurrence appears earliest.
  
}`,
    solutionCode: `function firstDuplicate(nums) {
  const seen = new Set();
  for (const value of nums) {
    if (seen.has(value)) return value;
    seen.add(value);
  }
  return null;
}`,
    tests: [
      { name: 'middle duplicate', args: [[2,1,3,5,3,2]], expected: 3 },
      { name: 'no duplicate', args: [[1,2,3,4]], expected: null },
      { name: 'immediate duplicate', args: [[7,7,1]], expected: 7 },
      { name: 'negative values', args: [[-2,4,-2,4]], expected: -2, hidden: true },
    ],
  },
  {
    id: 'linked-list-cycle-index',
    patternId: 'fast-slow',
    title: 'Linked List Cycle Entry',
    difficulty: 'MEDIUM',
    prompt: 'Given nextIndex where nextIndex[i] is the next node index or -1, and a start index, return the index where the cycle begins. Return -1 if no cycle exists.',
    whyPattern: 'Fast and slow pointers detect a cycle without storing every visited node; resetting one pointer reveals the entry.',
    functionName: 'cycleEntry',
    signature: 'cycleEntry(nextIndex, start) → index',
    examples: [{ input: '[1,2,3,1], 0', output: '1' }],
    constraints: ['Each node has at most one outgoing next pointer', 'Use O(1) extra pointer state', 'Return -1 for acyclic chains'],
    hints: ['Advance slow by one and fast by two until they meet.', 'After a meeting, reset one pointer to start and move both one step at a time.'],
    starterCode: `function cycleEntry(nextIndex, start) {
  // Floyd cycle detection + entry recovery.
  
}`,
    solutionCode: `function cycleEntry(nextIndex, start) {
  const next = (i) => i === -1 ? -1 : nextIndex[i];
  let slow = start;
  let fast = start;

  while (fast !== -1 && next(fast) !== -1) {
    slow = next(slow);
    fast = next(next(fast));
    if (slow === fast) {
      let a = start;
      let b = slow;
      while (a !== b) {
        a = next(a);
        b = next(b);
      }
      return a;
    }
  }

  return -1;
}`,
    tests: [
      { name: 'cycle starts at 1', args: [[1,2,3,1],0], expected: 1 },
      { name: 'no cycle', args: [[1,2,3,-1],0], expected: -1 },
      { name: 'self cycle', args: [[0],0], expected: 0 },
      { name: 'cycle after prefix', args: [[1,2,3,4,2],0], expected: 2, hidden: true },
    ],
  },
  {
    id: 'top-k-frequent',
    patternId: 'heap-top-k',
    title: 'Top K Frequent Values',
    difficulty: 'MEDIUM',
    prompt: 'Return the k most frequent values. When frequencies tie, return the smaller value first.',
    whyPattern: 'Frequency counting reduces the raw input, then Top-K selection keeps only the strongest candidates.',
    functionName: 'topKFrequent',
    signature: 'topKFrequent(nums, k) → number[]',
    examples: [{ input: '[1,1,1,2,2,3], 2', output: '[1,2]' }],
    constraints: ['1 ≤ k ≤ number of distinct values', 'Tie-break by smaller numeric value', 'Do not return duplicates'],
    hints: ['First build a frequency map.', 'For this exercise, selecting after counting is acceptable; think of a heap when the distinct set is very large or streaming.'],
    starterCode: `function topKFrequent(nums, k) {
  // Count first, then keep the strongest k candidates.
  
}`,
    solutionCode: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const value of nums) {
    freq.set(value, (freq.get(value) || 0) + 1);
  }

  return [...freq.entries()]
    .sort((a,b) => b[1] - a[1] || a[0] - b[0])
    .slice(0, k)
    .map(([value]) => value);
}`,
    tests: [
      { name: 'classic', args: [[1,1,1,2,2,3],2], expected: [1,2] },
      { name: 'tie break', args: [[4,4,2,2,3],2], expected: [2,4] },
      { name: 'one distinct', args: [[9,9,9],1], expected: [9] },
      { name: 'mixed signs', args: [[-1,-1,2,2,3,3,3],2], expected: [3,-1], hidden: true },
    ],
  },
  {
    id: 'generate-parentheses',
    patternId: 'backtracking',
    title: 'Generate Parentheses',
    difficulty: 'MEDIUM',
    prompt: 'Return all valid strings containing n pairs of parentheses, sorted lexicographically.',
    whyPattern: 'At every position you make a constrained choice, recurse, then undo. Invalid prefixes are pruned before they grow.',
    functionName: 'generateParentheses',
    signature: 'generateParentheses(n) → string[]',
    examples: [{ input: '3', output: '["((()))","(()())","(())()","()(())","()()()"]' }],
    constraints: ['1 ≤ n ≤ 8', 'Only valid parentheses strings', 'Return lexicographically sorted output'],
    hints: ['You may add "(" while open < n.', 'You may add ")" only while close < open.'],
    starterCode: `function generateParentheses(n) {
  // Choose, explore, undo while preserving prefix validity.
  
}`,
    solutionCode: `function generateParentheses(n) {
  const out = [];

  function dfs(path, open, close) {
    if (path.length === 2 * n) {
      out.push(path);
      return;
    }
    if (open < n) dfs(path + '(', open + 1, close);
    if (close < open) dfs(path + ')', open, close + 1);
  }

  dfs('', 0, 0);
  return out;
}`,
    tests: [
      { name: 'one pair', args: [1], expected: ['()'] },
      { name: 'two pairs', args: [2], expected: ['(())','()()'] },
      { name: 'three pairs', args: [3], expected: ['((()))','(()())','(())()','()(())','()()()'] },
      { name: 'four pairs count/order', args: [4], expected: ['(((())))','((()()))','((())())','((()))()','(()(()))','(()()())','(()())()','(())(())','(())()()','()((()))','()(()())','()(())()','()()(())','()()()()'], hidden: true },
    ],
  },
  {
    id: 'prefix-count',
    patternId: 'trie',
    title: 'Count Words With Prefix',
    difficulty: 'MEDIUM',
    prompt: 'Given lowercase words and a prefix, return how many words begin with that prefix.',
    whyPattern: 'A trie shares common prefixes, so prefix queries walk only the prefix length instead of rescanning every full word.',
    functionName: 'countPrefix',
    signature: 'countPrefix(words, prefix) → number',
    examples: [{ input: '["cat","car","cart","dog"], "ca"', output: '3' }],
    constraints: ['Words contain lowercase a-z', 'Duplicate words count separately', 'Build a prefix structure before querying'],
    hints: ['Each trie node can store how many inserted words pass through it.', 'Increment the count after moving into each character node.'],
    starterCode: `function countPrefix(words, prefix) {
  // Build a trie with pass-through counts.
  
}`,
    solutionCode: `function countPrefix(words, prefix) {
  const root = { next: Object.create(null), count: 0 };

  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node.next[ch]) node.next[ch] = { next: Object.create(null), count: 0 };
      node = node.next[ch];
      node.count++;
    }
  }

  let node = root;
  for (const ch of prefix) {
    if (!node.next[ch]) return 0;
    node = node.next[ch];
  }
  return node.count;
}`,
    tests: [
      { name: 'shared ca prefix', args: [['cat','car','cart','dog'],'ca'], expected: 3 },
      { name: 'exact word prefix', args: [['a','ab','abc'],'a'], expected: 3 },
      { name: 'missing prefix', args: [['code','coder'],'cat'], expected: 0 },
      { name: 'duplicates count', args: [['app','app','apple'],'app'], expected: 3, hidden: true },
    ],
  },
  {
    id: 'connected-components-dsu',
    patternId: 'union-find',
    title: 'Count Connected Components',
    difficulty: 'MEDIUM',
    prompt: 'Given n vertices and undirected edges, return the number of connected components.',
    whyPattern: 'Union-Find maintains component representatives while edges progressively merge groups.',
    functionName: 'countComponents',
    signature: 'countComponents(n, edges) → number',
    examples: [{ input: '5, [[0,1],[1,2],[3,4]]', output: '2' }],
    constraints: ['Vertices are 0..n-1', 'Edges are undirected', 'Use DSU / Union-Find'],
    hints: ['Start with n separate components.', 'Decrease the component count only when union merges two different roots.'],
    starterCode: `function countComponents(n, edges) {
  // Union endpoints and track how many groups remain.
  
}`,
    solutionCode: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const size = Array(n).fill(1);
  let components = n;

  function find(x) {
    while (x !== parent[x]) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }

  for (const [a,b] of edges) {
    let ra = find(a), rb = find(b);
    if (ra === rb) continue;
    if (size[ra] < size[rb]) [ra,rb] = [rb,ra];
    parent[rb] = ra;
    size[ra] += size[rb];
    components--;
  }

  return components;
}`,
    tests: [
      { name: 'two components', args: [5,[[0,1],[1,2],[3,4]]], expected: 2 },
      { name: 'all isolated', args: [4,[]], expected: 4 },
      { name: 'one component', args: [4,[[0,1],[1,2],[2,3]]], expected: 1 },
      { name: 'redundant edge', args: [3,[[0,1],[1,2],[0,2]]], expected: 1, hidden: true },
    ],
  },
  {
    id: 'course-order',
    patternId: 'topological-sort',
    title: 'Course Order',
    difficulty: 'MEDIUM',
    prompt: 'Given numCourses and prerequisite pairs [course, prerequisite], return one valid order containing all courses. Return [] if a cycle makes completion impossible.',
    whyPattern: 'Prerequisites form a directed acyclic dependency graph when a valid schedule exists; topological sorting reveals a legal order.',
    functionName: 'courseOrder',
    signature: 'courseOrder(numCourses, prerequisites) → number[]',
    examples: [{ input: '4, [[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3] or [0,2,1,3]' }],
    constraints: ['Courses are 0..numCourses-1', 'Return any valid topological order', 'Return [] on cycles'],
    hints: ['Build indegree counts.', 'Start with all zero-indegree courses and remove their outgoing edges.'],
    starterCode: `function courseOrder(numCourses, prerequisites) {
  // Kahn's algorithm.
  
}`,
    solutionCode: `function courseOrder(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = Array(numCourses).fill(0);

  for (const [course, pre] of prerequisites) {
    graph[pre].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);

  const order = [];
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    order.push(node);
    for (const next of graph[node]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }

  return order.length === numCourses ? order : [];
}`,
    tests: [
      { name: 'diamond dependencies', args: [4,[[1,0],[2,0],[3,1],[3,2]]], expected: [0,1,2,3] },
      { name: 'simple chain', args: [3,[[1,0],[2,1]]], expected: [0,1,2] },
      { name: 'cycle', args: [2,[[1,0],[0,1]]], expected: [] },
      { name: 'independent courses', args: [3,[]], expected: [0,1,2], hidden: true },
    ],
  },
  {
    id: 'shortest-weighted-path',
    patternId: 'dijkstra',
    title: 'Shortest Weighted Distance',
    difficulty: 'MEDIUM',
    prompt: 'Given n vertices, non-negative undirected weighted edges [a,b,w], start and target, return the minimum distance or -1 if unreachable.',
    whyPattern: 'With non-negative weights, Dijkstra permanently settles the closest unsettled node first.',
    functionName: 'shortestWeightedDistance',
    signature: 'shortestWeightedDistance(n, edges, start, target) → number',
    examples: [{ input: '4, [[0,1,4],[0,2,1],[2,1,2],[1,3,1]], 0, 3', output: '4' }],
    constraints: ['All edge weights are non-negative', 'Graph is undirected', 'Return -1 if unreachable'],
    hints: ['Maintain tentative distances.', 'A simple O(V²) minimum-selection implementation is accepted here; the pattern is the relaxation invariant.'],
    starterCode: `function shortestWeightedDistance(n, edges, start, target) {
  // Dijkstra relaxation with non-negative weights.
  
}`,
    solutionCode: `function shortestWeightedDistance(n, edges, start, target) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a,b,w] of edges) {
    graph[a].push([b,w]);
    graph[b].push([a,w]);
  }

  const dist = Array(n).fill(Infinity);
  const used = Array(n).fill(false);
  dist[start] = 0;

  for (let step = 0; step < n; step++) {
    let v = -1;
    for (let i = 0; i < n; i++) {
      if (!used[i] && (v === -1 || dist[i] < dist[v])) v = i;
    }
    if (v === -1 || dist[v] === Infinity) break;
    used[v] = true;
    if (v === target) return dist[v];

    for (const [to,w] of graph[v]) {
      dist[to] = Math.min(dist[to], dist[v] + w);
    }
  }

  return dist[target] === Infinity ? -1 : dist[target];
}`,
    tests: [
      { name: 'weighted shortcut', args: [4,[[0,1,4],[0,2,1],[2,1,2],[1,3,1]],0,3], expected: 4 },
      { name: 'direct edge', args: [3,[[0,1,5],[0,2,2],[2,1,1]],0,1], expected: 3 },
      { name: 'unreachable', args: [4,[[0,1,2],[2,3,1]],0,3], expected: -1 },
      { name: 'same node', args: [2,[[0,1,7]],1,1], expected: 0, hidden: true },
    ],
  },
  {
    id: 'bst-search',
    patternId: 'bst',
    title: 'Search a Binary Search Tree',
    difficulty: 'EASY',
    prompt: 'The BST is given as nested objects {value,left,right}. Return true if target exists, otherwise false.',
    whyPattern: 'BST ordering discards one entire subtree after each comparison.',
    functionName: 'bstContains',
    signature: 'bstContains(root, target) → boolean',
    examples: [{ input: '{8,{4},{12}}, 12', output: 'true' }],
    constraints: ['All keys are unique', 'Respect BST ordering', 'Iterative or recursive solution accepted'],
    hints: ['Compare target with node.value.', 'Go left only when target is smaller; otherwise go right.'],
    starterCode: `function bstContains(root, target) {
  // Discard one subtree at every comparison.
  
}`,
    solutionCode: `function bstContains(root, target) {
  let node = root;
  while (node) {
    if (node.value === target) return true;
    node = target < node.value ? node.left : node.right;
  }
  return false;
}`,
    tests: [
      { name: 'present right', args: [{value:8,left:{value:4,left:null,right:null},right:{value:12,left:null,right:null}},12], expected: true },
      { name: 'present left', args: [{value:8,left:{value:4,left:null,right:null},right:null},4], expected: true },
      { name: 'absent', args: [{value:8,left:{value:4,left:null,right:null},right:{value:12,left:null,right:null}},6], expected: false },
      { name: 'empty tree', args: [null,3], expected: false, hidden: true },
    ],
  },
  {
    id: 'longest-common-subsequence',
    patternId: 'lcs',
    title: 'Longest Common Subsequence Length',
    difficulty: 'MEDIUM',
    prompt: 'Return the length of the longest subsequence that appears in both strings while preserving relative order.',
    whyPattern: 'Two prefix indices define reusable overlapping subproblems; equal characters take the diagonal, mismatches skip from one side.',
    functionName: 'lcsLength',
    signature: 'lcsLength(a, b) → number',
    examples: [{ input: '"abcde", "ace"', output: '3' }],
    constraints: ['Characters may be skipped', 'Subsequence is not required to be contiguous', 'Aim for O(n·m)'],
    hints: ['dp[i][j] represents prefixes a[0..i) and b[0..j).', 'On a mismatch use max(top,left).'],
    starterCode: `function lcsLength(a, b) {
  // Two-index dynamic programming.
  
}`,
    solutionCode: `function lcsLength(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }

  return dp[a.length][b.length];
}`,
    tests: [
      { name: 'ace', args: ['abcde','ace'], expected: 3 },
      { name: 'identical', args: ['abc','abc'], expected: 3 },
      { name: 'none', args: ['abc','xyz'], expected: 0 },
      { name: 'repeated chars', args: ['aabcc','adcaa'], expected: 3, hidden: true },
    ],
  },
  {
    id: 'edit-distance-code',
    patternId: 'edit-distance',
    title: 'Minimum Edit Distance',
    difficulty: 'HARD',
    prompt: 'Return the minimum number of insertions, deletions, and replacements needed to transform string a into string b.',
    whyPattern: 'Every mismatch has exactly three smaller prefix states corresponding to insert, delete, and replace.',
    functionName: 'editDistance',
    signature: 'editDistance(a, b) → number',
    examples: [{ input: '"horse", "ros"', output: '3' }],
    constraints: ['Each insert/delete/replace costs 1', 'Strings may be empty', 'Aim for O(n·m)'],
    hints: ['Initialize first row/column with prefix lengths.', 'Equal characters copy the diagonal; otherwise 1 + min(top,left,diagonal).'],
    starterCode: `function editDistance(a, b) {
  // Prefix DP over insert/delete/replace.
  
}`,
    solutionCode: `function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1];
      else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    }
  }

  return dp[a.length][b.length];
}`,
    tests: [
      { name: 'horse to ros', args: ['horse','ros'], expected: 3 },
      { name: 'empty to word', args: ['','abc'], expected: 3 },
      { name: 'same', args: ['matrix','matrix'], expected: 0 },
      { name: 'kitten to sitting', args: ['kitten','sitting'], expected: 3, hidden: true },
    ],
  },
  {
    id: 'zero-one-knapsack',
    patternId: 'knapsack',
    title: '0/1 Knapsack Value',
    difficulty: 'HARD',
    prompt: 'Given weights, values, and capacity, return the maximum value possible when each item may be chosen at most once.',
    whyPattern: 'Each item creates a take-or-skip decision over capacity states; backward capacity iteration prevents reusing the current item.',
    functionName: 'knapsack01',
    signature: 'knapsack01(weights, values, capacity) → number',
    examples: [{ input: '[2,3,4], [4,5,7], 5', output: '9' }],
    constraints: ['weights.length === values.length', 'Each item may be used once', 'Aim for O(n·capacity)'],
    hints: ['Use a 1D dp over capacity.', 'Iterate capacity backward for each item.'],
    starterCode: `function knapsack01(weights, values, capacity) {
  // Backward capacity iteration preserves 0/1 semantics.
  
}`,
    solutionCode: `function knapsack01(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    for (let c = capacity; c >= weights[i]; c--) {
      dp[c] = Math.max(dp[c], values[i] + dp[c - weights[i]]);
    }
  }

  return dp[capacity];
}`,
    tests: [
      { name: 'combine first two', args: [[2,3,4],[4,5,7],5], expected: 9 },
      { name: 'single best', args: [[4,5],[10,11],4], expected: 10 },
      { name: 'nothing fits', args: [[5,6],[10,20],3], expected: 0 },
      { name: 'avoid reuse', args: [[2,3],[6,7],4], expected: 7, hidden: true },
    ],
  }
];

export const codeProblemById = new Map(codeProblems.map((problem) => [problem.id, problem]));
export const codeProblemsByPattern = new Map(
  codeProblems.map((problem) => [problem.patternId, problem])
);
