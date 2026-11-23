# 05 · Dynamic Programming
> **Goal:** IOI's favorite topic. Define states well, then optimize. · **Time:** 5–7 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - design a DP from scratch with the five-step recipe (state, transition, base, order, answer);
> - solve the classic families: linear, **knapsack**, **LIS**, two-sequence (**LCS, edit distance**), **interval**, **bitmask**, **tree** and digit DP;
> - reconstruct the optimal solution, not just its value, and save memory with rolling arrays;
> - recognise when a transition can be sped up (prefix sums, monotonic deque, convex hull trick, divide & conquer, Aliens trick).

## Skip test
- [ ] 0/1 knapsack in O(nW) time and O(W) memory (loop direction!).
- [ ] LIS in O(n log n).
- [ ] Edit distance / LCS with path reconstruction.
- [ ] Interval DP: the minimum cost to merge stones / matrix-chain multiplication.
- [ ] Bitmask DP: TSP on n ≤ 20 in O(2ⁿn²).
- [ ] Tree DP: a maximum independent set on a tree.

## 1 · What dynamic programming is

> [!DEF] Dynamic programming
> Solve a problem by combining answers to **overlapping subproblems**, computing each subproblem **once** and storing it. It applies when the problem has **optimal substructure**: the best solution is built from best solutions of smaller instances. Naive recursion would recompute the same subproblems exponentially often.

> [!KEY] The five-step recipe
> 1. **State:** what do I need to know about the past to decide the future? Write it in words: "`dp[i][w]` = best value using the first $i$ items with capacity $w$".
> 2. **Transition:** how is a state computed from smaller ones?
> 3. **Base cases.**
> 4. **Order:** compute states so that dependencies come first (or use memoised recursion).
> 5. **Answer:** which state(s) hold the final answer?
>
> Complexity ≈ (number of states) × (cost per transition).

> [!EXAMPLE] Counting paths in a grid
> Number of monotone (right/down) paths from the top-left to $(i,j)$ avoiding blocked cells: `dp[i][j] = dp[i-1][j] + dp[i][j-1]` (0 on blocked cells), `dp[0][0] = 1`. Fill row by row. $O(RC)$.

> [!TRY] [DP table animator](interactive/dp-table.html)
> Watch LCS, edit distance and knapsack tables fill cell by cell, and follow the arrows back to reconstruct the answer.

## 2 · Linear DP and knapsack

> [!DEF] Linear DP classics
> - **Maximum subarray (Kadane):** `cur = max(a[i], cur + a[i])`, answer = max of `cur`.
> - **Coin change:** *minimum coins* `dp[x] = 1 + min(dp[x - c])`; *number of ways (order doesn't matter)*: loop over coins outside, amounts inside: `dp[x] += dp[x - c]`.
> - **Climbing stairs / tilings:** Fibonacci-like recurrences.

> [!CODE] 0/1 knapsack in $O(nW)$ time, $O(W)$ memory
> ```cpp
> int knapsack(const vector<int>& w, const vector<int>& v, int W) {
>     vector<int> dp(W + 1, 0);                 // dp[c] = best value with capacity c
>     for (int i = 0; i < (int)w.size(); i++)
>         for (int c = W; c >= w[i]; c--)       // DOWNWARDS: each item used at most once
>             dp[c] = max(dp[c], dp[c - w[i]] + v[i]);
>     return dp[W];
> }
> ```
> Looping **upwards** instead lets an item be reused: that is the **unbounded** knapsack. Bounded counts (item $i$ available $k_i$ times): split into pieces of sizes 1, 2, 4, …, so $O(nW\log k)$.

> [!CODE] Longest increasing subsequence in $O(n\log n)$
> ```cpp
> int lis(const vector<int>& a) {               // strictly increasing
>     vector<int> tails;   // tails[k] = smallest possible last element of an increasing subsequence of length k+1
>     for (int x : a) {
>         auto it = lower_bound(tails.begin(), tails.end(), x);   // upper_bound for non-decreasing
>         if (it == tails.end()) tails.push_back(x); else *it = x;
>     }
>     return tails.size();
> }
> ```
> `tails` is always sorted, so each element costs one binary search. (The $O(n^2)$ version `dp[i] = 1 + max(dp[j])` over $j<i$, $a_j<a_i$ is also worth knowing.)

## 3 · Two-sequence and grid DP

> [!FORMULA] LCS and edit distance
> **Longest common subsequence:** `dp[i][j]` = LCS of the prefixes $s_{1..i}$, $t_{1..j}$:
> $dp[i][j]=dp[i-1][j-1]+1$ if $s_i=t_j$, else $\max(dp[i-1][j],dp[i][j-1])$.
>
> **Edit distance** (insert, delete, replace, each cost 1):
> $$dp[i][j]=\min\big(dp[i-1][j]+1,\ dp[i][j-1]+1,\ dp[i-1][j-1]+[s_i\ne t_j]\big)$$
> with $dp[i][0]=i$, $dp[0][j]=j$. Both $O(nm)$. *Example:* "kitten" → "sitting" has distance 3.

> [!CODE] LCS with reconstruction
> ```cpp
> string lcs(const string& s, const string& t) {
>     int n = s.size(), m = t.size();
>     vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
>     for (int i = 1; i <= n; i++) for (int j = 1; j <= m; j++)
>         dp[i][j] = s[i-1] == t[j-1] ? dp[i-1][j-1] + 1 : max(dp[i-1][j], dp[i][j-1]);
>     string r; int i = n, j = m;                       // walk back from the end
>     while (i > 0 && j > 0) {
>         if (s[i-1] == t[j-1]) { r += s[i-1]; i--; j--; }
>         else if (dp[i-1][j] >= dp[i][j-1]) i--;
>         else j--;
>     }
>     reverse(r.begin(), r.end());
>     return r;                                         // e.g. "ABCBDAB","BDCABA" -> "BCBA"
> }
> ```

## 4 · Interval DP

> [!DEF] Interval DP
> State `dp[l][r]` = the best answer for the segment $l..r$; the transition chooses a **split point** $k$ inside. Compute by increasing length. Usually $O(n^3)$.

> [!EXAMPLE] Merging stones
> Merging two adjacent piles costs their total size; find the cheapest way to merge everything into one pile. The last merge joins $[l,k]$ and $[k+1,r]$ and costs the whole segment's sum:
> $$dp[l][r]=\min_{l\le k<r}\big(dp[l][k]+dp[k+1][r]\big)+\text{sum}(l..r)$$
> with prefix sums for the segment sum. *Example:* piles 1, 2, 3: merge 1+2 (cost 3), then 3+3 (cost 6): total **9**. Matrix-chain multiplication has the same structure.

## 5 · Bitmask DP

> [!DEF] DP over subsets
> When $n\le20$, a subset fits in an integer mask, and states like `dp[mask][last]` are affordable ($2^{20}\cdot20\approx2\times10^7$).

> [!CODE] Travelling salesman in $O(2^nn^2)$
> ```cpp
> int tsp(const vector<vector<int>>& d) {             // shortest tour starting and ending at 0
>     int n = d.size(), FULL = 1 << n; const int INF = 1e9;
>     vector<vector<int>> dp(FULL, vector<int>(n, INF));  // dp[mask][last]
>     dp[1][0] = 0;                                    // visited {0}, standing at 0
>     for (int mask = 1; mask < FULL; mask++)
>         for (int last = 0; last < n; last++) {
>             if (dp[mask][last] == INF) continue;
>             for (int nx = 0; nx < n; nx++) if (!(mask >> nx & 1))
>                 dp[mask | 1 << nx][nx] = min(dp[mask | 1 << nx][nx], dp[mask][last] + d[last][nx]);
>         }
>     int best = INF;
>     for (int last = 1; last < n; last++) best = min(best, dp[FULL - 1][last] + d[last][0]);
>     return best;
> }
> ```
> **SOS DP** (sum over subsets) computes, for every mask, the sum of values over all its submasks in $O(2^nn)$.

## 6 · Tree DP and digit DP

> [!EXAMPLE] Maximum independent set on a tree
> Choose the most vertices with no two adjacent. For each vertex $v$: `take[v] = 1 + Σ skip[c]` and `skip[v] = Σ max(take[c], skip[c])` over its children $c$. Answer $\max(\text{take}[root],\text{skip}[root])$. Process vertices children-first (reverse DFS order). $O(n)$.

> [!DEF] Rerooting
> To get the answer "for every vertex as the root", do one DFS for the children's contributions and a second DFS that passes the "everything outside my subtree" contribution from parent to child. $O(n)$ instead of $O(n^2)$.

> [!DEF] Digit DP
> Count numbers in $[0,N]$ with some digit property. Process digits from the most significant, with state (position, **tight** = "still equal to $N$'s prefix", extra info such as digit sum mod $k$). Answer for $[A,B]$ = $f(B)-f(A-1)$.

## 7 · Speeding up transitions

> [!DEF] Optimization toolbox (IOI level)
> | Transition looks like | Technique | Speed-up |
> |---|---|---|
> | sum over a range of previous states | prefix sums | $O(n)$ → $O(1)$ |
> | min/max over a sliding window | monotonic deque | $O(n)$ → $O(1)$ amortised |
> | $\min_j(dp_j+b_j\cdot x_i)$ (lines!) | **convex hull trick** / Li Chao tree | $O(n)$ → $O(\log n)$ |
> | optimal split point is monotone | divide & conquer DP, Knuth | $O(n^2)$ → $O(n\log n)$ per layer |
> | "use exactly $k$ items" | **Aliens trick** (Lagrangian relaxation: add a penalty per item, binary search the penalty) | removes the $k$ dimension |
>
> The Aliens trick is named after IOI 2016's "Aliens" task.

> [!KEY] Subtasks mirror the DP
> IOI subtasks often go $O(n^3)$ → $O(n^2)$ → $O(n\log n)$. Write the slow DP first (points!), then look at its transition and ask which row above applies.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **DP** deck.

## Practice (answers hidden)

1. Number of ways to make 10 with coins $\{1,2,5\}$ (order doesn't matter)?
<details><summary>Answer</summary>

Loop coins outside: after coin 1: all 1s; after 2: `dp[10] = 6`; after 5: `dp[10] = 10`. Answer **10**.
</details>

2. LIS of $3, 1, 4, 1, 5, 9, 2, 6$?
<details><summary>Answer</summary>

Length 4, e.g. $1,4,5,9$ or $3,4,5,6$. The `tails` array ends as $[1,2,5,6]$.
</details>

3. Why does 0/1 knapsack loop capacity **downwards** in the 1-D version?
<details><summary>Answer</summary>

So that `dp[c - w[i]]` still holds the value from **before** item $i$ was considered. Going upwards, `dp[c - w[i]]` may already include item $i$, allowing it twice.
</details>

4. State a DP for: "the minimum number of palindromes a string can be cut into".
<details><summary>Answer</summary>

`dp[i]` = min cuts for the prefix of length $i$; `dp[i] = min(dp[j] + 1)` over $j<i$ with $s_{j..i-1}$ a palindrome. Precompute `pal[l][r]` by interval DP. $O(n^2)$.
</details>

5. Edit distance between "sunday" and "saturday"?
<details><summary>Answer</summary>

3 (insert "a", insert "t", replace "n" by "r").
</details>

## Build
- AtCoder DP contest A–Z + CSES DP section. For each, write the state in one sentence in your progress log.

## Go deeper (all optional)
- ⭐ **[AtCoder Educational DP Contest](https://atcoder.jp/contests/dp)**: 26 classic problems A–Z. **Do all of them.**
- ⭐ **[USACO Guide: Gold DP sections](https://usaco.guide/gold)** + **[CSES](https://cses.fi/problemset/) "Dynamic Programming"**.
- **[cp-algorithms: DP](https://cp-algorithms.com/)** (CHT, D&C DP, Knuth) · Errichto's DP videos on YouTube.

## Done when
- [ ] AtCoder DP A–Z done · [ ] each state written in one sentence in your log
