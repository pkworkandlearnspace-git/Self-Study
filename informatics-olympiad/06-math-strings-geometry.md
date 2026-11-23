# 06 · Math, Strings & Geometry
> **Goal:** the math and string toolkit (your math-olympiad training helps here). · **Time:** 3–4 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - compute with large numbers **modulo a prime**: fast powers, inverses, binomial coefficients;
> - sieve primes and factorise quickly; use extended Euclid and CRT;
> - solve linear recurrences with **matrix exponentiation**, and use linearity of expectation;
> - compare substrings in $O(1)$ with **hashing**, and find patterns with **KMP / Z-function**;
> - do integer-exact geometry with **cross products**: orientation, area, convex hull.

## Skip test
- [ ] Fast modular exponentiation and the modular inverse via Fermat (p prime).
- [ ] Precompute factorials and inverse factorials to answer nCr mod p in O(1).
- [ ] Sieve of Eratosthenes up to 10⁷. A smallest-prime-factor sieve for fast factorization.
- [ ] Polynomial rolling hash: compare substrings in O(1). Explain collision risk and double hashing.
- [ ] KMP prefix function or Z-function: find all occurrences of a pattern.
- [ ] Convex hull (monotone chain) using the cross product.

## 1 · Modular arithmetic

> [!DEF] Why "modulo $10^9+7$"
> When the true answer is astronomically large (counting problems), tasks ask for it modulo a prime such as $10^9+7$ or $998244353$. Addition, subtraction and multiplication can be reduced at every step; **division** needs a modular inverse. Keep values in `long long` so products of two residues (< $10^{18}$) don't overflow.

> [!CODE] Fast power and inverse
> ```cpp
> const long long MOD = 1'000'000'007;
> long long power(long long b, long long e, long long m = MOD) {   // b^e mod m in O(log e)
>     long long r = 1; b %= m;
>     while (e) {
>         if (e & 1) r = r * b % m;
>         b = b * b % m; e >>= 1;
>     }
>     return r;
> }
> long long inverse(long long a) { return power(a, MOD - 2); }   // Fermat: a^(p-2) = a^(-1) mod p
> ```
> Fermat's little theorem (math olympiad module 03) needs a **prime** modulus and $a\not\equiv0$. For other moduli use extended Euclid.

> [!CODE] Binomial coefficients mod $p$ in $O(1)$
> ```cpp
> vector<long long> fact, inv_fact;
> void initFact(int N) {
>     fact.assign(N + 1, 1); inv_fact.assign(N + 1, 1);
>     for (int i = 1; i <= N; i++) fact[i] = fact[i - 1] * i % MOD;
>     inv_fact[N] = inverse(fact[N]);                          // one inverse...
>     for (int i = N; i > 0; i--) inv_fact[i - 1] = inv_fact[i] * i % MOD;   // ...then walk down
> }
> long long nCr(int n, int r) {
>     if (r < 0 || r > n) return 0;
>     return fact[n] * inv_fact[r] % MOD * inv_fact[n - r] % MOD;
> }
> ```

> [!WARN] Negative remainders
> In C++, `(-7) % 3 == -1`. After subtracting, normalise: `((a - b) % MOD + MOD) % MOD`.

## 2 · Number theory

> [!CODE] Extended Euclid
> ```cpp
> long long extgcd(long long a, long long b, long long& x, long long& y) {   // a*x + b*y = gcd
>     if (b == 0) { x = 1; y = 0; return a; }
>     long long x1, y1, g = extgcd(b, a % b, x1, y1);
>     x = y1; y = x1 - (a / b) * y1;
>     return g;
> }
> // extgcd(240, 46, x, y) gives g = 2, x = -9, y = 47
> ```
> It gives inverses for any modulus coprime to $a$, and solves $ax+by=c$ (solvable iff $\gcd(a,b)\mid c$). The **Chinese remainder theorem** combines congruences with coprime moduli.

> [!CODE] Smallest-prime-factor sieve
> ```cpp
> vector<int> spfSieve(int N) {                    // spf[x] = smallest prime factor of x
>     vector<int> spf(N + 1, 0);
>     for (int i = 2; i <= N; i++)
>         if (!spf[i])                             // i is prime
>             for (int j = i; j <= N; j += i)
>                 if (!spf[j]) spf[j] = i;
>     return spf;
> }
> // factorise x: while (x > 1) { int p = spf[x]; x /= p; ... }  -> O(log x)
> ```
> The plain Sieve of Eratosthenes runs in $O(N\log\log N)$: fine for $N=10^7$. To factor a single number up to $10^{12}$, trial division up to $\sqrt x$ is enough.

> [!FORMULA] Euler's totient
> $\varphi(n)=n\prod_{p\mid n}\big(1-\frac1p\big)$, the count of $1\le k\le n$ coprime to $n$. Compute it from the factorisation.

## 3 · Counting, recurrences and probability

> [!DEF] Combinatorics toolkit
> Binomials, **stars and bars** $\binom{n+k-1}{k-1}$, **inclusion–exclusion**, Catalan numbers $\frac1{n+1}\binom{2n}n$ (math olympiad module 04). Very often the counting is itself a DP.

> [!CODE] Matrix exponentiation for linear recurrences
> A recurrence of order $k$ becomes a $k\times k$ matrix; the $n$-th term is a matrix power in $O(k^3\log n)$.
> ```cpp
> using Mat = vector<vector<long long>>;
> Mat mul(const Mat& A, const Mat& B) {
>     int n = A.size(); Mat C(n, vector<long long>(n, 0));
>     for (int i = 0; i < n; i++) for (int k = 0; k < n; k++) for (int j = 0; j < n; j++)
>         C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
>     return C;
> }
> Mat matpow(Mat A, long long e) {
>     int n = A.size(); Mat R(n, vector<long long>(n, 0));
>     for (int i = 0; i < n; i++) R[i][i] = 1;                 // identity
>     while (e) { if (e & 1) R = mul(R, A); A = mul(A, A); e >>= 1; }
>     return R;
> }
> long long fib(long long n) { return matpow({{1, 1}, {1, 0}}, n)[0][1]; }   // F(n), n up to 1e18
> ```

> [!KEY] Linearity of expectation
> $\mathbb E[X+Y]=\mathbb E[X]+\mathbb E[Y]$ always, even for dependent variables. Write a complicated count as a sum of indicator variables and add up their probabilities. *Example:* the expected number of fixed points of a random permutation is $n\cdot\frac1n=1$.

> [!DEF] Games
> Impartial games are solved with **Sprague–Grundy** values: a position's value is the mex (smallest missing non-negative integer) of its options' values; a sum of games has the XOR of the values; the first player wins iff it's non-zero (like Nim, math olympiad module 04).

## 4 · Strings

> [!DEF] Polynomial rolling hash
> Map a string to $h(s)=\sum_i s_i\,B^{n-1-i}\bmod M$. With prefix hashes, the hash of any substring is available in $O(1)$:
> $$h(s_{l..r-1})=h_r-h_l\cdot B^{r-l}\pmod M$$
> Equal strings always have equal hashes; different strings collide with probability about $\frac1M$ per comparison. With many comparisons (or adversarial tests) use **two moduli** (double hashing) or one 61-bit modulus.

> [!CODE] Double hashing
> ```cpp
> struct Hash {
>     static const long long B = 131, M1 = 1'000'000'007, M2 = 998'244'353;
>     vector<long long> h1, h2, p1, p2;
>     Hash(const string& s) {
>         int n = s.size(); h1.assign(n + 1, 0); h2 = h1; p1.assign(n + 1, 1); p2 = p1;
>         for (int i = 0; i < n; i++) {
>             h1[i+1] = (h1[i] * B + s[i]) % M1;  p1[i+1] = p1[i] * B % M1;
>             h2[i+1] = (h2[i] * B + s[i]) % M2;  p2[i+1] = p2[i] * B % M2;
>         }
>     }
>     pair<long long,long long> get(int l, int r) {          // hash of s[l..r-1]
>         return {((h1[r] - h1[l] * p1[r-l]) % M1 + M1) % M1,
>                 ((h2[r] - h2[l] * p2[r-l]) % M2 + M2) % M2};
>     }
> };
> ```

> [!DEF] Prefix function (KMP)
> $\pi[i]$ = the length of the longest proper prefix of $s_{0..i}$ that is also a suffix of it. Computed in $O(n)$. To find a pattern $P$ in a text $T$, compute $\pi$ of $P+\#+T$ (with a separator not in either string): every position where $\pi=|P|$ is the end of a match.

> [!CODE] Prefix function and pattern search
> ```cpp
> vector<int> prefixFunction(const string& s) {
>     int n = s.size(); vector<int> pi(n, 0);
>     for (int i = 1; i < n; i++) {
>         int k = pi[i - 1];
>         while (k > 0 && s[i] != s[k]) k = pi[k - 1];   // fall back to shorter borders
>         if (s[i] == s[k]) k++;
>         pi[i] = k;
>     }
>     return pi;
> }
> vector<int> findAll(const string& text, const string& pat) {   // start positions of matches
>     string s = pat + '#' + text;
>     auto pi = prefixFunction(s);
>     vector<int> res;
>     for (int i = pat.size() + 1; i < (int)s.size(); i++)
>         if (pi[i] == (int)pat.size()) res.push_back(i - 2 * pat.size());
>     return res;                                       // findAll("abababa", "aba") = {0, 2, 4}
> }
> ```
> The **Z-function** ($z[i]$ = length of the longest common prefix of $s$ and $s_{i..}$) does the same job.

> [!DEF] More string tools
> **Trie:** a tree of prefixes for many words (and the **binary trie** for "maximum XOR with $x$"). **Manacher:** all palindromic substrings in $O(n)$. Advanced: suffix arrays, Aho–Corasick (many patterns at once).

## 5 · Geometry with integers

> [!FORMULA] Cross product and orientation
> For points $O,A,B$: $\text{cross}(O,A,B)=(A_x-O_x)(B_y-O_y)-(A_y-O_y)(B_x-O_x)$.
> Positive: $O\to A\to B$ turns **left** (counter-clockwise); negative: right; zero: collinear. With integer coordinates it is **exact**: no floating-point errors.
> **Shoelace formula:** polygon area $=\frac12\big|\sum_i(x_iy_{i+1}-x_{i+1}y_i)\big|$.

> [!CODE] Convex hull (monotone chain), $O(n\log n)$
> ```cpp
> using P = pair<long long, long long>;
> long long cross(P o, P a, P b) {
>     return (a.first - o.first) * (b.second - o.second) - (a.second - o.second) * (b.first - o.first);
> }
> vector<P> convexHull(vector<P> pts) {               // counter-clockwise, collinear points dropped
>     sort(pts.begin(), pts.end());
>     pts.erase(unique(pts.begin(), pts.end()), pts.end());
>     if (pts.size() < 3) return pts;
>     vector<P> h(2 * pts.size()); int k = 0;
>     for (int i = 0; i < (int)pts.size(); i++) {                       // lower hull
>         while (k >= 2 && cross(h[k-2], h[k-1], pts[i]) <= 0) k--;
>         h[k++] = pts[i];
>     }
>     for (int i = pts.size() - 2, t = k + 1; i >= 0; i--) {            // upper hull
>         while (k >= t && cross(h[k-2], h[k-1], pts[i]) <= 0) k--;
>         h[k++] = pts[i];
>     }
>     h.resize(k - 1);                                                   // last point = first
>     return h;
> }
> ```

> [!WARN] Floating point
> Avoid doubles in geometry whenever coordinates are integers. If you must use them, compare with a tolerance (`fabs(a - b) < 1e-9`) and prefer `long double`.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Math/Strings** deck.

## Practice (answers hidden)

1. Compute $\binom{10^6}{5\times10^5}\bmod(10^9+7)$. Plan and complexity?
<details><summary>Answer</summary>

`initFact(1e6)` in $O(N)$ (one modular inverse, $O(\log p)$), then `nCr` in $O(1)$.
</details>

2. Why can't you compute $\frac ab\bmod p$ as `(a % p) / (b % p)`?
<details><summary>Answer</summary>

Integer division doesn't respect congruences ($\frac{6}{3}=2$ but $6\equiv13\pmod7$ and $13/3$ isn't an integer). Multiply by the inverse instead: `a % p * inverse(b) % p`.
</details>

3. Prefix function of "aabaaab"?
<details><summary>Answer</summary>

$[0,1,0,1,2,2,3]$.
</details>

4. Three points $(0,0)$, $(4,0)$, $(1,3)$: orientation and triangle area?
<details><summary>Answer</summary>

$\text{cross}=4\cdot3-0\cdot1=12>0$: counter-clockwise (left turn). Area $=12/2=6$.
</details>

5. The recurrence $a_n=2a_{n-1}+3a_{n-2}$. Write its matrix.
<details><summary>Answer</summary>

$\begin{pmatrix}a_n\\a_{n-1}\end{pmatrix}=\begin{pmatrix}2&3\\1&0\end{pmatrix}\begin{pmatrix}a_{n-1}\\a_{n-2}\end{pmatrix}$.
</details>

## Build
- Add `modint`, combinatorics, sieve, hashing, KMP, and convex hull snippets to your personal library (`kactl`-style). Test each one.

## Go deeper (all optional)
- ⭐ **[cp-algorithms](https://cp-algorithms.com/)**: algebra, combinatorics, strings, geometry sections.
- ⭐ **[CSES](https://cses.fi/problemset/): "Mathematics"** and **"String Algorithms"** sections.
- **[USACO Guide: Gold/Platinum (math, strings)](https://usaco.guide/)**.

## Done when
- [ ] Your snippet library is tested · [ ] CSES Mathematics and String Algorithms sections attempted
