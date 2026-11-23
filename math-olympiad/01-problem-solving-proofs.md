# 01 · Problem Solving & Proof Writing
> **Goal:** have a reliable process for attacking unfamiliar problems, and write proofs a grader can't fault. · **Time:** 2–3 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - attack an unfamiliar problem with a repeatable process (small cases → pattern → conjecture → proof);
> - use every basic proof technique: direct, contrapositive, contradiction, induction (including strengthening), infinite descent;
> - recognise when to reach for **pigeonhole**, the **extremal principle**, **invariants/monovariants** and **colouring**;
> - write a proof that earns full marks: complete, ordered, every claim justified.
>
> Each section: idea → 📖 definitions → 🧮 the precise statement → ✍️ a fully solved olympiad-style example → practice. These techniques are the backbone of modules 02–05.

## Skip test
- [ ] Prove by strong induction that every integer ≥ 2 is a product of primes.
- [ ] Prove $\sqrt 2$ is irrational by contradiction, and $\sqrt{2}+\sqrt{3}$ too.
- [ ] Use pigeonhole: among any 5 points in a unit square, two are within $\tfrac{\sqrt2}{2}$.
- [ ] Find an invariant: can a chessboard with two opposite corners removed be tiled by dominoes?
- [ ] Use the extremal principle: show a finite set of points, not all collinear, has a line through exactly 2 of them (Sylvester–Gallai).

## 1 · A process for unfamiliar problems

Olympiad problems are designed so that no memorised method applies directly. What you need is a **process** that generates ideas.

> [!KEY] Pólya's four steps, olympiad version
> 1. **Understand.** Restate the problem in your own words. What is given, what must be shown? Is it "prove", "find all" or "find the maximum"?
> 2. **Experiment.** Try **small cases** ($n=1,2,3,4,5$), special values, an accurate figure. Most olympiad insights come from data.
> 3. **Conjecture.** Spot the pattern and guess the answer or the key lemma. Ask: *what would make this true?* Work **backwards** from the goal.
> 4. **Prove, then check.** Write the proof. Re-read it as a hostile grader. Test the answer on a case you didn't use.

> [!EXAMPLE] Small cases reveal the answer
> *How many regions do $n$ lines in general position (no two parallel, no three concurrent) divide the plane into?*
>
> Data: $n=0,1,2,3$ give $1, 2, 4, 7$ regions. Differences $1,2,3$ suggest that the $n$-th line adds $n$ regions. **Why:** the new line crosses the $n-1$ old lines in $n-1$ distinct points, which cut it into $n$ pieces, and each piece splits one region in two. So $R_n = R_{n-1}+n$, giving $R_n = 1+\frac{n(n+1)}{2}$.

> [!KEY] Heuristics to try when stuck
> Solve a simpler version (fewer variables, smaller $n$, a special case) · look at the extreme case · find an invariant · colour it · draw it bigger and more accurately · work backwards · change the representation (algebra ↔ geometry ↔ graph) · ask what an answer "of this shape" would need.

## 2 · Logic and basic proof methods

> [!DEF] Implication, converse, contrapositive
> For a statement "if $P$ then $Q$" ($P\Rightarrow Q$):
>
> - the **converse** is $Q\Rightarrow P$ (a *different* statement, which may be false);
> - the **contrapositive** is "not $Q$ ⇒ not $P$", which is **logically equivalent** to the original.
>
> "$P$ if and only if $Q$" ($P\iff Q$) needs **both** directions proved.

> [!DEF] Direct proof, proof by contrapositive, proof by contradiction
> - **Direct:** assume $P$, deduce $Q$ step by step.
> - **Contrapositive:** assume not-$Q$, deduce not-$P$.
> - **Contradiction:** assume the statement is false, and derive something impossible.

> [!EXAMPLE] $\sqrt 2$ is irrational
> Suppose $\sqrt2 = p/q$ with integers $p,q>0$ and $\gcd(p,q)=1$. Then $p^2 = 2q^2$, so $p^2$ is even, hence $p$ is even (an odd number squared is odd). Write $p=2k$: $4k^2 = 2q^2$, so $q^2=2k^2$ and $q$ is even too. Both even contradicts $\gcd(p,q)=1$. ∎

> [!EXAMPLE] $\sqrt2+\sqrt3$ is irrational
> Suppose $\sqrt2+\sqrt3 = r$ is rational. Squaring, $5+2\sqrt6 = r^2$, so $\sqrt6 = \frac{r^2-5}{2}$ is rational. But $\sqrt6$ is irrational: if $\sqrt6=p/q$ in lowest terms, $p^2=6q^2$ makes $p$ even, $p=2k$, then $2k^2=3q^2$ makes $q$ even, contradicting lowest terms. ∎

> [!WARN] "Proof by example" is not a proof
> Checking $n=1,\dots,100$ proves nothing about all $n$ (e.g. $n^2+n+41$ is prime for $n=0,\dots,39$ but not for $n=40$). Examples give conjectures; only a general argument gives a proof.

## 3 · Induction

> [!DEF] Mathematical induction
> To prove $P(n)$ for all integers $n\ge n_0$:
>
> - **Weak induction:** prove $P(n_0)$ (base case), and $P(n)\Rightarrow P(n+1)$ for every $n\ge n_0$.
> - **Strong induction:** prove $P(n_0)$, and "$P(n_0),\dots,P(n)$ all true ⇒ $P(n+1)$".

> [!EXAMPLE] Every integer $n\ge2$ is a product of primes (strong induction)
> Base: $2$ is prime. Step: let $n\ge3$ and assume every integer in $[2,n-1]$ is a product of primes. If $n$ is prime, done. Otherwise $n=ab$ with $2\le a,b\le n-1$; both $a$ and $b$ are products of primes, so $n$ is too. ∎ (Weak induction from $n-1$ wouldn't help here: knowing $n-1$ factors says nothing about $n$.)

> [!KEY] Strengthen the hypothesis
> Sometimes the statement you want is too weak to carry the induction, but a **stronger** statement goes through, because you get to assume more in the step.

> [!EXAMPLE] $\displaystyle\sum_{k=1}^n\frac1{k^2}<2$
> Induction on "$<2$" fails: adding a term to something below 2 might exceed 2. Prove the stronger $\sum_{k=1}^n\frac1{k^2}\le 2-\frac1n$.
> Base $n=1$: $1\le1$ ✓. Step: $2-\frac1n+\frac1{(n+1)^2}\le2-\frac1{n+1}$ ⟺ $\frac1{(n+1)^2}\le\frac1n-\frac1{n+1}=\frac1{n(n+1)}$, which is true. Hence the sum is $\le 2-\frac1n<2$. ∎

> [!DEF] Infinite descent
> Show that any solution (or counterexample) produces a strictly **smaller** positive one. Since positive integers can't decrease forever, there is none. Equivalently: take a **minimal** counterexample and build a smaller one.

> [!EXAMPLE] $x^2+y^2=3z^2$ has only the trivial integer solution
> Squares are $\equiv0$ or $1\pmod3$, so $x^2+y^2\equiv0\pmod3$ forces $3\mid x$ and $3\mid y$. Then $9\mid 3z^2$, so $3\mid z$. Now $(x/3,y/3,z/3)$ is a smaller solution. Descent: the only solution is $x=y=z=0$. ∎

## 4 · The pigeonhole principle

> [!FORMULA] Pigeonhole principle
> If $n+1$ objects are placed in $n$ boxes, some box contains at least 2 objects. **General form:** if $N$ objects go into $k$ boxes, some box contains at least $\lceil N/k\rceil$ objects.
>
> The art is choosing the **boxes**.

> [!EXAMPLE] Five points in a unit square
> Split the unit square into four $\tfrac12\times\tfrac12$ squares (the boxes). Of 5 points, two lie in the same small square (boundaries included), and two points in a square of side $\tfrac12$ are at most its diagonal apart: $\tfrac{\sqrt2}{2}$. ∎

> [!EXAMPLE] A divisibility pigeonhole
> *Among any $n$ integers, some non-empty subset has sum divisible by $n$.* Consider the prefix sums $S_1=a_1$, $S_2=a_1+a_2$, …, $S_n$. If some $S_i\equiv0\pmod n$, done. Otherwise the $n$ sums take only $n-1$ nonzero residues, so $S_i\equiv S_j$ for some $i<j$, and $a_{i+1}+\dots+a_j = S_j-S_i$ is divisible by $n$. ∎

## 5 · The extremal principle

> [!KEY] Look at the extreme object
> Consider the largest, smallest, longest, first or last object (it exists because the set is finite, or because a minimum exists). Its extremality gives you an inequality for free, and often a contradiction.

> [!EXAMPLE] Sylvester–Gallai
> *A finite set of points in the plane, not all on one line, determines a line passing through exactly two of the points.*
>
> Among all pairs (point $P$, line $\ell$ through at least two of the points, $P\notin\ell$), choose one with the **smallest** distance from $P$ to $\ell$ (finitely many pairs, and at least one exists since not all points are collinear). Suppose $\ell$ contains three points. Let $F$ be the foot of the perpendicular from $P$ to $\ell$. Two of the three points lie on the same side of $F$ (one may equal $F$); call the nearer one $Q$ and the farther $R$, so $Q$ lies on the segment $FR$. Along that segment, the distance to the line $PR$ falls linearly from $d(F, PR)$ at $F$ to $0$ at $R$, so $d(Q,PR)\le d(F,PR)$. And $d(F,PR) < PF$, because $PR$ passes through $P$ and is not perpendicular to $PF$ (it meets $\ell$ at $R$, while the line through $P$ perpendicular to $PF$ is parallel to $\ell$). So the pair ($Q$, line $PR$) has distance $< PF$, contradicting minimality. Hence $\ell$ contains exactly two points. ∎

## 6 · Invariants, monovariants and colouring

> [!DEF] Invariant and monovariant
> - An **invariant** is a quantity that never changes under the allowed moves. If the start and the target have different values, the target is unreachable.
> - A **monovariant** changes in only one direction (e.g. strictly decreases). If it is a non-negative integer, the process must **stop**.

> [!EXAMPLE] Domino tiling of a mutilated chessboard
> Remove two opposite corners from an $8\times8$ chessboard. Both removed squares have the **same colour**, leaving 32 squares of one colour and 30 of the other. Every domino covers one black and one white square, so any tiling covers equally many of each. Impossible. ∎

> [!EXAMPLE] A parity invariant
> The numbers $1,2,\dots,10$ are on a board. A move replaces two numbers $a,b$ by $|a-b|$. Can the last number be $0$? Since $|a-b|\equiv a+b\pmod2$, the **parity of the total** never changes. It starts at $55$ (odd), so the last number is odd: it can't be 0. ∎

> [!EXAMPLE] A monovariant that forces termination
> *In a parliament, each member has at most three enemies (enmity is mutual). Show the members can be split into two houses so that everyone has at most one enemy in their own house.*
>
> Start with any split. Let $E$ = the number of enemy pairs sitting in the same house. If some member has at least 2 enemies in their house, move them: they had $\ge2$ same-house enemies and now have $\le1$, so $E$ drops by at least 1. $E$ is a non-negative integer, so this stops, and when it stops, nobody has 2 enemies in their house. ∎

> [!VIDEO] M64HUIJFTZM | The unexpectedly hard windmill question (2011 IMO, Q2) | 3Blue1Brown · 16 min. A beautiful invariant argument.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Strategy** deck to drill when to use each technique.

## 7 · Writing proofs that earn full marks

> [!KEY] Rules for a gradable proof
> 1. **State what you are proving** at the start, including the answer for "find all" problems.
> 2. **Define every variable** before using it.
> 3. **One claim per paragraph**, with its justification immediately after. Label lemmas ("Claim 1") and refer to them.
> 4. **Don't skip "obvious" steps** the grader can't verify in a few seconds.
> 5. For "find all": prove the answers **work**, *and* that there are **no others**. For "maximum": give a **construction** *and* a **bound**.
> 6. End by saying what has been shown.

> [!WARN] Where points are lost
> At IMO level a large share of lost points come from incomplete write-ups rather than wrong ideas: a missing case, an unchecked answer, a configuration assumed from the figure, a "clearly" that isn't. **Partial credit comes from clearly proven lemmas**, so write down every solid step even if you don't finish.

## Practice (answers hidden)

1. Prove that $n^3-n$ is divisible by 6 for every integer $n$.
<details><summary>Answer</summary>

$n^3-n=(n-1)n(n+1)$, a product of three consecutive integers. Among them one is divisible by 3 and at least one is even, and $\gcd(2,3)=1$, so $6\mid n^3-n$.
</details>

2. Prove that among any 11 integers, two have a difference divisible by 10.
<details><summary>Answer</summary>

Boxes = the 10 possible last digits (residues mod 10). With 11 integers, two share a residue, so their difference is divisible by 10.
</details>

3. Prove by induction that $1+3+5+\dots+(2n-1)=n^2$.
<details><summary>Answer</summary>

Base $n=1$: $1=1^2$. Step: if the sum of the first $n$ odd numbers is $n^2$, adding $2n+1$ gives $n^2+2n+1=(n+1)^2$.
</details>

4. A $10\times10$ board has $1\times4$ tiles placed on it. Can the board be tiled exactly by $1\times4$ tiles? (Hint: colour square $(i,j)$ with colour $(i+j)\bmod4$.)
<details><summary>Answer</summary>

No. Every $1\times4$ tile (horizontal or vertical) covers one square of each of the 4 colours, so a tiling uses each colour exactly 25 times. But counting the colour $(i+j)\bmod 4$ on a $10\times10$ board (with $i,j\in\{0,\dots,9\}$) gives counts 25, 26, 25, 24, which are not all equal. So no tiling exists.
</details>

5. Several real numbers are written around a circle. If four consecutive numbers $a,b,c,d$ satisfy $(a-d)(b-c)>0$, you may swap $b$ and $c$. Show that you can only make finitely many moves. (Hint: look at the sum of products of neighbours.)
<details><summary>Answer</summary>

Let $S$ = the sum of products of adjacent pairs. Swapping $b,c$ changes the neighbour products $ab+bc+cd$ into $ac+cb+bd$, so $S$ changes by $(ac+bd)-(ab+cd) = -(a-d)(b-c)<0$. $S$ strictly decreases, but it can only take finitely many values (one per arrangement of the numbers), so the process stops.
</details>

6. Show that $x^4+y^4=z^2$ has no solutions in positive integers *by explaining which technique you'd use* and what the first steps are.
<details><summary>Answer</summary>

Infinite descent (Fermat). Take a solution with minimal $z$; WLOG $\gcd(x,y)=1$. Then $(x^2,y^2,z)$ is a primitive Pythagorean triple, so $x^2=m^2-n^2$, $y^2=2mn$, $z=m^2+n^2$ (one of $x,y$ even). Applying the Pythagorean parametrisation again to $x^2+n^2=m^2$ and using $y^2=2mn$ produces a new solution with a smaller $z$, a contradiction.
</details>

## Build
- Write **10 complete proofs** of Engel ch. 1–4 problems. Have someone (or your future self, a week later) grade them strictly from 0–7.

## Traps
- "Proof by example": checking cases is **not** a proof.
- Proving the converse instead of the statement.
- Skipping writing practice. At IMO level, many lost points come from incomplete write-ups, not wrong ideas.

## Go deeper (all optional)
- ⭐ **The Art and Craft of Problem Solving**, Paul Zeitz 💲: ch. 1–3 (strategies, tactics). The best first book.
- **Problem-Solving Strategies**, Arthur Engel 💲: ch. 1–4 (invariants, coloring, extremal, pigeonhole). A huge problem bank.
- **[Evan Chen: handouts](https://web.evanchen.cc/handouts.html)**: see "Proof writing" and the "English" handout.
- **[How to Write Proofs, Larry Cusick (short guide)](https://zimmer.fresnostate.edu/~larryc/proofs/proofs.html)**.

## Done when
- [ ] Every skip-test item proved on paper · [ ] 10 graded proofs averaging 6+/7
