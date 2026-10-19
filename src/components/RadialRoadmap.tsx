import { useMemo, useState } from 'react';

type Topic = { name: string; status: 'done' | 'current' | 'available' | 'locked'; difficulty?: string; pattern?: string };
type Module = { name: string; short: string; color: string; topics: Topic[] };

const modules: Module[] = [
  { name: 'Learn the Basics', short: 'BASICS', color: '#6b8cff', topics: ['Things to Know in Java', 'Build-up Logical Thinking', 'Patterns', 'STL', 'Basic Maths', 'Basic Recursion', 'Basic Hashing'].map((name, i) => ({ name, status: i < 3 ? 'done' : i === 3 ? 'current' : 'available' })) },
  { name: 'Sorting Techniques', short: 'SORTING', color: '#8a7cff', topics: ['Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'].map((name, i) => ({ name, status: i < 2 ? 'done' : i === 2 ? 'current' : 'available' })) },
  { name: 'Arrays', short: 'ARRAYS', color: '#4c83ff', topics: [{ name: 'Introduction to Arrays', status: 'done' }, { name: 'Traversal', status: 'done' }, { name: 'Two Sum', status: 'current', difficulty: 'Easy', pattern: 'Hashing' }, { name: 'Best Time to Buy and Sell Stock', status: 'available', difficulty: 'Easy', pattern: 'Greedy' }, { name: "Kadane’s Algorithm", status: 'available', difficulty: 'Medium', pattern: 'Dynamic Programming' }, { name: 'Majority Element', status: 'available', difficulty: 'Easy', pattern: 'Moore’s Voting' }, { name: 'Product of Array Except Self', status: 'locked', difficulty: 'Medium', pattern: 'Prefix / Suffix' }, { name: 'Maximum Subarray', status: 'locked', difficulty: 'Medium', pattern: 'Dynamic Programming' }] },
  { name: 'Binary Search', short: 'BINARY SEARCH', color: '#7c79ff', topics: ['Binary Search', 'Lower Bound', 'Upper Bound', 'Search in Rotated Array', 'Median of Two Sorted Arrays'].map((name, i) => ({ name, status: i === 0 ? 'done' : i === 1 ? 'current' : 'available' })) },
  { name: 'Strings', short: 'STRINGS', color: '#e879a9', topics: ['Basic String Problems', 'Reverse Words', 'Longest Palindrome', 'Anagram Check'].map((name, i) => ({ name, status: i === 0 ? 'done' : 'available' })) },
  { name: 'Linked Lists', short: 'LINKED LIST', color: '#39c6b2', topics: ['Introduction to Linked List', 'Insert and Delete', 'Reverse Linked List', 'Detect a Cycle', 'Find Middle Node'].map((name, i) => ({ name, status: i === 0 ? 'done' : i === 1 ? 'current' : 'available' })) },
  { name: 'Recursion', short: 'RECURSION', color: '#d1a7ff', topics: ['Introduction to Recursion', 'Subsequences', 'Backtracking', 'Permutations'].map((name, i) => ({ name, status: i === 0 ? 'done' : 'available' })) },
  { name: 'Bit Manipulation', short: 'BIT MANIPULATION', color: '#72c8ff', topics: ['Bit Basics', 'Check a Bit', 'XOR Patterns', 'Power Set'].map((name, i) => ({ name, status: i === 0 ? 'done' : 'available' })) },
  { name: 'Stacks & Queues', short: 'STACKS', color: '#ffad72', topics: ['Stack Basics', 'Queue Basics', 'Monotonic Stack', 'Next Greater Element'].map((name, i) => ({ name, status: i === 0 ? 'done' : 'available' })) },
  { name: 'Greedy Algorithms', short: 'GREEDY', color: '#e4cc64', topics: ['Greedy Fundamentals', 'Activity Selection', 'Minimum Platforms'].map((name, i) => ({ name, status: i === 0 ? 'done' : 'available' })) },
  { name: 'Binary Trees', short: 'TREES', color: '#7ed9a4', topics: ['Tree Traversals', 'Height of Tree', 'Diameter of Tree', 'Lowest Common Ancestor'].map((name, i) => ({ name, status: i === 0 ? 'done' : 'available' })) },
  { name: 'Graphs', short: 'GRAPHS', color: '#7ab5ff', topics: ['Graph Representation', 'BFS', 'DFS', 'Shortest Paths'].map((name, i) => ({ name, status: i === 0 ? 'done' : 'available' })) },
  { name: 'Dynamic Programming', short: 'DYNAMIC PROGRAMMING', color: '#f18e7b', topics: ['DP Introduction', 'Memoization', 'Tabulation', 'Knapsack'].map((name, i) => ({ name, status: i === 0 ? 'done' : 'available' })) },
  { name: 'Heaps', short: 'HEAPS', color: '#c5a5ff', topics: ['Heap Basics', 'Kth Largest', 'Merge K Sorted Lists'].map((name, i) => ({ name, status: 'available' })) },
  { name: 'Tries', short: 'TRIES', color: '#7ed9d0', topics: ['Trie Basics', 'Insert and Search', 'Prefix Search'].map((name, i) => ({ name, status: 'available' })) },
  { name: 'Greedy Advanced', short: 'GREEDY II', color: '#e4cc64', topics: ['Advanced Greedy Patterns', 'Scheduling'].map((name, i) => ({ name, status: 'available' })) },
  { name: 'Advanced Strings', short: 'STRINGS II', color: '#e879a9', topics: ['KMP', 'Z Algorithm', 'Rolling Hash'].map((name, i) => ({ name, status: 'available' })) },
  { name: 'Maths', short: 'MATHS', color: '#a6b2c4', topics: ['GCD', 'Sieve', 'Combinatorics'].map((name, i) => ({ name, status: 'available' })) },
  { name: 'Advanced Graphs', short: 'GRAPHS II', color: '#7ab5ff', topics: ['Disjoint Set Union', 'Minimum Spanning Tree', 'Strongly Connected Components'].map((name, i) => ({ name, status: 'available' })) },
  { name: 'Advanced DP', short: 'DP II', color: '#f18e7b', topics: ['DP on Grids', 'DP on Subsequences', 'DP on Stocks'].map((name, i) => ({ name, status: 'available' })) },
];

const statusText: Record<Topic['status'], string> = { done: 'Completed', current: 'In progress', available: 'Available', locked: 'Locked' };

export function RadialRoadmap({ onContinue }: { onContinue: () => void }) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState('');
  const allTopics = useMemo(() => modules.flatMap(m => m.topics), []);
  const completed = allTopics.filter(t => t.status === 'done').length;
  const total = 495;

  const polar = (cx: number, cy: number, r: number, a: number) => ({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  const radialNodes = modules.map((m, i) => {
    const angle = -Math.PI / 2 + (i / modules.length) * Math.PI * 2;
    const end = polar(250, 250, 190, angle);
    const nodes = m.topics.slice(0, 8).map((t, j, arr) => {
      const spread = Math.min(0.13, 0.42 / Math.max(arr.length, 1));
      const radius = 42 + j * (145 / Math.max(arr.length - 1, 1));
      return { ...polar(250, 250, radius, angle + (j - (arr.length - 1) / 2) * spread), topic: t, r: j === 0 ? 5 : 4 };
    });
    return { module: m, angle, end, nodes };
  });
  const visibleTopics = (selectedModule?.topics ?? []).filter(t => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="roadmap-page">
      <header className="roadmap-header">
        <div><div className="roadmap-kicker"><span className="roadmap-live-dot" /> STRIVER A2Z · INTERACTIVE LEARNING PATH</div><h1>DSA <span>Universe</span></h1><p>490+ topics. One connected path from fundamentals to advanced algorithms.</p></div>
        <div className="roadmap-total"><strong>{completed}<small> / {total}</small></strong><span>topics completed</span><div className="roadmap-progress"><i style={{ width: (completed / total * 100) + '%' }} /></div></div>
      </header>

      {!selectedModule ? (
        <div className="universe-layout">
          <div className="universe-card">
            <div className="universe-tools"><span>ROADMAP / ALL MODULES</span><div><button onClick={() => setZoom(z => Math.min(1.3, z + .1))} aria-label="Zoom in">＋</button><button onClick={() => setZoom(z => Math.max(.75, z - .1))} aria-label="Zoom out">−</button><button onClick={() => setZoom(1)}>Reset</button></div></div>
            <div className="radial-canvas">
              <svg viewBox="0 0 500 500" role="img" aria-label="Circular Striver DSA roadmap with 20 modules">
                <circle cx="250" cy="250" r="220" fill="none" stroke="#242b38" strokeWidth="1" />
                <circle cx="250" cy="250" r="170" fill="none" stroke="#202735" strokeWidth="1" strokeDasharray="2 6" />
                <g transform={`translate(250 250) scale(${zoom}) translate(-250 -250)`}>
                  {radialNodes.map(({ module, angle, nodes }) => {
                    const outer = polar(250, 250, 218, angle);
                    const label = polar(250, 250, 196, angle);
                    return <g key={module.name} onClick={() => { setSelectedModule(module); setSelectedTopic(module.topics.find(t => t.status === 'current') ?? module.topics[0]); setQuery(''); }} role="button" tabIndex={0} aria-label={module.name} className="radial-sector">
                      <line x1="250" y1="250" x2={outer.x} y2={outer.y} stroke="#222a37" strokeWidth="1" />
                      {nodes.map((n, j) => <g key={j}><line x1={250} y1={250} x2={n.x} y2={n.y} stroke={n.topic.status === 'done' ? '#245f51' : '#262e3b'} strokeWidth="1.5"/><circle cx={n.x} cy={n.y} r={n.topic.status === 'current' ? 7 : n.r} fill={n.topic.status === 'done' ? '#50d6a0' : n.topic.status === 'current' ? module.color : '#353d4b'} stroke={n.topic.status === 'current' ? '#dce8ff' : 'none'} strokeWidth="2" /></g>)}
                      <text x={label.x} y={label.y} fill={module.color} fontSize="10" fontWeight="800" letterSpacing="1.1" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${angle * 180 / Math.PI + 90} ${label.x} ${label.y})`}>{module.short}</text>
                    </g>;
                  })}
                  <circle cx="250" cy="250" r="27" fill="#101827" stroke="#416eff" strokeWidth="2" />
                  <circle cx="250" cy="250" r="17" fill="#315fff" opacity=".18" />
                  <text x="250" y="247" fill="#f4f7ff" fontSize="14" fontWeight="800" textAnchor="middle">{completed}</text>
                  <text x="250" y="260" fill="#a8b6cf" fontSize="7" textAnchor="middle">/ 495</text>
                </g>
              </svg>
            </div>
            <div className="universe-legend"><span><i className="legend-dot done"/> Completed</span><span><i className="legend-dot current"/> In progress</span><span><i className="legend-dot available"/> Available</span><span><i className="legend-dot locked"/> Locked</span></div>
          </div>
          <aside className="module-sidebar">
            <div className="module-sidebar-head"><div><span className="roadmap-kicker">EXPLORE</span><h2>Learning modules</h2></div><span className="module-count">20</span></div>
            <label className="roadmap-search">⌕ <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a module…" /></label>
            <div className="module-list">{modules.filter(m => m.name.toLowerCase().includes(query.toLowerCase())).map((m, i) => {
              const done = m.topics.filter(t => t.status === 'done').length;
              return <button className="module-row" key={m.name} onClick={() => { setSelectedModule(m); setSelectedTopic(m.topics.find(t => t.status === 'current') ?? m.topics[0]); setQuery(''); }}>
                <span className="module-index" style={{ color: m.color, borderColor: m.color + '66' }}>{String(i + 1).padStart(2, '0')}</span><span className="module-row-copy"><strong>{m.name}</strong><small>{m.topics.length} preview topics · {done} completed</small><span className="module-mini-progress"><i style={{ width: (done / m.topics.length * 100) + '%', background: m.color }}/></span></span><span className="module-chevron">↗</span>
              </button>;
            })}</div>
          </aside>
        </div>
      ) : (
        <div className="module-tree-layout">
          <div className="tree-main-card">
            <div className="tree-topbar"><button className="tree-back" onClick={() => { setSelectedModule(null); setSelectedTopic(null); setQuery(''); }}>← Roadmap</button><span className="tree-unlocked"><i style={{ background: selectedModule.color }} /> {selectedModule.topics.filter(t => t.status !== 'locked').length} / {selectedModule.topics.length} UNLOCKED</span></div>
            <div className="tree-title-row"><div><div className="roadmap-kicker">MODULE / SKILL TREE</div><h2>{selectedModule.name}</h2><p>Follow the branches. Select any node to inspect the topic.</p></div><div className="tree-module-badge" style={{ color: selectedModule.color, borderColor: selectedModule.color + '66' }}>{selectedModule.short}</div></div>
            <label className="roadmap-search tree-search">⌕ <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics in this module…" /></label>
            <div className="branch-tree">
              {visibleTopics.map((topic, i) => <div className={`branch-row ${selectedTopic?.name === topic.name ? 'selected' : ''} ${topic.status}`} key={topic.name} style={{ '--module-color': selectedModule.color } as React.CSSProperties}>
                <div className="branch-connector"><span className="branch-node-wrap"><button className="branch-node" onClick={() => setSelectedTopic(topic)} aria-label={topic.name} title={topic.name}>{topic.status === 'done' ? '✓' : topic.status === 'locked' ? '⌑' : topic.status === 'current' ? '●' : ''}</button></span></div>
                <button className="branch-topic" onClick={() => setSelectedTopic(topic)}><strong>{topic.name}</strong><small>{statusText[topic.status]}{topic.pattern ? ' · ' + topic.pattern : ''}</small></button>
                <span className="branch-topic-state">{topic.status === 'locked' ? '⌑' : topic.status === 'done' ? '✓' : '›'}</span>
              </div>)}
              {visibleTopics.length === 0 && <p className="roadmap-empty">No topics match “{query}”.</p>}
            </div>
            {selectedTopic && <div className="topic-sheet">
              <div className="sheet-grabber" /><div className="topic-sheet-top"><div><div className="roadmap-kicker">SELECTED TOPIC</div><h3>{selectedTopic.name}</h3></div><span className={`topic-state-pill ${selectedTopic.status}`}>{statusText[selectedTopic.status]}</span></div>
              <div className="topic-tags">{selectedTopic.difficulty && <span>{selectedTopic.difficulty}</span>}{selectedTopic.pattern && <span>{selectedTopic.pattern}</span>}<span>Java-first</span></div>
              <p>{selectedTopic.status === 'locked' ? 'Complete the prerequisite topics to unlock this step in your learning path.' : selectedTopic.name === 'Two Sum' ? 'Given an array of integers and a target, find the two indices whose values add up to the target.' : 'Learn the core idea, recognize the pattern, dry-run an example, and implement the solution in Java.'}</p>
              <div className="topic-sheet-footer"><span>◷ 20–35 min</span><span>⌘ Practice problems</span><button disabled={selectedTopic.status === 'locked'} onClick={onContinue}>{selectedTopic.status === 'done' ? 'Review topic ↗' : 'Continue learning ↗'}</button></div>
            </div>}
          </div>
          <aside className="tree-side-panel"><span className="roadmap-kicker">YOUR JOURNEY</span><h3>{selectedModule.name}</h3><p>Keep moving one node at a time. Each completed topic contributes to your roadmap progress.</p><div className="tree-stat-grid"><div><strong>{selectedModule.topics.filter(t => t.status === 'done').length}</strong><span>Completed</span></div><div><strong>{selectedModule.topics.filter(t => t.status === 'locked').length}</strong><span>Locked</span></div></div><div className="tree-next-card"><span className="roadmap-kicker">CURRENT FOCUS</span><strong>{selectedModule.topics.find(t => t.status === 'current')?.name ?? 'Start with the first topic'}</strong><span>Continue from your current position.</span></div><button className="tree-back full" onClick={() => { setSelectedModule(null); setSelectedTopic(null); }}>← Back to circular roadmap</button></aside>
        </div>
      )}
    </section>
  );
}
