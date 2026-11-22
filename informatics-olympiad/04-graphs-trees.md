# 04 · Graphs & Trees
> **Goal:** model problems as graphs and pick the right traversal or shortest-path algorithm. · **Time:** 5–6 weeks

👉 Interactive: [Graph search visualizer](interactive/graph-search.html)

## Skip test
- [ ] BFS on a grid with walls: the shortest path length and the path itself.
- [ ] Explain why Dijkstra fails with negative edges, and what to use instead.
- [ ] Topological sort with Kahn's algorithm. Detect a cycle.
- [ ] Find strongly connected components (Tarjan or Kosaraju).
- [ ] LCA with binary lifting in O(log n) per query.
- [ ] Find the diameter of a tree with two BFS/DFS passes.

## Core ideas
- **Representation:** adjacency lists `vector<vector<int>>` (or `pair<int,int>` for weights). Grids are implicit graphs.
- **DFS:** connected components, cycle detection, entry/exit times, bridges and articulation points (low-link).
- **BFS:** unweighted shortest paths, multi-source BFS, **0-1 BFS** with a deque.
- **Shortest paths:** Dijkstra O((n+m) log n) for non-negative weights · Bellman–Ford O(nm) with negative edges/cycles · Floyd–Warshall O(n³) all pairs.
- **DAGs:** topological sort, DP over a DAG (longest path, counting paths).
- **MST:** Kruskal (sort + DSU) or Prim.
- **SCC:** Tarjan/Kosaraju → the condensation DAG. **2-SAT** comes from SCC.
- **Trees:** parent/depth arrays, subtree sizes, **Euler tour** (subtree = contiguous range → segment tree), **binary lifting LCA**, distances via LCA, tree DP (rerooting), diameter, centroid.
- **Modeling tricks:** add a super-source, put states (node, extra info) in the vertex, reverse the edges, binary search + BFS.

## Learn from
- ⭐ **[USACO Guide: Silver/Gold graphs & trees](https://usaco.guide/)**.
- ⭐ **CSES: "Graph Algorithms"** and **"Tree Algorithms"** sections.
- **[cp-algorithms: Graphs](https://cp-algorithms.com/)** · **Competitive Programmer's Handbook**, ch. 11–20.

## Build
- Solve the CSES graph section (≈ 36 problems) and tree section (≈ 16). Implement Dijkstra, LCA, and SCC from memory.
