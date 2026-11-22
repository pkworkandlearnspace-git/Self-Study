# 04 · Electromagnetism
> **Goal:** fields, circuits, and induction at the level of IPhO's long problems. · **Time:** 5–7 weeks

👉 Interactive: [RC, RL and RLC circuits](interactive/circuits.html) · [Quiz](interactive/quiz.html?deck=E%26M)

## Skip test
- [ ] Use Gauss's law for the field of a uniformly charged sphere (inside and outside) and an infinite plane.
- [ ] Use an image charge: the force between a point charge and a grounded conducting plane.
- [ ] Solve an RC charging circuit and an LC circuit. Give the energy stored in C and L. Show that charging a capacitor from a battery always wastes half the energy.
- [ ] Find the input resistance of an infinite resistor ladder.
- [ ] Find $\mathbf B$ of a long straight wire and a solenoid with Ampère's law, and at the center of a loop with Biot–Savart.
- [ ] A rod slides on rails in a uniform B. Find the EMF, current, and terminal velocity.
- [ ] Find the motion of a charged particle in uniform E ⟂ B (drift velocity $E/B$).

## Core ideas
- **Electrostatics:** Coulomb, superposition, $\mathbf E = -\nabla V$. **Gauss's law** $\oint\mathbf E\cdot d\mathbf A = Q_{enc}/\varepsilon_0$ (use symmetry!). Self-energy of a uniform sphere: $U = \frac35\frac{Q^2}{4\pi\varepsilon_0R}$.
- **Conductors:** E = 0 inside, the surface is an equipotential, the field just outside is $\sigma/\varepsilon_0$. **Method of images** (plane: one image $-q$ at the mirror point; grounded sphere: $q' = -qR/d$ at distance $R^2/d$ from the center). Capacitance, energy $\frac12CV^2$, energy density $\frac12\varepsilon_0E^2$.
- **Dielectrics:** $\varepsilon_r$, polarization (qualitative/basic). A dielectric that fills a capacitor multiplies C by $\varepsilon_r$.
- **Circuits:** Kirchhoff's laws, series/parallel, **Thevenin equivalent**, infinite ladders (self-similarity), symmetry (equipotential nodes can be joined or cut), RC/RL/LC/RLC transients, AC with complex impedance ($Z_L = i\omega L$, $Z_C = 1/(i\omega C)$), non-linear elements (diodes, graphically).
- **Magnetostatics:** Lorentz force $q(\mathbf E + \mathbf v\times\mathbf B)$, Biot–Savart, **Ampère's law**, magnetic dipoles ($\boldsymbol\mu = I\mathbf A$, torque $\boldsymbol\mu\times\mathbf B$, energy $-\boldsymbol\mu\cdot\mathbf B$), the force on a current-carrying wire $I\mathbf L\times\mathbf B$.
- **Induction:** Faraday $\mathcal E = -d\Phi/dt$, Lenz's law, motional EMF $vBL$, self/mutual inductance, energy $\frac12LI^2$, eddy currents.
- **Maxwell's equations & EM waves:** displacement current, $c = 1/\sqrt{\mu_0\varepsilon_0}$, the Poynting vector $\mathbf S = \mathbf E\times\mathbf B/\mu_0$, radiation pressure $I/c$ (absorbed) or $2I/c$ (reflected).
- 🔭 **Analogies:** thermal circuits ↔ electric circuits; gravity ↔ electrostatics (Gauss); RLC ↔ damped mass on a spring ($L\leftrightarrow m$, $R\leftrightarrow$ friction, $1/C\leftrightarrow k$).

## Worked examples

**1. Charge near a grounded plane.** A charge $q$ sits a distance $d$ from an infinite grounded conducting plane. Above the plane, the field is the same as that of $q$ plus an image $-q$ at distance $d$ behind the plane, because that pair makes the plane an equipotential at $V = 0$. The force is therefore $F = \frac{q^2}{4\pi\varepsilon_0(2d)^2}$, attractive. (For 1 µC at 10 cm this is 0.22 N.) Trap: the *energy* is half of $-\frac{q^2}{4\pi\varepsilon_0(2d)}$, because the image moves with the charge. Integrate the force instead of using the two-charge formula.

**2. Rod on rails.** A rod of mass $m$ and length $\ell$ slides down frictionless vertical rails joined at the top by a resistor $R$, in a horizontal field $B$. The EMF is $B\ell v$, the current $B\ell v/R$, and the magnetic force $B^2\ell^2v/R$ upward. The terminal velocity is where this balances gravity: $v_t = \dfrac{mgR}{B^2\ell^2}$. The approach is exponential with time constant $v_t/g$, the same ODE as RC charging.

**3. Half the energy is always lost.** A battery $V_0$ charges a capacitor through any resistor $R$. It delivers charge $CV_0$ at voltage $V_0$, so it supplies $W = CV_0^2$, but the capacitor stores only $\frac12CV_0^2$. The heat in $R$ is $\int I^2R\,dt = \frac{V_0^2}{R}\int_0^\infty e^{-2t/RC}dt = \frac12CV_0^2$, whatever $R$ is. (Charge in many small steps and the loss goes to zero. This is "adiabatic charging".)

## Practice
<details><summary><b>P1.</b> Field inside and outside a uniformly charged solid sphere (charge Q, radius R).</summary>

Gauss with a concentric sphere of radius $r$. Outside: $E\cdot4\pi r^2 = Q/\varepsilon_0$, so $E = \frac{Q}{4\pi\varepsilon_0r^2}$. Inside, the enclosed charge is $Q r^3/R^3$, so $E = \frac{Qr}{4\pi\varepsilon_0R^3}$, linear in $r$. A tunnel through such a planet gives SHM.
</details>

<details><summary><b>P2.</b> Infinite ladder: each rung is a series resistor R followed by a shunt R. Input resistance?</summary>

Adding one more rung at the front doesn't change the input resistance $x$: $x = R + \frac{Rx}{R + x}$. So $x^2 - Rx - R^2 = 0$ and $x = \frac{1+\sqrt5}2R\approx1.618R$. Check in the [quiz](interactive/quiz.html?deck=E%26M).
</details>

<details><summary><b>P3.</b> An electron moves at 10⁷ m/s perpendicular to B = 0.01 T. Find its orbit radius and period.</summary>

$r = \frac{mv}{eB} = \frac{9.11\times10^{-31}\cdot10^7}{1.60\times10^{-19}\cdot0.01} = 5.7$ mm. $T = \frac{2\pi m}{eB} = 3.6$ ns, independent of speed (non-relativistic).
</details>

<details><summary><b>P4.</b> A charged capacitor C (voltage V₀) is connected to an uncharged identical capacitor through a resistor. What fraction of the energy is lost?</summary>

Charge conservation: the final voltage on each is $V_0/2$. Energy: before $\frac12CV_0^2$, after $2\cdot\frac12C(V_0/2)^2 = \frac14CV_0^2$. Half is lost as heat (or radiation, if R → 0). The answer doesn't depend on R.
</details>

<details><summary><b>P5.</b> A series RLC circuit has R = 20 Ω, L = 100 mH, C = 10 µF. Find ω₀, Q, and whether a step response oscillates.</summary>

$\omega_0 = 1/\sqrt{LC} = 1000$ rad/s. $Q = \omega_0L/R = 5$. Critical resistance $2\sqrt{L/C} = 200\ \Omega > 20\ \Omega$, so it is under-damped and rings about $Q$ times before dying out. These are the [circuit tool](interactive/circuits.html)'s default values.
</details>

<details><summary><b>P6.</b> A square loop of side a and resistance R is pulled at constant speed v out of a region of uniform field B. What force is needed, and where does the power go?</summary>

While one side is still inside: $\mathcal E = Bav$, $I = Bav/R$, and the force on the inside edge is $IaB = B^2a^2v/R$ (opposing motion, Lenz). The power $Fv = B^2a^2v^2/R = I^2R$ all becomes Joule heat.
</details>

## Common mistakes
- Using Gauss's law without enough symmetry. It is always true but only *useful* for spheres, infinite cylinders, and infinite planes.
- Plane of charge vs conductor surface: $\sigma/2\varepsilon_0$ for an isolated sheet, $\sigma/\varepsilon_0$ just outside a conductor.
- Using the two-point-charge energy for image problems (see worked example 1).
- Sign of the EMF: let Lenz's law pick the direction, and use Faraday only for the magnitude.
- Treating a capacitor as an open circuit or an inductor as a wire *at t = 0*. It's the other way round: at $t=0^+$ an uncharged C acts as a wire and an inductor as an open circuit (currents through L and voltages across C can't jump).

## Learn from
- ⭐ **[Kalda: Electricity & Magnetism study guide](https://www.ioc.ee/~kalda/ipho/)** + Kevin Zhou's E&M handouts **E1–E8** (E1 electrostatics, E2 electricity, E3 magnetostatics, E4 Lorentz force, E5 induction, E6 circuits, E7 electrodynamics).
- ⭐ **Electricity and Magnetism, Purcell & Morin** (3rd ed.) 💲: the olympiad-standard E&M textbook.
- **Introduction to Electrodynamics, Griffiths** 💲: ch. 1–7, for more mathematical depth.

## Build
- Solve 5 infinite/symmetric circuit puzzles. Derive the field of a uniformly magnetized sphere (stretch). Do 3 past IPhO E&M problems.

## Done when
- [ ] Skip test passes.  - [ ] You can predict the shape of any RC/RL/RLC transient before simulating it.
