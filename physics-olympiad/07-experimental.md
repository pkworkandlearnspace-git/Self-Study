# 07 · Experimental Physics
> **Goal:** earn the 20 experimental points (40% of the total). It's the most trainable part of the IPhO. · **Time:** ~2 h/week, ongoing

👉 Interactive: [Linear fit & uncertainty](interactive/linear-fit.html) · [Uncertainty propagation](interactive/error-prop.html) · [Quiz](interactive/quiz.html?deck=Experiment)

## Skip test
- [ ] Propagate uncertainty for $g = 4\pi^2L/T^2$ given $\Delta L$ and $\Delta T$, and say which measurement to improve first.
- [ ] Linearize $T = 2\pi\sqrt{L/g}$, $I = I_0e^{-\mu x}$, and $y = ax^n$ so a straight-line graph gives the unknowns.
- [ ] Find a slope and its uncertainty from a least-squares fit (or the max/min slope method).
- [ ] Explain systematic vs random error, and how to reduce each.
- [ ] Explain why you should time 20 oscillations instead of 1, and why that beats timing 1 oscillation 20 times.
- [ ] Given a 5-hour exam with 4 tasks, plan your time and say what you'd do if the apparatus seems broken.

## Core ideas
- **Uncertainty:** report $x = \bar x \pm \Delta x$ with 1–2 significant figures in $\Delta x$, and the value rounded to match.
  - Sum/difference: absolute errors add in quadrature: $\Delta(a\pm b) = \sqrt{\Delta a^2+\Delta b^2}$. A difference of close numbers has a large *relative* error.
  - Product/power: relative errors add in quadrature: $\frac{\Delta f}{f} = \sqrt{\left(n\frac{\Delta a}{a}\right)^2 + \left(m\frac{\Delta b}{b}\right)^2}$ for $f = a^nb^m$.
  - General: $\Delta f^2 = \sum_i\left(\frac{\partial f}{\partial x_i}\Delta x_i\right)^2$.
  - Repeated measurements: standard error of the mean $\sigma/\sqrt N$. Instrument resolution: use about half the smallest division (or the stated tolerance).
- **Linearization:** transform the data so the theory predicts a straight line ($T^2$ vs $L$; $\ln I$ vs $x$; $\ln y$ vs $\ln x$). The slope/intercept then give the physical constants. A straight line also shows *visibly* whether the theory fits.
- **Graphing at IPhO (graded!):** a title, labeled axes with units, sensible scales (the data fills ≥ ½ the page), error bars, a best-fit line, and the slope read off a large triangle (not two data points).
- **Experimental design:** measure many periods, vary over a wide range, repeat, spot outliers, control variables, and check for systematics (zero offset, parallax, timing reaction). Take more points where the curve changes fastest.
- **Read the problem's instructions on rounding and on which method to use.** Points are given per step, so a table with units in the header and every raw reading earns marks even if the final answer is off.

```mermaid
flowchart LR
  A[Theory: y = f(x; unknowns)] --> B[Choose X(x), Y(y)<br/>so that Y = mX + b]
  B --> C[Table: raw data + X, Y<br/>units in headers]
  C --> D[Plot with error bars]
  D --> E{Straight?}
  E -- no --> F[Model wrong or systematic error:<br/>restrict range / rethink]
  E -- yes --> G[Fit: slope ± Δslope]
  G --> H[Constants ± uncertainty<br/>rounded consistently]
```

## Worked example: g from a pendulum
Data: $L = 0.800 \pm 0.002$ m, 20 swings take $35.88 \pm 0.20$ s (the reaction time dominates). So $T = 1.794 \pm 0.010$ s.
- $g = 4\pi^2L/T^2 = 9.813$ m/s².
- $\frac{\Delta g}{g} = \sqrt{(0.25\%)^2 + (2\times0.56\%)^2} = 1.1\%$, so $g = 9.81 \pm 0.11$ m/s².
- **Diagnosis:** the $T$ term is 95% of the variance. Improving the ruler is pointless; time 50 swings instead (then $\Delta T/T$ falls 2.5×). The [propagation tool](interactive/error-prop.html) shows this breakdown for any formula.
- **Better still:** measure $T$ for 6–8 lengths and plot $T^2$ vs $L$. The slope is $4\pi^2/g$, and a non-zero intercept reveals a systematic offset in $L$ (e.g. you measured to the top of the bob instead of its centre). Try the pendulum preset in the [linear-fit tool](interactive/linear-fit.html).

## Practice
<details><summary><b>P1.</b> A cylinder: m = 123.4 ± 0.5 g, d = 20.0 ± 0.1 mm, h = 50.0 ± 0.2 mm. Density and uncertainty?</summary>

$\rho = \frac{4m}{\pi d^2h} = 7856$ kg/m³. $\frac{\Delta\rho}{\rho} = \sqrt{0.41\%^2 + (2\times0.5\%)^2 + 0.4\%^2} = 1.15\%$, so $\rho = 7860\pm90$ kg/m³ (steel). The diameter dominates because it is squared.
</details>

<details><summary><b>P2.</b> You measure a = 10.3 ± 0.2 and b = 9.8 ± 0.2. What is a − b, and what does this teach you?</summary>

$0.5 \pm 0.3$: a 57% relative error from two 2% measurements. Avoid designs that subtract nearly equal quantities. Measure the difference directly (e.g. a null method or a bridge).
</details>

<details><summary><b>P3.</b> Which plot gives n and k if F = k·rⁿ? How do you get Δk?</summary>

Plot $\ln F$ against $\ln r$: slope $n$, intercept $\ln k$. Since $k = e^b$, $\Delta k = k\,\Delta b$ (the intercept's uncertainty is the *relative* uncertainty of $k$).
</details>

<details><summary><b>P4.</b> Data for a cooling cup: T − T_room = 60, 45, 34, 25, 19 K at t = 0, 2, 4, 6, 8 min. Find the time constant.</summary>

$\ln(\Delta T)$ = 4.09, 3.81, 3.53, 3.22, 2.94. The slope is about $-0.144$ min⁻¹, so $\tau\approx6.9$ min. Straightness confirms Newton's law of cooling over this range. (Check it in the linear-fit tool with "ln y".)
</details>

<details><summary><b>P5.</b> Your stopwatch reads to 0.01 s. Is the uncertainty of one timing 0.005 s?</summary>

No. Human reaction time (about 0.1–0.2 s, partly cancelling between start and stop) dominates the resolution. Estimate it by repeating, and quote the scatter. The instrument resolution is only the floor.
</details>

## Common mistakes
- Quoting $9.81347 \pm 0.1123$. Round the uncertainty to 1–2 s.f., and the value to match: $9.81 \pm 0.11$.
- Reading the slope from two data points instead of two far-apart points on the best-fit line.
- Forcing the line through the origin when theory doesn't demand it. The intercept is information, often about a systematic error.
- Spending 3 hours perfecting task 1. Marks are spread across tasks; budget the time.
- Leaving out units in table headers and axis labels. These are explicitly marked.

## Learn from
- ⭐ **Past IPhO / APhO / EuPhO experimental problems** with marking schemes (see [resources](resources.md)). Practice the data-analysis parts even without the apparatus.
- ⭐ **[Kalda: Experimental study guide](https://www.ioc.ee/~kalda/ipho/)**, plus Kevin Zhou's **P2** (error and data analysis) and his IPhO experimental advice handout.
- **An Introduction to Error Analysis, John Taylor** 💲: the standard text (ch. 1–8).

## Home experiments (cheap)
1. Pendulum → $g$ to < 1% (linearize $T^2$ vs $L$).
2. CD/DVD as a diffraction grating with a laser pointer → track spacing (CD ≈ 1.6 µm, DVD ≈ 0.74 µm).
3. Cooling coffee cup → Newton's law of cooling (fit $\ln(T - T_{room})$ vs $t$).
4. A bouncing ball → coefficient of restitution from the sound of the bounces (phone audio recorder). Successive times between bounces shrink by the restitution coefficient: $t_{n+1}/t_n = e$.
5. A smartphone sensor app (e.g. **[phyphox](https://phyphox.org/)**) → acceleration, rotation, magnetic field, sound frequency.

## Done when
- [ ] Skip test passes.  - [ ] 3 past IPhO experimental data-analysis parts done in time, graded with the official scheme.
