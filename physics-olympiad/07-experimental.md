# 07 · Experimental Physics
> **Goal:** earn the 20 experimental points. It's the most trainable part of the IPhO. · **Time:** ~2 h/week, ongoing

👉 Interactive: [Linear fit & uncertainty tool](interactive/linear-fit.html)

## Skip test
- [ ] Propagate uncertainty for $g = 4\pi^2L/T^2$ given $\Delta L$ and $\Delta T$.
- [ ] Linearize $T = 2\pi\sqrt{L/g}$, $I = I_0e^{-\mu x}$, and $y = ax^n$ so a straight-line graph gives the unknowns.
- [ ] Find a slope and its uncertainty from a least-squares fit (or the max/min slope method).
- [ ] Explain systematic vs random error, and how to reduce each.
- [ ] Explain why you should measure 20 oscillations instead of 1.

## Core ideas
- **Uncertainty:** report $x = \bar x \pm \Delta x$ with 1–2 significant figures in $\Delta x$, and the value rounded to match.
  - Sum/difference: absolute errors add in quadrature: $\Delta(a\pm b) = \sqrt{\Delta a^2+\Delta b^2}$.
  - Product/power: relative errors add in quadrature: $\frac{\Delta f}{f} = \sqrt{\left(n\frac{\Delta a}{a}\right)^2 + \left(m\frac{\Delta b}{b}\right)^2}$ for $f = a^nb^m$.
  - Repeated measurements: standard error of the mean $\sigma/\sqrt N$.
- **Linearization:** transform the data so the theory predicts a straight line ($T^2$ vs $L$; $\ln I$ vs $x$; $\ln y$ vs $\ln x$). The slope/intercept then give the physical constants.
- **Graphing at IPhO (graded!):** a title, labeled axes with units, sensible scales (the data fills ≥ ½ the page), error bars, a best-fit line, and the slope read off a large triangle.
- **Experimental design:** measure many periods, vary over a wide range, repeat, spot outliers, control variables, and check for systematics (zero offset, parallax, timing reaction).
- **Read the problem's instructions on rounding and on which method to use.** Points are given per step.

## Learn from
- ⭐ **Past IPhO / APhO / EuPhO experimental problems** with marking schemes (see [resources](resources.md)). Practice the data-analysis parts even without the apparatus.
- ⭐ **[Kalda: Experimental study guide](https://www.ioc.ee/~kalda/ipho/)**.
- **An Introduction to Error Analysis, John Taylor** 💲: the standard text (ch. 1–8).

## Home experiments (cheap)
1. Pendulum → $g$ to < 1% (linearize $T^2$ vs $L$).
2. CD/DVD as a diffraction grating with a laser pointer → track spacing.
3. Cooling coffee cup → Newton's law of cooling (fit $\ln(T - T_{room})$ vs $t$).
4. A bouncing ball → coefficient of restitution from the sound of the bounces (phone audio recorder).
5. A smartphone sensor app (e.g. **phyphox**) → acceleration, rotation, magnetic field, sound frequency.
