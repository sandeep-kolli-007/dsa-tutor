import { useEffect, useMemo, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRange,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import {
  arrowBackOutline,
  arrowForwardOutline,
  barChartOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  codeSlashOutline,
  flashOutline,
  homeOutline,
  pauseOutline,
  playOutline,
  refreshOutline,
  schoolOutline,
  sparklesOutline,
} from 'ionicons/icons';

type Page = 'home' | 'learn' | 'progress' | 'lesson';
type PatternId = 'sliding-window' | 'two-pointers' | 'binary-search' | 'prefix-sum' | 'fast-slow' | 'monotonic-stack' | 'merge-intervals' | 'graph-traversal' | 'heap-top-k' | 'backtracking' | 'dynamic-programming' | 'trie' | 'union-find' | 'topological-sort' | 'greedy' | 'bit-manipulation' | 'binary-search-answer' | 'dp-2d' | 'dijkstra';

type Frame = {
  title: string;
  explanation: string;
  values: number[];
  left?: number;
  right?: number;
  mid?: number;
  windowStart?: number;
  windowEnd?: number;
  active?: number[];
  dimmed?: number[];
  outgoing?: number;
  incoming?: number;
  metric?: string;
  codeLine: number;
  prefix?: number[];
  slow?: number;
  fast?: number;
  stack?: number[];
  queue?: number[];
  visited?: number[];
  edges?: [number, number][];
  intervals?: [number, number][];
  merged?: [number, number][];
  path?: number[];
  dp?: number[];
  labels?: string[];
  triePath?: string[];
  words?: string[];
  parents?: number[];
  indegree?: number[];
  weights?: [number, number, number][];
  distances?: number[];
  selected?: number[];
  bits?: string[];
  range?: [number, number];
  candidate?: number;
  feasible?: boolean;
  grid?: number[][];
  cell?: [number, number];
};

type Pattern = {
  id: PatternId;
  no: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  analogyTitle: string;
  analogyBody: string;
  mapping: [string, string][];
  invariant: string;
  signals: string[];
  avoid: string[];
  complexity: { time: string; space: string };
  frames: Frame[];
  code: string[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
};

const patterns: Pattern[] = [
  {
    id: 'sliding-window',
    no: '01',
    title: 'Sliding Window',
    subtitle: 'Move a reusable window instead of recalculating everything.',
    category: 'ARRAY PATTERN',
    summary: 'Use a moving contiguous range when neighboring answers share most of the same data.',
    analogyTitle: 'Find the busiest 3-hour period in a store',
    analogyBody:
      'A manager has hourly customer counts and wants the busiest continuous 3-hour block. When the block moves by one hour, two of the three hours are still the same. Reuse them instead of adding all three again.',
    mapping: [
      ['Hourly customer counts', 'Array'],
      ['Three-hour block', 'Fixed window'],
      ['Hour leaving the block', 'Outgoing element'],
      ['Next hour entering', 'Incoming element'],
    ],
    invariant: 'The current sum always represents exactly the elements inside the current window.',
    signals: [
      'Subarray or substring',
      'Contiguous range',
      'Longest / shortest / max / min',
      'Fixed K or a grow-shrink condition',
    ],
    avoid: [
      'Elements can be chosen from anywhere',
      'The property cannot be updated when the window changes',
      'The problem is really about subsets, not contiguous ranges',
    ],
    complexity: { time: 'O(n)', space: 'O(1)' },
    frames: [
      {
        title: 'Start with the first 3 hours',
        explanation: 'We pay the full cost once: 4 + 7 + 3 = 14.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 0,
        windowEnd: 2,
        active: [0, 1, 2],
        metric: 'SUM = 14',
        codeLine: 1,
      },
      {
        title: 'Move the window by one',
        explanation: 'The value 4 leaves. The value 9 enters. Values 7 and 3 stay.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 1,
        windowEnd: 3,
        active: [1, 2, 3],
        outgoing: 0,
        incoming: 3,
        metric: '14 - 4 + 9',
        codeLine: 3,
      },
      {
        title: 'Reuse the previous result',
        explanation: 'New sum = old sum - outgoing + incoming = 19.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 1,
        windowEnd: 3,
        active: [1, 2, 3],
        dimmed: [0],
        metric: 'SUM = 19',
        codeLine: 4,
      },
      {
        title: 'Slide again',
        explanation: 'Remove 7, add 6. The window now covers 3, 9, 6.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 2,
        windowEnd: 4,
        active: [2, 3, 4],
        outgoing: 1,
        incoming: 4,
        dimmed: [0, 1],
        metric: '19 - 7 + 6 = 18',
        codeLine: 4,
      },
      {
        title: 'One pass is enough',
        explanation: 'Every element enters once and leaves once. That is why the work is linear.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 3,
        windowEnd: 5,
        active: [3, 4, 5],
        dimmed: [0, 1, 2],
        metric: 'MAX = 23',
        codeLine: 6,
      },
    ],
    code: [
      'function maxWindowSum(nums, k) {',
      '  let sum = nums.slice(0, k).reduce((a, b) => a + b, 0);',
      '  let best = sum;',
      '  for (let right = k; right < nums.length; right++) {',
      '    sum += nums[right] - nums[right - k];',
      '    best = Math.max(best, sum);',
      '  }',
      '  return best;',
      '}',
    ],
    quiz: {
      question: 'Find the maximum sum of any 4 consecutive values in an array. Which pattern should enter your mind first?',
      options: ['DFS', 'Sliding Window', 'Heap', 'Union Find'],
      correct: 1,
      explanation: 'The values must be consecutive and neighboring windows overlap heavily, which is the classic fixed-size sliding-window signal.',
    },
  },
  {
    id: 'two-pointers',
    no: '02',
    title: 'Two Pointers',
    subtitle: 'Use two moving boundaries to eliminate impossible choices.',
    category: 'ARRAY PATTERN',
    summary: 'When movement from the left or right gives useful information, two coordinated pointers can collapse a search space.',
    analogyTitle: 'Two people search a sorted shelf from opposite ends',
    analogyBody:
      'You want two book prices that add to ₹1,000. One person starts at the cheapest end, the other at the most expensive end. If the sum is too small, only the cheaper side should move. If too large, only the expensive side should move.',
    mapping: [
      ['Cheapest end', 'Left pointer'],
      ['Costliest end', 'Right pointer'],
      ['Target budget', 'Target sum'],
      ['Move one person', 'Eliminate impossible pairs'],
    ],
    invariant: 'Every pair outside the current left-right range has already been ruled out.',
    signals: [
      'Sorted array or sortable input',
      'Pairs or triplets',
      'Opposite-end comparison',
      'Need to shrink a search space',
    ],
    avoid: [
      'No ordering information exists',
      'Moving a pointer does not eliminate possibilities',
      'You need arbitrary combinations',
    ],
    complexity: { time: 'O(n)', space: 'O(1)' },
    frames: [
      {
        title: 'Start at both ends',
        explanation: '2 + 18 = 20. Our target is 15, so the sum is too large.',
        values: [2, 4, 7, 11, 18],
        left: 0,
        right: 4,
        active: [0, 4],
        metric: '20 > 15',
        codeLine: 2,
      },
      {
        title: 'Move only the right pointer',
        explanation: 'Because the array is sorted, moving left would only make the sum larger. Move right inward.',
        values: [2, 4, 7, 11, 18],
        left: 0,
        right: 3,
        active: [0, 3],
        dimmed: [4],
        metric: '2 + 11 = 13',
        codeLine: 5,
      },
      {
        title: 'Now the sum is too small',
        explanation: '13 < 15, so increase the sum by moving the left pointer right.',
        values: [2, 4, 7, 11, 18],
        left: 1,
        right: 3,
        active: [1, 3],
        dimmed: [0, 4],
        metric: '4 + 11 = 15',
        codeLine: 4,
      },
      {
        title: 'Target found',
        explanation: 'The pointers meet the condition without checking every possible pair.',
        values: [2, 4, 7, 11, 18],
        left: 1,
        right: 3,
        active: [1, 3],
        dimmed: [0, 2, 4],
        metric: 'FOUND ✓',
        codeLine: 3,
      },
    ],
    code: [
      'function twoSumSorted(nums, target) {',
      '  let left = 0, right = nums.length - 1;',
      '  while (left < right) {',
      '    const sum = nums[left] + nums[right];',
      '    if (sum === target) return [left, right];',
      '    if (sum < target) left++;',
      '    else right--;',
      '  }',
      '  return null;',
      '}',
    ],
    quiz: {
      question: 'You have a sorted array and need a pair whose sum equals a target. What is the strongest first pattern?',
      options: ['Two Pointers', 'Prefix Sum', 'BFS', 'Backtracking'],
      correct: 0,
      explanation: 'Sorted order tells you which pointer movement can safely eliminate many impossible pairs.',
    },
  },
  {
    id: 'binary-search',
    no: '03',
    title: 'Binary Search',
    subtitle: 'Cut a valid search space in half after every decision.',
    category: 'SEARCH PATTERN',
    summary: 'Binary search is not only “search a sorted array.” It is a disciplined way to maintain and halve a valid answer range.',
    analogyTitle: 'Guess a number with higher/lower feedback',
    analogyBody:
      'Someone thinks of a number between 1 and 100. Instead of guessing 1, 2, 3... you guess the middle. “Higher” removes the entire lower half. “Lower” removes the entire upper half.',
    mapping: [
      ['Possible numbers', 'Search space'],
      ['Middle guess', 'mid'],
      ['Higher / lower feedback', 'Monotonic decision'],
      ['Discard half', 'Move a boundary'],
    ],
    invariant: 'If the target exists, it always remains inside the current [left, right] search space.',
    signals: [
      'Sorted or monotonic behavior',
      'Can answer “too small / too large”',
      'Search space can be halved safely',
      'Minimum feasible / maximum feasible answer',
    ],
    avoid: [
      'No monotonic relationship exists',
      'Discarding half could lose a valid answer',
      'Input is tiny and linear search is clearer',
    ],
    complexity: { time: 'O(log n)', space: 'O(1)' },
    frames: [
      {
        title: 'Define the search space',
        explanation: 'Target is 25. Start with every index still possible.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 0,
        right: 6,
        mid: 3,
        active: [3],
        metric: 'MID = 11',
        codeLine: 2,
      },
      {
        title: 'Compare the middle',
        explanation: '11 < 25, so the target cannot be at index 3 or anywhere to its left.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 0,
        right: 6,
        mid: 3,
        active: [3],
        metric: '11 < 25',
        codeLine: 4,
      },
      {
        title: 'Discard half',
        explanation: 'Move left to mid + 1. The target must still be inside the remaining range.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 4,
        right: 6,
        mid: 5,
        active: [5],
        dimmed: [0, 1, 2, 3],
        metric: 'SEARCH [4..6]',
        codeLine: 5,
      },
      {
        title: 'Check the new middle',
        explanation: 'The middle value is now 25.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 4,
        right: 6,
        mid: 5,
        active: [5],
        dimmed: [0, 1, 2, 3],
        metric: '25 = TARGET',
        codeLine: 3,
      },
      {
        title: 'Found',
        explanation: 'Each comparison removed about half of the remaining possibilities.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 4,
        right: 6,
        mid: 5,
        active: [5],
        dimmed: [0, 1, 2, 3],
        metric: 'INDEX 5 ✓',
        codeLine: 3,
      },
    ],
    code: [
      'function binarySearch(nums, target) {',
      '  let left = 0, right = nums.length - 1;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    if (nums[mid] === target) return mid;',
      '    if (nums[mid] < target) left = mid + 1;',
      '    else right = mid - 1;',
      '  }',
      '  return -1;',
      '}',
    ],
    quiz: {
      question: 'You need the minimum capacity that can ship all packages within D days. Feasibility changes monotonically as capacity increases. What pattern applies?',
      options: ['Sliding Window', 'Binary Search on Answer', 'DFS', 'Monotonic Stack'],
      correct: 1,
      explanation: 'The answer space is monotonic: once a capacity is feasible, every larger capacity is also feasible.',
    },
  },
  {
    id: 'prefix-sum',
    no: '04',
    title: 'Prefix Sum',
    subtitle: 'Precompute cumulative totals so range questions become subtraction.',
    category: 'ARRAY PATTERN',
    summary: 'Trade one preprocessing pass for constant-time range sums and repeated queries.',
    analogyTitle: 'Read a bank statement using running balances',
    analogyBody:
      'Instead of adding every transaction again whenever someone asks how much changed between Tuesday and Friday, keep a running balance. The change between two dates is just one cumulative total minus another.',
    mapping: [
      ['Daily transactions', 'Array values'],
      ['Running balance', 'Prefix array'],
      ['Date range', 'Subarray [L..R]'],
      ['Balance difference', 'prefix[R + 1] - prefix[L]'],
    ],
    invariant: 'prefix[i] stores the total of every original value before index i.',
    signals: [
      'Many range-sum queries',
      'Repeated work over the same prefix',
      'Subarray totals',
      'Need O(1) query after O(n) setup',
    ],
    avoid: [
      'The array changes constantly without a data structure for updates',
      'Only one tiny query exists',
      'The operation cannot be inverted by subtraction',
    ],
    complexity: { time: 'O(n) build, O(1) query', space: 'O(n)' },
    frames: [
      {
        title: 'Start with raw daily changes',
        explanation: 'These are the original values. A direct range query would add them again each time.',
        values: [3, -1, 4, 2, 5],
        active: [0],
        prefix: [0, 3, 2, 6, 8, 13],
        metric: 'BUILD PREFIX',
        codeLine: 1,
      },
      {
        title: 'Carry the total forward',
        explanation: 'After reading 3 and -1, the running total is 2.',
        values: [3, -1, 4, 2, 5],
        active: [0, 1],
        prefix: [0, 3, 2, 6, 8, 13],
        metric: 'PREFIX[2] = 2',
        codeLine: 3,
      },
      {
        title: 'Finish the cumulative array',
        explanation: 'Every position now answers: how much have we accumulated before here?',
        values: [3, -1, 4, 2, 5],
        active: [0, 1, 2, 3, 4],
        prefix: [0, 3, 2, 6, 8, 13],
        metric: '0 3 2 6 8 13',
        codeLine: 3,
      },
      {
        title: 'Ask for indices 1 through 3',
        explanation: 'Take everything before index 4, then remove everything before index 1.',
        values: [3, -1, 4, 2, 5],
        active: [1, 2, 3],
        dimmed: [0, 4],
        prefix: [0, 3, 2, 6, 8, 13],
        metric: '8 - 3 = 5',
        codeLine: 6,
      },
    ],
    code: [
      'function buildPrefix(nums) {',
      '  const prefix = Array(nums.length + 1).fill(0);',
      '  for (let i = 0; i < nums.length; i++) {',
      '    prefix[i + 1] = prefix[i] + nums[i];',
      '  }',
      '  return (left, right) =>',
      '    prefix[right + 1] - prefix[left];',
      '}',
    ],
    quiz: {
      question: 'You must answer 100,000 sum queries over an array that does not change. Which pattern removes repeated addition?',
      options: ['Prefix Sum', 'Heap', 'DFS', 'Fast & Slow'],
      correct: 0,
      explanation: 'One cumulative preprocessing pass lets every later range sum use only two prefix values.',
    },
  },
  {
    id: 'fast-slow',
    no: '05',
    title: 'Fast & Slow Pointers',
    subtitle: 'Let two runners move at different speeds to expose cycles and midpoints.',
    category: 'LINKED PATTERN',
    summary: 'Different pointer speeds reveal structure without extra memory.',
    analogyTitle: 'Two runners on a circular track',
    analogyBody:
      'If one runner moves twice as fast as another on a circular track, the faster runner must eventually lap the slower one. In a linked list, a meeting proves that a cycle exists.',
    mapping: [
      ['Runner moving 1 step', 'slow pointer'],
      ['Runner moving 2 steps', 'fast pointer'],
      ['Circular track', 'Linked-list cycle'],
      ['Runners meet', 'Cycle detected'],
    ],
    invariant: 'If a cycle exists, the fast pointer gains one node on the slow pointer every iteration until they meet.',
    signals: [
      'Linked-list cycle',
      'Find the middle node',
      'Repeated state in a chain',
      'Need O(1) extra space',
    ],
    avoid: [
      'Random access is the main operation',
      'You need the complete visited history',
      'Pointers cannot advance deterministically',
    ],
    complexity: { time: 'O(n)', space: 'O(1)' },
    frames: [
      {
        title: 'Both runners start together',
        explanation: 'Slow moves one node per round. Fast moves two.',
        values: [1, 2, 3, 4, 5, 6],
        slow: 0,
        fast: 0,
        metric: 'START',
        codeLine: 1,
      },
      {
        title: 'Fast begins gaining',
        explanation: 'Slow is at node 2. Fast has already reached node 3.',
        values: [1, 2, 3, 4, 5, 6],
        slow: 1,
        fast: 2,
        metric: 'SLOW 2 · FAST 3',
        codeLine: 4,
      },
      {
        title: 'The list loops back',
        explanation: 'After node 6, the next pointer returns to node 3. Fast stays inside the loop.',
        values: [1, 2, 3, 4, 5, 6],
        slow: 2,
        fast: 4,
        metric: '6 → 3',
        codeLine: 5,
      },
      {
        title: 'The runners meet',
        explanation: 'Inside a finite cycle, the faster pointer eventually catches the slower pointer.',
        values: [1, 2, 3, 4, 5, 6],
        slow: 4,
        fast: 4,
        metric: 'CYCLE ✓',
        codeLine: 6,
      },
    ],
    code: [
      'function hasCycle(head) {',
      '  let slow = head, fast = head;',
      '  while (fast && fast.next) {',
      '    slow = slow.next;',
      '    fast = fast.next.next;',
      '    if (slow === fast) return true;',
      '  }',
      '  return false;',
      '}',
    ],
    quiz: {
      question: 'You must detect a cycle in a linked list using O(1) extra space. Which pattern fits naturally?',
      options: ['Prefix Sum', 'Fast & Slow Pointers', 'Heap', 'Merge Intervals'],
      correct: 1,
      explanation: 'Different pointer speeds guarantee a meeting inside a cycle without storing a visited set.',
    },
  },
  {
    id: 'monotonic-stack',
    no: '06',
    title: 'Monotonic Stack',
    subtitle: 'Keep only candidates that can still matter to the future.',
    category: 'STACK PATTERN',
    summary: 'Maintain increasing or decreasing order so each new value can resolve older candidates immediately.',
    analogyTitle: 'People waiting to see the next taller person',
    analogyBody:
      'Imagine people standing in a line looking to the right. When a taller person arrives, they immediately answer the question for every shorter person waiting on the stack.',
    mapping: [
      ['People waiting', 'Stack entries'],
      ['New taller person', 'Current value'],
      ['Shorter people leave', 'Pop while invalid'],
      ['Still waiting', 'Monotonic invariant'],
    ],
    invariant: 'After each element, the stack preserves one monotonic order; anything that violates it is resolved and removed.',
    signals: [
      'Next greater / next smaller',
      'Previous greater / previous smaller',
      'Histogram boundaries',
      'Need nearest element satisfying an order relation',
    ],
    avoid: [
      'You need every pair, not the nearest useful one',
      'No monotonic relation can prune candidates',
      'Elements must be revisited arbitrarily',
    ],
    complexity: { time: 'O(n)', space: 'O(n)' },
    frames: [
      {
        title: 'Push the first unresolved value',
        explanation: 'Temperature 73 has not seen a warmer day yet, so it waits on the stack.',
        values: [73, 74, 75, 71, 69, 72],
        active: [0],
        stack: [73],
        metric: 'STACK [73]',
        codeLine: 2,
      },
      {
        title: 'A warmer value resolves 73',
        explanation: '74 is greater than the stack top 73, so 73 can be popped and answered.',
        values: [73, 74, 75, 71, 69, 72],
        active: [1],
        dimmed: [0],
        stack: [74],
        metric: 'POP 73 → PUSH 74',
        codeLine: 4,
      },
      {
        title: '75 resolves 74',
        explanation: 'Again, the new value is greater than the top. Pop until order is restored.',
        values: [73, 74, 75, 71, 69, 72],
        active: [2],
        dimmed: [0, 1],
        stack: [75],
        metric: 'STACK [75]',
        codeLine: 4,
      },
      {
        title: 'Smaller values can wait',
        explanation: '71 then 69 are smaller than 75, so the decreasing stack remains valid.',
        values: [73, 74, 75, 71, 69, 72],
        active: [3, 4],
        stack: [75, 71, 69],
        metric: '75 > 71 > 69',
        codeLine: 7,
      },
      {
        title: '72 resolves multiple candidates',
        explanation: '72 pops 69 and 71, then stops at 75. Each value enters and leaves the stack at most once.',
        values: [73, 74, 75, 71, 69, 72],
        active: [5],
        stack: [75, 72],
        dimmed: [0, 1, 3, 4],
        metric: 'POP 69, 71',
        codeLine: 4,
      },
    ],
    code: [
      'function nextWarmer(temps) {',
      '  const stack = [];',
      '  const answer = Array(temps.length).fill(0);',
      '  for (let i = 0; i < temps.length; i++) {',
      '    while (stack.length && temps[i] > temps[stack.at(-1)]) {',
      '      const prev = stack.pop();',
      '      answer[prev] = i - prev;',
      '    }',
      '    stack.push(i);',
      '  }',
      '  return answer;',
      '}',
    ],
    quiz: {
      question: 'For every day, find how many days until a warmer temperature. Which pattern is designed for this?',
      options: ['Binary Search', 'Monotonic Stack', 'Union Find', 'Prefix Sum'],
      correct: 1,
      explanation: 'The stack keeps unresolved days in monotonic order and resolves them when a warmer value arrives.',
    },
  },
  {
    id: 'merge-intervals',
    no: '07',
    title: 'Merge Intervals',
    subtitle: 'Sort ranges so overlap becomes a local decision.',
    category: 'INTERVAL PATTERN',
    summary: 'Once intervals are ordered by start time, you only need to compare the current interval with the last merged interval.',
    analogyTitle: 'Combine overlapping calendar meetings',
    analogyBody:
      'If meetings are sorted by start time, you do not compare every meeting with every other meeting. You only ask whether the next meeting starts before the current combined block ends.',
    mapping: [
      ['Meeting start/end', 'Interval [start, end]'],
      ['Sort by start time', 'Normalize order'],
      ['Overlapping meetings', 'Merge'],
      ['Gap between meetings', 'Start a new block'],
    ],
    invariant: 'The output contains disjoint intervals, and only its last interval can overlap the next sorted interval.',
    signals: [
      'Ranges with start/end',
      'Overlap or coverage',
      'Scheduling conflicts',
      'Insert / merge interval',
    ],
    avoid: [
      'Order has no meaning',
      'You need point-by-point frequencies instead',
      'Intervals are multidimensional regions',
    ],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    frames: [
      {
        title: 'Sort meetings by start',
        explanation: 'After sorting, possible overlap only needs to be checked against the previous merged block.',
        values: [1, 3, 2, 6, 8, 10, 15, 18],
        intervals: [[1,3],[2,6],[8,10],[15,18]],
        active: [0],
        merged: [[1,3]],
        metric: 'SORTED',
        codeLine: 1,
      },
      {
        title: 'The next meeting overlaps',
        explanation: '2 starts before 3 ends, so [1,3] and [2,6] become [1,6].',
        values: [1, 2, 3, 6, 8, 10],
        intervals: [[1,3],[2,6],[8,10],[15,18]],
        active: [0,1],
        merged: [[1,6]],
        metric: '[1,3] + [2,6]',
        codeLine: 5,
      },
      {
        title: 'A gap starts a new block',
        explanation: '8 is after 6, so [8,10] cannot overlap [1,6]. Append it.',
        values: [1, 6, 8, 10],
        intervals: [[1,3],[2,6],[8,10],[15,18]],
        active: [2],
        merged: [[1,6],[8,10]],
        metric: 'NEW BLOCK',
        codeLine: 7,
      },
      {
        title: 'Finish in one scan',
        explanation: 'The final interval is also separate. Sorting converted a global overlap problem into local comparisons.',
        values: [1,6,8,10,15,18],
        intervals: [[1,3],[2,6],[8,10],[15,18]],
        active: [3],
        merged: [[1,6],[8,10],[15,18]],
        metric: '3 MERGED BLOCKS',
        codeLine: 8,
      },
    ],
    code: [
      'function merge(intervals) {',
      '  intervals.sort((a, b) => a[0] - b[0]);',
      '  const out = [];',
      '  for (const current of intervals) {',
      '    const last = out.at(-1);',
      '    if (last && current[0] <= last[1])',
      '      last[1] = Math.max(last[1], current[1]);',
      '    else out.push([...current]);',
      '  }',
      '  return out;',
      '}',
    ],
    quiz: {
      question: 'You receive meeting time ranges and need to combine every overlap. What should you think of first?',
      options: ['Merge Intervals', 'Sliding Window', 'Fast & Slow', 'Heap only'],
      correct: 0,
      explanation: 'Sort by start time, then each interval only needs to interact with the final merged block.',
    },
  },
  {
    id: 'graph-traversal',
    no: '08',
    title: 'BFS / DFS',
    subtitle: 'Explore a connected world systematically instead of wandering randomly.',
    category: 'GRAPH PATTERN',
    summary: 'Traversal is the foundation for connectivity, components, shortest unweighted paths, flood fill, and tree exploration.',
    analogyTitle: 'Spread a message through a friend network',
    analogyBody:
      'BFS spreads a message friend-by-friend in waves, so the first time someone hears it is through the fewest connections. DFS follows one chain deeply before coming back to try another.',
    mapping: [
      ['People', 'Nodes'],
      ['Friendships', 'Edges'],
      ['Already informed', 'Visited set'],
      ['Wavefront / deep path', 'Queue / stack'],
    ],
    invariant: 'A node is processed only after it is discovered, and discovered nodes are marked so the traversal never loops forever.',
    signals: [
      'Connected components',
      'Shortest path in an unweighted graph',
      'Grid / island traversal',
      'Tree level order or recursive exploration',
    ],
    avoid: [
      'Edges have meaningful unequal weights for shortest paths',
      'You need ordering constraints instead of reachability',
      'The state space is too large without pruning',
    ],
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    frames: [
      {
        title: 'Start at person A',
        explanation: 'Mark A visited and put it in the queue.',
        values: [0,1,2,3,4,5],
        edges: [[0,1],[0,2],[1,3],[1,4],[2,4],[4,5]],
        active: [0],
        visited: [0],
        queue: [0],
        metric: 'QUEUE A',
        codeLine: 2,
      },
      {
        title: 'Discover A’s neighbors',
        explanation: 'B and C are one edge away. Mark them immediately when they enter the queue.',
        values: [0,1,2,3,4,5],
        edges: [[0,1],[0,2],[1,3],[1,4],[2,4],[4,5]],
        active: [1,2],
        visited: [0,1,2],
        queue: [1,2],
        metric: 'LEVEL 1',
        codeLine: 7,
      },
      {
        title: 'Expand the next wave',
        explanation: 'Process B, then C. D and E become the next frontier.',
        values: [0,1,2,3,4,5],
        edges: [[0,1],[0,2],[1,3],[1,4],[2,4],[4,5]],
        active: [3,4],
        visited: [0,1,2,3,4],
        queue: [3,4],
        metric: 'LEVEL 2',
        codeLine: 7,
      },
      {
        title: 'Every node is visited once',
        explanation: 'F is discovered from E. The visited set prevents repeated work through cycles.',
        values: [0,1,2,3,4,5],
        edges: [[0,1],[0,2],[1,3],[1,4],[2,4],[4,5]],
        active: [5],
        visited: [0,1,2,3,4,5],
        queue: [5],
        metric: 'ALL REACHED ✓',
        codeLine: 9,
      },
    ],
    code: [
      'function bfs(graph, start) {',
      '  const queue = [start];',
      '  const seen = new Set([start]);',
      '  while (queue.length) {',
      '    const node = queue.shift();',
      '    for (const next of graph[node]) {',
      '      if (seen.has(next)) continue;',
      '      seen.add(next);',
      '      queue.push(next);',
      '    }',
      '  }',
      '}',
    ],
    quiz: {
      question: 'Find the minimum number of flights in an unweighted route graph from city A to city B. Which traversal gives the answer naturally?',
      options: ['DFS only', 'BFS', 'Prefix Sum', 'Monotonic Stack'],
      correct: 1,
      explanation: 'BFS explores nodes by distance layers, so the first arrival uses the fewest unweighted edges.',
    },
  },
  {
    id: 'heap-top-k',
    no: '09',
    title: 'Heap / Top-K',
    subtitle: 'Keep only the best K candidates instead of sorting everything.',
    category: 'PRIORITY PATTERN',
    summary: 'A heap gives fast access to the current smallest or largest boundary of a candidate set.',
    analogyTitle: 'Maintain a live top-3 leaderboard',
    analogyBody:
      'Scores keep arriving. Instead of sorting every score after every update, keep only the best three. The weakest score among the current winners sits at the top of a small min-heap and is easy to replace.',
    mapping: [
      ['Incoming score', 'Stream element'],
      ['Top 3 players', 'Heap of size K'],
      ['Weakest winner', 'Heap root'],
      ['Better score arrives', 'Pop root + push candidate'],
    ],
    invariant: 'The heap contains exactly the best K candidates seen so far; its root is the boundary candidate.',
    signals: [
      'Top K / Kth largest / Kth smallest',
      'Repeated min/max extraction',
      'Streaming ranking',
      'Merge several sorted sources',
    ],
    avoid: [
      'You need the entire output fully sorted',
      'K is almost N and a full sort is simpler',
      'Random lookup dominates the workload',
    ],
    complexity: { time: 'O(n log k)', space: 'O(k)' },
    frames: [
      {
        title: 'Fill the first three leaderboard slots',
        explanation: 'For K = 3, keep a min-heap so the weakest current winner is easy to remove.',
        values: [5,9,7,12,8,15],
        active: [0,1,2],
        stack: [5,9,7],
        metric: 'TOP 3 CANDIDATES',
        codeLine: 2,
      },
      {
        title: 'A score of 12 arrives',
        explanation: '12 beats the heap root 5. Remove 5 and insert 12.',
        values: [5,9,7,12,8,15],
        active: [3],
        dimmed: [0],
        stack: [7,9,12],
        metric: 'DROP 5 · ADD 12',
        codeLine: 5,
      },
      {
        title: 'Score 8 beats the boundary',
        explanation: 'The current weakest winner is 7. Replace it with 8.',
        values: [5,9,7,12,8,15],
        active: [4],
        dimmed: [0,2],
        stack: [8,12,9],
        metric: 'TOP = 8',
        codeLine: 5,
      },
      {
        title: '15 enters the top three',
        explanation: 'Replace the smallest winner 8. The heap now represents {9,12,15}.',
        values: [5,9,7,12,8,15],
        active: [5],
        dimmed: [0,2,4],
        stack: [9,12,15],
        metric: '9 · 12 · 15',
        codeLine: 5,
      },
    ],
    code: [
      'function topK(nums, k) {',
      '  const heap = new MinHeap();',
      '  for (const value of nums) {',
      '    heap.push(value);',
      '    if (heap.size > k) heap.pop();',
      '  }',
      '  return heap.values();',
      '}',
    ],
    quiz: {
      question: 'Millions of scores stream in and you only need the highest 10 at any moment. Which pattern avoids sorting all scores?',
      options: ['Heap / Top-K', 'Merge Intervals', 'DFS', 'Prefix Sum'],
      correct: 0,
      explanation: 'A min-heap of size 10 keeps only the winners, giving O(log k) work per incoming score.',
    },
  },
  {
    id: 'backtracking',
    no: '10',
    title: 'Backtracking',
    subtitle: 'Choose, explore, undo — and prune paths that cannot succeed.',
    category: 'SEARCH PATTERN',
    summary: 'Backtracking explores a decision tree while carrying only the current partial solution.',
    analogyTitle: 'Try combinations on a lock',
    analogyBody:
      'You choose one digit, continue only while the partial combination is allowed, and undo that choice when the path fails. You do not copy the whole lock state for every attempt.',
    mapping: [
      ['Pick a digit', 'Choose'],
      ['Try the rest', 'Explore recursively'],
      ['Wrong branch', 'Prune / return'],
      ['Remove the digit', 'Undo choice'],
    ],
    invariant: 'Before returning from a recursive call, restore the state exactly to what it was before the choice.',
    signals: [
      'Generate combinations / permutations',
      'Constraint satisfaction',
      'All possible valid configurations',
      'Decision tree with reversible choices',
    ],
    avoid: [
      'A greedy choice is provably sufficient',
      'Subproblems repeat heavily and should be memoized',
      'The search tree is enormous without pruning',
    ],
    complexity: { time: 'Problem-dependent / exponential', space: 'O(depth)' },
    frames: [
      {
        title: 'Choose the first option',
        explanation: 'Start building a permutation from [1,2,3]. Pick 1.',
        values: [1,2,3],
        active: [0],
        path: [1],
        metric: 'PATH [1]',
        codeLine: 3,
      },
      {
        title: 'Explore deeper',
        explanation: 'Pick 2 next. The partial solution is now [1,2].',
        values: [1,2,3],
        active: [0,1],
        path: [1,2],
        metric: 'PATH [1,2]',
        codeLine: 5,
      },
      {
        title: 'Complete one solution',
        explanation: 'Pick 3. Record [1,2,3] as a valid permutation.',
        values: [1,2,3],
        active: [0,1,2],
        path: [1,2,3],
        metric: 'SOLUTION ✓',
        codeLine: 1,
      },
      {
        title: 'Undo the last choice',
        explanation: 'Pop 3, then pop 2. The state returns to [1], ready to try a different branch.',
        values: [1,2,3],
        active: [0],
        path: [1],
        metric: 'UNDO',
        codeLine: 7,
      },
      {
        title: 'Try the sibling branch',
        explanation: 'From [1], choose 3 next. Backtracking systematically covers every valid branch.',
        values: [1,2,3],
        active: [0,2],
        path: [1,3],
        metric: 'NEXT BRANCH',
        codeLine: 5,
      },
    ],
    code: [
      'function permute(nums, path = [], used = new Set()) {',
      '  if (path.length === nums.length) output.push([...path]);',
      '  for (const value of nums) {',
      '    if (used.has(value)) continue;',
      '    used.add(value); path.push(value);',
      '    permute(nums, path, used);',
      '    path.pop(); used.delete(value);',
      '  }',
      '}',
    ],
    quiz: {
      question: 'Generate every valid arrangement of N queens while abandoning placements that already attack another queen. Which pattern is this?',
      options: ['Sliding Window', 'Backtracking', 'Prefix Sum', 'Heap'],
      correct: 1,
      explanation: 'Each queen placement is a reversible choice, and invalid partial boards can be pruned immediately.',
    },
  },
  {
    id: 'dynamic-programming',
    no: '11',
    title: 'Dynamic Programming',
    subtitle: 'Solve repeated subproblems once, then build larger answers from them.',
    category: 'DP PATTERN',
    summary: 'DP is structured reuse: define state, transition, base cases, and evaluation order.',
    analogyTitle: 'Reuse the cheapest known travel cost',
    analogyBody:
      'When planning a route with repeated sub-routes, you do not recompute the cheapest cost to the same city every time. Store the answer and use it as a building block for later decisions.',
    mapping: [
      ['Current location/state', 'DP state'],
      ['Known small answers', 'Base cases'],
      ['Combine previous costs', 'Transition'],
      ['Store each result', 'Memo / table'],
    ],
    invariant: 'When computing a state, every dependency used by its transition is already correct and available.',
    signals: [
      'Overlapping subproblems',
      'Optimal count / cost / number of ways',
      'Choices lead to repeated states',
      'Answer can be expressed from smaller answers',
    ],
    avoid: [
      'Subproblems never repeat',
      'A simpler greedy invariant solves it',
      'State definition would explode exponentially',
    ],
    complexity: { time: 'States × transitions', space: 'Number of states' },
    frames: [
      {
        title: 'Define the base states',
        explanation: 'For climbing stairs, there is 1 way to stand before the stairs and 1 way to reach step 1.',
        values: [0,1,2,3,4,5],
        dp: [1,1,0,0,0,0],
        active: [0,1],
        metric: 'dp[0]=1 · dp[1]=1',
        codeLine: 2,
      },
      {
        title: 'Build step 2',
        explanation: 'To reach step 2, come from step 1 or step 0: 1 + 1 = 2.',
        values: [0,1,2,3,4,5],
        dp: [1,1,2,0,0,0],
        active: [0,1,2],
        metric: 'dp[2] = 2',
        codeLine: 4,
      },
      {
        title: 'Build step 3',
        explanation: 'Reuse the two previous answers: dp[3] = dp[2] + dp[1] = 3.',
        values: [0,1,2,3,4,5],
        dp: [1,1,2,3,0,0],
        active: [1,2,3],
        metric: '2 + 1 = 3',
        codeLine: 4,
      },
      {
        title: 'Continue left to right',
        explanation: 'Every dependency is already solved before the current state is computed.',
        values: [0,1,2,3,4,5],
        dp: [1,1,2,3,5,8],
        active: [3,4,5],
        metric: 'ANSWER = 8',
        codeLine: 6,
      },
    ],
    code: [
      'function climbStairs(n) {',
      '  const dp = Array(n + 1).fill(0);',
      '  dp[0] = 1; dp[1] = 1;',
      '  for (let i = 2; i <= n; i++) {',
      '    dp[i] = dp[i - 1] + dp[i - 2];',
      '  }',
      '  return dp[n];',
      '}',
    ],
    quiz: {
      question: 'A recursive solution repeatedly solves the same states and asks for the minimum cost. What optimization pattern should you look for?',
      options: ['Merge Intervals', 'Dynamic Programming', 'Fast & Slow', 'Two Pointers'],
      correct: 1,
      explanation: 'Repeated states plus an answer built from smaller state answers are the central signals for DP.',
    },
  },
  {
    id: 'trie',
    no: '12',
    title: 'Trie',
    subtitle: 'Share common prefixes so string lookup follows characters, not whole words.',
    category: 'STRING PATTERN',
    summary: 'A trie turns prefix relationships into a tree where each edge is a character.',
    analogyTitle: 'Phone contacts narrow as you type',
    analogyBody:
      'Type “ca” in a contacts search. The app does not rescan every name character-by-character from scratch. It follows the shared prefix c → a, then only explores names that continue from there.',
    mapping: [
      ['Typed characters', 'Trie edges'],
      ['Shared beginning', 'Common prefix path'],
      ['Contact name ends', 'Terminal marker'],
      ['Autocomplete suggestions', 'Descendants from prefix node'],
    ],
    invariant: 'Every node represents one prefix, and every word sharing that prefix shares the same path.',
    signals: [
      'Prefix search / autocomplete',
      'Dictionary of many strings',
      'Word search with shared beginnings',
      'Need character-by-character lookup',
    ],
    avoid: [
      'Only exact lookup is needed and a hash set is simpler',
      'Strings have almost no shared prefixes',
      'Memory overhead matters more than prefix operations',
    ],
    complexity: { time: 'O(length)', space: 'O(total characters)' },
    frames: [
      {
        title: 'Insert “car”',
        explanation: 'Start at the root and create c → a → r. Mark the final node as a complete word.',
        values: [0,1,2,3,4,5],
        labels: ['ROOT','c','a','r','t','n'],
        edges: [[0,1],[1,2],[2,3]],
        triePath: ['ROOT','c','a','r'],
        words: ['car'],
        active: [0,1,2,3],
        metric: 'INSERT car',
        codeLine: 2,
      },
      {
        title: 'Insert “cat”',
        explanation: 'c → a already exists, so reuse those nodes and branch only at the final character t.',
        values: [0,1,2,3,4,5],
        labels: ['ROOT','c','a','r','t','n'],
        edges: [[0,1],[1,2],[2,3],[2,4]],
        triePath: ['ROOT','c','a','t'],
        words: ['car','cat'],
        active: [0,1,2,4],
        metric: 'REUSE c → a',
        codeLine: 4,
      },
      {
        title: 'Insert “can”',
        explanation: 'Again reuse c → a, then create n. Three words now share the same prefix path.',
        values: [0,1,2,3,4,5],
        labels: ['ROOT','c','a','r','t','n'],
        edges: [[0,1],[1,2],[2,3],[2,4],[2,5]],
        triePath: ['ROOT','c','a','n'],
        words: ['car','cat','can'],
        active: [0,1,2,5],
        metric: '3 WORDS · 1 PREFIX',
        codeLine: 4,
      },
      {
        title: 'Search prefix “ca”',
        explanation: 'Follow c then a. Reaching that node proves the prefix exists; its descendants are autocomplete candidates.',
        values: [0,1,2,3,4,5],
        labels: ['ROOT','c','a','r','t','n'],
        edges: [[0,1],[1,2],[2,3],[2,4],[2,5]],
        triePath: ['ROOT','c','a'],
        words: ['car','cat','can'],
        active: [0,1,2],
        metric: 'PREFIX FOUND ✓',
        codeLine: 9,
      },
    ],
    code: [
      'function insert(root, word) {',
      '  let node = root;',
      '  for (const ch of word) {',
      '    if (!node.children[ch])',
      '      node.children[ch] = new TrieNode();',
      '    node = node.children[ch];',
      '  }',
      '  node.end = true;',
      '}',
      'function startsWith(root, prefix) { /* follow chars */ }',
    ],
    quiz: {
      question: 'You are building autocomplete for hundreds of thousands of words. Which structure naturally shares common prefixes?',
      options: ['Heap', 'Trie', 'Union Find', 'Prefix Sum'],
      correct: 1,
      explanation: 'A trie stores shared prefixes once and follows one character edge per lookup step.',
    },
  },
  {
    id: 'union-find',
    no: '13',
    title: 'Union Find',
    subtitle: 'Track which items belong to the same connected group as groups merge.',
    category: 'CONNECTIVITY PATTERN',
    summary: 'Disjoint Set Union answers “are these connected?” while supporting fast group merges.',
    analogyTitle: 'Friend circles merge at a conference',
    analogyBody:
      'At first everyone is their own group. Whenever two people become connected, their groups merge. Later, asking whether two people are in the same circle only requires finding each group representative.',
    mapping: [
      ['Person', 'Element'],
      ['Friend circle leader', 'Root / representative'],
      ['Connect two circles', 'Union'],
      ['Find circle leader', 'Find with path compression'],
    ],
    invariant: 'Every element points toward one representative; two elements are connected exactly when their representatives match.',
    signals: [
      'Dynamic connectivity',
      'Count connected components',
      'Cycle detection in undirected graph',
      'Kruskal minimum spanning tree',
    ],
    avoid: [
      'You need the actual shortest path',
      'Edges are directed and ordering matters',
      'You need frequent deletions of connections',
    ],
    complexity: { time: '≈ O(α(n)) per op', space: 'O(n)' },
    frames: [
      {
        title: 'Everyone starts separate',
        explanation: 'Each item is its own representative.',
        values: [0,1,2,3,4,5],
        labels: ['A','B','C','D','E','F'],
        parents: [0,1,2,3,4,5],
        selected: [],
        metric: '6 COMPONENTS',
        codeLine: 1,
      },
      {
        title: 'Union A and B',
        explanation: 'Find both roots, then attach one root under the other.',
        values: [0,1,2,3,4,5],
        labels: ['A','B','C','D','E','F'],
        parents: [0,0,2,3,4,5],
        selected: [0,1],
        metric: 'A ∪ B',
        codeLine: 8,
      },
      {
        title: 'Merge B and C',
        explanation: 'B already belongs to A’s set, so C joins that same component.',
        values: [0,1,2,3,4,5],
        labels: ['A','B','C','D','E','F'],
        parents: [0,0,0,3,4,5],
        selected: [1,2],
        metric: '{A,B,C}',
        codeLine: 8,
      },
      {
        title: 'Build another component',
        explanation: 'D and E form a second group while F stays separate.',
        values: [0,1,2,3,4,5],
        labels: ['A','B','C','D','E','F'],
        parents: [0,0,0,3,3,5],
        selected: [3,4],
        metric: '3 COMPONENTS',
        codeLine: 8,
      },
      {
        title: 'Connectivity becomes a root comparison',
        explanation: 'A and C compress to the same root, so they are connected.',
        values: [0,1,2,3,4,5],
        labels: ['A','B','C','D','E','F'],
        parents: [0,0,0,3,3,5],
        selected: [0,2],
        metric: 'find(A) = find(C) ✓',
        codeLine: 4,
      },
    ],
    code: [
      'const parent = Array.from({ length: n }, (_, i) => i);',
      'function find(x) {',
      '  if (parent[x] !== x)',
      '    parent[x] = find(parent[x]);',
      '  return parent[x];',
      '}',
      'function union(a, b) {',
      '  const ra = find(a), rb = find(b);',
      '  if (ra !== rb) parent[rb] = ra;',
      '}',
    ],
    quiz: {
      question: 'Edges arrive one-by-one and you must quickly know whether two computers are already in the same network. Which pattern fits?',
      options: ['Union Find', 'Sliding Window', 'Trie', '2D DP'],
      correct: 0,
      explanation: 'Union Find is designed for dynamic component merges and fast connectivity checks.',
    },
  },
  {
    id: 'topological-sort',
    no: '14',
    title: 'Topological Sort',
    subtitle: 'Process dependency nodes only after everything they depend on is ready.',
    category: 'DAG PATTERN',
    summary: 'Topological ordering converts prerequisite constraints into an executable sequence.',
    analogyTitle: 'Build a software project in dependency order',
    analogyBody:
      'A module cannot compile until its dependencies compile. Start with modules that depend on nothing, remove them, then newly-unblocked modules become ready.',
    mapping: [
      ['Module', 'Node'],
      ['Dependency', 'Directed edge'],
      ['Unmet prerequisites', 'Indegree'],
      ['Ready to build', 'Indegree 0 queue'],
    ],
    invariant: 'Every node placed in the output has zero remaining prerequisites at that moment.',
    signals: [
      'Prerequisites / dependencies',
      'Course schedule',
      'Build ordering',
      'Directed acyclic graph ordering',
    ],
    avoid: [
      'Graph is undirected',
      'You need shortest weighted path',
      'Cycles are allowed and no valid global ordering is required',
    ],
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    frames: [
      {
        title: 'Count prerequisites',
        explanation: 'A has none. B and C depend on A. D depends on both B and C.',
        values: [0,1,2,3],
        labels: ['A','B','C','D'],
        edges: [[0,1],[0,2],[1,3],[2,3]],
        indegree: [0,1,1,2],
        queue: [0],
        active: [0],
        metric: 'READY: A',
        codeLine: 2,
      },
      {
        title: 'Process A',
        explanation: 'Remove A and decrement the indegree of B and C. Both become ready.',
        values: [0,1,2,3],
        labels: ['A','B','C','D'],
        edges: [[0,1],[0,2],[1,3],[2,3]],
        indegree: [0,0,0,2],
        queue: [1,2],
        visited: [0],
        active: [1,2],
        metric: 'QUEUE B, C',
        codeLine: 7,
      },
      {
        title: 'Process B',
        explanation: 'D still has one unmet prerequisite, so it cannot enter the queue yet.',
        values: [0,1,2,3],
        labels: ['A','B','C','D'],
        edges: [[0,1],[0,2],[1,3],[2,3]],
        indegree: [0,0,0,1],
        queue: [2],
        visited: [0,1],
        active: [2],
        metric: 'D indegree = 1',
        codeLine: 7,
      },
      {
        title: 'Process C, unlock D',
        explanation: 'D’s final prerequisite disappears. It reaches indegree 0 and becomes ready.',
        values: [0,1,2,3],
        labels: ['A','B','C','D'],
        edges: [[0,1],[0,2],[1,3],[2,3]],
        indegree: [0,0,0,0],
        queue: [3],
        visited: [0,1,2],
        active: [3],
        metric: 'ORDER A B C D',
        codeLine: 8,
      },
    ],
    code: [
      'function topo(graph, indegree) {',
      '  const queue = nodes.filter(v => indegree[v] === 0);',
      '  const order = [];',
      '  while (queue.length) {',
      '    const node = queue.shift();',
      '    order.push(node);',
      '    for (const next of graph[node]) {',
      '      if (--indegree[next] === 0) queue.push(next);',
      '    }',
      '  }',
      '  return order.length === nodes.length ? order : null;',
      '}',
    ],
    quiz: {
      question: 'Courses have prerequisite relationships and you need a valid order to complete all of them. Which pattern applies?',
      options: ['Topological Sort', 'Two Pointers', 'Prefix Sum', 'Heap only'],
      correct: 0,
      explanation: 'Prerequisites form directed edges, and a topological order respects every dependency.',
    },
  },
  {
    id: 'greedy',
    no: '15',
    title: 'Greedy',
    subtitle: 'Make the locally safest choice when an invariant proves you never need to undo it.',
    category: 'CHOICE PATTERN',
    summary: 'Greedy works when one local choice preserves an optimal future and permanently removes uncertainty.',
    analogyTitle: 'Schedule the most meetings in one room',
    analogyBody:
      'If you always choose the meeting that finishes earliest, you leave the most room for everything that comes later. Once chosen, that meeting never needs to be reconsidered.',
    mapping: [
      ['Meeting ends earliest', 'Greedy choice'],
      ['Room becomes free', 'Updated boundary'],
      ['Overlapping meeting', 'Reject candidate'],
      ['Accepted schedule', 'Optimal solution'],
    ],
    invariant: 'After each choice, the remaining problem is at least as solvable as after any other available choice.',
    signals: [
      'Optimization with local decisions',
      'Sort then scan',
      'Earliest finish / cheapest next safe choice',
      'Exchange argument can justify the choice',
    ],
    avoid: [
      'A local optimum can block the global optimum',
      'Choices need later revision',
      'Repeated subproblems suggest DP instead',
    ],
    complexity: { time: 'Often O(n log n)', space: 'O(1)–O(n)' },
    frames: [
      {
        title: 'Sort meetings by finish time',
        explanation: 'Earliest finishing candidates come first.',
        values: [0,1,2,3],
        intervals: [[1,3],[2,5],[4,7],[6,9]],
        selected: [],
        active: [0],
        metric: 'EARLIEST END = 3',
        codeLine: 1,
      },
      {
        title: 'Take the earliest finisher',
        explanation: 'Choose [1,3]. It leaves the room free as early as possible.',
        values: [0,1,2,3],
        intervals: [[1,3],[2,5],[4,7],[6,9]],
        selected: [0],
        active: [0],
        metric: 'SELECT [1,3]',
        codeLine: 4,
      },
      {
        title: 'Reject overlap',
        explanation: '[2,5] starts before time 3, so it cannot coexist with the selected meeting.',
        values: [0,1,2,3],
        intervals: [[1,3],[2,5],[4,7],[6,9]],
        selected: [0],
        active: [1],
        dimmed: [1],
        metric: 'SKIP [2,5]',
        codeLine: 5,
      },
      {
        title: 'Take the next compatible meeting',
        explanation: '[4,7] starts after the room is free, so accept it.',
        values: [0,1,2,3],
        intervals: [[1,3],[2,5],[4,7],[6,9]],
        selected: [0,2],
        active: [2],
        metric: '2 MEETINGS',
        codeLine: 6,
      },
      {
        title: 'Local decisions form the optimum',
        explanation: '[6,9] overlaps the current choice. The earliest-finish rule has already protected future capacity.',
        values: [0,1,2,3],
        intervals: [[1,3],[2,5],[4,7],[6,9]],
        selected: [0,2],
        active: [3],
        metric: 'OPTIMAL = 2',
        codeLine: 5,
      },
    ],
    code: [
      'function maxMeetings(intervals) {',
      '  intervals.sort((a, b) => a[1] - b[1]);',
      '  let end = -Infinity, count = 0;',
      '  for (const [start, finish] of intervals) {',
      '    if (start < end) continue;',
      '    count++;',
      '    end = finish;',
      '  }',
      '  return count;',
      '}',
    ],
    quiz: {
      question: 'You want the maximum number of non-overlapping meetings in one room. Which greedy rule is useful?',
      options: ['Choose longest meeting first', 'Choose earliest finishing meeting first', 'Choose latest starting only', 'Use BFS'],
      correct: 1,
      explanation: 'Earliest finish leaves the largest possible remaining timeline; that choice can be proven safe.',
    },
  },
  {
    id: 'bit-manipulation',
    no: '16',
    title: 'Bit Manipulation',
    subtitle: 'Use the binary representation itself as a compact state machine.',
    category: 'BIT PATTERN',
    summary: 'Bits make flags, masks, parity, subsets, and XOR cancellation explicit and efficient.',
    analogyTitle: 'A row of light switches stores many yes/no states',
    analogyBody:
      'Eight switches can encode eight independent on/off facts inside one byte. Turning a switch on, off, or checking it maps directly to OR, AND, XOR, and shifts.',
    mapping: [
      ['Switch position', 'Bit index'],
      ['Switch on', '1'],
      ['Switch off', '0'],
      ['Group of switches', 'Bit mask'],
    ],
    invariant: 'Each bit position represents one independent binary fact; operations change only the targeted facts.',
    signals: [
      'Flags / subsets / masks',
      'Odd-even / powers of two',
      'XOR cancellation',
      'Compact state representation',
    ],
    avoid: [
      'Readability matters more and scale is tiny',
      'State is not naturally binary',
      'Arithmetic overflow or signed behavior is unclear',
    ],
    complexity: { time: 'Often O(1) per op', space: 'O(1)' },
    frames: [
      {
        title: 'Represent permissions as bits',
        explanation: 'READ, WRITE, EXECUTE can live in three bit positions.',
        values: [0,1,2,3],
        bits: ['0','0','0','0','0','1','0','1'],
        active: [5,7],
        metric: '00000101',
        codeLine: 1,
      },
      {
        title: 'Turn WRITE on with OR',
        explanation: 'OR with 00000010 sets that bit without changing the others.',
        values: [0,1,2,3],
        bits: ['0','0','0','0','0','1','1','1'],
        active: [6],
        metric: '0101 | 0010 = 0111',
        codeLine: 3,
      },
      {
        title: 'Check a flag with AND',
        explanation: 'Mask the EXECUTE bit. A non-zero result means the flag is present.',
        values: [0,1,2,3],
        bits: ['0','0','0','0','0','1','1','1'],
        active: [7],
        metric: 'mask & EXECUTE ≠ 0',
        codeLine: 5,
      },
      {
        title: 'XOR cancels equal pairs',
        explanation: 'x ^ x = 0. That lets one unmatched value survive while duplicate pairs disappear.',
        values: [4,1,2,1,2],
        bits: ['4','⊕','1','⊕','2','⊕','1','⊕','2'],
        active: [0],
        metric: 'RESULT = 4',
        codeLine: 7,
      },
    ],
    code: [
      'const READ = 1 << 0;',
      'const WRITE = 1 << 1;',
      'const EXECUTE = 1 << 2;',
      'mask |= WRITE;            // set',
      'mask &= ~WRITE;           // clear',
      'const canRun = (mask & EXECUTE) !== 0;',
      'let unique = 0;',
      'for (const x of nums) unique ^= x;',
    ],
    quiz: {
      question: 'Every number appears twice except one number that appears once. Which operation exposes the unique value in one pass?',
      options: ['OR', 'XOR', 'Left shift only', 'Modulo'],
      correct: 1,
      explanation: 'Equal values cancel under XOR, leaving the unmatched value.',
    },
  },
  {
    id: 'binary-search-answer',
    no: '17',
    title: 'Binary Search on Answer',
    subtitle: 'Search a numeric answer space when feasibility changes monotonically.',
    category: 'SEARCH PATTERN',
    summary: 'When “can we do it with X?” changes from false to true only once, binary search can find the boundary.',
    analogyTitle: 'Find the smallest truck capacity that meets a deadline',
    analogyBody:
      'Try a truck capacity. If it can ship all packages within D days, every larger truck can also do it. If it fails, every smaller truck also fails. That monotonic yes/no boundary is searchable.',
    mapping: [
      ['Truck capacity', 'Candidate answer'],
      ['Can ship in D days?', 'Feasibility predicate'],
      ['Too small', 'Move left boundary up'],
      ['Works', 'Save candidate and search smaller'],
    ],
    invariant: 'The answer always stays inside the current numeric range, and feasibility is monotonic across that range.',
    signals: [
      'Minimum feasible / maximum feasible',
      'Numeric answer range',
      'Can(x) is monotonic',
      'Direct construction is hard but checking is easy',
    ],
    avoid: [
      'Feasibility flips true/false multiple times',
      'Answer space is tiny enough to scan',
      'No efficient predicate exists',
    ],
    complexity: { time: 'O(check × log range)', space: 'Check-dependent' },
    frames: [
      {
        title: 'Define the answer range',
        explanation: 'Capacity must be at least the largest package and at most the sum of all packages.',
        values: [1,2,3,4,5,6],
        range: [6,21],
        candidate: 13,
        feasible: true,
        metric: 'SEARCH 6..21',
        codeLine: 1,
      },
      {
        title: 'Try the middle capacity',
        explanation: '13 works within the deadline, so the minimum answer may be smaller.',
        values: [1,2,3,4,5,6],
        range: [6,12],
        candidate: 13,
        feasible: true,
        metric: '13 WORKS ✓',
        codeLine: 5,
      },
      {
        title: 'Try a smaller candidate',
        explanation: '9 is too small. Every capacity below 9 also fails, so discard that half.',
        values: [1,2,3,4,5,6],
        range: [10,12],
        candidate: 9,
        feasible: false,
        metric: '9 FAILS ×',
        codeLine: 6,
      },
      {
        title: 'Converge on the boundary',
        explanation: '11 works while 10 fails. The smallest feasible capacity is 11.',
        values: [1,2,3,4,5,6],
        range: [11,11],
        candidate: 11,
        feasible: true,
        metric: 'MIN = 11',
        codeLine: 5,
      },
    ],
    code: [
      'let left = maxPackage, right = totalWeight;',
      'while (left < right) {',
      '  const mid = Math.floor((left + right) / 2);',
      '  if (canShip(mid, days))',
      '    right = mid;',
      '  else',
      '    left = mid + 1;',
      '}',
      'return left;',
    ],
    quiz: {
      question: 'You need the minimum eating speed that lets Koko finish all bananas within H hours. What pattern is this?',
      options: ['Binary Search on Answer', 'Merge Intervals', 'Trie', 'DFS'],
      correct: 0,
      explanation: 'Speed is a numeric answer, and once a speed is fast enough, every larger speed is also feasible.',
    },
  },
  {
    id: 'dp-2d',
    no: '18',
    title: '2D Dynamic Programming',
    subtitle: 'Model problems where the answer depends on two changing dimensions.',
    category: 'DP PATTERN',
    summary: 'A 2D table makes dependencies across rows and columns visible for grids, strings, and paired choices.',
    analogyTitle: 'Count routes through a city grid',
    analogyBody:
      'To reach an intersection, you can arrive from the block above or the block to the left. The number of routes to the current intersection is the sum of routes to those two predecessors.',
    mapping: [
      ['Intersection', 'DP cell'],
      ['From above', 'dp[r-1][c]'],
      ['From left', 'dp[r][c-1]'],
      ['Route count', 'Cell value'],
    ],
    invariant: 'When a cell is computed, every predecessor required by its transition has already been solved.',
    signals: [
      'Grid paths',
      'Two strings / two indices',
      'LCS / edit distance',
      'State needs row + column',
    ],
    avoid: [
      'One dimension fully determines the state',
      'No overlapping subproblems exist',
      'A graph traversal alone solves reachability',
    ],
    complexity: { time: 'O(rows × cols)', space: 'O(rows × cols)' },
    frames: [
      {
        title: 'Seed the starting cell',
        explanation: 'There is exactly one way to stand at the start.',
        values: [0,1,2],
        grid: [[1,0,0],[0,0,0],[0,0,0]],
        cell: [0,0],
        metric: 'dp[0][0] = 1',
        codeLine: 2,
      },
      {
        title: 'Fill the first row and column',
        explanation: 'With only one direction available, every reachable boundary cell has one route.',
        values: [0,1,2],
        grid: [[1,1,1],[1,0,0],[1,0,0]],
        cell: [1,0],
        metric: 'BOUNDARIES = 1',
        codeLine: 3,
      },
      {
        title: 'Combine top and left',
        explanation: 'The center can be reached from above or left: 1 + 1 = 2.',
        values: [0,1,2],
        grid: [[1,1,1],[1,2,0],[1,0,0]],
        cell: [1,1],
        metric: '1 + 1 = 2',
        codeLine: 6,
      },
      {
        title: 'Continue dependency order',
        explanation: 'Each new cell reuses already-correct neighboring answers.',
        values: [0,1,2],
        grid: [[1,1,1],[1,2,3],[1,3,6]],
        cell: [2,2],
        metric: 'ANSWER = 6',
        codeLine: 6,
      },
    ],
    code: [
      'function uniquePaths(rows, cols) {',
      '  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));',
      '  dp[0][0] = 1;',
      '  for (let r = 0; r < rows; r++) {',
      '    for (let c = 0; c < cols; c++) {',
      '      if (r) dp[r][c] += dp[r - 1][c];',
      '      if (c) dp[r][c] += dp[r][c - 1];',
      '    }',
      '  }',
      '  return dp[rows - 1][cols - 1];',
      '}',
    ],
    quiz: {
      question: 'Longest Common Subsequence depends on positions i in one string and j in another. What state shape is natural?',
      options: ['2D DP', 'Sliding Window', 'Union Find', 'Heap'],
      correct: 0,
      explanation: 'Two independent indices define the state, which naturally forms a 2D DP table.',
    },
  },
  {
    id: 'dijkstra',
    no: '19',
    title: 'Dijkstra',
    subtitle: 'Expand the cheapest known frontier first to lock shortest weighted distances.',
    category: 'GRAPH PATTERN',
    summary: 'For non-negative weighted edges, a min-heap lets you repeatedly finalize the next closest node.',
    analogyTitle: 'Navigation expands the cheapest route first',
    analogyBody:
      'A maps app considers partial routes ordered by total travel cost. When the currently cheapest unexplored destination is removed from the priority queue, no later non-negative route can beat that distance.',
    mapping: [
      ['Intersection', 'Node'],
      ['Road travel time', 'Edge weight'],
      ['Best known arrival time', 'Distance'],
      ['Cheapest frontier', 'Min-heap'],
    ],
    invariant: 'When the smallest-distance unvisited node is finalized, its shortest distance can never improve later if all weights are non-negative.',
    signals: [
      'Shortest weighted path',
      'Non-negative edge weights',
      'Need distance from one source',
      'Priority queue frontier',
    ],
    avoid: [
      'Negative edge weights exist',
      'All edges have equal weight — BFS is simpler',
      'Need all-pairs distances for dense small graph',
    ],
    complexity: { time: 'O((V+E) log V)', space: 'O(V+E)' },
    frames: [
      {
        title: 'Start at A with distance 0',
        explanation: 'All other nodes begin at infinity. Push A into the min-heap.',
        values: [0,1,2,3,4],
        labels: ['A','B','C','D','E'],
        weights: [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]],
        distances: [0,99,99,99,99],
        active: [0],
        visited: [],
        queue: [0],
        metric: 'A = 0',
        codeLine: 2,
      },
      {
        title: 'Relax A’s roads',
        explanation: 'A → B gives distance 4. A → C gives distance 1, so C becomes the cheapest frontier node.',
        values: [0,1,2,3,4],
        labels: ['A','B','C','D','E'],
        weights: [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]],
        distances: [0,4,1,99,99],
        active: [2],
        visited: [0],
        queue: [2,1],
        metric: 'NEXT C = 1',
        codeLine: 8,
      },
      {
        title: 'C improves B',
        explanation: 'A → C → B costs 1 + 2 = 3, which beats the old distance 4.',
        values: [0,1,2,3,4],
        labels: ['A','B','C','D','E'],
        weights: [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]],
        distances: [0,3,1,6,99],
        active: [1],
        visited: [0,2],
        queue: [1,3],
        metric: 'B: 4 → 3',
        codeLine: 8,
      },
      {
        title: 'B improves D',
        explanation: 'Distance to D becomes 3 + 1 = 4, beating the previous route through C.',
        values: [0,1,2,3,4],
        labels: ['A','B','C','D','E'],
        weights: [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]],
        distances: [0,3,1,4,99],
        active: [3],
        visited: [0,2,1],
        queue: [3],
        metric: 'D = 4',
        codeLine: 8,
      },
      {
        title: 'Reach E with the shortest cost',
        explanation: 'D → E adds 3, so the shortest A → E distance is 7.',
        values: [0,1,2,3,4],
        labels: ['A','B','C','D','E'],
        weights: [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]],
        distances: [0,3,1,4,7],
        active: [4],
        visited: [0,2,1,3,4],
        queue: [],
        metric: 'A → E = 7',
        codeLine: 9,
      },
    ],
    code: [
      'function dijkstra(graph, start) {',
      '  const dist = Array(n).fill(Infinity);',
      '  dist[start] = 0;',
      '  const pq = new MinHeap([[0, start]]);',
      '  while (pq.size) {',
      '    const [cost, node] = pq.pop();',
      '    if (cost !== dist[node]) continue;',
      '    for (const [next, weight] of graph[node]) {',
      '      const nextCost = cost + weight;',
      '      if (nextCost < dist[next]) {',
      '        dist[next] = nextCost;',
      '        pq.push([nextCost, next]);',
      '      }',
      '    }',
      '  }',
      '  return dist;',
      '}',
    ],
    quiz: {
      question: 'Roads have different non-negative travel times and you need the shortest route from one city to all others. Which algorithm fits?',
      options: ['BFS', 'Dijkstra', 'Union Find', 'Trie'],
      correct: 1,
      explanation: 'Dijkstra repeatedly expands the lowest-cost frontier and is correct for non-negative weighted edges.',
    },
  }
];

const storageKey = 'dsa-tutor-progress-v1';

function loadProgress(): PatternId[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedId, setSelectedId] = useState<PatternId>('sliding-window');
  const [completed, setCompleted] = useState<PatternId[]>(loadProgress);

  const selected = useMemo(
    () => patterns.find((pattern) => pattern.id === selectedId) || patterns[0],
    [selectedId]
  );

  const openLesson = (id: PatternId) => {
    setSelectedId(id);
    setPage('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markComplete = (id: PatternId) => {
    const next = completed.includes(id) ? completed : [...completed, id];
    setCompleted(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="app-content">
        <div className="app-shell">
          <aside className="side-rail">
            <button className="brand" onClick={() => setPage('home')}>
              <span className="brand-mark">&lt;/&gt;</span>
              <span><strong>DSA TUTOR</strong><small>PATTERN LAB</small></span>
            </button>

            <nav>
              <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => setPage('home')} />
              <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Learn" onClick={() => setPage('learn')} />
              <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => setPage('progress')} />
            </nav>

            <div className="rail-note">
              <span className="micro-label">TEACHING RULE</span>
              <p>Real life → intuition → invariant → code → recognition.</p>
            </div>
          </aside>

          <main className="main-stage">
            {page === 'home' && <Home completed={completed} openLesson={openLesson} goLearn={() => setPage('learn')} />}
            {page === 'learn' && <Learn completed={completed} openLesson={openLesson} />}
            {page === 'progress' && <Progress completed={completed} openLesson={openLesson} />}
            {page === 'lesson' && (
              <Lesson
                pattern={selected}
                isComplete={completed.includes(selected.id)}
                onBack={() => setPage('learn')}
                onComplete={() => markComplete(selected.id)}
              />
            )}
          </main>

          <div className="bottom-nav">
            <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => setPage('home')} />
            <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Learn" onClick={() => setPage('learn')} />
            <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => setPage('progress')} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

function NavButton(props: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return (
    <button className={'nav-button ' + (props.active ? 'active' : '')} onClick={props.onClick}>
      <IonIcon icon={props.icon} />
      <span>{props.label}</span>
    </button>
  );
}

function Home(props: { completed: PatternId[]; openLesson: (id: PatternId) => void; goLearn: () => void }) {
  const pct = Math.round((props.completed.length / patterns.length) * 100);

  return (
    <div className="page">
      <header className="top-header">
        <div>
          <span className="eyebrow">LEARN DSA THE WAY YOUR BRAIN WANTS</span>
          <h1>See the pattern.<br />Then write the code.</h1>
        </div>
        <span className="live-chip"><i /> VISUAL-FIRST</span>
      </header>

      <section className="hero-grid">
        <article className="hero-panel">
          <span className="orange-label"><IonIcon icon={sparklesOutline} /> STOP MEMORIZING TEMPLATES</span>
          <h2>Build the mental model first.</h2>
          <p>
            Every pattern starts with a real-life situation, becomes a visual state machine,
            then compresses into an invariant and finally into code.
          </p>
          <button className="primary-button" onClick={() => props.openLesson('sliding-window')}>
            START WITH SLIDING WINDOW <IonIcon icon={arrowForwardOutline} />
          </button>
        </article>

        <article className="mastery-panel">
          <div className="progress-ring" style={{ '--p': pct + '%' } as React.CSSProperties}>
            <span>{pct}%</span>
          </div>
          <div>
            <span className="micro-label">PATTERN MASTERY</span>
            <h3>{props.completed.length} / {patterns.length} foundations</h3>
            <p>Completion is a checkpoint. Recognition on an unseen problem is the real goal.</p>
          </div>
        </article>
      </section>

      <section className="section">
        <div className="section-title">
          <div>
            <span className="eyebrow">FOUNDATION TRACK</span>
            <h2>Start with the patterns that change how you think.</h2>
          </div>
          <button className="text-button" onClick={props.goLearn}>VIEW ALL <IonIcon icon={arrowForwardOutline} /></button>
        </div>
        <div className="pattern-grid">
          {patterns.map((pattern) => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              complete={props.completed.includes(pattern.id)}
              onClick={() => props.openLesson(pattern.id)}
            />
          ))}
        </div>
      </section>

      <section className="principle">
        <div className="principle-icon"><IonIcon icon={flashOutline} /></div>
        <div><span className="eyebrow">THE PRODUCT PRINCIPLE</span><h3>Teach the decision, not only the final code.</h3></div>
        <p>If a learner cannot explain why a pointer moved, the animation is not finished teaching.</p>
      </section>
    </div>
  );
}

function Learn(props: { completed: PatternId[]; openLesson: (id: PatternId) => void }) {
  return (
    <div className="page">
      <header className="compact-header">
        <span className="eyebrow">PATTERN LIBRARY</span>
        <h1>Learn recognition, not chapters.</h1>
        <p>Each lesson moves from a relatable story to the invariant that makes the pattern reusable.</p>
      </header>
      <div className="track-line"><span>FOUNDATIONS</span><i /></div>
      <div className="pattern-grid">
        {patterns.map((pattern) => (
          <PatternCard
            key={pattern.id}
            pattern={pattern}
            complete={props.completed.includes(pattern.id)}
            onClick={() => props.openLesson(pattern.id)}
          />
        ))}
      </div>
      <div className="coming-grid">
        {['Kadane / Max Subarray', 'Cyclic Sort', 'K-way Merge', 'Matrix Traversal', 'Segment Tree', 'Fenwick Tree', 'Bellman-Ford', 'Floyd-Warshall'].map((name, index) => (
          <div className="coming-card" key={name}><span>{String(index + 20).padStart(2, '0')}</span><strong>{name}</strong><small>ADVANCED TRACK</small></div>
        ))}
      </div>
    </div>
  );
}

function Progress(props: { completed: PatternId[]; openLesson: (id: PatternId) => void }) {
  return (
    <div className="page">
      <header className="compact-header">
        <span className="eyebrow">YOUR MENTAL MODELS</span>
        <h1>Pattern mastery.</h1>
        <p>Track which patterns you can explain and recognize, not how many pages you have viewed.</p>
      </header>
      <div className="progress-list">
        {patterns.map((pattern) => {
          const done = props.completed.includes(pattern.id);
          return (
            <button className="progress-row" key={pattern.id} onClick={() => props.openLesson(pattern.id)}>
              <span className={'status-dot ' + (done ? 'done' : '')} />
              <div><strong>{pattern.title}</strong><small>{pattern.invariant}</small></div>
              <span className={'mastery-tag ' + (done ? 'done' : '')}>{done ? 'COMPLETED' : 'LEARNING'}</span>
              <IonIcon icon={chevronForwardOutline} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PatternCard(props: { pattern: Pattern; complete: boolean; onClick: () => void }) {
  return (
    <button className="pattern-card" onClick={props.onClick}>
      <div className="pattern-card-top">
        <span className="micro-index">{props.pattern.no}</span>
        <span className={'status-chip ' + (props.complete ? 'complete' : '')}>{props.complete ? 'MASTERED' : 'LEARN'}</span>
      </div>
      <MiniVisual id={props.pattern.id} />
      <span className="eyebrow">{props.pattern.category}</span>
      <h3>{props.pattern.title}</h3>
      <p>{props.pattern.subtitle}</p>
      <div className="pattern-meta"><span>{props.pattern.complexity.time}</span><span>{props.pattern.frames.length} VISUAL STEPS</span></div>
    </button>
  );
}

function MiniVisual({ id }: { id: PatternId }) {
  if (id === 'sliding-window') {
    return <div className="mini-visual"><i /><i className="hot" /><i className="hot" /><i className="hot" /><i /></div>;
  }
  if (id === 'two-pointers' || id === 'fast-slow' || id === 'binary-search-answer') {
    return <div className="mini-visual pointers"><b>L</b><i /><i /><i /><i /><i /><b>R</b></div>;
  }
  if (id === 'prefix-sum' || id === 'dynamic-programming' || id === 'dp-2d') {
    return <div className="mini-visual steps"><i /><i className="hot" /><i className="hot tall" /><i className="found taller" /><i /></div>;
  }
  if (id === 'monotonic-stack' || id === 'heap-top-k') {
    return <div className="mini-visual stack-mini"><i /><i className="hot" /><i className="found" /></div>;
  }
  if (id === 'merge-intervals' || id === 'greedy') {
    return <div className="mini-visual intervals-mini"><i /><i className="hot" /><i /></div>;
  }
  if (id === 'graph-traversal' || id === 'topological-sort' || id === 'dijkstra' || id === 'union-find') {
    return <div className="mini-visual graph-mini"><i /><i className="hot" /><i /><i className="found" /><i /></div>;
  }
  if (id === 'backtracking' || id === 'trie') {
    return <div className="mini-visual branch-mini"><i /><i /><i className="hot" /><i /><i /></div>;
  }
  if (id === 'bit-manipulation') {
    return <div className="mini-visual bits-mini"><b>1</b><b>0</b><b>1</b><b>1</b><b>0</b></div>;
  }
  return <div className="mini-visual binary"><i className="dim" /><i className="dim" /><i /><i className="found" /><i /></div>;
}

function Lesson(props: { pattern: Pattern; isComplete: boolean; onBack: () => void; onComplete: () => void }) {
  const { pattern } = props;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
    setChoice(null);
    setSubmitted(false);
  }, [pattern.id]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= pattern.frames.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1300 / speed);
    return () => window.clearInterval(timer);
  }, [playing, speed, pattern.frames.length]);

  const frame = pattern.frames[index];
  const quizCorrect = choice === pattern.quiz.correct;

  return (
    <div className="lesson-page">
      <button className="back-button" onClick={props.onBack}><IonIcon icon={arrowBackOutline} /> ALL PATTERNS</button>

      <header className="lesson-header">
        <div>
          <span className="eyebrow">{pattern.no} · {pattern.category}</span>
          <h1>{pattern.title}</h1>
          <p>{pattern.summary}</p>
        </div>
        <div className="complexity-boxes">
          <div><small>TIME</small><strong>{pattern.complexity.time}</strong></div>
          <div><small>SPACE</small><strong>{pattern.complexity.space}</strong></div>
        </div>
      </header>

      <div className="lesson-layout">
        <div className="lesson-main">
          <LessonCard number="01" eyebrow="REAL LIFE FIRST" title={pattern.analogyTitle}>
            <p className="large-copy">{pattern.analogyBody}</p>
            <div className="mapping-grid">
              {pattern.mapping.map(([real, dsa]) => (
                <div className="mapping-row" key={real}><span>{real}</span><b>→</b><strong>{dsa}</strong></div>
              ))}
            </div>
          </LessonCard>

          <LessonCard number="02" eyebrow="SEE THE PATTERN" title="Watch the state change" interactive>
            <Visualizer pattern={pattern} frame={frame} />
            <div className="step-copy">
              <span>STEP {String(index + 1).padStart(2, '0')}</span>
              <div><h3>{frame.title}</h3><p>{frame.explanation}</p></div>
            </div>

            <div className="player">
              <div className="player-buttons">
                <button onClick={() => setIndex(0)}><IonIcon icon={refreshOutline} /></button>
                <button onClick={() => setIndex(Math.max(0, index - 1))}><IonIcon icon={chevronBackOutline} /></button>
                <button className="play-button" onClick={() => setPlaying(!playing)}><IonIcon icon={playing ? pauseOutline : playOutline} /></button>
                <button onClick={() => setIndex(Math.min(pattern.frames.length - 1, index + 1))}><IonIcon icon={chevronForwardOutline} /></button>
              </div>
              <IonRange
                min={0}
                max={pattern.frames.length - 1}
                step={1}
                value={index}
                onIonInput={(event) => setIndex(Number(event.detail.value))}
              />
              <div className="speed-row">
                <span>SPEED</span>
                {[0.5, 1, 1.5, 2].map((value) => (
                  <button key={value} className={speed === value ? 'active' : ''} onClick={() => setSpeed(value)}>{value}×</button>
                ))}
              </div>
            </div>
          </LessonCard>

          <LessonCard number="03" eyebrow="CONNECT VISUAL → CODE" title="The line that explains the movement">
            <div className="code-window">
              <div className="code-bar"><span /><span /><span /><em>solution.ts</em></div>
              <pre>
                {pattern.code.map((line, lineIndex) => (
                  <div className={'code-line ' + (frame.codeLine === lineIndex ? 'active' : '')} key={lineIndex}>
                    <span>{lineIndex + 1}</span><code>{line}</code>
                  </div>
                ))}
              </pre>
            </div>
          </LessonCard>

          <LessonCard number="04" eyebrow="THE INVARIANT" title="The rule that must stay true">
            <blockquote>{pattern.invariant}</blockquote>
            <p className="hint">If you can explain this without looking at the template, you understand the pattern.</p>
          </LessonCard>

          <LessonCard number="05" eyebrow="RECOGNIZE IT" title="When should this enter your mind?">
            <div className="recognition-grid">
              <div><h3>LOOK FOR</h3>{pattern.signals.map((item) => <p className="signal yes" key={item}>✓ {item}</p>)}</div>
              <div><h3>BE CAREFUL WHEN</h3>{pattern.avoid.map((item) => <p className="signal no" key={item}>× {item}</p>)}</div>
            </div>
          </LessonCard>

          <LessonCard number="06" eyebrow="PATTERN CHECK" title="Recognize before you code">
            <p className="quiz-question">{pattern.quiz.question}</p>
            <div className="quiz-options">
              {pattern.quiz.options.map((option, optionIndex) => {
                const selected = choice === optionIndex;
                const correct = submitted && optionIndex === pattern.quiz.correct;
                const wrong = submitted && selected && !correct;
                return (
                  <button
                    key={option}
                    className={'quiz-option ' + (selected ? 'selected ' : '') + (correct ? 'correct ' : '') + (wrong ? 'wrong' : '')}
                    onClick={() => {
                      if (!submitted) setChoice(optionIndex);
                    }}
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    <p>{option}</p>
                  </button>
                );
              })}
            </div>
            {!submitted ? (
              <button className="primary-button quiz-submit" disabled={choice === null} onClick={() => setSubmitted(true)}>
                CHECK PATTERN
              </button>
            ) : (
              <div className={'quiz-feedback ' + (quizCorrect ? 'correct' : 'wrong')}>
                <strong>{quizCorrect ? 'PATTERN RECOGNIZED ✓' : 'READ THE CLUE AGAIN'}</strong>
                <p>{pattern.quiz.explanation}</p>
              </div>
            )}
          </LessonCard>

          <section className="finish-card">
            <div><span className="eyebrow">FINISH THE LOOP</span><h2>{props.isComplete ? 'Pattern marked complete.' : 'Can you explain the invariant out loud?'}</h2><p>The next goal is recognizing this pattern in a problem you have never seen.</p></div>
            <button className={'primary-button ' + (props.isComplete ? 'done' : '')} onClick={props.onComplete}>
              <IonIcon icon={checkmarkCircleOutline} /> {props.isComplete ? 'COMPLETED' : 'MARK COMPLETE'}
            </button>
          </section>
        </div>

        <aside className="lesson-aside">
          <div className="sticky-card">
            <span className="eyebrow">LEARNING LOOP</span>
            {['Real life', 'Visual intuition', 'Code sync', 'Invariant', 'Recognition', 'Practice'].map((item, itemIndex) => (
              <div className="loop-row" key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span><p>{item}</p></div>
            ))}
          </div>
          <div className="sticky-card orange">
            <span className="eyebrow">DON'T MEMORIZE</span>
            <p>The code template is the final compression of the idea — not the idea itself.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function LessonCard(props: { number: string; eyebrow: string; title: string; children: React.ReactNode; interactive?: boolean }) {
  return (
    <section className="lesson-card">
      <div className="lesson-card-title">
        <span className="step-number">{props.number}</span>
        <div><span className="eyebrow">{props.eyebrow}</span><h2>{props.title}</h2></div>
        {props.interactive && <span className="interactive-chip"><i /> INTERACTIVE</span>}
      </div>
      {props.children}
    </section>
  );
}

function Visualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  if (pattern.id === 'prefix-sum') return <PrefixVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'fast-slow') return <FastSlowVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'monotonic-stack') return <StackVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'merge-intervals') return <IntervalVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'graph-traversal') return <GraphVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'heap-top-k') return <HeapVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'backtracking') return <BacktrackingVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'dynamic-programming') return <DPVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'trie') return <TrieVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'union-find') return <UnionFindVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'topological-sort') return <TopoVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'greedy') return <GreedyVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'bit-manipulation') return <BitVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'binary-search-answer') return <AnswerSearchVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'dp-2d') return <DPGridVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'dijkstra') return <DijkstraVisualizer pattern={pattern} frame={frame} />;
  return <ArrayVisualizer pattern={pattern} frame={frame} />;
}

function VisualShell({ pattern, frame, children }: { pattern: Pattern; frame: Frame; children: React.ReactNode }) {
  return (
    <div className="visual-stage">
      <div className="visual-topline">
        <span>{pattern.title.toUpperCase()}</span>
        <strong>{frame.metric}</strong>
      </div>
      {children}
    </div>
  );
}

function ArrayCells({ frame }: { frame: Frame }) {
  return (
    <div className="array-row">
      {frame.values.map((value, index) => {
        const active = frame.active?.includes(index);
        const dimmed = frame.dimmed?.includes(index);
        const outgoing = frame.outgoing === index;
        const incoming = frame.incoming === index;
        return (
          <div className="cell-wrap" key={index}>
            <div className="pointer-slot">
              {frame.left === index && <span className="pointer cyan">LEFT</span>}
              {frame.mid === index && <span className="pointer orange">MID</span>}
              {frame.right === index && <span className="pointer green">RIGHT</span>}
            </div>
            <div className={'array-cell ' + (active ? 'active ' : '') + (dimmed ? 'dimmed ' : '') + (outgoing ? 'outgoing ' : '') + (incoming ? 'incoming' : '')}>
              {value}
            </div>
            <span className="index-label">{index}</span>
          </div>
        );
      })}
    </div>
  );
}

function ArrayVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <ArrayCells frame={frame} />
      {frame.windowStart !== undefined && frame.windowEnd !== undefined && (
        <div className="window-readout">
          <span>WINDOW</span>
          <strong>[{frame.windowStart}..{frame.windowEnd}]</strong>
          {frame.outgoing !== undefined && <em className="out">− {frame.values[frame.outgoing]}</em>}
          {frame.incoming !== undefined && <em className="in">+ {frame.values[frame.incoming]}</em>}
        </div>
      )}
    </VisualShell>
  );
}

function PrefixVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="visual-caption">ORIGINAL</div>
      <ArrayCells frame={frame} />
      <div className="prefix-arrow">↓ cumulative totals</div>
      <div className="prefix-row">
        {(frame.prefix || []).map((value, index) => (
          <div className="prefix-cell" key={index}><strong>{value}</strong><small>p[{index}]</small></div>
        ))}
      </div>
    </VisualShell>
  );
}

function FastSlowVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="linked-row">
        {frame.values.map((value, index) => (
          <div className="linked-wrap" key={index}>
            <div className="runner-labels">
              {frame.slow === index && <span className="runner slow">SLOW</span>}
              {frame.fast === index && <span className="runner fast">FAST</span>}
            </div>
            <div className={'linked-node ' + (frame.slow === index || frame.fast === index ? 'active' : '')}>{value}</div>
            {index < frame.values.length - 1 && <span className="link-arrow">→</span>}
          </div>
        ))}
      </div>
      <div className="cycle-return">node 6 <span>↺</span> node 3</div>
    </VisualShell>
  );
}

function StackVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="split-visual">
        <div>
          <div className="visual-caption">INPUT</div>
          <ArrayCells frame={frame} />
        </div>
        <div className="stack-panel">
          <div className="visual-caption">MONOTONIC STACK</div>
          <div className="stack-column">
            {(frame.stack || []).slice().reverse().map((value, index) => (
              <div className={'stack-value ' + (index === 0 ? 'top' : '')} key={index}>{value}</div>
            ))}
          </div>
          <small>TOP ↑</small>
        </div>
      </div>
    </VisualShell>
  );
}

function IntervalVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const max = 18;
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="interval-board">
        <div className="visual-caption">SORTED INPUT</div>
        {(frame.intervals || []).map(([start, end], index) => (
          <div className="interval-track" key={index}>
            <span>{start}</span>
            <div
              className={'interval-bar ' + (frame.active?.includes(index) ? 'active' : '')}
              style={{ left: ((start - 1) / max) * 100 + '%', width: ((end - start + 1) / max) * 100 + '%' }}
            >[{start},{end}]</div>
          </div>
        ))}
        <div className="visual-caption merged-caption">MERGED OUTPUT</div>
        <div className="merged-row">
          {(frame.merged || []).map(([start, end]) => <span key={start + '-' + end}>[{start},{end}]</span>)}
        </div>
      </div>
    </VisualShell>
  );
}

const graphPositions = [
  [50, 10], [22, 38], [78, 38], [12, 76], [52, 76], [86, 86]
];

function GraphVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="graph-board">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.edges || []).map(([a,b], index) => (
            <line key={index} x1={graphPositions[a][0]} y1={graphPositions[a][1]} x2={graphPositions[b][0]} y2={graphPositions[b][1]} />
          ))}
        </svg>
        {frame.values.map((value) => {
          const [x,y] = graphPositions[value];
          const active = frame.active?.includes(value);
          const visited = frame.visited?.includes(value);
          return <div key={value} className={'graph-node ' + (visited ? 'visited ' : '') + (active ? 'active' : '')} style={{ left: x + '%', top: y + '%' }}>{String.fromCharCode(65 + value)}</div>;
        })}
      </div>
      <div className="queue-strip"><span>QUEUE</span>{(frame.queue || []).map((value) => <b key={value}>{String.fromCharCode(65 + value)}</b>)}</div>
    </VisualShell>
  );
}

function HeapVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const heap = frame.stack || [];
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="heap-layout">
        <div>
          <div className="visual-caption">INCOMING SCORES</div>
          <ArrayCells frame={frame} />
        </div>
        <div className="heap-tree">
          {heap.map((value, index) => <div key={index} className={'heap-node heap-' + index}>{value}</div>)}
        </div>
      </div>
      <div className="heap-note">MIN-HEAP OF SIZE K · ROOT = CURRENT BOUNDARY</div>
    </VisualShell>
  );
}

function BacktrackingVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="choice-row">
        {frame.values.map((value, index) => <div key={value} className={'choice-chip ' + (frame.active?.includes(index) ? 'active' : '')}>{value}</div>)}
      </div>
      <div className="decision-arrow">CHOOSE → EXPLORE → UNDO</div>
      <div className="path-row">
        <span>PATH</span>
        {(frame.path || []).map((value, index) => <b key={index}>{value}</b>)}
        <i className="path-cursor" />
      </div>
      <div className="branch-tree">
        <span>1</span><span>2</span><span>3</span>
        <div className="branch-line" />
      </div>
    </VisualShell>
  );
}

function DPVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="visual-caption">STATE TABLE</div>
      <div className="dp-row">
        {(frame.dp || []).map((value, index) => (
          <div className={'dp-cell ' + (frame.active?.includes(index) ? 'active' : '')} key={index}>
            <small>dp[{index}]</small><strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="dp-transition">dp[i] = dp[i − 1] + dp[i − 2]</div>
    </VisualShell>
  );
}


const triePositions = [
  [50, 8], [50, 28], [50, 48], [24, 74], [50, 74], [76, 74]
];

function TrieVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="trie-board">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.edges || []).map(([a,b], index) => (
            <line key={index} x1={triePositions[a][0]} y1={triePositions[a][1]} x2={triePositions[b][0]} y2={triePositions[b][1]} />
          ))}
        </svg>
        {(frame.labels || []).map((label, index) => {
          const [x,y] = triePositions[index];
          const active = frame.active?.includes(index);
          return (
            <div key={label + index} className={'trie-node ' + (active ? 'active' : '')} style={{ left: x + '%', top: y + '%' }}>
              {label}
            </div>
          );
        })}
      </div>
      <div className="trie-path">
        <span>PATH</span>
        {(frame.triePath || []).map((part, index) => <b key={index}>{part}</b>)}
      </div>
      <div className="word-strip">
        {(frame.words || []).map((word) => <span key={word}>{word}</span>)}
      </div>
    </VisualShell>
  );
}

function UnionFindVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const groups = new Map<number, number[]>();
  (frame.parents || []).forEach((parent, index) => {
    const root = parent;
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(index);
  });
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="uf-board">
        {Array.from(groups.entries()).map(([root, members]) => (
          <div className="uf-group" key={root}>
            <small>ROOT {frame.labels?.[root]}</small>
            <div>
              {members.map((member) => (
                <span key={member} className={frame.selected?.includes(member) ? 'active' : ''}>
                  {frame.labels?.[member] ?? member}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="parent-strip">
        {(frame.parents || []).map((parent, index) => (
          <span key={index}>{frame.labels?.[index]} → {frame.labels?.[parent]}</span>
        ))}
      </div>
    </VisualShell>
  );
}

const topoPositions = [[18,18],[18,72],[62,18],[72,72]];

function TopoVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="topo-layout">
        <div className="topo-board">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {(frame.edges || []).map(([a,b], index) => (
              <line key={index} x1={topoPositions[a][0]} y1={topoPositions[a][1]} x2={topoPositions[b][0]} y2={topoPositions[b][1]} />
            ))}
          </svg>
          {(frame.labels || []).map((label,index) => {
            const [x,y] = topoPositions[index];
            return (
              <div key={label} className={'topo-node ' + (frame.visited?.includes(index) ? 'visited ' : '') + (frame.active?.includes(index) ? 'active' : '')} style={{ left:x+'%', top:y+'%' }}>
                <b>{label}</b><small>in {frame.indegree?.[index] ?? 0}</small>
              </div>
            );
          })}
        </div>
        <div className="topo-queue">
          <small>READY QUEUE</small>
          <div>{(frame.queue || []).map((n) => <b key={n}>{frame.labels?.[n]}</b>)}</div>
        </div>
      </div>
    </VisualShell>
  );
}

function GreedyVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const max = 10;
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="greedy-board">
        <div className="visual-caption">MEETINGS SORTED BY FINISH TIME</div>
        {(frame.intervals || []).map(([start,end], index) => (
          <div className="greedy-track" key={index}>
            <div
              className={'greedy-bar ' + (frame.selected?.includes(index) ? 'selected ' : '') + (frame.active?.includes(index) ? 'active ' : '') + (frame.dimmed?.includes(index) ? 'rejected' : '')}
              style={{ left: (start/max*100)+'%', width: ((end-start)/max*100)+'%' }}
            >
              [{start},{end}]
            </div>
          </div>
        ))}
      </div>
      <div className="greedy-legend"><span className="take">TAKE</span><span className="skip">SKIP OVERLAP</span></div>
    </VisualShell>
  );
}

function BitVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="bit-board">
        {(frame.bits || []).map((bit,index) => (
          <div key={index} className={'bit-cell ' + (frame.active?.includes(index) ? 'active' : '')}>
            <small>{index}</small>
            <strong>{bit}</strong>
          </div>
        ))}
      </div>
      <div className="bit-ops">
        <span>AND &</span><span>OR |</span><span>XOR ^</span><span>SHIFT &lt;&lt; &gt;&gt;</span>
      </div>
    </VisualShell>
  );
}

function AnswerSearchVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const [low, high] = frame.range || [0, 0];
  const min = 6;
  const max = 21;
  const leftPct = ((low - min) / (max - min)) * 100;
  const rightPct = ((high - min) / (max - min)) * 100;
  const candidatePct = (((frame.candidate ?? low) - min) / (max - min)) * 100;
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="answer-search">
        <div className="answer-scale">
          {Array.from({length: max-min+1}, (_,i) => <span key={i}>{i+min}</span>)}
        </div>
        <div className="answer-line">
          <i className="answer-range" style={{ left:leftPct+'%', width:Math.max(2,rightPct-leftPct)+'%' }} />
          <b className={'candidate ' + (frame.feasible ? 'yes' : 'no')} style={{ left:candidatePct+'%' }}>{frame.candidate}</b>
        </div>
        <div className="answer-labels"><span>TOO SMALL</span><strong>{frame.feasible ? 'FEASIBLE ✓' : 'NOT FEASIBLE ×'}</strong><span>SEARCH BOUNDARY</span></div>
      </div>
    </VisualShell>
  );
}

function DPGridVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="dp-grid">
        {(frame.grid || []).map((row,r) =>
          row.map((value,c) => {
            const active = frame.cell?.[0] === r && frame.cell?.[1] === c;
            const dependency = frame.cell && ((r === frame.cell[0]-1 && c === frame.cell[1]) || (r === frame.cell[0] && c === frame.cell[1]-1));
            return (
              <div key={r+'-'+c} className={'dp-grid-cell ' + (active ? 'active ' : '') + (dependency ? 'dependency' : '')}>
                <small>[{r},{c}]</small><strong>{value}</strong>
              </div>
            );
          })
        )}
      </div>
      <div className="dp-grid-rule">FROM TOP ↓ + FROM LEFT →</div>
    </VisualShell>
  );
}

const dijkstraPositions = [[12,45],[38,15],[38,78],[68,35],[90,62]];

function DijkstraVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="weighted-board">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.weights || []).map(([a,b,w],index) => {
            const x = (dijkstraPositions[a][0] + dijkstraPositions[b][0]) / 2;
            const y = (dijkstraPositions[a][1] + dijkstraPositions[b][1]) / 2;
            return (
              <g key={index}>
                <line x1={dijkstraPositions[a][0]} y1={dijkstraPositions[a][1]} x2={dijkstraPositions[b][0]} y2={dijkstraPositions[b][1]} />
                <text x={x} y={y}>{w}</text>
              </g>
            );
          })}
        </svg>
        {(frame.labels || []).map((label,index) => {
          const [x,y] = dijkstraPositions[index];
          const active = frame.active?.includes(index);
          const visited = frame.visited?.includes(index);
          const distance = frame.distances?.[index];
          return (
            <div key={label} className={'weighted-node ' + (visited ? 'visited ' : '') + (active ? 'active' : '')} style={{ left:x+'%', top:y+'%' }}>
              <b>{label}</b><small>{distance === 99 ? '∞' : distance}</small>
            </div>
          );
        })}
      </div>
      <div className="queue-strip">
        <span>MIN-HEAP</span>
        {(frame.queue || []).map((node) => <b key={node}>{frame.labels?.[node]}:{frame.distances?.[node] === 99 ? '∞' : frame.distances?.[node]}</b>)}
      </div>
    </VisualShell>
  );
}

export default App;
