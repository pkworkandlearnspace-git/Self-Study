# 02 · Algebra
> **Goal:** inequalities, polynomials, functional equations, and sequences at national-to-IMO level. · **Time:** 4–6 weeks (in rotation)

## Skip test
- [ ] Prove AM-GM for $n$ variables, and use it to minimize $x + \frac{4}{x^2}$ for $x>0$.
- [ ] Prove $\frac{a}{b+c}+\frac{b}{c+a}+\frac{c}{a+b}\ge\frac32$ (Nesbitt) in two different ways.
- [ ] Find all $f:\mathbb R\to\mathbb R$ with $f(x+y)=f(x)+f(y)$ and $f$ monotonic.
- [ ] Use Vieta: if $x^3-6x^2+11x-6$ has roots $r,s,t$, find $r^2+s^2+t^2$ without solving.
- [ ] Explain when equality holds in Cauchy–Schwarz.

## Core ideas

### Inequalities
- **AM-GM:** $\frac{x_1+\dots+x_n}{n}\ge\sqrt[n]{x_1\cdots x_n}$, with equality iff all are equal. **Weighted** version too.
- **Power mean chain:** QM ≥ AM ≥ GM ≥ HM.
- **Cauchy–Schwarz:** $\left(\sum a_i^2\right)\left(\sum b_i^2\right)\ge\left(\sum a_ib_i\right)^2$. **Titu/Engel form:** $\sum\frac{a_i^2}{b_i}\ge\frac{(\sum a_i)^2}{\sum b_i}$.
- **Hölder**, **rearrangement**, **Chebyshev**, **Schur** ($t>0$: $\sum a^t(a-b)(a-c)\ge0$), **Muirhead** (for symmetric polynomial inequalities).
- **Jensen:** for convex $f$, $f\!\left(\frac{\sum x_i}{n}\right)\le\frac{\sum f(x_i)}{n}$. **Tangent line trick** for $\sum f(x_i)$ with $\sum x_i$ fixed.
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

## Learn from
- ⭐ **[Evan Chen: "A Brief Introduction to Olympiad Inequalities"](https://web.evanchen.cc/handouts/Ineq/en.pdf)**, plus his functional equations material on the [handouts page](https://web.evanchen.cc/handouts.html).
- ⭐ **[Yufei Zhao's olympiad handouts](https://yufeizhao.com/olympiad/)**: inequalities, polynomials, and more.
- **Secrets in Inequalities**, Pham Kim Hung 💲 · **Functional Equations**, Venkatachala 💲 · **Problems from the Book**, Andreescu & Dospinescu 💲 (advanced).
- **[AoPS: Intermediate Algebra](https://artofproblemsolving.com/store)** 💲 if you need a gentler ramp.

## Build
- Solve the A1–A4 problems from the last 5 years of **IMO Shortlists**. Make a one-line "key idea" note for each.

## Traps
- Applying AM-GM where the equality case can't happen.
- In functional equations, forgetting to **check the solution** in the original equation, and forgetting the pathological solutions of Cauchy.
