import { useMemo, useState } from 'react';

type Topic = { name: string; status: 'done' | 'current' | 'available' | 'locked'; difficulty?: string; pattern?: string };
type Module = { name: string; short: string; color: string; topics: Topic[] };

import { roadmapModules as modules, roadmapTopicCount } from '../data/a2z-roadmap';

const statusText: Record<Topic['status'], string> = { done: 'Completed', current: 'In progress', available: 'Available', locked: 'Locked' };

export function RadialRoadmap({ onContinue }: { onContinue: () => void }) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState('');
  const [doneIds, setDoneIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('striver-a2z-topic-progress-v1') || '[]'); } catch { return []; }
  });
  const progressModules = useMemo(() => modules.map(m => {
    const firstUndone = m.topics.find(t => !doneIds.includes(t.id));
    return { ...m, topics: m.topics.map(t => ({ ...t, status: doneIds.includes(t.id) ? 'done' as const : t.id === firstUndone?.id ? 'current' as const : 'available' as const })) };
  }), [doneIds]);
  const allTopics = useMemo(() => progressModules.flatMap(m => m.topics), [progressModules]);
  const completed = allTopics.filter(t => t.status === 'done').length;
  const total = roadmapTopicCount;
  const toggleDone = (topicId: string) => {
    setDoneIds(previous => {
      const next = previous.includes(topicId) ? previous.filter(id => id !== topicId) : [...previous, topicId];
      localStorage.setItem('striver-a2z-topic-progress-v1', JSON.stringify(next));
      return next;
    });
  };

  const polar = (cx: number, cy: number, r: number, a: number) => ({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  // The overview is a ring of module hubs. Each hub owns a small radial
  // topic tree; dense modules can be opened to explore their full branch list.
  const radialNodes = progressModules.map((m, i) => {
    const angle = -Math.PI / 2 + (i / modules.length) * Math.PI * 2;
    const root = polar(250, 250, 78, angle);
    const groupNames = [...new Set(m.topics.map(t => t.topic))];
    const nodes = m.topics.map((topic, j) => {
      const groupIndex = Math.max(0, groupNames.indexOf(topic.topic));
      const groupSize = m.topics.filter(t => t.topic === topic.topic).length;
      const groupPosition = m.topics.slice(0, j).filter(t => t.topic === topic.topic).length;
      const groupAngle = angle + (groupIndex - (groupNames.length - 1) / 2) * Math.min(0.055, (Math.PI * 2 / modules.length) * 0.65 / Math.max(groupNames.length, 1));
      const withinGroup = groupSize > 1 ? (groupPosition - (groupSize - 1) / 2) * 0.018 : 0;
      const branchAngle = groupAngle + withinGroup;
      const parent = polar(250, 250, 76 + (groupIndex % 2) * 12, groupAngle);
      const point = polar(250, 250, 116 + (groupPosition % 5) * 21, branchAngle);
      return { topic, parent, point, r: 3.2 };
    });
    return { module: m, angle, root, nodes };
  });
  const visibleTopics = (progressModules.find(m => m.name === selectedModule?.name)?.topics ?? []).filter(t => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="roadmap-page">
      <header className="roadmap-header">
        <div><div className="roadmap-kicker"><span className="roadmap-live-dot" /> STRIVER A2Z · INTERACTIVE LEARNING PATH</div><h1>DSA <span>Universe</span></h1><p>{total} real practice problems across {progressModules.length} modules, grouped by topic family.</p></div>
        <div className="roadmap-total"><strong>{completed}<small> / {total}</small></strong><span>topics completed</span><div className="roadmap-progress"><i style={{ width: (completed / total * 100) + '%' }} /></div></div>
      </header>

      {!selectedModule ? (
        <div className="universe-layout">
          <div className="universe-card">
            <div className="universe-tools"><span>ROADMAP / ALL MODULES</span><div><button onClick={() => setZoom(z => Math.min(1.3, z + .1))} aria-label="Zoom in">＋</button><button onClick={() => setZoom(z => Math.max(.75, z - .1))} aria-label="Zoom out">−</button><button onClick={() => setZoom(1)}>Reset</button></div></div>
            <div className="radial-canvas">
              <svg viewBox="0 0 500 500" role="img" aria-label={`Circular Striver A2Z roadmap with ${total} topic nodes across ${progressModules.length} modules`}>
                <circle cx="250" cy="250" r="220" fill="none" stroke="#242b38" strokeWidth="1" />
                <circle cx="250" cy="250" r="170" fill="none" stroke="#202735" strokeWidth="1" strokeDasharray="2 6" />
                <g transform={`translate(250 250) scale(${zoom}) translate(-250 -250)`}>
                  {radialNodes.map(({ module, angle, root, nodes }) => {
                    const label = polar(250, 250, 196, angle);
                    return <g key={module.name} onClick={() => { const live = progressModules.find(m => m.name === module.name)!; setSelectedModule(live); setSelectedTopic(live.topics.find(t => t.status === 'current') ?? live.topics[0]); setQuery(''); }} role="button" tabIndex={0} aria-label={module.name} className="radial-sector">
                      <line x1="250" y1="250" x2={root.x} y2={root.y} stroke={module.color + '55'} strokeWidth="2" />
                      {nodes.map((n, j) => <g key={j}>
                        <line x1={root.x} y1={root.y} x2={n.parent.x} y2={n.parent.y} stroke={module.color + '70'} strokeWidth="1.5" />
                        <line x1={n.parent.x} y1={n.parent.y} x2={n.point.x} y2={n.point.y} stroke={n.topic.status === 'done' ? '#245f51' : '#30394a'} strokeWidth="1.5" />
                        <circle cx={n.parent.x} cy={n.parent.y} r="3" fill={module.color} opacity=".9" />
                        <circle cx={n.point.x} cy={n.point.y} r={n.topic.status === 'current' ? 6 : n.r} fill={n.topic.status === 'done' ? '#50d6a0' : n.topic.status === 'current' ? module.color : '#353d4b'} stroke={n.topic.status === 'current' ? '#dce8ff' : 'none'} strokeWidth="2" />
                      </g>)}
                      <circle cx={root.x} cy={root.y} r="5" fill={module.color} stroke="#dce8ff" strokeWidth="1" />
                      <text x={label.x} y={label.y} fill={module.color} fontSize="10" fontWeight="800" letterSpacing="1.1" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${angle * 180 / Math.PI + 90} ${label.x} ${label.y})`}>{module.short}</text>
                    </g>;
                  })}
                  <circle cx="250" cy="250" r="27" fill="#101827" stroke="#416eff" strokeWidth="2" />
                  <circle cx="250" cy="250" r="17" fill="#315fff" opacity=".18" />
                  <text x="250" y="247" fill="#f4f7ff" fontSize="14" fontWeight="800" textAnchor="middle">{completed}</text>
                  <text x="250" y="260" fill="#a8b6cf" fontSize="7" textAnchor="middle">/ {total}</text>
                </g>
              </svg>
            </div>
            <div className="universe-legend"><span><i className="legend-dot done"/> Completed</span><span><i className="legend-dot current"/> In progress</span><span><i className="legend-dot available"/> Available</span><span><i className="legend-dot locked"/> Locked</span></div>
          </div>
          <aside className="module-sidebar">
            <div className="module-sidebar-head"><div><span className="roadmap-kicker">EXPLORE</span><h2>Learning modules</h2></div><span className="module-count">{progressModules.length}</span></div>
            <label className="roadmap-search">⌕ <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a module…" /></label>
            <div className="module-list">{progressModules.filter(m => m.name.toLowerCase().includes(query.toLowerCase())).map((m, i) => {
              const done = m.topics.filter(t => t.status === 'done').length;
              return <button className="module-row" key={m.name} onClick={() => { setSelectedModule(m); setSelectedTopic(m.topics.find(t => t.status === 'current') ?? m.topics[0]); setQuery(''); }}>
                <span className="module-index" style={{ color: m.color, borderColor: m.color + '66' }}>{String(i + 1).padStart(2, '0')}</span><span className="module-row-copy"><strong>{m.name}</strong><small>{m.topics.length} topics · {done} completed</small><span className="module-mini-progress"><i style={{ width: (done / m.topics.length * 100) + '%', background: m.color }}/></span></span><span className="module-chevron">↗</span>
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
              <div className="topic-sheet-footer"><span>◷ 20–35 min</span><span>⌘ Practice problems</span>{selectedTopic.status !== 'done' && <button className="mark-topic-done" onClick={() => toggleDone((selectedTopic as Topic & {id:string}).id)}>Mark complete</button>}<button disabled={selectedTopic.status === 'locked'} onClick={onContinue}>{selectedTopic.status === 'done' ? 'Review topic ↗' : 'Continue learning ↗'}</button></div>
            </div>}
          </div>
          <aside className="tree-side-panel"><span className="roadmap-kicker">YOUR JOURNEY</span><h3>{selectedModule.name}</h3><p>Keep moving one node at a time. Each completed topic contributes to your roadmap progress.</p><div className="tree-stat-grid"><div><strong>{selectedModule.topics.filter(t => t.status === 'done').length}</strong><span>Completed</span></div><div><strong>{selectedModule.topics.filter(t => t.status === 'locked').length}</strong><span>Locked</span></div></div><div className="tree-next-card"><span className="roadmap-kicker">CURRENT FOCUS</span><strong>{selectedModule.topics.find(t => t.status === 'current')?.name ?? 'Start with the first topic'}</strong><span>Continue from your current position.</span></div><button className="tree-back full" onClick={() => { setSelectedModule(null); setSelectedTopic(null); }}>← Back to circular roadmap</button></aside>
        </div>
      )}
    </section>
  );
}
