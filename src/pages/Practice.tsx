import { useMemo, useState } from 'react';

import { patterns } from '../data/patterns';
import { dueReviewCount, pickNextReview } from '../engine/reviewScheduler';
import { loadPracticeStats, recordPracticeAnswer } from '../state/practice';
import type { PatternId } from '../types/lesson';

function reviewLabel(nextReviewAt?: number) {
  if (!nextReviewAt) return 'Not scheduled';
  const delta = Math.max(0, nextReviewAt - Date.now());
  const hours = Math.ceil(delta / (60 * 60 * 1000));
  if (hours <= 24) return 'Review in ~1 day';
  const days = Math.ceil(hours / 24);
  return `Review in ~${days} days`;
}

export function Practice(props: {
  openLesson: (id: PatternId) => void;
  completed: PatternId[];
}) {
  const initialStats = useMemo(() => loadPracticeStats(), []);
  const candidateIds = useMemo(
    () => props.completed.length ? props.completed : patterns.slice(0, 6).map((pattern) => pattern.id),
    [props.completed]
  );
  const [stats, setStats] = useState(initialStats);
  const [patternId, setPatternId] = useState<PatternId>(() => pickNextReview(candidateIds, initialStats));
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const pattern = patterns.find((item) => item.id === patternId) ?? patterns[0];
  const isCorrect = choice === pattern.quiz.correct;
  const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
  const patternStats = stats.byPattern[pattern.id];
  const dueNow = dueReviewCount(candidateIds, stats);

  const submit = () => {
    if (choice === null || submitted) return;
    const next = recordPracticeAnswer(pattern.id, isCorrect);
    setStats(next);
    setSubmitted(true);
  };

  const next = () => {
    setPatternId(pickNextReview(candidateIds, stats, pattern.id));
    setChoice(null);
    setSubmitted(false);
  };

  return (
    <div className="page practice-page">
      <header className="compact-header practice-header">
        <span className="eyebrow">ADAPTIVE PATTERN RECOGNITION</span>
        <h1>Name the pattern before you code.</h1>
        <p>
          Reviews now prioritize due and weak patterns. New patterns enter the queue only after the
          patterns you have already learned, so practice reinforces recognition instead of becoming trivia.
        </p>
      </header>

      <section className="practice-scoreboard">
        <div><small>ATTEMPTS</small><strong>{stats.answered}</strong></div>
        <div><small>ACCURACY</small><strong>{accuracy}%</strong></div>
        <div><small>DUE NOW</small><strong>{dueNow}</strong></div>
        <div><small>REVIEW POOL</small><strong>{candidateIds.length}</strong></div>
      </section>

      <section className="practice-card">
        <div className="practice-card-top">
          <span className="micro-index">REVIEW {String(stats.answered + 1).padStart(2, '0')}</span>
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
              <em className="review-schedule">
                {reviewLabel(stats.byPattern[pattern.id]?.nextReviewAt)}
                {isCorrect ? ` · streak ${stats.byPattern[pattern.id]?.streak ?? 0}` : ' · streak reset'}
              </em>
            </div>

            <div className="practice-clues">
              <span className="eyebrow">CLUES THAT SHOULD TRIGGER THE PATTERN</span>
              <div>{pattern.signals.map((signal) => <b key={signal}>{signal}</b>)}</div>
            </div>

            <div className="practice-actions">
              <button className="secondary-action" onClick={() => props.openLesson(pattern.id)}>OPEN FULL LESSON</button>
              <button className="primary-button" onClick={next}>NEXT REVIEW →</button>
            </div>
          </>
        )}
      </section>

      {!props.completed.length && (
        <div className="practice-onboarding">
          <span className="eyebrow">FOUNDATION FALLBACK</span>
          <p>
            You have not marked a lesson complete yet, so the review pool is temporarily limited to the first six
            foundation patterns. Complete lessons to personalize this queue.
          </p>
        </div>
      )}
    </div>
  );
}
