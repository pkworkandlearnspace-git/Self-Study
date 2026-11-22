# 02 · Mechanics
> **Goal:** the backbone of every IPhO (often 1–2 of the 3 theory problems). · **Time:** 5–7 weeks

👉 Interactive: [Orbit simulator](interactive/orbits.html) · [Driven damped oscillator](interactive/oscillator.html)

## Skip test
- [ ] A ladder leans on a frictionless wall with floor friction μ. Find the minimum angle before it slips.
- [ ] A cylinder rolls without slipping down an incline. Find its acceleration two ways: forces/torques, and energy.
- [ ] Find the period of small oscillations about a stable equilibrium of $U(x)$ ($\omega^2 = U''(x_0)/m$).
- [ ] Derive Kepler's third law for circular orbits, and the escape velocity. Explain the effective potential.
- [ ] In a rotating frame, write down the centrifugal and Coriolis forces.
- [ ] A rocket expels mass at relative speed $u$. Derive $\Delta v = u\ln(m_0/m_f)$.

## Core ideas
- **Kinematics:** projectiles, relative motion, constraints (strings, rods, rolling: $v = \omega R$).
- **Newton's laws:** free-body diagrams. **Choose axes wisely.** Non-inertial frames add $-m\mathbf a_{frame}$, centrifugal $m\omega^2r$, and Coriolis $-2m\boldsymbol\omega\times\mathbf v$.
- **Conservation laws:** energy (work–energy, potential energy), momentum (collisions, CM frame), angular momentum (central forces, a skater pulling in her arms). **Ask which quantity is conserved before writing equations.**
- **Rigid bodies:** moment of inertia (parallel/perpendicular axis theorems), torque $\boldsymbol\tau = \mathbf r\times\mathbf F$, $\tau = I\alpha$ about the CM or a fixed axis, rolling, the instantaneous axis of rotation, statics (Σ**F** = 0 and Σ**τ** = 0 about *any* point).
- **Oscillations:** SHM, small-oscillation approximations, energy method, coupled oscillators and **normal modes**, damped/driven oscillators, resonance, the Q-factor.
- **Gravitation:** Kepler's laws, the effective potential $U_{eff} = -\frac{GMm}{r}+\frac{L^2}{2mr^2}$, orbital energy $E = -\frac{GMm}{2a}$, the shell theorem.
- **Variable mass:** rockets, chains, conveyor belts.
- **Fluids:** hydrostatics, Archimedes, Bernoulli, continuity, surface tension (Laplace pressure $\Delta p = 2\sigma/R$), viscosity basics.
- 💡 **Lagrangian mechanics** is optional at IPhO but often a shortcut for complicated constraints. Learn it after the Newtonian toolkit is solid.

## Learn from
- ⭐ **[Jaan Kalda: Mechanics study guide](https://www.ioc.ee/~kalda/ipho/)**: a compact list of "ideas" with olympiad problems. Built specifically for IPhO. Also see Kevin Zhou's mechanics (**M**) handouts.
- ⭐ **Introduction to Classical Mechanics, David Morin** 💲: the best problem-based textbook. Ch. 1–9.
- **200 Puzzling Physics Problems**, Gnädig, Honyek & Riley 💲 · **Problems in General Physics**, Irodov (classic and hard).

## Build
- Solve every Kalda mechanics idea's associated problems. Then do 5 past IPhO mechanics problems under time pressure.

## Traps
- Taking torques about a point that's accelerating (only the CM or a fixed point is safe for $\tau = I\alpha$).
- Forgetting friction can point either way. Assume a direction and let the sign tell you.
