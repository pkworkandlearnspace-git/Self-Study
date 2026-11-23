# 03 · Data Structures
> **Goal:** answer queries fast. These structures appear in a large share of IOI tasks. · **Time:** 4–5 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - use **monotonic stacks and deques** for next-greater and sliding-window problems in $O(n)$;
> - use heaps and ordered sets for dynamic problems;
> - implement **DSU** (union–find) with near-constant operations;
> - implement a **Fenwick tree** and a **segment tree with lazy propagation**, and adapt them to new operations;
> - answer static range-min queries in $O(1)$ with a **sparse table**;
> - recognise when to process queries **offline**.

## Skip test
- [ ] Implement DSU with path compression + union by size. Explain its α(n) complexity.
- [ ] Implement a Fenwick tree (BIT) for point update / prefix sum. Explain `i & -i`.
- [ ] Implement a segment tree with **lazy propagation** for range add + range sum.
- [ ] Answer static range-minimum queries in O(1) with a sparse table.
- [ ] Use a monotonic stack to find the next greater element for every index in O(n).
- [ ] Use a sliding-window maximum with a deque.

## 1 · Monotonic stacks and deques

> [!DEF] Monotonic stack
> A stack whose values stay sorted. Each element is pushed and popped at most once, so a full pass is $O(n)$. Use it for "nearest element to the left/right that is greater/smaller", and for the largest rectangle in a histogram.

> [!CODE] Next greater element for every index
> ```cpp
> vector<int> nextGreater(const vector<int>& a) {
>     int n = a.size();
>     vector<int> res(n, -1);       // -1 = no greater element to the right
>     stack<int> s;                 // indices still waiting for their answer
>     for (int i = 0; i < n; i++) {
>         while (!s.empty() && a[s.top()] < a[i]) { res[s.top()] = i; s.pop(); }
>         s.push(i);
>     }
>     return res;
> }
> ```

> [!CODE] Sliding-window maximum with a deque
> ```cpp
> vector<int> windowMax(const vector<int>& a, int k) {
>     deque<int> dq;                // indices; their values are decreasing
>     vector<int> res;
>     for (int i = 0; i < (int)a.size(); i++) {
>         while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();  // can never be the max again
>         dq.push_back(i);
>         if (dq.front() <= i - k) dq.pop_front();                     // left the window
>         if (i >= k - 1) res.push_back(a[dq.front()]);
>     }
>     return res;
> }
> ```

## 2 · Heaps and ordered sets

> [!DEF] When to use which
> - **`priority_queue`:** repeatedly extract the max (or min): k largest elements, merging $k$ sorted lists, event simulation, Dijkstra (module 04).
> - **`set` / `multiset` / `map`:** a sorted collection that changes: find the successor of $x$ (`lower_bound`), erase arbitrary elements, keep a running median with two multisets.
> - **Order statistics** ("the $k$-th smallest", "how many are $<x$"): GNU's policy-based `tree` (`find_by_order`, `order_of_key`) or a Fenwick tree over compressed values.

## 3 · Disjoint set union (union–find)

> [!DEF] DSU
> Maintains a partition of $\{0,\dots,n-1\}$ into groups, with **find** (which group?) and **unite** (merge two groups). Each group is a tree; `find` walks to the root. **Path compression** points nodes straight at the root; **union by size** hangs the smaller tree under the larger. Together: $O(\alpha(n))$ per operation, where the inverse Ackermann function $\alpha(n)\le4$ for any realistic $n$.

> [!CODE] DSU
> ```cpp
> struct DSU {
>     vector<int> p, sz;
>     DSU(int n) : p(n), sz(n, 1) { iota(p.begin(), p.end(), 0); }
>     int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }   // path compression
>     bool unite(int a, int b) {
>         a = find(a); b = find(b);
>         if (a == b) return false;                 // already together
>         if (sz[a] < sz[b]) swap(a, b);
>         p[b] = a; sz[a] += sz[b];                  // union by size
>         return true;
>     }
> };
> ```
> Uses: connectivity as edges are added, Kruskal's MST (module 04), offline problems where deletions become insertions when you reverse time.

## 4 · Fenwick tree (binary indexed tree)

> [!DEF] How it works
> Array `t` is 1-indexed; `t[i]` stores the sum of $a$ over the range $(i-\text{lowbit}(i),\ i]$, where $\text{lowbit}(i)=$ `i & -i` is the value of the lowest set bit (e.g. lowbit(12) = 4, so `t[12]` covers $a_9..a_{12}$). A prefix sum jumps down by removing low bits; an update jumps up by adding them. Both take $O(\log n)$.

> [!CODE] Fenwick tree: point update, prefix sum
> ```cpp
> struct Fenwick {
>     int n; vector<long long> t;
>     Fenwick(int n) : n(n), t(n + 1, 0) {}
>     void add(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }          // a[i] += v
>     long long sum(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }  // a[1..i]
> };
> // range sum a[l..r] = sum(r) - sum(l - 1)
> ```
> Variant: range update + point query by storing a difference array in the Fenwick tree.

## 5 · Segment tree

> [!DEF] Segment tree
> A binary tree over the array: each node stores the answer (sum, min, max, gcd, …) for a segment; its children split the segment in half. Any range $[a,b]$ is covered by $O(\log n)$ nodes, so queries and point updates are $O(\log n)$. It works for any **associative** operation, including custom "merge" functions (e.g. maximum subarray sum: store sum, best prefix, best suffix, best inside).

> [!DEF] Lazy propagation
> For **range updates**, don't update every leaf. Mark a fully covered node with a pending update ("lazy tag") and push it down to the children only when you later need to go inside that node.

> [!CODE] Range add, range sum with lazy propagation
> ```cpp
> struct SegTree {
>     int n; vector<long long> sum, lz;
>     SegTree(int n) : n(n), sum(4 * n, 0), lz(4 * n, 0) {}
>     void apply(int x, int len, long long v) { sum[x] += v * len; lz[x] += v; }
>     void push(int x, int l, int r) {                       // pass the pending add down
>         if (lz[x]) { int m = (l + r) / 2;
>             apply(2 * x, m - l + 1, lz[x]); apply(2 * x + 1, r - m, lz[x]); lz[x] = 0; }
>     }
>     void update(int a, int b, long long v, int x, int l, int r) {   // add v on [a, b]
>         if (b < l || r < a) return;
>         if (a <= l && r <= b) { apply(x, r - l + 1, v); return; }
>         push(x, l, r); int m = (l + r) / 2;
>         update(a, b, v, 2 * x, l, m); update(a, b, v, 2 * x + 1, m + 1, r);
>         sum[x] = sum[2 * x] + sum[2 * x + 1];
>     }
>     long long query(int a, int b, int x, int l, int r) {             // sum on [a, b]
>         if (b < l || r < a) return 0;
>         if (a <= l && r <= b) return sum[x];
>         push(x, l, r); int m = (l + r) / 2;
>         return query(a, b, 2 * x, l, m) + query(a, b, 2 * x + 1, m + 1, r);
>     }
>     void update(int a, int b, long long v) { update(a, b, v, 1, 0, n - 1); }
>     long long query(int a, int b) { return query(a, b, 1, 0, n - 1); }
> };
> ```

> [!TRY] [Segment tree visualizer](interactive/segment-tree.html)
> Run a range update and watch which nodes get a lazy tag and when tags are pushed down during a later query.

> [!KEY] Walking down the tree
> To find "the first index where the prefix sum reaches $k$", descend from the root: go left if the left child's sum is at least $k$, otherwise subtract it and go right. $O(\log n)$ instead of binary search + query ($O(\log^2n)$).

## 6 · Sparse table

> [!FORMULA] $O(1)$ range minimum on a static array
> Precompute $st[k][i]=\min(a_i,\dots,a_{i+2^k-1})$ in $O(n\log n)$. A query $[l,r]$ is covered by two overlapping blocks of length $2^k$, $k=\lfloor\log_2(r-l+1)\rfloor$:
> $$\min(a_l..a_r)=\min\big(st[k][l],\ st[k][r-2^k+1]\big)$$
> Overlap is fine because min is **idempotent** ($\min(x,x)=x$); works for max and gcd, not for sum.

> [!CODE] Sparse table
> ```cpp
> struct Sparse {
>     vector<vector<int>> st;
>     Sparse(const vector<int>& a) {
>         int n = a.size(), K = __lg(n) + 1;
>         st.assign(K, a);
>         for (int k = 1; k < K; k++)
>             for (int i = 0; i + (1 << k) <= n; i++)
>                 st[k][i] = min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
>     }
>     int query(int l, int r) {                     // min on [l, r]
>         int k = __lg(r - l + 1);
>         return min(st[k][l], st[k][r - (1 << k) + 1]);
>     }
> };
> ```

## 7 · Offline techniques and fallbacks

> [!DEF] Offline processing
> If all queries are known in advance, you may answer them in any order: sort queries by position and sweep (a **sweep line**), or **reverse time** so that deletions become insertions (handled by DSU). **Mo's algorithm** answers range queries offline in $O((n+q)\sqrt n)$ by ordering them cleverly. **Square-root decomposition** splits the array into $\sqrt n$ blocks: a flexible fallback when no tree structure fits.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Data structures** deck.

## Practice (answers hidden)

1. Which structure for: (a) range sum with point updates; (b) range min on a static array, $10^6$ queries; (c) "are $u$ and $v$ connected?" as edges are added?
<details><summary>Answer</summary>

(a) Fenwick tree (or segment tree); (b) sparse table, $O(1)$ per query; (c) DSU.
</details>

2. What range does Fenwick's `t[12]` cover, and which indices does `sum(13)` visit?
<details><summary>Answer</summary>

lowbit(12) = 4, so `t[12]` covers $a_9..a_{12}$. `sum(13)` visits 13 (covers 13), 12 (9..12), 8 (1..8).
</details>

3. You need range **assignment** ("set all of $[l,r]$ to $v$") and range sum. What changes in the lazy segment tree?
<details><summary>Answer</summary>

The tag becomes "assign $v$" (with a flag for "no tag"). Applying it sets `sum = v * len` and **overwrites** any older tag instead of adding to it.
</details>

4. Why can't a sparse table answer range **sum** queries in $O(1)$ the same way?
<details><summary>Answer</summary>

The two blocks overlap, so the overlap would be counted twice. Sum isn't idempotent. (Use prefix sums for static sums.)
</details>

5. Edges are deleted from a graph one by one; after each deletion, report the number of connected components. Plan?
<details><summary>Answer</summary>

Offline, reversed: start from the final graph and add the edges back in reverse order with DSU, recording the component count after each addition. Then output the counts in the original order.
</details>

## Build
- Write each structure from memory 3 times on different days. Solve all of CSES *Range Queries*.

## Go deeper (all optional)
- ⭐ **[USACO Guide: Silver → Gold](https://usaco.guide/)**: DSU, prefix sums, Fenwick/segment trees.
- ⭐ **[Codeforces EDU: Segment Tree (parts 1–2)](https://codeforces.com/edu/courses)**: lectures + graded practice.
- **[cp-algorithms: Data structures](https://cp-algorithms.com/)**: segment tree, Fenwick, DSU, sparse table.
- **[CSES](https://cses.fi/problemset/): "Range Queries"** section.

## Done when
- [ ] Each structure written from memory 3 times · [ ] CSES Range Queries done
