# 02 · Complexity & Core Techniques
> **Goal:** read the constraints, infer the target complexity, and use the standard techniques. · **Time:** 3–4 weeks

## Skip test
- [ ] Given n ≤ 2·10⁵, name an acceptable complexity and an unacceptable one.
- [ ] Binary search on the answer: minimum maximum load when splitting an array into k parts.
- [ ] Two pointers: the longest subarray with sum ≤ S (positive numbers).
- [ ] Prefix sums + difference arrays: apply q range-add updates, then print the array, in O(n + q).
- [ ] Prove a greedy algorithm correct with an exchange argument (e.g. activity selection).
- [ ] Generate all subsets of n ≤ 20 elements with bitmasks.

## Core ideas
- **The constraints → complexity table** (≈ 10⁸ simple ops/second):

  | n | target |
  |---|---|
  | ≤ 10–12 | O(n!) |
  | ≤ 20–25 | O(2ⁿ · n) |
  | ≤ 500 | O(n³) |
  | ≤ 5000 | O(n²) |
  | ≤ 10⁶ | O(n log n) |
  | ≤ 10⁸ or larger | O(n), O(log n), O(1) math |
- **Sorting** + custom comparators. Coordinate compression.
- **Binary search:** on sorted arrays, and **on the answer** (a monotone predicate "is x feasible?"). Write it the same way every time (`lo` always bad, `hi` always good).
- **Two pointers / sliding window:** when moving the right end only ever moves the left end forward.
- **Prefix sums** (1D/2D), **difference arrays**, prefix XOR/min.
- **Greedy:** sort by the right key and prove it with an **exchange argument**. If you can't prove it, stress-test it.
- **Complete search / backtracking** with pruning. **Meet in the middle** for n ≈ 40.
- **Bit manipulation:** subsets, `x & -x`, XOR tricks.
- **Subtask thinking:** brute force for small n is free points. Always submit it first.

## Learn from
- ⭐ **[USACO Guide: Bronze → Silver](https://usaco.guide/)**: complete search, sorting, binary search, two pointers, prefix sums, greedy.
- ⭐ **[CSES Problem Set](https://cses.fi/problemset/)**: "Introductory Problems" and "Sorting and Searching" (do all ~45).
- **Competitive Programmer's Handbook**, ch. 5–8.

## Build
- Finish CSES *Introductory* + *Sorting and Searching*. Track the time per problem.
