# 05 · Dynamic Programming
> **Goal:** IOI's favorite topic. Define states well, then optimize. · **Time:** 5–7 weeks

👉 Interactive: [DP table animator](interactive/dp-table.html)

## Skip test
- [ ] 0/1 knapsack in O(nW) time and O(W) memory (loop direction!).
- [ ] LIS in O(n log n).
- [ ] Edit distance / LCS with path reconstruction.
- [ ] Interval DP: the minimum cost to merge stones / matrix-chain multiplication.
- [ ] Bitmask DP: TSP on n ≤ 20 in O(2ⁿn²).
- [ ] Tree DP: a maximum independent set on a tree.

## Core ideas
- **Recipe:** (1) **state**: what do I need to know about the past? (2) **transition** (3) **base cases** (4) **order** of computation (5) **answer** location. Write the state in words first.
- **Classic families:**
  - **Linear:** Fibonacci-like, max subarray, coin change (count vs. minimize), LIS.
  - **Knapsack:** 0/1 (iterate weight *down*), unbounded (iterate *up*), bounded (binary splitting).
  - **Grid / two-sequence:** paths, LCS, edit distance.
  - **Interval:** dp[l][r], with the split point inside.
  - **Bitmask:** dp[mask][last], subsets, SOS DP.
  - **Tree DP:** dp[v][state] from children. **Rerooting** for "for every root".
  - **Digit DP:** count numbers ≤ N with a property, with state (pos, tight, …).
  - **DP on DAGs** = shortest/longest paths.
- **Optimizations (IOI level):** prefix-sum transitions, monotonic deque, **convex hull trick / Li Chao tree**, divide & conquer DP, Knuth, **"Aliens" trick (Lagrangian relaxation)**, which is famous from IOI 2016.
- **Memory:** rolling arrays. **Reconstruction:** store choices or backtrack through the table.
- **Subtasks often map to DP states:** O(n³) → O(n²) → O(n log n) as the subtasks get harder.

## Learn from
- ⭐ **[AtCoder Educational DP Contest](https://atcoder.jp/contests/dp)**: 26 classic problems A–Z. **Do all of them.**
- ⭐ **[USACO Guide: Gold DP sections](https://usaco.guide/gold)** + **CSES "Dynamic Programming"**.
- **[cp-algorithms: DP](https://cp-algorithms.com/)** (CHT, D&C DP, Knuth) · Errichto's DP videos on YouTube.

## Build
- AtCoder DP contest A–Z + CSES DP section. For each, write the state in one sentence in your progress log.
