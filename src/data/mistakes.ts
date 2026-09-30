import type { PatternId } from '../types/lesson';

export type MistakeCase = {
  title: string;
  wrong: string[];
  symptom: string;
  why: string;
  rule: string;
};

export const mistakes: Partial<Record<PatternId, MistakeCase[]>> = {
  'sliding-window': [
    {
      title: 'Recalculate every window',
      wrong: ['for each start:', '  sum = add nums[start..start+k-1]'],
      symptom: 'The solution works, but becomes O(n·k) and loses the entire reason to use the pattern.',
      why: 'Neighboring windows share k-1 values. Re-adding them throws away reusable state.',
      rule: 'Update with oldSum - outgoing + incoming.',
    },
    {
      title: 'Shrink the wrong boundary',
      wrong: ['while (windowInvalid) {', '  right--;', '}'],
      symptom: 'Variable-size windows can loop, skip answers, or stop being a forward-only scan.',
      why: 'The right pointer discovers new data; the left pointer removes old data when the window must shrink.',
      rule: 'Grow with right. Repair/shrink with left.',
    },
  ],
  'two-pointers': [
    {
      title: 'Move both pointers after every comparison',
      wrong: ['if (sum !== target) {', '  left++;', '  right--;', '}'],
      symptom: 'Valid pairs can be skipped.',
      why: 'Sorted order tells you which single movement can eliminate impossible pairs safely.',
      rule: 'Too small → move left. Too large → move right.',
    },
  ],
  'binary-search': [
    {
      title: 'Keep mid inside the next range',
      wrong: ['if (nums[mid] < target)', '  left = mid;', 'else', '  right = mid;'],
      symptom: 'The loop can get stuck forever when left and right become adjacent.',
      why: 'After comparing mid, that index is already resolved and must leave the search space.',
      rule: 'Use mid + 1 or mid - 1 when mid itself cannot be the answer.',
    },
    {
      title: 'Mix incompatible loop invariants',
      wrong: ['while (left < right) {', '  ...', '  right = mid - 1;', '}'],
      symptom: 'Boundary elements may never be checked or the final candidate may be skipped.',
      why: 'Closed [left,right] and half-open [left,right) search spaces require different updates.',
      rule: 'Choose one search-space convention and keep every boundary update consistent with it.',
    },
  ],
  'graph-traversal': [
    {
      title: 'Mark visited when dequeuing',
      wrong: ['queue.push(next);', '// seen.add(next) later when popped'],
      symptom: 'The same node may enter the queue many times through different parents.',
      why: 'Discovery should reserve a node immediately so no other edge schedules duplicate work.',
      rule: 'Mark visited when you enqueue/discover, not when you later process.',
    },
  ],
  'monotonic-stack': [
    {
      title: 'Pop only one violating element',
      wrong: ['if (current > stack.top)', '  stack.pop();'],
      symptom: 'The stack can stop being monotonic after a larger value arrives.',
      why: 'One incoming element may resolve many older candidates.',
      rule: 'Pop in a while-loop until the monotonic invariant is restored.',
    },
  ],
  'linked-list-reversal': [
    {
      title: 'Reverse before saving next',
      wrong: ['curr.next = prev;', 'curr = curr.next;'],
      symptom: 'The unreversed suffix becomes unreachable after the first pointer rewrite.',
      why: 'curr.next is the only reference to the rest of the list before rewiring.',
      rule: 'Save next first, reverse second, advance last.',
    },
  ],
  'backtracking': [
    {
      title: 'Forget to undo the choice',
      wrong: ['path.push(choice);', 'dfs(next);', '// missing path.pop()'],
      symptom: 'Sibling branches inherit state from previous branches and produce invalid solutions.',
      why: 'Backtracking relies on each recursive call returning the shared state to exactly its previous form.',
      rule: 'Choose → explore → undo.',
    },
  ],
  'dynamic-programming': [
    {
      title: 'Write the recurrence before defining the state',
      wrong: ['dp[i] = max(dp[i-1], dp[i-2] + value);', '// but what does dp[i] mean?'],
      symptom: 'Base cases and transitions become guesswork and edge cases keep breaking.',
      why: 'A recurrence is only correct relative to a precise state definition.',
      rule: 'State meaning first → transition → base cases → evaluation order.',
    },
  ],
};
