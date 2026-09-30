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
];

export const codeProblemById = new Map(codeProblems.map((problem) => [problem.id, problem]));
export const codeProblemsByPattern = new Map(
  codeProblems.map((problem) => [problem.patternId, problem])
);
