import { useEffect, useMemo, useState } from 'react';

import { buildExploreFrames, supportsExplore } from '../engine/frameGenerators';
import type { Frame, PatternId } from '../types/lesson';

const defaults: Record<'sliding-window' | 'two-pointers' | 'binary-search', { array: string; parameter: string }> = {
  'sliding-window': { array: '4, 7, 3, 9, 6, 8', parameter: '3' },
  'two-pointers': { array: '2, 4, 7, 11, 18', parameter: '15' },
  'binary-search': { array: '2, 4, 7, 11, 18, 25, 31', parameter: '25' },
};

export function ExplorePanel(props: {
  patternId: PatternId;
  onFrames: (frames: Frame[] | null) => void;
}) {
  const supportedId = supportsExplore(props.patternId) ? props.patternId : null;
  const initial = supportedId ? defaults[supportedId] : null;
  const [arrayText, setArrayText] = useState(initial?.array ?? '');
  const [parameterText, setParameterText] = useState(initial?.parameter ?? '');
  const [error, setError] = useState<string | null>(null);
  const [usingCustom, setUsingCustom] = useState(false);

  useEffect(() => {
    if (!supportsExplore(props.patternId)) return;
    const id = props.patternId;
    const next = defaults[id];
    setArrayText(next.array);
    setParameterText(next.parameter);
    setError(null);
    setUsingCustom(false);
    props.onFrames(null);
  }, [props.patternId]);

  const parameterLabel = useMemo(() => {
    if (props.patternId === 'sliding-window') return 'WINDOW SIZE K';
    return 'TARGET';
  }, [props.patternId]);

  if (!supportedId) return null;

  const run = () => {
    const nums = arrayText
      .split(',')
      .map((part: string) => part.trim())
      .filter(Boolean)
      .map(Number);
    const parameter = Number(parameterText);
    if (!Number.isFinite(parameter)) {
      setError('Enter a valid numeric parameter.');
      return;
    }

    const result = buildExploreFrames(supportedId, nums, parameter);
    if (!result.frames) {
      setError(result.error ?? 'Could not generate frames.');
      return;
    }

    setError(null);
    setUsingCustom(true);
    props.onFrames(result.frames);
  };

  const reset = () => {
    const next = defaults[supportedId];
    setArrayText(next.array);
    setParameterText(next.parameter);
    setError(null);
    setUsingCustom(false);
    props.onFrames(null);
  };

  return (
    <div className="explore-panel">
      <div className="explore-heading">
        <div>
          <span className="eyebrow">EXPLORE MODE</span>
          <h3>Change the input. Keep the invariant.</h3>
        </div>
        <span className={'explore-status ' + (usingCustom ? 'active' : '')}>{usingCustom ? 'CUSTOM RUN' : 'LESSON EXAMPLE'}</span>
      </div>

      <div className="explore-fields">
        <label>
          <span>ARRAY · COMMA SEPARATED</span>
          <input value={arrayText} onChange={(event) => setArrayText(event.target.value)} inputMode="text" />
        </label>
        <label>
          <span>{parameterLabel}</span>
          <input value={parameterText} onChange={(event) => setParameterText(event.target.value)} inputMode="numeric" />
        </label>
        <button className="explore-run" onClick={run}>RUN VISUALIZATION</button>
        <button className="explore-reset" onClick={reset}>RESET</button>
      </div>

      {error && <p className="explore-error">{error}</p>}
      <p className="explore-hint">
        {props.patternId === 'sliding-window'
          ? 'Try different window sizes and watch exactly one value leave while one enters.'
          : 'Keep the array sorted so each pointer decision can safely eliminate part of the search space.'}
      </p>
    </div>
  );
}
