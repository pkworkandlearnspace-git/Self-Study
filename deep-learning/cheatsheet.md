# Deep Learning Cheatsheet
Everything key on one page. Skim this to recap, and open the module (→ NN) if a line feels unfamiliar.

## Math (→ 01)
| Concept | Formula |
|---|---|
| Linear-regression gradient | $\nabla_{\mathbf w}\|X\mathbf w-\mathbf y\|^2 = 2X^\top(X\mathbf w-\mathbf y)$ |
| Quadratic form gradient | $\nabla(\mathbf x^\top A\mathbf x) = (A+A^\top)\mathbf x$ |
| Chain rule (Jacobians) | $J_{f\circ g} = J_f J_g$; backprop = vector-Jacobian products, right to left |
| SVD | $A = U\Sigma V^\top$ (rotate · scale · rotate) |
| GD stability (quadratic) | $\eta < 2/\lambda_{\max}(H)$ |
| Bayes | $p(\theta\mid D)\propto p(D\mid\theta)p(\theta)$ |
| Entropy / CE / KL | $H(p)=-\sum p\log p$ · $H(p,q)=-\sum p\log q$ · $D_{KL}=H(p,q)-H(p)\ge0$ |
| Softmax | $\sigma(\mathbf z)_i = e^{z_i/T}/\sum_j e^{z_j/T}$ (Boltzmann, temperature $T$) |
| Losses as likelihoods | Gaussian NLL → MSE · Categorical NLL → cross-entropy · Gaussian prior → L2 |

## ML basics (→ 03)
- Logistic regression: $\hat y=\sigma(\mathbf w^\top\mathbf x)$, gradient $X^\top(\hat{\mathbf y}-\mathbf y)$
- High train error → **underfit** (bigger model). Train ≪ val → **overfit** (data, regularization).
- Precision $=\frac{TP}{TP+FP}$ · Recall $=\frac{TP}{TP+FN}$ · F1 = harmonic mean
- Split: train (fit) / val (decide) / test (report once). Fit preprocessing on train only.

## Neural nets (→ 04)
- Layer: $\mathbf h=\phi(W\mathbf x+\mathbf b)$. Batch linear $Y=XW^\top$: $\partial L/\partial W = (\partial L/\partial Y)^\top X$, $\partial L/\partial X = (\partial L/\partial Y)W$
- Softmax + CE: $\partial L/\partial\mathbf z = \hat{\mathbf y}-\mathbf y$
- Init: Xavier $\text{Var}=1/n_{in}$ (tanh) · He $2/n_{in}$ (ReLU)
- Initial loss sanity check: $\approx\ln C$ for $C$ balanced classes

## Training (→ 05)
```python
for x, y in loader:
    x, y = x.to(dev), y.to(dev)
    with torch.autocast(device_type="cuda", dtype=torch.bfloat16):
        loss = loss_fn(model(x), y)
    opt.zero_grad(set_to_none=True)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    opt.step(); sched.step()
```
- **Defaults that usually work:** AdamW (β=(0.9, 0.95–0.999), wd 0.01–0.1), warmup + cosine, bf16, grad clip 1.0.
- Debug order: check the data → check the initial loss → **overfit one batch** → scale up → change one thing at a time.
- BatchNorm normalizes over the *batch* (CNNs) · LayerNorm/RMSNorm over the *features* (transformers).

## CNNs (→ 06)
- Output size $\lfloor(n+2p-k)/s\rfloor+1$ · Params $C_{in}C_{out}k^2+C_{out}$
- ResNet: $\mathbf y=\mathbf x+F(\mathbf x)$ · Transfer: small data → freeze; more data → fine-tune all at a low LR.

## Sequences (→ 07)
- LM: $p(x_{1:T})=\prod_t p(x_t\mid x_{<t})$ · Perplexity $=e^{\text{CE loss}}$
- RNN gradients scale like $\lambda^T$ → vanish/explode. LSTM's additive cell state fixes it.

## Transformers (→ 08)
- $\text{Attn}(Q,K,V)=\text{softmax}(QK^\top/\sqrt{d_k}+M)V$, causal mask $M_{ij}=-\infty$ for $j>i$
- Block: `x += attn(norm(x)); x += mlp(norm(x))`, MLP $d\to4d\to d$
- Params ≈ $12Ld^2$ + $Vd$ · Attention cost $O(T^2d)$ · RoPE = relative position via rotation
- Shapes: `(B,T,C)` → split heads `(B,h,T,C/h)` → attention → merge back

## LLMs (→ 09)
- Training compute $C\approx 6ND$ FLOPs · Chinchilla-optimal $D\approx20N$
- Pipeline: pretrain → SFT → preference (RLHF-PPO / DPO) → RL with verifiable rewards (GRPO)
- LoRA: $W + BA$, rank $r\ll d$ · KV cache: store past K,V → decoding is memory-bandwidth-bound
- RAG for *knowledge*, fine-tuning for *behavior*

## Generative (→ 10)
- ELBO: $\log p(x)\ge\mathbb E_q[\log p(x|z)]-D_{KL}(q(z|x)\|p(z))$ · Reparam: $z=\mu+\sigma\epsilon$
- GAN: $\min_G\max_D \mathbb E[\log D(x)]+\mathbb E[\log(1-D(G(z)))]$
- DDPM: $x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$, loss $\|\epsilon-\epsilon_\theta(x_t,t)\|^2$
- CFG: $\hat\epsilon=\epsilon_u+w(\epsilon_c-\epsilon_u)$ · Flow matching: regress $v_\theta(x_t,t)$ onto $x_1-x_0$

## RL (→ 11)
- Return $G_t=\sum_k\gamma^kr_{t+k}$ · Bellman: $Q^*(s,a)=\mathbb E[r+\gamma\max_{a'}Q^*(s',a')]$
- Q-learning: $Q\leftarrow Q+\alpha[r+\gamma\max Q(s',\cdot)-Q]$
- Policy gradient: $\nabla J=\mathbb E[\nabla\log\pi_\theta(a|s)\,A(s,a)]$
- PPO: $\mathbb E[\min(r_tA_t,\ \text{clip}(r_t,1\pm\epsilon)A_t)]$, $r_t=\pi_\theta/\pi_{old}$
