# 07 · IOI Skills & Advanced Topics
> **Goal:** convert knowledge into IOI points, and learn the advanced techniques that separate medal colors. · **Time:** ongoing

> [!GOAL]
> By the end of this chapter you can:
>
> - plan a 5-hour IOI day to **maximise points** across three tasks;
> - use subtasks as hints toward the full solution;
> - handle the special task types: interactive, communication, output-only, constructive;
> - know what each advanced technique does and when it applies (HLD, centroid decomposition, small-to-large, persistent structures, parallel binary search, Mo's algorithm, flows);
> - run realistic contest simulations and learn from them.

## 1 · How the IOI works

> [!DEF] The format
> Two contest days, **three tasks per day, 5 hours each**. Each task is worth 100 points split into **subtasks**; a subtask's points are awarded only if your solution passes **all** of its tests. You get feedback on your submissions during the contest, and the score for a task is computed from your best results per subtask (rules evolve; read the current year's regulations). Roughly half of the contestants receive medals, in a gold : silver : bronze ratio of about $1:2:3$.

> [!DEF] Task types
> - **Batch:** implement a function; the grader calls it (module 01).
> - **Interactive:** your code asks questions and gets answers; scoring often depends on the **number of queries**. Think in terms of information: each yes/no answer is one bit.
> - **Communication:** two programs (e.g. an encoder and a decoder) exchange limited information.
> - **Output-only:** you are given the inputs and submit outputs; any method (even hand or heuristic search) is allowed.
> - **Constructive:** build an object with given properties; the proof that it exists is the solution.

## 2 · Contest strategy

> [!KEY] The 5-hour plan
> 1. **First 20–30 minutes:** read **all three** tasks fully. Note every subtask, its constraints and points.
> 2. **Bank points:** implement the easy subtasks of *every* task before going deep on one. Three times 40 points beats one 100.
> 3. **Then go deep** on the task where the next subtask is nearest; re-evaluate every hour.
> 4. **Last 30 minutes:** no risky rewrites; make sure your best submissions are in.

> [!KEY] Subtasks are hints
> "$n\le1000$" suggests an $O(n^2)$ idea that the full solution speeds up; "the tree is a line" asks you to solve the array version first; "all values distinct" removes an annoying case. Solve the subtasks in an order that builds the full idea.

> [!KEY] Think before coding, verify before trusting
> Write down the algorithm and its complexity before typing. Keep the **brute force** from the small subtask: it's your stress-test reference (module 01). Don't delete working code; save versions.

> [!EXAMPLE] A realistic day
> Task A: brute force for subtask 1 (10 pts, 15 min), $O(n^2)$ for subtask 2 (25 pts, 30 min). Task B: subtask 1 by hand-made case analysis (8 pts). Task C: simple greedy for subtask 1 (12 pts). That's 55 points after ~1.5 hours, then 3.5 hours to push the most promising task. Many medals are decided by these "boring" early points.

## 3 · Advanced techniques (learn after modules 01–06)

> [!DEF] Trees
> - **Heavy-light decomposition (HLD):** split a tree into $O(\log n)$ chains per root-to-leaf path, so path queries become $O(\log n)$ segment-tree range queries ($O(\log^2n)$ total).
> - **Centroid decomposition:** the **centroid** (a vertex whose removal leaves components of size $\le n/2$) splits the tree; recursing gives depth $O(\log n)$. Every path passes through the centroid of some level, so "count paths with property X" becomes $O(n\log n)$ or $O(n\log^2n)$.
> - **Small-to-large merging (DSU on tree):** merge children's data structures into the largest one; each element moves $O(\log n)$ times.
> - **Virtual (auxiliary) trees:** compress a tree to a set of $k$ important vertices and their LCAs, size $O(k)$.

> [!DEF] Data structures
> - **Persistent segment tree:** every update creates $O(\log n)$ new nodes and keeps old versions, e.g. "k-th smallest in a range".
> - **Li Chao tree:** insert lines, query the minimum at a point (convex hull trick, module 05).
> - **Merge-sort tree:** each segment-tree node stores its sorted elements; counts "values $\le x$ in a range".
> - **Parallel binary search:** binary search the answer for many queries at once, sharing one sweep per round.
> - **Offline divide & conquer (CDQ):** split by time, let the first half's updates answer the second half's queries.

> [!DEF] Square-root techniques
> Split into $\sqrt n$ blocks, handle "heavy" and "light" cases with different methods (e.g. vertices with degree $>\sqrt m$), or use **Mo's algorithm** to answer range queries offline by moving two pointers in a clever order: $O((n+q)\sqrt n)$.

> [!DEF] Graphs
> **Max flow / min cut** (Dinic) and **bipartite matching** are rarer at IOI but appear in national olympiads; **bridges** and **2-edge-connected components** from DFS low-link values; Euler tours for "use every edge once".

> [!DEF] DP optimisations
> Convex hull trick, divide & conquer optimisation, Knuth, the **Aliens trick**, DP over profiles (broken-profile DP for grid tilings), SOS DP (module 05).

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **IOI** and **Patterns** decks.

## 4 · Training plan

> [!KEY] Practise the real thing
> - **Past IOI tasks on [oj.uz](https://oj.uz/problems)**, judged with subtasks, plus regional olympiads (APIO, BOI, CEOI, JOI).
> - **Full simulations:** 3 past-IOI tasks, 5 hours, scored by subtasks. Log the score of each task and what you'd do differently.
> - **Regular contests** on Codeforces and AtCoder for speed and variety.
> - **Upsolving:** after every contest, solve the tasks you couldn't, with the editorial if needed, then rewrite the solution yourself the next day.

## Practice (answers hidden)

1. Three tasks; you can see quick subtasks worth 20, 15 and 30 points, and a full solution to task A that would take 3 hours. What order?
<details><summary>Answer</summary>

Take all three quick subtasks first (65 points banked, low risk), then spend the remaining time on task A's full solution, re-checking progress hourly.
</details>

2. An interactive task asks you to find a hidden number in $[1,10^6]$ with yes/no questions "is it $\ge x$?". How many queries do you need, and why can't you do better?
<details><summary>Answer</summary>

Binary search: $\lceil\log_2 10^6\rceil=20$ queries. Each answer gives at most one bit, and $10^6$ possibilities need $\log_2 10^6\approx19.9$ bits, so 20 is optimal.
</details>

3. You need the sum of values on the path between two vertices, with value updates, $n,q\le2\times10^5$. Which technique?
<details><summary>Answer</summary>

Heavy-light decomposition with a segment tree (or a Fenwick tree on the Euler tour for the special case of vertex-to-root sums). $O(\log^2n)$ per query.
</details>

4. Count pairs of vertices in a tree at distance exactly $k$. Which technique?
<details><summary>Answer</summary>

Centroid decomposition: at each centroid, count pairs in different subtrees whose depths sum to $k$ with an array of depth counts. $O(n\log n)$.
</details>

## Build
- Simulate full IOI days: 3 past-IOI problems, 5 h, scored by subtasks on oj.uz. Log the scores.

## Go deeper (all optional)
- ⭐ **Past IOI problems on [oj.uz](https://oj.uz/problems)** (judged with subtasks) plus past **national/regional olympiads** (APIO, BOI, CEOI, JOI). The best practice material.
- ⭐ **[USACO Guide: Platinum & Advanced](https://usaco.guide/plat)**.
- **[IOI official site](https://ioinformatics.org/)**: the syllabus, past tasks, and solutions.
- **[Codeforces](https://codeforces.com/)** (Div 1/2) and **[AtCoder](https://atcoder.jp/)** (ARC/AGC) for contest practice.

## Done when
- [ ] 5 full IOI-day simulations logged · [ ] at least 3 advanced techniques implemented and tested
