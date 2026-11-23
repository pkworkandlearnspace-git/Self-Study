# 02 · Mechanics
> **Goal:** the backbone of every IPhO (often 1–2 of the 3 theory problems). · **Time:** 5–7 weeks

> [!GOAL]
> By the end of this chapter you can:
>
> - solve kinematics problems with constraints and relative motion;
> - draw free-body diagrams, use friction correctly, and work in **non-inertial frames**;
> - choose the right **conservation law** (energy, momentum, angular momentum) before writing equations;
> - handle **rigid bodies**: moments of inertia, torque, rolling, statics;
> - find the frequency of any small oscillation, including **normal modes** of coupled systems;
> - solve orbit problems with **Kepler's laws** and the effective potential;
> - treat rockets and other variable-mass systems, and basic **fluids**.

## Skip test
- [ ] A ladder leans on a frictionless wall with floor friction μ. Find the minimum angle before it slips.
- [ ] A cylinder rolls without slipping down an incline. Find its acceleration two ways: forces/torques, and energy.
- [ ] Find the period of small oscillations about a stable equilibrium of $U(x)$ ($\omega^2 = U''(x_0)/m$).
- [ ] Derive Kepler's third law for circular orbits, and the escape velocity. Explain the effective potential.
- [ ] In a rotating frame, write down the centrifugal and Coriolis forces.
- [ ] A rocket expels mass at relative speed $u$. Derive $\Delta v = u\ln(m_0/m_f)$.

## 1 · Kinematics

> [!FORMULA] Constant acceleration
> $$v=v_0+at,\qquad x=x_0+v_0t+\tfrac12at^2,\qquad v^2=v_0^2+2a(x-x_0)$$
> **Projectile** (launch speed $v_0$ at angle $\theta$, level ground, no air): time of flight $\frac{2v_0\sin\theta}g$, maximum height $\frac{v_0^2\sin^2\theta}{2g}$, range $R=\frac{v_0^2\sin2\theta}g$ (largest at $45°$).

> [!DEF] Relative motion and constraints
> **Relative velocity:** $\mathbf v_{A\text{ rel }B}=\mathbf v_A-\mathbf v_B$. Many problems become easy in the right frame (e.g. two falling objects move uniformly relative to each other).
> **Constraints** link motions: an inextensible string keeps its length constant (differentiate the length to relate speeds); a rigid rod keeps the distance between its ends; **rolling without slipping** means the contact point is at rest: $v=\omega R$.

## 2 · Forces and frames

> [!KEY] The free-body diagram routine
> 1. Isolate each body; draw **every** force acting on it (gravity, normal forces, tension, friction, springs).
> 2. Choose axes that make the equations simple (along and perpendicular to an incline).
> 3. Write $\sum\mathbf F=m\mathbf a$ for each body, plus the constraint equations.
> 4. Count unknowns vs equations before solving.

> [!DEF] Friction
> **Static:** $f\le\mu_sN$, as large as needed to prevent sliding (it can point either way). **Kinetic:** $f=\mu_kN$, opposing the relative sliding velocity. Assume a direction and let the sign of the answer tell you whether it was right.

> [!EXAMPLE] The ladder
> A uniform ladder of length $L$ and mass $m$ leans at angle $\theta$ to the floor against a frictionless wall; floor friction coefficient $\mu$. Forces: weight $mg$ at the middle, floor normal $N$ and friction $f$ at the foot, wall normal $N_w$ (horizontal) at the top.
> Vertical: $N=mg$. Horizontal: $f=N_w$. Torques about the foot: $N_wL\sin\theta=mg\frac L2\cos\theta$, so $N_w=\frac{mg}{2\tan\theta}$.
> No slipping needs $f\le\mu N$: $\frac1{2\tan\theta}\le\mu$, i.e. $\tan\theta\ge\frac1{2\mu}$. **Minimum angle** $\theta_{\min}=\arctan\frac1{2\mu}$.

> [!FORMULA] Non-inertial frames
> In a frame with acceleration $\mathbf A$, add the **inertial force** $-m\mathbf A$. In a frame rotating at constant angular velocity $\boldsymbol\omega$, add
> $$\mathbf F_{\text{centrifugal}}=m\omega^2\mathbf r_\perp\ \text{(outward from the axis)},\qquad\mathbf F_{\text{Coriolis}}=-2m\,\boldsymbol\omega\times\mathbf v$$
> where $\mathbf v$ is the velocity measured in the rotating frame. *Example:* the surface of water in a bucket spinning at $\omega$ is the paraboloid $z=\frac{\omega^2r^2}{2g}$ (effective potential $gz-\frac12\omega^2r^2$ is constant on it).

## 3 · Energy and momentum

> [!FORMULA] Work and energy
> Work $W=\int\mathbf F\cdot d\mathbf r$. **Work–energy theorem:** net work = change in kinetic energy. For conservative forces $\mathbf F=-\nabla U$, mechanical energy $K+U$ is conserved. Common potentials: gravity near the ground $mgh$, spring $\frac12kx^2$, gravitation $-\frac{GMm}r$.

> [!FORMULA] Momentum and collisions
> With no external force, total momentum is conserved. In the **centre-of-mass (CM) frame** the total momentum is zero, which simplifies collisions.
> **1D elastic collision** (body 2 initially at rest):
> $$v_1'=\frac{m_1-m_2}{m_1+m_2}v_1,\qquad v_2'=\frac{2m_1}{m_1+m_2}v_1$$
> Equal masses swap velocities. In a perfectly **inelastic** collision the bodies stick; kinetic energy is lost but momentum is conserved. The **coefficient of restitution** $e$ = (separation speed)/(approach speed).

> [!KEY] Which law first?
> Ask *what is conserved* before writing $F=ma$. No external horizontal force → horizontal momentum. No non-conservative work → energy. No external torque about a point → angular momentum about it. A sudden collision with a pivot → angular momentum about the pivot (the pivot force has no torque there).

## 4 · Rotation and rigid bodies

> [!FORMULA] Moments of inertia ($I=\sum m_ir_i^2$)
> | Body (mass $M$) | Axis | $I$ |
> |---|---|---|
> | thin rod, length $L$ | centre, perpendicular | $\frac1{12}ML^2$ |
> | thin rod | end, perpendicular | $\frac13ML^2$ |
> | ring / thin hoop, radius $R$ | central axis | $MR^2$ |
> | solid disk / cylinder | central axis | $\frac12MR^2$ |
> | solid sphere | diameter | $\frac25MR^2$ |
> | thin spherical shell | diameter | $\frac23MR^2$ |
> **Parallel axis:** $I=I_{\text{cm}}+Md^2$. **Perpendicular axis** (flat bodies): $I_z=I_x+I_y$.

> [!FORMULA] Rotational dynamics
> Torque $\boldsymbol\tau=\mathbf r\times\mathbf F$; angular momentum $\mathbf L=I\boldsymbol\omega$ (about a symmetry axis); $\boldsymbol\tau=\frac{d\mathbf L}{dt}$, so $\tau=I\alpha$ about a **fixed axis or the CM**. Kinetic energy of a rolling body: $K=\frac12Mv_{\text{cm}}^2+\frac12I_{\text{cm}}\omega^2$.
> **Statics:** $\sum\mathbf F=0$ and $\sum\boldsymbol\tau=0$ about **any** point; choose the point that eliminates the most unknown forces.

> [!EXAMPLE] A cylinder rolling down an incline, two ways
> Solid cylinder, mass $m$, radius $R$, incline angle $\theta$.
> **Forces and torques:** $ma=mg\sin\theta-f$ and $fR=I\alpha=\frac12mR^2\frac aR$, so $f=\frac12ma$. Then $\frac32ma=mg\sin\theta$: $a=\frac23g\sin\theta$.
> **Energy:** after dropping height $h$: $mgh=\frac12mv^2+\frac12\cdot\frac12mR^2\frac{v^2}{R^2}=\frac34mv^2$, so $v^2=\frac43gh$, which is constant acceleration $\frac23g\sin\theta$ along the slope ✓.
> In general $a=\frac{g\sin\theta}{1+I/(mR^2)}$: a hoop ($\frac12g\sin\theta$) loses to a disk, which loses to a solid sphere ($\frac57g\sin\theta$).

> [!WARN] Torques about an accelerating point
> $\tau=I\alpha$ holds about the CM or a fixed point. About an arbitrary accelerating point it needs an extra term. When in doubt, take torques about the CM.

## 5 · Oscillations

> [!FORMULA] Small oscillations, general method
> Write the energy in terms of one coordinate $q$: $E=\frac12m_{\text{eff}}\dot q^2+U(q)$. Near a stable equilibrium:
> $$\omega^2=\frac{U''(q_0)}{m_{\text{eff}}}$$
> *Examples:* spring $\omega=\sqrt{k/m}$; simple pendulum $\sqrt{g/\ell}$; **physical pendulum** (pivot at distance $d$ from the CM) $\omega=\sqrt{\frac{mgd}{I_{\text{pivot}}}}$.

> [!DEF] Coupled oscillators and normal modes
> A **normal mode** is a motion where every part oscillates at the **same** frequency. Any motion is a superposition of normal modes. Find them by trying $x_i=A_i\cos\omega t$ and requiring a non-zero solution (a determinant = 0).

> [!EXAMPLE] Two masses, three springs
> Masses $m$ between walls, outer springs $k$, middle spring $k'$. **In phase** ($x_1=x_2$): the middle spring never stretches, $\omega_1=\sqrt{k/m}$. **Out of phase** ($x_1=-x_2$): each mass feels $k+2k'$, $\omega_2=\sqrt{\frac{k+2k'}m}$. Starting one mass alone produces **beats**: energy sloshes between the masses at frequency $\omega_2-\omega_1$.

> [!TRY] [Driven damped oscillator](interactive/oscillator.html)
> Drive the oscillator and find resonance; compare a high-$Q$ and a low-$Q$ system.

## 6 · Gravitation and orbits

> [!FORMULA] Newton's gravitation and the shell theorem
> $F=\frac{GMm}{r^2}$, $U=-\frac{GMm}r$. A spherically symmetric body attracts outside points as if all its mass were at its centre; inside a uniform **shell** the force is zero.

> [!FORMULA] Circular orbits, escape speed, Kepler III
> Circular orbit: $\frac{mv^2}r=\frac{GMm}{r^2}$ → $v=\sqrt{\frac{GM}r}$, period $T=\frac{2\pi r}v$, so
> $$T^2=\frac{4\pi^2}{GM}a^3\quad\text{(Kepler III, also for ellipses with semi-major axis }a)$$
> Escape speed (total energy 0): $v_{\text{esc}}=\sqrt{\frac{2GM}R}$. For Earth: $v_1\approx7.9$ km/s, $v_{\text{esc}}\approx11.2$ km/s.

> [!FORMULA] Energy, effective potential, vis-viva
> Orbital energy $E=-\frac{GMm}{2a}$ (bound orbits). **Vis-viva:** $v^2=GM\big(\frac2r-\frac1a\big)$.
> Angular momentum $L=mr^2\dot\phi$ is conserved, so radial motion obeys an **effective potential**:
> $$U_{\text{eff}}(r)=-\frac{GMm}r+\frac{L^2}{2mr^2}$$
> The second term is a centrifugal barrier. Bound orbits ($E<0$) oscillate between perihelion and aphelion; the minimum of $U_{\text{eff}}$ is the circular orbit.

> [!EXAMPLE] Geostationary orbit
> Period = one sidereal day, $86\,164$ s. $r=\big(\frac{GMT^2}{4\pi^2}\big)^{1/3}\approx4.22\times10^7$ m, about $35\,800$ km above the surface.

> [!TRY] [Orbit simulator](interactive/orbits.html)
> Launch at different speeds from the same point: below $v_1$ (falls in), $v_1$ (circle), between $v_1$ and $v_{\text{esc}}$ (ellipse), above (escapes). Check Kepler III by comparing periods.

## 7 · Variable mass: rockets

> [!FORMULA] The rocket equation
> A rocket of mass $m$ ejects gas at speed $u$ **relative to the rocket**. In time $dt$ it loses $|dm|$; momentum conservation in the instantaneous rest frame gives $m\,dv=-u\,dm$. Integrating:
> $$\Delta v=u\ln\frac{m_0}{m_f}$$
> To double $\Delta v$ you must **square** the mass ratio, which is why rockets use stages.

> [!WARN] $F=\frac{dp}{dt}$ with changing mass
> Don't write $F=\frac{d(mv)}{dt}=m\dot v+\dot mv$ blindly: it depends on the frame and on the velocity of the mass being gained or lost. Always do momentum bookkeeping for the system over a short time $dt$.

## 8 · Fluids

> [!FORMULA] Fluid statics and dynamics
> - **Hydrostatics:** $p=p_0+\rho gh$. **Archimedes:** buoyancy = weight of displaced fluid.
> - **Continuity** (incompressible): $A_1v_1=A_2v_2$.
> - **Bernoulli** (steady, incompressible, no viscosity, along a streamline): $p+\frac12\rho v^2+\rho gh=$ const. *Torricelli:* water leaves a hole at depth $h$ with $v=\sqrt{2gh}$.
> - **Surface tension:** the pressure inside a droplet exceeds outside by $\Delta p=\frac{2\sigma}R$; a soap bubble (two surfaces) by $\frac{4\sigma}R$.

## 9 · Optional: Lagrangian mechanics

> [!DEF] Lagrangian method
> Choose generalised coordinates $q_i$ that respect the constraints, write $\mathcal L=K-U$, and use the Euler–Lagrange equations
> $$\frac{d}{dt}\frac{\partial\mathcal L}{\partial\dot q_i}=\frac{\partial\mathcal L}{\partial q_i}$$
> Constraint forces never appear. Not required at IPhO, but a powerful shortcut for complicated linkages. Learn it after the Newtonian toolkit is solid.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Mechanics** deck.

## Practice (answers hidden)

1. A ball is thrown at $20$ m/s at $30°$ above level ground ($g=9.8$). Find its range and time of flight.
<details><summary>Answer</summary>

Time $=\frac{2\cdot20\cdot\sin30°}{9.8}\approx2.04$ s; range $=\frac{400\sin60°}{9.8}\approx35.3$ m.
</details>

2. A solid sphere and a hoop race down the same incline from rest. Which wins, and what is the ratio of their accelerations?
<details><summary>Answer</summary>

The sphere: $a=\frac{g\sin\theta}{1+2/5}=\frac57g\sin\theta$ vs the hoop's $\frac12g\sin\theta$. Ratio $\frac{5/7}{1/2}=\frac{10}7$.
</details>

3. A uniform rod of length $L$ swings about one end. Find the period of small oscillations.
<details><summary>Answer</summary>

$\omega^2=\frac{mg(L/2)}{mL^2/3}=\frac{3g}{2L}$, so $T=2\pi\sqrt{\frac{2L}{3g}}$.
</details>

4. A satellite orbits at $r=2R_E$. How does its speed compare with one at $r=R_E$ (skimming the surface)?
<details><summary>Answer</summary>

$v\propto r^{-1/2}$, so it is slower by a factor $\sqrt2$: about $5.6$ km/s.
</details>

5. A rocket with exhaust speed $3$ km/s must reach $\Delta v=9$ km/s in one stage. What mass ratio $m_0/m_f$ is needed?
<details><summary>Answer</summary>

$e^{9/3}=e^3\approx20$: 95% of the launch mass must be fuel.
</details>

6. Water flows out of a hole 1.25 m below the surface of a wide tank. With what speed?
<details><summary>Answer</summary>

$\sqrt{2\cdot9.8\cdot1.25}\approx4.9$ m/s.
</details>

## Build
- Solve every Kalda mechanics idea's associated problems. Then do 5 past IPhO mechanics problems under time pressure.

## Traps
- Taking torques about a point that's accelerating (only the CM or a fixed point is safe for $\tau = I\alpha$).
- Forgetting friction can point either way. Assume a direction and let the sign tell you.
- Using energy conservation when friction or an inelastic collision dissipates energy.

## Go deeper (all optional)
- ⭐ **[Jaan Kalda: Mechanics study guide](https://www.ioc.ee/~kalda/ipho/)**: a compact list of "ideas" with olympiad problems. Built specifically for IPhO. Also see Kevin Zhou's mechanics (**M**) handouts.
- ⭐ **Introduction to Classical Mechanics, David Morin** 💲: the best problem-based textbook. Ch. 1–9.
- **200 Puzzling Physics Problems**, Gnädig, Honyek & Riley 💲 · **Problems in General Physics**, Irodov (classic and hard).

## Done when
- [ ] Every skip-test item done on paper · [ ] 5 past IPhO mechanics problems under time pressure
