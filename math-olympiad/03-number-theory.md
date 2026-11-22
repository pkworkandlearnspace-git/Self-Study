# 03 · Number Theory
> **Goal:** divisibility, modular arithmetic, orders, and Diophantine equations at IMO level. · **Time:** 4–6 weeks (in rotation)

👉 Use the **[Modular arithmetic lab](interactive/modular-arithmetic.html)** to *see* orders and primitive roots, and the **[NT toolkit](interactive/nt-toolkit.html)** to step through Euclid/Bézout, CRT, and check LTE and Legendre's formula on real numbers.

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
- **Primitive roots** exist mod $n$ iff $n\in\{1,2,4,p^k,2p^k\}$ with $p$ an **odd** prime. In particular $(\mathbb Z/p)^\times$ is cyclic, and there are exactly $\varphi(d)$ elements of order $d$ for each $d\mid p-1$.
- **Quadratic residues** (odd prime $p$): Legendre symbol, Euler's criterion $\left(\frac ap\right)\equiv a^{\frac{p-1}2}\pmod p$. $-1$ is a QR iff $p\equiv1\pmod4$; $2$ is a QR iff $p\equiv\pm1\pmod8$. Quadratic reciprocity: $\left(\frac pq\right)\left(\frac qp\right)=(-1)^{\frac{p-1}2\cdot\frac{q-1}2}$.
- **Lifting The Exponent (LTE):** for odd prime $p\mid a-b$, $p\nmid a,b$: $v_p(a^n-b^n)=v_p(a-b)+v_p(n)$. For **$p=2$**, $a,b$ odd: if $4\mid a-b$ then $v_2(a^n-b^n)=v_2(a-b)+v_2(n)$; if $n$ is even then $v_2(a^n-b^n)=v_2(a-b)+v_2(a+b)+v_2(n)-1$. Graders usually expect you to state LTE precisely (or prove it in a line by induction).
- **Legendre's formula:** $v_p(n!)=\sum_{k\ge1}\lfloor n/p^k\rfloor$.
- **Zsigmondy's theorem:** for coprime $a>b\ge1$ and $n\ge2$, $a^n-b^n$ has a prime divisor that divides no $a^k-b^k$ with $k<n$, except for $(a,b,n)=(2,1,6)$ and the case $n=2$, $a+b$ a power of 2. It kills many problems instantly, but it is heavy: at the IMO it is accepted as a known theorem, though a self-contained argument (orders + LTE) is safer when one exists.
- **Diophantine equations:** factor, work mod $m$ to rule out cases, bound sizes (inequalities!), use infinite descent, Pell equations, Vieta jumping.
- **Floor functions:** write $x = \lfloor x\rfloor + \{x\}$. Hermite's identity.

## Worked examples

<details><summary><b>Example 1 (order lemma).</b> Find all $n\ge1$ with $n\mid 2^n-1$.</summary>

$n=1$ works. Suppose $n>1$ and let $p$ be the **smallest** prime divisor of $n$ ($p$ is odd since $2^n-1$ is odd). Then $2^n\equiv1\pmod p$, so $d=\text{ord}_p(2)$ divides $n$. Also $d\mid p-1$ (Fermat). Every prime factor of $d$ is $<p$ and divides $n$, but $p$ is the smallest prime factor of $n$, so $d=1$, i.e. $2\equiv1\pmod p$. Contradiction. **Only $n=1$.**

*Key idea:* "smallest prime factor" + order dividing both $n$ and $p-1$ ⇒ order is 1.
</details>

<details><summary><b>Example 2 (LTE).</b> Find $v_2(3^{2^n}-1)$ and $v_3(2^{3^k}+1)$.</summary>

**p = 2, n even case:** $v_2(3^{m}-1)=v_2(3-1)+v_2(3+1)+v_2(m)-1=1+2+v_2(m)-1=v_2(m)+2$ for even $m$. With $m=2^n$ ($n\ge1$): $v_2=n+2$. Check $n=1$: $3^2-1=8=2^3$ ✓.

**Odd p:** $2^{3^k}+1=2^{3^k}-(-1)^{3^k}$, and $3\mid 2-(-1)$. LTE: $v_3=v_3(3)+v_3(3^k)=k+1$. Check $k=1$: $2^3+1=9=3^2$ ✓.
</details>

<details><summary><b>Example 3 (modular obstruction + bounding).</b> Solve $2^x+3=y^2$ in non-negative integers.</summary>

$x=0$: $y^2=4$, $y=2$. $x=1$: $y^2=5$ ✗. $x\ge2$: $y^2\equiv3\pmod4$, impossible (squares are 0, 1 mod 4). **Only $(x,y)=(0,2)$.**

*Key idea:* reduce modulo a power of the base to kill large cases, then check small ones by hand.
</details>

<details><summary><b>Example 4 (Vieta jumping, IMO 1988/6).</b> If $a,b$ are positive integers and $ab+1\mid a^2+b^2$, show $\frac{a^2+b^2}{ab+1}$ is a perfect square.</summary>

Fix $k=\frac{a^2+b^2}{ab+1}$ and suppose $k$ is not a square. Among all pairs $(a,b)$ with this $k$, take one with $a\ge b$ and $a+b$ minimal. $a$ is a root of $x^2-kbx+(b^2-k)=0$; the other root is $a'=kb-a=\frac{b^2-k}{a}$, an integer. $a'\ne0$ (else $k=b^2$), and $a'>0$ (if $a'<0$ then $a'^2+b^2=k(a'b+1)\le0$, impossible). Since $a\ge b$: $a'=\frac{b^2-k}{a}<\frac{b^2}{a}\le b\le a$. So $(a',b)$ is a smaller solution with the same $k$. Contradiction.

*Key idea:* view the condition as a quadratic in one variable; the **other root** gives a smaller solution (descent).
</details>

<details><summary><b>Example 5 (Legendre).</b> How many zeros does $1000!$ end with?</summary>

$v_5(1000!)=200+40+8+1=249$ and $v_2\gg v_5$, so **249** zeros.
</details>

## Practice
<details><summary>N1. Prove that for odd prime $p$, $1^{p-1}+2^{p-1}+\dots+(p-1)^{p-1}\equiv-1\pmod p$.</summary>

Each term is $\equiv1$ by Fermat; there are $p-1$ terms: sum $\equiv p-1\equiv-1$.
</details>

<details><summary>N2. Find all primes $p$ such that $p^2+2$ is also prime.</summary>

If $p\ne3$, $p^2\equiv1\pmod3$ so $3\mid p^2+2>3$. $p=3$: $11$ prime ✓. **Only $p=3$.**
</details>

<details><summary>N3. Prove: if $p$ is a prime and $p\mid a^2+b^2$ with $p\equiv3\pmod4$, then $p\mid a$ and $p\mid b$.</summary>

If $p\nmid b$, then $(ab^{-1})^2\equiv-1\pmod p$, so $-1$ would be a QR mod $p$, which needs $p\equiv1\pmod4$. So $p\mid b$, then $p\mid a^2$, so $p\mid a$.
</details>

<details><summary>N4. Find the last two digits of $7^{2026}$.</summary>

$7^4=2401\equiv1\pmod{100}$, so $\text{ord}_{100}(7)=4$. $2026\equiv2\pmod4$, so $7^{2026}\equiv49$. **49.**
</details>

<details><summary>N5. Show $\gcd(a^m-1,a^n-1)=a^{\gcd(m,n)}-1$ for integers $a\ge2$.</summary>

Let $d=\gcd(m,n)$ and $g=\gcd(a^m-1,a^n-1)$. $a^d-1$ divides both (since $x-1\mid x^k-1$ with $x=a^d$), so $a^d-1\mid g$. Conversely $a^m\equiv a^n\equiv1\pmod g$, so $\text{ord}_g(a)$ divides $m$ and $n$, hence divides $d$, so $g\mid a^d-1$.
</details>

<details><summary>N6. (Harder, IMO 1990/3) Find all integers $n>1$ with $n^2\mid 2^n+1$.</summary>

Sketch: $n$ odd; let $p$ be the smallest prime of $n$. $\text{ord}_p(2)\mid 2n$ and $\mid p-1$, so it divides $\gcd(2n,p-1)=2$, giving $p\mid 3$, $p=3$. LTE: $v_3(2^n+1)=1+v_3(n)\ge 2v_3(n)$, so $v_3(n)=1$. Write $n=3m$, $3\nmid m$; repeat with the smallest prime $q$ of $m$ (if $m>1$): $\text{ord}_q(2)\mid\gcd(6m,q-1)$ which divides $6$, so $q\mid 2^6-1=63$, $q=7$; but $3\mid n$ gives $2^n\equiv1\pmod7$, so $2^n+1\equiv2\pmod 7$, contradiction. So $m=1$: **$n=3$** ($9\mid 9$ ✓).
</details>

## Learn from
- ⭐ **Modern Olympiad Number Theory, Aditya Khurmi**: free PDF; the author's announcement and download links are in [this AoPS thread](https://artofproblemsolving.com/community/c6h2344755). Thorough and olympiad-focused (orders, LTE, QR, Diophantine equations).
- **[Evan Chen's NT handouts](https://web.evanchen.cc/handouts.html)** (orders) · **[Yufei Zhao: NT handouts](https://yufeizhao.com/olympiad/)**.
- **Number Theory: Structures, Examples, and Problems**, Andreescu & Andrica 💲 · **104 Number Theory Problems**, Andreescu et al. 💲.
- **[AoPS: Introduction to Number Theory](https://artofproblemsolving.com/store)** 💲 if you need the basics.

## Build
- Use the lab to find the order of every $a$ mod 13, then *prove* the pattern you see (the orders divide 12; there are exactly $\varphi(d)$ elements of order $d$).
- Solve N1–N4 from recent IMO Shortlists.

## Traps
- Dividing in congruences without checking that the inverse exists.
- Forgetting the $p=2$ special case of LTE and quadratic residues.
- Using LTE when $p\mid a$ (the hypothesis $p\nmid ab$ matters: $v_3(6^2-3^2)=v_3(27)=3$, not $v_3(3)+v_3(2)=1$).
- Concluding $\text{ord}=p-1$ from $a^{(p-1)/2}\not\equiv1$ alone: you must check $a^{(p-1)/q}\not\equiv1$ for **every** prime $q\mid p-1$.

## Done when
- [ ] Every Skip-test item done cleanly  - [ ] 20 ISL N1–N4 key ideas logged in `progress.md`
