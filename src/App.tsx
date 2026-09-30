import { useEffect, useMemo, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRange,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import {
  arrowBackOutline,
  arrowForwardOutline,
  barChartOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  codeSlashOutline,
  flashOutline,
  homeOutline,
  pauseOutline,
  playOutline,
  refreshOutline,
  schoolOutline,
  sparklesOutline,
} from 'ionicons/icons';

type Page = 'home' | 'learn' | 'progress' | 'lesson';
type PatternId = 'sliding-window' | 'two-pointers' | 'binary-search';

type Frame = {
  title: string;
  explanation: string;
  values: number[];
  left?: number;
  right?: number;
  mid?: number;
  windowStart?: number;
  windowEnd?: number;
  active?: number[];
  dimmed?: number[];
  outgoing?: number;
  incoming?: number;
  metric?: string;
  codeLine: number;
};

type Pattern = {
  id: PatternId;
  no: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  analogyTitle: string;
  analogyBody: string;
  mapping: [string, string][];
  invariant: string;
  signals: string[];
  avoid: string[];
  complexity: { time: string; space: string };
  frames: Frame[];
  code: string[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
};

const patterns: Pattern[] = [
  {
    id: 'sliding-window',
    no: '01',
    title: 'Sliding Window',
    subtitle: 'Move a reusable window instead of recalculating everything.',
    category: 'ARRAY PATTERN',
    summary: 'Use a moving contiguous range when neighboring answers share most of the same data.',
    analogyTitle: 'Find the busiest 3-hour period in a store',
    analogyBody:
      'A manager has hourly customer counts and wants the busiest continuous 3-hour block. When the block moves by one hour, two of the three hours are still the same. Reuse them instead of adding all three again.',
    mapping: [
      ['Hourly customer counts', 'Array'],
      ['Three-hour block', 'Fixed window'],
      ['Hour leaving the block', 'Outgoing element'],
      ['Next hour entering', 'Incoming element'],
    ],
    invariant: 'The current sum always represents exactly the elements inside the current window.',
    signals: [
      'Subarray or substring',
      'Contiguous range',
      'Longest / shortest / max / min',
      'Fixed K or a grow-shrink condition',
    ],
    avoid: [
      'Elements can be chosen from anywhere',
      'The property cannot be updated when the window changes',
      'The problem is really about subsets, not contiguous ranges',
    ],
    complexity: { time: 'O(n)', space: 'O(1)' },
    frames: [
      {
        title: 'Start with the first 3 hours',
        explanation: 'We pay the full cost once: 4 + 7 + 3 = 14.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 0,
        windowEnd: 2,
        active: [0, 1, 2],
        metric: 'SUM = 14',
        codeLine: 1,
      },
      {
        title: 'Move the window by one',
        explanation: 'The value 4 leaves. The value 9 enters. Values 7 and 3 stay.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 1,
        windowEnd: 3,
        active: [1, 2, 3],
        outgoing: 0,
        incoming: 3,
        metric: '14 - 4 + 9',
        codeLine: 3,
      },
      {
        title: 'Reuse the previous result',
        explanation: 'New sum = old sum - outgoing + incoming = 19.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 1,
        windowEnd: 3,
        active: [1, 2, 3],
        dimmed: [0],
        metric: 'SUM = 19',
        codeLine: 4,
      },
      {
        title: 'Slide again',
        explanation: 'Remove 7, add 6. The window now covers 3, 9, 6.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 2,
        windowEnd: 4,
        active: [2, 3, 4],
        outgoing: 1,
        incoming: 4,
        dimmed: [0, 1],
        metric: '19 - 7 + 6 = 18',
        codeLine: 4,
      },
      {
        title: 'One pass is enough',
        explanation: 'Every element enters once and leaves once. That is why the work is linear.',
        values: [4, 7, 3, 9, 6, 8],
        windowStart: 3,
        windowEnd: 5,
        active: [3, 4, 5],
        dimmed: [0, 1, 2],
        metric: 'MAX = 23',
        codeLine: 6,
      },
    ],
    code: [
      'function maxWindowSum(nums, k) {',
      '  let sum = nums.slice(0, k).reduce((a, b) => a + b, 0);',
      '  let best = sum;',
      '  for (let right = k; right < nums.length; right++) {',
      '    sum += nums[right] - nums[right - k];',
      '    best = Math.max(best, sum);',
      '  }',
      '  return best;',
      '}',
    ],
    quiz: {
      question: 'Find the maximum sum of any 4 consecutive values in an array. Which pattern should enter your mind first?',
      options: ['DFS', 'Sliding Window', 'Heap', 'Union Find'],
      correct: 1,
      explanation: 'The values must be consecutive and neighboring windows overlap heavily, which is the classic fixed-size sliding-window signal.',
    },
  },
  {
    id: 'two-pointers',
    no: '02',
    title: 'Two Pointers',
    subtitle: 'Use two moving boundaries to eliminate impossible choices.',
    category: 'ARRAY PATTERN',
    summary: 'When movement from the left or right gives useful information, two coordinated pointers can collapse a search space.',
    analogyTitle: 'Two people search a sorted shelf from opposite ends',
    analogyBody:
      'You want two book prices that add to ₹1,000. One person starts at the cheapest end, the other at the most expensive end. If the sum is too small, only the cheaper side should move. If too large, only the expensive side should move.',
    mapping: [
      ['Cheapest end', 'Left pointer'],
      ['Costliest end', 'Right pointer'],
      ['Target budget', 'Target sum'],
      ['Move one person', 'Eliminate impossible pairs'],
    ],
    invariant: 'Every pair outside the current left-right range has already been ruled out.',
    signals: [
      'Sorted array or sortable input',
      'Pairs or triplets',
      'Opposite-end comparison',
      'Need to shrink a search space',
    ],
    avoid: [
      'No ordering information exists',
      'Moving a pointer does not eliminate possibilities',
      'You need arbitrary combinations',
    ],
    complexity: { time: 'O(n)', space: 'O(1)' },
    frames: [
      {
        title: 'Start at both ends',
        explanation: '2 + 18 = 20. Our target is 15, so the sum is too large.',
        values: [2, 4, 7, 11, 18],
        left: 0,
        right: 4,
        active: [0, 4],
        metric: '20 > 15',
        codeLine: 2,
      },
      {
        title: 'Move only the right pointer',
        explanation: 'Because the array is sorted, moving left would only make the sum larger. Move right inward.',
        values: [2, 4, 7, 11, 18],
        left: 0,
        right: 3,
        active: [0, 3],
        dimmed: [4],
        metric: '2 + 11 = 13',
        codeLine: 5,
      },
      {
        title: 'Now the sum is too small',
        explanation: '13 < 15, so increase the sum by moving the left pointer right.',
        values: [2, 4, 7, 11, 18],
        left: 1,
        right: 3,
        active: [1, 3],
        dimmed: [0, 4],
        metric: '4 + 11 = 15',
        codeLine: 4,
      },
      {
        title: 'Target found',
        explanation: 'The pointers meet the condition without checking every possible pair.',
        values: [2, 4, 7, 11, 18],
        left: 1,
        right: 3,
        active: [1, 3],
        dimmed: [0, 2, 4],
        metric: 'FOUND ✓',
        codeLine: 3,
      },
    ],
    code: [
      'function twoSumSorted(nums, target) {',
      '  let left = 0, right = nums.length - 1;',
      '  while (left < right) {',
      '    const sum = nums[left] + nums[right];',
      '    if (sum === target) return [left, right];',
      '    if (sum < target) left++;',
      '    else right--;',
      '  }',
      '  return null;',
      '}',
    ],
    quiz: {
      question: 'You have a sorted array and need a pair whose sum equals a target. What is the strongest first pattern?',
      options: ['Two Pointers', 'Prefix Sum', 'BFS', 'Backtracking'],
      correct: 0,
      explanation: 'Sorted order tells you which pointer movement can safely eliminate many impossible pairs.',
    },
  },
  {
    id: 'binary-search',
    no: '03',
    title: 'Binary Search',
    subtitle: 'Cut a valid search space in half after every decision.',
    category: 'SEARCH PATTERN',
    summary: 'Binary search is not only “search a sorted array.” It is a disciplined way to maintain and halve a valid answer range.',
    analogyTitle: 'Guess a number with higher/lower feedback',
    analogyBody:
      'Someone thinks of a number between 1 and 100. Instead of guessing 1, 2, 3... you guess the middle. “Higher” removes the entire lower half. “Lower” removes the entire upper half.',
    mapping: [
      ['Possible numbers', 'Search space'],
      ['Middle guess', 'mid'],
      ['Higher / lower feedback', 'Monotonic decision'],
      ['Discard half', 'Move a boundary'],
    ],
    invariant: 'If the target exists, it always remains inside the current [left, right] search space.',
    signals: [
      'Sorted or monotonic behavior',
      'Can answer “too small / too large”',
      'Search space can be halved safely',
      'Minimum feasible / maximum feasible answer',
    ],
    avoid: [
      'No monotonic relationship exists',
      'Discarding half could lose a valid answer',
      'Input is tiny and linear search is clearer',
    ],
    complexity: { time: 'O(log n)', space: 'O(1)' },
    frames: [
      {
        title: 'Define the search space',
        explanation: 'Target is 25. Start with every index still possible.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 0,
        right: 6,
        mid: 3,
        active: [3],
        metric: 'MID = 11',
        codeLine: 2,
      },
      {
        title: 'Compare the middle',
        explanation: '11 < 25, so the target cannot be at index 3 or anywhere to its left.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 0,
        right: 6,
        mid: 3,
        active: [3],
        metric: '11 < 25',
        codeLine: 4,
      },
      {
        title: 'Discard half',
        explanation: 'Move left to mid + 1. The target must still be inside the remaining range.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 4,
        right: 6,
        mid: 5,
        active: [5],
        dimmed: [0, 1, 2, 3],
        metric: 'SEARCH [4..6]',
        codeLine: 5,
      },
      {
        title: 'Check the new middle',
        explanation: 'The middle value is now 25.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 4,
        right: 6,
        mid: 5,
        active: [5],
        dimmed: [0, 1, 2, 3],
        metric: '25 = TARGET',
        codeLine: 3,
      },
      {
        title: 'Found',
        explanation: 'Each comparison removed about half of the remaining possibilities.',
        values: [2, 4, 7, 11, 18, 25, 31],
        left: 4,
        right: 6,
        mid: 5,
        active: [5],
        dimmed: [0, 1, 2, 3],
        metric: 'INDEX 5 ✓',
        codeLine: 3,
      },
    ],
    code: [
      'function binarySearch(nums, target) {',
      '  let left = 0, right = nums.length - 1;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    if (nums[mid] === target) return mid;',
      '    if (nums[mid] < target) left = mid + 1;',
      '    else right = mid - 1;',
      '  }',
      '  return -1;',
      '}',
    ],
    quiz: {
      question: 'You need the minimum capacity that can ship all packages within D days. Feasibility changes monotonically as capacity increases. What pattern applies?',
      options: ['Sliding Window', 'Binary Search on Answer', 'DFS', 'Monotonic Stack'],
      correct: 1,
      explanation: 'The answer space is monotonic: once a capacity is feasible, every larger capacity is also feasible.',
    },
  },
];

const storageKey = 'dsa-tutor-progress-v1';

function loadProgress(): PatternId[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedId, setSelectedId] = useState<PatternId>('sliding-window');
  const [completed, setCompleted] = useState<PatternId[]>(loadProgress);

  const selected = useMemo(
    () => patterns.find((pattern) => pattern.id === selectedId) || patterns[0],
    [selectedId]
  );

  const openLesson = (id: PatternId) => {
    setSelectedId(id);
    setPage('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markComplete = (id: PatternId) => {
    const next = completed.includes(id) ? completed : [...completed, id];
    setCompleted(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="app-content">
        <div className="app-shell">
          <aside className="side-rail">
            <button className="brand" onClick={() => setPage('home')}>
              <span className="brand-mark">&lt;/&gt;</span>
              <span><strong>DSA TUTOR</strong><small>PATTERN LAB</small></span>
            </button>

            <nav>
              <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => setPage('home')} />
              <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Learn" onClick={() => setPage('learn')} />
              <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => setPage('progress')} />
            </nav>

            <div className="rail-note">
              <span className="micro-label">TEACHING RULE</span>
              <p>Real life → intuition → invariant → code → recognition.</p>
            </div>
          </aside>

          <main className="main-stage">
            {page === 'home' && <Home completed={completed} openLesson={openLesson} goLearn={() => setPage('learn')} />}
            {page === 'learn' && <Learn completed={completed} openLesson={openLesson} />}
            {page === 'progress' && <Progress completed={completed} openLesson={openLesson} />}
            {page === 'lesson' && (
              <Lesson
                pattern={selected}
                isComplete={completed.includes(selected.id)}
                onBack={() => setPage('learn')}
                onComplete={() => markComplete(selected.id)}
              />
            )}
          </main>

          <div className="bottom-nav">
            <NavButton active={page === 'home'} icon={homeOutline} label="Home" onClick={() => setPage('home')} />
            <NavButton active={page === 'learn' || page === 'lesson'} icon={schoolOutline} label="Learn" onClick={() => setPage('learn')} />
            <NavButton active={page === 'progress'} icon={barChartOutline} label="Progress" onClick={() => setPage('progress')} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

function NavButton(props: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return (
    <button className={'nav-button ' + (props.active ? 'active' : '')} onClick={props.onClick}>
      <IonIcon icon={props.icon} />
      <span>{props.label}</span>
    </button>
  );
}

function Home(props: { completed: PatternId[]; openLesson: (id: PatternId) => void; goLearn: () => void }) {
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

function Learn(props: { completed: PatternId[]; openLesson: (id: PatternId) => void }) {
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
        {['Prefix Sum', 'Fast & Slow', 'Monotonic Stack', 'Merge Intervals', 'BFS / DFS', 'Heap / Top-K', 'Backtracking', 'Dynamic Programming'].map((name, index) => (
          <div className="coming-card" key={name}><span>{String(index + 4).padStart(2, '0')}</span><strong>{name}</strong><small>COMING NEXT</small></div>
        ))}
      </div>
    </div>
  );
}

function Progress(props: { completed: PatternId[]; openLesson: (id: PatternId) => void }) {
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

function PatternCard(props: { pattern: Pattern; complete: boolean; onClick: () => void }) {
  return (
    <button className="pattern-card" onClick={props.onClick}>
      <div className="pattern-card-top">
        <span className="micro-index">{props.pattern.no}</span>
        <span className={'status-chip ' + (props.complete ? 'complete' : '')}>{props.complete ? 'MASTERED' : 'LEARN'}</span>
      </div>
      <MiniVisual id={props.pattern.id} />
      <span className="eyebrow">{props.pattern.category}</span>
      <h3>{props.pattern.title}</h3>
      <p>{props.pattern.subtitle}</p>
      <div className="pattern-meta"><span>{props.pattern.complexity.time}</span><span>{props.pattern.frames.length} VISUAL STEPS</span></div>
    </button>
  );
}

function MiniVisual({ id }: { id: PatternId }) {
  if (id === 'sliding-window') {
    return <div className="mini-visual"><i /><i className="hot" /><i className="hot" /><i className="hot" /><i /></div>;
  }
  if (id === 'two-pointers') {
    return <div className="mini-visual pointers"><b>L</b><i /><i /><i /><i /><i /><b>R</b></div>;
  }
  return <div className="mini-visual binary"><i className="dim" /><i className="dim" /><i /><i className="found" /><i /></div>;
}

function Lesson(props: { pattern: Pattern; isComplete: boolean; onBack: () => void; onComplete: () => void }) {
  const { pattern } = props;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
    setChoice(null);
    setSubmitted(false);
  }, [pattern.id]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= pattern.frames.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1300 / speed);
    return () => window.clearInterval(timer);
  }, [playing, speed, pattern.frames.length]);

  const frame = pattern.frames[index];
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
                <button onClick={() => setIndex(Math.min(pattern.frames.length - 1, index + 1))}><IonIcon icon={chevronForwardOutline} /></button>
              </div>
              <IonRange
                min={0}
                max={pattern.frames.length - 1}
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

function LessonCard(props: { number: string; eyebrow: string; title: string; children: React.ReactNode; interactive?: boolean }) {
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

function Visualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <div className="visual-stage">
      <div className="visual-topline">
        <span>{pattern.id.replace('-', ' ').toUpperCase()}</span>
        <strong>{frame.metric}</strong>
      </div>

      <div className="array-row">
        {frame.values.map((value, index) => {
          const active = frame.active?.includes(index);
          const dimmed = frame.dimmed?.includes(index);
          const outgoing = frame.outgoing === index;
          const incoming = frame.incoming === index;
          return (
            <div className="cell-wrap" key={index}>
              <div className="pointer-slot">
                {frame.left === index && <span className="pointer cyan">LEFT</span>}
                {frame.mid === index && <span className="pointer orange">MID</span>}
                {frame.right === index && <span className="pointer green">RIGHT</span>}
              </div>
              <div className={'array-cell ' + (active ? 'active ' : '') + (dimmed ? 'dimmed ' : '') + (outgoing ? 'outgoing ' : '') + (incoming ? 'incoming' : '')}>
                {value}
              </div>
              <span className="index-label">{index}</span>
            </div>
          );
        })}
      </div>

      {frame.windowStart !== undefined && frame.windowEnd !== undefined && (
        <div className="window-readout">
          <span>WINDOW</span>
          <strong>[{frame.windowStart}..{frame.windowEnd}]</strong>
          {frame.outgoing !== undefined && <em className="out">− {frame.values[frame.outgoing]}</em>}
          {frame.incoming !== undefined && <em className="in">+ {frame.values[frame.incoming]}</em>}
        </div>
      )}
    </div>
  );
}

export default App;
