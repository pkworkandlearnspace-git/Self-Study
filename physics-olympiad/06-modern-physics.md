# 06 · Modern Physics
> **Goal:** special relativity, quantum basics, and atomic/nuclear physics at IPhO level. · **Time:** 3–4 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - use the **Lorentz transformation** for time dilation, length contraction, simultaneity and velocity addition;
> - solve collisions and decays with **four-momentum invariants** instead of frame juggling;
> - apply the photon picture: photoelectric effect, Compton scattering, de Broglie waves, the uncertainty principle;
> - derive hydrogen's energy levels with the **Bohr model** and predict spectral lines;
> - compute radioactive decay, binding energies and reaction **Q-values**.

## Skip test
- [ ] Derive time dilation and length contraction from the Lorentz transformation.
- [ ] Use 4-momentum invariance to find the threshold energy of a particle-creation reaction.
- [ ] Compute the photoelectric stopping potential, and the Compton shift.
- [ ] Use the Bohr model to derive the hydrogen energy levels $E_n = -13.6\,\text{eV}/n^2$.
- [ ] Use Heisenberg to estimate the ground-state energy of a particle in a box.
- [ ] Compute the activity after $t$ given the half-life. Compute a nuclear reaction's Q-value.

## 1 · Special relativity: space and time

> [!DEF] The two postulates
> 1. The laws of physics are the same in every inertial frame.
> 2. The speed of light in vacuum, $c$, is the same in every inertial frame.

> [!FORMULA] Lorentz transformation
> A frame $S'$ moves at speed $v$ along $x$ relative to $S$. With $\beta=\frac vc$ and $\gamma=\frac1{\sqrt{1-\beta^2}}$:
> $$x'=\gamma(x-vt),\qquad t'=\gamma\Big(t-\frac{vx}{c^2}\Big),\qquad y'=y,\ z'=z$$
> The **interval** $c^2t^2-x^2-y^2-z^2$ between two events is the same in every frame.

> [!FORMULA] The three consequences
> - **Time dilation:** a clock moving at $v$ ticks slowly: $\Delta t=\gamma\,\Delta\tau$ ($\Delta\tau$ = **proper time**, measured by the clock itself).
> - **Length contraction:** a moving rod is shorter along its motion: $L=\frac{L_0}\gamma$ ($L_0$ = proper length, in its rest frame).
> - **Relativity of simultaneity:** events simultaneous in $S$ and separated by $\Delta x$ are separated in time by $\gamma\frac{v\Delta x}{c^2}$ in $S'$.

> [!EXAMPLE] Muons reach the ground
> Muons made 15 km up move at $0.995c$ ($\gamma\approx10$). Their lifetime at rest is 2.2 μs, which naively allows only $\approx660$ m of travel. In the Earth frame their lifetime is dilated to 22 μs (≈ 6.6 km). In the muon frame the atmosphere is contracted 10×. Both views agree: a measurable fraction survives to sea level.

> [!FORMULA] Velocity addition
> An object moving at $u$ in $S$ has, in $S'$ (moving at $v$),
> $$u'=\frac{u-v}{1-uv/c^2}$$
> Equivalently, combining speeds $u$ and $v$ in the same direction gives $\frac{u+v}{1+uv/c^2}<c$. *Example:* $0.6c$ "plus" $0.6c$ is $\frac{1.2}{1.36}c\approx0.88c$.

## 2 · Relativistic energy and momentum

> [!FORMULA] Energy, momentum and the invariant mass
> $$E=\gamma mc^2,\qquad\mathbf p=\gamma m\mathbf v,\qquad E^2-(pc)^2=(mc^2)^2$$
> Kinetic energy $K=(\gamma-1)mc^2$. For a photon $m=0$, so $E=pc$. In any collision or decay, total $E$ and $\mathbf p$ are conserved, and for any system $E_{\text{tot}}^2-(p_{\text{tot}}c)^2$ is the same in every frame (it is $(Mc^2)^2$, where $M$ is the energy in the CM frame divided by $c^2$).

> [!EXAMPLE] Threshold for making an antiproton
> $p+p\to p+p+p+\bar p$, a proton of energy $E$ hitting one at rest. In the lab, the invariant is $(E+mc^2)^2-(pc)^2=2mc^2E+2(mc^2)^2$. At threshold all four products are at rest in the CM frame, so the invariant equals $(4mc^2)^2$. Hence $2E\,mc^2+2m^2c^4=16m^2c^4$, so $E=7mc^2$, i.e. kinetic energy $6mc^2\approx5.6$ GeV. (Exactly why the 1955 Bevatron was built for ~6 GeV.)

> [!FORMULA] Relativistic Doppler effect
> A source approaching at speed $\beta c$: $f_{\text{obs}}=f\sqrt{\frac{1+\beta}{1-\beta}}$ (receding: swap the signs). Unlike sound, only the relative velocity matters.

> [!KEY] Use invariants, not frame juggling
> For collisions, decays and thresholds, write the invariant $E^2-(pc)^2$ in the frame where it's easy to compute (often the CM frame, where everything is at rest at threshold) and set it equal to its value in the lab frame. Most "messy" relativity problems become two lines.

## 3 · Quantum basics

> [!FORMULA] Photons
> $$E=hf=\frac{hc}\lambda,\qquad p=\frac h\lambda$$
> $h=6.626\times10^{-34}$ J·s. Handy: $hc\approx1240$ eV·nm (so a 620 nm photon has 2.0 eV).

> [!FORMULA] Photoelectric effect
> Light ejects electrons from a metal with work function $\phi$ only if $hf>\phi$, whatever the intensity. Maximum kinetic energy and stopping potential:
> $$K_{\max}=eV_s=hf-\phi$$
> *Example:* 400 nm light (3.10 eV) on a metal with $\phi=2.3$ eV: $V_s\approx0.80$ V.

> [!FORMULA] Compton scattering
> A photon scattering off an electron at rest through angle $\theta$ gets longer:
> $$\Delta\lambda=\frac h{m_ec}(1-\cos\theta),\qquad\frac h{m_ec}\approx2.43\ \text{pm}$$
> Only noticeable for X-rays and gamma rays. Derived from relativistic energy and momentum conservation.

> [!FORMULA] Matter waves and uncertainty
> Every particle has a **de Broglie wavelength** $\lambda=\frac hp$. **Heisenberg:** $\Delta x\,\Delta p\ge\frac\hbar2$; for estimates use $\Delta x\,\Delta p\sim\hbar$ ($\hbar=\frac h{2\pi}$).
> **Particle in a box** of width $L$: standing waves with $L=n\frac\lambda2$ give
> $$E_n=\frac{n^2h^2}{8mL^2}$$
> The ground state energy is never zero: confinement costs kinetic energy. This is why atoms don't collapse.

> [!DEF] Tunnelling
> A quantum particle can cross a barrier higher than its energy; the probability falls roughly as $e^{-2\kappa d}$ with $\kappa=\frac{\sqrt{2m(U-E)}}\hbar$ and barrier width $d$. It explains alpha decay and the scanning tunnelling microscope.

## 4 · Atoms

> [!FORMULA] The Bohr model of hydrogen
> Assume circular orbits with quantized angular momentum $L=n\hbar$. Combined with $\frac{mv^2}r=\frac{ke^2}{r^2}$ this gives
> $$r_n=n^2a_0\ (a_0\approx0.0529\ \text{nm}),\qquad E_n=-\frac{13.6\ \text{eV}}{n^2}$$
> For a one-electron ion with nuclear charge $Z$: $E_n=-13.6\,\frac{Z^2}{n^2}$ eV.

> [!FORMULA] Spectral lines
> A jump from level $n_2$ to $n_1<n_2$ emits a photon with
> $$\frac1\lambda=R\Big(\frac1{n_1^2}-\frac1{n_2^2}\Big),\qquad R\approx1.097\times10^7\ \text{m}^{-1}$$
> $n_1=1$: Lyman (UV); $n_1=2$: Balmer (visible; H-α, $3\to2$, is red at 656 nm); $n_1=3$: Paschen (IR).

## 5 · Nuclear physics

> [!FORMULA] Radioactive decay
> $$N(t)=N_0e^{-\lambda t}=N_02^{-t/T_{1/2}},\qquad T_{1/2}=\frac{\ln2}\lambda,\qquad\text{activity }A=\lambda N$$
> Decays: **α** (a helium-4 nucleus; $Z-2$, $A-4$), **β⁻** (a neutron turns into a proton, emitting an electron and an antineutrino; $Z+1$), **β⁺** ($Z-1$), **γ** (a photon from an excited nucleus; $Z$, $A$ unchanged).

> [!FORMULA] Binding energy and Q-value
> A nucleus weighs less than its separate nucleons; the **mass defect** times $c^2$ is the binding energy. A reaction's energy release is
> $$Q=\big(\textstyle\sum m_{\text{before}}-\sum m_{\text{after}}\big)c^2,\qquad1\ \text{u}\cdot c^2=931.5\ \text{MeV}$$
> Binding energy per nucleon peaks near iron, so **fusion** of light nuclei and **fission** of heavy ones both release energy.

> [!EXAMPLE] Q-value of D–T fusion
> $^2\text{H}+{}^3\text{H}\to{}^4\text{He}+n$. Masses: 2.014102 + 3.016049 − 4.002603 − 1.008665 = 0.018883 u. $Q\approx0.018883\cdot931.5\approx17.6$ MeV.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Modern** deck.

## Practice (answers hidden)

1. A spaceship moves at $0.8c$. A trip lasts 10 years in Earth's frame. How long for the crew?
<details><summary>Answer</summary>

$\gamma=\frac53$, so $\frac{10}{5/3}=6$ years.
</details>

2. What is the kinetic energy of an electron with $\gamma=3$? ($m_ec^2=0.511$ MeV)
<details><summary>Answer</summary>

$(\gamma-1)m_ec^2=2\cdot0.511\approx1.02$ MeV.
</details>

3. A photon has wavelength 500 nm. Its energy in eV and momentum?
<details><summary>Answer</summary>

$E=\frac{1240}{500}=2.48$ eV; $p=\frac h\lambda=1.33\times10^{-27}$ kg·m/s.
</details>

4. What is the wavelength of the hydrogen $4\to2$ transition?
<details><summary>Answer</summary>

$\frac1\lambda=R\big(\frac14-\frac1{16}\big)=\frac{3R}{16}$, so $\lambda=\frac{16}{3R}\approx486$ nm (blue-green H-β).
</details>

5. A sample has half-life 8 days. What fraction remains after 24 days, and by what factor has the activity dropped?
<details><summary>Answer</summary>

$2^{-3}=\frac18$ remains; the activity (∝ $N$) is also $\frac18$ of the original.
</details>

6. Estimate the minimum kinetic energy of an electron confined to a nucleus-sized region ($\Delta x\sim10^{-14}$ m). What does it tell you?
<details><summary>Answer</summary>

$p\sim\frac\hbar{\Delta x}\approx10^{-20}$ kg·m/s, so $pc\approx20$ MeV, relativistic: $K\sim20$ MeV. Far more than nuclear binding allows for electrons, so electrons can't live inside nuclei (β electrons are created in the decay).
</details>

## Build
- 10 relativity problems solved with **invariants only** (no frame juggling). Compare them against the brute-force method.

## Go deeper (all optional)
- ⭐ **[Kevin Zhou's relativity (R) and modern-physics handouts](https://knzhou.github.io/#handouts)** + [Kalda](https://www.ioc.ee/~kalda/ipho/).
- **Spacetime Physics, Taylor & Wheeler** 💲 (relativity done beautifully) · Morin's *Classical Mechanics* ch. 11–14 (relativity).
- **[Feynman Lectures, Vol. III](https://www.feynmanlectures.caltech.edu/)** for quantum intuition (free online).

## Done when
- [ ] Every skip-test item done on paper · [ ] 10 relativity problems solved with invariants
