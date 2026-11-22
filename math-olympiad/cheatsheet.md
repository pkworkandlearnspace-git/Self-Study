# Math Olympiad Cheatsheet
One page to recap. If a line feels unfamiliar, open the module (→ NN).

## Strategies (→ 01)
Small cases · draw it · work backwards · strengthen the induction · extremal element · invariant/monovariant · coloring/parity · pigeonhole · contradiction/descent · **find the equality case / answer first**

## Algebra (→ 02)
| Tool | Statement |
|---|---|
| AM-GM | $\frac{\sum x_i}{n}\ge\sqrt[n]{\prod x_i}$, equality iff all are equal |
| Cauchy–Schwarz | $(\sum a_i^2)(\sum b_i^2)\ge(\sum a_ib_i)^2$ |
| Titu | $\sum\frac{a_i^2}{b_i}\ge\frac{(\sum a_i)^2}{\sum b_i}$ |
| Schur ($a,b,c\ge0$, $t>0$) | $\sum a^t(a-b)(a-c)\ge0$ |
| Jensen | convex $f$: $f(\text{mean})\le\text{mean of }f$ |
| Power means | $M_p$ increasing in $p$: $\max\ge$ QM $\ge$ AM $\ge$ GM $\ge$ HM $\ge\min$ |
| Tangent trick | $\sum x_i$ fixed: prove $f(x)\ge f(m)+f'(m)(x-m)$, factor $(x-m)^2$, sum |
| Newton (3 vars) | $p_2=e_1^2-2e_2$, $p_3=e_1p_2-e_2p_1+3e_3$ |
| Vieta (cubic) | $r+s+t=-\frac ba$, $rs+st+tr=\frac ca$, $rst=-\frac da$ |
| Integer poly | $a-b\mid P(a)-P(b)$ |
| FE plays | $x=y=0$; $y=0$; $y=x$; $y=-x$; swap; injective/surjective; fixed points; **verify the answer** |

## Number theory (→ 03)
| Tool | Statement |
|---|---|
| Bézout | $\exists x,y: ax+by=\gcd(a,b)$ |
| Fermat / Euler | $a^{p-1}\equiv1\ (p)$ · $a^{\varphi(n)}\equiv1\ (n)$ for $\gcd(a,n)=1$ |
| Wilson | $(p-1)!\equiv-1\pmod p$ |
| Order lemma | $a^k\equiv1\iff\text{ord}(a)\mid k$; $\text{ord}_p(a)\mid p-1$ |
| gcd of powers | $\gcd(a^m-1,a^n-1)=a^{\gcd(m,n)}-1$ |
| LTE (odd $p$) | $p\mid a-b$, $p\nmid ab$: $v_p(a^n-b^n)=v_p(a-b)+v_p(n)$ |
| Legendre | $v_p(n!)=\sum\lfloor n/p^k\rfloor$ |
| QR | $-1$ is a QR mod odd $p$ ⟺ $p\equiv1\ (4)$; Euler's criterion $\left(\frac ap\right)\equiv a^{(p-1)/2}$ |
| Squares mod | mod 4: {0,1} · mod 8: {0,1,4} · mod 3: {0,1} · mod 9 (cubes): {0,1,8} |

## Combinatorics (→ 04)
- Stars & bars: $\binom{n+k-1}{k-1}$ · Derangements $D_n=n!\sum_{i=0}^n\frac{(-1)^i}{i!}$ · Catalan $\frac{1}{n+1}\binom{2n}n$
- Handshake: $\sum\deg=2|E|$ · Tree: $|E|=|V|-1$ · Bipartite ⟺ no odd cycle · Hall: $|N(S)|\ge|S|\ \forall S$
- Max/min problems = **bound + construction**. Expected value < 1 ⇒ a good object exists.

## Geometry (→ 05)
- Inscribed angle = ½ arc · cyclic ⟺ opposite angles sum to 180° ⟺ equal angles on the same chord
- Power of a point: $PA\cdot PB=PC\cdot PD=|PO^2-r^2|$ · radical axes of 3 circles concur
- Euler line: $O,G,H$ collinear, $OG:GH=1:2$ · nine-point circle center = midpoint of $OH$, radius $R/2$
- Reflections of $H$ over the sides and side midpoints lie on the circumcircle · $AH=2R\cos A$
- Incenter–excenter: $M_A$ (arc midpoint of $BC$) is the center of the circle through $B,C,I,I_A$
- Ceva: $\frac{BD}{DC}\frac{CE}{EA}\frac{AF}{FB}=1$ · Menelaus: same product $=-1$ (signed) · Ptolemy: $AC\cdot BD=AB\cdot CD+AD\cdot BC$ for cyclic $ABCD$
- Law of sines: $\frac{a}{\sin A}=2R$ · Area $=rs=\frac{abc}{4R}=\sqrt{s(s-a)(s-b)(s-c)}$
