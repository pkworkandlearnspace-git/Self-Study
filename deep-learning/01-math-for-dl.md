# 01 · Math for Deep Learning
> **Goal:** the math DL actually uses and nothing more. · **Time:** 15–25 h · **Needs:** high-school calculus

You're strong at math, so this module skips the basics. It covers three things school usually doesn't: **linear algebra as geometry**, **matrix calculus**, and **probability/information theory for ML**.

## Skip test
- [ ] Explain matrix multiplication as a composition of linear maps, and what eigenvectors/SVD mean geometrically.
- [ ] For $f(\mathbf{x}) = \mathbf{x}^\top A \mathbf{x}$, give $\nabla f$. For $L = \|X\mathbf{w}-\mathbf{y}\|^2$, give $\nabla_{\mathbf w} L$ and solve $\nabla L = 0$.
- [ ] Explain the chain rule for a composition $f(g(h(x)))$ with vectors, using Jacobians.
- [ ] Derive the MLE of a Gaussian's mean. Explain why minimizing MSE = maximizing Gaussian likelihood.
- [ ] Define entropy, cross-entropy, and KL divergence, and say why $D_{KL} \ge 0$.
- [ ] Explain why gradient descent with too large a step size diverges on $f(x)=\tfrac{a}{2}x^2$.

## Core ideas

### Linear algebra (geometry first)
- **Vectors** are data points. **Matrices** are linear maps, and $AB$ means "apply $B$, then $A$".
- **Dot product** $\mathbf a\cdot\mathbf b = \|\mathbf a\|\|\mathbf b\|\cos\theta$ measures similarity. It's the core of attention.
- **Rank** = dimension of the output space. **Low-rank** ideas drive LoRA and compression.
- **Eigen-decomposition** $A = Q\Lambda Q^\top$ (symmetric $A$): the axes the map only stretches.
- **SVD** $A = U\Sigma V^\top$ (any $A$): rotate → scale → rotate. This underlies PCA, low-rank approximation, and conditioning.
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
- **Hessian** $H = \nabla^2 f$ gives curvature. Convex means $H \succeq 0$. The condition number $\lambda_{\max}/\lambda_{\min}$ sets how hard optimization is.
- **Taylor:** $f(\mathbf x+\boldsymbol\delta) \approx f + \nabla f^\top\boldsymbol\delta + \tfrac12\boldsymbol\delta^\top H\boldsymbol\delta$. This is where every optimizer comes from.

### Optimization
- **Gradient descent:** $\theta \leftarrow \theta - \eta\nabla L$. On a quadratic it's stable only if $\eta < 2/\lambda_{\max}$.
- 🔭 **Physics:** GD is an overdamped particle in potential $L$. **Momentum** is a heavy ball with friction. **SGD noise** acts like temperature.
- **Stochastic GD:** gradients estimated on mini-batches. Noisy but cheap, and the noise even helps generalization.
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
- Over-studying math up front. Learn the rest **just in time** when a later module needs it.

## Done when
- [ ] Every skip-test item is answerable · [ ] gradient check passes to ~1e-6 relative error
