import { useEffect, useState } from 'react';

import { mistakes } from '../data/mistakes';
import type { PatternId } from '../types/lesson';
import { MistakeSimulator } from './MistakeSimulator';

export function MistakeLab({ patternId }: { patternId: PatternId }) {
  const cases = mistakes[patternId];
  const [active, setActive] = useState(0);

  useEffect(() => setActive(0), [patternId]);

  if (!cases?.length) return null;

  const current = cases[Math.min(active, cases.length - 1)];

  return (
    <div className="mistake-lab">
      <div className="mistake-tabs">
        {cases.map((item, index) => (
          <button key={item.title} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
            BUG {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className="mistake-grid">
        <div className="mistake-code">
          <span className="danger-label">BROKEN VERSION</span>
          <h3>{current.title}</h3>
          <pre>{current.wrong.map((line, index) => <code key={index}>{line}</code>)}</pre>
        </div>

        <div className="mistake-explanation">
          <div><span>SYMPTOM</span><p>{current.symptom}</p></div>
          <div><span>WHY IT BREAKS</span><p>{current.why}</p></div>
          <div className="mistake-rule"><span>CORRECT MENTAL RULE</span><strong>{current.rule}</strong></div>
        </div>
      </div>

      <MistakeSimulator patternId={patternId} caseIndex={active} />
    </div>
  );
}
