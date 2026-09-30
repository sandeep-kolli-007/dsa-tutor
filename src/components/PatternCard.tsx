import type { Pattern, PatternId } from '../types/lesson';

export function PatternCard(props: { pattern: Pattern; complete: boolean; onClick: () => void }) {
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
  if (id === 'sliding-window' || id === 'kadane') {
    return <div className="mini-visual"><i /><i className="hot" /><i className="hot" /><i className="hot" /><i /></div>;
  }
  if (id === 'two-pointers' || id === 'fast-slow' || id === 'binary-search-answer' || id === 'cyclic-sort') {
    return <div className="mini-visual pointers"><b>L</b><i /><i /><i /><i /><i /><b>R</b></div>;
  }
  if (id === 'prefix-sum' || id === 'dynamic-programming' || id === 'dp-2d' || id === 'fenwick-tree') {
    return <div className="mini-visual steps"><i /><i className="hot" /><i className="hot tall" /><i className="found taller" /><i /></div>;
  }
  if (id === 'monotonic-stack' || id === 'heap-top-k' || id === 'k-way-merge') {
    return <div className="mini-visual stack-mini"><i /><i className="hot" /><i className="found" /></div>;
  }
  if (id === 'merge-intervals' || id === 'greedy') {
    return <div className="mini-visual intervals-mini"><i /><i className="hot" /><i /></div>;
  }
  if (id === 'graph-traversal' || id === 'topological-sort' || id === 'dijkstra' || id === 'union-find' || id === 'bellman-ford') {
    return <div className="mini-visual graph-mini"><i /><i className="hot" /><i /><i className="found" /><i /></div>;
  }
  if (id === 'backtracking' || id === 'trie' || id === 'segment-tree') {
    return <div className="mini-visual branch-mini"><i /><i /><i className="hot" /><i /><i /></div>;
  }
  if (id === 'bit-manipulation') {
    return <div className="mini-visual bits-mini"><b>1</b><b>0</b><b>1</b><b>1</b><b>0</b></div>;
  }
  if (id === 'matrix-traversal' || id === 'floyd-warshall') {
    return <div className="mini-visual matrix-mini"><i /><i className="hot" /><i /><i className="found" /><i /><i /></div>;
  }
  return <div className="mini-visual binary"><i className="dim" /><i className="dim" /><i /><i className="found" /><i /></div>;
}
