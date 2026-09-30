import { useEffect, useMemo, useState } from 'react';
import { IonIcon } from '@ionic/react';
import {
  bulbOutline,
  checkmarkCircleOutline,
  codeSlashOutline,
  playOutline,
  refreshOutline,
} from 'ionicons/icons';

import { codeProblems } from '../data/codeProblems';
import { runCodeProblem } from '../engine/codeRunner';
import { loadCodingStats, recordCodingAttempt } from '../state/coding';
import type { CodeProblem, CodeRunSummary } from '../types/code';
import type { PatternId } from '../types/lesson';

const draftKey = (problemId: string) => `dsa-tutor-code-draft-${problemId}`;

function loadDraft(problem: CodeProblem) {
  return localStorage.getItem(draftKey(problem.id)) ?? problem.starterCode;
}

export function CodePractice(props: {
  openLesson: (id: PatternId) => void;
  initialProblemId?: string;
  selectProblem: (id: string) => void;
}) {
  const [localSelectedId, setLocalSelectedId] = useState(codeProblems[0].id);
  const selectedId = props.initialProblemId ?? localSelectedId;
  const selected = useMemo(
    () => codeProblems.find((problem) => problem.id === selectedId) ?? codeProblems[0],
    [selectedId]
  );
  const [code, setCode] = useState(() => loadDraft(selected));
  const [result, setResult] = useState<CodeRunSummary | null>(null);
  const [running, setRunning] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [stats, setStats] = useState(loadCodingStats);
  const [difficulty, setDifficulty] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL');

  const visibleProblems = useMemo(
    () => codeProblems.filter((problem) => difficulty === 'ALL' || problem.difficulty === difficulty),
    [difficulty]
  );

  useEffect(() => {
    setCode(loadDraft(selected));
    setResult(null);
    setHintCount(0);
    setShowSolution(false);
  }, [selected.id]);

  const updateCode = (value: string) => {
    setCode(value);
    localStorage.setItem(draftKey(selected.id), value);
  };

  const resetCode = () => {
    localStorage.removeItem(draftKey(selected.id));
    setCode(selected.starterCode);
    setResult(null);
  };

  const run = async () => {
    if (running) return;
    setRunning(true);
    setResult(null);

    const summary = await runCodeProblem(selected, code);
    setResult(summary);
    setRunning(false);

    const solved = summary.passed === summary.total;
    setStats(recordCodingAttempt(selected.id, solved));
  };

  const solved = Boolean(stats.byProblem[selected.id]?.solved);
  const solvedCount = stats.solved.length;

  return (
    <div className="page code-practice-page">
      <header className="compact-header coding-header">
        <span className="eyebrow">IMPLEMENTATION LAB</span>
        <h1>Understand it. Then prove it in code.</h1>
        <p>
          Each problem is mapped back to the pattern mental model. Run JavaScript locally in a
          timeout-protected worker and use failing tests to locate the broken invariant.
        </p>
      </header>

      <section className="coding-summary">
        <div><small>PROBLEMS</small><strong>{codeProblems.length}</strong></div>
        <div><small>SOLVED</small><strong>{solvedCount}</strong></div>
        <div><small>ATTEMPTS</small><strong>{stats.attempts}</strong></div>
        <div><small>LANGUAGE</small><strong>JS</strong></div>
      </section>

      <div className="coding-layout">
        <aside className="problem-bank">
          <div className="problem-bank-head">
            <div>
              <span className="eyebrow">PROBLEM BANK</span>
              <strong>{visibleProblems.length} challenges</strong>
            </div>
            <div className="difficulty-filter">
              {(['ALL','EASY','MEDIUM','HARD'] as const).map((item) => (
                <button
                  key={item}
                  className={difficulty === item ? 'active' : ''}
                  onClick={() => setDifficulty(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="problem-list">
            {visibleProblems.map((problem, index) => {
              const problemStats = stats.byProblem[problem.id];
              return (
                <button
                  key={problem.id}
                  className={'problem-list-item ' + (problem.id === selected.id ? 'active ' : '') + (problemStats?.solved ? 'solved' : '')}
                  onClick={() => {
                    setLocalSelectedId(problem.id);
                    props.selectProblem(problem.id);
                  }}
                >
                  <span className="problem-number">{String(index + 1).padStart(2,'0')}</span>
                  <span className="problem-list-copy">
                    <strong>{problem.title}</strong>
                    <small>{problem.difficulty} · {problem.signature}</small>
                  </span>
                  <span className="problem-status">{problemStats?.solved ? '✓' : problemStats?.attempts ? problemStats.attempts : '—'}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="coding-workspace">
          <section className="coding-problem-card">
            <div className="coding-title-row">
              <div>
                <span className="eyebrow">{selected.patternId.toUpperCase().replaceAll('-', ' ')} · {selected.difficulty}</span>
                <h2>{selected.title}</h2>
              </div>
              <span className={'coding-solved-chip ' + (solved ? 'solved' : '')}>
                {solved ? 'SOLVED ✓' : 'UNSOLVED'}
              </span>
            </div>

            <p className="coding-prompt">{selected.prompt}</p>

            <div className="why-pattern">
              <span>WHY THIS PATTERN?</span>
              <p>{selected.whyPattern}</p>
              <button onClick={() => props.openLesson(selected.patternId)}>OPEN VISUAL LESSON →</button>
            </div>

            <div className="coding-meta-grid">
              <div>
                <span className="micro-label">SIGNATURE</span>
                <code>{selected.signature}</code>
              </div>
              <div>
                <span className="micro-label">EXAMPLE</span>
                <code>{selected.examples[0].input} → {selected.examples[0].output}</code>
              </div>
            </div>

            <div className="constraints-box">
              <span className="micro-label">CONSTRAINTS / TARGET</span>
              {selected.constraints.map((constraint) => <p key={constraint}>· {constraint}</p>)}
            </div>
          </section>

          <section className="editor-card">
            <div className="editor-toolbar">
              <div className="editor-file">
                <IonIcon icon={codeSlashOutline} />
                <span>solution.js</span>
              </div>
              <div className="editor-actions">
                <button onClick={resetCode}><IonIcon icon={refreshOutline} /> RESET</button>
                <button
                  onClick={() => setHintCount((current) => Math.min(selected.hints.length, current + 1))}
                  disabled={hintCount >= selected.hints.length}
                >
                  <IonIcon icon={bulbOutline} /> HINT
                </button>
                <button className="run-code-button" onClick={run} disabled={running}>
                  <IonIcon icon={playOutline} /> {running ? 'RUNNING…' : 'RUN TESTS'}
                </button>
              </div>
            </div>

            <div className="code-editor-shell">
              <div className="code-line-numbers" aria-hidden="true">
                {code.split('\n').map((_, index) => <span key={index}>{index + 1}</span>)}
              </div>
              <textarea
                className="code-textarea"
                value={code}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                onChange={(event) => updateCode(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Tab') {
                    event.preventDefault();
                    const target = event.currentTarget;
                    const start = target.selectionStart;
                    const end = target.selectionEnd;
                    const next = code.slice(0, start) + '  ' + code.slice(end);
                    updateCode(next);
                    requestAnimationFrame(() => {
                      target.selectionStart = target.selectionEnd = start + 2;
                    });
                  }
                }}
              />
            </div>

            {hintCount > 0 && (
              <div className="hint-stack">
                {selected.hints.slice(0, hintCount).map((hint, index) => (
                  <div key={hint}><span>HINT {index + 1}</span><p>{hint}</p></div>
                ))}
              </div>
            )}
          </section>

          <section className="test-card">
            <div className="test-card-head">
              <div>
                <span className="eyebrow">TEST RUNNER</span>
                <h3>{result ? `${result.passed} / ${result.total} passing` : 'Run your implementation against the cases.'}</h3>
              </div>
              {result && (
                <span className={'test-summary-chip ' + (result.passed === result.total ? 'passed' : 'failed')}>
                  {result.passed === result.total ? 'ALL TESTS PASS ✓' : 'KEEP DEBUGGING'}
                </span>
              )}
            </div>

            <div className="test-list">
              {selected.tests.map((test, index) => {
                const testResult = result?.results[index];
                return (
                  <div className={'test-row ' + (testResult ? (testResult.passed ? 'passed' : 'failed') : '')} key={test.name}>
                    <span className="test-icon">
                      {testResult ? <IonIcon icon={testResult.passed ? checkmarkCircleOutline : codeSlashOutline} /> : '○'}
                    </span>
                    <div>
                      <strong>{test.hidden ? `Hidden test ${index + 1}` : test.name}</strong>
                      <small>
                        {testResult
                          ? testResult.error
                            ? testResult.error
                            : test.hidden
                              ? (testResult.passed ? 'Hidden case passed.' : 'Hidden case failed.')
                              : `expected ${JSON.stringify(testResult.expected)} · got ${JSON.stringify(testResult.actual)}`
                          : test.hidden
                            ? 'Input hidden until evaluated.'
                            : `args ${JSON.stringify(test.args)}`}
                      </small>
                    </div>
                    {testResult?.durationMs !== undefined && <em>{testResult.durationMs.toFixed(2)} ms</em>}
                  </div>
                );
              })}
            </div>

            {result?.timedOut && (
              <div className="timeout-warning">
                Execution was stopped after the time limit. Check for an infinite loop or unexpectedly expensive implementation.
              </div>
            )}
          </section>

          <section className="solution-reveal">
            {!showSolution ? (
              <button onClick={() => setShowSolution(true)}>I'M STUCK — SHOW REFERENCE SOLUTION</button>
            ) : (
              <>
                <div className="solution-warning">
                  <span>REFERENCE SOLUTION</span>
                  <p>Read the invariant before copying the syntax. Then reset and implement it again without looking.</p>
                </div>
                <pre><code>{selected.solutionCode}</code></pre>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
