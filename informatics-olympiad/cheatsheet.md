# Informatics Olympiad Cheatsheet
One-page recap. If a line feels unfamiliar, open the module (→ NN).

## IOI rules that change strategy (→ 07)
Score per subtask = **max over submissions** (min over its tests within one submission) · ≤ 50 submissions/task, 1/min (not in the last 15 min) · feedback = subtask scores + the first lowest-scoring test only · C++ only · medals ≈ 1/12 gold, 1/6 silver, 1/4 bronze

## Constraints → complexity (≈10⁸ ops/s) (→ 02)
n ≤ 12: n! · n ≤ 25: 2ⁿ·n · n ≈ 40: 2^(n/2) (meet in the middle) · n ≤ 500: n³ · n ≤ 5000: n² · n ≤ 10⁵: n√n · n ≤ 10⁶: n log n · bigger: n, log n, O(1)

## Snippets (→ 01–06)
```cpp
// binary search on answer: smallest x with ok(x) true (ok monotone false→true)
ll lo = L - 1, hi = R;            // ok(lo) false, ok(hi) true
while (hi - lo > 1) { ll m = lo + (hi - lo) / 2; (ok(m) ? hi : lo) = m; }

// DSU
int p[N], sz[N]; int find(int x){ return p[x]==x ? x : p[x]=find(p[x]); }
bool unite(int a,int b){ a=find(a); b=find(b); if(a==b) return false; if(sz[a]<sz[b]) swap(a,b); p[b]=a; sz[a]+=sz[b]; return true; }

// Fenwick (1-indexed)
void add(int i, ll v){ for(; i<=n; i+=i&-i) bit[i]+=v; }
ll sum(int i){ ll s=0; for(; i>0; i-=i&-i) s+=bit[i]; return s; }

// modpow
ll pw(ll b, ll e, ll m){ ll r=1; b%=m; while(e){ if(e&1) r=r*b%m; b=b*b%m; e>>=1; } return r; }
// inverse mod prime p: pw(a, p-2, p)

// prefix function: s = "abacaba" → 0 0 1 0 1 2 3; period = n − pi[n-1]
for (int i = 1; i < n; i++) { int k = pi[i-1]; while (k && s[i] != s[k]) k = pi[k-1]; pi[i] = k + (s[i] == s[k]); }

// LCA (binary lifting): lift the deeper node by the depth difference, then
for (int j = LOG-1; j >= 0; j--) if (up[j][u] != up[j][v]) u = up[j][u], v = up[j][v];   // answer up[0][u]

// Dijkstra
priority_queue<pair<ll,int>, vector<pair<ll,int>>, greater<>> pq; dist[s]=0; pq.push({0,s});
while(!pq.empty()){ auto [d,u]=pq.top(); pq.pop(); if(d>dist[u]) continue;
  for(auto [v,w]: g[u]) if(dist[u]+w<dist[v]){ dist[v]=dist[u]+w; pq.push({dist[v],v}); } }
```

## Complexities (→ 03–04)
| Structure / algorithm | Time |
|---|---|
| DSU (path compr. + size) | α(n) ≈ O(1) |
| Fenwick / segment tree op | O(log n) |
| Sparse table build / query | O(n log n) / O(1) |
| BFS / DFS | O(n + m) |
| Dijkstra (binary heap) | O((n + m) log n) |
| Bellman–Ford / Floyd–Warshall | O(nm) / O(n³) |
| Kruskal | O(m log m) |
| Tarjan SCC / topo sort | O(n + m) |
| LCA binary lifting | O(n log n) build, O(log n) query |
| KMP / Z-function | O(n + m) |
| Sieve | O(n log log n) |

## DP patterns (→ 05)
- 0/1 knapsack: `for item: for w = W..wt: dp[w] = max(dp[w], dp[w-wt]+val)` (down!) · unbounded: up
- LIS: `auto it = lower_bound(d.begin(), d.end(), x); if(it==d.end()) d.push_back(x); else *it = x;`
- Bitmask TSP: `dp[mask][v]` · interval: `dp[l][r] = min over k` · tree: `dp[v][0/1]` from children

## Pitfalls
int overflow (use `1LL*`) · `(a-b)%MOD` can be negative · `v.size()-1` on an empty vector · Fenwick index 0 loops forever · uninitialized arrays across tests · recursion depth (~10⁵–10⁶) · `endl` flushes (use `'\n'`) · comparing doubles · off-by-one in binary search · `unordered_map` hacks
