import { useMemo, useState } from 'react';

import { mistakes } from '../data/mistakes';
import type { PatternId } from '../types/lesson';

type Scenario = {
  input: string;
  trace: string[];
  consequence: string;
};

const scenarios: Partial<Record<PatternId, Scenario[]>> = {
  'sliding-window': [
    {
      input: '[4, 7, 3, 9, 6, 8], k = 3',
      trace: ['sum [4,7,3] = 14', 're-add [7,3,9] = 19', 're-add [3,9,6] = 18', 're-add [9,6,8] = 23'],
      consequence: 'Correct answer, but repeated work grows to O(n·k). The state reuse invariant is lost.',
    },
    {
      input: 'variable window · right = 5',
      trace: ['window invalid', 'right--', 'same old values return', 'forward progress is no longer guaranteed'],
      consequence: 'Shrinking the discovery boundary can revisit state and skip valid windows.',
    },
  ],
  'two-pointers': [{
    input: '[1, 2, 4, 8, 11], target = 10',
    trace: ['1 + 11 = 12', 'move BOTH → 2 + 8 = 10', 'this case survives by luck', 'other arrays can skip the only valid pair'],
    consequence: 'Sorted order only justifies eliminating one side. Moving both throws away unproven candidates.',
  }],
  'binary-search': [
    {
      input: '[2, 5], target = 5',
      trace: ['left=0 right=1', 'mid=0 → nums[mid]=2', 'left = mid → left stays 0', 'mid is 0 again → infinite loop'],
      consequence: 'mid was already disproven, but the broken update keeps it inside the search space.',
    },
    {
      input: '[1, 3, 5, 7], target = 7',
      trace: ['mixed closed + half-open rules', 'boundary update removes candidate inconsistently', 'final element may never be checked'],
      consequence: 'Loop condition and boundary updates describe different search spaces.',
    },
  ],
  'graph-traversal': [{
    input: 'A connects to B and C; both connect to D',
    trace: ['enqueue B', 'enqueue C', 'B discovers D → enqueue D', 'C also discovers D → enqueue D again'],
    consequence: 'Marking visited only when dequeued allows duplicate scheduled work.',
  }],
  'monotonic-stack': [{
    input: 'stack [9, 7, 5], incoming 10',
    trace: ['pop 5 once', 'stack becomes [9,7]', '10 still violates monotonic order', 'future answers use corrupted state'],
    consequence: 'One incoming value may resolve multiple older candidates, so restoration needs a while-loop.',
  }],
  'linked-list-reversal': [{
    input: '1 → 2 → 3',
    trace: ['curr = 1', 'curr.next = prev(null)', 'curr = curr.next', 'curr becomes null; nodes 2 and 3 are lost'],
    consequence: 'The only pointer to the unreversed suffix was overwritten before it was saved.',
  }],
  'backtracking': [{
    input: 'choices [A, B, C]',
    trace: ['choose A → path [A]', 'explore child', 'return without pop', 'choose B → path incorrectly becomes [A,B]'],
    consequence: 'Sibling branches inherit state from the previous branch.',
  }],
  'dynamic-programming': [{
    input: 'house values [2, 7, 9, 3]',
    trace: ['write recurrence first', 'dp[0] meaning unclear', 'dp[1] base guessed', 'edge cases require patches'],
    consequence: 'Without a precise state definition, recurrence and base cases cannot be verified.',
  }],
};

export function MistakeSimulator({ patternId, caseIndex }: { patternId: PatternId; caseIndex: number }) {
  const available = scenarios[patternId] ?? [];
  const scenario = available[Math.min(caseIndex, Math.max(0, available.length - 1))];
  const [step, setStep] = useState(0);

  const trace = useMemo(() => scenario?.trace ?? [], [scenario]);

  if (!scenario) {
    return (
      <div className="mistake-simulator empty">
        <span className="eyebrow">TRACE SIMULATOR</span>
        <p>This mistake currently has a conceptual trace. A concrete execution trace will be added when this pattern receives its interactive bug scenario.</p>
      </div>
    );
  }

  return (
    <div className="mistake-simulator">
      <div className="mistake-sim-head">
        <div><span className="eyebrow">BROKEN EXECUTION</span><strong>{scenario.input}</strong></div>
        <span>STEP {step + 1}/{trace.length}</span>
      </div>

      <div className="mistake-trace">
        {trace.map((line, index) => (
          <div key={line + index} className={(index === step ? 'active ' : '') + (index < step ? 'done' : '')}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <code>{line}</code>
          </div>
        ))}
      </div>

      <div className="mistake-sim-controls">
        <button disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>← PREV</button>
        <button disabled={step === trace.length - 1} onClick={() => setStep((value) => Math.min(trace.length - 1, value + 1))}>NEXT →</button>
      </div>

      {step === trace.length - 1 && (
        <div className="mistake-consequence">
          <span>FAILURE</span>
          <p>{scenario.consequence}</p>
        </div>
      )}
    </div>
  );
}
