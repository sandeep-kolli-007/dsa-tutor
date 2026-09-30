import { useMemo, useState } from 'react';

import { patterns } from '../data/patterns';
import { loadPracticeStats, recordPracticeAnswer } from '../state/practice';
import type { PatternId } from '../types/lesson';

export function Practice(props: { openLesson: (id: PatternId) => void }) {
  const initialStats = useMemo(() => loadPracticeStats(), []);
  const [stats, setStats] = useState(initialStats);
  const [challengeIndex, setChallengeIndex] = useState(initialStats.answered % patterns.length);
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const pattern = patterns[challengeIndex % patterns.length];
  const isCorrect = choice === pattern.quiz.correct;
  const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
  const patternStats = stats.byPattern[pattern.id];

  const submit = () => {
    if (choice === null || submitted) return;
    const next = recordPracticeAnswer(pattern.id, isCorrect);
    setStats(next);
    setSubmitted(true);
  };

  const next = () => {
    setChallengeIndex((current) => (current + 1) % patterns.length);
    setChoice(null);
    setSubmitted(false);
  };

  return (
    <div className="page practice-page">
      <header className="compact-header practice-header">
        <span className="eyebrow">PATTERN RECOGNITION TRAINER</span>
        <h1>Name the pattern before you code.</h1>
        <p>
          The goal is not remembering a template. Read the problem clue, choose the mental model,
          then inspect why that pattern fits.
        </p>
      </header>

      <section className="practice-scoreboard">
        <div><small>ATTEMPTS</small><strong>{stats.answered}</strong></div>
        <div><small>CORRECT</small><strong>{stats.correct}</strong></div>
        <div><small>ACCURACY</small><strong>{accuracy}%</strong></div>
        <div><small>THIS PATTERN</small><strong>{patternStats?.answered ?? 0}</strong></div>
      </section>

      <section className="practice-card">
        <div className="practice-card-top">
          <span className="micro-index">CHALLENGE {String(challengeIndex + 1).padStart(2, '0')}</span>
          <span className="status-chip">{pattern.category}</span>
        </div>

        <div className="practice-problem">
          <span className="eyebrow">READ THE CLUE</span>
          <h2>{pattern.quiz.question}</h2>
        </div>

        <div className="practice-options">
          {pattern.quiz.options.map((option, optionIndex) => {
            const selected = choice === optionIndex;
            const correct = submitted && optionIndex === pattern.quiz.correct;
            const wrong = submitted && selected && !correct;
            return (
              <button
                key={option}
                className={(selected ? 'selected ' : '') + (correct ? 'correct ' : '') + (wrong ? 'wrong' : '')}
                onClick={() => {
                  if (!submitted) setChoice(optionIndex);
                }}
              >
                <span>{String.fromCharCode(65 + optionIndex)}</span>
                <strong>{option}</strong>
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <button className="primary-button practice-action" disabled={choice === null} onClick={submit}>
            CHECK MY PATTERN
          </button>
        ) : (
          <>
            <div className={'practice-feedback ' + (isCorrect ? 'correct' : 'wrong')}>
              <span className="eyebrow">{isCorrect ? 'RECOGNIZED' : 'MISSED SIGNAL'}</span>
              <h3>{isCorrect ? 'Correct pattern.' : `This one is ${pattern.quiz.options[pattern.quiz.correct]}.`}</h3>
              <p>{pattern.quiz.explanation}</p>
            </div>

            <div className="practice-clues">
              <span className="eyebrow">CLUES THAT SHOULD TRIGGER THE PATTERN</span>
              <div>{pattern.signals.map((signal) => <b key={signal}>{signal}</b>)}</div>
            </div>

            <div className="practice-actions">
              <button className="secondary-action" onClick={() => props.openLesson(pattern.id)}>OPEN FULL LESSON</button>
              <button className="primary-button" onClick={next}>NEXT CHALLENGE →</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
