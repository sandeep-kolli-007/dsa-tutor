import type { Frame, Pattern } from '../../types/lesson';

export function Visualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  if (pattern.id === 'prefix-sum') return <PrefixVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'fast-slow') return <FastSlowVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'monotonic-stack') return <StackVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'merge-intervals') return <IntervalVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'graph-traversal') return <GraphVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'heap-top-k') return <HeapVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'backtracking') return <BacktrackingVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'dynamic-programming') return <DPVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'trie') return <TrieVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'union-find') return <UnionFindVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'topological-sort') return <TopoVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'greedy') return <GreedyVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'bit-manipulation') return <BitVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'binary-search-answer') return <AnswerSearchVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'dp-2d') return <DPGridVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'dijkstra') return <DijkstraVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'kadane') return <KadaneVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'cyclic-sort') return <CyclicSortVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'k-way-merge') return <KWayMergeVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'matrix-traversal') return <MatrixTraversalVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'segment-tree') return <SegmentTreeVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'fenwick-tree') return <FenwickVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'bellman-ford') return <BellmanFordVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'floyd-warshall') return <FloydWarshallVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'kmp' || pattern.id === 'rabin-karp') return <StringMatchVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'scc') return <SCCVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'prim' || pattern.id === 'kruskal') return <MSTVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'a-star') return <AStarVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'sparse-table') return <SparseTableVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'dp-optimization') return <DPOptimizationVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'frequency-map') return <FrequencyVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'linked-list-reversal') return <ReversalVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'tree-traversals' || pattern.id === 'bst') return <TreeFoundationVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'lca') return <AncestorVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'lis') return <StackVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'knapsack' || pattern.id === 'coin-change') return <DPOptimizationVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'lcs' || pattern.id === 'edit-distance') return <MatrixDPVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'difference-array') return <PrefixVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'sweep-line') return <EventSweepVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'monotonic-queue') return <DequeVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'quickselect' || pattern.id === 'dutch-flag') return <PartitionVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'meet-in-middle') return <MeetMiddleVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'merge-sort' || pattern.id === 'quick-sort') return <PartitionVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'counting-sort') return <FrequencyVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'z-algorithm' || pattern.id === 'manacher') return <StringMatchVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'aho-corasick') return frame.text ? <StringMatchVisualizer pattern={pattern} frame={frame} /> : <TrieVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'eulerian-path' || pattern.id === 'multi-source-bfs') return <GraphVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'bridges') return <CriticalGraphVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'zero-one-bfs') return <DijkstraVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'tree-diameter') return <TreePathVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'tree-dp') return <TreeFoundationVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'bitmask-dp') return <BitVisualizer pattern={pattern} frame={frame} />;
  if (pattern.id === 'digit-dp') return <DPOptimizationVisualizer pattern={pattern} frame={frame} />;
  return <ArrayVisualizer pattern={pattern} frame={frame} />;
}

function VisualShell({ pattern, frame, children }: { pattern: Pattern; frame: Frame; children: React.ReactNode }) {
  return (
    <div className="visual-stage">
      <div className="visual-topline">
        <span>{pattern.title.toUpperCase()}</span>
        <strong>{frame.metric}</strong>
      </div>
      {children}
    </div>
  );
}

function ArrayCells({ frame }: { frame: Frame }) {
  return (
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
  );
}

function ArrayVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <ArrayCells frame={frame} />
      {frame.windowStart !== undefined && frame.windowEnd !== undefined && (
        <div className="window-readout">
          <span>WINDOW</span>
          <strong>[{frame.windowStart}..{frame.windowEnd}]</strong>
          {frame.outgoing !== undefined && <em className="out">− {frame.values[frame.outgoing]}</em>}
          {frame.incoming !== undefined && <em className="in">+ {frame.values[frame.incoming]}</em>}
        </div>
      )}
    </VisualShell>
  );
}

function PrefixVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="visual-caption">ORIGINAL</div>
      <ArrayCells frame={frame} />
      <div className="prefix-arrow">↓ cumulative totals</div>
      <div className="prefix-row">
        {(frame.prefix || []).map((value, index) => (
          <div className="prefix-cell" key={index}><strong>{value}</strong><small>p[{index}]</small></div>
        ))}
      </div>
    </VisualShell>
  );
}

function FastSlowVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="linked-row">
        {frame.values.map((value, index) => (
          <div className="linked-wrap" key={index}>
            <div className="runner-labels">
              {frame.slow === index && <span className="runner slow">SLOW</span>}
              {frame.fast === index && <span className="runner fast">FAST</span>}
            </div>
            <div className={'linked-node ' + (frame.slow === index || frame.fast === index ? 'active' : '')}>{value}</div>
            {index < frame.values.length - 1 && <span className="link-arrow">→</span>}
          </div>
        ))}
      </div>
      <div className="cycle-return">node 6 <span>↺</span> node 3</div>
    </VisualShell>
  );
}

function StackVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="split-visual">
        <div>
          <div className="visual-caption">INPUT</div>
          <ArrayCells frame={frame} />
        </div>
        <div className="stack-panel">
          <div className="visual-caption">MONOTONIC STACK</div>
          <div className="stack-column">
            {(frame.stack || []).slice().reverse().map((value, index) => (
              <div className={'stack-value ' + (index === 0 ? 'top' : '')} key={index}>{value}</div>
            ))}
          </div>
          <small>TOP ↑</small>
        </div>
      </div>
    </VisualShell>
  );
}

function IntervalVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const max = 18;
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="interval-board">
        <div className="visual-caption">SORTED INPUT</div>
        {(frame.intervals || []).map(([start, end], index) => (
          <div className="interval-track" key={index}>
            <span>{start}</span>
            <div
              className={'interval-bar ' + (frame.active?.includes(index) ? 'active' : '')}
              style={{ left: ((start - 1) / max) * 100 + '%', width: ((end - start + 1) / max) * 100 + '%' }}
            >[{start},{end}]</div>
          </div>
        ))}
        <div className="visual-caption merged-caption">MERGED OUTPUT</div>
        <div className="merged-row">
          {(frame.merged || []).map(([start, end]) => <span key={start + '-' + end}>[{start},{end}]</span>)}
        </div>
      </div>
    </VisualShell>
  );
}

const graphPositions = [
  [50, 10], [22, 38], [78, 38], [12, 76], [52, 76], [86, 86]
];

function GraphVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="graph-board">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.edges || []).map(([a,b], index) => (
            <line key={index} x1={graphPositions[a][0]} y1={graphPositions[a][1]} x2={graphPositions[b][0]} y2={graphPositions[b][1]} />
          ))}
        </svg>
        {frame.values.map((value) => {
          const [x,y] = graphPositions[value];
          const active = frame.active?.includes(value);
          const visited = frame.visited?.includes(value);
          return <div key={value} className={'graph-node ' + (visited ? 'visited ' : '') + (active ? 'active' : '')} style={{ left: x + '%', top: y + '%' }}>{String.fromCharCode(65 + value)}</div>;
        })}
      </div>
      <div className="queue-strip"><span>QUEUE</span>{(frame.queue || []).map((value) => <b key={value}>{String.fromCharCode(65 + value)}</b>)}</div>
    </VisualShell>
  );
}

function HeapVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const heap = frame.stack || [];
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="heap-layout">
        <div>
          <div className="visual-caption">INCOMING SCORES</div>
          <ArrayCells frame={frame} />
        </div>
        <div className="heap-tree">
          {heap.map((value, index) => <div key={index} className={'heap-node heap-' + index}>{value}</div>)}
        </div>
      </div>
      <div className="heap-note">MIN-HEAP OF SIZE K · ROOT = CURRENT BOUNDARY</div>
    </VisualShell>
  );
}

function BacktrackingVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="choice-row">
        {frame.values.map((value, index) => <div key={value} className={'choice-chip ' + (frame.active?.includes(index) ? 'active' : '')}>{value}</div>)}
      </div>
      <div className="decision-arrow">CHOOSE → EXPLORE → UNDO</div>
      <div className="path-row">
        <span>PATH</span>
        {(frame.path || []).map((value, index) => <b key={index}>{value}</b>)}
        <i className="path-cursor" />
      </div>
      <div className="branch-tree">
        <span>1</span><span>2</span><span>3</span>
        <div className="branch-line" />
      </div>
    </VisualShell>
  );
}

function DPVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="visual-caption">STATE TABLE</div>
      <div className="dp-row">
        {(frame.dp || []).map((value, index) => (
          <div className={'dp-cell ' + (frame.active?.includes(index) ? 'active' : '')} key={index}>
            <small>dp[{index}]</small><strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="dp-transition">dp[i] = dp[i − 1] + dp[i − 2]</div>
    </VisualShell>
  );
}


const triePositions = [
  [50, 8], [50, 28], [50, 48], [24, 74], [50, 74], [76, 74]
];

function TrieVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="trie-board">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.edges || []).map(([a,b], index) => (
            <line key={index} x1={triePositions[a][0]} y1={triePositions[a][1]} x2={triePositions[b][0]} y2={triePositions[b][1]} />
          ))}
        </svg>
        {(frame.labels || []).map((label, index) => {
          const [x,y] = triePositions[index];
          const active = frame.active?.includes(index);
          return (
            <div key={label + index} className={'trie-node ' + (active ? 'active' : '')} style={{ left: x + '%', top: y + '%' }}>
              {label}
            </div>
          );
        })}
      </div>
      <div className="trie-path">
        <span>PATH</span>
        {(frame.triePath || []).map((part, index) => <b key={index}>{part}</b>)}
      </div>
      <div className="word-strip">
        {(frame.words || []).map((word) => <span key={word}>{word}</span>)}
      </div>
    </VisualShell>
  );
}

function UnionFindVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const groups = new Map<number, number[]>();
  (frame.parents || []).forEach((parent, index) => {
    const root = parent;
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(index);
  });
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="uf-board">
        {Array.from(groups.entries()).map(([root, members]) => (
          <div className="uf-group" key={root}>
            <small>ROOT {frame.labels?.[root]}</small>
            <div>
              {members.map((member) => (
                <span key={member} className={frame.selected?.includes(member) ? 'active' : ''}>
                  {frame.labels?.[member] ?? member}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="parent-strip">
        {(frame.parents || []).map((parent, index) => (
          <span key={index}>{frame.labels?.[index]} → {frame.labels?.[parent]}</span>
        ))}
      </div>
    </VisualShell>
  );
}

const topoPositions = [[18,18],[18,72],[62,18],[72,72]];

function TopoVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="topo-layout">
        <div className="topo-board">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {(frame.edges || []).map(([a,b], index) => (
              <line key={index} x1={topoPositions[a][0]} y1={topoPositions[a][1]} x2={topoPositions[b][0]} y2={topoPositions[b][1]} />
            ))}
          </svg>
          {(frame.labels || []).map((label,index) => {
            const [x,y] = topoPositions[index];
            return (
              <div key={label} className={'topo-node ' + (frame.visited?.includes(index) ? 'visited ' : '') + (frame.active?.includes(index) ? 'active' : '')} style={{ left:x+'%', top:y+'%' }}>
                <b>{label}</b><small>in {frame.indegree?.[index] ?? 0}</small>
              </div>
            );
          })}
        </div>
        <div className="topo-queue">
          <small>READY QUEUE</small>
          <div>{(frame.queue || []).map((n) => <b key={n}>{frame.labels?.[n]}</b>)}</div>
        </div>
      </div>
    </VisualShell>
  );
}

function GreedyVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const max = 10;
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="greedy-board">
        <div className="visual-caption">MEETINGS SORTED BY FINISH TIME</div>
        {(frame.intervals || []).map(([start,end], index) => (
          <div className="greedy-track" key={index}>
            <div
              className={'greedy-bar ' + (frame.selected?.includes(index) ? 'selected ' : '') + (frame.active?.includes(index) ? 'active ' : '') + (frame.dimmed?.includes(index) ? 'rejected' : '')}
              style={{ left: (start/max*100)+'%', width: ((end-start)/max*100)+'%' }}
            >
              [{start},{end}]
            </div>
          </div>
        ))}
      </div>
      <div className="greedy-legend"><span className="take">TAKE</span><span className="skip">SKIP OVERLAP</span></div>
    </VisualShell>
  );
}

function BitVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="bit-board">
        {(frame.bits || []).map((bit,index) => (
          <div key={index} className={'bit-cell ' + (frame.active?.includes(index) ? 'active' : '')}>
            <small>{index}</small>
            <strong>{bit}</strong>
          </div>
        ))}
      </div>
      <div className="bit-ops">
        <span>AND &</span><span>OR |</span><span>XOR ^</span><span>SHIFT &lt;&lt; &gt;&gt;</span>
      </div>
    </VisualShell>
  );
}

function AnswerSearchVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const [low, high] = frame.range || [0, 0];
  const min = 6;
  const max = 21;
  const leftPct = ((low - min) / (max - min)) * 100;
  const rightPct = ((high - min) / (max - min)) * 100;
  const candidatePct = (((frame.candidate ?? low) - min) / (max - min)) * 100;
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="answer-search">
        <div className="answer-scale">
          {Array.from({length: max-min+1}, (_,i) => <span key={i}>{i+min}</span>)}
        </div>
        <div className="answer-line">
          <i className="answer-range" style={{ left:leftPct+'%', width:Math.max(2,rightPct-leftPct)+'%' }} />
          <b className={'candidate ' + (frame.feasible ? 'yes' : 'no')} style={{ left:candidatePct+'%' }}>{frame.candidate}</b>
        </div>
        <div className="answer-labels"><span>TOO SMALL</span><strong>{frame.feasible ? 'FEASIBLE ✓' : 'NOT FEASIBLE ×'}</strong><span>SEARCH BOUNDARY</span></div>
      </div>
    </VisualShell>
  );
}

function DPGridVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="dp-grid">
        {(frame.grid || []).map((row,r) =>
          row.map((value,c) => {
            const active = frame.cell?.[0] === r && frame.cell?.[1] === c;
            const dependency = frame.cell && ((r === frame.cell[0]-1 && c === frame.cell[1]) || (r === frame.cell[0] && c === frame.cell[1]-1));
            return (
              <div key={r+'-'+c} className={'dp-grid-cell ' + (active ? 'active ' : '') + (dependency ? 'dependency' : '')}>
                <small>[{r},{c}]</small><strong>{value}</strong>
              </div>
            );
          })
        )}
      </div>
      <div className="dp-grid-rule">FROM TOP ↓ + FROM LEFT →</div>
    </VisualShell>
  );
}

const dijkstraPositions = [[12,45],[38,15],[38,78],[68,35],[90,62]];

function DijkstraVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="weighted-board">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.weights || []).map(([a,b,w],index) => {
            const x = (dijkstraPositions[a][0] + dijkstraPositions[b][0]) / 2;
            const y = (dijkstraPositions[a][1] + dijkstraPositions[b][1]) / 2;
            return (
              <g key={index}>
                <line x1={dijkstraPositions[a][0]} y1={dijkstraPositions[a][1]} x2={dijkstraPositions[b][0]} y2={dijkstraPositions[b][1]} />
                <text x={x} y={y}>{w}</text>
              </g>
            );
          })}
        </svg>
        {(frame.labels || []).map((label,index) => {
          const [x,y] = dijkstraPositions[index];
          const active = frame.active?.includes(index);
          const visited = frame.visited?.includes(index);
          const distance = frame.distances?.[index];
          return (
            <div key={label} className={'weighted-node ' + (visited ? 'visited ' : '') + (active ? 'active' : '')} style={{ left:x+'%', top:y+'%' }}>
              <b>{label}</b><small>{distance === 99 ? '∞' : distance}</small>
            </div>
          );
        })}
      </div>
      <div className="queue-strip">
        <span>MIN-HEAP</span>
        {(frame.queue || []).map((node) => <b key={node}>{frame.labels?.[node]}:{frame.distances?.[node] === 99 ? '∞' : frame.distances?.[node]}</b>)}
      </div>
    </VisualShell>
  );
}


function KadaneVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="kadane-strip">
        {frame.values.map((value,index) => {
          const inCurrent = frame.currentRange && index >= frame.currentRange[0] && index <= frame.currentRange[1];
          const inBest = frame.bestRange && index >= frame.bestRange[0] && index <= frame.bestRange[1];
          return (
            <div key={index} className={'kadane-cell ' + (inBest ? 'best ' : '') + (inCurrent ? 'current ' : '') + (frame.dimmed?.includes(index) ? 'dimmed' : '')}>
              <small>{index}</small><strong>{value}</strong>
            </div>
          );
        })}
      </div>
      <div className="kadane-stats">
        <span>CURRENT <b>{frame.currentSum}</b></span>
        <span>BEST <b>{frame.bestSum}</b></span>
      </div>
      <div className="kadane-rule">KEEP HISTORY ONLY IF IT HELPS THE NEXT POSITION</div>
    </VisualShell>
  );
}

function CyclicSortVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="home-labels">
        {frame.values.map((_,index) => <span key={index}>HOME {index + 1}</span>)}
      </div>
      <div className="cyclic-row">
        {frame.values.map((value,index) => {
          const swap = frame.swap?.includes(index);
          const home = value === index + 1;
          return (
            <div className={'cyclic-cell ' + (home ? 'home ' : '') + (swap ? 'swap' : '')} key={index}>
              <small>idx {index}</small><strong>{value}</strong>
              <em>{home ? '✓' : '→ ' + (value - 1)}</em>
            </div>
          );
        })}
      </div>
      {frame.swap && <div className="swap-readout">SWAP INDEX {frame.swap[0]} ↔ {frame.swap[1]}</div>}
    </VisualShell>
  );
}

function KWayMergeVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="kmerge-layout">
        <div className="kmerge-lists">
          {(frame.arrays || []).map((row,rowIndex) => (
            <div className="kmerge-row" key={rowIndex}>
              <span>L{rowIndex + 1}</span>
              {row.map((value,index) => (
                <b key={index} className={(frame.heads?.[rowIndex] === index ? 'head ' : '') + (index < (frame.heads?.[rowIndex] ?? 0) ? 'used' : '')}>{value}</b>
              ))}
            </div>
          ))}
        </div>
        <div className="kmerge-heap">
          <small>MIN-HEAP</small>
          <div>{frame.values.map((value,index) => <b key={index}>{value}</b>)}</div>
        </div>
      </div>
      <div className="kmerge-output">LATEST OUTPUT <strong>{frame.chosen ?? '—'}</strong></div>
    </VisualShell>
  );
}

function MatrixTraversalVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="matrix-walk-grid">
        {(frame.matrix || []).map((row,r) =>
          row.map((value,c) => {
            const active = frame.cell?.[0] === r && frame.cell?.[1] === c;
            const visited = value === 2;
            const blocked = value === 0;
            return (
              <div key={r+'-'+c} className={'matrix-walk-cell ' + (active ? 'active ' : '') + (visited ? 'visited ' : '') + (blocked ? 'blocked' : '')}>
                <small>{r},{c}</small>
                <strong>{blocked ? '■' : visited ? '✓' : '·'}</strong>
              </div>
            );
          })
        )}
      </div>
      <div className="direction-pad">
        <span>↑</span><span>←</span><b>4 DIR</b><span>→</span><span>↓</span>
      </div>
    </VisualShell>
  );
}

function SegmentTreeVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const nodes = frame.tree || [];
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="segment-board">
        {nodes.map((node,index) => {
          const parent = index === 0 ? null : Math.floor((index - 1) / 2);
          const parentNode = parent === null ? null : nodes[parent];
          const top = 16 + node.level * 34;
          const parentTop = parentNode ? 16 + parentNode.level * 34 : 0;
          const left = node.pos;
          const parentLeft = parentNode?.pos ?? left;
          const width = Math.abs(left - parentLeft);
          const start = Math.min(left, parentLeft);
          return (
            <div key={index}>
              {parentNode && <i className="segment-edge" style={{ left:start+'%', top:(parentTop+7)+'%', width:width+'%', transform: left < parentLeft ? 'rotate(-18deg)' : 'rotate(18deg)' }} />}
              <div className={'segment-node ' + (node.active ? 'active' : '')} style={{ left:left+'%', top:top+'%' }}>
                <small>{node.label}</small><strong>{node.value}</strong>
              </div>
            </div>
          );
        })}
      </div>
      <div className="segment-legend"><span>RANGE</span><b>AGGREGATE</b></div>
    </VisualShell>
  );
}

function FenwickVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="fenwick-bars">
        {(frame.fenwick || []).slice(1).map((value,index) => {
          const oneBased = index + 1;
          const active = frame.active?.includes(index);
          return (
            <div className={'fenwick-bar-wrap ' + (active ? 'active' : '')} key={oneBased}>
              <div className="fenwick-bar" style={{ height: Math.max(28, value * 4) + 'px' }}><strong>{value}</strong></div>
              <small>{oneBased}</small>
              <em>lb {oneBased & -oneBased}</em>
            </div>
          );
        })}
      </div>
      <div className="fenwick-rule">QUERY: i -= lowbit(i) &nbsp; · &nbsp; UPDATE: i += lowbit(i)</div>
    </VisualShell>
  );
}

function BellmanFordVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="bellman-pass">RELAXATION PASS <strong>{frame.pass}</strong></div>
      <WeightedGraphCore frame={frame} />
      <div className="distance-strip">
        {(frame.labels || []).map((label,index) => <span key={label}>{label}<b>{frame.distances?.[index] === 99 ? '∞' : frame.distances?.[index]}</b></span>)}
      </div>
    </VisualShell>
  );
}

function WeightedGraphCore({ frame }: { frame: Frame }) {
  return (
    <div className="weighted-board compact-weighted">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {(frame.weights || []).map(([a,b,w],index) => {
          const x = (dijkstraPositions[a][0] + dijkstraPositions[b][0]) / 2;
          const y = (dijkstraPositions[a][1] + dijkstraPositions[b][1]) / 2;
          return (
            <g key={index}>
              <line x1={dijkstraPositions[a][0]} y1={dijkstraPositions[a][1]} x2={dijkstraPositions[b][0]} y2={dijkstraPositions[b][1]} />
              <text x={x} y={y}>{w}</text>
            </g>
          );
        })}
      </svg>
      {(frame.labels || []).map((label,index) => {
        const [x,y] = dijkstraPositions[index];
        return (
          <div key={label} className={'weighted-node ' + (frame.active?.includes(index) ? 'active' : '')} style={{ left:x+'%', top:y+'%' }}>
            <b>{label}</b><small>{frame.distances?.[index] === 99 ? '∞' : frame.distances?.[index]}</small>
          </div>
        );
      })}
    </div>
  );
}

function FloydWarshallVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const matrix = frame.matrix || [];
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="floyd-stage">
        <div className="floyd-hub">ALLOWED HUBS <strong>{frame.pass}</strong></div>
        <div className="floyd-matrix" style={{ gridTemplateColumns: '42px repeat(' + matrix.length + ', 62px)' }}>
          <div />
          {matrix.map((_,i) => <b className="matrix-head" key={'h'+i}>{String.fromCharCode(65+i)}</b>)}
          {matrix.map((row,r) => (
            <>
              <b className="matrix-head" key={'r'+r}>{String.fromCharCode(65+r)}</b>
              {row.map((value,c) => {
                const active = frame.cell?.[0] === r && frame.cell?.[1] === c;
                return <span key={r+'-'+c} className={active ? 'active' : ''}>{value === 99 ? '∞' : value}</span>;
              })}
            </>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}


function StringMatchVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const textChars = (frame.text || '').split('');
  const patternChars = (frame.patternText || '').split('');
  const [start,end] = frame.charWindow || [-1,-1];
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="string-match-board">
        <div className="visual-caption">TEXT</div>
        <div className="char-row">
          {textChars.map((ch,index) => <span key={index} className={index >= start && index <= end ? 'active' : ''}><small>{index}</small><b>{ch}</b></span>)}
        </div>
        <div className="visual-caption pattern-caption">PATTERN</div>
        <div className="char-row pattern-row">
          {patternChars.map((ch,index) => <span key={index} className={frame.active?.includes(index) ? 'active' : ''}><small>{index}</small><b>{ch}</b></span>)}
        </div>
        {frame.lps && <div className="lps-row"><em>LPS</em>{frame.lps.map((v,i)=><span key={i}>{v}</span>)}</div>}
        {frame.hash && <div className="hash-readout">{frame.hash}</div>}
      </div>
    </VisualShell>
  );
}

function SCCVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="scc-board">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.edges || []).map(([a,b],i)=><line key={i} x1={dijkstraPositions[a][0]} y1={dijkstraPositions[a][1]} x2={dijkstraPositions[b][0]} y2={dijkstraPositions[b][1]} />)}
        </svg>
        {(frame.labels || []).map((label,index)=>{
          const [x,y]=dijkstraPositions[index];
          const comp=frame.components?.[index] ?? -1;
          return <div key={label} className={'scc-node comp-'+comp+' '+(frame.active?.includes(index)?'active':'')} style={{left:x+'%',top:y+'%'}}><b>{label}</b><small>{comp>=0?'SCC '+comp:'?'}</small></div>;
        })}
      </div>
      <div className="scc-summary">{Array.from(new Set((frame.components||[]).filter(x=>x>=0))).map(c=><span key={c}>COMPONENT {c}</span>)}</div>
    </VisualShell>
  );
}

function MSTVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="mst-board">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.weights || []).map(([a,b,w],i)=>{
            const selected=(frame.selectedEdges||[]).some(([x,y])=>(x===a&&y===b)||(x===b&&y===a));
            const x=(dijkstraPositions[a][0]+dijkstraPositions[b][0])/2;
            const y=(dijkstraPositions[a][1]+dijkstraPositions[b][1])/2;
            return <g key={i} className={selected?'selected-edge':''}><line x1={dijkstraPositions[a][0]} y1={dijkstraPositions[a][1]} x2={dijkstraPositions[b][0]} y2={dijkstraPositions[b][1]} /><text x={x} y={y}>{w}</text></g>;
          })}
        </svg>
        {(frame.labels||[]).map((label,index)=>{
          const [x,y]=dijkstraPositions[index];
          return <div key={label} className={'weighted-node '+(frame.selected?.includes(index)?'visited ':'')+(frame.active?.includes(index)?'active':'')} style={{left:x+'%',top:y+'%'}}><b>{label}</b><small>{frame.parents ? 'r'+frame.parents[index] : ''}</small></div>;
        })}
      </div>
    </VisualShell>
  );
}

function AStarVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <MatrixTraversalVisualizer pattern={pattern} frame={frame} />
      <div className="astar-score"><span>g <b>{frame.distances?.[0]}</b></span><span>h <b>{frame.heuristic?.[0]}</b></span><span>f <b>{(frame.distances?.[0]||0)+(frame.heuristic?.[0]||0)}</b></span></div>
    </VisualShell>
  );
}

function SparseTableVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="sparse-table-board">
        {(frame.sparse||[]).map((row,level)=>(
          <div className="sparse-level" key={level}><span>2^{level}</span>{row.map((v,i)=><b key={i} className={frame.active?.includes(i)?'active':''}>{v}</b>)}</div>
        ))}
      </div>
    </VisualShell>
  );
}

function DPOptimizationVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="dp-opt-board">
        {(frame.matrix||[]).map((row,r)=><div className="dp-opt-row" key={r}>{row.map((v,c)=><span key={c}>{v}</span>)}</div>)}
        <div className="rolling-row"><em>ROLLING</em>{(frame.rolling||[]).map((v,i)=><b key={i}>{v}</b>)}</div>
      </div>
    </VisualShell>
  );
}


function FrequencyVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const entries = Object.entries(frame.frequency || {});
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <ArrayCells frame={frame} />
      <div className="frequency-map-board">
        <span className="visual-caption">HASH MAP</span>
        <div>{entries.length ? entries.map(([key,value]) => <b key={key}><em>{key}</em><strong>{value}</strong></b>) : <i>empty</i>}</div>
      </div>
    </VisualShell>
  );
}

function ReversalVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="reversal-row">
        {frame.values.map((value,index) => (
          <div className="reversal-node-wrap" key={index}>
            <div className="runner-labels">
              {frame.slow === index && <span className="runner slow">CURR</span>}
              {frame.fast === index && <span className="runner fast">NEXT</span>}
            </div>
            <div className={'linked-node '+(frame.active?.includes(index)?'active ':'')+(frame.dimmed?.includes(index)?'dimmed':'')}>{value}</div>
            {index < frame.values.length-1 && <span className="link-arrow">{frame.dimmed?.includes(index)?'←':'→'}</span>}
          </div>
        ))}
      </div>
      <div className="reversal-rule">SAVE NEXT → REVERSE LINK → ADVANCE</div>
    </VisualShell>
  );
}

function TreeFoundationVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const nodes=frame.tree||[];
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="foundation-tree">
        {nodes.map((node,index)=>{
          const parent=index===0?null:Math.floor((index-1)/2);
          const parentNode=parent===null?null:nodes[parent];
          const top=14+node.level*35;
          return (
            <div key={index}>
              {parentNode && <i className="tree-edge" style={{left:Math.min(node.pos,parentNode.pos)+'%',top:(14+parentNode.level*35+8)+'%',width:Math.abs(node.pos-parentNode.pos)+'%'}} />}
              <div className={'tree-foundation-node '+(node.active?'active':'')} style={{left:node.pos+'%',top:top+'%'}}>{node.label}</div>
            </div>
          );
        })}
      </div>
      {frame.order && <div className="tree-order"><span>ORDER</span>{frame.order.map((n,i)=><b key={i}>{frame.labels?.[n] ?? n}</b>)}</div>}
      {frame.target !== undefined && <div className="tree-order"><span>TARGET</span><b>{frame.target}</b></div>}
    </VisualShell>
  );
}

function AncestorVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="ancestor-table">
        <div className="ancestor-head"><span>2^k</span>{(frame.labels||[]).map(l=><b key={l}>{l}</b>)}</div>
        {(frame.ancestorTable||[]).map((row,k)=><div className="ancestor-row" key={k}><span>{k}</span>{row.map((v,i)=><b key={i} className={frame.active?.includes(i)?'active':''}>{frame.labels?.[v] ?? v}</b>)}</div>)}
      </div>
    </VisualShell>
  );
}

function MatrixDPVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const matrix=frame.matrix||[];
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="matrix-dp-wrap">
        {frame.text && frame.patternText && <div className="matrix-labels"><span>{frame.text}</span><span>{frame.patternText}</span></div>}
        <div className="matrix-dp" style={{gridTemplateColumns:'repeat('+(matrix[0]?.length||1)+', 54px)'}}>
          {matrix.flatMap((row,r)=>row.map((v,c)=><span key={r+'-'+c} className={frame.cell?.[0]===r&&frame.cell?.[1]===c?'active':''}>{v}</span>))}
        </div>
      </div>
    </VisualShell>
  );
}

function EventSweepVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  const events=frame.events||[];
  const min=Math.min(...events.map(e=>e.x),0);
  const max=Math.max(...events.map(e=>e.x),1);
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="sweep-axis">
        <div className="axis-line" />
        {events.map((e,i)=>{
          const pct=((e.x-min)/Math.max(1,max-min))*100;
          return <div key={i} className={'event-pin '+(e.active?'active':'')} style={{left:pct+'%'}}><b>{e.delta>0?'+':''}{e.delta}</b><small>{e.x}</small></div>;
        })}
      </div>
      <div className="kadane-stats"><span>ACTIVE <b>{frame.currentSum ?? 0}</b></span><span>MAX <b>{frame.bestSum ?? 0}</b></span></div>
    </VisualShell>
  );
}

function DequeVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <ArrayCells frame={frame} />
      <div className="deque-board">
        <span>FRONT</span>
        {(frame.deque||[]).map((index,i)=><b key={i}>{frame.values[index]}<small>i{index}</small></b>)}
        <span>BACK</span>
      </div>
    </VisualShell>
  );
}

function PartitionVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="partition-row">
        {frame.values.map((value,index)=>{
          const active=frame.active?.includes(index);
          const pivot=frame.pivot===index;
          return <div key={index} className={'partition-cell '+(active?'active ':'')+(pivot?'pivot ':'')+(frame.dimmed?.includes(index)?'dimmed':'')}><small>{index}</small><strong>{value}</strong>{pivot&&<em>PIVOT</em>}</div>;
        })}
      </div>
      <div className="partition-pointers">
        {frame.left !== undefined && <span>LOW {frame.left}</span>}
        {frame.mid !== undefined && <span>MID {frame.mid}</span>}
        {frame.right !== undefined && <span>HIGH {frame.right}</span>}
      </div>
    </VisualShell>
  );
}

function MeetMiddleVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="mitm-board">
        <div><span className="visual-caption">LEFT HALF</span>{(frame.halves?.[0]||[]).map((v,i)=><b key={i}>{v}</b>)}</div>
        <div className="mitm-target"><small>TARGET</small><strong>{frame.target}</strong></div>
        <div><span className="visual-caption">RIGHT HALF</span>{(frame.halves?.[1]||[]).map((v,i)=><b key={i}>{v}</b>)}</div>
      </div>
    </VisualShell>
  );
}


function CriticalGraphVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="critical-graph">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.edges||[]).map(([a,b],i)=>{
            const selected=(frame.selectedEdges||[]).some(([x,y])=>(x===a&&y===b)||(x===b&&y===a));
            return <line key={i} className={selected?'critical-edge':''} x1={dijkstraPositions[a][0]} y1={dijkstraPositions[a][1]} x2={dijkstraPositions[b][0]} y2={dijkstraPositions[b][1]} />;
          })}
        </svg>
        {(frame.labels||[]).map((label,index)=>{
          const [x,y]=dijkstraPositions[index];
          return <div key={label} className={'graph-node '+(frame.active?.includes(index)?'active':'')} style={{left:x+'%',top:y+'%'}}>{label}</div>;
        })}
      </div>
      {frame.rolling && <div className="distance-strip">{frame.rolling.map((v,i)=><span key={i}>{frame.labels?.[i]}<b>{v}</b></span>)}</div>}
    </VisualShell>
  );
}

function TreePathVisualizer({ pattern, frame }: { pattern: Pattern; frame: Frame }) {
  return (
    <VisualShell pattern={pattern} frame={frame}>
      <div className="critical-graph">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {(frame.edges||[]).map(([a,b],i)=>{
            const path=frame.path||[];
            const selected=path.some((v,idx)=>idx<path.length-1 && ((v===a&&path[idx+1]===b)||(v===b&&path[idx+1]===a)));
            return <line key={i} className={selected?'critical-edge':''} x1={dijkstraPositions[a][0]} y1={dijkstraPositions[a][1]} x2={dijkstraPositions[b][0]} y2={dijkstraPositions[b][1]} />;
          })}
        </svg>
        {(frame.labels||[]).map((label,index)=>{
          const [x,y]=dijkstraPositions[index];
          return <div key={label} className={'graph-node '+(frame.path?.includes(index)?'visited ':'')+(frame.active?.includes(index)?'active':'')} style={{left:x+'%',top:y+'%'}}>{label}</div>;
        })}
      </div>
      {frame.path && <div className="tree-order"><span>PATH</span>{frame.path.map((n,i)=><b key={i}>{frame.labels?.[n] ?? n}</b>)}</div>}
    </VisualShell>
  );
}
