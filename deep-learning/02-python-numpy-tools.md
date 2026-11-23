# 02 · Python, NumPy & Tools
> **Goal:** fluent, vectorized numeric Python and a working dev setup. · **Time:** 8–12 h · **Needs:** basic Python

> [!GOAL]
> By the end of this chapter you can:
>
> - avoid the Python habits that cause silent bugs in numeric code (references, mutability);
> - create, index and reduce NumPy arrays, and always know their **shape** and **dtype**;
> - predict **broadcasting** results and tell **views** from **copies**;
> - replace Python loops with whole-array operations and `einsum`;
> - set up an environment, a notebook, and a git repo.
>
> Everything you learn about NumPy carries over almost unchanged to PyTorch tensors (module 05).

## Skip test
- [ ] Explain NumPy **broadcasting** and predict the shape of `(32,1,5) + (4,5)` and of `(N,) - (N,1)`. Say why the second is a common bug.
- [ ] Compute pairwise distances between two point sets `A (n,d)`, `B (m,d)` with **no Python loop**.
- [ ] Use list/dict comprehensions, classes with `__call__`, generators, and type hints.
- [ ] Say which of `x[1:3]`, `x[[1,2]]`, `x[x > 0]`, `x.reshape(-1)` return views and which return copies.
- [ ] Create a virtual env, install packages, and run a Jupyter notebook.
- [ ] `git` commit, branch, push. Write a `.gitignore`.

🎯 Not sure? Take the auto-graded [Foundations Quiz](interactive/foundations-quiz.html) (filter by module) before deciding.

## 1 · Python essentials for numeric code

You already know basic Python. These are the parts that matter most when writing ML code, and the ones that bite people coming from C++ or Java.

> [!DEF] Names are references
> A Python variable is a **name attached to an object**, not a box holding a value. `b = a` makes `b` a second name for the *same* object; nothing is copied. For immutable objects (numbers, strings, tuples) this never matters. For mutable ones (lists, dicts, arrays) a change through one name is visible through the other.

> [!CODE] References and copies
> ```python
> a = [1, 2, 3]
> b = a          # same list
> b.append(4)    # a is now [1, 2, 3, 4] too
> c = a.copy()   # a new list; changing c leaves a alone
> ```

> [!WARN] Mutable default arguments
> Default values are created **once**, when the function is defined:
> ```python
> def add(x, items=[]):   # BUG: the same list is shared by every call
>     items.append(x); return items
> add(1); add(2)          # -> [1, 2]
> ```
> Use `items=None` and create the list inside: `items = [] if items is None else items`.

> [!DEF] Comprehensions
> A compact way to build a list, dict or set from a loop:
> `[x**2 for x in range(5) if x % 2 == 0]` → `[0, 4, 16]` · `{w: len(w) for w in words}` · `{x % 3 for x in data}`.

> [!DEF] Classes and `__call__`
> A class bundles data (attributes) with functions that use it (methods). Defining `__call__` lets an object be used like a function. This is exactly how PyTorch layers work: `layer(x)` calls `layer.__call__(x)`, which runs its `forward` method.
> ```python
> class Linear:
>     def __init__(self, W, b): self.W, self.b = W, b
>     def __call__(self, x):    return x @ self.W.T + self.b
> ```

> [!DEF] Generators
> A function containing `yield` produces values one at a time, lazily, instead of building the whole list in memory. Data loaders are generators: they hand you one mini-batch at a time.
> ```python
> def batches(X, size):
>     for i in range(0, len(X), size):
>         yield X[i:i + size]
> ```

> [!DEF] Type hints
> Optional annotations like `def f(x: np.ndarray, k: int = 3) -> float:`. Python ignores them at runtime, but editors and tools (mypy, pyright) use them to catch mistakes and they document intent.

## 2 · NumPy arrays: shape, dtype, axes

NumPy's `ndarray` is a block of numbers of **one type**, laid out in memory, with a **shape** that says how to read it as a grid. All the speed of NumPy (and PyTorch) comes from running compiled loops over that block instead of looping in Python.

> [!DEF] ndarray, shape, ndim, dtype
> - **shape:** a tuple of sizes, e.g. `(32, 3, 28, 28)` = 32 images, 3 channels, 28×28 pixels.
> - **ndim:** number of axes (`len(shape)`). A scalar has ndim 0, a vector 1, a matrix 2.
> - **dtype:** the element type, e.g. `float32`, `int64`, `bool`. Every element has the same dtype.
> - **size:** total number of elements (product of the shape).

> [!CODE] Creating arrays
> ```python
> np.array([[1, 2], [3, 4]])      # from a list, shape (2, 2)
> np.zeros((3, 4)); np.ones(5); np.full((2, 2), 7.0)
> np.arange(0, 10, 2)             # [0 2 4 6 8]
> np.linspace(0, 1, 5)            # 5 evenly spaced points from 0 to 1
> rng = np.random.default_rng(0)  # seeded generator (reproducible)
> rng.normal(size=(100, 3))       # standard normal samples
> ```

> [!DEF] Indexing
> - **Basic slicing:** `x[1:4]`, `x[:, 0]`, `x[::2]`, `x[..., -1]`. Start:stop:step, stop excluded. Negative indices count from the end.
> - **Fancy (integer-array) indexing:** `x[[0, 2, 5]]` picks those rows.
> - **Boolean masking:** `x[x > 0]` picks the elements where the mask is True (result is 1-D).
> - `None` (or `np.newaxis`) inserts an axis of size 1: `x[:, None]` turns shape `(N,)` into `(N, 1)`.

> [!DEF] Axes and reductions
> Reductions like `sum`, `mean`, `max`, `argmax` take an `axis` argument: the axis that **disappears**. For `X` of shape `(N, C)`: `X.sum(axis=0)` → shape `(C,)` (sum over rows, one value per column); `X.sum(axis=1)` → `(N,)`.
> `keepdims=True` keeps the reduced axis with size 1, e.g. `(N, 1)`, so the result still broadcasts against `X`.

> [!KEY] Reshape and transpose
> `x.reshape(4, -1)` reinterprets the same numbers with a new shape (`-1` = "work it out"); the total size must match. `x.T` / `x.transpose(1, 0, 2)` reorders axes. Reshape keeps elements in reading (row-major) order; transpose changes which axis is which. They are **not** interchangeable: reshaping a `(2,3)` matrix to `(3,2)` is not its transpose.

## 3 · Broadcasting

Broadcasting lets you combine arrays of different shapes without writing loops or making copies, e.g. subtract a per-column mean from every row.

> [!FORMULA] The broadcasting rule
> 1. Line the shapes up **from the right**. If one has fewer axes, pad it on the left with 1s.
> 2. For each axis, the sizes must be **equal**, or one of them must be **1**.
> 3. Axes of size 1 are stretched (virtually, with no copy) to match. The result takes the larger size on every axis.
>
> If any axis breaks rule 2, NumPy raises an error.

> [!EXAMPLE] Predicting shapes
> | Left | Right | Result |
> |---|---|---|
> | `(32,1,5)` | `(4,5)` → `(1,4,5)` | `(32,4,5)` |
> | `(N,C)` | `(C,)` → `(1,C)` | `(N,C)`: one value per column |
> | `(N,C)` | `(N,1)` | `(N,C)`: one value per row |
> | `(3,4)` | `(3,)` → `(1,3)` | **error**: 4 vs 3 |
> | `(N,)` → `(1,N)` | `(N,1)` | `(N,N)` ⚠️ |

> [!WARN] The `(N,)` vs `(N,1)` bug
> `y_pred` of shape `(N,1)` minus `y` of shape `(N,)` gives an `(N,N)` matrix of every prediction against every target. The loss is then computed on nonsense, often without any error. Always `assert y_pred.shape == y.shape` before computing a loss.

> [!TRY] [Broadcasting Lab](interactive/broadcasting-lab.html)
> Enter two shapes and see how they align, which axes stretch, and the resulting shape, then drill yourself with the random quiz until you get 10 in a row.

## 4 · Views vs copies

Because arrays are blocks of memory with a shape on top, many operations just create a new *view* of the same memory.

> [!DEF] View, copy
> A **view** is a new array object that shares memory with the original: changing one changes the other. A **copy** has its own memory. Check with `np.shares_memory(a, b)`.
>
> | Operation | Result |
> |---|---|
> | basic slicing `x[1:4]`, `x[:, 0]`, `x[::2]` | view |
> | `x.reshape(...)`, `x.T`, `x[None]` | view (reshape copies only if it can't avoid it) |
> | fancy indexing `x[[1, 2]]` | copy |
> | boolean masking `x[x > 0]` | copy |
> | arithmetic `x + 1`, `x.copy()` | new array |

> [!EXAMPLE] View vs copy
> ```python
> x = np.arange(6); v = x[1:4]; v[0] = 99       # x is now [0 99 2 3 4 5]: v was a view
> y = np.arange(6); c = y[[1, 2, 3]]; c[0] = 99 # y is unchanged: fancy indexing copied
> ```

> [!DEF] Strides and contiguity
> An array stores **strides**: how many bytes to jump to move one step along each axis. A transpose just swaps strides, so it's free, but the result is no longer laid out row by row (**not contiguous**). Some operations need contiguous memory and will copy; in PyTorch, `.view()` refuses non-contiguous tensors while `.reshape()` copies when needed.

> [!WARN] In-place updates through views
> `v += 1` on a view changes the original array too. That is useful when intended and a nasty bug when not.

## 5 · Vectorization and einsum

**Vectorizing** means expressing a computation as operations on whole arrays. A Python loop over a million elements is typically 10–100× slower than the equivalent NumPy call, which runs one compiled loop over contiguous memory. Thinking in whole arrays is the core DL skill, and PyTorch works the same way.

> [!EXAMPLE] Pairwise distances with no loop
> `A (n,d)`, `B (m,d)` → `D (n,m)` with $D_{ij} = \|\mathbf a_i-\mathbf b_j\|$.
> ```python
> # Version 1: broadcasting. (n,1,d) - (1,m,d) -> (n,m,d), then sum over d. Memory O(n·m·d).
> D = np.sqrt(((A[:, None, :] - B[None, :, :]) ** 2).sum(-1))
> # Version 2: expand ||a-b||² = ||a||² + ||b||² - 2a·b. Memory O(n·m), and the matmul is fast.
> sq = (A**2).sum(1)[:, None] + (B**2).sum(1)[None, :] - 2 * A @ B.T
> D = np.sqrt(np.maximum(sq, 0))   # clip tiny negatives caused by rounding
> ```
> Both agree (`np.allclose` ✓). Version 2 is what k-NN in CS231n assignment 1 asks for.

> [!EXAMPLE] Row-wise softmax, stable and vectorized
> ```python
> def softmax(Z):                            # Z: (N, C)
>     Z = Z - Z.max(axis=1, keepdims=True)   # keepdims -> (N,1), broadcasts back over C
>     E = np.exp(Z)
>     return E / E.sum(axis=1, keepdims=True)
> ```
> Without `keepdims`, `Z.max(axis=1)` has shape `(N,)`, and `(N,C) - (N,)` either errors or (if N == C) silently subtracts the wrong thing.

> [!DEF] Matrix multiplication with `@`
> `A @ B` is matrix multiplication (module 01). With more than 2 axes it is **batched**: `(b,n,k) @ (b,k,m)` → `(b,n,m)`, one matmul per batch element. `*` is element-wise and never a matrix product.

> [!DEF] einsum
> `np.einsum` describes a tensor operation by **naming the axes**. Letters that appear in the inputs but not in the output are summed over.
>
> | einsum | Same as |
> |---|---|
> | `'ij,jk->ik'` | `A @ B` |
> | `'bij,bjk->bik'` | batched `A @ B` |
> | `'ij->j'` | `X.sum(axis=0)` |
> | `'i,i->'` | dot product `a @ b` |
> | `'ij->ji'` | `X.T` |
> | `'bhqd,bhkd->bhqk'` | attention scores $QK^\top$ per batch and head (module 08) |

## 6 · Numbers on a computer: dtypes

Floating-point numbers have limited precision and range. In DL you trade precision for speed and memory, so you need to know the limits.

> [!FORMULA] Common float types
> | dtype | Bits | Machine epsilon (relative precision) | Largest value | Typical use |
> |---|---|---|---|---|
> | float64 | 64 | $2.2\times10^{-16}$ | $1.8\times10^{308}$ | NumPy default, gradient checks |
> | float32 | 32 | $1.2\times10^{-7}$ | $3.4\times10^{38}$ | PyTorch default, training |
> | float16 | 16 | $9.8\times10^{-4}$ | $65\,504$ | fast GPU math (needs loss scaling) |
> | bfloat16 | 16 | $7.8\times10^{-3}$ | $\approx3.4\times10^{38}$ | fast GPU math, same range as float32 |

> [!WARN] Mixing dtypes
> NumPy defaults to **float64** and PyTorch to **float32**. Mixing them silently upcasts (NumPy) or raises an error (PyTorch). Integer arrays divide differently too: `np.array([1, 2]) / 2` gives floats but `//` floors. Check `x.dtype` when results look odd.

> [!KEY] Overflow and cancellation
> `np.exp(1000)` is `inf` in any float type, which is why softmax subtracts the max (module 01). Subtracting two nearly equal numbers loses precision ("catastrophic cancellation"), which is why finite-difference gradient checks use float64.

## 7 · Tooling: environments, notebooks, git

> [!DEF] Virtual environment
> An isolated folder of packages for one project, so projects with different versions don't clash.
> ```bash
> python -m venv .venv && source .venv/bin/activate   # or: uv venv && source .venv/bin/activate
> pip install numpy matplotlib jupyter                # or: uv pip install ...
> pip freeze > requirements.txt                        # record exact versions
> ```

> [!DEF] Notebooks vs scripts
> **Jupyter** (or **Google Colab**, which gives a free GPU) is ideal for exploring: run a cell, look at a plot, try again. Notebooks hide state (cells run out of order), so move reusable code into `.py` files and import it. Use **VS Code** (or any real editor) for those files.

> [!DEF] git essentials
> git records snapshots (**commits**) of your project so you can go back, compare, and work on branches.
> ```bash
> git init                       # start tracking a folder
> git add model.py && git commit -m "Add MLP"   # snapshot
> git switch -c experiment       # new branch for a risky change
> git log --oneline; git diff    # history; what changed
> git push -u origin main        # upload to GitHub
> ```
> A `.gitignore` lists files git should never track: `.venv/`, `__pycache__/`, `*.ckpt`, `data/`, `.ipynb_checkpoints/`.

> [!LEARN]
> - ⭐ [The Missing Semester (MIT)](https://missing.csail.mit.edu/): shell, git, editors. Do the git and shell lectures.

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

6. `X` has shape `(N, D)`. Standardize every column to mean 0 and standard deviation 1 in one line.
<details><summary>Answer</summary>

`(X - X.mean(axis=0)) / (X.std(axis=0) + 1e-8)`. The `(D,)` statistics broadcast over the rows; the small constant avoids division by zero for constant columns.
</details>

7. After `x = np.arange(12).reshape(3, 4)`, is `x.T.reshape(-1)` a view? What are its first four elements?
<details><summary>Answer</summary>

It's a **copy**: `x.T` is not contiguous, so flattening it in row order needs new memory. The first four elements are `[0, 4, 8, 1]` (reading `x.T` row by row walks down the columns of `x`).
</details>

## Build
1. Vectorized **k-nearest-neighbors** classifier on MNIST or CIFAR-10 (CS231n assignment 1 style). Time the loop version against the vectorized one.
2. Conway's Game of Life with NumPy only (convolution-like neighbor counts, no loops over cells).

## Traps
- Silent broadcasting bugs: `(N,) - (N,1)` becomes `(N,N)`. **Assert shapes** in your code.
- `a = b` for arrays doesn't copy (it's another name for the same object). Use `b.copy()` when you need one.
- In-place ops on a view (`v += 1`) change the original array too.
- Living in notebooks forever. Move reusable code into `.py` files early.

## Go deeper (all optional)
- ⭐ **[NumPy: the absolute basics](https://numpy.org/doc/stable/user/absolute_beginners.html)** + **[Broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html)** (official docs)
- ⭐ **[CS231n Python/NumPy tutorial](https://cs231n.github.io/python-numpy-tutorial/)**: short and DL-oriented.
- **[From Python to NumPy](https://www.labri.fr/perso/nrougier/from-python-to-numpy/)**, N. Rougier (vectorization mindset).
- **[100 NumPy exercises](https://github.com/rougier/numpy-100)**: do ~40 for fluency.
- **[The Missing Semester (MIT)](https://missing.csail.mit.edu/)**: shell, git, editors.
- Plotting: **[Matplotlib quick start](https://matplotlib.org/stable/users/explain/quick_start.html)**.

## Done when
- [ ] k-NN runs fully vectorized · [ ] project lives in a git repo with a README
