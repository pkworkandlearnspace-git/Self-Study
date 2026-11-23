# 05 · Geometry
> **Goal:** from angle chasing to projective tools, plus reliable computational backups. · **Time:** 5–7 weeks (in rotation)

> [!GOAL]
> By the end of this chapter you can:
>
> - angle-chase with inscribed angles and **cyclic quadrilaterals**, safely, using directed angles;
> - use the triangle centres and the classic lemmas: **Euler line, nine-point circle, reflections of $H$, the incenter–excenter lemma**;
> - compute lengths with the laws of sines/cosines, **Ceva, Menelaus, Stewart, Ptolemy**;
> - use **power of a point** and **radical axes**;
> - recognise when homothety, spiral similarity, inversion or projective tools help;
> - fall back on a **complex-number bash** when synthetic ideas run out.

## Skip test
- [ ] Prove the four points of a cyclic quadrilateral satisfy "opposite angles sum to 180°", and the converse.
- [ ] State and use the **power of a point** and the **radical axis** theorem.
- [ ] Prove the orthocenter's reflection over a side lies on the circumcircle.
- [ ] Prove the **incenter–excenter lemma**: $I$, $B$, $C$, $I_A$ all lie on a circle centered at the arc midpoint $M_A$.
- [ ] Explain the Euler line and the nine-point circle (center, radius $R/2$).
- [ ] Set up a problem in complex numbers with the unit circle as the circumcircle.

> [!TRY] [Triangle centers explorer](interactive/triangle-centers.html)
> Keep it open while you read: drag the triangle and watch every theorem below hold in every shape.

## 1 · Angle chasing and cyclic quadrilaterals

> [!FORMULA] Inscribed angle theorem
> An angle inscribed in a circle is **half the central angle** on the same arc: if $A,B,C$ lie on a circle with centre $O$, then $\angle ACB=\tfrac12\angle AOB$. Consequences: all inscribed angles on the same arc (same side) are equal; an angle inscribed in a semicircle is $90°$.

> [!FORMULA] Cyclic quadrilateral criteria
> For a convex quadrilateral $ABCD$, the following are equivalent:
>
> 1. $A,B,C,D$ lie on a circle;
> 2. opposite angles are supplementary: $\angle A+\angle C=180°$;
> 3. $\angle ABD=\angle ACD$ (a side "sees" the opposite side under equal angles);
> 4. (power of a point, section 4) if lines $AB$ and $CD$ meet at $P$: $PA\cdot PB=PC\cdot PD$.
>
> The **converses** are what you use most: find equal angles, conclude the points are concyclic, then use the circle.

> [!FORMULA] Tangent–chord angle
> The angle between a tangent at $A$ and a chord $AB$ equals the inscribed angle on the other side of $AB$: $\angle(\text{tangent},AB)=\angle ACB$.

> [!DEF] Directed angles
> $\measuredangle(\ell,m)$ is the angle to rotate line $\ell$ counterclockwise onto $m$, taken **mod $180°$**. With directed angles, "$A,B,C,D$ concyclic iff $\measuredangle ABC=\measuredangle ADC$" holds in **every** configuration, so a proof doesn't depend on how your figure happens to look.

> [!WARN] Configuration issues
> A proof read off one drawing may fail for another (a point inside vs outside a circle, an obtuse vs acute triangle). Use directed angles, or check each case separately.

## 2 · Triangle centres and the classic lemmas

> [!DEF] The four classical centres
> - **Centroid $G$:** where the medians meet; it divides each median $2:1$ from the vertex.
> - **Circumcentre $O$:** where the perpendicular bisectors meet; centre of the circumcircle (radius $R$).
> - **Incentre $I$:** where the angle bisectors meet; centre of the incircle (radius $r$). **Excentre $I_A$:** where the external bisectors at $B,C$ and the internal bisector at $A$ meet.
> - **Orthocentre $H$:** where the altitudes meet.

> [!FORMULA] Euler line and nine-point circle
> Put the origin at $O$. Then (as vectors) $G=\frac{A+B+C}3$ and $H=A+B+C$. So **$O,G,H$ are collinear with $OG:GH=1:2$**.
> The **nine-point circle** passes through the three side midpoints, the three feet of the altitudes and the midpoints of $AH,BH,CH$. Its centre $N$ is the midpoint of $OH$ and its radius is $R/2$.

> [!EXAMPLE] The reflection of $H$ over $BC$ lies on the circumcircle
> (Acute triangle; directed angles make it general.) Let $E,F$ be the feet of the altitudes from $B,C$. Quadrilateral $AEHF$ has right angles at $E$ and $F$, so it is cyclic and $\angle BHC=\angle EHF=180°-\angle A$. Reflecting $H$ over $BC$ to $H'$ preserves the angle: $\angle BH'C=180°-\angle A$, and $H'$ lies on the opposite side of $BC$ from $A$. So $\angle BH'C+\angle BAC=180°$, and $ABH'C$ is cyclic. ∎ (The reflection over the **midpoint** of $BC$ is also on the circumcircle: it is the point diametrically opposite $A$.)

> [!EXAMPLE] Incenter–excenter lemma
> Let the bisector of $\angle A$ meet the circumcircle again at $M$ (the midpoint of arc $BC$ not containing $A$). Then $MB=MC=MI=MI_A$.
>
> $MB=MC$ since $M$ bisects the arc. Write $\angle A=2\alpha$, $\angle B=2\beta$. Then $\angle MBI=\angle MBC+\angle CBI=\alpha+\beta$ (as $\angle MBC=\angle MAC=\alpha$), and $\angle MIB=\angle IAB+\angle IBA=\alpha+\beta$ (exterior angle of triangle $ABI$). So triangle $MBI$ is isosceles: $MB=MI$. Finally the internal and external bisectors at $B$ are perpendicular, so $\angle IBI_A=90°$; $I_A$ lies on line $AI$, and $M$ (on $II_A$, with $MB=MI$) must be the midpoint of the hypotenuse $II_A$. ∎ This lemma appears in a huge number of olympiad problems.

> [!FORMULA] Area, $R$ and $r$
> With sides $a,b,c$, semiperimeter $s$ and area $K$:
> $$K=\tfrac12ab\sin C=rs=\frac{abc}{4R}=\sqrt{s(s-a)(s-b)(s-c)}\ \ \text{(Heron)}$$
> **Euler's theorem:** $OI^2=R^2-2Rr$, so $R\ge2r$.

> [!EXAMPLE] The 13-14-15 triangle
> $s=21$, $K=\sqrt{21\cdot8\cdot7\cdot6}=84$, $r=K/s=4$, $R=\frac{13\cdot14\cdot15}{4\cdot84}=\frac{65}8$. Then $OI^2=R(R-2r)=\frac{65}8\cdot\frac18=\frac{65}{64}$.

## 3 · Lengths: sines, cosines, Ceva, Menelaus, Stewart, Ptolemy

> [!FORMULA] Laws of sines and cosines
> $$\frac{a}{\sin A}=\frac b{\sin B}=\frac c{\sin C}=2R,\qquad c^2=a^2+b^2-2ab\cos C$$

> [!FORMULA] Ceva's theorem
> Cevians $AD,BE,CF$ (with $D\in BC$, $E\in CA$, $F\in AB$) are concurrent iff
> $$\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF}{FB}=1$$
> **Trig Ceva:** concurrent iff $\frac{\sin\angle BAD}{\sin\angle DAC}\cdot\frac{\sin\angle CBE}{\sin\angle EBA}\cdot\frac{\sin\angle ACF}{\sin\angle FCB}=1$.

> [!FORMULA] Menelaus' theorem
> Points $D,E,F$ on lines $BC,CA,AB$ are collinear iff $\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF}{FB}=-1$ with **signed** lengths (an odd number of the points, 1 or 3, lie outside the sides).

> [!FORMULA] Stewart's theorem
> For a cevian $AD=d$ with $BD=m$, $DC=n$, $BC=a=m+n$:
> $$b^2m+c^2n=a(d^2+mn)$$
> *Special case (median):* $d^2=\frac{2b^2+2c^2-a^2}{4}$.

> [!FORMULA] Ptolemy's theorem
> For a cyclic quadrilateral $ABCD$: $AC\cdot BD=AB\cdot CD+AD\cdot BC$. (For any quadrilateral "$\le$" holds, with equality iff cyclic.)

## 4 · Power of a point and radical axes

> [!FORMULA] Power of a point
> For a circle with centre $O$, radius $r$, and a point $P$: $\operatorname{pow}(P)=OP^2-r^2$. For **any** line through $P$ meeting the circle at $A,B$:
> $$PA\cdot PB=|\operatorname{pow}(P)|$$
> (and $=PT^2$ for a tangent $PT$ when $P$ is outside). The power is positive outside, zero on, negative inside the circle.

> [!DEF] Radical axis and radical centre
> The **radical axis** of two non-concentric circles is the set of points with equal power with respect to both: a straight line perpendicular to the line of centres. If the circles intersect, it is the line through the two intersection points. For three circles (centres not collinear), the three radical axes meet at one point, the **radical centre**.

> [!EXAMPLE] The common chord bisects the common tangent
> Two circles meet at $P,Q$; a common tangent touches them at $T_1,T_2$. Let line $PQ$ meet $T_1T_2$ at $M$. $M$ is on the radical axis, so $MT_1^2=\operatorname{pow}_1(M)=\operatorname{pow}_2(M)=MT_2^2$. Hence $M$ is the midpoint of $T_1T_2$. ∎

## 5 · Transformations

> [!DEF] Homothety
> A homothety with centre $X$ and ratio $k$ maps each point $P$ to $P'$ on line $XP$ with $\vec{XP'}=k\,\vec{XP}$. It maps lines to parallel lines and circles to circles. Two circles of different radii are related by two homotheties (external and internal centres). *Example:* the homothety at $A$ taking the incircle to the $A$-excircle explains many tangency facts.

> [!DEF] Spiral similarity
> A rotation combined with a scaling about a centre. **Key lemma:** if lines $AC$ and $BD$ meet at $X$, then the centre of the spiral similarity sending segment $AB$ to segment $CD$ ($A\mapsto C$, $B\mapsto D$) is the second intersection of the circles $(ABX)$ and $(CDX)$. Spiral similarities come in pairs: the same point is also the centre of the one sending $A\mapsto B$, $C\mapsto D$. This is the **Miquel point** idea.

> [!DEF] Inversion
> Inversion in a circle with centre $O$ and radius $\rho$ sends $P$ to $P'$ on ray $OP$ with $OP\cdot OP'=\rho^2$. It maps lines through $O$ to themselves, circles through $O$ to lines not through $O$ (and back), and other circles to circles; it preserves angles between curves. Distances: $A'B'=\frac{\rho^2\,AB}{OA\cdot OB}$. Great for problems with many circles through one point or tangencies.

> [!DEF] Projective tools (IMO level)
> **Cross-ratio** $(A,B;C,D)=\frac{CA}{CB}\Big/\frac{DA}{DB}$ (signed) is preserved by projection; $(A,B;C,D)=-1$ is a **harmonic** bundle. **Pascal:** for six points on a conic, the three intersections of opposite sides of the hexagon are collinear. **Poles and polars**, **Desargues**, **Brianchon** complete the kit. Learn these after the basics are solid.

## 6 · Computational backups ("bashing")

> [!KEY] Have one reliable bash
> When synthetic ideas run out, coordinates always work, given time. Learn **one** method well: Cartesian, **complex numbers** or **barycentric coordinates**.

> [!FORMULA] Complex numbers on the unit circle
> Put the circumcircle as the unit circle, so $|a|=|b|=|c|=1$ and $\bar a=1/a$.
> - Orthocentre: $h=a+b+c$ (circumcentre $0$).
> - A point $z$ lies on chord $ab$ iff $z+ab\,\bar z=a+b$.
> - Foot of the altitude from $a$ to $bc$: $\frac12\big(a+b+c-\frac{bc}a\big)$.
> - $z_1,z_2,z_3$ collinear iff $\frac{z_1-z_3}{z_2-z_3}$ is real; $AB\perp CD$ iff $\frac{a-b}{c-d}$ is purely imaginary.

> [!WARN] Bash is plan B
> Bashing is reliable on medium problems but can become an unmanageable algebra marathon on hard ones. Spend the first part of your time looking for a synthetic idea; switch to a bash with a clear plan and enough time left.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Geometry** deck to drill the lemmas and formulas.

## Practice (answers hidden)

1. In triangle $ABC$, $\angle A=60°$. Find $\angle BHC$ and $\angle BIC$ ($H$ orthocentre, $I$ incentre).
<details><summary>Answer</summary>

$\angle BHC=180°-60°=120°$ and $\angle BIC=90°+\frac{60°}2=120°$. (So $B,C,H,I$ are concyclic when $\angle A=60°$.)
</details>

2. A point $P$ is 13 units from the centre of a circle of radius 5. Find the length of the tangent from $P$, and $PA\cdot PB$ for any secant $PAB$.
<details><summary>Answer</summary>

Power $=13^2-5^2=144$, so the tangent is $12$ and $PA\cdot PB=144$.
</details>

3. Find the length of the median to the side of length 14 in the 13-14-15 triangle (sides 13 and 15 next to it).
<details><summary>Answer</summary>

$d^2=\frac{2\cdot13^2+2\cdot15^2-14^2}{4}=\frac{338+450-196}{4}=148$, so $d=2\sqrt{37}\approx12.17$.
</details>

4. Prove that the midpoints of the sides of any quadrilateral form a parallelogram.
<details><summary>Answer</summary>

In quadrilateral $ABCD$ with midpoints $P,Q,R,S$ of $AB,BC,CD,DA$: $PQ$ and $SR$ are both midlines parallel to $AC$ with length $\frac12AC$ (in triangles $ABC$ and $ADC$). One pair of opposite sides is parallel and equal, so $PQRS$ is a parallelogram.
</details>

5. With the circumcircle as the unit circle, show that the circumcentre, centroid and orthocentre are collinear.
<details><summary>Answer</summary>

$o=0$, $g=\frac{a+b+c}3$, $h=a+b+c=3g$. So $h$ is a real multiple of $g$ and all three lie on a line through $0$, with $OG:GH=1:2$.
</details>

6. A cyclic quadrilateral has sides $AB=3$, $BC=4$, $CD=5$, $DA=6$ (in order). Using Ptolemy, what is the product of its diagonals $AC\cdot BD$?
<details><summary>Answer</summary>

$AC\cdot BD=AB\cdot CD+AD\cdot BC=3\cdot5+6\cdot4=39$.
</details>

## Build
- For every geometry problem: (1) draw an accurate figure, (2) **guess** the key concurrency/collinearity from the figure, (3) prove it synthetically, (4) as a backup, prove it with complex/barycentric bash.
- Solve G1–G4 from recent IMO Shortlists.

## Traps
- Proofs that only work for one configuration. Use directed angles.
- Over-relying on bash. It's a time sink on hard problems, so keep it as plan B.

## Go deeper (all optional)
- ⭐ **Euclidean Geometry in Mathematical Olympiads (EGMO), Evan Chen** 💲. *The* olympiad geometry book. Part I (ch. 1–4) is essential, Part II for IMO-level. Some chapters are free on [his website](https://web.evanchen.cc/).
- **[Yufei Zhao: Lemmas in Euclidean geometry, Cyclic quadrilaterals handouts](https://yufeizhao.com/olympiad/)**.
- **Lemmas in Olympiad Geometry**, Andreescu, Korsky & Pohoata 💲 · **Geometry Revisited**, Coxeter & Greitzer 💲 (classic).
- **[GeoGebra](https://www.geogebra.org/geometry)**: draw every problem precisely. It's free.

## Done when
- [ ] Every skip-test item proved on paper · [ ] 20 shortlist G-problems attempted, with both a synthetic and a bash attempt for 5 of them
