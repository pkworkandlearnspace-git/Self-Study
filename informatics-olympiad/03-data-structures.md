# 03 · Data Structures
> **Goal:** answer queries fast. These structures appear in a large share of IOI tasks. · **Time:** 4–5 weeks

👉 Interactive: [Segment tree visualizer](interactive/segment-tree.html)

## Skip test
- [ ] Implement DSU with path compression + union by size. Explain its α(n) complexity.
- [ ] Implement a Fenwick tree (BIT) for point update / prefix sum. Explain `i & -i`.
- [ ] Implement a segment tree with **lazy propagation** for range add + range sum.
- [ ] Answer static range-minimum queries in O(1) with a sparse table.
- [ ] Use a monotonic stack to find the next greater element for every index in O(n).
- [ ] Use a sliding-window maximum with a deque.

## Core ideas
- **Stacks / queues / deques:** monotonic stack (next greater/smaller, largest rectangle in a histogram), monotonic deque (sliding window min/max).
- **Heaps** (`priority_queue`): k-th largest, merging sorted lists, event simulation.
- **Ordered sets/maps:** `set`, `multiset`, and `map` for dynamic order statistics by value. The policy-based `ordered_set` (GNU pbds) gives the k-th element.
- **DSU (union-find):** connectivity, Kruskal, offline queries. Near-O(1) per operation.
- **Fenwick tree:** prefix sums with point updates, O(log n), very short code. Variants: range update/point query, 2D.
- **Segment tree:** any **associative** operation (sum, min, max, gcd, matrix product, custom merge). **Lazy propagation** for range updates. Walking down the tree ("first index with prefix ≥ k").
- **Sparse table:** O(1) idempotent range queries (min/max/gcd) on static arrays.
- **Square root decomposition** and **Mo's algorithm** (offline range queries) are useful fallbacks.
- **Offline tricks:** sort queries, process events with a sweep line, reverse time (deletions → insertions with DSU).

## Learn from
- ⭐ **[USACO Guide: Silver → Gold](https://usaco.guide/)**: DSU, prefix sums, Fenwick/segment trees.
- ⭐ **[Codeforces EDU: Segment Tree (parts 1–2)](https://codeforces.com/edu/courses)**: lectures + graded practice.
- **[cp-algorithms: Data structures](https://cp-algorithms.com/)**: segment tree, Fenwick, DSU, sparse table.
- **CSES: "Range Queries"** section.

## Build
- Write each structure from memory 3 times on different days. Solve all of CSES *Range Queries*.
