# 04 · Graphs & Trees
> **Goal:** model problems as graphs and pick the right traversal or shortest-path algorithm. · **Time:** 5–6 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - represent graphs and grids, and traverse them with **DFS** and **BFS**;
> - choose the right **shortest-path** algorithm (BFS, 0-1 BFS, Dijkstra, Bellman–Ford, Floyd–Warshall);
> - work with DAGs (**topological sort**, DP on DAGs), **minimum spanning trees** and **strongly connected components**;
> - solve tree problems with subtree sizes, Euler tours, **binary-lifting LCA**, tree DP and the diameter;
> - model a problem as a graph using states, super-sources and reversed edges.

## Skip test
- [ ] BFS on a grid with walls: the shortest path length and the path itself.
- [ ] Explain why Dijkstra fails with negative edges, and what to use instead.
- [ ] Topological sort with Kahn's algorithm. Detect a cycle.
- [ ] Find strongly connected components (Tarjan or Kosaraju).
- [ ] LCA with binary lifting in O(log n) per query.
- [ ] Find the diameter of a tree with two BFS/DFS passes.

## 1 · Graphs and how to store them

> [!DEF] Vocabulary
> A **graph** has $n$ vertices and $m$ edges; edges may be **directed** and may have **weights**. A **path** is a sequence of edges; a **cycle** returns to its start. A **tree** is a connected graph with $n-1$ edges and no cycle. A **DAG** is a directed graph with no directed cycle.

> [!CODE] Adjacency lists
> ```cpp
> int n, m; cin >> n >> m;
> vector<vector<int>> adj(n);                    // unweighted
> vector<vector<pair<int,long long>>> wadj(n);    // weighted: (neighbour, weight)
> for (int i = 0; i < m; i++) {
>     int u, v; cin >> u >> v; u--; v--;          // input is usually 1-indexed
>     adj[u].push_back(v); adj[v].push_back(u);   // drop the second line if directed
> }
> ```
> **Grids** are implicit graphs: cell $(r,c)$ has neighbours $(r\pm1,c)$, $(r,c\pm1)$. Don't build edges; loop over the four directions.

## 2 · DFS and BFS

> [!DEF] Depth-first search
> Go as deep as possible, then backtrack (recursion or an explicit stack). $O(n+m)$. Uses: connected components, cycle detection, **entry/exit times** (for "is $u$ an ancestor of $v$?"), bridges and articulation points (low-link values), topological order (reverse exit order).

> [!DEF] Breadth-first search
> Visit vertices in order of distance using a queue. In an **unweighted** graph it gives shortest paths in $O(n+m)$. **Multi-source BFS:** start with several sources in the queue at distance 0. **0-1 BFS:** for weights 0 and 1, use a deque: push 0-edges to the front, 1-edges to the back.

> [!CODE] Shortest path on a grid with walls
> ```cpp
> int gridBFS(const vector<string>& g, int sr, int sc, int tr, int tc) {
>     int R = g.size(), C = g[0].size();
>     vector<vector<int>> dist(R, vector<int>(C, -1));   // -1 = not visited
>     queue<pair<int,int>> q; q.push({sr, sc}); dist[sr][sc] = 0;
>     int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
>     while (!q.empty()) {
>         auto [r, c] = q.front(); q.pop();
>         for (int k = 0; k < 4; k++) {
>             int nr = r + dr[k], nc = c + dc[k];
>             if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
>             if (g[nr][nc] == '#' || dist[nr][nc] != -1) continue;
>             dist[nr][nc] = dist[r][c] + 1;
>             q.push({nr, nc});
>         }
>     }
>     return dist[tr][tc];                                  // -1 if unreachable
> }
> ```
> To recover the path itself, store each cell's parent when you first reach it, then walk back from the target.

> [!TRY] [Graph search visualizer](interactive/graph-search.html)
> Compare DFS, BFS and Dijkstra on the same graph and watch the order in which vertices are discovered.

## 3 · Shortest paths

> [!DEF] Which algorithm?
> | Situation | Algorithm | Complexity |
> |---|---|---|
> | unweighted | BFS | $O(n+m)$ |
> | weights 0/1 | 0-1 BFS | $O(n+m)$ |
> | non-negative weights | **Dijkstra** | $O((n+m)\log n)$ |
> | negative weights, detect negative cycles | Bellman–Ford | $O(nm)$ |
> | all pairs, $n\le500$ | Floyd–Warshall | $O(n^3)$ |

> [!CODE] Dijkstra with a priority queue
> ```cpp
> vector<long long> dijkstra(int n, const vector<vector<pair<int,long long>>>& adj, int s) {
>     const long long INF = LLONG_MAX;
>     vector<long long> d(n, INF); d[s] = 0;
>     priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
>     pq.push({0, s});
>     while (!pq.empty()) {
>         auto [du, u] = pq.top(); pq.pop();
>         if (du != d[u]) continue;                     // outdated entry: skip
>         for (auto [v, w] : adj[u])
>             if (d[u] + w < d[v]) { d[v] = d[u] + w; pq.push({d[v], v}); }
>     }
>     return d;
> }
> ```

> [!WARN] Why Dijkstra fails with negative edges
> Dijkstra finalises the closest unfinished vertex, assuming no later path can be shorter. A negative edge discovered later breaks that. *Example:* edges $A\to B$ (2), $A\to C$ (3), $C\to B$ (−2), $B\to D$ (1). The textbook algorithm finalises $B$ with $d(B)=2$ and $D$ with $d(D)=3$, but $A\to C\to B\to D$ costs 2. (Lazy versions like the code above re-process a vertex whose distance drops, so they survive this case, but on other graphs they can take exponential time.) Use **Bellman–Ford**: relax all edges $n-1$ times; if an $n$-th round still improves something, there is a negative cycle.

> [!FORMULA] Floyd–Warshall
> `for k: for i: for j: d[i][j] = min(d[i][j], d[i][k] + d[k][j]);` — the order of the loops matters: $k$ (the allowed intermediate vertex) must be outermost.

## 4 · DAGs, spanning trees and components

> [!CODE] Topological sort (Kahn) with cycle detection
> ```cpp
> vector<int> topoSort(int n, const vector<vector<int>>& adj) {   // empty if there is a cycle
>     vector<int> indeg(n, 0), order;
>     for (int u = 0; u < n; u++) for (int v : adj[u]) indeg[v]++;
>     queue<int> q;
>     for (int u = 0; u < n; u++) if (!indeg[u]) q.push(u);
>     while (!q.empty()) {
>         int u = q.front(); q.pop(); order.push_back(u);
>         for (int v : adj[u]) if (--indeg[v] == 0) q.push(v);
>     }
>     if ((int)order.size() < n) order.clear();                    // some vertices never freed: cycle
>     return order;
> }
> ```
> **DP on a DAG:** process vertices in topological order to get longest paths, numbers of paths, etc.

> [!DEF] Minimum spanning tree
> A spanning tree of minimum total weight. **Kruskal:** sort edges by weight and add each edge that connects two different DSU components (module 03): $O(m\log m)$. **Prim:** grow one tree with a priority queue, like Dijkstra. Both rely on the **cut property**: the lightest edge crossing any cut belongs to some MST.

> [!DEF] Strongly connected components (SCC)
> In a directed graph, $u$ and $v$ are in the same SCC if each can reach the other. Contracting every SCC to a point gives the **condensation**, which is a DAG. **Kosaraju:** DFS to get the finishing order, then DFS on the **reversed** graph in decreasing finishing order; each tree found is one SCC. **2-SAT** is solved by SCCs of the implication graph.

> [!CODE] Kosaraju's algorithm
> ```cpp
> vector<int> scc(int n, const vector<vector<int>>& g) {           // comp[v] = id of v's SCC
>     vector<vector<int>> rg(n);
>     for (int u = 0; u < n; u++) for (int v : g[u]) rg[v].push_back(u);
>     vector<int> order, comp(n, -1); vector<bool> vis(n, false);
>     function<void(int)> dfs1 = [&](int u) {
>         vis[u] = true; for (int v : g[u]) if (!vis[v]) dfs1(v); order.push_back(u); };
>     function<void(int,int)> dfs2 = [&](int u, int c) {
>         comp[u] = c; for (int v : rg[u]) if (comp[v] < 0) dfs2(v, c); };
>     for (int u = 0; u < n; u++) if (!vis[u]) dfs1(u);
>     int c = 0;
>     for (int i = n - 1; i >= 0; i--) if (comp[order[i]] < 0) dfs2(order[i], c++);
>     return comp;
> }
> ```

> [!WARN] Recursion depth
> Recursive DFS on a path of $10^5$–$10^6$ vertices can overflow the stack on some judges. Use an explicit stack, or make sure the judge's stack limit is large.

## 5 · Trees

> [!DEF] Rooted-tree basics
> Root the tree at vertex 0 and compute, with one DFS, each vertex's parent, depth and **subtree size**. **Euler tour:** record entry times `tin[v]`; the subtree of $v$ is exactly the contiguous range `[tin[v], tin[v] + size[v] - 1]`, so subtree queries become range queries on a segment tree or Fenwick tree (module 03).

> [!DEF] Lowest common ancestor with binary lifting
> Store `up[k][v]` = the $2^k$-th ancestor of $v$ ($O(n\log n)$ precomputation). To find $\text{LCA}(a,b)$: lift the deeper vertex to the same depth using the binary digits of the depth difference, then lift both together while their ancestors differ. $O(\log n)$ per query. Distance: $d(a,b)=\text{depth}(a)+\text{depth}(b)-2\,\text{depth}(\text{LCA})$.

> [!CODE] Binary-lifting LCA
> ```cpp
> struct LCA {
>     int LOG; vector<vector<int>> up; vector<int> depth;
>     LCA(int n, const vector<vector<int>>& adj, int root = 0) {
>         LOG = __lg(max(n, 1)) + 1;
>         up.assign(LOG, vector<int>(n, root)); depth.assign(n, 0);
>         vector<int> st = {root}; vector<bool> seen(n, false); seen[root] = true;
>         while (!st.empty()) {                                   // iterative DFS
>             int u = st.back(); st.pop_back();
>             for (int v : adj[u]) if (!seen[v]) {
>                 seen[v] = true; up[0][v] = u; depth[v] = depth[u] + 1; st.push_back(v); }
>         }
>         for (int k = 1; k < LOG; k++)
>             for (int v = 0; v < n; v++) up[k][v] = up[k - 1][up[k - 1][v]];
>     }
>     int query(int a, int b) {
>         if (depth[a] < depth[b]) swap(a, b);
>         for (int k = LOG - 1; k >= 0; k--)                      // lift a to b's depth
>             if (depth[a] - (1 << k) >= depth[b]) a = up[k][a];
>         if (a == b) return a;
>         for (int k = LOG - 1; k >= 0; k--)                      // lift both just below the LCA
>             if (up[k][a] != up[k][b]) { a = up[k][a]; b = up[k][b]; }
>         return up[0][a];
>     }
> };
> ```

> [!EXAMPLE] Tree diameter with two BFS passes
> The farthest vertex from **any** start is an endpoint of some longest path. So: BFS from vertex 0 to the farthest vertex $a$; BFS from $a$; the largest distance found is the **diameter**. $O(n)$. (Works for non-negative edge weights too, with DFS sums.)

> [!DEF] Tree DP and rerooting
> Compute `dp[v]` from the children's values in one DFS (e.g. maximum independent set: `take[v] = 1 + Σ skip[child]`, `skip[v] = Σ max(take, skip)[child]`, module 05). **Rerooting** computes the answer for every possible root in $O(n)$ with a second DFS that passes information from parent to child.

## 6 · Modelling tricks

> [!KEY] When the graph isn't obvious
> - **State graphs:** a vertex = (position, extra information), e.g. (cell, keys collected) or (city, fuel left).
> - **Super-source:** connect a new vertex to all sources with weight 0 to run one Dijkstra from many starts.
> - **Reverse the edges** to compute "distance **to** the target" from every vertex.
> - **Binary search + BFS:** "the minimal $X$ such that a path exists using only edges with property $\le X$".

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Graphs** deck.

## Practice (answers hidden)

1. Pick the algorithm: (a) shortest path in a maze; (b) roads with travel times; (c) currency exchange where a cycle might make infinite profit; (d) distances between all pairs of 300 cities.
<details><summary>Answer</summary>

(a) BFS; (b) Dijkstra; (c) Bellman–Ford with negative-cycle detection on $-\log(\text{rate})$; (d) Floyd–Warshall.
</details>

2. What happens if Kahn's algorithm finishes with fewer than $n$ vertices in the order?
<details><summary>Answer</summary>

The remaining vertices all have positive in-degree, so they lie on or after a directed cycle: the graph is not a DAG.
</details>

3. In a rooted tree with `tin`/subtree sizes, how do you test whether $u$ is an ancestor of $v$ in $O(1)$?
<details><summary>Answer</summary>

`tin[u] <= tin[v] && tin[v] < tin[u] + size[u]`.
</details>

4. You must travel from $s$ to $t$ and may use at most one "free ticket" that makes one edge cost 0. Model it.
<details><summary>Answer</summary>

Two copies of the graph: layer 0 (ticket unused) and layer 1 (used). Normal edges inside each layer; for each edge $u\to v$ add a 0-weight edge from $(u,0)$ to $(v,1)$. Dijkstra from $(s,0)$; answer $\min(d(t,0),d(t,1))$.
</details>

5. How many edges does a spanning tree of a connected graph with 1000 vertices have, and why does Kruskal skip an edge?
<details><summary>Answer</summary>

999. Kruskal skips an edge whose endpoints are already in the same DSU component, because adding it would create a cycle.
</details>

## Build
- Solve the CSES graph section (≈ 36 problems) and tree section (≈ 16). Implement Dijkstra, LCA, and SCC from memory.

## Go deeper (all optional)
- ⭐ **[USACO Guide: Silver/Gold graphs & trees](https://usaco.guide/)**.
- ⭐ **[CSES](https://cses.fi/problemset/): "Graph Algorithms"** and **"Tree Algorithms"** sections.
- **[cp-algorithms: Graphs](https://cp-algorithms.com/)** · **[Competitive Programmer's Handbook](https://cses.fi/book/book.pdf)**, ch. 11–20.

## Done when
- [ ] CSES graph and tree sections done · [ ] Dijkstra, LCA and SCC written from memory
