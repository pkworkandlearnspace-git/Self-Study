# 01 · C++ for Competitive Programming
> **Goal:** turn your STL knowledge into contest speed. · **Time:** ~1 week

## Skip test
- [ ] Write a template with fast I/O, `long long` aliases, and a multi-test-case loop.
- [ ] Sort a `vector<pair<int,int>>` by second element descending with a lambda.
- [ ] Use `lower_bound` on a sorted vector and on a `set`, and explain the complexity difference vs `std::lower_bound(set.begin(), …)`.
- [ ] Explain when `int` overflows (≈ 2.1 × 10⁹) and when to use `long long`.
- [ ] Write a **stress test**: brute force vs fast solution on random inputs, stopping at the first mismatch.

## Core ideas
- **Template:**
  ```cpp
  #include <bits/stdc++.h>
  using namespace std;
  using ll = long long;
  int main() {
      ios::sync_with_stdio(false); cin.tie(nullptr);
      int t = 1; // cin >> t;
      while (t--) { /* solve */ }
  }
  ```
- **STL you'll use constantly:** `vector`, `array`, `pair`/`tuple`, `sort` with a custom comparator, `lower_bound`/`upper_bound`, `set`/`multiset`/`map` (O(log n)), `unordered_map` (beware anti-hash tests), `priority_queue` (max-heap by default; use `greater<>` for a min-heap), `deque`, `bitset`, `__builtin_popcount`, `iota`, `accumulate`, `next_permutation`.
- **Overflow:** products of two ints ≤ 10⁹ need `ll`. Use `1LL * a * b`.
- **Debugging:** compile with `-Wall -Wextra -fsanitize=address,undefined -D_GLIBCXX_DEBUG` locally. Print-debug to `cerr`.
- **Stress testing:** a random generator + a brute force + a diff loop. This finds most wrong-answer bugs, and at IOI you have time to do it.
- **IOI specifics:** problems often require implementing a **function** (no `main`). Practice that format on oj.uz / past IOI tasks.

## Learn from
- ⭐ **[USACO Guide: General & Bronze](https://usaco.guide/general)**: setup, C++ basics for CP, debugging, and stress testing.
- **[Competitive Programmer's Handbook](https://cses.fi/book/book.pdf)** (Laaksonen), ch. 1–4.
- **[cppreference](https://en.cppreference.com/)** for exact STL semantics.

## Build
- Your personal template + a `stress.sh` script (generator, brute, solution, compare). Keep both in a repo.
