import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { IonIcon, IonRange } from '@ionic/react';
import {
  arrowBackOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  pauseOutline,
  playOutline,
  refreshOutline,
} from 'ionicons/icons';

import type { Frame, Pattern } from '../types/lesson';
import { Visualizer } from '../components/visualizers/Visualizer';
import { ExplorePanel } from '../components/ExplorePanel';

export function Lesson(props: { pattern: Pattern; isComplete: boolean; onBack: () => void; onComplete: () => void }) {
  const { pattern } = props;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [customFrames, setCustomFrames] = useState<Frame[] | null>(null);
  const frames = customFrames ?? pattern.frames;

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
    setChoice(null);
    setSubmitted(false);
    setCustomFrames(null);
  }, [pattern.id]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= frames.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1300 / speed);
    return () => window.clearInterval(timer);
  }, [playing, speed, frames.length]);

  const frame = frames[Math.min(index, frames.length - 1)];
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
                <button onClick={() => setIndex(Math.min(frames.length - 1, index + 1))}><IonIcon icon={chevronForwardOutline} /></button>
              </div>
              <IonRange
                min={0}
                max={frames.length - 1}
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

            <ExplorePanel
              patternId={pattern.id}
              onFrames={(nextFrames) => {
                setCustomFrames(nextFrames);
                setIndex(0);
                setPlaying(false);
              }}
            />
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

function LessonCard(props: { number: string; eyebrow: string; title: string; children: ReactNode; interactive?: boolean }) {
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
