# 02 · Algebra
> **Goal:** inequalities, polynomials, functional equations, and sequences at national-to-IMO level. · **Time:** 4–6 weeks (in rotation)

👉 Use the **[Inequality lab](interactive/inequality-lab.html)** to see power means, equality cases, and the tangent line trick.

## Skip test
- [ ] Prove AM-GM for $n$ variables, and use it to minimize $x + \frac{4}{x^2}$ for $x>0$.
- [ ] Prove $\frac{a}{b+c}+\frac{b}{c+a}+\frac{c}{a+b}\ge\frac32$ (Nesbitt) in two different ways.
- [ ] Find all $f:\mathbb R\to\mathbb R$ with $f(x+y)=f(x)+f(y)$ and $f$ monotonic.
- [ ] Use Vieta: if $x^3-6x^2+11x-6$ has roots $r,s,t$, find $r^2+s^2+t^2$ without solving.
- [ ] Explain when equality holds in Cauchy–Schwarz.

## Core ideas

### Inequalities
- **AM-GM** ($x_i\ge0$): $\frac{x_1+\dots+x_n}{n}\ge\sqrt[n]{x_1\cdots x_n}$, with equality iff all are equal. **Weighted:** $\sum w_ix_i\ge\prod x_i^{w_i}$ for weights $w_i\ge0$, $\sum w_i=1$.
- **Power mean chain** (positive reals): $M_p=\left(\frac1n\sum x_i^p\right)^{1/p}$ is increasing in $p$, so QM ($p=2$) ≥ AM ($p=1$) ≥ GM ($p\to0$) ≥ HM ($p=-1$). Equality iff all $x_i$ are equal.
- **Cauchy–Schwarz:** $\left(\sum a_i^2\right)\left(\sum b_i^2\right)\ge\left(\sum a_ib_i\right)^2$, equality iff $(a_i)$ and $(b_i)$ are proportional. **Titu/Engel form** ($b_i>0$): $\sum\frac{a_i^2}{b_i}\ge\frac{(\sum a_i)^2}{\sum b_i}$.
- **Hölder**, **rearrangement** (similarly sorted sequences maximise $\sum a_ib_i$), **Chebyshev**, **Schur** ($a,b,c\ge0$, $t>0$: $\sum a^t(a-b)(a-c)\ge0$; equality at $a=b=c$ or two equal and the third $0$), **Muirhead** (symmetric sums of non-negative variables: if exponent vector $\mathbf p$ majorizes $\mathbf q$ then $\sum_{\text{sym}}x^{\mathbf p}\ge\sum_{\text{sym}}x^{\mathbf q}$; graders accept it, but it can't handle the $abc$-type terms Schur handles).
- **Jensen:** for convex $f$, $f\!\left(\frac{\sum x_i}{n}\right)\le\frac{\sum f(x_i)}{n}$. **Tangent line trick** for $\sum f(x_i)$ with $\sum x_i$ fixed: if $f(x)\ge f(m)+f'(m)(x-m)$ on the allowed range (where $m$ is the mean), sum it up. Works even when $f$ is not convex everywhere.
- **Techniques:** homogenize, normalize ($a+b+c=1$ or $abc=1$), substitution ($a=\frac{x}{y}$, Ravi $a=y+z$ for triangle sides), **SOS** (sum of squares), and $uvw$ / mixing variables.
- **Always find the equality case first.** It tells you which inequality *can* work.

### Polynomials
- **Factor theorem**, **Vieta's formulas**, **Rational root theorem**.
- Integer-coefficient trick: $a-b \mid P(a)-P(b)$.
- **Roots of unity filter:** $\frac1n\sum_{k=0}^{n-1}P(\omega^k)$ extracts the coefficients with index ≡ 0 (mod n).
- **Lagrange interpolation**, **finite differences** (a degree-$d$ polynomial has a constant $d$-th difference).
- Irreducibility: Eisenstein's criterion; the mod-$p$ reduction trick.

### Functional equations
- **Standard plays:** substitute $x=y=0$, $y=0$, $y=x$, $y=-x$, $x=1$. Find $f(0)$ and $f(1)$.
- Prove **injective / surjective**, find **fixed points**, use **symmetry** (swap $x,y$).
- **Cauchy's equation** $f(x+y)=f(x)+f(y)$: over $\mathbb Q$ gives $f(x)=cx$. Over $\mathbb R$ it needs extra conditions (monotonic, bounded on an interval, or continuous).
- Guess the answer (usually $f(x)=x$, $cx$, $x^2$, constant), **verify it**, then prove it's the only one.
- Over $\mathbb N$ / $\mathbb Z$: induction, bounding, and number theory.

### Sequences & sums
- Linear recurrences: characteristic equation. Telescoping. Bounding by monotonicity/convergence.

## Worked examples

<details><summary><b>Example 1 (AM-GM with the right split).</b> Minimise $x+\frac{4}{x^2}$ for $x>0$.</summary>

Guess the equality case first: calculus or trial gives $x=2$, value $3$. At $x=2$ the two terms are $2$ and $1$, so split $x$ into two equal halves to make all three terms equal there:
$x+\frac4{x^2}=\frac x2+\frac x2+\frac4{x^2}\ge 3\sqrt[3]{\frac x2\cdot\frac x2\cdot\frac4{x^2}}=3.$
Equality iff $\frac x2=\frac4{x^2}$, i.e. $x=2$. **Minimum 3.**

*Key idea:* split terms so they are equal **at the equality case**.
</details>

<details><summary><b>Example 2 (Nesbitt, three ways).</b> For $a,b,c>0$: $\frac{a}{b+c}+\frac{b}{c+a}+\frac{c}{a+b}\ge\frac32$.</summary>

**(i) Titu.** $\sum\frac{a}{b+c}=\sum\frac{a^2}{a(b+c)}\ge\frac{(a+b+c)^2}{2(ab+bc+ca)}\ge\frac32$, since $(a+b+c)^2\ge3(ab+bc+ca)$ ⟺ $\frac12\sum(a-b)^2\ge0$.

**(ii) AM-HM.** Let $s=a+b+c$. Then $\sum\frac{a}{b+c}=\sum\frac{s}{b+c}-3=s\sum\frac1{b+c}-3$. By AM-HM on $b+c,c+a,a+b$ (sum $2s$): $\sum\frac1{b+c}\ge\frac{9}{2s}$. So the sum is $\ge\frac92-3=\frac32$.

**(iii) Rearrangement.** WLOG $a\ge b\ge c$; then $\frac1{b+c}\ge\frac1{c+a}\ge\frac1{a+b}$ are sorted the same way, so $\sum\frac{a}{b+c}\ge\sum\frac{b}{b+c}$ and $\ge\sum\frac{c}{b+c}$ (cyclic shifts). Add: $2\sum\frac{a}{b+c}\ge\sum\frac{b+c}{b+c}=3$.

Equality: $a=b=c$ in all three.
</details>

<details><summary><b>Example 3 (tangent line trick).</b> $a,b,c>0$, $a+b+c=3$. Prove $\sum\frac{1}{a^2+1}\ge\frac32$… is it even true?</summary>

Equality guess $a=b=c=1$: $3\cdot\frac12=\frac32$. Tangent of $f(x)=\frac{1}{x^2+1}$ at $x=1$: $f(1)=\frac12$, $f'(1)=-\frac12$, line $\frac12-\frac12(x-1)=1-\frac x2$. Claim $f(x)\ge1-\frac x2$ on $(0,3)$:
$\frac{1}{x^2+1}-1+\frac x2=\frac{2-2x^2-2+x^3+x}{2(x^2+1)}=\frac{x(x-1)^2}{2(x^2+1)}\ge0$ ✓ (for $x\ge0$).
Sum the three: $\sum f\ge3-\frac{a+b+c}2=\frac32$. ∎

*Key idea:* when $\sum x_i$ is fixed and the target is $\sum f(x_i)$, compare $f$ with its tangent at the equality point and factor out $(x-m)^2$. Jensen fails here because $f$ is not convex on all of $(0,3)$. The **[Inequality lab](interactive/inequality-lab.html)** draws this.
</details>

<details><summary><b>Example 4 (functional equation, ISL 2002 A1).</b> Find all $f:\mathbb R\to\mathbb R$ with $f(f(x)+y)=2x+f(f(y)-x)$ for all $x,y$.</summary>

1. **Guess:** try $f(x)=x+c$: LHS $=x+y+2c$, RHS $=2x+(y+c-x)+c=x+y+2c$ ✓. So expect $f(x)=x+c$.
2. **Surjective:** put $y=-f(x)$: $f(0)=2x+f(f(-f(x))-x)$, so $f(\text{something})=f(0)-2x$, which takes every real value as $x$ varies.
3. Pick $a$ with $f(a)=0$ and put $x=a$: $f(y)=2a+f(f(y)-a)$. As $y$ varies, $z=f(y)$ takes every real value (step 2), so $f(z-a)=z-2a$ for all $z$, i.e. $f(t)=t-a$ for all $t$.
4. **Verify** (done in step 1 with $c=-a$). Answer: $f(x)=x+c$ for any constant $c$.

*Key idea:* a free variable on one side that the other side "can't see" (here $y=-f(x)$) gives surjectivity; then plug a root of $f$.
</details>

<details><summary><b>Example 4b (why "verify" and regularity matter).</b> $f(x+f(y))=f(x)+y$ for all reals.</summary>

Injective (compare $y$), then $x=0$ gives $f(f(y))=y+f(0)$, so surjective; a root $a$ of $f$ gives $a=0$, so $f(f(y))=y$. Replacing $y$ by $f(y)$: $f(x+y)=f(x)+f(y)$. So the solutions are exactly the **additive involutions**. With any regularity (monotone, continuous, bounded on an interval) this gives $f(x)=x$ or $f(x)=-x$; without it, wild (Hamel-basis) solutions also exist. Contest versions add a condition or change the domain to get a clean answer. Read the statement carefully.
</details>

<details><summary><b>Example 5 (Vieta / Newton).</b> $r,s,t$ are the roots of $x^3-6x^2+11x-6$. Find $r^2+s^2+t^2$ and $r^3+s^3+t^3$ without solving.</summary>

$e_1=6$, $e_2=11$, $e_3=6$. $p_2=e_1^2-2e_2=36-22=14$. Newton: $p_3=e_1p_2-e_2p_1+3e_3=6\cdot14-11\cdot6+18=36$. Check: roots are $1,2,3$ → $1+4+9=14$, $1+8+27=36$ ✓.
</details>

## Practice
<details><summary>A1. Prove $a^2+b^2+c^2\ge ab+bc+ca$ for all reals, and find all equality cases.</summary>

$2(\text{LHS}-\text{RHS})=(a-b)^2+(b-c)^2+(c-a)^2\ge0$. Equality iff $a=b=c$.
</details>

<details><summary>A2. $x,y,z>0$, $xyz=1$. Prove $x+y+z\ge3$ and $x^2+y^2+z^2\ge x+y+z$.</summary>

AM-GM: $x+y+z\ge3\sqrt[3]{xyz}=3$. Then QM ≥ AM: $x^2+y^2+z^2\ge\frac{(x+y+z)^2}{3}=(x+y+z)\cdot\frac{x+y+z}{3}\ge x+y+z$.
</details>

<details><summary>A3. Find all polynomials $P$ with real coefficients such that $P(x^2)=P(x)^2$ for all $x$.</summary>

$P\equiv0$, or $P$ monic-like: write $P(x)=ax^n+(\text{lower})$; comparing leading terms gives $a=a^2$, so $a=1$. If $P(x)=x^n+Q(x)$ with $Q\ne0$ of degree $k<n$ and leading coefficient $b$, then $P(x)^2=x^{2n}+2bx^{n+k}+\dots$ while $P(x^2)=x^{2n}+(\text{degree }2k<n+k)$, contradiction. So $P(x)=x^n$ ($n\ge0$) or $P=0$. Verify ✓.
</details>

<details><summary>A4. Find all $f:\mathbb Q\to\mathbb Q$ with $f(x+y)=f(x)+f(y)$.</summary>

$f(0)=0$; induction gives $f(nx)=nf(x)$ for $n\in\mathbb N$, then $n\in\mathbb Z$ via $f(-x)=-f(x)$. For $q=\frac mn$: $nf(\frac mn)=f(m)=mf(1)$. So $f(x)=cx$ with $c=f(1)$; these all work.
</details>

<details><summary>A5. $a_1=1$, $a_{n+1}=a_n+\frac1{a_n}$. Prove $14<a_{100}<18$.</summary>

Square: $a_{n+1}^2=a_n^2+2+\frac{1}{a_n^2}>a_n^2+2$, so $a_{100}^2>1+2\cdot99=199$, $a_{100}>14.1$. Upper: $a_n\ge1$ so $a_{n+1}^2\le a_n^2+3$, giving $a_{100}^2\le1+3\cdot99=298<324$, so $a_{100}<18$. (Sharper: $a_n^2\ge 2n-1$, so $\frac1{a_n^2}\le\frac1{2n-1}$, which gives $a_{100}\approx14.2$.)
</details>

## Learn from
- ⭐ **[Evan Chen: "A Brief Introduction to Olympiad Inequalities"](https://web.evanchen.cc/handouts/Ineq/en.pdf)**, plus his functional equations material on the [handouts page](https://web.evanchen.cc/handouts.html).
- **[Yufei Zhao's olympiad handouts](https://yufeizhao.com/olympiad/)**: inequalities, polynomials, and more.
- **Secrets in Inequalities**, Pham Kim Hung 💲 · **Functional Equations**, Venkatachala 💲 · **Problems from the Book**, Andreescu & Dospinescu 💲 (advanced).
- **[AoPS: Intermediate Algebra](https://artofproblemsolving.com/store)** 💲 if you need a gentler ramp.

## Build
- Solve the A1–A4 problems from the last 5 years of **IMO Shortlists**. Make a one-line "key idea" note for each.

## Traps
- Applying AM-GM where the equality case can't happen (e.g. $x+\frac1x\ge2$ on $x\ge3$: the true minimum is $\frac{10}3$).
- Using AM-GM or Schur with negative variables: they need $x_i\ge0$.
- "Proving" an inequality by checking it is true at the equality point and a couple of random points.
- In functional equations, forgetting to **check the solution** in the original equation, and forgetting the pathological solutions of Cauchy.
- The "pointwise trap": showing $f(x)^2=x^2$ gives $f(x)=\pm x$ **for each $x$ separately**, not $f\equiv x$ or $f\equiv-x$. You still have to rule out mixtures.

## Done when
- [ ] Every Skip-test item done cleanly  - [ ] 20 ISL A1–A4 key ideas logged in `progress.md`
