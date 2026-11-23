# 04 · Electromagnetism
> **Goal:** fields, circuits, and induction at the level of IPhO's long problems. · **Time:** 5–7 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - compute electric fields and potentials with superposition and **Gauss's law**;
> - solve conductor problems, including the **method of images**, and capacitor energy;
> - analyse DC and AC **circuits**: Kirchhoff, Thevenin, infinite ladders, RC/RL/LC transients, complex impedance;
> - compute magnetic fields with **Biot–Savart and Ampère**, and the motion of charges in $\mathbf E$ and $\mathbf B$;
> - use **Faraday's law** for induced EMFs, inductance and magnetic energy;
> - state Maxwell's equations and the basic properties of EM waves.

## Skip test
- [ ] Use Gauss's law for the field of a uniformly charged sphere (inside and outside) and an infinite plane.
- [ ] Use an image charge: the force between a point charge and a grounded conducting plane.
- [ ] Solve an RC charging circuit and an LC circuit. Give the energy stored in C and L.
- [ ] Find $\mathbf B$ of a long straight wire and a solenoid with Ampère's law, and at the center of a loop with Biot–Savart.
- [ ] A rod slides on rails in a uniform B. Find the EMF, current, and terminal velocity.
- [ ] Find the motion of a charged particle in uniform E ⟂ B (drift velocity $E/B$).

## 1 · Electrostatics

> [!FORMULA] Coulomb's law, field and potential
> $$\mathbf F=\frac{1}{4\pi\varepsilon_0}\frac{q_1q_2}{r^2}\hat{\mathbf r},\qquad\mathbf E=\frac{\mathbf F}{q},\qquad\mathbf E=-\nabla V,\qquad V=\frac{1}{4\pi\varepsilon_0}\frac qr$$
> $\frac1{4\pi\varepsilon_0}\approx8.99\times10^9$ N·m²/C². Fields and potentials of several charges **add** (superposition). Potential energy of a pair: $U=\frac{q_1q_2}{4\pi\varepsilon_0r}$.

> [!FORMULA] Gauss's law
> $$\oint_S\mathbf E\cdot d\mathbf A=\frac{Q_{\text{enc}}}{\varepsilon_0}$$
> Useful only with symmetry (spherical, cylindrical, planar), where $|\mathbf E|$ is constant on a well-chosen surface.

> [!EXAMPLE] Three classic fields
> - **Uniformly charged ball** (charge $Q$, radius $R$): outside $E=\frac{Q}{4\pi\varepsilon_0r^2}$ (like a point charge); inside, the enclosed charge is $Q\frac{r^3}{R^3}$, so $E=\frac{Qr}{4\pi\varepsilon_0R^3}$, growing linearly from 0.
> - **Infinite line** (charge per length $\lambda$): cylinder of radius $r$: $E=\frac{\lambda}{2\pi\varepsilon_0r}$.
> - **Infinite plane** (charge per area $\sigma$): pillbox through the plane: $E=\frac{\sigma}{2\varepsilon_0}$ on each side, independent of distance.

> [!DEF] Electric dipole
> Charges $\pm q$ separated by $\mathbf d$: dipole moment $\mathbf p=q\mathbf d$. In a uniform field it feels torque $\boldsymbol\tau=\mathbf p\times\mathbf E$ and has energy $U=-\mathbf p\cdot\mathbf E$. Far away its field falls as $1/r^3$.

## 2 · Conductors and capacitors

> [!DEF] Conductors in equilibrium
> Inside a conductor $\mathbf E=0$; any net charge sits on the surface; the whole conductor is an **equipotential**; just outside, $\mathbf E$ is perpendicular to the surface with magnitude $\frac\sigma{\varepsilon_0}$.

> [!DEF] Method of images
> Replace a conductor by fictitious charges that reproduce its boundary condition; by uniqueness the field outside is then correct. **Point charge $q$ at distance $d$ from a grounded infinite plane:** the image is $-q$ at the mirror point, so the attraction is
> $$F=\frac{1}{4\pi\varepsilon_0}\frac{q^2}{(2d)^2}=\frac{q^2}{16\pi\varepsilon_0d^2}$$
> (For a grounded sphere of radius $R$ and a charge at distance $a$ from its centre: image $-q\frac Ra$ at distance $\frac{R^2}a$.)

> [!FORMULA] Capacitance and energy
> $C=\frac QV$. Parallel plates: $C=\frac{\varepsilon_0\varepsilon_rA}d$. Energy stored $\frac12CV^2=\frac{Q^2}{2C}$, field energy density $u=\frac12\varepsilon_0E^2$. Capacitors in **parallel add**; in **series** their reciprocals add. A **dielectric** with relative permittivity $\varepsilon_r$ multiplies $C$ by $\varepsilon_r$.

## 3 · Circuits

> [!FORMULA] Kirchhoff's laws and combinations
> **Junction rule:** currents into a node sum to zero. **Loop rule:** voltage changes around a loop sum to zero. Resistors in series add; in parallel $\frac1R=\sum\frac1{R_i}$. Power $P=IV=I^2R=\frac{V^2}R$.

> [!DEF] Thevenin's theorem
> Any linear two-terminal network is equivalent to one EMF $\mathcal E_{\text{th}}$ (the open-circuit voltage) in series with one resistance $R_{\text{th}}$ (the resistance seen with sources switched off). Maximum power goes into a load $R=R_{\text{th}}$.

> [!EXAMPLE] An infinite ladder
> An infinite ladder of series resistors $R$ and shunt resistors $R$. Adding one more rung to the front doesn't change it (self-similarity): $R_{\text{eq}}=R+\frac{R\,R_{\text{eq}}}{R+R_{\text{eq}}}$. So $R_{\text{eq}}^2-RR_{\text{eq}}-R^2=0$, giving $R_{\text{eq}}=\frac{1+\sqrt5}2R\approx1.618R$.

> [!FORMULA] Transients
> - **RC charging** through $R$ from EMF $\mathcal E$: $Q(t)=C\mathcal E(1-e^{-t/RC})$, time constant $\tau=RC$.
> - **RL:** current rises as $I=\frac{\mathcal E}R(1-e^{-tR/L})$, $\tau=L/R$.
> - **LC:** charge oscillates at $\omega=\frac1{\sqrt{LC}}$; energy swaps between $\frac{Q^2}{2C}$ and $\frac12LI^2$ (like a spring and a mass).
> - **RLC:** a damped oscillator with $2\gamma=R/L$ (module 01).

> [!FORMULA] AC circuits with complex impedance
> With $V,I\propto e^{i\omega t}$: $Z_R=R$, $Z_L=i\omega L$, $Z_C=\frac1{i\omega C}$; combine them exactly like resistors. $|Z|$ gives amplitudes, $\arg Z$ the phase. A series RLC circuit resonates at $\omega_0=\frac1{\sqrt{LC}}$, where $Z=R$. Average power $\bar P=I_{\text{rms}}V_{\text{rms}}\cos\phi$.

> [!WARN] Non-linear elements
> Diodes and lamps don't obey $V=IR$. Solve graphically: draw the element's $I$–$V$ curve and the "load line" of the rest of the circuit; the intersection is the operating point.

## 4 · Magnetic fields

> [!FORMULA] Lorentz force
> $$\mathbf F=q(\mathbf E+\mathbf v\times\mathbf B),\qquad\text{on a wire: }\ \mathbf F=I\boldsymbol\ell\times\mathbf B$$
> The magnetic force is perpendicular to $\mathbf v$, so it does **no work**. In a uniform $\mathbf B$ a charge circles with radius $r=\frac{mv}{qB}$ and angular frequency $\omega_c=\frac{qB}m$ (independent of speed).

> [!EXAMPLE] Crossed fields: drift
> In uniform $\mathbf E\perp\mathbf B$, a charge starting from rest moves on a cycloid whose centre drifts with velocity $\mathbf v_d=\frac{\mathbf E\times\mathbf B}{B^2}$, magnitude $\frac EB$, the same for every charge and mass. (In the frame moving at $\mathbf v_d$ the electric field vanishes, leaving pure circular motion.) A **velocity selector** passes only particles with $v=E/B$ undeflected.

> [!FORMULA] Biot–Savart and Ampère
> $$d\mathbf B=\frac{\mu_0}{4\pi}\frac{I\,d\boldsymbol\ell\times\hat{\mathbf r}}{r^2},\qquad\oint\mathbf B\cdot d\boldsymbol\ell=\mu_0I_{\text{enc}}$$
> $\mu_0=4\pi\times10^{-7}$ T·m/A. Results to know:
> - long straight wire: $B=\frac{\mu_0I}{2\pi r}$ (10 A at 5 cm: $4\times10^{-5}$ T, about Earth's field);
> - centre of a circular loop of radius $R$: $B=\frac{\mu_0I}{2R}$;
> - long solenoid with $n$ turns per metre: $B=\mu_0nI$ inside, ≈ 0 outside.

> [!DEF] Magnetic dipole
> A current loop has magnetic moment $\mathbf m=I\mathbf A$. In a field: torque $\boldsymbol\tau=\mathbf m\times\mathbf B$, energy $U=-\mathbf m\cdot\mathbf B$. A small magnet behaves the same way.

## 5 · Induction

> [!FORMULA] Faraday's and Lenz's laws
> $$\mathcal E=-\frac{d\Phi_B}{dt},\qquad\Phi_B=\int\mathbf B\cdot d\mathbf A$$
> The induced current flows so as to **oppose** the change in flux (Lenz). **Motional EMF:** a rod of length $L$ moving at $v$ perpendicular to $\mathbf B$: $\mathcal E=BLv$.

> [!EXAMPLE] A rod on rails
> A rod of length $L$ slides on frictionless rails joined by a resistor $R$, in a uniform field $B$ perpendicular to the plane. A constant force $F$ pulls it. EMF $BLv$, current $I=\frac{BLv}R$, magnetic braking force $BIL=\frac{B^2L^2v}R$. **Terminal velocity** when the forces balance: $v_t=\frac{FR}{B^2L^2}$. Then all the work $Fv_t$ becomes heat $I^2R$ ✓ (energy check).

> [!FORMULA] Inductance and magnetic energy
> Self-inductance $L=\frac{\Phi}{I}$ (long solenoid: $L=\mu_0n^2A\ell$); EMF $-L\frac{dI}{dt}$. Energy $\frac12LI^2$, field energy density $\frac{B^2}{2\mu_0}$. **Mutual inductance** $M$ couples two circuits (transformers: $\frac{V_2}{V_1}=\frac{N_2}{N_1}$ for an ideal transformer).

## 6 · Maxwell's equations and EM waves

> [!FORMULA] Maxwell's equations (integral form)
> $$\oint\mathbf E\cdot d\mathbf A=\frac{Q}{\varepsilon_0},\quad\oint\mathbf B\cdot d\mathbf A=0,\quad\oint\mathbf E\cdot d\boldsymbol\ell=-\frac{d\Phi_B}{dt},\quad\oint\mathbf B\cdot d\boldsymbol\ell=\mu_0I+\mu_0\varepsilon_0\frac{d\Phi_E}{dt}$$
> The last term (displacement current) makes changing electric fields create magnetic fields, which allows **electromagnetic waves** travelling at $c=\frac1{\sqrt{\mu_0\varepsilon_0}}\approx3.00\times10^8$ m/s with $E=cB$.

> [!FORMULA] Energy flow and radiation pressure
> The **Poynting vector** $\mathbf S=\frac1{\mu_0}\mathbf E\times\mathbf B$ gives power per area. A wave of intensity $I$ exerts pressure $\frac Ic$ when absorbed and $\frac{2I}c$ when reflected.

> [!INTUITION] Analogies
> Gravity ↔ electrostatics (both inverse-square: Gauss's law works for both). Thermal circuits ↔ electric circuits (module 03). Mass–spring ↔ LC circuit.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **E&M** deck.

## Practice (answers hidden)

1. A hollow conducting sphere of radius $R$ carries charge $Q$. Field at $r<R$ and $r>R$?
<details><summary>Answer</summary>

$0$ inside (no enclosed charge); $\frac{Q}{4\pi\varepsilon_0r^2}$ outside.
</details>

2. Two capacitors, 2 μF and 3 μF, are in series across 10 V. Charge on each and total energy?
<details><summary>Answer</summary>

$C=\frac{2\cdot3}{5}=1.2$ μF, $Q=12$ μC on each, energy $\frac12CV^2=60$ μJ.
</details>

3. An LC circuit has $L=1$ mH and $C=1$ μF. What is its resonant frequency?
<details><summary>Answer</summary>

$\omega=\frac1{\sqrt{10^{-9}}}\approx3.16\times10^4$ rad/s, $f\approx5.0$ kHz.
</details>

4. A proton ($m=1.67\times10^{-27}$ kg) moves at $10^6$ m/s perpendicular to a 1 T field. Radius?
<details><summary>Answer</summary>

$r=\frac{mv}{qB}=\frac{1.67\times10^{-21}}{1.6\times10^{-19}}\approx1.0$ cm.
</details>

5. A square loop of side 10 cm sits in a field rising at 0.5 T/s, perpendicular to the loop, with resistance 2 Ω. Induced current?
<details><summary>Answer</summary>

$\mathcal E=A\frac{dB}{dt}=0.01\cdot0.5=5$ mV; $I=2.5$ mA, flowing to oppose the increase.
</details>

6. Twelve equal resistors $R$ form the edges of a cube. Resistance between opposite corners?
<details><summary>Answer</summary>

By symmetry, current $I$ splits into 3, then each of those into 2 (6 edges carrying $I/6$), then recombines into 3. Path: $\frac I3R+\frac I6R+\frac I3R=\frac56IR$, so $R_{\text{eq}}=\frac56R$.
</details>

## Build
- Solve 5 infinite/symmetric circuit puzzles. Derive the field of a uniformly magnetized sphere (stretch). Do 3 past IPhO E&M problems.

## Go deeper (all optional)
- ⭐ **[Kalda: Electricity & Magnetism study guide](https://www.ioc.ee/~kalda/ipho/)** + Kevin Zhou's E&M (**E**) handouts.
- ⭐ **Electricity and Magnetism, Purcell & Morin** (3rd ed.) 💲: the olympiad-standard E&M textbook.
- **Introduction to Electrodynamics, Griffiths** 💲: ch. 1–7, for more mathematical depth.

## Done when
- [ ] Every skip-test item done on paper · [ ] 3 past IPhO E&M problems
