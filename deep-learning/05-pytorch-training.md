# 05 · PyTorch & the Craft of Training
> **Goal:** train any model reliably, and know what to do when it doesn't train. · **Time:** 20–30 h · **Needs:** 04

## Skip test
- [ ] Write a full training loop from memory: `Dataset`/`DataLoader`, `nn.Module`, loss, optimizer, `zero_grad → backward → step`, eval with `torch.no_grad()` + `model.eval()`.
- [ ] Explain SGD + momentum vs Adam vs **AdamW** (and why decoupled weight decay matters).
- [ ] Explain what BatchNorm and LayerNorm normalize over, and the train/eval difference for BatchNorm.
- [ ] Explain why a LR warmup + cosine decay schedule is standard.
- [ ] Your loss is NaN at step 200. List five things to check.
- [ ] Explain mixed precision (bf16/fp16) and gradient clipping.

## Core ideas

### PyTorch mechanics
- **Tensor** = a NumPy array + device (CPU/GPU) + autograd. `requires_grad=True` records ops into a graph.
- `loss.backward()` fills `.grad`. The optimizer reads `.grad` to update parameters. `optimizer.zero_grad()` resets them.
- **`nn.Module`**: define layers in `__init__` and compute in `forward`. Parameters register automatically.
- **`Dataset` / `DataLoader`**: batching, shuffling, worker processes.
- **Modes:** `model.train()` / `model.eval()` switch dropout and BatchNorm behavior. `torch.no_grad()` turns off graph building.
- **Devices:** move the model *and* the data `.to(device)`. Most "device mismatch" errors come from this.
- **`torch.compile`** speeds things up for free in many cases.

### Optimizers
- **SGD + momentum:** $v \leftarrow \beta v + g,\ \theta \leftarrow \theta - \eta v$ (heavy ball 🔭).
- **Adam:** per-parameter adaptive LR from running averages of $g$ (1st moment) and $g^2$ (2nd moment), with bias correction.
- **AdamW:** Adam with weight decay applied *directly* to the weights, not via the gradient. **The default for transformers.**
- **LR is the #1 hyperparameter.** Use warmup (stability early) + cosine/linear decay. LR range test to find a good value.
- **Batch size:** larger means less noise. Scale the LR roughly linearly (SGD) or √ (Adam) with batch size.

### Normalization & regularization
- **BatchNorm:** normalize each feature over the *batch*. It uses running statistics at eval time. Common in CNNs.
- **LayerNorm / RMSNorm:** normalize over the *features* of each example. Independent of batch size. Used in transformers.
- **Residual connections** $\mathbf x + F(\mathbf x)$ give gradients a highway. This is what makes deep nets trainable.
- **Dropout:** randomly zero activations in training, which acts like an ensemble. **Weight decay**, **data augmentation**, **early stopping**, **label smoothing**.

### Debugging recipe (from Karpathy's "Recipe")
1. Get to know the data: look at samples and label distributions.
2. Build a dumb baseline, fix random seeds, check the **initial loss** (≈ $\ln(C)$ for $C$ classes).
3. **Overfit a single batch** to ~0 loss. If you can't, there's a bug.
4. Then add regularization and scale up. Change **one thing at a time**.
5. Track everything: loss curves (train and val), LR, gradient norms. Use **Weights & Biases** or TensorBoard.

### Performance
- **Mixed precision** (`torch.autocast`, prefer **bf16**) gives ~2× speed and half the memory.
- **Gradient clipping** (clip by norm, e.g. 1.0) prevents explosions.
- **Gradient accumulation** simulates a large batch on a small GPU.
- **Checkpointing:** save model + optimizer + step so you can resume.

## Learn from
- ⭐ **[Dive into Deep Learning (d2l.ai)](https://d2l.ai/)**: free, PyTorch, math + code. Ch. 2–5, 8 (modern CNNs), 12 (optimization). Use it as your main textbook for modules 05–07.
- ⭐ **[A Recipe for Training Neural Networks (Karpathy)](https://karpathy.github.io/2019/04/25/recipe/)**: read twice.
- **[Understanding Deep Learning (Simon Prince, 2023)](https://udlbook.github.io/udlbook/)**: free, beautifully illustrated, and strong on theory. Ch. 6–9 (training, init, regularization). Your best *theory* companion.
- **[PyTorch: Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html)** + **[Zero to Mastery PyTorch](https://www.learnpytorch.io/)**.
- **[Deep Learning Tuning Playbook (Google)](https://github.com/google-research/tuning_playbook)**: a systematic way to tune hyperparameters.
- Alt. top-down style: **[fast.ai Practical Deep Learning](https://course.fast.ai/)**. Great if you want quick wins before theory.

## Build
1. Re-implement your MNIST MLP in PyTorch. Compare it to your NumPy version.
2. **Fashion-MNIST/CIFAR-10 ablation study:** run SGD vs Adam vs AdamW, ± BatchNorm, ± dropout, three LR schedules. Plot everything in W&B and write a one-page conclusion.
3. Deliberately break training (huge LR, no normalization, bad init, forgetting `zero_grad`) and record what each failure *looks like* on the curves.

## Traps
- Forgetting `model.eval()` → BatchNorm/dropout are wrong at test time.
- Calling `.item()` or moving tensors to the CPU every step slows everything down.
- Tuning ten things at once. You learn nothing from that.

## Done when
- [ ] Training loop written from memory · [ ] ablation report done · [ ] you recognize failure modes from the loss curves alone
