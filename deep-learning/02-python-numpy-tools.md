# 02 · Python, NumPy & Tools
> **Goal:** fluent, vectorized numeric Python and a working dev setup. · **Time:** 8–12 h · **Needs:** basic Python

## Skip test
- [ ] Explain NumPy **broadcasting** and predict the shape of `(32,1,5) + (4,5)`.
- [ ] Compute pairwise distances between two point sets `A (n,d)`, `B (m,d)` with **no Python loop**.
- [ ] Use list/dict comprehensions, classes with `__call__`, generators, and type hints.
- [ ] Create a virtual env, install packages, and run a Jupyter notebook.
- [ ] `git` commit, branch, push. Write a `.gitignore`.

## Core ideas
- **Vectorize everything.** A Python loop over 1M elements is ~100× slower than a NumPy op. Thinking in whole arrays is the core DL skill, and PyTorch works the same way.
- **Broadcasting rule:** align shapes from the right. Each dim must be equal or 1. Dims of size 1 stretch.
- **Axis semantics:** `x.sum(axis=0)` collapses rows. Use `keepdims=True` to keep shapes broadcastable.
- **Views vs copies:** slicing gives a view (shared memory), fancy indexing gives a copy. `reshape` vs `transpose` + contiguity matters again in PyTorch.
- **dtype matters:** float32 is the default in DL. float64 is for gradient checks. float16/bfloat16 are for speed.
- **`einsum`** is a universal tensor op, e.g. `np.einsum('bij,bjk->bik', A, B)` = batched matmul. Learn it now and you'll read attention code easily.
- **Coming from C++:** Python objects are references. `a = b` doesn't copy. Mutable default args are a classic bug.
- **Tooling:** `uv` or `venv` + `pip` for environments. **Jupyter/Colab** for exploring. **VS Code** for real code. **git** for everything.

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
- Living in notebooks forever. Move reusable code into `.py` files early.

## Done when
- [ ] k-NN runs fully vectorized · [ ] project lives in a git repo with a README
