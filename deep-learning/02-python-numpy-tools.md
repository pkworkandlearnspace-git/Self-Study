# 02 · Python, NumPy & Tools
> **Goal:** fluent, vectorized numeric Python and a working dev setup. · **Time:** 8–12 h · **Needs:** basic Python

## Skip test
- [ ] Explain NumPy **broadcasting** and predict the shape of `(32,1,5) + (4,5)` and of `(N,) - (N,1)`. Say why the second is a common bug.
- [ ] Compute pairwise distances between two point sets `A (n,d)`, `B (m,d)` with **no Python loop**.
- [ ] Use list/dict comprehensions, classes with `__call__`, generators, and type hints.
- [ ] Say which of `x[1:3]`, `x[[1,2]]`, `x[x > 0]`, `x.reshape(-1)` return views and which return copies.
- [ ] Create a virtual env, install packages, and run a Jupyter notebook.
- [ ] `git` commit, branch, push. Write a `.gitignore`.

🎯 Not sure? Take the auto-graded [Foundations Quiz](interactive/foundations-quiz.html) (filter by module) before deciding.

## Core ideas
- **Vectorize everything.** A Python loop over 1M elements is typically 10–100× slower than the equivalent NumPy op (which runs in compiled C over contiguous memory). Thinking in whole arrays is the core DL skill, and PyTorch works the same way.
- **Broadcasting rule:** align shapes from the right; missing leading dims count as 1. Each pair of dims must be equal or one of them 1. Dims of size 1 stretch (virtually: no copy). 🎛️ Drill it in the [Broadcasting Lab](interactive/broadcasting-lab.html).
- **Axis semantics:** `x.sum(axis=0)` collapses rows. Use `keepdims=True` to keep shapes broadcastable.
- **Views vs copies:** basic slicing (`x[1:4]`, `x[:, 0]`) gives a view (shared memory), while fancy/boolean indexing (`x[[1,2]]`, `x[x>0]`) gives a copy. Check with `np.shares_memory(a, b)`. `reshape` vs `transpose` + contiguity matters again in PyTorch.
- **dtype matters:** NumPy defaults to **float64**, PyTorch to **float32** (mixing them silently upcasts or errors). Use float64 for gradient checks, float32 for training, and float16/bfloat16 for speed on GPUs.
- **`einsum`** is a universal tensor op, e.g. `np.einsum('bij,bjk->bik', A, B)` = batched matmul. Learn it now and you'll read attention code easily.
- **Coming from C++:** Python objects are references. `a = b` doesn't copy. Mutable default args are a classic bug.
- **Tooling:** `uv` or `venv` + `pip` for environments. **Jupyter/Colab** for exploring. **VS Code** for real code. **git** for everything.

## Worked examples

**1 · Pairwise distances with no loop.** `A (n,d)`, `B (m,d)` → `D (n,m)`.
```python
# Version 1: broadcasting. (n,1,d) - (1,m,d) -> (n,m,d), then sum over d. Memory O(n·m·d).
D = np.sqrt(((A[:, None, :] - B[None, :, :]) ** 2).sum(-1))
# Version 2: expand ||a-b||² = ||a||² + ||b||² - 2a·b. Memory O(n·m), and the matmul is fast.
sq = (A**2).sum(1)[:, None] + (B**2).sum(1)[None, :] - 2 * A @ B.T
D = np.sqrt(np.maximum(sq, 0))   # clip tiny negatives caused by rounding
```
Both agree (`np.allclose` ✓). Version 2 is what k-NN in CS231n assignment 1 asks for.

**2 · Row-wise softmax, stable and vectorized.**
```python
def softmax(Z):                       # Z: (N, C)
    Z = Z - Z.max(axis=1, keepdims=True)   # keepdims -> (N,1), broadcasts back over C
    E = np.exp(Z)
    return E / E.sum(axis=1, keepdims=True)
```
Without `keepdims`, `Z.max(axis=1)` has shape `(N,)`, and `(N,C) - (N,)` either errors or (if N == C) silently subtracts the wrong thing.

**3 · View vs copy.**
```python
x = np.arange(6); v = x[1:4]; v[0] = 99   # x is now [0 99 2 3 4 5]: v was a view
y = np.arange(6); c = y[[1,2,3]]; c[0] = 99   # y is unchanged: fancy indexing copied
```

## Practice (answers hidden)

1. Shapes: `(8,1,6,1) * (7,1,5)`? `(3,4) + (3,)`? `(64,10).mean(axis=1, keepdims=True)`?
<details><summary>Answer</summary>

`(8,7,6,5)` · error (4 vs 3, neither is 1; use `(3,1)`) · `(64,1)`.
</details>

2. One-hot encode integer labels `y` of shape `(N,)` with `C` classes in one line.
<details><summary>Answer</summary>

`np.eye(C)[y]` → `(N, C)`. (Fancy indexing picks rows of the identity matrix.)
</details>

3. Count live neighbors for every cell of a Game-of-Life board `G (H,W)` with no Python loop over cells (wrap-around edges are fine).
<details><summary>Answer</summary>

```python
N = sum(np.roll(np.roll(G, i, 0), j, 1) for i in (-1,0,1) for j in (-1,0,1) if (i,j) != (0,0))
G = ((N == 3) | ((G == 1) & (N == 2))).astype(int)
```
The 8-term sum loops over *offsets*, not cells. `scipy.signal.convolve2d` with a 3×3 kernel of ones (center 0) does the same thing.
</details>

4. `loss = ((y_pred - y)**2).mean()` with `y_pred (N,1)` and `y (N,)` gives a suspiciously small loss and the model won't train. Why?
<details><summary>Answer</summary>

`(N,1) - (N,)` broadcasts to `(N,N)`, so the loss averages every prediction against every target. Fix: `y_pred.squeeze(1)` or `y[:, None]`, and add `assert y_pred.shape == y.shape`.
</details>

5. Rewrite `np.einsum('bij,bjk->bik', A, B)` and `np.einsum('ij->j', X)` with ordinary NumPy calls.
<details><summary>Answer</summary>

`A @ B` (batched matmul) and `X.sum(axis=0)`.
</details>

## Learn from
- ⭐ **[NumPy: the absolute basics](https://numpy.org/doc/stable/user/absolute_beginners.html)** + **[Broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html)** (official docs)
- ⭐ **[CS231n Python/NumPy tutorial](https://cs231n.github.io/python-numpy-tutorial/)**: short and DL-oriented.
- **[From Python to NumPy](https://www.labri.fr/perso/nrougier/from-python-to-numpy/)**, N. Rougier (vectorization mindset).
- **[100 NumPy exercises](https://github.com/rougier/numpy-100)**: do ~40 for fluency.
- **[The Missing Semester (MIT)](https://missing.csail.mit.edu/)**: shell, git, editors. Do the git + shell lectures.
- Plotting: **[Matplotlib quick start](https://matplotlib.org/stable/users/explain/quick_start.html)**.

## Build
1. Vectorized **k-nearest-neighbors** classifier on MNIST or CIFAR-10 (CS231n assignment 1 style). Time the loop version against the vectorized one.
2. Conway's Game of Life with NumPy only (convolution-like neighbor counts, no loops over cells).

## Traps
- Silent broadcasting bugs: `(N,) - (N,1)` becomes `(N,N)`. **Assert shapes** in your code.
- `a = b` for arrays doesn't copy (it's another name for the same object). Use `b.copy()` when you need one.
- In-place ops on a view (`v += 1`) change the original array too.
- Living in notebooks forever. Move reusable code into `.py` files early.

## Done when
- [ ] k-NN runs fully vectorized · [ ] project lives in a git repo with a README
