# Informatics Olympiad: School/Regional → National → IOI

**Starting point:** you've passed school/regional rounds and know C++ and the STL.
**Target:** national team selection, then IOI-level algorithms.

## ⚠️ Read first: eligibility and format
*(Checked against the [IOI Regulations](https://ioinformatics.org/files/regulations24.pdf) §2.5 and the [IOI 2026 contest rules](https://www.ioi2026.uz/contest-rules), Nov 2026.)*
- **Eligibility:** you must be **not older than 20 on 1 July** of the IOI year, and have been enrolled in **secondary school (or lower) for most of 1 Sep–31 Dec of the year before** that IOI (and not in a degree programme at half-time or more). So a senior graduating in mid-2027 is usually **still eligible for IOI 2027** (Germany). Check your national selection dates now.
- **Recent and upcoming IOIs:** IOI 2026 was held in Tashkent, Uzbekistan (9–16 Aug 2026). IOI 2027 is in Germany. See [ioinformatics.org](https://ioinformatics.org/).
- **IOI format:** **2 contest days × 3 tasks × 5 hours**, 100 points per task, split into **subtasks**. The only language is **C++**.
- **Scoring:** for each subtask, IOI takes **your best result over all submissions**. You can solve subtask 1 in one submission and subtask 3 in another, and both count. You get up to **50 submissions per task**, at most one per minute (that limit is lifted in the last 15 minutes).
- **Feedback:** you see your score for every subtask. For a subtask you failed, you see only the **first lowest-scoring test** and a verdict (WA / TLE / …). You don't see the full test list.
- **Medals:** about **1/12 gold, 1/6 silver, 1/4 bronze**. In total, about half the contestants get a medal (IOI 2026: 31 / 62 / 94 of 375, per [IOI stats](https://stats.ioinformatics.org/olympiads/2026)).
- Partial scoring changes strategy: **collecting subtasks across all problems usually beats sinking 5 h into one full solution.**

## The map

| # | Module | Time | You can… |
|---|---|---|---|
| 01 | [C++ for competitive programming](01-cpp-for-cp.md) | 1 wk | fast I/O, STL fluency, templates, debugging, stress testing |
| 02 | [Complexity & core techniques](02-core-techniques.md) | 3–4 wk | choose an algorithm from the constraints; binary search, two pointers, prefix sums, greedy |
| 03 | [Data structures](03-data-structures.md) | 4–5 wk | DSU, Fenwick tree, segment tree (lazy), sparse table, monotonic stack |
| 04 | [Graphs & trees](04-graphs-trees.md) | 5–6 wk | shortest paths, MST, SCC, LCA, tree DP |
| 05 | [Dynamic programming](05-dynamic-programming.md) | 5–7 wk | from knapsack to bitmask, tree DP, and DP optimizations |
| 06 | [Math, strings & geometry](06-math-strings-geometry.md) | 3–4 wk | modular arithmetic, combinatorics, hashing, KMP/Z, convex hull |
| 07 | [IOI skills & advanced topics](07-ioi-advanced.md) | ongoing | subtask strategy, interactive problems, HLD, centroid decomposition, sqrt decomposition |

Order: 01 → 02 → (03 & 04 interleaved) → 05 → 06 → 07. Start doing **virtual contests in week 2**.

## Interactive tools → [`interactive/`](interactive/index.html)
- **Graph search visualizer:** draw walls/weights on a grid. Step through BFS, DFS, Dijkstra, and A*.
- **Segment tree visualizer:** watch the build, point update, and range query visit exactly O(log n) nodes.
- **DP table animator:** LCS, edit distance, 0/1 knapsack filled cell by cell, with traceback.
- **Flashcards:** complexities, patterns, and "constraints → algorithm" recall.

## Weekly routine (~10–12 h)
| Block | Do |
|---|---|
| 3 × 2 h | **Topic:** read the USACO Guide section → solve 4–6 problems (CSES + guide problems) |
| 1 × 3 h | **Virtual contest:** Codeforces Div 2 / AtCoder ABC/ARC, or a past olympiad (oj.uz), under real time |
| 1 × 1.5 h | **Upsolve:** solve the contest problems you missed, *after* reading the editorial |
| 15 min | Log in `progress.md`: rating, solved count, one idea per problem |

**Rough benchmarks** (vary by country): strong national level ≈ Codeforces 1800–2100; IOI medal range ≈ 2100–2600+. The rating is a proxy, so spend your time on olympiad-style problems with subtasks.

Support files: [cheatsheet.md](cheatsheet.md) · [resources.md](resources.md) · [progress.md](progress.md)
