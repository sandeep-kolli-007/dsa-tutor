import { useMemo, useState } from 'react';

import type { Frame, Pattern } from '../types/lesson';
import { Visualizer } from './visualizers/Visualizer';
import { loadPredictionStats, recordPredictionAnswer } from '../state/prediction';

type Option = { label: string; correct: boolean };

function transition(current: Frame, next: Frame) {
  if (next.left !== undefined && current.left !== undefined && next.left !== current.left) return `Move LEFT to ${next.left}`;
  if (next.right !== undefined && current.right !== undefined && next.right !== current.right) return `Move RIGHT to ${next.right}`;
  if (next.mid !== undefined && current.mid !== undefined && next.mid !== current.mid) return `Recompute MID as ${next.mid}`;
  if (next.windowStart !== undefined && current.windowStart !== undefined && next.windowStart !== current.windowStart) return `Slide window to [${next.windowStart}..${next.windowEnd}]`;
  if (next.queue && JSON.stringify(next.queue) !== JSON.stringify(current.queue)) return `Update queue to [${next.queue.join(', ')}]`;
  if (next.stack && JSON.stringify(next.stack) !== JSON.stringify(current.stack)) return `Update stack to [${next.stack.join(', ')}]`;
  return next.title;
}

function optionsFor(pattern: Pattern, index: number): Option[] {
  const current = pattern.frames[index];
  const next = pattern.frames[index + 1];
  if (!next) return [];
  const answer = transition(current, next);
  const distractors = Array.from(new Set([
    current.title,
    pattern.frames[Math.max(0, index - 1)]?.title,
    'Restart and recompute all state',
  ].filter((item): item is string => Boolean(item) && item !== answer))).slice(0, 2);
  const options = [{ label: answer, correct: true }, ...distractors.map((label) => ({ label, correct: false }))];
  const offset = (index + Number(pattern.no || 0)) % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

export function PredictionMode({ pattern }: { pattern: Pattern }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, answered: 0 });
  const [lifetime, setLifetime] = useState(loadPredictionStats);
  const last = Math.max(0, pattern.frames.length - 2);
  const safeIndex = Math.min(index, last);
  const current = pattern.frames[safeIndex];
  const next = pattern.frames[safeIndex + 1];
  const options = useMemo(() => optionsFor(pattern, safeIndex), [pattern, safeIndex]);
  const selected = choice === null ? null : options[choice];

  if (!next) return null;

  const reveal = () => {
    if (choice === null || revealed) return;
    const correct = Boolean(selected?.correct);
    setRevealed(true);
    setScore((value) => ({ answered: value.answered + 1, correct: value.correct + (correct ? 1 : 0) }));
    setLifetime(recordPredictionAnswer(pattern.id, correct));
  };

  const advance = () => {
    setIndex(safeIndex >= last ? 0 : safeIndex + 1);
    if (safeIndex >= last) setScore({ correct: 0, answered: 0 });
    setChoice(null);
    setRevealed(false);
  };

  return <div className="prediction-lab">
    <div className="prediction-head">
      <div><span className="eyebrow">ACTIVE RECALL</span><h3>Predict the next legal state.</h3><p>Read the state, apply the invariant, then commit before revealing the answer.</p></div>
      <div className="prediction-score">
        <small>SESSION</small><strong>{score.correct}/{score.answered}</strong>
        <em>{lifetime.byPattern[pattern.id]?.answered
          ? Math.round(((lifetime.byPattern[pattern.id]?.correct ?? 0) / (lifetime.byPattern[pattern.id]?.answered ?? 1)) * 100) + '% lifetime'
          : 'no history'}</em>
      </div>
    </div>
    <Visualizer pattern={pattern} frame={current} />
    <div className="prediction-question"><span>STATE {safeIndex + 1} OF {pattern.frames.length}</span><h4>What should happen next?</h4></div>
    <div className="prediction-options">
      {options.map((option, optionIndex) => {
        const picked = choice === optionIndex;
        const correct = revealed && option.correct;
        const wrong = revealed && picked && !option.correct;
        return <button key={option.label} className={(picked?'selected ':'')+(correct?'correct ':'')+(wrong?'wrong':'')} disabled={revealed} onClick={() => setChoice(optionIndex)}>
          <span>{String.fromCharCode(65 + optionIndex)}</span><strong>{option.label}</strong>
        </button>;
      })}
    </div>
    {!revealed
      ? <button className="primary-button prediction-action" disabled={choice === null} onClick={reveal}>COMMIT PREDICTION</button>
      : <>
          <div className={'prediction-feedback '+(selected?.correct?'correct':'wrong')}>
            <span className="eyebrow">{selected?.correct?'INVARIANT PRESERVED':'PREDICTION MISSED'}</span>
            <h4>{selected?.correct?'That is the next legal move.':'Compare your move with the actual transition.'}</h4>
            <p>{next.explanation}</p>
          </div>
          <div className="prediction-reveal"><span className="eyebrow">ACTUAL NEXT STATE</span><Visualizer pattern={pattern} frame={next} /></div>
          <button className="primary-button prediction-action" onClick={advance}>{safeIndex>=last?'RESTART PREDICTION RUN':'NEXT STATE →'}</button>
        </>
    }
  </div>;
}
