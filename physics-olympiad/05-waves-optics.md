# 05 · Waves & Optics
> **Goal:** interference, diffraction, and geometric optics. These show up in both the theory and the experiment. · **Time:** 2–3 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - describe travelling and standing waves, and compute wave speeds on strings and in air;
> - predict **interference** patterns (double slit, thin films, Michelson) from path and phase differences;
> - predict **diffraction** (single slit, grating) and the resolution limit of instruments;
> - trace rays through lenses and mirrors, and use Snell's law and total internal reflection;
> - handle polarization and the **Doppler effect**.

## Skip test
- [ ] Derive the double-slit fringe spacing $\Delta y = \lambda L/d$.
- [ ] Find the condition for thin-film constructive reflection (including the phase flip).
- [ ] Locate the image for a thin lens and a spherical mirror. Trace the rays for a two-lens system.
- [ ] Use the Doppler formula for a moving source and a moving observer (sound).
- [ ] Find the resolving power of a telescope (Rayleigh criterion $1.22\lambda/D$).

## 1 · Waves

> [!FORMULA] Travelling waves
> $$y(x,t)=A\sin(kx-\omega t+\phi),\qquad k=\frac{2\pi}\lambda,\ \ \omega=2\pi f,\ \ v=\frac\omega k=f\lambda$$
> Every such wave solves the **wave equation** $\frac{\partial^2y}{\partial t^2}=v^2\frac{\partial^2y}{\partial x^2}$.
> Wave speeds: string $v=\sqrt{T/\mu}$ (tension / mass per length); sound in a gas $v=\sqrt{\gamma p/\rho}=\sqrt{\gamma RT/M}$ (≈ 343 m/s in air at 20 °C).

> [!DEF] Standing waves and beats
> Two equal waves travelling in opposite directions make a **standing wave** with fixed nodes. A string fixed at both ends (or a pipe open at both ends) supports $f_n=\frac{nv}{2L}$, $n=1,2,3,\dots$; a pipe closed at one end supports only odd harmonics $f_n=\frac{nv}{4L}$. Two tones of nearby frequencies $f_1,f_2$ produce **beats** at $|f_1-f_2|$.

## 2 · Interference

> [!FORMULA] The phase-difference rule
> Two coherent waves meeting at a point have phase difference
> $$\Delta\phi=\frac{2\pi}{\lambda}\Delta(\text{optical path})+\text{(reflection phase shifts)}$$
> Constructive when $\Delta\phi=2\pi m$, destructive when $\Delta\phi=(2m+1)\pi$. **Optical path** = $n\times$ geometric path. Reflection off a medium with **higher** refractive index adds a phase of $\pi$ (half a wavelength); off a lower one, nothing.

> [!EXAMPLE] Double slit
> Slits separated by $d$, screen at distance $L\gg d$. The path difference to a point at angle $\theta$ is $d\sin\theta$, so bright fringes are at $d\sin\theta=m\lambda$. For small angles $y=L\tan\theta\approx L\theta$, giving fringe spacing
> $$\Delta y=\frac{\lambda L}d$$
> *Numbers:* $\lambda=600$ nm, $d=0.2$ mm, $L=1$ m: $\Delta y=3$ mm.

> [!EXAMPLE] Thin films
> A soap film ($n=1.33$, thickness $t$) in air, light near normal incidence. Reflection at the top surface (air → film) gains $\pi$; at the bottom (film → air) it doesn't. The extra path is $2nt$. So **constructive reflection** needs $2nt=\big(m+\frac12\big)\lambda$. Thinnest film that strongly reflects 600 nm light: $t=\frac{\lambda}{4n}\approx113$ nm. (An anti-reflection coating on glass, with both reflections gaining $\pi$, uses $2nt=\frac\lambda2$ for destructive reflection.)

> [!DEF] Michelson interferometer and Newton's rings
> A **Michelson interferometer** splits a beam, sends the halves down two arms and recombines them; moving one mirror by $\frac\lambda2$ shifts the pattern by one fringe, so it measures lengths to a fraction of a wavelength. **Newton's rings** come from the air gap between a curved lens and a flat plate; the dark rings have radii $r_m=\sqrt{m\lambda R}$.

> [!TRY] [Wave interference & diffraction](interactive/interference.html)
> Change the slit separation, slit width and wavelength, and watch the fringes and the single-slit envelope move exactly as the formulas say.

## 3 · Diffraction

> [!FORMULA] Single slit and grating
> - **Single slit** of width $a$: dark fringes at $a\sin\theta=m\lambda$ ($m=\pm1,\pm2,\dots$); the central maximum is twice as wide as the others.
> - **Diffraction grating** with line spacing $d$: sharp bright maxima at $d\sin\theta=m\lambda$.
> - With several slits of finite width, intensity = (single-slit envelope) × (multi-slit interference pattern).

> [!EXAMPLE] A CD as a grating
> CD tracks are spaced $d=1.6$ μm. A red laser ($\lambda=650$ nm) gives a first-order maximum at $\sin\theta=\frac{0.65}{1.6}$, $\theta\approx24°$. Measuring the angle lets you measure $d$ at home (module 07).

> [!FORMULA] Rayleigh criterion
> A circular aperture of diameter $D$ can just resolve two point sources separated by the angle
> $$\theta_{\min}\approx1.22\frac{\lambda}D$$
> *Example:* a 10 cm telescope at 550 nm: $\theta\approx6.7\times10^{-6}$ rad ≈ 1.4 arcseconds.

## 4 · Geometric optics

> [!FORMULA] Reflection, refraction, total internal reflection
> Angle of incidence = angle of reflection. **Snell's law:** $n_1\sin\theta_1=n_2\sin\theta_2$. Going into a less dense medium, light is **totally internally reflected** beyond the critical angle $\sin\theta_c=\frac{n_2}{n_1}$ (glass → air with $n=1.5$: $\theta_c\approx41.8°$). Both laws follow from **Fermat's principle**: light takes the path of stationary travel time.

> [!FORMULA] Thin lenses and mirrors
> $$\frac1f=\frac1{d_o}+\frac1{d_i},\qquad m=-\frac{d_i}{d_o}$$
> Sign convention (real-is-positive): $d_o>0$ for a real object, $d_i>0$ for a real image (on the far side of a lens, in front of a mirror); converging lens / concave mirror $f>0$; a spherical mirror has $f=\frac R2$. Negative $m$ = inverted image.

> [!EXAMPLE] A converging lens
> $f=10$ cm, object at 15 cm: $\frac1{d_i}=\frac1{10}-\frac1{15}=\frac1{30}$, so $d_i=30$ cm (real image), $m=-2$ (inverted, twice as large). Object at 5 cm: $\frac1{d_i}=\frac1{10}-\frac15=-\frac1{10}$, $d_i=-10$ cm: a virtual, upright image magnified ×2 (a magnifying glass).

> [!DEF] Two-lens systems and instruments
> Apply the lens equation to each lens in turn: the image of the first is the object of the second (a "virtual object" if it lies beyond the second lens). Thin lenses in contact: $\frac1f=\frac1{f_1}+\frac1{f_2}$. A **telescope** (objective $f_o$, eyepiece $f_e$, separated by $f_o+f_e$) has angular magnification $\frac{f_o}{f_e}$. A **prism** disperses light because $n$ depends on wavelength.

> [!VIDEO] KTzGBJPuJwM | But why would light "slow down"? Visualizing Feynman's lecture on the refractive index | 3Blue1Brown · 29 min

## 5 · Polarization

> [!FORMULA] Malus's and Brewster's laws
> Light passing through a polarizer at angle $\theta$ to its polarization keeps intensity $I=I_0\cos^2\theta$ (**Malus**). Unpolarized light through one polarizer loses half its intensity. Reflected light is completely polarized at **Brewster's angle** $\tan\theta_B=\frac{n_2}{n_1}$ (air → glass: about $56°$).

## 6 · The Doppler effect

> [!FORMULA] Doppler effect for sound
> $$f'=f\,\frac{v+v_o}{v-v_s}$$
> with $v$ the sound speed, $v_o$ the observer's speed **towards** the source and $v_s$ the source's speed **towards** the observer (use negative values for "away"). The relativistic Doppler effect for light is in module 06.

> [!EXAMPLE] A passing siren
> $f=700$ Hz, car at 30 m/s, $v=340$ m/s. Approaching: $700\cdot\frac{340}{310}\approx768$ Hz. Receding: $700\cdot\frac{340}{370}\approx643$ Hz.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Waves/Optics** deck.

## Practice (answers hidden)

1. A guitar string 0.65 m long has fundamental 110 Hz. What is the wave speed on it?
<details><summary>Answer</summary>

$v=2Lf=2\cdot0.65\cdot110=143$ m/s.
</details>

2. Green light (530 nm) falls on a grating with 600 lines/mm. At what angles are the first and second orders? Is there a third?
<details><summary>Answer</summary>

$d=1.667$ μm. $\sin\theta_1=0.318$ → $18.5°$; $\sin\theta_2=0.636$ → $39.5°$; $\sin\theta_3=0.954$ → $72.5°$, so yes, a third order exists (a fourth would need $\sin\theta>1$).
</details>

3. A fish looks up from under water ($n=1.33$). Within what angle from vertical can it see the sky?
<details><summary>Answer</summary>

$\sin\theta_c=\frac1{1.33}$, $\theta_c\approx48.8°$: the sky appears compressed into a cone of half-angle ~49° ("Snell's window").
</details>

4. Two polarizers at $60°$ to each other; unpolarized light of intensity $I_0$. Transmitted intensity?
<details><summary>Answer</summary>

$\frac{I_0}2\cos^260°=\frac{I_0}8$.
</details>

5. A concave mirror with $R=40$ cm forms an image of an object 30 cm away. Where and what kind?
<details><summary>Answer</summary>

$f=20$ cm: $\frac1{d_i}=\frac1{20}-\frac1{30}=\frac1{60}$, $d_i=60$ cm, real, inverted, $m=-2$.
</details>

## Build
- Measure the track spacing of a CD/DVD with a laser pointer (diffraction grating). A classic home experiment for module 07, too.

## Go deeper (all optional)
- ⭐ **[Kalda: Optics/waves material](https://www.ioc.ee/~kalda/ipho/)** + Kevin Zhou's waves/optics handouts.
- **Optics, Eugene Hecht** 💲 for reference · **[Falstad wave simulations](https://www.falstad.com/ripple/)** to play with ripples.

## Done when
- [ ] Every skip-test item done on paper · [ ] CD track spacing measured at home
