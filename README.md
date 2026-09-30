# DSA Tutor

A visual-first **React + Ionic** web app for learning DSA through reusable problem-solving patterns instead of memorizing isolated algorithms.

## Teaching model

Every pattern follows the same learning loop:

**Real life → Visual intuition → Invariant → Code synchronization → Recognition signals → Practice**

The goal is to help a learner see an unseen problem and recognize the underlying pattern.

## MVP included

- Responsive Ionic React shell
- Dark technical / infographic-inspired design system
- Interactive frame-based visual player
- Play, pause, previous, next, scrub and speed controls
- Visual state synchronized with highlighted code
- Real-life-to-DSA mapping
- Pattern invariants and recognition signals
- Recognition quizzes
- Adaptive spaced recognition reviews
- Evidence-based mastery scoring
- Custom-input Explore mode for foundational patterns
- Mistake labs for common invariant failures
- Searchable/filterable 65-pattern library
- Browser-based JavaScript implementation lab with timeout-protected test execution
- Coding hints, hidden tests, reference solutions, local drafts and solved-state persistence
- Local progress persistence
- Shareable lesson and coding-problem deep links
- Mobile bottom navigation and desktop side rail

### Interactive lessons

1. Sliding Window — busiest 3-hour store period
2. Two Pointers — two people searching a sorted shelf
3. Binary Search — higher/lower number guessing
4. Prefix Sum — bank-statement running balances
5. Fast & Slow Pointers — two runners on a circular track
6. Monotonic Stack — waiting for the next taller person
7. Merge Intervals — overlapping calendar meetings
8. BFS / DFS — message spreading through a friend network
9. Heap / Top-K — live top-3 leaderboard
10. Backtracking — trying combinations on a lock
11. Dynamic Programming — reusing known travel costs
12. Trie — phone-contact autocomplete
13. Union Find — merging friend circles
14. Topological Sort — software build dependencies
15. Greedy — scheduling the most meetings
16. Bit Manipulation — binary light switches
17. Binary Search on Answer — minimum truck capacity
18. 2D Dynamic Programming — city-grid route counts
19. Dijkstra — weighted navigation routes
20. Kadane / Maximum Subarray — profitable streaks
21. Cyclic Sort — numbered books to numbered shelves
22. K-way Merge — merging sorted checkout lines
23. Matrix Traversal — warehouse floor-plan exploration
24. Segment Tree — nested warehouse zone totals
25. Fenwick Tree — compact prefix-sum buckets
26. Bellman-Ford — discounted routes with negative edges
27. Floyd-Warshall — all-pairs routing through transfer hubs

## Coding practice

The current implementation bank includes JavaScript challenges for:

- Sliding Window
- Two Pointers
- Binary Search
- Prefix Sum
- Monotonic Stack
- Merge Intervals
- BFS shortest path
- Dynamic Programming
- Kadane
- Difference Array
- Quickselect
- Coin Change

User code executes inside a dedicated Web Worker with a time limit, so infinite loops can be terminated without freezing the UI.

Mastery is no longer just lesson completion. The app combines:

**lesson understanding + repeated recognition evidence + implementation evidence**

Patterns without a coding challenge are normalized against the evidence currently available.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Curriculum completion

The standard interview curriculum is now complete with **65 visual topics**.

The later additions include:

- Hash / Frequency Map
- Linked List Reversal
- Tree Traversals
- BST Search & Insert
- LCA / Binary Lifting
- LIS
- 0/1 Knapsack
- LCS
- Edit Distance
- Coin Change
- Difference Array
- Sweep Line
- Monotonic Queue
- Quickselect
- Dutch National Flag
- Meet in the Middle
- Merge Sort
- Quicksort
- Counting Sort
- Z Algorithm
- Manacher
- Aho-Corasick
- Eulerian Path / Circuit
- Bridges & Articulation Points
- 0-1 BFS
- Multi-source BFS
- Tree Diameter
- Tree DP
- Bitmask DP
- Digit DP

## CI

Every pull request runs the Vitest suite and then a Node 22 TypeScript/Vite production build. Tests currently cover frame generation, navigation/deep links, mastery scoring, review scheduling, coding problem definitions, and reference solutions.
