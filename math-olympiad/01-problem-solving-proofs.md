# 01 · Problem Solving & Proof Writing
> **Goal:** have a reliable process for attacking unfamiliar problems, and write proofs a grader can't fault. · **Time:** 2–3 weeks

## Skip test
- [ ] Prove by strong induction that every integer ≥ 2 is a product of primes.
- [ ] Prove $\sqrt 2$ is irrational by contradiction, and $\sqrt{2}+\sqrt{3}$ too.
- [ ] Use pigeonhole: among any 5 points in a unit square, two are within $\tfrac{\sqrt2}{2}$.
- [ ] Find an invariant: can a chessboard with two opposite corners removed be tiled by dominoes?
- [ ] Use the extremal principle: show a finite set of points, not all collinear, has a line through exactly 2 of them (Sylvester–Gallai).

## Core ideas
- **Process (Pólya):** understand → try small cases → find a pattern/conjecture → prove → check.
- **Small cases first.** Compute $n=1,2,3,4,5$. Most olympiad insights come from data.
- **Work backwards** from what's needed. **Draw a big, accurate figure** (geometry and combinatorics).
- **Proof toolbox:**
  - **Direct**, **contrapositive**, **contradiction**.
  - **Induction:** weak, strong, and "strengthen the hypothesis" (proving something stronger is often *easier*).
  - **Pigeonhole:** $n+1$ objects in $n$ boxes; more generally, some box has $\ge\lceil N/k\rceil$.
  - **Extremal principle:** look at the largest/smallest/first object, then derive a contradiction or a structure.
  - **Invariants & monovariants:** a quantity that never changes, or changes in one direction only. This answers "can we reach state X?" and "does the process terminate?"
  - **Coloring / parity:** a 2-coloring or a mod-2/mod-3 argument rules things out.
  - **Infinite descent:** a minimal counterexample produces a smaller one, a contradiction.
- **Writing:** state what you prove. One claim per paragraph. Define every variable. Don't skip "obvious" steps the grader can't verify. **Partial credit comes from clearly proven lemmas.**

## Learn from
- ⭐ **The Art and Craft of Problem Solving**, Paul Zeitz 💲: ch. 1–3 (strategies, tactics). The best first book.
- **Problem-Solving Strategies**, Arthur Engel 💲: ch. 1–4 (invariants, coloring, extremal, pigeonhole). A huge problem bank.
- **[Evan Chen: Notes on proof writing](https://web.evanchen.cc/handouts.html)**: see his handouts page ("Proof writing" and the "English" handout).
- **[How to Write Proofs, Larry Cusick (short guide)](https://zimmer.fresnostate.edu/~larryc/proofs/proofs.html)**.

## Build
- Write **10 complete proofs** of Engel ch. 1–4 problems. Have someone (or your future self, a week later) grade them strictly from 0–7.

## Traps
- "Proof by example": checking cases is **not** a proof.
- Skipping writing practice. At IMO level, ~1/3 of lost points are from incomplete write-ups, not wrong ideas.
