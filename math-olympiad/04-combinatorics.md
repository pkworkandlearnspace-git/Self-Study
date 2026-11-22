# 04 · Combinatorics
> **Goal:** the hardest and least formulaic IMO area. Build a toolkit, then lots of experience. · **Time:** 5–7 weeks (in rotation)

## Skip test
- [ ] Count lattice paths from $(0,0)$ to $(m,n)$ and give a bijective proof of $\binom{n}{k}=\binom{n}{n-k}$.
- [ ] Use stars and bars: the number of solutions of $x_1+\dots+x_k=n$ with $x_i\ge0$.
- [ ] Inclusion–exclusion: count derangements $D_n$.
- [ ] Double counting: prove $\sum_v \deg v = 2|E|$, and $\sum_k k\binom nk = n2^{n-1}$.
- [ ] Game theory: find the winning positions in Nim.
- [ ] Prove $R(3,3)=6$.

## Core ideas
- **Counting:** product/sum rule, permutations, $\binom nk$, stars and bars, **inclusion–exclusion**, **bijections** (count something else that is easier).
- **Double counting:** count the same set two ways, e.g. pairs (person, club) by person and by club.
- **Recursion:** set up $a_n$ in terms of smaller cases (tilings, paths). **Catalan numbers** $C_n=\frac1{n+1}\binom{2n}{n}$.
- **Generating functions:** $\sum a_nx^n$ turns counting into algebra.
- **Pigeonhole, extremal, invariants, monovariants, coloring** (from module 01) are *the* combinatorics weapons.
- **Graph theory:** degrees, trees ($|E|=|V|-1$), bipartite ⟺ no odd cycle, Euler paths, Hall's marriage theorem, Turán's theorem, Ramsey.
- **Algorithms & processes:** "does the process end?" → find a monovariant (a bounded, strictly changing quantity).
- **Games:** work backwards from end positions. **Strategy stealing**. Symmetry strategies. Nim and the Sprague–Grundy idea.
- **Combinatorial geometry:** convex hulls, the extremal point, coloring the plane.
- **Probabilistic method:** if a random object has expected bad count < 1, then a good object exists.
- **Constructions:** many problems ask for "the maximum" → you must give a **construction** *and* a **bound**. Two separate proofs.

## Learn from
- ⭐ **[Problem Solving Methods in Combinatorics, Pablo Soberón](https://link.springer.com/book/10.1007/978-3-0348-0597-1)** 💲: short, by technique, IMO-focused.
- **[Yufei Zhao's combinatorics handouts](https://yufeizhao.com/olympiad/)** (e.g. "Combinatorics: a few techniques", double counting).
- **102 Combinatorial Problems**, Andreescu & Feng 💲 · **Engel** ch. on combinatorics · **[Evan Chen's handouts](https://web.evanchen.cc/handouts.html)**.
- **[AoPS: Intro / Intermediate Counting & Probability](https://artofproblemsolving.com/store)** 💲 for the basics.

## Build
- Solve **C1–C4** from the last 5–8 IMO Shortlists. Combinatorics gets better mostly with *volume*, so aim for 60+ problems.

## Traps
- Overcounting from treating identical objects as distinct (or the reverse).
- For max/min problems: giving only the construction or only the bound.
