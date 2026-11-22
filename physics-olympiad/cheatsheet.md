# Physics Olympiad Cheatsheet
One-page recap. If a line feels unfamiliar, open the module (→ NN).

## Constants (to 3 sig figs)
$c = 3.00\times10^8$ m/s · $G = 6.67\times10^{-11}$ · $h = 6.63\times10^{-34}$ J·s · $\hbar = 1.05\times10^{-34}$ · $k_B = 1.38\times10^{-23}$ J/K · $N_A = 6.02\times10^{23}$ · $R = 8.31$ J/(mol·K) · $e = 1.60\times10^{-19}$ C · $m_e = 9.11\times10^{-31}$ kg · $m_p = 1.67\times10^{-27}$ kg · $\varepsilon_0 = 8.85\times10^{-12}$ · $\mu_0 = 4\pi\times10^{-7}$ · $\sigma = 5.67\times10^{-8}$ W/(m²K⁴) · 1 eV = $1.60\times10^{-19}$ J

## Approximations (→ 01)
$(1+x)^n\approx1+nx$ · $\sin x\approx x - x^3/6$ · $\cos x\approx1-x^2/2$ · $\ln(1+x)\approx x - x^2/2$ · $e^x\approx1+x+x^2/2$
Small oscillations about $x_0$: $\omega^2 = U''(x_0)/m$

## Mechanics (→ 02)
- Moments of inertia: rod (center) $\frac1{12}ML^2$ · rod (end) $\frac13ML^2$ · disk $\frac12MR^2$ · ring $MR^2$ · solid sphere $\frac25MR^2$ · shell $\frac23MR^2$ · parallel axis $I = I_{cm}+Md^2$
- Rolling down an incline: $a = \frac{g\sin\theta}{1+I/(mR^2)}$
- Rotating frame: $\mathbf F_{cf} = m\omega^2\mathbf r_\perp$, $\mathbf F_{cor} = -2m\boldsymbol\omega\times\mathbf v$
- Orbits: $v_{circ} = \sqrt{GM/r}$ · $v_{esc} = \sqrt{2GM/r}$ · $T^2 = \frac{4\pi^2}{GM}a^3$ · $E = -\frac{GMm}{2a}$ · $U_{eff} = -\frac{GMm}r+\frac{L^2}{2mr^2}$
- Rocket: $\Delta v = u\ln\frac{m_0}{m_f}$ · Damped: $\omega_d = \sqrt{\omega_0^2-\gamma^2}$ (for $\ddot x+2\gamma\dot x+\omega_0^2x=0$) · $Q = \omega_0/(2\gamma)$
- Fluids: $p = p_0+\rho gh$ · Bernoulli $p+\frac12\rho v^2+\rho gh$ = const · Laplace $\Delta p = 2\sigma/R$ (drop)

## Thermo (→ 03)
$pV = nRT$ · $U = \frac f2nRT$ · $C_p-C_V = R$ · adiabatic $pV^\gamma$ = const, $TV^{\gamma-1}$ = const
$W_{iso} = nRT\ln\frac{V_2}{V_1}$ · $\eta_{Carnot} = 1-\frac{T_c}{T_h}$ · $dS = \delta Q/T$ · $P\propto e^{-E/kT}$ · $v_{rms} = \sqrt{3kT/m}$ · $P = \sigma AT^4$ · $\lambda_{max}T = 2.90\times10^{-3}$ m·K

## E&M (→ 04)
- Sphere: $E = \frac{kQ}{r^2}$ outside, $\frac{kQr}{R^3}$ inside (uniform) · plane $\frac{\sigma}{2\varepsilon_0}$ · capacitor $C = \frac{\varepsilon_0A}d$, $U = \frac12CV^2$
- Wire $B = \frac{\mu_0I}{2\pi r}$ · loop center $\frac{\mu_0I}{2R}$ · solenoid $\mu_0nI$ · $U_L = \frac12LI^2$ · $u = \frac{\varepsilon_0E^2}2+\frac{B^2}{2\mu_0}$
- $\tau_{RC} = RC$ · $\tau_{RL} = L/R$ · $\omega_{LC} = 1/\sqrt{LC}$ · $Z_L = i\omega L$, $Z_C = \frac{1}{i\omega C}$
- Cyclotron $r = \frac{mv}{qB}$, $\omega = \frac{qB}m$ · E⟂B drift $v = E/B$ · $\mathcal E = -\frac{d\Phi}{dt}$, motional $\mathcal E = vBL$

## Waves & optics (→ 05)
Double slit $\Delta y = \frac{\lambda L}d$ · grating $d\sin\theta = m\lambda$ · single-slit minima $a\sin\theta = m\lambda$ · Rayleigh $1.22\lambda/D$ · thin lens $\frac1f = \frac1{d_o}+\frac1{d_i}$ · Snell $n_1\sin\theta_1 = n_2\sin\theta_2$ · Brewster $\tan\theta_B = n_2/n_1$ · string $v = \sqrt{T/\mu}$ · Doppler $f' = f\frac{v\pm v_o}{v\mp v_s}$

## Modern (→ 06)
$\gamma = (1-\beta^2)^{-1/2}$ · $E^2 = (pc)^2+(mc^2)^2$ · $u' = \frac{u-v}{1-uv/c^2}$ · relativistic Doppler $f' = f\sqrt{\frac{1+\beta}{1-\beta}}$ (approaching)
$E = hf$ · $\lambda = h/p$ · Compton $\Delta\lambda = \frac{h}{m_ec}(1-\cos\theta)$ · Bohr $E_n = -\frac{13.6\text{ eV}}{n^2}$ · box $E_n = \frac{n^2h^2}{8mL^2}$ · $hc = 1240$ eV·nm · $N = N_02^{-t/T_{1/2}}$

## Experiment (→ 07)
$f = a^nb^m$: $\frac{\Delta f}{f} = \sqrt{(n\frac{\Delta a}a)^2+(m\frac{\Delta b}b)^2}$ · mean error $\sigma/\sqrt N$ · linearize: $T^2$ vs $L$, $\ln y$ vs $x$ (exponential), $\ln y$ vs $\ln x$ (power law)
