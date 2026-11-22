# 03 · Number Theory
> **Goal:** divisibility, modular arithmetic, orders, and Diophantine equations at IMO level. · **Time:** 4–6 weeks (in rotation)

👉 Use the **[Modular arithmetic lab](interactive/modular-arithmetic.html)** to *see* orders and primitive roots.

## Skip test
- [ ] Prove there are infinitely many primes ≡ 3 (mod 4).
- [ ] Use Fermat's little theorem to find $2^{100}\bmod 13$.
- [ ] Show that if $\text{ord}_p(a)=d$ then $d\mid p-1$.
- [ ] Use LTE to find $v_2(3^{2^{n}}-1)$.
- [ ] Solve $x^2-2y^2=1$ in positive integers (Pell) and describe all solutions.
- [ ] Find all $n$ with $n \mid 2^n - 1$.

## Core ideas
- **Divisibility & gcd:** Euclid's algorithm, **Bézout** ($ax+by=\gcd(a,b)$), $\gcd(a^m-1,a^n-1)=a^{\gcd(m,n)}-1$.
- **Fundamental theorem of arithmetic.** **$p$-adic valuation** $v_p(n)$: think of numbers as exponent vectors.
- **Modular arithmetic:** inverses exist iff $\gcd(a,n)=1$. **CRT:** you can solve congruences modulo coprime moduli independently.
- **Fermat:** $a^{p-1}\equiv1\pmod p$. **Euler:** $a^{\varphi(n)}\equiv1\pmod n$. **Wilson:** $(p-1)!\equiv-1\pmod p$.
- **Order:** $\text{ord}_n(a)$ = the smallest $d$ with $a^d\equiv1$. **Key lemma:** $a^k\equiv1 \iff \text{ord}\mid k$. This is the most-used idea in olympiad NT.
- **Primitive roots** exist mod $1, 2, 4, p^k, 2p^k$. So $(\mathbb Z/p)^\times$ is cyclic.
- **Quadratic residues:** Legendre symbol, Euler's criterion $\left(\frac ap\right)\equiv a^{\frac{p-1}2}$, $-1$ is a QR mod $p$ iff $p\equiv1\pmod4$. Quadratic reciprocity.
- **Lifting The Exponent (LTE):** for odd prime $p\mid a-b$, $p\nmid a,b$: $v_p(a^n-b^n)=v_p(a-b)+v_p(n)$. (Special rules for $p=2$.)
- **Legendre's formula:** $v_p(n!)=\sum_{k\ge1}\lfloor n/p^k\rfloor$.
- **Zsigmondy's theorem** (use with care; graders may want a proof): $a^n-b^n$ has a primitive prime divisor, apart from listed exceptions.
- **Diophantine equations:** factor, work mod $m$ to rule out cases, bound sizes (inequalities!), use infinite descent, Pell equations, Vieta jumping.
- **Floor functions:** write $x = \lfloor x\rfloor + \{x\}$. Hermite's identity.

## Learn from
- ⭐ **Modern Olympiad Number Theory, Aditya Khurmi**: a free PDF shared by the author on AoPS (search the title). Thorough and olympiad-focused.
- **[Evan Chen's NT handouts](https://web.evanchen.cc/handouts.html)** (orders) · **[Yufei Zhao: NT handouts](https://yufeizhao.com/olympiad/)**.
- **Number Theory: Structures, Examples, and Problems**, Andreescu & Andrica 💲 · **104 Number Theory Problems**, Andreescu et al. 💲.
- **[AoPS: Introduction to Number Theory](https://artofproblemsolving.com/store)** 💲 if you need the basics.

## Build
- Use the lab to find the order of every $a$ mod 13, then *prove* the pattern you see (the orders divide 12; there are exactly $\varphi(d)$ elements of order $d$).
- Solve N1–N4 from recent IMO Shortlists.

## Traps
- Dividing in congruences without checking that the inverse exists.
- Forgetting the $p=2$ special case of LTE and quadratic residues.
