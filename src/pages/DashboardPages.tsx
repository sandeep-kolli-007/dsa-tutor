import { useMemo, useState } from 'react';
import type React from 'react';
import { IonIcon } from '@ionic/react';
import { arrowForwardOutline, chevronForwardOutline, flashOutline, sparklesOutline } from 'ionicons/icons';

import { patterns } from '../data/patterns';
import { loadPracticeStats } from '../state/practice';
import { loadCodingStats } from '../state/coding';
import { codeProblemsByPattern } from '../data/codeProblems';
import type { PatternId } from '../types/lesson';
import { PatternCard } from '../components/PatternCard';

export function Home(props: { completed: PatternId[]; openLesson: (id: PatternId) => void; goLearn: () => void }) {
  const pct = Math.round((props.completed.length / patterns.length) * 100);
  const nextPattern = patterns.find((pattern) => !props.completed.includes(pattern.id)) ?? patterns[0];

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
          <button className="primary-button" onClick={() => props.openLesson(nextPattern.id)}>
            {props.completed.length ? 'CONTINUE' : 'START'} · {nextPattern.title.toUpperCase()} <IonIcon icon={arrowForwardOutline} />
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
          {patterns.slice(0, 6).map((pattern) => (
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

export function Learn(props: { completed: PatternId[]; openLesson: (id: PatternId) => void }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');

  const categories = useMemo(
    () => ['ALL', ...Array.from(new Set(patterns.map((pattern) => pattern.category))).sort()],
    []
  );

  const visiblePatterns = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return patterns.filter((pattern) => {
      const categoryMatch = category === 'ALL' || pattern.category === category;
      if (!categoryMatch) return false;
      if (!normalized) return true;
      return [
        pattern.title,
        pattern.subtitle,
        pattern.category,
        pattern.summary,
        pattern.invariant,
        ...pattern.signals,
      ].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [query, category]);

  return (
    <div className="page">
      <header className="compact-header">
        <span className="eyebrow">PATTERN LIBRARY</span>
        <h1>Learn recognition, not chapters.</h1>
        <p>Search by a pattern name, a clue from a problem statement, or the mental model you want to practice.</p>
      </header>

      <section className="library-toolbar">
        <label className="pattern-search">
          <span>SEARCH THE 65-PATTERN CURRICULUM</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: contiguous, top k, prerequisite, palindrome..."
          />
        </label>
        <div className="library-count"><strong>{visiblePatterns.length}</strong><span>VISIBLE</span></div>
      </section>

      <div className="category-scroller">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? 'active' : ''}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="track-line"><span>{category === 'ALL' ? 'ALL PATTERNS' : category}</span><i /></div>

      {visiblePatterns.length > 0 ? (
        <div className="pattern-grid">
          {visiblePatterns.map((pattern) => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              complete={props.completed.includes(pattern.id)}
              onClick={() => props.openLesson(pattern.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-library">
          <span className="eyebrow">NO MATCH</span>
          <strong>Try a broader clue.</strong>
          <p>Search works across titles, summaries, invariants, categories and recognition signals.</p>
        </div>
      )}

      <div className="coming-grid">
        <div className="curriculum-complete">
          <span className="eyebrow">STANDARD INTERVIEW CURRICULUM COMPLETE</span>
          <strong>65 visual patterns</strong>
          <p>Foundations, sorting, arrays, linked structures, trees, graphs, strings, range structures, greedy, backtracking, dynamic programming, subset methods and advanced search are all covered.</p>
        </div>
      </div>
    </div>
  );
}

export function Progress(props: { completed: PatternId[]; openLesson: (id: PatternId) => void }) {
  const practice = useMemo(() => loadPracticeStats(), []);
  const coding = useMemo(() => loadCodingStats(), []);

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
          const recognition = practice.byPattern[pattern.id];
          const recognitionPct = recognition?.answered
            ? Math.round((recognition.correct / recognition.answered) * 100)
            : null;
          const codingProblem = codeProblemsByPattern.get(pattern.id);
          const implementationSolved = codingProblem
            ? Boolean(coding.byProblem[codingProblem.id]?.solved)
            : null;
          const masteryReady = done && (recognitionPct === null || recognitionPct >= 70) && (implementationSolved !== false);
          return (
            <button className="progress-row" key={pattern.id} onClick={() => props.openLesson(pattern.id)}>
              <span className={'status-dot ' + (done ? 'done' : '')} />
              <div>
                <strong>{pattern.title}</strong>
                <small>{pattern.invariant}</small>
                <div className="mastery-evidence">
                  {recognitionPct !== null && <em className="recognition-stat">Recognition {recognitionPct}% · {recognition?.answered} attempts</em>}
                  {implementationSolved !== null && <em className={'implementation-stat ' + (implementationSolved ? 'done' : '')}>Implementation {implementationSolved ? 'solved ✓' : 'pending'}</em>}
                </div>
              </div>
              <span className={'mastery-tag ' + (masteryReady ? 'done' : '')}>{masteryReady ? 'MASTERED' : done ? 'LESSON DONE' : 'LEARNING'}</span>
              <IonIcon icon={chevronForwardOutline} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
