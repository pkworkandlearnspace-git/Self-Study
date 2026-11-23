# 02 · Complexity & Core Techniques
> **Goal:** read the constraints, infer the target complexity, and use the standard techniques. · **Time:** 3–4 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - estimate running time with **big-O** and turn the input limits into a target complexity;
> - use **sorting**, **binary search** (including binary search on the answer) and **two pointers**;
> - precompute **prefix sums** and **difference arrays**;
> - design **greedy** algorithms and prove them with an exchange argument;
> - search exhaustively with bitmasks, backtracking and meet-in-the-middle;
> - collect **subtask** points before solving the full problem.

## Skip test
- [ ] Given n ≤ 2·10⁵, name an acceptable complexity and an unacceptable one.
- [ ] Binary search on the answer: minimum maximum load when splitting an array into k parts.
- [ ] Two pointers: the longest subarray with sum ≤ S (positive numbers).
- [ ] Prefix sums + difference arrays: apply q range-add updates, then print the array, in O(n + q).
- [ ] Prove a greedy algorithm correct with an exchange argument (e.g. activity selection).
- [ ] Generate all subsets of n ≤ 20 elements with bitmasks.

## 1 · Complexity and the constraints table

> [!DEF] Big-O
> $f(n)=O(g(n))$ means $f$ grows at most like $g$ up to a constant factor. We count basic operations as a function of the input size $n$ and keep only the dominant term: $3n^2+100n\log n=O(n^2)$.

> [!FORMULA] From constraints to target complexity
> A judge does roughly $10^8$ simple operations per second. Typical limits (1–2 s):
>
> | $n$ up to | Target complexity |
> |---|---|
> | 10–12 | $O(n!)$ |
> | 20–25 | $O(2^n\cdot n)$ |
> | 40 | $O(2^{n/2})$ (meet in the middle) |
> | 500 | $O(n^3)$ |
> | 5000 | $O(n^2)$ |
> | $2\times10^5$ – $10^6$ | $O(n\log n)$ or $O(n)$ |
> | $10^{9}$ and more | $O(\log n)$, $O(\sqrt n)$ or a formula |
>
> *Example:* $n\le2\times10^5$: $O(n\log n)\approx3.6\times10^6$ ✓; $O(n^2)=4\times10^{10}$ ✗.

> [!KEY] Read the constraints first
> The limits tell you the intended algorithm before you've thought about the problem. Each **subtask's** limits tell you which slower algorithms still earn points.

## 2 · Sorting and binary search

> [!DEF] Sorting tricks
> Sorting costs $O(n\log n)$ and often makes the rest easy: duplicates become adjacent, greedy orders appear, two pointers become possible. **Coordinate compression:** replace values by their rank in the sorted list of distinct values, so huge values (up to $10^9$) can index an array of size $n$.

> [!KEY] Binary search on the answer
> If a predicate "is $x$ good enough?" is **monotone** (false…false, true…true), binary search finds the boundary in $O(\log(\text{range}))$ checks. Keep one invariant and never think about `+1`: **`lo` is always bad, `hi` is always good**, loop while `hi - lo > 1`.

> [!EXAMPLE] Split an array into $k$ parts minimising the largest part sum
> "Can every part have sum $\le cap$?" is monotone in $cap$, and a greedy pass (start a new part when the next element doesn't fit) checks it in $O(n)$.
> ```cpp
> bool feasible(const vector<ll>& a, int k, ll cap) {
>     int parts = 1; ll cur = 0;
>     for (ll x : a) {
>         if (x > cap) return false;
>         if (cur + x > cap) { parts++; cur = 0; }
>         cur += x;
>     }
>     return parts <= k;
> }
> ll minMaxSplit(const vector<ll>& a, int k) {
>     ll lo = 0, hi = accumulate(a.begin(), a.end(), 0LL);   // lo infeasible, hi feasible
>     while (hi - lo > 1) {
>         ll mid = lo + (hi - lo) / 2;
>         if (feasible(a, k, mid)) hi = mid; else lo = mid;
>     }
>     return hi;
> }
> ```
> Total $O(n\log\sum a)$. (Assumes positive values; with $cap=0$ never feasible for them.)

> [!VIDEO] GU7DpgHINWQ | Binary search lecture | Errichto · 30 min. How to stop guessing about +1.

## 3 · Two pointers and sliding windows

> [!DEF] Two pointers
> Keep a window $[l, r]$. When moving the right end forward can only ever move the left end forward too, both pointers travel at most $n$ steps: $O(n)$ total instead of $O(n^2)$.

> [!EXAMPLE] Longest subarray with sum $\le S$ (positive numbers)
> ```cpp
> int longestSubarray(const vector<ll>& a, ll S) {
>     int best = 0; ll sum = 0;
>     for (int l = 0, r = 0; r < (int)a.size(); r++) {
>         sum += a[r];
>         while (sum > S) sum -= a[l++];     // shrink until valid again
>         best = max(best, r - l + 1);
>     }
>     return best;
> }
> ```
> It works because all numbers are positive: extending the window never makes the sum smaller.

## 4 · Prefix sums and difference arrays

> [!FORMULA] Prefix sums
> $p_0=0$, $p_i=a_1+\dots+a_i$. Then any range sum is $a_l+\dots+a_r=p_r-p_{l-1}$ in $O(1)$. **2D:** $P_{i,j}$ = sum of the rectangle from $(1,1)$ to $(i,j)$, and a sub-rectangle sum uses inclusion–exclusion: $P_{x_2,y_2}-P_{x_1-1,y_2}-P_{x_2,y_1-1}+P_{x_1-1,y_1-1}$.

> [!FORMULA] Difference arrays (many range updates, read at the end)
> To add $v$ to $a_l..a_r$: `d[l] += v; d[r+1] -= v;`. After all $q$ updates, the prefix sums of `d` give the final array. Total $O(n+q)$.

> [!EXAMPLE] Range additions
> $n=5$, all zeros; add 2 to $[1,3]$ and 5 to $[2,5]$. `d` = [2, 5, 0, −2, 0, −5] (indices 1–6). Prefix sums: 2, 7, 7, 5, 5 ✓.

## 5 · Greedy algorithms

> [!DEF] Greedy and the exchange argument
> A greedy algorithm makes the locally best choice at each step. To prove it optimal: take any optimal solution that differs from the greedy one at the first step, and show you can **exchange** its choice for the greedy choice without making it worse. Repeating this transforms it into the greedy solution.

> [!EXAMPLE] Activity selection
> Choose the maximum number of non-overlapping intervals. **Greedy:** sort by **end time**, repeatedly take the first interval that starts after the last chosen one ends.
> *Proof:* let the greedy's first choice $g$ have the earliest end. Any optimal solution's first interval $o$ ends no earlier than $g$, so replacing $o$ by $g$ keeps everything disjoint and the count unchanged. Repeat on the remaining intervals. ∎ (Sorting by start time or by length is **wrong**; find counterexamples.)

> [!WARN] Greedy that "feels right"
> Many plausible greedy algorithms are wrong. If you can't prove it, **stress-test it** against a brute force (module 01) before trusting it.

## 6 · Complete search

> [!CODE] All subsets with bitmasks ($n\le20$)
> ```cpp
> for (int mask = 0; mask < (1 << n); mask++) {
>     long long sum = 0;
>     for (int i = 0; i < n; i++)
>         if (mask >> i & 1) sum += a[i];        // is element i in the subset?
>     // use the subset
> }
> ```
> Bit tricks: `x & -x` is the lowest set bit; `x & (x - 1)` clears it; `__builtin_popcount(x)` counts members.

> [!DEF] Backtracking and meet in the middle
> **Backtracking** builds a solution step by step and abandons a branch as soon as it can't succeed (pruning). **Meet in the middle** ($n\approx40$): split the items into two halves, enumerate the $2^{n/2}$ subset sums of each, sort one list and binary-search (or two-pointer) for complements: $O(2^{n/2}\cdot n)$ instead of $O(2^n)$.

## 7 · Subtasks

> [!KEY] Points first, elegance later
> IOI problems are split into subtasks (small $n$, special structure). A brute force for the smallest subtask is often worth 10–20 points and takes minutes. **Submit it first**: it banks points and gives you a reference for stress-testing the full solution.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Constraints** and **Patterns** decks.

## Practice (answers hidden)

1. $n\le5000$, and your algorithm is $O(n^2\log n)$. Will it pass in 1 s?
<details><summary>Answer</summary>

$2.5\times10^7\cdot12\approx3\times10^8$ operations: borderline. With a small constant (simple loops) maybe; it's safer to remove the $\log$.
</details>

2. Find the smallest integer $x$ with $x^2\ge N$ for $N$ up to $10^{18}$, using binary search. What are good initial `lo`, `hi`?
<details><summary>Answer</summary>

For $1\le N\le10^{18}$: `lo = 0` is bad ($0<N$) and `hi = 1e9` is good ($10^{18}\ge N$). Every `mid` is at most $10^9$, so `mid * mid` fits in `long long`. Loop `while (hi - lo > 1)`, test `mid * mid >= N`, and keep `lo` bad, `hi` good; the answer is `hi`.
</details>

3. Count pairs $i<j$ with $a_i+a_j\le S$ in $O(n\log n)$.
<details><summary>Answer</summary>

Sort. Two pointers: `l = 0, r = n-1`; if `a[l] + a[r] <= S` then all pairs `(l, l+1..r)` work: add `r - l`, `l++`; else `r--`.
</details>

4. Why is "sort jobs by length, take shortest first" optimal for minimising the **sum of completion times** on one machine?
<details><summary>Answer</summary>

Exchange argument: if a longer job $A$ comes right before a shorter job $B$, swapping them lowers $B$'s completion time by $|A|$ and raises $A$'s by $|B|<|A|$, so the total drops. So an optimal order has no such inversion: it's sorted by length.
</details>

5. $q$ queries ask for the sum of a sub-rectangle of a $1000\times1000$ grid. Plan?
<details><summary>Answer</summary>

Build the 2D prefix-sum table in $O(10^6)$, then answer each query in $O(1)$ with inclusion–exclusion.
</details>

## Build
- Finish CSES *Introductory* + *Sorting and Searching*. Track the time per problem.

## Go deeper (all optional)
- ⭐ **[USACO Guide: Bronze → Silver](https://usaco.guide/)**: complete search, sorting, binary search, two pointers, prefix sums, greedy.
- ⭐ **[CSES Problem Set](https://cses.fi/problemset/)**: "Introductory Problems" and "Sorting and Searching" (do all ~45).
- **[Competitive Programmer's Handbook](https://cses.fi/book/book.pdf)**, ch. 5–8.

## Done when
- [ ] CSES Introductory + Sorting and Searching done · [ ] you write binary search without off-by-one errors
