# 01 · Math Methods & Estimation
> **Goal:** the mathematical moves olympiad physics uses constantly. · **Time:** 1–2 weeks (you're strong at math, so this is mostly about the *physics habits*)

> [!GOAL]
> By the end of this chapter you can:
>
> - get the form of an answer from **dimensional analysis**, and check every result with it;
> - expand to first (or second) order in a small quantity and keep the right terms;
> - make **Fermi estimates** to within a factor of a few;
> - solve the ODEs that appear in every olympiad (decay, SHM, damped and driven oscillators, quadratic drag);
> - use flux, Gauss's and Stokes' theorems as physical ideas, and let **symmetry** replace integrals;
> - test answers with **limiting cases**, and analyse equilibria and their stability.

## Skip test
- [ ] Use dimensional analysis to find the period of a pendulum and the speed of deep-water waves ($v\propto\sqrt{g\lambda}$).
- [ ] Expand $(1+x)^n$, $\sqrt{1+x}$, $\sin x$, $\cos x$, $e^x$, $\ln(1+x)$ to second order.
- [ ] Solve $\ddot x + 2\gamma\dot x + \omega_0^2 x = 0$ in all three damping regimes.
- [ ] Estimate the number of air molecules in your room, to within a factor of 3.
- [ ] Compute the flux of a uniform field through a hemisphere using a symmetry argument, not an integral.

## 1 · Dimensional analysis

> [!DEF] Dimensions
> Every physical quantity has dimensions built from mass $M$, length $L$, time $T$ (plus current, temperature, …). Write $[Q]=M^aL^bT^c$. **Both sides of an equation must have the same dimensions**, and you can only add quantities of the same dimension. Arguments of $\sin$, $\exp$, $\ln$ must be dimensionless.

> [!KEY] The method
> 1. List the quantities the answer can depend on.
> 2. Write the answer as a product of their powers.
> 3. Match the exponents of $M$, $L$, $T$ and solve.
>
> The result is correct up to a dimensionless constant (often of order 1). If more quantities than dimensions are involved, you get a dimensionless combination you can't fix this way (Buckingham π theorem).

> [!EXAMPLE] Period of a pendulum
> $T$ could depend on the mass $m$ [M], length $\ell$ [L] and $g$ [L T⁻²]. Try $T=m^a\ell^bg^c$: mass gives $a=0$; length gives $b+c=0$; time gives $-2c=1$. So $c=-\tfrac12$, $b=\tfrac12$: $T\propto\sqrt{\ell/g}$. (The exact small-angle result is $2\pi\sqrt{\ell/g}$.) Mass dropped out, which is itself a physical prediction.

> [!EXAMPLE] Deep-water waves
> The speed can only depend on $g$ and the wavelength $\lambda$ (water density cancels: no other quantity contains mass). $[v]=LT^{-1}$, so $v\propto\sqrt{g\lambda}$. (The exact result is $\sqrt{g\lambda/2\pi}$: long ocean swells travel faster than short ripples.)

## 2 · Small-quantity expansions

> [!FORMULA] Expansions to know instantly (for $|x|\ll1$)
> | Function | Expansion |
> |---|---|
> | $(1+x)^n$ | $1+nx+\frac{n(n-1)}2x^2$ |
> | $\sqrt{1+x}$ | $1+\frac x2-\frac{x^2}8$ |
> | $\frac1{1+x}$ | $1-x+x^2$ |
> | $e^x$ | $1+x+\frac{x^2}2$ |
> | $\ln(1+x)$ | $x-\frac{x^2}2$ |
> | $\sin x$ | $x-\frac{x^3}6$ |
> | $\cos x$ | $1-\frac{x^2}2$ |
> | $\tan x$ | $x+\frac{x^3}3$ |

> [!KEY] Keep the first non-vanishing order
> If the leading terms cancel, you must go one order further. Most olympiad tasks say "to first order in $\epsilon$": expand everything, collect terms, drop higher powers **consistently**.

> [!EXAMPLE] Gravity a little above the ground
> $g(h)=\frac{GM}{(R+h)^2}=\frac{GM}{R^2}\big(1+\tfrac hR\big)^{-2}\approx g_0\big(1-\tfrac{2h}R\big)$. At $h=10$ km: a $0.3\%$ decrease.

> [!EXAMPLE] Relativistic kinetic energy
> $(\gamma-1)mc^2$ with $\gamma=(1-v^2/c^2)^{-1/2}\approx1+\frac{v^2}{2c^2}+\frac{3v^4}{8c^4}$ gives $\frac12mv^2+\frac{3mv^4}{8c^2}$: Newton's formula plus the first correction.

## 3 · Fermi estimation

> [!KEY] How to estimate anything
> Break the quantity into factors you can each estimate within a factor of ~3; errors partly cancel. Write numbers as powers of 10. Always state the assumptions.

> [!EXAMPLE] Air molecules in a room
> Room $\approx4\times5\times2.5\ \mathrm m=50\ \mathrm m^3$. Number density $n=\frac p{kT}=\frac{10^5}{1.38\times10^{-23}\cdot293}\approx2.5\times10^{25}\ \mathrm m^{-3}$. Total $\approx1.2\times10^{27}$ molecules.

## 4 · The ODE toolkit

> [!FORMULA] First-order equations
> - $\dot x=-x/\tau$ → $x=x_0e^{-t/\tau}$ (decay, RC circuits, cooling).
> - $\dot v=-kv^2$ (quadratic drag, no gravity) → separate variables: $\frac{dv}{v^2}=-k\,dt$ → $v=\frac{v_0}{1+kv_0t}$.
> - **Separation of variables:** write $\frac{dy}{dx}=f(x)g(y)$ as $\frac{dy}{g(y)}=f(x)dx$ and integrate both sides.

> [!FORMULA] The damped harmonic oscillator
> $$\ddot x+2\gamma\dot x+\omega_0^2x=0$$
> Try $x=e^{st}$: $s=-\gamma\pm\sqrt{\gamma^2-\omega_0^2}$.
> - **Underdamped** ($\gamma<\omega_0$): $x=e^{-\gamma t}\big(A\cos\omega_dt+B\sin\omega_dt\big)$, $\omega_d=\sqrt{\omega_0^2-\gamma^2}$.
> - **Critically damped** ($\gamma=\omega_0$): $x=(A+Bt)e^{-\gamma t}$, the fastest return without oscillating.
> - **Overdamped** ($\gamma>\omega_0$): $x=Ae^{s_+t}+Be^{s_-t}$, both $s_\pm<0$.

> [!FORMULA] The driven oscillator and resonance
> For $\ddot x+2\gamma\dot x+\omega_0^2x=\frac{F_0}m\cos\omega t$, the steady state is $x=A\cos(\omega t-\delta)$ with
> $$A=\frac{F_0/m}{\sqrt{(\omega_0^2-\omega^2)^2+4\gamma^2\omega^2}},\qquad\tan\delta=\frac{2\gamma\omega}{\omega_0^2-\omega^2}$$
> The amplitude peaks near $\omega_0$; the **quality factor** $Q=\frac{\omega_0}{2\gamma}$ measures how sharp the peak is (≈ resonance frequency / width).

> [!TRY] [Driven damped oscillator](interactive/oscillator.html)
> Switch between the three damping regimes, then drive it and sweep the frequency through resonance: watch the amplitude peak and the phase lag swing from 0 to 180°.

> [!LEARN]
> 3Blue1Brown's lesson "[Differential equations, studying the unsolvable](https://www.3blue1brown.com/lessons/differential-equations)" uses the pendulum to show phase space and numerical solution.

## 5 · Vector calculus as physics

> [!DEF] Gradient, divergence, curl
> - **Gradient** $\nabla f$: points in the direction of steepest increase of a scalar field (force $=-\nabla U$).
> - **Divergence** $\nabla\cdot\mathbf F$: net outflow per unit volume ("sources").
> - **Curl** $\nabla\times\mathbf F$: circulation per unit area ("swirl").

> [!FORMULA] Gauss's and Stokes' theorems
> $$\oint_S\mathbf F\cdot d\mathbf A=\int_V\nabla\cdot\mathbf F\,dV,\qquad\oint_C\mathbf F\cdot d\boldsymbol\ell=\int_S(\nabla\times\mathbf F)\cdot d\mathbf A$$
> They give **Gauss's law** and **Ampère's law** (module 04): flux through a closed surface counts the enclosed sources.

> [!EXAMPLE] Flux through a hemisphere, without integrating
> A uniform field $\mathbf E$ points along the axis of a hemisphere of radius $R$. The hemisphere plus its flat base form a closed surface with no source inside, so the total flux is 0. The flux in through the base is $E\pi R^2$, so the flux out through the curved part is $E\pi R^2$.

## 6 · Symmetry, limiting cases and stability

> [!KEY] Symmetry first
> Before integrating, ask what symmetry makes the problem trivial: a field that must point radially, a current that must be the same in symmetric branches, points that must have the same potential. Symmetry often reduces a page of calculus to one line.

> [!KEY] Check limiting cases
> Every answer should behave sensibly when a parameter goes to 0 or ∞, when masses are equal, when an angle is 0 or 90°. A formula that gives a negative time, an infinite force at a harmless limit, or the wrong sign of a correction is wrong.

> [!FORMULA] Equilibrium and small oscillations
> For a particle in a potential $U(x)$: equilibrium where $U'(x_0)=0$; **stable** if $U''(x_0)>0$. Near a stable equilibrium, $U\approx U(x_0)+\frac12U''(x_0)(x-x_0)^2$, so the motion is SHM with
> $$\omega^2=\frac{U''(x_0)}m$$

> [!EXAMPLE] Small oscillations in a molecular potential
> $U(x)=\frac a{x^2}-\frac bx$ ($a,b>0$). $U'=-\frac{2a}{x^3}+\frac b{x^2}=0$ gives $x_0=\frac{2a}b$. $U''(x_0)=\frac{6a}{x_0^4}-\frac{2b}{x_0^3}=\frac{b^4}{8a^3}>0$: stable, with $\omega=\sqrt{\frac{b^4}{8a^3m}}$.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Methods** deck.

## Practice (answers hidden)

1. Use dimensional analysis to find how the radius $R$ of a nuclear fireball depends on the released energy $E$, the time $t$ and the air density $\rho$ (G. I. Taylor's estimate).
<details><summary>Answer</summary>

$R=E^a t^b\rho^c$: mass $a+c=0$; length $2a-3c=1$; time $-2a+b=0$. So $a=\frac15$, $c=-\frac15$, $b=\frac25$: $R\propto\big(\frac{Et^2}{\rho}\big)^{1/5}$.
</details>

2. Expand $\frac{1}{\sqrt{1-x}}$ to second order.
<details><summary>Answer</summary>

$(1-x)^{-1/2}\approx1+\frac x2+\frac38x^2$.
</details>

3. A ball dropped with quadratic air drag reaches terminal speed $v_t$. Write the equation of motion and $v_t$.
<details><summary>Answer</summary>

$m\dot v=mg-kv^2$; terminal speed when $\dot v=0$: $v_t=\sqrt{mg/k}$.
</details>

4. An oscillator has $\omega_0=10\ \mathrm{s^{-1}}$ and $\gamma=1\ \mathrm{s^{-1}}$. Is it underdamped? Find $\omega_d$ and $Q$.
<details><summary>Answer</summary>

Yes ($\gamma<\omega_0$). $\omega_d=\sqrt{100-1}\approx9.95\ \mathrm{s^{-1}}$, $Q=\frac{10}{2}=5$.
</details>

5. Estimate how many times a human heart beats in a lifetime.
<details><summary>Answer</summary>

$\sim70$ beats/min × $60\cdot24\cdot365\approx5\times10^5$ min/yr × 80 yr $\approx3\times10^9$ beats.
</details>

6. A bead moves on a parabolic wire $y=kx^2$ in gravity. Find the frequency of small oscillations.
<details><summary>Answer</summary>

$U=mgkx^2$ near the bottom (the kinetic energy is $\frac12m\dot x^2$ to lowest order), so $U''=2mgk$ and $\omega=\sqrt{2gk}$.
</details>

## Build
- Redo 10 textbook results using only dimensional analysis + one physical argument, and check them against the exact formula.

## Go deeper (all optional)
- ⭐ **[Kevin Zhou's handouts](https://knzhou.github.io/#handouts)**: start with the introductory/preliminary handout and **M1** (which covers the ODE toolkit). These are the best free olympiad physics materials.
- **Street-Fighting Mathematics, Sanjoy Mahajan**: an open-access book (free PDF from MIT Press) on estimation and approximation.
- **Mathematical Methods for Physics and Engineering**, Riley, Hobson & Bence 💲: reference only.

## Done when
- [ ] Every skip-test item done on paper · [ ] you check units and limiting cases on every answer without being reminded
