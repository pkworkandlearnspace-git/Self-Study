# 03 · Thermodynamics & Statistical Physics
> **Goal:** gases, heat engines, entropy, and the Boltzmann factor. · **Time:** 3–4 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - use the ideal gas law and **kinetic theory** (pressure from collisions, $v_{\text{rms}}$, equipartition);
> - apply the **first law** to every standard process and compute work, heat and internal energy;
> - use the **second law**: entropy, Carnot efficiency, refrigerators;
> - use the **Boltzmann factor** (atmosphere, populations of energy levels);
> - solve conduction and **radiation** problems (Stefan–Boltzmann, Wien), including Earth's temperature;
> - handle phase changes and know what real-gas corrections do.

## Skip test
- [ ] Derive the work done in isothermal and adiabatic expansions of an ideal gas.
- [ ] Prove the Carnot efficiency $1 - T_c/T_h$ and why no engine can beat it.
- [ ] Derive $pV = \frac13 Nm\langle v^2\rangle$ from kinetic theory. State equipartition.
- [ ] Use the Boltzmann factor to find the isothermal atmosphere's density profile.
- [ ] Use Stefan–Boltzmann to estimate Earth's equilibrium temperature.

## 1 · The ideal gas and kinetic theory

> [!FORMULA] Ideal gas law
> $$pV=nRT=NkT$$
> $R=8.314$ J/(mol·K), $k=1.381\times10^{-23}$ J/K, $N_A=6.022\times10^{23}$ mol⁻¹, $R=N_Ak$. Temperatures in **kelvin**.

> [!FORMULA] Pressure from molecular collisions
> A molecule of mass $m$ bouncing off a wall transfers momentum $2mv_x$. Summing over $N$ molecules in volume $V$ (and using $\langle v_x^2\rangle=\frac13\langle v^2\rangle$ by symmetry):
> $$pV=\tfrac13Nm\langle v^2\rangle\quad\Rightarrow\quad\tfrac12m\langle v^2\rangle=\tfrac32kT,\qquad v_{\text{rms}}=\sqrt{\frac{3kT}m}$$

> [!EXAMPLE] Nitrogen at room temperature
> $m=28\times1.66\times10^{-27}$ kg, $T=300$ K: $v_{\text{rms}}=\sqrt{\frac{3\cdot1.38\times10^{-23}\cdot300}{4.65\times10^{-26}}}\approx517$ m/s, faster than sound (~347 m/s at 300 K), as you'd expect since sound is carried by molecular motion.

> [!DEF] Equipartition
> In thermal equilibrium, every **quadratic** degree of freedom (a term like $\frac12mv_x^2$ or $\frac12kx^2$ in the energy) carries on average $\frac12kT$. So a gas with $f$ degrees of freedom has
> $$U=\frac f2nRT,\qquad C_V=\frac f2R\ \text{(per mole)}$$
> Monatomic: $f=3$. Diatomic at room temperature: $f=5$ (3 translation + 2 rotation; vibration is "frozen" until higher $T$).

> [!DEF] Maxwell distribution and mean free path
> Molecular speeds follow the **Maxwell–Boltzmann distribution**, peaking at $v_p=\sqrt{2kT/m}$, with mean $\bar v=\sqrt{8kT/\pi m}$ and $v_{\text{rms}}=\sqrt{3kT/m}$ ($v_p<\bar v<v_{\text{rms}}$). The **mean free path** between collisions is $\lambda=\frac1{\sqrt2\,n\sigma}$ ($n$ = number density, $\sigma$ = collision cross-section): about 70 nm in air at room conditions.

## 2 · The first law and thermodynamic processes

> [!FORMULA] First law
> $$\Delta U=Q-W,\qquad W=\int p\,dV$$
> $Q$ = heat **into** the gas, $W$ = work done **by** the gas. For an ideal gas $U$ depends only on $T$: $\Delta U=nC_V\Delta T$ for **any** process. Also $C_p-C_V=R$ and $\gamma=\frac{C_p}{C_V}$ ($\frac53$ monatomic, $\frac75$ diatomic).

> [!FORMULA] The standard processes (ideal gas)
> | Process | Constant | Work by gas $W$ | Heat $Q$ |
> |---|---|---|---|
> | isochoric | $V$ | $0$ | $nC_V\Delta T$ |
> | isobaric | $p$ | $p\Delta V$ | $nC_p\Delta T$ |
> | isothermal | $T$ | $nRT\ln\frac{V_2}{V_1}$ | $=W$ |
> | adiabatic | $pV^\gamma$ ($TV^{\gamma-1}$) | $\frac{p_1V_1-p_2V_2}{\gamma-1}$ | $0$ |

> [!EXAMPLE] Isothermal vs adiabatic expansion
> One mole of a monatomic gas at 300 K doubles its volume. **Isothermally:** $W=RT\ln2=8.314\cdot300\cdot0.693\approx1.73$ kJ, all supplied as heat. **Adiabatically:** $T_2=T_1\cdot2^{1-\gamma}=300\cdot2^{-2/3}\approx189$ K, and $W=-\Delta U=\frac32R(300-189)\approx1.38$ kJ, paid from internal energy. The adiabat is steeper on a $p$–$V$ diagram, so it does less work.

## 3 · The second law and entropy

> [!DEF] Entropy and the second law
> For a reversible process, $dS=\frac{\delta Q_{\text{rev}}}T$. **Second law:** the entropy of an isolated system never decreases; it stays constant only for reversible processes. Equivalently, heat never flows spontaneously from cold to hot, and no engine converts heat entirely into work. Entropy is a **state function**: compute $\Delta S$ along any convenient reversible path.

> [!FORMULA] Entropy change of an ideal gas
> $$\Delta S=nC_V\ln\frac{T_2}{T_1}+nR\ln\frac{V_2}{V_1}$$
> *Free expansion into vacuum* (no work, no heat, $T$ unchanged) to double volume: $\Delta S=nR\ln2>0$: irreversible.

> [!FORMULA] Carnot efficiency
> A heat engine takes $Q_h$ from a hot reservoir at $T_h$, rejects $Q_c$ to $T_c$, and does work $W=Q_h-Q_c$. Its efficiency is
> $$\eta=\frac W{Q_h}\le1-\frac{T_c}{T_h}$$
> **Proof:** total entropy change per cycle is $-\frac{Q_h}{T_h}+\frac{Q_c}{T_c}\ge0$ (the gas returns to its state; only the reservoirs change). So $\frac{Q_c}{Q_h}\ge\frac{T_c}{T_h}$. Equality for a reversible (Carnot) cycle: two isotherms and two adiabats.
> **Refrigerator:** coefficient of performance $\text{COP}=\frac{Q_c}W\le\frac{T_c}{T_h-T_c}$.

> [!EXAMPLE] A power station
> Steam at 800 K, cooling water at 300 K: the Carnot limit is $1-\frac{300}{800}=62.5\%$. Real plants reach about 40%.

## 4 · The Boltzmann factor

> [!FORMULA] Boltzmann factor
> In thermal equilibrium at temperature $T$, the probability of a state with energy $E$ is proportional to
> $$e^{-E/kT}$$
> Ratio of populations of two levels: $\frac{N_2}{N_1}=\frac{g_2}{g_1}e^{-(E_2-E_1)/kT}$ ($g$ = degeneracy). At room temperature $kT\approx\frac1{40}$ eV.

> [!EXAMPLE] The isothermal atmosphere
> A molecule at height $h$ has potential energy $mgh$, so $n(h)=n_0e^{-mgh/kT}=n_0e^{-h/H}$ with **scale height** $H=\frac{kT}{mg}$. For air ($m=29$ u) at 288 K: $H\approx8.4$ km. The same result follows from hydrostatics, $dp=-\rho g\,dh$, with $p=nkT$.

## 5 · Heat transfer

> [!FORMULA] Conduction
> **Fourier's law:** heat current $P=kA\frac{\Delta T}L$ through a slab (thermal conductivity $k$, area $A$, thickness $L$). **Thermal resistance** $R_{\text{th}}=\frac L{kA}$ combines like electrical resistance: in series they add, in parallel their reciprocals add ($\Delta T\leftrightarrow V$, $P\leftrightarrow I$).

> [!FORMULA] Radiation
> - **Stefan–Boltzmann:** a black body radiates $P=\sigma AT^4$, $\sigma=5.67\times10^{-8}$ W/(m²K⁴); a grey body $\varepsilon\sigma AT^4$.
> - **Wien's displacement law:** the spectrum peaks at $\lambda_{\max}=\frac bT$, $b=2.898\times10^{-3}$ m·K. (Sun ~5800 K → ~500 nm; human body ~310 K → ~9.4 μm.)

> [!EXAMPLE] Earth's equilibrium temperature
> Sunlight brings $S=1361$ W/m² onto Earth's cross-section $\pi R^2$; a fraction $a$ (albedo ≈ 0.3) is reflected. Earth radiates from its whole surface $4\pi R^2$:
> $$S(1-a)\pi R^2=4\pi R^2\sigma T^4\quad\Rightarrow\quad T=\Big(\frac{S(1-a)}{4\sigma}\Big)^{1/4}$$
> With $a=0.3$: $T\approx255$ K; with $a=0$: $\approx278$ K. The real mean surface temperature (~288 K) is higher because of the **greenhouse effect**.

> [!DEF] Newton's law of cooling
> For small temperature differences with convection, $\frac{dT}{dt}=-\frac{T-T_{\text{env}}}\tau$, so $T-T_{\text{env}}$ decays exponentially.

## 6 · Phase changes and real gases

> [!FORMULA] Latent heat and Clausius–Clapeyron
> Melting or boiling at constant $T$ absorbs $Q=mL$. The slope of the coexistence curve is
> $$\frac{dp}{dT}=\frac{L}{T\,\Delta v}$$
> ($L$ per mole or per kg, $\Delta v$ the matching volume change). For vaporisation, treating the vapour as ideal and neglecting the liquid's volume: $\ln p\approx-\frac{L}{RT}+\text{const}$ ($L$ per mole).

> [!DEF] Humidity
> **Relative humidity** = partial pressure of water vapour / saturated vapour pressure at that temperature. The **dew point** is the temperature at which the air would be saturated.

> [!FORMULA] van der Waals gas
> $$\Big(p+\frac{an^2}{V^2}\Big)(V-nb)=nRT$$
> $a$ accounts for attraction between molecules (lowers the pressure), $b$ for their finite size (excluded volume). It predicts a liquid–gas critical point qualitatively.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Thermo** deck.

## Practice (answers hidden)

1. A diatomic ideal gas is compressed adiabatically to half its volume from 300 K. Final temperature?
<details><summary>Answer</summary>

$T_2=T_1\cdot2^{\gamma-1}=300\cdot2^{0.4}\approx396$ K.
</details>

2. What is the maximum COP of a refrigerator keeping its inside at 4 °C in a 25 °C kitchen?
<details><summary>Answer</summary>

$\frac{277}{298-277}=\frac{277}{21}\approx13$.
</details>

3. 1 kg of water at 0 °C is mixed with 1 kg at 100 °C. Final temperature, and is entropy created? ($c=4186$ J/(kg·K))
<details><summary>Answer</summary>

50 °C. $\Delta S=c\ln\frac{323}{273}+c\ln\frac{323}{373}=4186\ln\frac{323^2}{273\cdot373}\approx+101$ J/K $>0$: irreversible.
</details>

4. Two levels are separated by $0.1$ eV at $T=300$ K (same degeneracy). Population ratio?
<details><summary>Answer</summary>

$kT\approx0.0259$ eV, so $e^{-0.1/0.0259}\approx e^{-3.87}\approx0.021$.
</details>

5. A wall is two layers: 10 cm brick ($k=0.6$) and 5 cm insulation ($k=0.04$), area 10 m², $\Delta T=20$ K. Heat loss?
<details><summary>Answer</summary>

$R=\frac{0.1}{0.6\cdot10}+\frac{0.05}{0.04\cdot10}=0.0167+0.125=0.142$ K/W, so $P=\frac{20}{0.142}\approx141$ W. The insulation dominates.
</details>

## Build
- Draw p–V diagrams for 5 cycles and compute their efficiencies. Estimate Earth's temperature with and without albedo.

## Go deeper (all optional)
- ⭐ **[Kalda: Thermodynamics study guide](https://www.ioc.ee/~kalda/ipho/)** + Kevin Zhou's thermodynamics (**T**) handouts.
- **An Introduction to Thermal Physics, Daniel Schroeder** 💲: excellent and readable (ch. 1–4, 6).
- **Fundamentals of Physics, Halliday/Resnick/Walker** 💲: the basics, if you need them.

## Done when
- [ ] Every skip-test item done on paper · [ ] 5 cycles analysed with efficiencies
