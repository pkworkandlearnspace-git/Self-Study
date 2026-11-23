# 02 · Algebra
> **Goal:** inequalities, polynomials, functional equations, and sequences at national-to-IMO level. · **Time:** 4–6 weeks (in rotation)

> [!GOAL]
> By the end of this chapter you can:
>
> - prove and apply **AM-GM, power means, Cauchy–Schwarz (Titu), rearrangement, Chebyshev, Jensen, Schur** and know where each one's equality case is;
> - use the standard techniques: homogenize, normalize, substitute, SOS, tangent line trick;
> - handle **polynomials** with the factor theorem, Vieta, integer-coefficient tricks, roots of unity and interpolation;
> - solve **functional equations** systematically, including Cauchy's equation;
> - solve linear recurrences and telescoping sums.

## Skip test
- [ ] Prove AM-GM for $n$ variables, and use it to minimize $x + \frac{4}{x^2}$ for $x>0$.
- [ ] Prove $\frac{a}{b+c}+\frac{b}{c+a}+\frac{c}{a+b}\ge\frac32$ (Nesbitt) in two different ways.
- [ ] Find all $f:\mathbb R\to\mathbb R$ with $f(x+y)=f(x)+f(y)$ and $f$ monotonic.
- [ ] Use Vieta: if $x^3-6x^2+11x-6$ has roots $r,s,t$, find $r^2+s^2+t^2$ without solving.
- [ ] Explain when equality holds in Cauchy–Schwarz.

## 1 · AM-GM and the mean inequalities

Almost every olympiad inequality rests on one fact: **squares are non-negative**. AM-GM is the first big consequence.

> [!FORMULA] AM-GM inequality
> For non-negative reals $x_1,\dots,x_n$:
> $$\frac{x_1+x_2+\dots+x_n}{n}\ \ge\ \sqrt[n]{x_1x_2\cdots x_n}$$
> with **equality iff all $x_i$ are equal**.
>
> **Weighted AM-GM:** for weights $w_i\ge0$ with $\sum w_i=1$: $\sum w_ix_i\ge\prod x_i^{w_i}$.

> [!EXAMPLE] Proof for $n=2$, and the idea for all $n$
> $n=2$: $\frac{x+y}{2}-\sqrt{xy} = \frac{(\sqrt x-\sqrt y)^2}{2}\ge0$, with equality iff $x=y$.
>
> General $n$ (Cauchy's forward–backward induction): from $n=2$, get $n=4$ by applying it to two pairs, then all powers of 2. For other $n$, pad the list with copies of the mean $m$ up to the next power of 2: the inequality for $2^k$ numbers then gives it for $n$. (Jensen's inequality for the concave $\log$, section 3, is a one-line alternative.)

> [!EXAMPLE] Minimize $x+\frac{4}{x^2}$ for $x>0$
> Split $x$ so that the product becomes constant: $x+\frac4{x^2} = \frac x2+\frac x2+\frac{4}{x^2}\ \ge\ 3\sqrt[3]{\frac x2\cdot\frac x2\cdot\frac4{x^2}} = 3$. Equality needs $\frac x2=\frac4{x^2}$, i.e. $x=2$, where the value is $2+1=3$ ✓. So the minimum is **3**.

> [!KEY] Find the equality case first
> Before choosing a tool, guess where equality holds (usually all variables equal, or one variable 0). An inequality step that is **strict** at that point can't be part of a proof. This single check eliminates most wrong approaches.

> [!FORMULA] Power-mean chain (QM ≥ AM ≥ GM ≥ HM)
> For positive reals:
> $$\sqrt{\frac{\sum x_i^2}{n}}\ \ge\ \frac{\sum x_i}{n}\ \ge\ \sqrt[n]{\prod x_i}\ \ge\ \frac{n}{\sum 1/x_i}$$
> all with equality iff all $x_i$ are equal. A useful consequence (AM-HM): $(x_1+\dots+x_n)\big(\tfrac1{x_1}+\dots+\tfrac1{x_n}\big)\ge n^2$.

## 2 · Cauchy–Schwarz and friends

> [!FORMULA] Cauchy–Schwarz
> For real $a_i,b_i$:
> $$\Big(\sum a_i^2\Big)\Big(\sum b_i^2\Big)\ \ge\ \Big(\sum a_ib_i\Big)^2$$
> **Equality iff** the vectors are proportional: $a_i = \lambda b_i$ for all $i$ (or $\mathbf b=\mathbf 0$).
>
> *Proof:* the quadratic $\sum(a_it-b_i)^2 = t^2\sum a_i^2-2t\sum a_ib_i+\sum b_i^2$ is $\ge0$ for every real $t$, so its discriminant is $\le0$.

> [!FORMULA] Titu's lemma (Engel form)
> For reals $a_i$ and positive $b_i$:
> $$\frac{a_1^2}{b_1}+\dots+\frac{a_n^2}{b_n}\ \ge\ \frac{(a_1+\dots+a_n)^2}{b_1+\dots+b_n}$$
> with equality iff $a_i/b_i$ is constant. Ideal for sums of fractions.

> [!EXAMPLE] Nesbitt's inequality, two proofs
> For $a,b,c>0$: $\frac{a}{b+c}+\frac{b}{c+a}+\frac{c}{a+b}\ge\frac32$.
>
> **Proof 1 (Titu).** Write each term as $\frac{a^2}{a(b+c)}$: the sum is $\ge\frac{(a+b+c)^2}{2(ab+bc+ca)}\ge\frac32$, because $(a+b+c)^2\ge3(ab+bc+ca)$ ⟺ $a^2+b^2+c^2\ge ab+bc+ca$ ⟺ $\tfrac12\sum(a-b)^2\ge0$.
>
> **Proof 2 (AM-HM).** Add 1 to each term: $\sum\frac{a+b+c}{b+c} = (a+b+c)\sum\frac1{b+c}$. By AM-HM, $\big((b+c)+(c+a)+(a+b)\big)\sum\frac1{b+c}\ge9$, so the sum is $\ge\frac92$. Subtract 3. ∎ Equality iff $a=b=c$.

> [!DEF] Rearrangement and Chebyshev
> **Rearrangement:** if $a_1\le\dots\le a_n$ and $b_1\le\dots\le b_n$, then $\sum a_ib_{\sigma(i)}$ is largest when the $b$'s are in the same order ($\sigma$ = identity) and smallest in the opposite order.
> **Chebyshev:** for similarly ordered sequences, $\frac1n\sum a_ib_i\ge\big(\frac1n\sum a_i\big)\big(\frac1n\sum b_i\big)$.

> [!DEF] Hölder (three sequences)
> For positive reals, $\big(\sum a_i^3\big)\big(\sum b_i^3\big)\big(\sum c_i^3\big)\ge\big(\sum a_ib_ic_i\big)^3$. It generalizes Cauchy–Schwarz and handles cube roots and three-factor products.

## 3 · Jensen, Schur and Muirhead

> [!FORMULA] Jensen's inequality
> If $f$ is **convex** on an interval ($f''\ge0$), then for points in it and weights $w_i\ge0$ summing to 1:
> $$f\Big(\sum w_ix_i\Big)\le\sum w_if(x_i)$$
> The inequality reverses for concave $f$. Example: $\log$ is concave, which gives weighted AM-GM immediately.

> [!DEF] Tangent line trick
> To prove $\sum f(x_i)\ge n f(m)$ when $\sum x_i = nm$ is fixed but $f$ is not convex everywhere: find the tangent line at the equality point, $f(x)\ge f(m)+f'(m)(x-m)$, prove it for all allowed $x$ (often just one-variable algebra), and sum.

> [!EXAMPLE] A tangent line in action
> $a,b,c\ge0$ with $a+b+c=3$: show $a^4+b^4+c^4\ge3$. The tangent to $x^4$ at $x=1$ is $4x-3$, and $x^4\ge4x-3$ holds for all real $x$ since $x^4+1+1+1\ge4x$ (AM-GM, or $x^4-4x+3=(x-1)^2(x^2+2x+3)\ge0$). Summing: $\sum a^4\ge4\cdot3-9=3$. ∎

> [!FORMULA] Schur's inequality
> For $a,b,c\ge0$ and $t>0$:
> $$a^t(a-b)(a-c)+b^t(b-a)(b-c)+c^t(c-a)(c-b)\ \ge\ 0$$
> The case $t=1$ expands to $a^3+b^3+c^3+abc\ge ab(a+b)+bc(b+c)+ca(c+a)$. Equality when $a=b=c$, **or** when two are equal and the third is 0. Use it when equality also occurs at a boundary point.

> [!DEF] Muirhead's inequality
> For exponent triples sorted in decreasing order, if $(p_1,p_2,p_3)$ **majorizes** $(q_1,q_2,q_3)$ ($p_1\ge q_1$, $p_1+p_2\ge q_1+q_2$, equal total), then the symmetric sum of $a^{p_1}b^{p_2}c^{p_3}$ is at least that of $a^{q_1}b^{q_2}c^{q_3}$ (for non-negative $a,b,c$). E.g. $(2,0,0)\succ(1,1,0)$ gives $a^2+b^2+c^2\ge ab+bc+ca$. Graders accept it, but SOS or AM-GM proofs are often cleaner.

## 4 · Techniques for inequalities

> [!DEF] The standard toolkit
> - **Homogenize:** use a constraint (e.g. $a+b+c=3$) to make every term the same degree, so you can scale freely.
> - **Normalize:** for a homogeneous inequality, assume WLOG $a+b+c=1$ or $abc=1$.
> - **Substitute:** $a=\frac xy,\ b=\frac yz,\ c=\frac zx$ for $abc=1$; **Ravi substitution** $a=y+z,\ b=z+x,\ c=x+y$ ($x,y,z>0$) for triangle sides.
> - **SOS (sum of squares):** write the difference as $\sum S_c(a-b)^2$ and show the coefficients behave. Key identity:
>   $a^2+b^2+c^2-ab-bc-ca = \tfrac12\big[(a-b)^2+(b-c)^2+(c-a)^2\big]$.
> - **Smoothing / mixing variables:** show the expression improves when two variables move toward each other.

> [!WARN] Common mistakes
> - Applying AM-GM where its equality case can't occur (the bound is then never reached and the "minimum" is wrong).
> - Forgetting sign conditions: AM-GM needs non-negative numbers; Titu needs positive denominators.
> - Using an inequality in the wrong direction while chaining.

## 5 · Polynomials

> [!DEF] Factor theorem and rational root theorem
> - **Factor theorem:** $P(r)=0$ iff $(x-r)$ divides $P(x)$. A nonzero polynomial of degree $n$ has at most $n$ roots.
> - **Rational root theorem:** if $P$ has integer coefficients and $p/q$ (lowest terms) is a root, then $p$ divides the constant term and $q$ divides the leading coefficient.

> [!FORMULA] Vieta's formulas (cubic)
> If $x^3+ax^2+bx+c=(x-r)(x-s)(x-t)$, then
> $$r+s+t=-a,\qquad rs+st+tr=b,\qquad rst=-c$$
> (In general: the elementary symmetric sums of the roots are the coefficients with alternating signs, divided by the leading coefficient.)

> [!EXAMPLE] Symmetric functions without solving
> $x^3-6x^2+11x-6$: $r+s+t=6$, $rs+st+tr=11$. Then $r^2+s^2+t^2=(r+s+t)^2-2(rs+st+tr)=36-22=14$. (Check: the roots are $1,2,3$ and $1+4+9=14$ ✓.)

> [!FORMULA] Integer-coefficient trick
> If $P$ has integer coefficients, then for integers $a\ne b$:
> $$a-b\ \mid\ P(a)-P(b)$$
> because $a^k-b^k$ is divisible by $a-b$ for every $k$.

> [!EXAMPLE] An impossible polynomial
> Is there an integer-coefficient $P$ with $P(1)=2$ and $P(3)=5$? Then $3-1=2$ would divide $5-2=3$. No. ∎

> [!FORMULA] Roots of unity filter
> Let $\omega=e^{2\pi i/n}$. For $P(x)=\sum a_kx^k$:
> $$\sum_{k\equiv0\ (\mathrm{mod}\ n)}a_k = \frac1n\sum_{j=0}^{n-1}P(\omega^j)$$
> because $\sum_{j=0}^{n-1}\omega^{jk}$ is $n$ if $n\mid k$ and $0$ otherwise.

> [!EXAMPLE] $\binom m0+\binom m3+\binom m6+\cdots$
> With $P(x)=(1+x)^m$ and $\omega=e^{2\pi i/3}$: $1+\omega = e^{i\pi/3}$ and $1+\omega^2=e^{-i\pi/3}$, so the sum is $\frac13\big(2^m+2\cos\frac{m\pi}{3}\big)$. Check $m=4$: $\binom40+\binom43=5$ and $\frac13(16+2\cos\frac{4\pi}3)=\frac13(16-1)=5$ ✓.

> [!FORMULA] Lagrange interpolation and finite differences
> The unique polynomial of degree $\le n$ through $(x_0,y_0),\dots,(x_n,y_n)$ is
> $$P(x)=\sum_{i=0}^n y_i\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}$$
> A polynomial of degree $d$ has constant $d$-th finite differences ($\Delta P(x)=P(x+1)-P(x)$ lowers the degree by one).

> [!DEF] Irreducibility tools
> **Eisenstein:** if a prime $p$ divides every coefficient except the leading one, and $p^2$ doesn't divide the constant term, the integer polynomial is irreducible over $\mathbb Q$. **Reduction mod $p$:** if the polynomial (with leading coefficient not divisible by $p$) is irreducible mod $p$, it is irreducible over $\mathbb Q$.

## 6 · Functional equations

> [!KEY] The standard plays
> 1. **Plug in special values:** $x=y=0$, $y=0$, $y=x$, $y=-x$, $x=1$. Find $f(0)$ and $f(1)$.
> 2. **Swap** $x$ and $y$ and compare.
> 3. Prove **injectivity** ($f(a)=f(b)\Rightarrow a=b$) or **surjectivity** (every value is hit). Look for a **fixed point** or a zero.
> 4. **Guess** the answer (usually $f(x)=x$, $cx$, $x+c$, $x^2$ or a constant) and plug it in.
> 5. Prove there are **no other** solutions, then **verify** each answer in the original equation.

> [!DEF] Cauchy's functional equation
> $f(x+y)=f(x)+f(y)$. Then $f(0)=0$, $f(nx)=nf(x)$ by induction, and so $f(q)=qf(1)$ for every **rational** $q$. Over $\mathbb R$, $f(x)=cx$ follows if additionally $f$ is **monotonic**, **continuous**, or **bounded on some interval**. Without such a condition there are wild non-linear solutions (built with a Hamel basis), so you must use the extra condition.

> [!EXAMPLE] Monotonic additive functions are linear
> Let $f$ be additive and increasing, $c=f(1)$. For real $x$, pick rationals $q_1<x<q_2$: then $cq_1=f(q_1)\le f(x)\le f(q_2)=cq_2$. Letting $q_1,q_2\to x$ squeezes $f(x)=cx$. Check: $f(x)=cx$ works. ∎

> [!EXAMPLE] Solving by substitution
> Find all $f:\mathbb R\to\mathbb R$ with $f(x)+2f(1-x)=x^2$.
> Replace $x$ by $1-x$: $f(1-x)+2f(x)=(1-x)^2$. Solve the two linear equations for $f(x)$: $f(x)=\frac{2(1-x)^2-x^2}{3}$. Check: $f(x)+2f(1-x)=\frac{2(1-x)^2-x^2+2\left(2x^2-(1-x)^2\right)}{3}=x^2$ ✓.

> [!EXAMPLE] Surjectivity unlocks the answer
> Find all $f:\mathbb R\to\mathbb R$ with $f\big(f(x)+y\big)=2x+f\big(f(y)-x\big)$.
>
> *Surjective:* put $y=-f(x)$: $f(0)=2x+f\big(f(-f(x))-x\big)$, so $f\big(f(-f(x))-x\big)=f(0)-2x$, which takes every real value as $x$ varies.
> *Find a zero:* so some $a$ has $f(a)=0$. Put $x=a$: $f(y)=2a+f\big(f(y)-a\big)$. As $f(y)$ ranges over all reals $t$: $f(t-a)=t-2a$, i.e. $f(u)=u-a$.
> *Check:* $f(x)=x+c$ gives $x+y+2c$ on both sides ✓. **Answer:** $f(x)=x+c$ for any constant $c$.

> [!WARN] Two classic errors
> Forgetting to **check** that your answers satisfy the original equation, and forgetting that Cauchy's equation over $\mathbb R$ has pathological solutions unless you use an extra condition.

## 7 · Sequences and sums

> [!FORMULA] Linear recurrences
> For $a_{n+2}=pa_{n+1}+qa_n$, solve the **characteristic equation** $r^2=pr+q$. With distinct roots $r_1,r_2$: $a_n=Ar_1^n+Br_2^n$; with a double root $r$: $a_n=(A+Bn)r^n$. Fit $A,B$ to the first two terms.
>
> *Example:* Fibonacci gives $r^2=r+1$, $r=\frac{1\pm\sqrt5}{2}$, hence Binet's formula $F_n=\frac{\varphi^n-\psi^n}{\sqrt5}$.

> [!FORMULA] Telescoping
> Write each term as a difference $g(k)-g(k+1)$; the sum collapses:
> $$\sum_{k=1}^n\frac1{k(k+1)}=\sum_{k=1}^n\Big(\frac1k-\frac1{k+1}\Big)=1-\frac1{n+1}$$

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Algebra** deck to drill the inequalities and their equality cases.

## Practice (answers hidden)

1. For $a,b,c>0$ with $abc=1$, prove $a+b+c\ge3$.
<details><summary>Answer</summary>

AM-GM: $\frac{a+b+c}3\ge\sqrt[3]{abc}=1$. Equality iff $a=b=c=1$.
</details>

2. For $x,y,z>0$ with $x+y+z=1$, find the minimum of $\frac1x+\frac1y+\frac1z$.
<details><summary>Answer</summary>

AM-HM: $(x+y+z)\big(\frac1x+\frac1y+\frac1z\big)\ge9$, so the minimum is $9$, at $x=y=z=\frac13$.
</details>

3. Prove $\frac{a^2}{b}+\frac{b^2}{c}+\frac{c^2}{a}\ge a+b+c$ for $a,b,c>0$.
<details><summary>Answer</summary>

Titu: $\ge\frac{(a+b+c)^2}{a+b+c}=a+b+c$. Equality iff $a/b=b/c=c/a$, i.e. $a=b=c$.
</details>

4. $P$ is a cubic with roots $r,s,t$ and $P(x)=x^3-3x+1$. Find $\frac1r+\frac1s+\frac1t$.
<details><summary>Answer</summary>

$r+s+t=0$, $rs+st+tr=-3$, $rst=-1$. Then $\frac1r+\frac1s+\frac1t=\frac{rs+st+tr}{rst}=\frac{-3}{-1}=3$.
</details>

5. Find all $f:\mathbb R\to\mathbb R$ with $f(x+y)=f(x)+f(y)+2xy$ that are continuous.
<details><summary>Answer</summary>

Let $g(x)=f(x)-x^2$. Then $g(x+y)=g(x)+g(y)$ and $g$ is continuous, so $g(x)=cx$. Hence $f(x)=x^2+cx$; check: $(x+y)^2+c(x+y)=x^2+cx+y^2+cy+2xy$ ✓.
</details>

6. Solve $a_{n+2}=5a_{n+1}-6a_n$ with $a_0=0$, $a_1=1$.
<details><summary>Answer</summary>

$r^2-5r+6=0$ gives $r=2,3$. $a_n=A2^n+B3^n$ with $A+B=0$, $2A+3B=1$: $B=1$, $A=-1$. So $a_n=3^n-2^n$.
</details>

7. Is there a polynomial with integer coefficients such that $P(0)=P(1)=1$ and $P(2)=4$?
<details><summary>Answer</summary>

No. The pair $(0,1)$ is fine ($1\mid0$), and so is $(1,2)$ ($1\mid3$), but the pair $(0,2)$ fails: $2-0=2$ must divide $P(2)-P(0)=3$. (Always check every pair.)
</details>

## Build
- Solve the A1–A4 problems from the last 5 years of **IMO Shortlists**. Make a one-line "key idea" note for each.

## Traps
- Applying AM-GM where the equality case can't happen.
- In functional equations, forgetting to **check the solution** in the original equation, and forgetting the pathological solutions of Cauchy.

## Go deeper (all optional)
- ⭐ **[Evan Chen: "A Brief Introduction to Olympiad Inequalities"](https://web.evanchen.cc/handouts/Ineq/en.pdf)**, plus his functional equations material on the [handouts page](https://web.evanchen.cc/handouts.html).
- ⭐ **[Yufei Zhao's olympiad handouts](https://yufeizhao.com/olympiad/)**: inequalities, polynomials, and more.
- **Secrets in Inequalities**, Pham Kim Hung 💲 · **Functional Equations**, Venkatachala 💲 · **Problems from the Book**, Andreescu & Dospinescu 💲 (advanced).
- **[AoPS: Intermediate Algebra](https://artofproblemsolving.com/store)** 💲 if you need a gentler ramp.

## Done when
- [ ] Every skip-test item proved on paper · [ ] 20 shortlist A-problems attempted, key ideas logged
