# 06 · Math, Strings & Geometry
> **Goal:** the math and string toolkit (your math-olympiad training helps here). · **Time:** 3–4 weeks

👉 Interactive: [Prefix function (KMP) step-through](interactive/kmp.html)

## Skip test
If you can do ALL of these without notes, skip the module.
- [ ] Fast modular exponentiation, and the modular inverse via Fermat (p prime). When does Fermat fail?
- [ ] Precompute factorials and inverse factorials to answer nCr mod p in O(1).
- [ ] Sieve of Eratosthenes up to 10⁷. A smallest-prime-factor sieve for fast factorization.
- [ ] Polynomial rolling hash: compare substrings in O(1). Explain collision risk and double hashing.
- [ ] KMP prefix function or Z-function: find all occurrences of a pattern.
- [ ] Convex hull (monotone chain) using the cross product.
- [ ] Compute the period of a string (the smallest p with s[i] = s[i+p] for all valid i) from its prefix function.

## Core ideas
- **Number theory:** gcd/lcm, extended Euclid (inverses when the modulus isn't prime), modular arithmetic mod 10⁹+7 or 998244353, `modpow`, inverses, sieve O(n log log n), factorization, Euler φ, CRT.
- **Modular inverse:** for a prime p and a ≢ 0, a⁻¹ ≡ a^(p−2) (Fermat's little theorem). For a non-prime m, the inverse exists only if gcd(a, m) = 1, and you find it with extended Euclid.
- **Combinatorics:** nCr mod p, stars and bars (C(n+k−1, k−1) ways to put n identical balls in k boxes), inclusion–exclusion, Catalan numbers C(2n, n)/(n+1), counting with DP.
- **Matrix exponentiation:** linear recurrences of order k in O(k³ log n).
- **Probability/expectation:** linearity of expectation (holds even for dependent variables), expected-value DP.
- **Strings:** hashing, **KMP / prefix function** (π[i] = the length of the longest proper prefix of s[0..i] that is also a suffix of it), **Z-function**, **trie** (also the binary trie for max XOR), Manacher (palindromes), suffix array (advanced), Aho–Corasick (advanced).
- **Geometry (light at IOI):** integer **cross products** for orientation: `cross(b − a, c − a) > 0` means a→b→c turns left (counter-clockwise). Segment intersection, polygon area (shoelace), convex hull. Stay in integers (`long long`) whenever the input is integer.
- **Game theory:** Sprague–Grundy. A position's Grundy value is the mex of its options' values. A sum of games is lost for the player to move ⇔ the XOR of the Grundy values is 0 (just like Nim).

## Worked example 1: nCr mod p in O(1)
```cpp
const int MOD = 1e9 + 7, MX = 1e6 + 1;
ll f[MX], inv[MX];
ll pw(ll b, ll e) { ll r = 1; b %= MOD; while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; } return r; }
void init() {
    f[0] = 1; for (int i = 1; i < MX; i++) f[i] = f[i-1] * i % MOD;
    inv[MX-1] = pw(f[MX-1], MOD - 2);                    // one Fermat inverse…
    for (int i = MX - 1; i > 0; i--) inv[i-1] = inv[i] * i % MOD;   // …then go backwards
}
ll C(int n, int r) { return r < 0 || r > n ? 0 : f[n] * inv[r] % MOD * inv[n-r] % MOD; }
```

## Worked example 2: prefix function and KMP
```cpp
vector<int> prefix_function(const string& s) {
    int n = s.size(); vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int k = pi[i-1];
        while (k > 0 && s[i] != s[k]) k = pi[k-1];   // fall back to the next shorter border
        if (s[i] == s[k]) k++;
        pi[i] = k;
    }
    return pi;
}
// occurrences of P in T: run on P + '#' + T; every i with pi[i] == |P| is a match ending at i
// s = "abacaba" → pi = 0 0 1 0 1 2 3
```
The total time is O(n): k goes up by at most 1 per step, and every fallback lowers it, so there are at most n fallbacks in total. Step through it in the [KMP visualizer](interactive/kmp.html).

## Worked example 3: monotone chain convex hull
```cpp
using P = pair<ll,ll>;
ll cross(P o, P a, P b) { return (a.first-o.first)*(b.second-o.second) - (a.second-o.second)*(b.first-o.first); }
vector<P> hull(vector<P> p) {
    sort(p.begin(), p.end()); p.erase(unique(p.begin(), p.end()), p.end());
    if (p.size() < 3) return p;
    vector<P> h(2 * p.size()); int k = 0;
    for (int i = 0; i < (int)p.size(); i++) {                      // lower hull
        while (k >= 2 && cross(h[k-2], h[k-1], p[i]) <= 0) k--; h[k++] = p[i]; }
    for (int i = p.size() - 2, t = k + 1; i >= 0; i--) {           // upper hull
        while (k >= t && cross(h[k-2], h[k-1], p[i]) <= 0) k--; h[k++] = p[i]; }
    h.resize(k - 1); return h;                                     // counter-clockwise, no collinear points
}
```

## Practice
1. <details><summary>Period of a string from π.</summary>

   p = n − π[n−1]. If p divides n, the string is (prefix of length p) repeated n/p times. Otherwise p is still the smallest period, but the last repetition is partial.
   </details>
2. <details><summary>Why does a single hash mod 2⁶⁴ (unsigned overflow) fail?</summary>

   Thue–Morse strings make *any* base collide mod 2⁶⁴, for every base, and problem setters build such tests on purpose. Use a large prime modulus (for example 2⁶¹ − 1), or two moduli, with a **random** base.
   </details>
3. <details><summary>Number of lattice paths from (0, 0) to (a, b) that use only right/up moves.</summary>

   C(a + b, a): choose which of the a + b steps go right.
   </details>
4. <details><summary>Polygon area with integer vertices, without floating point.</summary>

   2·Area = |Σ (xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)| (shoelace). Keep the doubled area as a `long long` and divide by 2 only when printing.
   </details>
5. <details><summary>Nim variant: from a pile you may take 1, 2, or 3 stones. Grundy values?</summary>

   g(n) = n mod 4. Combine the piles with XOR. The first player wins ⇔ XOR ≠ 0.
   </details>

## Learn from
- ⭐ **[cp-algorithms](https://cp-algorithms.com/)**: [binary exponentiation](https://cp-algorithms.com/algebra/binary-exp.html), [modular inverse](https://cp-algorithms.com/algebra/module-inverse.html), [prefix function](https://cp-algorithms.com/string/prefix-function.html), [Z-function](https://cp-algorithms.com/string/z-function.html), [string hashing](https://cp-algorithms.com/string/string-hashing.html), [convex hull](https://cp-algorithms.com/geometry/convex-hull.html).
- ⭐ **CSES: "Mathematics"** and **"String Algorithms"** sections.
- **[USACO Guide: Gold/Platinum (math, strings)](https://usaco.guide/)** · **Competitive Programmer's Handbook** ch. 21–26, 29.

## Build
- Add `modint`, combinatorics, sieve, hashing, KMP, and convex hull snippets to your personal library (`kactl`-style). Test each one against a brute force.

## Traps
- `a * b % MOD` with `int` a, b overflows before the `%`. Use `1LL * a * b % MOD`.
- A negative result after a subtraction: `(a - b) % MOD` can be negative in C++. Write `((a - b) % MOD + MOD) % MOD`.
- With |coordinates| ≤ 10⁹, differences reach 2·10⁹ and a cross product reaches 8·10¹⁸. That still fits in `long long` (max ≈ 9.2·10¹⁸), but only just. Anything larger needs `__int128`.
- Fermat inverses with a non-prime modulus give silently wrong answers.

## Done when
- [ ] Library snippets tested  - [ ] CSES Mathematics + String Algorithms: at least the first half of each
