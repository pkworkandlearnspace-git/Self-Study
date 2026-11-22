# 01 · Math for Deep Learning
> **Goal:** the math DL actually uses and nothing more. · **Time:** 15–25 h · **Needs:** high-school calculus

You're strong at math, so this module skips the basics. It covers three things school usually doesn't: **linear algebra as geometry**, **matrix calculus**, and **probability/information theory for ML**.

## Skip test
- [ ] Explain matrix multiplication as a composition of linear maps, and what eigenvectors/SVD mean geometrically.
- [ ] For $f(\mathbf{x}) = \mathbf{x}^\top A \mathbf{x}$, give $\nabla f$. For $L = \|X\mathbf{w}-\mathbf{y}\|^2$, give $\nabla_{\mathbf w} L$ and solve $\nabla L = 0$.
- [ ] Explain the chain rule for a composition $f(g(h(x)))$ with vectors, using Jacobians.
- [ ] Derive the MLE of a Gaussian's mean. Explain why minimizing MSE = maximizing Gaussian likelihood.
- [ ] Define entropy, cross-entropy, and KL divergence, and say why $D_{KL} \ge 0$.
- [ ] Explain why gradient descent with too large a step size diverges on $f(x)=\tfrac{a}{2}x^2$, and give the exact threshold.
- [ ] Say why a rotation matrix has singular values $1, 1$ but no real eigenvectors, and why $\mathrm{softmax}(\mathbf z - \max_j z_j)$ is used in code.

## Core ideas

### Linear algebra (geometry first)
- **Vectors** are data points. **Matrices** are linear maps, and $AB$ means "apply $B$, then $A$".
- **Dot product** $\mathbf a\cdot\mathbf b = \|\mathbf a\|\|\mathbf b\|\cos\theta$ measures similarity. It's the core of attention.
- **Rank** = dimension of the column space (the *image* of the map) = number of nonzero singular values. A rank-deficient matrix squashes some direction to zero, so it can't be inverted. **Low-rank** ideas drive LoRA and compression.
- **Eigenvectors** satisfy $A\mathbf v = \lambda\mathbf v$: directions the map only stretches. For symmetric $A$ they are orthogonal and $A = Q\Lambda Q^\top$ (spectral theorem). A rotation has no real eigenvectors; a shear has only one eigen-direction.
- **SVD** $A = U\Sigma V^\top$ (*any* $A$, even non-square): rotate/reflect → scale by $\sigma_i \ge 0$ → rotate/reflect. The unit circle maps to an ellipse with semi-axes $\sigma_i$. This underlies PCA, low-rank approximation (Eckart–Young: the best rank-$k$ approximation keeps the top $k$ singular values), and conditioning $\kappa = \sigma_{\max}/\sigma_{\min}$. Also $|\det A| = \prod\sigma_i$.
- 🎛️ **See it:** [Matrix as a Map](interactive/linear-maps.html): drag a matrix's columns and watch det, rank, eigenvectors, and the SVD steps.
- **Norms:** $\|\cdot\|_2$ (weight decay), $\|\cdot\|_1$ (sparsity), Frobenius norm for matrices.
- **Shapes are everything.** In DL, data is a batch matrix $X \in \mathbb{R}^{N\times d}$ (rows = examples).

### Calculus → matrix calculus
- **Gradient** $\nabla f$ points uphill. It is the steepest-ascent direction, perpendicular to level sets.
- **Jacobian** $J_{ij} = \partial y_i / \partial x_j$. **Chain rule:** $J_{f\circ g} = J_f \, J_g$. **Backprop = the chain rule applied right-to-left** (vector-Jacobian products).
- **Identities worth memorizing:**
  - $\nabla_{\mathbf x}(\mathbf a^\top\mathbf x) = \mathbf a$
  - $\nabla_{\mathbf x}(\mathbf x^\top A\mathbf x) = (A+A^\top)\mathbf x$
  - $\nabla_{\mathbf w}\|X\mathbf w-\mathbf y\|^2 = 2X^\top(X\mathbf w-\mathbf y)$
- **Shape trick:** the gradient of a scalar w.r.t. a matrix has the *same shape as that matrix*. Use this to check every derivation.
- **Hessian** $H = \nabla^2 f$ gives curvature. A twice-differentiable $f$ is convex iff $H \succeq 0$ everywhere. For a convex quadratic, the condition number $\lambda_{\max}/\lambda_{\min}$ of $H$ sets how hard optimization is.
- **Taylor:** $f(\mathbf x+\boldsymbol\delta) \approx f + \nabla f^\top\boldsymbol\delta + \tfrac12\boldsymbol\delta^\top H\boldsymbol\delta$. This is where every optimizer comes from.

### Optimization
- **Gradient descent:** $\theta \leftarrow \theta - \eta\nabla L$. On a quadratic it's stable only if $\eta < 2/\lambda_{\max}(H)$ (worked example below). 🎛️ Try it in the [Optimizer Landscape](interactive/gradient-descent.html).
- 🔭 **Physics:** GD is an overdamped particle in potential $L$. **Momentum** is a heavy ball with friction. **SGD noise** acts like temperature.
- **Stochastic GD:** gradients estimated on mini-batches: an unbiased but noisy estimate, far cheaper per step. The noise is widely believed to help generalization (it favors flatter minima), though this is still an active research question.
- **Lagrange multipliers** show up in constrained derivations (e.g. max-entropy → softmax, SVMs).

### Probability & statistics
- **Random variables, expectation, variance.** Linearity: $\mathbb E[aX+bY]=a\mathbb E X+b\mathbb E Y$.
- **Bayes:** $p(\theta\mid D) \propto p(D\mid\theta)\,p(\theta)$, i.e. posterior ∝ likelihood × prior.
- **Key distributions:** Bernoulli/Categorical (classification), Gaussian (regression, noise, VAEs, diffusion).
- **Maximum likelihood (MLE):** $\theta^* = \arg\max \sum_i \log p(x_i\mid\theta)$. Almost every DL loss is a negative log-likelihood:
  - Gaussian likelihood → **MSE**. Bernoulli/Categorical → **cross-entropy**.
- **MAP** = MLE + prior. A Gaussian prior is exactly **L2 weight decay**.
- **Monte Carlo:** $\mathbb E_p[f] \approx \frac1N\sum f(x_i)$. Also the **reparameterization trick** $x=\mu+\sigma\epsilon$ (VAEs, diffusion).

### Information theory
- **Entropy** $H(p) = -\sum p\log p$: average surprise. 🔭 Same form as Gibbs entropy.
- **Cross-entropy** $H(p,q) = -\sum p\log q$: the classification loss.
- **KL divergence** $D_{KL}(p\|q)=\sum p\log\frac{p}{q} = H(p,q)-H(p) \ge 0$ (Jensen). It's asymmetric.
- **Softmax** $\sigma(\mathbf z)_i = e^{z_i}/\sum_j e^{z_j}$. 🔭 This is the Boltzmann distribution with energy $-z_i$ and temperature 1. The "temperature" in LLM sampling is literally $T$.

## Worked examples

**1 · Gradient of least squares, with shapes.** $L(\mathbf w)=\|X\mathbf w-\mathbf y\|^2$ with $X\in\mathbb R^{N\times d}$. Let $\mathbf r = X\mathbf w-\mathbf y$ ($N\times1$). Then $L=\mathbf r^\top\mathbf r$, $dL = 2\mathbf r^\top d\mathbf r = 2\mathbf r^\top X\,d\mathbf w$, so $\nabla_{\mathbf w}L = 2X^\top\mathbf r$ ($d\times1$ ✓ same shape as $\mathbf w$). Setting it to 0 gives the **normal equations** $X^\top X\mathbf w = X^\top\mathbf y$.
*Numbers:* points $(0,1),(1,2),(2,2)$ with a bias column: $X$ has rows $(1,0),(1,1),(1,2)$ and $\mathbf y=(1,2,2)^\top$. Then $X^\top X$ has rows $(3,3),(3,5)$ and $X^\top\mathbf y=(5,6)^\top$, so $\mathbf w=(7/6,\ 1/2)$: the line $\hat y = 1.167 + 0.5x$.

**2 · Why $\eta < 2/\lambda_{\max}$.** On $f(x)=\tfrac a2x^2$, GD gives $x_{t+1}=x_t-\eta a x_t=(1-\eta a)x_t$. This shrinks iff $|1-\eta a|<1 \iff 0<\eta<2/a$. For $\eta a\in(1,2)$ it converges while **oscillating** (sign flips), and for $\eta a>2$ it blows up. A quadratic in $d$ dimensions decouples along the eigenvectors of $H$, so the steepest direction ($\lambda_{\max}$) limits $\eta$, and the flattest ($\lambda_{\min}$) then converges at rate $1-\eta\lambda_{\min} \approx 1-2/\kappa$. That's why ill-conditioning is slow.

**3 · MSE is Gaussian MLE.** Model $y_i = f_\theta(x_i)+\varepsilon_i$, $\varepsilon_i\sim\mathcal N(0,\sigma^2)$. Then
$-\log p(\mathbf y\mid X,\theta) = \sum_i \frac{(y_i-f_\theta(x_i))^2}{2\sigma^2} + \frac N2\log(2\pi\sigma^2)$.
The second term doesn't depend on $\theta$, so maximizing likelihood = minimizing $\sum_i (y_i-f_\theta(x_i))^2$. Special case $f_\theta=\mu$: $\frac{d}{d\mu}=0$ gives $\hat\mu=\bar y$, the sample mean.

**4 · $D_{KL}\ge 0$ (Gibbs' inequality).** $-D_{KL}(p\|q)=\sum_x p(x)\log\frac{q(x)}{p(x)} \le \log\sum_x p(x)\frac{q(x)}{p(x)} = \log\sum_x q(x) \le \log 1 = 0$, by Jensen ($\log$ is concave). Equality iff $p=q$.

## Practice (answers hidden)

1. Give $\nabla_{\mathbf w}$ of the ridge loss $\|X\mathbf w-\mathbf y\|^2+\lambda\|\mathbf w\|^2$ and its minimizer.
<details><summary>Answer</summary>

$2X^\top(X\mathbf w-\mathbf y)+2\lambda\mathbf w = 0 \Rightarrow \mathbf w^*=(X^\top X+\lambda I)^{-1}X^\top\mathbf y$. The $+\lambda I$ makes the matrix invertible even when $X^\top X$ is singular, and improves its condition number.
</details>

2. GD on $f(x,y)=x^2+10y^2$. What is the largest stable $\eta$? Roughly how many steps does the $x$-coordinate need to shrink by $e^{-1}$ at $\eta=0.09$?
<details><summary>Answer</summary>

$H=\mathrm{diag}(2,20)$, so $\eta<2/20=0.1$. Along $x$: factor $1-0.09\cdot2=0.82$ per step, and $0.82^t=e^{-1}$ at $t=1/(-\ln 0.82)\approx5$ steps. Along $y$: factor $1-1.8=-0.8$, which oscillates but converges.
</details>

3. Compute $D_{KL}(p\|q)$ and $D_{KL}(q\|p)$ for $p=\text{Bernoulli}(0.5)$, $q=\text{Bernoulli}(0.9)$ (natural log).
<details><summary>Answer</summary>

$D_{KL}(p\|q)=0.5\ln\frac{0.5}{0.9}+0.5\ln\frac{0.5}{0.1}\approx 0.511$ nats. $D_{KL}(q\|p)=0.9\ln\frac{0.9}{0.5}+0.1\ln\frac{0.1}{0.5}\approx 0.368$ nats. Different, so KL is **not** symmetric (and not a distance).
</details>

4. Show that $\mathrm{softmax}(\mathbf z+c\mathbf 1)=\mathrm{softmax}(\mathbf z)$. Why does every library compute softmax as $e^{z_i-\max_j z_j}/\sum_j e^{z_j-\max_j z_j}$?
<details><summary>Answer</summary>

$e^{z_i+c}/\sum_j e^{z_j+c} = e^c e^{z_i}/(e^c\sum_j e^{z_j})$. Subtracting the max makes every exponent $\le 0$, so nothing overflows (e.g. $e^{1000}$ = inf in float32), and the result is unchanged.
</details>

5. MAP with prior $\mathbf w\sim\mathcal N(0,\tau^2 I)$ and Gaussian noise $\sigma^2$: which loss do you minimize?
<details><summary>Answer</summary>

$-\log p(\mathbf w\mid D) = \frac1{2\sigma^2}\|X\mathbf w-\mathbf y\|^2 + \frac1{2\tau^2}\|\mathbf w\|^2 + \text{const}$: ridge regression with $\lambda=\sigma^2/\tau^2$. A tighter prior (small $\tau$) means stronger weight decay.
</details>

6. A matrix has singular values 10 and 0.01. What is its condition number, and what does it do to the unit circle?
<details><summary>Answer</summary>

$\kappa=1000$. The circle becomes a very thin ellipse (semi-axes 10 and 0.01). Solving $A\mathbf x=\mathbf b$ can amplify relative errors in $\mathbf b$ by up to 1000×, and GD on $\|A\mathbf x-\mathbf b\|^2$ (Hessian condition number $\kappa^2=10^6$) crawls.
</details>

## Learn from
- ⭐ **[Mathematics for Machine Learning](https://mml-book.github.io/)**, Deisenroth, Faisal & Ong (free PDF). Read ch. 2–7 *selectively*. Skim what you know.
- ⭐ **[The Matrix Calculus You Need for Deep Learning](https://explained.ai/matrix-calculus/)**, Parr & Howard. A short article that's essential.
- **[3Blue1Brown: Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra)**: watch it once for geometric intuition (~3 h).
- Optional depth: [MIT 18.06 (Strang)](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/), [Harvard Stat 110 (Blitzstein)](https://projects.iq.harvard.edu/stat110), [MIT 18.S096 Matrix Calculus for ML](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/).

## Build
1. Derive $\nabla_{\mathbf w}$ for linear regression by hand. Then check it numerically with **finite differences** $\frac{f(w+h)-f(w-h)}{2h}$ in NumPy.
2. Write PCA with `np.linalg.svd` on a toy 2D dataset and plot the principal axes.
3. Simulate GD on $f(x,y)=x^2+10y^2$ with different $\eta$. Watch the oscillation and divergence, and relate it to the condition number.

## Traps
- Memorizing formulas without checking shapes → derive with shapes, then verify numerically.
- Confusing eigenvectors with singular vectors. They coincide only for symmetric positive semi-definite matrices.
- Treating KL as a distance. It's asymmetric, and $D_{KL}(p\|q)=\infty$ whenever $q=0$ somewhere $p>0$.
- Computing $\log(\mathrm{softmax})$ in two steps. Use a fused log-softmax / log-sum-exp for stability.
- Over-studying math up front. Learn the rest **just in time** when a later module needs it.

## Done when
- [ ] Every skip-test item is answerable · [ ] gradient check passes to ~1e-6 relative error
