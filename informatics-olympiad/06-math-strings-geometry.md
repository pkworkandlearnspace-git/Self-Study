# 06 · Math, Strings & Geometry
> **Goal:** the math and string toolkit (your math-olympiad training helps here). · **Time:** 3–4 weeks

👉 Interactive: [Convex hull builder](interactive/convex-hull.html) (monotone chain step-through + cross-product quiz)

## Skip test
- [ ] Fast modular exponentiation and the modular inverse via Fermat (p prime).
- [ ] Precompute factorials and inverse factorials to answer nCr mod p in O(1).
- [ ] Sieve of Eratosthenes up to 10⁷. A smallest-prime-factor sieve for fast factorization.
- [ ] Polynomial rolling hash: compare substrings in O(1). Explain collision risk and double hashing.
- [ ] KMP prefix function or Z-function: find all occurrences of a pattern.
- [ ] Convex hull (monotone chain) using the cross product.

## Core ideas
- **Number theory:** gcd/lcm, extended Euclid, modular arithmetic mod 10⁹+7, `modpow`, inverses, sieve, factorization, Euler φ, CRT.
- **Combinatorics:** nCr mod p, stars and bars, inclusion–exclusion, Catalan numbers, counting with DP.
- **Matrix exponentiation:** linear recurrences in O(k³ log n).
- **Probability/expectation:** linearity of expectation, expected-value DP.
- **Strings:** hashing, **KMP / prefix function**, **Z-function**, **trie** (also the binary trie for max XOR), Manacher (palindromes), suffix array (advanced), Aho–Corasick (advanced).
- **Geometry (light at IOI):** use integer cross products for orientation, segment intersection, polygon area (shoelace), convex hull. Avoid floating point when possible.
- **Game theory:** Sprague–Grundy (like Nim from the math olympiad).

## Learn from
- ⭐ **[cp-algorithms](https://cp-algorithms.com/)**: algebra, combinatorics, strings, geometry sections.
- ⭐ **CSES: "Mathematics"** and **"String Algorithms"** sections.
- **[USACO Guide: Gold/Platinum (math, strings)](https://usaco.guide/)**.

## Build
- Add `modint`, combinatorics, sieve, hashing, KMP, and convex hull snippets to your personal library (`kactl`-style). Test each one.
