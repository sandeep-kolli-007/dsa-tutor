import type React from 'react';
import { IonIcon } from '@ionic/react';
import { arrowForwardOutline, chevronForwardOutline, flashOutline, sparklesOutline } from 'ionicons/icons';

import { patterns } from '../data/patterns';
import type { PatternId } from '../types/lesson';
import { PatternCard } from '../components/PatternCard';

export function Home(props: { completed: PatternId[]; openLesson: (id: PatternId) => void; goLearn: () => void }) {
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

export function Learn(props: { completed: PatternId[]; openLesson: (id: PatternId) => void }) {
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
