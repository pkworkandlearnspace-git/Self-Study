# 03 · Number Theory
> **Goal:** divisibility, modular arithmetic, orders, and Diophantine equations at IMO level. · **Time:** 4–6 weeks (in rotation)

> [!GOAL]
> By the end of this chapter you can:
>
> - use **gcd, Bézout, unique factorization** and $p$-adic valuations fluently;
> - compute with congruences, inverses and the **Chinese remainder theorem**;
> - apply **Fermat, Euler and Wilson**, and the single most useful olympiad idea: the **order** of an element;
> - work with **primitive roots** and **quadratic residues**;
> - use **LTE** and **Legendre's formula** to count prime powers;
> - attack **Diophantine equations** by factoring, working mod $m$, bounding, Pell equations and Vieta jumping.

## Skip test
- [ ] Prove there are infinitely many primes ≡ 3 (mod 4).
- [ ] Use Fermat's little theorem to find $2^{100}\bmod 13$.
- [ ] Show that if $\text{ord}_p(a)=d$ then $d\mid p-1$.
- [ ] Use LTE to find $v_2(3^{2^{n}}-1)$.
- [ ] Solve $x^2-2y^2=1$ in positive integers (Pell) and describe all solutions.
- [ ] Find all $n$ with $n \mid 2^n - 1$.

## 1 · Divisibility, gcd and Bézout

> [!DEF] Divisibility and gcd
> $a\mid b$ ("$a$ divides $b$") means $b=ak$ for some integer $k$. The **greatest common divisor** $\gcd(a,b)$ is the largest integer dividing both; $a,b$ are **coprime** if $\gcd(a,b)=1$.

> [!FORMULA] Euclid's algorithm and Bézout's identity
> $\gcd(a,b)=\gcd(b,\ a\bmod b)$, repeated until the remainder is 0. Running it backwards gives **Bézout**: there are integers $x,y$ with
> $$ax+by=\gcd(a,b)$$
> In particular, $a$ and $b$ are coprime iff $ax+by=1$ has a solution.

> [!EXAMPLE] Euclid and Bézout for 240 and 46
> $240=5\cdot46+10$, $46=4\cdot10+6$, $10=1\cdot6+4$, $6=1\cdot4+2$, $4=2\cdot2$. So $\gcd=2$. Back-substituting: $2=6-4=6-(10-6)=2\cdot6-10=2(46-4\cdot10)-10=2\cdot46-9\cdot10=2\cdot46-9(240-5\cdot46)=47\cdot46-9\cdot240$.

> [!KEY] Useful facts
> - **Euclid's lemma:** if a prime $p\mid ab$, then $p\mid a$ or $p\mid b$. (If $a\mid bc$ and $\gcd(a,b)=1$, then $a\mid c$.)
> - $\gcd(a^m-1,\ a^n-1)=a^{\gcd(m,n)}-1$ for integers $a\ge2$.
> - $a-b\mid a^n-b^n$ for all $n$; $a+b\mid a^n+b^n$ for odd $n$.

> [!DEF] Fundamental theorem of arithmetic and $p$-adic valuation
> Every integer $n\ge2$ is a product of primes in exactly one way (up to order). The **$p$-adic valuation** $v_p(n)$ is the exponent of $p$ in $n$. Think of numbers as exponent vectors: $a\mid b$ iff $v_p(a)\le v_p(b)$ for every $p$; $v_p(ab)=v_p(a)+v_p(b)$; $v_p(\gcd)=\min$, $v_p(\mathrm{lcm})=\max$.

> [!EXAMPLE] Infinitely many primes $\equiv3\pmod4$
> Suppose $p_1,\dots,p_k$ are all of them. Let $N=4p_1\cdots p_k-1\equiv3\pmod 4$. $N$ is odd, and a product of primes all $\equiv1\pmod4$ is $\equiv1\pmod4$, so some prime factor $q$ of $N$ is $\equiv3\pmod4$. But no $p_i$ divides $N$ (it leaves remainder $-1$). Contradiction. ∎

## 2 · Modular arithmetic

> [!DEF] Congruence
> $a\equiv b\pmod n$ means $n\mid a-b$. Congruences can be added, subtracted, multiplied and raised to powers like equations. **Division is different:** $a$ has an **inverse** mod $n$ (some $a^{-1}$ with $aa^{-1}\equiv1$) iff $\gcd(a,n)=1$, and you may only "divide" by such $a$.

> [!WARN] Dividing without an inverse
> $2\cdot3\equiv2\cdot1\pmod4$ but $3\not\equiv1\pmod4$: you can't cancel the 2, since $\gcd(2,4)\ne1$. In general $ac\equiv bc\pmod n$ gives $a\equiv b\pmod{n/\gcd(c,n)}$.

> [!FORMULA] Chinese remainder theorem (CRT)
> If $n_1,\dots,n_k$ are pairwise coprime, the system $x\equiv a_i\pmod{n_i}$ has exactly one solution modulo $n_1n_2\cdots n_k$. So you can study a congruence mod $n$ separately modulo each prime power in $n$.

> [!EXAMPLE] Solving with CRT
> $x\equiv2\pmod3$ and $x\equiv3\pmod5$. Numbers $\equiv3\pmod5$: $3, 8, 13,\dots$; the first $\equiv2\pmod3$ is $8$. So $x\equiv8\pmod{15}$.

## 3 · Fermat, Euler and Wilson

> [!FORMULA] The three classical theorems
> - **Fermat's little theorem:** for a prime $p$ and $p\nmid a$: $a^{p-1}\equiv1\pmod p$. (Equivalently $a^p\equiv a$ for all $a$.)
> - **Euler's theorem:** if $\gcd(a,n)=1$: $a^{\varphi(n)}\equiv1\pmod n$, where $\varphi(n)$ counts $1\le k\le n$ coprime to $n$. For $n=\prod p^{e}$: $\varphi(n)=n\prod_{p\mid n}\big(1-\frac1p\big)$.
> - **Wilson's theorem:** $(p-1)!\equiv-1\pmod p$ for every prime $p$.

> [!EXAMPLE] Why Fermat is true
> The numbers $a,2a,\dots,(p-1)a$ are distinct and nonzero mod $p$ (if $ia\equiv ja$ then $p\mid(i-j)a$, so $i=j$). So they are $1,2,\dots,p-1$ in some order. Multiplying all of them: $a^{p-1}(p-1)!\equiv(p-1)!$, and $(p-1)!$ is invertible, so $a^{p-1}\equiv1$. ∎

> [!EXAMPLE] $2^{100}\bmod13$
> $2^{12}\equiv1\pmod{13}$ and $100=8\cdot12+4$, so $2^{100}\equiv2^4=16\equiv3\pmod{13}$.

## 4 · Orders: the most-used idea

> [!DEF] Order of $a$ modulo $n$
> For $\gcd(a,n)=1$, $\operatorname{ord}_n(a)$ is the **smallest** $d\ge1$ with $a^d\equiv1\pmod n$. Example: $2^1=2$, $2^2=4$, $2^3=8\equiv1\pmod7$, so $\operatorname{ord}_7(2)=3$.

> [!FORMULA] The key lemma
> $$a^k\equiv1\pmod n\iff\operatorname{ord}_n(a)\mid k$$
> *Proof:* write $k=qd+r$ with $0\le r<d=\operatorname{ord}_n(a)$. Then $a^k=(a^d)^qa^r\equiv a^r$, and $a^r\equiv1$ with $r<d$ forces $r=0$ by minimality.
>
> **Consequences:** $\operatorname{ord}_n(a)\mid\varphi(n)$, and for a prime, $\operatorname{ord}_p(a)\mid p-1$.

> [!EXAMPLE] All $n$ with $n\mid 2^n-1$
> $n=1$ works. Suppose $n>1$ and let $p$ be the **smallest** prime factor of $n$; $p$ is odd since $2^n-1$ is odd. Then $2^n\equiv1\pmod p$, so $d=\operatorname{ord}_p(2)$ divides $n$, and also $d\mid p-1$. Every prime factor of $d$ is less than $p$, yet divides $n$, contradicting the choice of $p$, unless $d=1$. But $d=1$ means $p\mid2-1$, impossible. **Answer: $n=1$ only.** ∎

> [!DEF] Primitive roots
> $g$ is a **primitive root** mod $n$ if $\operatorname{ord}_n(g)=\varphi(n)$: its powers hit every residue coprime to $n$. Primitive roots exist exactly when $n=1,2,4,p^k$ or $2p^k$ ($p$ an odd prime). For a prime $p$, there are exactly $\varphi(d)$ residues of order $d$ for each $d\mid p-1$; in particular $\varphi(p-1)$ primitive roots.

> [!EXAMPLE] Orders modulo 13
> The orders of $1,\dots,12$ mod 13 are all divisors of 12, and the counts are: order 1: one, order 2: one, order 3: two, order 4: two, order 6: two, order 12: four ($2, 6, 7, 11$). These match $\varphi(1),\varphi(2),\varphi(3),\varphi(4),\varphi(6),\varphi(12)=1,1,2,2,2,4$.

> [!TRY] [Modular arithmetic lab](interactive/modular-arithmetic.html)
> Show the power table mod 13 and check the orders above. Then try mod 15 (not of the allowed form) and see that no residue reaches order $\varphi(15)=8$.

## 5 · Quadratic residues

> [!DEF] Quadratic residue and Legendre symbol
> For an odd prime $p$ and $p\nmid a$: $a$ is a **quadratic residue** (QR) mod $p$ if $x^2\equiv a$ has a solution. The **Legendre symbol** $\left(\frac ap\right)$ is $+1$ for a QR and $-1$ otherwise. Exactly half of the nonzero residues, $\frac{p-1}2$ of them, are QRs.

> [!FORMULA] Euler's criterion and the special cases
> $$\Big(\frac ap\Big)\equiv a^{\frac{p-1}2}\pmod p$$
> Consequences: $\left(\frac{-1}p\right)=1$ iff $p\equiv1\pmod4$; $\left(\frac{2}p\right)=1$ iff $p\equiv\pm1\pmod8$. The symbol is multiplicative: $\left(\frac{ab}p\right)=\left(\frac ap\right)\left(\frac bp\right)$.

> [!FORMULA] Quadratic reciprocity
> For distinct odd primes $p,q$:
> $$\Big(\frac pq\Big)\Big(\frac qp\Big)=(-1)^{\frac{p-1}2\cdot\frac{q-1}2}$$
> So the two symbols are equal unless both $p,q\equiv3\pmod4$, in which case they are opposite.

> [!EXAMPLE] A prime factor of $n^2+1$
> If an odd prime $p$ divides $n^2+1$, then $n^2\equiv-1\pmod p$, so $-1$ is a QR and $p\equiv1\pmod4$. (The primes below 60 that divide some $x^2+1$ are $2,5,13,17,29,37,41,53$, all $\equiv1\pmod4$ except 2.)

## 6 · Counting prime powers: LTE and Legendre

> [!FORMULA] Lifting the exponent (LTE)
> **Odd prime $p$:** if $p\mid a-b$ and $p\nmid a$, $p\nmid b$, then for every $n\ge1$
> $$v_p(a^n-b^n)=v_p(a-b)+v_p(n)$$
> **$p=2$:** if $a,b$ are odd and $n$ is **even**, then
> $$v_2(a^n-b^n)=v_2(a-b)+v_2(a+b)+v_2(n)-1$$
> (For odd $n$ and odd $a,b$: $v_2(a^n-b^n)=v_2(a-b)$.)

> [!EXAMPLE] $v_2\big(3^{2^n}-1\big)$
> $a=3$, $b=1$, exponent $2^n$ (even): $v_2(3-1)+v_2(3+1)+v_2(2^n)-1=1+2+n-1=n+2$. Check: $3^2-1=8=2^3$ ($n=1$ ✓), $3^4-1=80=2^4\cdot5$ ($n=2$ ✓).

> [!FORMULA] Legendre's formula
> $$v_p(n!)=\sum_{k\ge1}\Big\lfloor\frac{n}{p^k}\Big\rfloor$$
> (count multiples of $p$, then add one more for each multiple of $p^2$, and so on). *Example:* $100!$ ends in $v_5(100!)=20+4=24$ zeros.

> [!DEF] Zsigmondy's theorem
> For coprime $a>b\ge1$ and $n\ge2$, $a^n-b^n$ has a prime factor that divides no $a^k-b^k$ with $k<n$, except when $(a,b,n)=(2,1,6)$, or $n=2$ and $a+b$ is a power of 2. Powerful, but some graders want such heavy theorems avoided or justified; use with care.

## 7 · Diophantine equations

> [!KEY] The toolkit
> 1. **Factor:** rewrite as a product equal to a known number, then list the divisor pairs.
> 2. **Work mod $m$:** squares, cubes and powers take few values mod 3, 4, 5, 7, 8, 9, 16; a mismatch rules out solutions.
> 3. **Bound:** use inequalities to show the variables are small, then check by hand.
> 4. **Descent / extremal:** take a minimal solution and build a smaller one (module 01).
> 5. **Special structures:** Pell equations, Vieta jumping, $p$-adic valuations / LTE.

> [!EXAMPLE] Factoring
> Solve $xy=2x+3y$ in positive integers. Rearranged: $(x-3)(y-2)=6$. Positive divisor pairs of 6 give $(x,y)=(4,8),(5,5),(6,4),(9,3)$. (Negative pairs give $x\le2$ or $y\le1$, which fail positivity; check: e.g. $(-1)(-6)$ gives $x=2,y=-4$.)

> [!FORMULA] Pell's equation
> For a non-square $D>0$, all positive solutions of $x^2-Dy^2=1$ are given by
> $$x+y\sqrt D=(x_1+y_1\sqrt D)^k,\qquad k=1,2,3,\dots$$
> where $(x_1,y_1)$ is the smallest positive solution. For $D=2$: $(3,2)$, then $(3+2\sqrt2)^2=17+12\sqrt2$, then $(99,70)$, $(577,408)$, …

> [!EXAMPLE] Vieta jumping (IMO 1988 Problem 6)
> *If $a,b$ are positive integers and $k=\frac{a^2+b^2}{ab+1}$ is an integer, then $k$ is a perfect square.*
>
> Suppose not. Among all pairs of non-negative integers $(a,b)$ with this $k$, take one with $a\ge b$ and $a+b$ minimal. $b=0$ would give $k=a^2$, so $b\ge1$. Now $a$ is a root of $x^2-kb\,x+(b^2-k)=0$; the other root is $a'=kb-a=\frac{b^2-k}{a}$, an integer. If $a'<0$, then $a'^2-kba'+b^2-k\ge1+k+1-k>0$, contradiction; if $a'=0$, then $k=b^2$, contradiction. So $a'>0$ and $a'=\frac{b^2-k}{a}<\frac{b^2}{a}\le b\le a$, so $(b,a')$ is a solution with smaller sum. Contradiction. ∎ (Indeed solutions have $k=1,4,9,\dots$, e.g. $(2,8)$ gives $k=4$ and $(3,27)$ gives $k=9$.)

> [!FORMULA] Floor functions
> Write $x=\lfloor x\rfloor+\{x\}$ with $0\le\{x\}<1$. **Hermite's identity:** $\sum_{k=0}^{n-1}\big\lfloor x+\frac kn\big\rfloor=\lfloor nx\rfloor$.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Number theory** deck to drill the theorems and the special cases of LTE.

## Practice (answers hidden)

1. Find $\gcd(2^{12}-1,\ 2^{18}-1)$.
<details><summary>Answer</summary>

$2^{\gcd(12,18)}-1=2^6-1=63$.
</details>

2. Find the last two digits of $7^{2024}$.
<details><summary>Answer</summary>

$7^4=2401\equiv1\pmod{100}$. $2024=4\cdot506$, so $7^{2024}\equiv1\pmod{100}$: the last two digits are **01**.
</details>

3. Prove that $p^2-1$ is divisible by 24 for every prime $p\ge5$.
<details><summary>Answer</summary>

$p^2-1=(p-1)(p+1)$. $p$ is odd, so $p-1,p+1$ are consecutive even numbers: one is divisible by 4, giving $8\mid p^2-1$. $p$ isn't divisible by 3, so one of $p-1,p+1$ is: $3\mid p^2-1$. Since $\gcd(8,3)=1$, $24\mid p^2-1$.
</details>

4. Show that $x^2+y^2=4z+3$ has no integer solutions.
<details><summary>Answer</summary>

Squares are $0$ or $1\pmod4$, so $x^2+y^2\in\{0,1,2\}\pmod4$, never $3$.
</details>

5. Find $v_3\big(2^{54}-1\big)$.
<details><summary>Answer</summary>

$2^{54}-1=4^{27}-1$. LTE with $p=3$, $a=4,b=1$ ($3\mid4-1$): $v_3(4-1)+v_3(27)=1+3=4$.
</details>

6. How many zeros does $1000!$ end with?
<details><summary>Answer</summary>

$v_5(1000!)=200+40+8+1=249$ (and there are more 2s than 5s), so **249**.
</details>

7. Find all primes $p$ for which $p^2+2$ is also prime.
<details><summary>Answer</summary>

If $p\ne3$, then $p^2\equiv1\pmod3$, so $3\mid p^2+2>3$: not prime. $p=3$ gives $11$, prime. **Answer: $p=3$.**
</details>

## Build
- Use the lab to find the order of every $a$ mod 13, then *prove* the pattern you see (the orders divide 12; there are exactly $\varphi(d)$ elements of order $d$).
- Solve N1–N4 from recent IMO Shortlists.

## Traps
- Dividing in congruences without checking that the inverse exists.
- Forgetting the $p=2$ special case of LTE and quadratic residues.
- Using Zsigmondy without stating the exceptions.

## Go deeper (all optional)
- ⭐ **Modern Olympiad Number Theory, Aditya Khurmi**: a free PDF shared by the author on AoPS (search the title). Thorough and olympiad-focused.
- **[Evan Chen's NT handouts](https://web.evanchen.cc/handouts.html)** (orders) · **[Yufei Zhao: NT handouts](https://yufeizhao.com/olympiad/)**.
- **Number Theory: Structures, Examples, and Problems**, Andreescu & Andrica 💲 · **104 Number Theory Problems**, Andreescu et al. 💲.
- **[AoPS: Introduction to Number Theory](https://artofproblemsolving.com/store)** 💲 if you need the basics.

## Done when
- [ ] Every skip-test item proved on paper · [ ] 20 shortlist N-problems attempted, key ideas logged
