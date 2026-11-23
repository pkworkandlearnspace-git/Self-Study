# 01 · Math for Deep Learning
> **Goal:** the math DL actually uses and nothing more. · **Time:** 15–25 h · **Needs:** high-school calculus

> [!GOAL]
> By the end of this chapter you can:
>
> - read a matrix as a **map** that moves space, and explain rank, determinant, eigenvectors and the SVD in pictures;
> - take **gradients of vector and matrix expressions** and check them with shapes;
> - explain **why gradient descent works** and exactly when it blows up;
> - explain why almost every loss in DL is a **negative log-likelihood**, and what entropy, cross-entropy and KL divergence measure.
>
> **How to use this chapter:** each section teaches one idea in the same order: explanation → 📖 definitions → 🧮 formulas → ✍️ example → 🎛️ try it → 📚 optional video/reading. Everything you need is on this page; the videos and books are there only if you want a second explanation.

## Skip test
- [ ] Explain matrix multiplication as a composition of linear maps, and what eigenvectors/SVD mean geometrically.
- [ ] For $f(\mathbf{x}) = \mathbf{x}^\top A \mathbf{x}$, give $\nabla f$. For $L = \|X\mathbf{w}-\mathbf{y}\|^2$, give $\nabla_{\mathbf w} L$ and solve $\nabla L = 0$.
- [ ] Explain the chain rule for a composition $f(g(h(x)))$ with vectors, using Jacobians.
- [ ] Derive the MLE of a Gaussian's mean. Explain why minimizing MSE = maximizing Gaussian likelihood.
- [ ] Define entropy, cross-entropy, and KL divergence, and say why $D_{KL} \ge 0$.
- [ ] Explain why gradient descent with too large a step size diverges on $f(x)=\tfrac{a}{2}x^2$, and give the exact threshold.
- [ ] Say why a rotation matrix has singular values $1, 1$ but no real eigenvectors, and why $\mathrm{softmax}(\mathbf z - \max_j z_j)$ is used in code.

🎯 Not sure? Take the auto-graded [Foundations Quiz](interactive/foundations-quiz.html) (filter by module) before deciding.

## 1 · Vectors: data as arrows

In deep learning, **everything is a vector**: an image is a long list of pixel values, a word is a list of 768 numbers (its *embedding*), and the network's parameters are one giant vector. So we need two views of a vector at once:

- **a list of numbers** $\mathbf x = (x_1, \dots, x_d)$, which is how the computer stores it, and
- **an arrow (or point) in $d$-dimensional space**, which is how you reason about it.

You can't picture 768 dimensions, but everything you see in 2D and 3D (lengths, angles, projections) works the same way in high dimensions. Draw it in 2D, then trust the algebra.

> [!DEF] Vector, dimension
> A **vector** $\mathbf x \in \mathbb R^d$ is an ordered list of $d$ real numbers. $d$ is its **dimension**. Vectors are added component by component, $(\mathbf x+\mathbf y)_i = x_i + y_i$, and scaled by a number, $(c\mathbf x)_i = c\,x_i$.

> [!DEF] Dot product
> The **dot product** of two vectors of the same dimension multiplies matching entries and adds them up:
> $$\mathbf a\cdot\mathbf b = \mathbf a^\top\mathbf b = \sum_{i=1}^{d} a_i b_i$$
> Geometrically it equals $\|\mathbf a\|\,\|\mathbf b\|\cos\theta$, where $\theta$ is the angle between the arrows. It is large and positive when they point the same way, zero when they are perpendicular (**orthogonal**), and negative when they point apart.

> [!DEF] Norms (length)
> A **norm** measures the size of a vector.
>
> - **L2 (Euclidean) norm:** $\|\mathbf x\|_2 = \sqrt{\sum_i x_i^2} = \sqrt{\mathbf x^\top\mathbf x}$, the ordinary length of the arrow.
> - **L1 norm:** $\|\mathbf x\|_1 = \sum_i |x_i|$. Penalizing it pushes entries to exactly zero (sparsity).
> - **Frobenius norm** of a matrix: $\|A\|_F = \sqrt{\sum_{ij} A_{ij}^2}$, the L2 norm of all entries.
>
> A **unit vector** has length 1. Any nonzero $\mathbf x$ becomes one after dividing by its length: $\hat{\mathbf x} = \mathbf x/\|\mathbf x\|$.

> [!FORMULA] Cosine similarity
> $$\cos\theta = \frac{\mathbf a\cdot\mathbf b}{\|\mathbf a\|\,\|\mathbf b\|} \in [-1, 1]$$
> This is how embeddings are compared ("are these two sentences about the same thing?"), and the dot product $\mathbf q\cdot\mathbf k$ is the core of **attention** in transformers (module 08).

> [!EXAMPLE] Dot product and angle
> $\mathbf a=(3,4)$, $\mathbf b=(4,3)$. Then $\mathbf a\cdot\mathbf b = 12+12 = 24$, $\|\mathbf a\|=\|\mathbf b\|=5$, so $\cos\theta = 24/25 = 0.96$ and $\theta\approx 16°$: almost the same direction. For $\mathbf c=(-4,3)$: $\mathbf a\cdot\mathbf c = -12+12 = 0$, so $\mathbf a\perp\mathbf c$.

> [!KEY] Shapes are everything
> In code, a **batch** of $N$ examples with $d$ features each is stored as a matrix $X \in \mathbb R^{N\times d}$: **one row per example**. Most bugs in DL are shape bugs, so get into the habit of writing the shape next to every symbol.

## 2 · Matrices: functions that move space

A matrix is not just a table of numbers. A matrix $A \in \mathbb R^{m\times n}$ **is a function**: it takes a vector $\mathbf x\in\mathbb R^n$ and returns $A\mathbf x\in\mathbb R^m$. These functions are special: they keep straight lines straight and keep the origin fixed. Such functions are called **linear maps**.

The single most useful fact: **the columns of $A$ tell you where the basis vectors land.** In 2D, the first column is where $\hat{\mathbf e}_1=(1,0)$ goes and the second column is where $\hat{\mathbf e}_2=(0,1)$ goes. Since every vector is a combination $x_1\hat{\mathbf e}_1 + x_2\hat{\mathbf e}_2$, its image is the same combination of the columns:

$$A\mathbf x = x_1\,\mathbf a_1 + x_2\,\mathbf a_2 \qquad(\mathbf a_j = \text{column } j)$$

> [!DEF] Linear map
> A function $f$ is **linear** if $f(\mathbf x+\mathbf y) = f(\mathbf x)+f(\mathbf y)$ and $f(c\mathbf x) = c f(\mathbf x)$. Every linear map from $\mathbb R^n$ to $\mathbb R^m$ can be written as multiplication by an $m\times n$ matrix, and vice versa.

> [!FORMULA] Matrix–vector and matrix–matrix product
> $$(A\mathbf x)_i = \sum_j A_{ij}x_j \qquad (AB)_{ij} = \sum_k A_{ik}B_{kj}$$
> Shapes: $(m\times n)(n\times p) = (m\times p)$. The inner sizes must match.
>
> **Meaning:** $AB$ is the map "apply $B$ first, then $A$" (composition, read right to left). That's why $AB \ne BA$ in general: rotating then stretching is not the same as stretching then rotating.

> [!EXAMPLE] A shear, then a scaling
> $B=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ (shear: pushes the top sideways), $A=\begin{pmatrix}2&0\\0&1\end{pmatrix}$ (stretch $x$ by 2).
> $AB=\begin{pmatrix}2&2\\0&1\end{pmatrix}$ but $BA=\begin{pmatrix}2&1\\0&1\end{pmatrix}$. Check on $\hat{\mathbf e}_2=(0,1)$: shear sends it to $(1,1)$ and the stretch then gives $(2,1)$, the second column of $AB$. ✓

> [!DEF] Transpose, identity, inverse
> - The **transpose** $A^\top$ swaps rows and columns: $(A^\top)_{ij} = A_{ji}$. Rule: $(AB)^\top = B^\top A^\top$.
> - The **identity** $I$ has 1s on the diagonal and 0 elsewhere; $I\mathbf x = \mathbf x$.
> - A square matrix $A$ is **invertible** if there is $A^{-1}$ with $A^{-1}A = AA^{-1} = I$: the map can be undone. $(AB)^{-1} = B^{-1}A^{-1}$.

> [!KEY] A neural-network layer is a matrix (plus a bend)
> A dense layer computes $\mathbf h = \phi(W\mathbf x + \mathbf b)$: a linear map $W$, a shift $\mathbf b$, then a nonlinear function $\phi$ applied to each entry. Stacking layers without $\phi$ would collapse to a single matrix ($W_2W_1$ is just another matrix), which is why the nonlinearity is essential (module 04).

> [!TRY] [Matrix as a Map](interactive/linear-maps.html)
> Drag the two column vectors and watch the grid deform. Try: a rotation, a shear, a matrix whose columns are parallel (the plane collapses to a line), and swapping the columns (orientation flips, so the determinant turns negative).

> [!VIDEO] PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab | Essence of Linear Algebra (full series) | 3Blue1Brown · ~3 h, chapters 1–4 cover this section

## 3 · Rank, determinant and solving equations

When does a matrix lose information? Look at what it does to space.

> [!DEF] Span, linear independence
> The **span** of some vectors is everything you can build from them with scaled sums. Vectors are **linearly independent** if none of them is a combination of the others, i.e. $c_1\mathbf v_1+\dots+c_k\mathbf v_k = \mathbf 0$ only when every $c_i=0$.

> [!DEF] Column space, null space, rank
> - **Column space** (image) of $A$: the span of its columns = every possible output $A\mathbf x$.
> - **Null space** (kernel): every $\mathbf x$ with $A\mathbf x = \mathbf 0$, the directions that get squashed to nothing.
> - **Rank:** the dimension of the column space = the number of linearly independent columns.
>
> An $m\times n$ matrix has **full rank** if its rank is $\min(m,n)$. Otherwise it is **rank-deficient**: some direction is crushed, and that information is gone for good.

> [!FORMULA] Rank–nullity theorem
> For $A\in\mathbb R^{m\times n}$:
> $$\operatorname{rank}(A) + \dim\operatorname{null}(A) = n$$
> Every input dimension either survives (counts toward rank) or is crushed (counts toward the null space).

> [!DEF] Determinant
> For a square matrix, $\det A$ is the factor by which $A$ scales **area** (2D) or **volume** (3D+). A negative sign means the map flips orientation (like a mirror).
> $$\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad-bc \qquad \det(AB)=\det A\,\det B$$
> $\det A = 0$ exactly when $A$ squashes space into a lower dimension, i.e. when $A$ is **not invertible**.

> [!FORMULA] 2×2 inverse
> $$\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1} = \frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$$
> In code you almost never form $A^{-1}$; you call `np.linalg.solve(A, b)` to solve $A\mathbf x=\mathbf b$, which is faster and more accurate.

> [!EXAMPLE] A rank-1 matrix
> $A=\begin{pmatrix}1&2\\2&4\end{pmatrix}$. The second column is twice the first, so the column space is the line through $(1,2)$: rank 1. $\det A = 4-4 = 0$. The null space is the line through $(2,-1)$, because $A(2,-1)^\top = (0,0)^\top$. Rank–nullity: $1 + 1 = 2$ ✓.

> [!KEY] Why DL cares about rank
> **Low-rank** structure is everywhere: **LoRA** fine-tunes a big model by learning a weight update $\Delta W = BA$ that is a product of two thin matrices (rank $r \ll d$), and compression methods replace a matrix by a low-rank approximation (section 4).

> [!LEARN]
> - 3Blue1Brown lessons: [Linear algebra topic page](https://www.3blue1brown.com/topics/linear-algebra), especially "[Inverse matrices, column space and null space](https://www.3blue1brown.com/lessons/inverse-matrices)".
> - ⭐ [Mathematics for Machine Learning](https://mml-book.github.io/), ch. 2 (free PDF).

## 4 · Eigenvectors and the SVD

Most vectors change direction when a matrix acts on them. A few special ones don't.

> [!DEF] Eigenvector, eigenvalue
> A nonzero vector $\mathbf v$ is an **eigenvector** of a square matrix $A$ if
> $$A\mathbf v = \lambda\mathbf v$$
> for some number $\lambda$, its **eigenvalue**. The map only stretches $\mathbf v$ (by $\lambda$; flipping it if $\lambda<0$) without turning it. Eigenvalues are the roots of $\det(A-\lambda I) = 0$.

> [!EXAMPLE] Eigenvalues of a 2×2 matrix
> $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$. $\det(A-\lambda I) = (2-\lambda)^2-1 = 0 \Rightarrow \lambda = 3$ or $1$.
> For $\lambda=3$: $(A-3I)\mathbf v = 0$ gives $\mathbf v = (1,1)$. For $\lambda=1$: $\mathbf v=(1,-1)$. They are perpendicular, because $A$ is symmetric (next box).
> A **rotation** by 90° has no real eigenvectors: every arrow turns. A **shear** has only one eigen-direction (the one it slides along).

> [!FORMULA] Spectral theorem (symmetric matrices)
> If $A = A^\top$, it has real eigenvalues and **orthogonal** eigenvectors, and
> $$A = Q\Lambda Q^\top$$
> where the columns of $Q$ are unit eigenvectors and $\Lambda$ is diagonal with the eigenvalues. In words: a symmetric matrix just stretches space along perpendicular axes. Covariance matrices and Hessians (section 5) are symmetric.

> [!DEF] Positive (semi-)definite
> A symmetric $A$ is **positive semi-definite** ($A\succeq 0$) if $\mathbf x^\top A\mathbf x \ge 0$ for all $\mathbf x$, equivalently all eigenvalues $\ge 0$. **Positive definite** ($A\succ0$) means strictly $>0$. Covariance matrices are always PSD.

Eigenvectors only exist for square matrices, and even then may be missing or not perpendicular. The **singular value decomposition** fixes all of that: it works for *every* matrix.

> [!FORMULA] Singular value decomposition (SVD)
> Any $A\in\mathbb R^{m\times n}$ can be written
> $$A = U\Sigma V^\top$$
> - $V$ ($n\times n$, orthogonal): a rotation/reflection of the input space,
> - $\Sigma$ ($m\times n$, diagonal): stretches by the **singular values** $\sigma_1\ge\sigma_2\ge\dots\ge0$,
> - $U$ ($m\times m$, orthogonal): a rotation/reflection of the output space.
>
> **Picture:** rotate → scale each axis → rotate. The unit circle becomes an ellipse whose semi-axes have lengths $\sigma_i$.
>
> Useful facts: rank = number of nonzero $\sigma_i$ · $|\det A| = \prod_i\sigma_i$ (square $A$) · $\|A\|_2 = \sigma_{\max}$ · $\sigma_i(A)^2$ are the eigenvalues of $A^\top A$.

> [!DEF] Condition number
> $\kappa(A) = \sigma_{\max}/\sigma_{\min}$. It measures how "stretched" the ellipse is. A large $\kappa$ (ill-conditioned) means small input errors can become large output errors, and gradient descent becomes slow (section 6).

> [!FORMULA] Best low-rank approximation (Eckart–Young)
> Keep only the top $k$ singular values: $A_k = \sum_{i=1}^{k}\sigma_i\mathbf u_i\mathbf v_i^\top$. No other rank-$k$ matrix is closer to $A$ (in Frobenius or spectral norm). The error is $\|A-A_k\|_F = \sqrt{\sum_{i>k}\sigma_i^2}$.
>
> **PCA** is exactly this, applied to centered data $X$: the top right-singular vectors $\mathbf v_i$ are the directions of greatest variance.

> [!WARN] Eigenvectors ≠ singular vectors
> They coincide only for symmetric positive semi-definite matrices. A rotation has singular values $1,1$ (it doesn't stretch anything) but no real eigenvectors (it turns everything).

> [!TRY] [Matrix as a Map](interactive/linear-maps.html)
> Turn on the eigenvector and SVD overlays. Make the matrix symmetric and watch the eigenvectors become perpendicular; make it a rotation and watch them disappear while the SVD still works.

> [!LEARN]
> - 3Blue1Brown: "[Eigenvectors and eigenvalues](https://www.3blue1brown.com/lessons/eigenvalues)" (chapter 14 of the series above).
> - ⭐ [Mathematics for Machine Learning](https://mml-book.github.io/), ch. 4 (matrix decompositions) and ch. 10 (PCA).
> - Optional depth: [MIT 18.06, Gilbert Strang](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/).

## 5 · Derivatives, gradients and Jacobians

Training a network means nudging millions of parameters to reduce a loss. To know which way to nudge, we need derivatives of a **scalar** (the loss) with respect to **vectors and matrices** (the parameters).

> [!DEF] Partial derivative and gradient
> For $f:\mathbb R^d\to\mathbb R$, the **partial derivative** $\partial f/\partial x_i$ is the ordinary derivative in $x_i$ with every other variable held fixed. The **gradient** collects them into a vector of the same shape as $\mathbf x$:
> $$\nabla f(\mathbf x) = \left(\frac{\partial f}{\partial x_1},\dots,\frac{\partial f}{\partial x_d}\right)$$
> It points in the direction of **steepest increase**, its length is the slope in that direction, and it is perpendicular to the level sets (contour lines) of $f$.

> [!DEF] Jacobian
> For a vector-valued $\mathbf f:\mathbb R^n\to\mathbb R^m$, the **Jacobian** is the $m\times n$ matrix of all partial derivatives:
> $$J_{ij} = \frac{\partial f_i}{\partial x_j}$$
> It is the best *linear* approximation of $\mathbf f$ near a point: $\mathbf f(\mathbf x+\boldsymbol\delta)\approx\mathbf f(\mathbf x)+J\boldsymbol\delta$.

> [!FORMULA] Chain rule with vectors
> For a composition $\mathbf f\circ\mathbf g$:
> $$J_{\mathbf f\circ\mathbf g}(\mathbf x) = J_{\mathbf f}(\mathbf g(\mathbf x))\;J_{\mathbf g}(\mathbf x)$$
> Jacobians multiply, just like the 1D rule $(f\circ g)' = f'(g(x))\,g'(x)$. A network is a long composition $L(f_n(\cdots f_1(\mathbf x)))$, so its gradient is a long product of Jacobians. **Backpropagation** computes this product right-to-left starting from the scalar loss, as cheap vector–Jacobian products (module 04).

> [!FORMULA] Identities worth memorizing
> | Function | Gradient w.r.t. $\mathbf x$ (or $\mathbf w$) |
> |---|---|
> | $\mathbf a^\top\mathbf x$ | $\mathbf a$ |
> | $\mathbf x^\top A\mathbf x$ | $(A+A^\top)\mathbf x$ (= $2A\mathbf x$ if $A$ symmetric) |
> | $\|\mathbf x\|^2$ | $2\mathbf x$ |
> | $\|X\mathbf w-\mathbf y\|^2$ | $2X^\top(X\mathbf w-\mathbf y)$ |
> | $\mathrm{softmax}$ then cross-entropy, w.r.t. logits $\mathbf z$ | $\hat{\mathbf y}-\mathbf y$ |

> [!KEY] The shape trick
> The gradient of a scalar with respect to a matrix $W$ has **the same shape as $W$**. If your derived gradient has a different shape, it's wrong. Use shapes to decide where transposes go: e.g. in $\nabla_{\mathbf w}\|X\mathbf w-\mathbf y\|^2$ the residual is $N\times1$ and the answer must be $d\times1$, so it has to be $X^\top(\cdot)$.

> [!EXAMPLE] Gradient of least squares, with shapes
> $L(\mathbf w)=\|X\mathbf w-\mathbf y\|^2$ with $X\in\mathbb R^{N\times d}$. Let $\mathbf r = X\mathbf w-\mathbf y$ ($N\times1$). Then $L=\mathbf r^\top\mathbf r$, $dL = 2\mathbf r^\top d\mathbf r = 2\mathbf r^\top X\,d\mathbf w$, so $\nabla_{\mathbf w}L = 2X^\top\mathbf r$ ($d\times1$ ✓ same shape as $\mathbf w$). Setting it to 0 gives the **normal equations** $X^\top X\mathbf w = X^\top\mathbf y$.
>
> *Numbers:* points $(0,1),(1,2),(2,2)$ with a bias column: $X$ has rows $(1,0),(1,1),(1,2)$ and $\mathbf y=(1,2,2)^\top$. Then $X^\top X$ has rows $(3,3),(3,5)$ and $X^\top\mathbf y=(5,6)^\top$, so $\mathbf w=(7/6,\ 1/2)$: the line $\hat y = 1.167 + 0.5x$.

> [!DEF] Hessian and second-order Taylor expansion
> The **Hessian** $H = \nabla^2 f$ is the matrix of second derivatives, $H_{ij}=\partial^2 f/\partial x_i\partial x_j$. It is symmetric and describes **curvature**.
> $$f(\mathbf x+\boldsymbol\delta) \approx f(\mathbf x) + \nabla f^\top\boldsymbol\delta + \tfrac12\boldsymbol\delta^\top H\boldsymbol\delta$$
> Every optimizer comes from this expansion: gradient descent uses only the first-order term; Newton's method also uses $H$.

> [!DEF] Convex function
> $f$ is **convex** if the straight line between any two points of its graph lies on or above the graph. For twice-differentiable $f$: convex $\iff H\succeq 0$ everywhere. Convex functions have no bad local minima. Linear and logistic regression losses are convex; neural-network losses are **not**, yet gradient descent still works well in practice.

> [!WARN] Check gradients numerically
> Always verify a hand-derived gradient with **finite differences**: $\frac{f(w+h)-f(w-h)}{2h}$ with $h\approx10^{-5}$ (in float64). The relative error should be around $10^{-6}$ or smaller.

> [!VIDEO] YG15m2VwSjA | Visualizing the chain rule and product rule | 3Blue1Brown · 16 min

> [!LEARN]
> - ⭐ [The Matrix Calculus You Need for Deep Learning](https://explained.ai/matrix-calculus/), Parr & Howard: a short, essential article.
> - [Mathematics for Machine Learning](https://mml-book.github.io/), ch. 5 (vector calculus).
> - Optional depth: [MIT 18.S096 Matrix Calculus for ML](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/).

## 6 · Optimization: gradient descent

The gradient points uphill, so to minimize a loss $L(\theta)$ we repeatedly step downhill.

> [!FORMULA] Gradient descent (GD)
> $$\theta_{t+1} = \theta_t - \eta\,\nabla L(\theta_t)$$
> $\eta>0$ is the **learning rate** (step size). Too small: painfully slow. Too large: the iterates overshoot and diverge.

> [!EXAMPLE] Why $\eta < 2/\lambda_{\max}$
> On $f(x)=\tfrac a2x^2$, GD gives $x_{t+1}=x_t-\eta a x_t=(1-\eta a)x_t$. This shrinks iff $|1-\eta a|<1 \iff 0<\eta<2/a$. For $\eta a\in(1,2)$ it converges while **oscillating** (sign flips), and for $\eta a>2$ it blows up.
>
> A quadratic in $d$ dimensions decouples along the eigenvectors of $H$, so the steepest direction ($\lambda_{\max}$) limits $\eta$, and the flattest ($\lambda_{\min}$) then converges at rate $1-\eta\lambda_{\min} \approx 1-2/\kappa$. That's why ill-conditioning (large $\kappa=\lambda_{\max}/\lambda_{\min}$) is slow.

> [!DEF] Stochastic gradient descent (SGD) and mini-batches
> Computing $\nabla L$ over the whole dataset is expensive. **SGD** instead estimates it on a small random **mini-batch** $B$ of examples:
> $$\theta \leftarrow \theta - \eta\,\frac{1}{|B|}\sum_{i\in B}\nabla\ell_i(\theta)$$
> The estimate is unbiased but noisy, and each step is far cheaper. The noise is widely believed to help generalization (it favors flatter minima), though this is still an active research question.

> [!DEF] Momentum
> Keep a running velocity $\mathbf v \leftarrow \beta\mathbf v + \nabla L$, then step $\theta\leftarrow\theta-\eta\mathbf v$ (typically $\beta=0.9$). It averages out zig-zags across a narrow valley and speeds up along its floor. Adam (module 05) adds a per-parameter step size on top.

> [!INTUITION] Physics view
> GD is an overdamped particle sliding down the potential $L$. **Momentum** is a heavy ball with friction. **SGD noise** acts like temperature, jiggling the ball out of sharp, narrow holes.

> [!DEF] Lagrange multipliers (constrained optimization)
> To optimize $f(\mathbf x)$ subject to $g(\mathbf x)=0$, solve $\nabla f = \mu\nabla g$ together with the constraint. At the optimum, the level set of $f$ just touches the constraint surface. It shows up in derivations such as "maximum entropy ⇒ softmax" and SVMs.

> [!TRY] [Optimizer Landscape](interactive/gradient-descent.html)
> Pick a narrow valley and raise the learning rate until GD starts to oscillate, then diverges. Then switch on momentum and Adam and compare the paths.

> [!VIDEO] PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi | Neural networks (series) | 3Blue1Brown · chapter 2 is "Gradient descent, how neural networks learn"

## 7 · Probability and statistics

A model's output is best read as a **probability distribution**, and training is about making the observed data probable.

> [!DEF] Random variable, distribution
> A **random variable** $X$ is a quantity whose value is uncertain. A **discrete** one has a probability mass function $p(x)=P(X=x)$ with $\sum_x p(x)=1$. A **continuous** one has a density $p(x)\ge0$ with $\int p(x)\,dx = 1$ (probabilities are areas under it).

> [!DEF] Expectation and variance
> $$\mathbb E[X] = \sum_x x\,p(x) \;\Big(\text{or }\int x\,p(x)\,dx\Big) \qquad \mathrm{Var}(X) = \mathbb E\big[(X-\mathbb E X)^2\big] = \mathbb E[X^2]-(\mathbb E X)^2$$
> **Linearity** always holds: $\mathbb E[aX+bY] = a\,\mathbb E X + b\,\mathbb E Y$. For **independent** variables, variances add: $\mathrm{Var}(X+Y)=\mathrm{Var}X+\mathrm{Var}Y$.

> [!DEF] Conditional probability and independence
> $P(A\mid B) = P(A,B)/P(B)$: the probability of $A$ once you know $B$ happened. $A$ and $B$ are **independent** if $P(A,B)=P(A)P(B)$, i.e. knowing one tells you nothing about the other.

> [!FORMULA] Bayes' rule
> $$p(\theta\mid D) = \frac{p(D\mid\theta)\,p(\theta)}{p(D)} \;\propto\; \underbrace{p(D\mid\theta)}_{\text{likelihood}}\;\underbrace{p(\theta)}_{\text{prior}}$$
> The **posterior** (belief after seeing data $D$) is proportional to likelihood × prior.

> [!EXAMPLE] A medical test
> A disease affects 1% of people. A test catches 90% of cases and has a 9% false-positive rate. You test positive. $P(\text{sick}\mid+) = \frac{0.9\cdot0.01}{0.9\cdot0.01 + 0.09\cdot0.99} = \frac{0.009}{0.0981}\approx 9\%$. The low prior dominates, so most positives are false alarms.

> [!FORMULA] Key distributions
> | Distribution | Probability | Mean / variance | Used for |
> |---|---|---|---|
> | Bernoulli($p$) | $p^x(1-p)^{1-x}$, $x\in\{0,1\}$ | $p$ / $p(1-p)$ | binary classification |
> | Categorical($\mathbf p$) | $p_k$ for class $k$ | — | multi-class classification |
> | Gaussian $\mathcal N(\mu,\sigma^2)$ | $\frac{1}{\sqrt{2\pi\sigma^2}}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ / $\sigma^2$ | regression noise, VAEs, diffusion |

> [!DEF] Maximum likelihood (MLE) and MAP
> Given data $x_1,\dots,x_N$ and a model $p(x\mid\theta)$, **MLE** picks the parameters that make the data most probable:
> $$\theta^* = \arg\max_\theta\sum_i\log p(x_i\mid\theta)$$
> (logs turn the product of probabilities into a sum). **MAP** adds a prior: maximize $\sum_i\log p(x_i\mid\theta)+\log p(\theta)$.

> [!KEY] Almost every DL loss is a negative log-likelihood
> - Gaussian likelihood → **mean squared error** (example below).
> - Bernoulli / Categorical likelihood → **cross-entropy** (section 8).
> - A Gaussian prior on the weights → **L2 weight decay** (practice 5).

> [!EXAMPLE] MSE is Gaussian MLE
> Model $y_i = f_\theta(x_i)+\varepsilon_i$, $\varepsilon_i\sim\mathcal N(0,\sigma^2)$. Then
> $$-\log p(\mathbf y\mid X,\theta) = \sum_i \frac{(y_i-f_\theta(x_i))^2}{2\sigma^2} + \frac N2\log(2\pi\sigma^2)$$
> The second term doesn't depend on $\theta$, so maximizing likelihood = minimizing $\sum_i (y_i-f_\theta(x_i))^2$. Special case $f_\theta=\mu$: $\frac{d}{d\mu}=0$ gives $\hat\mu=\bar y$, the sample mean.

> [!FORMULA] Monte Carlo and the reparameterization trick
> Expectations can be estimated by sampling: $\mathbb E_p[f(X)] \approx \frac1N\sum_{i=1}^N f(x_i)$ with $x_i\sim p$. To sample from $\mathcal N(\mu,\sigma^2)$ in a way gradients can flow through, write $x=\mu+\sigma\epsilon$ with $\epsilon\sim\mathcal N(0,1)$ (used in VAEs and diffusion, module 10).

> [!VIDEO] HZGCoVF3YvM | Bayes theorem, the geometry of changing beliefs | 3Blue1Brown · 15 min

> [!LEARN]
> - [Mathematics for Machine Learning](https://mml-book.github.io/), ch. 6 (probability) and ch. 8–9 (models, linear regression as MLE).
> - Optional depth: [Harvard Stat 110 (Blitzstein)](https://projects.iq.harvard.edu/stat110).

## 8 · Information theory: entropy, cross-entropy, KL

Information theory measures **surprise**. An event with probability $p$ carries $-\log p$ units of surprise: certain events ($p=1$) carry none, rare events carry a lot. With natural logs the unit is the *nat*; with $\log_2$ it is the *bit*.

> [!DEF] Entropy
> $$H(p) = -\sum_x p(x)\log p(x)$$
> the **average surprise** of a distribution. It is largest for the uniform distribution ($\log K$ for $K$ outcomes) and 0 when one outcome is certain. 🔭 Same form as the Gibbs entropy in statistical physics.

> [!DEF] Cross-entropy
> $$H(p,q) = -\sum_x p(x)\log q(x)$$
> the average surprise when reality follows $p$ but you predict with $q$. **This is the classification loss:** with a one-hot label $p$ (all mass on the true class $c$) it reduces to $-\log q(c)$, the negative log-probability your model gave to the correct answer.

> [!DEF] KL divergence
> $$D_{KL}(p\,\|\,q) = \sum_x p(x)\log\frac{p(x)}{q(x)} = H(p,q) - H(p) \;\ge\; 0$$
> the *extra* surprise from using $q$ instead of the truth $p$. It is zero only when $p=q$. It is **not symmetric** ($D_{KL}(p\|q)\ne D_{KL}(q\|p)$), so it is not a distance. Since $H(p)$ is fixed by the data, minimizing cross-entropy = minimizing KL to the data.

> [!EXAMPLE] $D_{KL}\ge 0$ (Gibbs' inequality)
> $-D_{KL}(p\|q)=\sum_x p(x)\log\frac{q(x)}{p(x)} \le \log\sum_x p(x)\frac{q(x)}{p(x)} = \log\sum_x q(x) \le \log 1 = 0$, by Jensen's inequality ($\log$ is concave). Equality iff $p=q$.

> [!FORMULA] Softmax (with temperature)
> A network outputs raw scores (**logits**) $\mathbf z$. Softmax turns them into probabilities:
> $$\sigma(\mathbf z)_i = \frac{e^{z_i/T}}{\sum_j e^{z_j/T}}$$
> 🔭 This is the Boltzmann distribution with energy $-z_i$ and temperature $T$. $T\to0$ picks the max; large $T$ flattens toward uniform. The "temperature" setting in LLM sampling is literally this $T$.

> [!WARN] Compute softmax and log-softmax stably
> $e^{1000}$ overflows to `inf` in float32. Since softmax is unchanged by subtracting a constant, libraries compute $e^{z_i-\max_j z_j}$. For the loss, use a fused **log-softmax / log-sum-exp** ($\log\sum_j e^{z_j} = m + \log\sum_j e^{z_j-m}$ with $m=\max_j z_j$) instead of `log(softmax(z))`.

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

7. $A=\begin{pmatrix}3&0\\0&0\end{pmatrix}$. What are its rank, determinant, column space and null space?
<details><summary>Answer</summary>

Rank 1, $\det A=0$. Column space: the $x$-axis (every output is $(3x_1, 0)$). Null space: the $y$-axis (anything $(0, x_2)$ maps to zero). Rank–nullity: $1+1=2$ ✓.
</details>

8. Find the eigenvalues of $\begin{pmatrix}4&1\\2&3\end{pmatrix}$.
<details><summary>Answer</summary>

$\det(A-\lambda I) = (4-\lambda)(3-\lambda)-2 = \lambda^2-7\lambda+10 = (\lambda-5)(\lambda-2)$, so $\lambda=5$ and $\lambda=2$. Check: their sum $7$ equals the trace and their product $10$ equals the determinant.
</details>

9. A classifier gives the true class probability 0.8 on one example and 0.05 on another. What is the cross-entropy loss on each (natural log)?
<details><summary>Answer</summary>

$-\ln 0.8\approx0.22$ and $-\ln0.05\approx3.0$. Confident wrong answers are punished heavily: the loss grows without bound as the probability of the true class goes to 0.
</details>

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

## Go deeper (all optional)
Everything above is self-contained. Use these if you want a second explanation or more exercises:
- ⭐ **[Mathematics for Machine Learning](https://mml-book.github.io/)**, Deisenroth, Faisal & Ong (free PDF). Read ch. 2–7 *selectively*. Skim what you know.
- ⭐ **[The Matrix Calculus You Need for Deep Learning](https://explained.ai/matrix-calculus/)**, Parr & Howard.
- **[3Blue1Brown: Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra)**: the geometric intuition, ~3 h (embedded in section 2).
- Optional depth: [MIT 18.06 (Strang)](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/), [Harvard Stat 110 (Blitzstein)](https://projects.iq.harvard.edu/stat110), [MIT 18.S096 Matrix Calculus for ML](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/).

## Done when
- [ ] Every skip-test item is answerable · [ ] gradient check passes to ~1e-6 relative error
