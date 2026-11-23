# 04 · Combinatorics
> **Goal:** the hardest and least formulaic IMO area. Build a toolkit, then lots of experience. · **Time:** 5–7 weeks (in rotation)

> [!GOAL]
> By the end of this chapter you can:
>
> - count with the product rule, binomial coefficients, **stars and bars**, **inclusion–exclusion** and **bijections**;
> - prove identities by **double counting**, and set up recursions (Catalan numbers) and generating functions;
> - use graph theory: degrees, trees, bipartite graphs, Euler circuits, **Hall's theorem**, **Mantel/Turán**, **Ramsey**;
> - analyse games (P/N positions, **Nim**, strategy stealing);
> - use the **probabilistic method**, and handle "find the maximum" problems with a construction *and* a bound.
>
> The general tools of module 01 (pigeonhole, extremal principle, invariants, colouring) are the main weapons here; this chapter adds the specialised ones.

## Skip test
- [ ] Count lattice paths from $(0,0)$ to $(m,n)$ and give a bijective proof of $\binom{n}{k}=\binom{n}{n-k}$.
- [ ] Use stars and bars: the number of solutions of $x_1+\dots+x_k=n$ with $x_i\ge0$.
- [ ] Inclusion–exclusion: count derangements $D_n$.
- [ ] Double counting: prove $\sum_v \deg v = 2|E|$, and $\sum_k k\binom nk = n2^{n-1}$.
- [ ] Game theory: find the winning positions in Nim.
- [ ] Prove $R(3,3)=6$.

## 1 · Basic counting

> [!DEF] Product and sum rules, permutations, combinations
> - **Sum rule:** if a choice is made from one of several disjoint sets, add their sizes.
> - **Product rule:** for a sequence of independent choices with $a_1,a_2,\dots$ options, multiply.
> - Arrangements of $n$ distinct objects: $n!$. Ordered selections of $k$: $\frac{n!}{(n-k)!}$.
> - **Binomial coefficient** $\binom nk=\frac{n!}{k!(n-k)!}$: the number of $k$-element subsets of an $n$-element set.

> [!FORMULA] Binomial theorem and Pascal's rule
> $$(x+y)^n=\sum_{k=0}^n\binom nkx^ky^{n-k},\qquad \binom nk=\binom{n-1}{k-1}+\binom{n-1}{k}$$
> Pascal's rule: a $k$-subset either contains element $n$ (choose the other $k-1$) or doesn't (choose all $k$ from the rest).

> [!EXAMPLE] Lattice paths
> Paths from $(0,0)$ to $(m,n)$ using unit steps right (R) and up (U) are words with $m$ R's and $n$ U's, so there are $\binom{m+n}{m}$ of them.

> [!KEY] Bijective proofs
> Show two sets have the same size by pairing their elements exactly. *Example:* $\binom nk=\binom n{n-k}$ because choosing which $k$ elements to **take** is the same as choosing which $n-k$ to **leave**.

> [!FORMULA] Stars and bars
> The number of solutions of $x_1+\dots+x_k=n$ in **non-negative** integers is
> $$\binom{n+k-1}{k-1}$$
> (arrange $n$ stars and $k-1$ bars in a row). With $x_i\ge1$: $\binom{n-1}{k-1}$ (substitute $y_i=x_i-1$).

## 2 · Inclusion–exclusion

> [!FORMULA] Inclusion–exclusion principle
> $$\begin{aligned}|A_1\cup\dots\cup A_n|=&\sum_i|A_i|-\sum_{i<j}|A_i\cap A_j|+\sum_{i<j<k}|A_i\cap A_j\cap A_k|\\&-\dots+(-1)^{n+1}|A_1\cap\dots\cap A_n|\end{aligned}$$
> Typically $A_i$ = "property $i$ fails", and you count the complement.

> [!EXAMPLE] Derangements
> A **derangement** is a permutation with no fixed point. Let $A_i$ = permutations fixing $i$; any $k$ of them intersect in $(n-k)!$ permutations. So
> $$D_n=n!-\binom n1(n-1)!+\binom n2(n-2)!-\dots=n!\sum_{k=0}^n\frac{(-1)^k}{k!}$$
> $D_1,\dots,D_5=0,1,2,9,44$, and $D_n/n!\to1/e$.

## 3 · Double counting

> [!KEY] Count one thing in two ways
> Count the same set of pairs (person, club), (vertex, edge), (row, column)… once in each order. The two expressions are equal, which often yields the inequality or identity you need.

> [!EXAMPLE] Handshake lemma
> Count pairs (vertex, edge at that vertex): by vertices it is $\sum_v\deg v$; by edges it is $2|E|$ (each edge has two ends). So $\sum_v\deg v=2|E|$, and in particular the number of odd-degree vertices is **even**.

> [!EXAMPLE] $\sum_k k\binom nk=n2^{n-1}$
> Count pairs (committee, chair) from $n$ people, the chair being a member. By committee size $k$: $\binom nk$ committees, $k$ chairs each. By chair first: $n$ choices, then any subset of the other $n-1$ people: $n2^{n-1}$. ∎

## 4 · Recursion and generating functions

> [!DEF] Setting up a recursion
> Express $a_n$ through smaller cases by looking at the **first** (or last) step. *Example:* tilings of a $2\times n$ strip with dominoes: the left end is either one vertical domino ($a_{n-1}$ ways to finish) or two horizontal ones ($a_{n-2}$), so $a_n=a_{n-1}+a_{n-2}$: Fibonacci numbers.

> [!FORMULA] Catalan numbers
> $$C_n=\frac1{n+1}\binom{2n}n:\quad 1,1,2,5,14,42,\dots$$
> They count balanced bracket strings with $n$ pairs, lattice paths that never go above the diagonal, triangulations of a convex $(n+2)$-gon, and binary trees with $n$ nodes. Recursion: $C_{n+1}=\sum_{i=0}^nC_iC_{n-i}$.

> [!DEF] Generating functions
> Encode a sequence as $A(x)=\sum a_nx^n$. Products of generating functions correspond to combining independent choices. *Example:* the number of ways to pay $n$ with coins of 1 and 2 is the coefficient of $x^n$ in $\frac1{(1-x)(1-x^2)}$, which is $\lfloor n/2\rfloor+1$. Roots of unity (module 02) then extract coefficients with index in a residue class.

> [!LEARN]
> 3Blue1Brown's lesson "[Olympiad level counting](https://www.3blue1brown.com/lessons/subsets-puzzle)" solves a US training problem (subsets of $\{1,\dots,2000\}$ with sum divisible by 5) with generating functions and roots of unity.

## 5 · Graph theory

> [!DEF] Graph vocabulary
> A **graph** has vertices and edges (pairs of vertices). The **degree** of a vertex is its number of edges. A graph is **connected** if any two vertices are joined by a path. A **cycle** is a closed path with no repeated vertex. A **tree** is a connected graph with no cycle. A graph is **bipartite** if its vertices split into two sides with every edge going between them.

> [!FORMULA] Basic theorems
> - A tree with $n$ vertices has exactly $n-1$ edges; adding any edge creates a cycle; removing any edge disconnects it.
> - A graph is bipartite **iff** it has no odd cycle.
> - **Euler:** a connected graph has a closed walk using every edge exactly once iff every degree is even (an open one iff exactly 0 or 2 vertices have odd degree).

> [!FORMULA] Hall's marriage theorem
> A bipartite graph with sides $X,Y$ has a matching covering all of $X$ iff for every subset $S\subseteq X$, the set of neighbours $N(S)$ satisfies $|N(S)|\ge|S|$.

> [!FORMULA] Mantel's theorem (Turán for triangles)
> A graph on $n$ vertices with no triangle has at most $\big\lfloor\frac{n^2}{4}\big\rfloor$ edges. Equality for the complete bipartite graph with parts of sizes $\lfloor n/2\rfloor$ and $\lceil n/2\rceil$. (Turán's theorem generalises this to graphs with no $K_{r+1}$.)

> [!EXAMPLE] $R(3,3)=6$
> *Any 2-colouring of the edges of $K_6$ contains a monochromatic triangle; $K_5$ does not have to.*
> Pick a vertex $v$; it has 5 edges, so by pigeonhole at least 3 have the same colour, say red, to $a,b,c$. If any edge among $a,b,c$ is red, it forms a red triangle with $v$; otherwise $abc$ is a blue triangle. For $K_5$: colour the edges of a pentagon red and its diagonals (a pentagram) blue; neither colour contains a triangle. ∎

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Combinatorics** deck to drill the named theorems.

## 6 · Games

> [!DEF] P-positions and N-positions
> In a finite two-player game with no draws where the player who can't move loses: a position is a **P-position** (Previous player wins) if every move leads to an N-position, and an **N-position** (Next player wins) if some move leads to a P-position. Terminal positions are P. Work **backwards** from the end.

> [!FORMULA] Nim
> Several heaps; a move removes any positive number of stones from one heap; whoever takes the last stone wins. A position is a P-position **iff the XOR (binary sum without carries) of the heap sizes is 0**. *Example:* heaps $3,5,6$: $011\oplus101\oplus110=000$, so the player to move loses with best play.
>
> **Sprague–Grundy:** every impartial game position is equivalent to a single Nim heap (its Grundy value), so sums of games are solved by XOR-ing these values.

> [!DEF] Strategy stealing and symmetry
> **Strategy stealing:** if an extra move can never hurt you, then the first player can't be losing: otherwise they make an arbitrary move and then follow the second player's "winning" strategy. (Proves the first player wins Chomp and Hex, without saying how.) **Symmetry:** answer each move with its mirror image so that you always have a reply.

## 7 · The probabilistic method and extremal problems

> [!KEY] The probabilistic method
> To show a good object **exists**, pick one at random and show the expected number of "bad" features is less than 1 (then some choice has none), or that the expected value of a quantity is at least $X$ (then some choice achieves $X$).

> [!EXAMPLE] A lower bound for Ramsey numbers
> Colour each edge of $K_n$ red or blue at random. A fixed set of $k$ vertices is monochromatic with probability $2\cdot2^{-\binom k2}$. If $\binom nk2^{1-\binom k2}<1$, the expected number of monochromatic $K_k$ is below 1, so some colouring has none: $R(k,k)>n$. This gives $R(k,k)>2^{k/2}$ for $k\ge3$.

> [!WARN] "Find the maximum" needs two proofs
> An extremal answer $M$ requires (1) a **construction** achieving $M$, and (2) a **bound** proving nothing exceeds $M$. Giving only one of them earns little credit. Find the construction from small cases first; it tells you what the bound must be tight on.

## Practice (answers hidden)

1. How many solutions does $a+b+c=10$ have in positive integers?
<details><summary>Answer</summary>

$\binom{10-1}{3-1}=\binom92=36$.
</details>

2. How many integers from 1 to 1000 are divisible by none of 2, 3, 5?
<details><summary>Answer</summary>

Divisible by at least one: $500+333+200-166-100-66+33=734$. So $1000-734=266$.
</details>

3. Prove $\sum_{k=0}^n\binom nk^2=\binom{2n}n$.
<details><summary>Answer</summary>

Choose $n$ people from $n$ men and $n$ women: $\binom{2n}n$. Alternatively choose $k$ men and $n-k$ women for each $k$: $\sum_k\binom nk\binom n{n-k}=\sum_k\binom nk^2$.
</details>

4. In Nim with heaps $1,4,7$, is the first player winning? If so, give a winning move.
<details><summary>Answer</summary>

$1\oplus4\oplus7=001\oplus100\oplus111=010=2\ne0$: winning. Make the XOR 0: change the heap of 7 to $7\oplus2=5$ (remove 2 stones). Check $1\oplus4\oplus5=0$.
</details>

5. Show that at a party of 6 people, some 3 know each other or some 3 are mutual strangers.
<details><summary>Answer</summary>

People = vertices of $K_6$, colour edges by "know" / "don't know". By $R(3,3)=6$ there is a monochromatic triangle.
</details>

6. What is the maximum number of edges in a triangle-free graph on 10 vertices? Give the construction.
<details><summary>Answer</summary>

$\lfloor100/4\rfloor=25$ (Mantel), attained by the complete bipartite graph $K_{5,5}$.
</details>

7. How many balanced strings of 4 pairs of brackets are there?
<details><summary>Answer</summary>

$C_4=\frac15\binom84=14$.
</details>

## Build
- Solve **C1–C4** from the last 5–8 IMO Shortlists. Combinatorics gets better mostly with *volume*, so aim for 60+ problems.

## Traps
- Overcounting from treating identical objects as distinct (or the reverse).
- For max/min problems: giving only the construction or only the bound.

## Go deeper (all optional)
- ⭐ **[Problem Solving Methods in Combinatorics, Pablo Soberón](https://link.springer.com/book/10.1007/978-3-0348-0597-1)** 💲: short, by technique, IMO-focused.
- **[Yufei Zhao's combinatorics handouts](https://yufeizhao.com/olympiad/)** (e.g. "Combinatorics: a few techniques", double counting).
- **102 Combinatorial Problems**, Andreescu & Feng 💲 · **Engel** ch. on combinatorics · **[Evan Chen's handouts](https://web.evanchen.cc/handouts.html)**.
- **[AoPS: Intro / Intermediate Counting & Probability](https://artofproblemsolving.com/store)** 💲 for the basics.

## Done when
- [ ] Every skip-test item proved on paper · [ ] 60+ combinatorics problems attempted, key ideas logged
