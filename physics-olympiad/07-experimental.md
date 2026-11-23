# 07 · Experimental Physics
> **Goal:** earn the 20 experimental points. It's the most trainable part of the IPhO. · **Time:** ~2 h/week, ongoing

> [!GOAL]
> By the end of this chapter you can:
>
> - report a measurement with a correctly rounded **uncertainty**;
> - **propagate** uncertainties through any formula;
> - **linearize** a law so a straight-line graph gives the unknown constants;
> - fit a straight line (least squares or max/min slope) and quote the slope's uncertainty;
> - draw a graph that collects every available mark;
> - design a measurement that minimises random and systematic error.

## Skip test
- [ ] Propagate uncertainty for $g = 4\pi^2L/T^2$ given $\Delta L$ and $\Delta T$.
- [ ] Linearize $T = 2\pi\sqrt{L/g}$, $I = I_0e^{-\mu x}$, and $y = ax^n$ so a straight-line graph gives the unknowns.
- [ ] Find a slope and its uncertainty from a least-squares fit (or the max/min slope method).
- [ ] Explain systematic vs random error, and how to reduce each.
- [ ] Explain why you should measure 20 oscillations instead of 1.

## 1 · Measurements and uncertainty

> [!DEF] Random and systematic errors
> - **Random errors** scatter repeated measurements around the true value (reaction time, reading fluctuations). Reduce them by **repeating** and averaging, or measuring a larger quantity (many periods at once).
> - **Systematic errors** shift every measurement the same way (a zero offset, a miscalibrated scale, parallax, heat loss). Repetition doesn't help; find and remove them by changing the method, calibrating, or measuring the offset.

> [!FORMULA] Reporting a result
> Write $x=\bar x\pm\Delta x$ with units. Give $\Delta x$ to **1–2 significant figures** and round $\bar x$ to the same decimal place: $g=9.81\pm0.10$ m/s², not $9.8106\pm0.0998$.
> For $N$ repeated readings with standard deviation $\sigma$, the uncertainty of the mean is the **standard error** $\frac{\sigma}{\sqrt N}$.

> [!FORMULA] Propagating uncertainties (independent errors)
> - **Sums and differences:** absolute uncertainties add in quadrature: $\Delta(a\pm b)=\sqrt{(\Delta a)^2+(\Delta b)^2}$.
> - **Products and powers:** for $f=a^nb^m$, relative uncertainties add in quadrature:
> $$\frac{\Delta f}{f}=\sqrt{\Big(n\frac{\Delta a}a\Big)^2+\Big(m\frac{\Delta b}b\Big)^2}$$
> - **General:** $\Delta f=\sqrt{\sum_i\big(\frac{\partial f}{\partial x_i}\Delta x_i\big)^2}$.
>
> Some marking schemes accept simple addition of uncertainties (a worst case). Follow the task's instructions.

> [!EXAMPLE] $g$ from a pendulum
> $L=1.000\pm0.002$ m. Twenty oscillations timed as $40.12\pm0.2$ s (reaction time), so $T=2.006\pm0.010$ s. Then $g=\frac{4\pi^2L}{T^2}=9.811$ m/s², and
> $$\frac{\Delta g}g=\sqrt{(0.002)^2+(2\times0.005)^2}\approx0.0102\quad\Rightarrow\quad g=9.81\pm0.10\ \text{m/s}^2$$
> The period term dominates (its relative error counts **twice** because $T$ is squared), so improve the timing first.

> [!KEY] Why time 20 oscillations, not 1
> Your reaction-time error (~0.1–0.2 s) happens once at the start and once at the end, whatever you time. Spread over 20 periods, it becomes 20× smaller per period. In general: **measure the biggest quantity you can and divide**.

## 2 · Linearization

> [!KEY] Make theory predict a straight line
> Eyes and fits handle straight lines best. Transform the variables so the theory becomes $Y=mX+c$; the slope and intercept then give the physical constants, and curvature in the plot reveals that the model is wrong.

> [!FORMULA] Standard linearizations
> | Law | Plot $Y$ against $X$ | Slope | Intercept |
> |---|---|---|---|
> | $T=2\pi\sqrt{L/g}$ | $T^2$ vs $L$ | $4\pi^2/g$ | $0$ |
> | $I=I_0e^{-\mu x}$ | $\ln I$ vs $x$ | $-\mu$ | $\ln I_0$ |
> | $y=ax^n$ | $\ln y$ vs $\ln x$ | $n$ | $\ln a$ |
> | $\frac1f=\frac1u+\frac1v$ | $\frac1v$ vs $\frac1u$ | $-1$ | $\frac1f$ |
> | $T-T_{\text{room}}=\Delta T_0e^{-t/\tau}$ | $\ln(T-T_{\text{room}})$ vs $t$ | $-\frac1\tau$ | $\ln\Delta T_0$ |

> [!WARN] Uncertainties change under transformations
> If you plot $\ln y$, its error bar is $\Delta(\ln y)=\frac{\Delta y}y$; if you plot $T^2$, it is $2T\Delta T$. Transform the error bars too.

## 3 · Fitting a straight line

> [!FORMULA] Least squares (equal uncertainties in $y$)
> For points $(x_i,y_i)$, $i=1..N$, with $D=N\sum x_i^2-\big(\sum x_i\big)^2$:
> $$m=\frac{N\sum x_iy_i-\sum x_i\sum y_i}{D},\qquad c=\frac{\sum y_i\sum x_i^2-\sum x_i\sum x_iy_i}{D}$$
> With the scatter $\sigma_y^2=\frac1{N-2}\sum(y_i-mx_i-c)^2$:
> $$\Delta m=\sigma_y\sqrt{\frac ND},\qquad\Delta c=\sigma_y\sqrt{\frac{\sum x_i^2}{D}}$$

> [!DEF] The max/min slope method (by hand)
> Draw the best line, then the steepest and shallowest lines that still pass through (almost) all error bars. The slope uncertainty is about half the difference of the extreme slopes. Quick and accepted at IPhO when no calculator fit is available.

> [!TRY] [Linear fit & uncertainty tool](interactive/linear-fit.html)
> Enter or drag data points, compare the least-squares fit with the max/min lines, and watch the slope uncertainty shrink as you add points or widen the $x$ range.

## 4 · Graphs that earn every mark

> [!KEY] IPhO graph checklist
> 1. A **title** and **labelled axes with units** (e.g. "$T^2$ (s²)").
> 2. **Scales** chosen so the data fill at least half of the page in both directions; simple scale steps (1, 2, 5 per division); the origin need not be included.
> 3. Points plotted accurately, with **error bars** where meaningful.
> 4. A **best-fit line** (not joining the dots).
> 5. The slope read from a **large triangle** using points on the line (not data points), with its coordinates shown.

> [!KEY] Designing the experiment
> Take data over the **widest range** you can, with roughly even spacing in the variable you'll plot; take more points where things change fast; repeat key readings; note anything unusual; control the other variables; look for systematics (zero offsets, parallax, end effects, heating). **Read the task's instructions on method and rounding**: points are given per step.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Experiment** deck.

## 5 · Home experiments (cheap)
1. Pendulum → $g$ to < 1% (linearize $T^2$ vs $L$).
2. CD/DVD as a diffraction grating with a laser pointer → track spacing (module 05).
3. Cooling coffee cup → Newton's law of cooling (fit $\ln(T - T_{\text{room}})$ vs $t$).
4. A bouncing ball → coefficient of restitution from the sound of the bounces (phone audio recorder): successive bounce times shrink by the factor $e$.
5. A smartphone sensor app (e.g. **phyphox**) → acceleration, rotation, magnetic field, sound frequency.

## Practice (answers hidden)

1. A cube's side is measured as $2.00\pm0.02$ cm. Volume and its uncertainty?
<details><summary>Answer</summary>

$V=8.00$ cm³; $\frac{\Delta V}V=3\cdot\frac{0.02}{2.00}=3\%$, so $V=8.0\pm0.2$ cm³ (relative errors of a single variable raised to a power multiply by the power).
</details>

2. You measure $R=\frac VI$ with $V=5.0\pm0.1$ V and $I=0.250\pm0.005$ A. Result?
<details><summary>Answer</summary>

$R=20.0$ Ω; $\frac{\Delta R}R=\sqrt{0.02^2+0.02^2}\approx2.8\%$: $R=20.0\pm0.6$ Ω.
</details>

3. A capacitor discharges as $V=V_0e^{-t/RC}$. What graph do you plot to find $RC$, and how?
<details><summary>Answer</summary>

$\ln V$ against $t$: a straight line with slope $-\frac1{RC}$, so $RC=-\frac1{\text{slope}}$.
</details>

4. Five students time 10 swings: 15.2, 15.4, 15.1, 15.3, 15.5 s. Period and its uncertainty?
<details><summary>Answer</summary>

Mean 15.30 s, standard deviation ≈ 0.16 s, standard error ≈ $0.16/\sqrt5\approx0.07$ s. Per swing: $T=1.530\pm0.007$ s.
</details>

5. Data seem to follow $y=ax^n$ but you don't know $n$. How do you find both $a$ and $n$?
<details><summary>Answer</summary>

Plot $\ln y$ against $\ln x$: the slope is $n$ and the intercept is $\ln a$.
</details>

## Go deeper (all optional)
- ⭐ **Past IPhO / APhO / EuPhO experimental problems** with marking schemes (see [resources](resources.md)). Practice the data-analysis parts even without the apparatus.
- ⭐ **[Kalda: Experimental study guide](https://www.ioc.ee/~kalda/ipho/)**.
- **An Introduction to Error Analysis, John Taylor** 💲: the standard text (ch. 1–8).

## Done when
- [ ] Every skip-test item done on paper · [ ] 3 home experiments written up with graphs and uncertainties
