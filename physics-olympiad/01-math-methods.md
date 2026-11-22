# 01 · Math Methods & Estimation
> **Goal:** the mathematical moves olympiad physics uses constantly. · **Time:** 1–2 weeks (you're strong at math, so this is mostly about the *physics habits*)

## Skip test
- [ ] Use dimensional analysis to find the period of a pendulum and the speed of deep-water waves ($v\propto\sqrt{g\lambda}$).
- [ ] Expand $(1+x)^n$, $\sqrt{1+x}$, $\sin x$, $\cos x$, $e^x$, $\ln(1+x)$ to second order.
- [ ] Solve $\ddot x + 2\gamma\dot x + \omega_0^2 x = 0$ in all three damping regimes.
- [ ] Estimate the number of air molecules in your room, to within a factor of 3.
- [ ] Compute the flux of a uniform field through a hemisphere using a symmetry argument, not an integral.

## Core ideas
- **Dimensional analysis:** write $[Q] = M^aL^bT^c\ldots$ and match exponents. It gives the answer up to a constant, and it's a quick check on every result.
- **Small-quantity expansions:** $(1+x)^n\approx1+nx+\frac{n(n-1)}2x^2$. **Keep the first non-vanishing order.** Most IPhO tasks say "to first order in $\epsilon$".
- **Fermi estimation:** break it into factors and get each within ×3.
- **ODEs you must solve instantly:** exponential growth/decay, SHM, damped/driven oscillator, $\dot v = -kv^2$-type drag, separation of variables.
- **Vector calculus (light):** gradient, divergence, curl as physical ideas. Gauss and Stokes theorems → Gauss's law and Ampère's law.
- **Symmetry first:** before integrating, ask what symmetry makes the integral trivial.
- **Limiting cases:** check every answer at $m\to0$, $\theta\to0$, $R\to\infty$, etc.
- **Graphical/numerical thinking:** sketch functions, find fixed points, linearize around equilibria (stability = sign of the second derivative of the potential).

## Learn from
- ⭐ **[Kevin Zhou's handouts](https://knzhou.github.io/#handouts)**: start with the introductory/preliminary handout and **M1** (which covers the ODE toolkit). These are the best free olympiad physics materials.
- **Street-Fighting Mathematics, Sanjoy Mahajan**: an open-access book (free PDF from MIT Press) on estimation and approximation.
- **Mathematical Methods for Physics and Engineering**, Riley, Hobson & Bence 💲: reference only.

## Build
- Redo 10 textbook results using only dimensional analysis + one physical argument, and check them against the exact formula.
