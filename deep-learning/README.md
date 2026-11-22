# Deep Learning: Beginner → Advanced

**Profile this is tuned for:** high-school senior, strong in math and physics, basic Python and C++ STL, highly self-directed.

**What that means for the plan:**
- **Math is a strength, so the math stays short.** Module 01 covers only the *DL-specific* math you probably haven't seen yet: matrix calculus, probability for ML, and information theory. It skips the high-school parts.
- **Physics intuition will pay off.** Gradient descent is a ball rolling on a potential. Softmax is the Boltzmann distribution. Diffusion models run Langevin dynamics. Energy-based models, Hamiltonian Monte Carlo, and physics-informed nets all lean on it. These links are pointed out where they show up (🔭).
- **C++ is an advantage later.** GPU/CUDA programming (module 12) is where serious performance work happens, and C++ gets you there faster than most people.
- **Code-first from day one.** You learn DL by *building* it, so every module ends with a project.

---

## The map

```
 PHASE 1 · FOUNDATIONS            PHASE 2 · CORE DL                 PHASE 3 · MODERN DL            PHASE 4 · ADVANCED
 ┌──────────────────────┐   ┌──────────────────────────┐   ┌────────────────────────┐   ┌────────────────────────┐
 │ 01 Math for DL       │──▶│ 04 Neural nets (scratch) │──▶│ 08 Transformers         │──▶│ 12 Frontiers:          │
 │ 02 Python + NumPy    │   │ 05 PyTorch + training    │   │ 09 LLMs                 │   │   theory, SSL, GNNs,   │
 │ 03 ML fundamentals   │   │ 06 CNNs + vision         │   │ 10 Generative models    │   │   interpretability,    │
 └──────────────────────┘   │ 07 Sequences + RNNs      │   │ 11 Reinforcement learn. │   │   sci-ML, GPU/systems  │
                            └──────────────────────────┘   └────────────────────────┘   └────────────────────────┘
```

| # | Module | Phase | Est. time* | You can… when done |
|---|---|---|---|---|
| 01 | [Math for DL](01-math-for-dl.md) | 1 | 15–25 h | differentiate through matrices, reason with probability and likelihood |
| 02 | [Python, NumPy & tools](02-python-numpy-tools.md) | 1 | 8–12 h | write vectorized NumPy, use git and Jupyter comfortably |
| 03 | [ML fundamentals](03-ml-fundamentals.md) | 1 | 20–30 h | train and evaluate classical models, diagnose over/underfitting |
| 04 | [Neural nets from scratch](04-neural-nets-from-scratch.md) | 2 | 15–20 h | build backprop and a tiny autograd engine yourself |
| 05 | [PyTorch & training practice](05-pytorch-training.md) | 2 | 20–30 h | train any model reliably and debug it when it fails |
| 06 | [CNNs & computer vision](06-cnns-vision.md) | 2 | 20–25 h | build and fine-tune ResNet-style models |
| 07 | [Sequences, embeddings & RNNs](07-sequences-rnns.md) | 2 | 10–15 h | explain why attention was invented |
| 08 | [Transformers](08-transformers.md) | 3 | 20–30 h | write a GPT from a blank file |
| 09 | [Large language models](09-llms.md) | 3 | 25–40 h | pretrain, fine-tune, and evaluate LMs, and understand the frontier |
| 10 | [Generative models](10-generative-models.md) | 3 | 25–35 h | derive and implement a VAE and a diffusion model |
| 11 | [Reinforcement learning](11-reinforcement-learning.md) | 3 | 25–35 h | implement DQN and PPO, and connect RL to RLHF |
| 12 | [Advanced frontiers](12-advanced-frontiers.md) | 4 | open-ended | read papers and pick a specialization |

\*Times assume you're strong at math. At **~10 h/week**, phases 1–3 take about **6–9 months**. Skip tests can cut that a lot.

**Order rules:** 01→02→03→04→05 are sequential. After 05, module 06 (vision) and module 07 (sequences) can be done in either order. 08 needs 07. 09 needs 08. 10 and 11 need only 05, so do them whenever they excite you.

### Fast track (if you want to see a GPT in under a month)
01 (matrix calculus section only) → 04 → 05 (first half) → 08. Come back for the rest later.

---

## Interactive tools → [`interactive/`](interactive/index.html)
- **Matrix as a map:** drag a 2×2 matrix; see det, rank, eigenvectors, and the SVD as rotate → scale → rotate (module 01).
- **Broadcasting lab:** right-align shapes, see stretch vs error and matmul rules, plus a predict-the-shape quiz (module 02).
- **Generalization lab:** under/overfitting with train/val curves and ridge λ; thresholds, confusion matrix, ROC and PR curves (module 03).
- **Backprop step-through:** run a computational graph forward and backward node by node, gradient-check it, take a GD step (module 04).
- **Optimizer landscape:** SGD vs Momentum vs Adam on 2D loss surfaces (modules 01, 05).
- **Neural net playground:** an MLP trained live with from-scratch backprop. Decision boundaries, overfitting, vanishing gradients (modules 03–05).
- **Attention & sampling:** drag q/k vectors, see the √d scaling and the causal mask, try temperature/top-k/top-p (modules 08–09).
- **Foundations quiz:** 27 auto-graded questions on modules 01–04, scored per module.
- **Flashcards:** ~60 core facts with spaced repetition.

## Support files

- **[cheatsheet.md](cheatsheet.md)**: every key formula on one page. Use it for recaps.
- **[resources.md](resources.md)**: the full curated list, plus a paper reading list in order.
- **[progress.md](progress.md)**: checklists and your learning log. Update it every session.

## Hardware

- You **don't** need a GPU to start. Modules 01–07 run on a laptop CPU.
- For 08 and beyond, use free GPUs: **Google Colab** and **Kaggle Notebooks** (~30 GPU-h/week free). Rent a cloud GPU only for the large projects.

## Study protocol (per module)

1. Take the **Skip test** (5 min). Can you do it all? Skip to the next module.
2. Read **Core ideas** (10 min) so you know where you're headed.
3. Work through the ⭐ resource. **Code along. Don't just watch.**
4. Do the **Build**. Get stuck, then fix it yourself. That's where the learning happens.
5. Re-take the skip test. Write a log entry in `progress.md`.
6. **Spaced review:** skim *Core ideas* again after 1 week and after 1 month (≈5 min each).
