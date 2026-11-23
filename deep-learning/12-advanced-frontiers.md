# 12 · Advanced Frontiers & Specializations
> **Goal:** move from *student* to *researcher/engineer*: read papers, go deep in one area. · **Time:** open-ended · **Needs:** 08 (+ 10/11 for some tracks)

There's no skip test here. Pick **1–2 tracks** that excite you and go deep, and treat the rest as awareness. Each track explains its core ideas on this page, then gives the ⭐ entry point for going further.

> [!GOAL]
> By the end of this chapter you can:
>
> - read a research paper efficiently and reproduce its key result;
> - explain the central idea of each frontier area in a few sentences (theory, interpretability, scientific ML, systems, self-supervised learning, graphs and state-space models);
> - choose a specialization and know exactly where to start.

---

## How to read papers (do this first)

> [!DEF] The three-pass method
> (Keshav, ["How to Read a Paper"](https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf))
>
> 1. **10 minutes:** title, abstract, figures, conclusion. What problem, what claim?
> 2. **1 hour:** the main method, skipping proofs. Could you explain it to a friend?
> 3. **Re-derive and re-implement** the key result at small scale.

> [!KEY] Reimplement > reread
> The best way to understand a paper is to reproduce its key result at small scale. Keep a **paper log** in `progress.md`: one line per paper (problem → idea → result → my doubt).

> [!LEARN]
> Find papers and code: [arXiv](https://arxiv.org/) (cs.LG, cs.CL, cs.CV), [Hugging Face Papers](https://huggingface.co/papers) (daily trending, with linked code), [alphaXiv](https://www.alphaxiv.org/) (discussion), and authors' blogs.

---

## Track A · Deep learning theory 🔭
A great fit for a math/physics mind: why does deep learning work at all?

> [!DEF] Generalization puzzles
> - Over-parameterized networks can fit **random labels** perfectly, yet generalize on real data, so classical "count the parameters" bounds can't explain them.
> - **Double descent:** as model size grows, test error first follows the classic U-curve, peaks near the point where the model can *just* fit the training data, then falls again.
> - **Grokking:** on some small tasks, a network memorizes the training set and only much later, with continued training and weight decay, suddenly generalizes.
> - **Implicit bias:** gradient descent itself prefers certain solutions (e.g. low-norm or "flat" minima) among the many that fit the data.

> [!FORMULA] Neural tangent kernel (NTK)
> $$\Theta(\mathbf x,\mathbf x') = \nabla_\theta f_\theta(\mathbf x)\cdot\nabla_\theta f_\theta(\mathbf x')$$
> In the infinite-width limit with standard initialization, $\Theta$ stays fixed during training, and the network behaves like **kernel regression** (the "lazy" regime: features don't change). Real networks *do* learn features; the **μP / mean-field** parameterization keeps feature learning at large width and lets you transfer tuned hyperparameters from small to large models.

> [!DEF] Optimization landscape
> High-dimensional losses have far more **saddle points** than bad local minima. Training often runs at the **edge of stability**, where the sharpness (largest Hessian eigenvalue, module 01) hovers around $2/\eta$.

> [!LEARN]
> ⭐ **[Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/)** ch. 20 ("Why does deep learning work?") → **[The Principles of Deep Learning Theory (Roberts, Yaida & Hanin)](https://arxiv.org/abs/2106.10165)** (effective field theory for neural nets, written by physicists). Also: [Deep Learning, Bishop & Bishop (2024)](https://www.bishopbook.com/), [Telgarsky's Deep Learning Theory notes](https://mjt.cs.illinois.edu/dlt/).

## Track B · Mechanistic interpretability & AI safety
Reverse-engineer *how* a trained network computes, the way you'd reverse-engineer a compiled program.

> [!DEF] Core concepts
> - **Circuits:** small subgraphs of a network (specific heads and neurons) that implement an understandable algorithm.
> - **Induction heads:** a two-head circuit in transformers that finds an earlier occurrence of the current token and copies what came next ("…A B … A → B"). It is a key mechanism of in-context learning.
> - **Superposition:** networks represent **more features than they have neurons** by storing them as nearly-orthogonal directions, so single neurons are often "polysemantic".
> - **Attribution graphs:** trace which features caused a given output.

> [!FORMULA] Sparse autoencoder (SAE)
> To pull interpretable features out of superposition, train an overcomplete autoencoder on a layer's activations $\mathbf x$ with a sparsity penalty:
> $$\mathbf f = \mathrm{ReLU}(W_e\mathbf x+\mathbf b_e),\qquad \mathcal L = \|\mathbf x - W_d\mathbf f\|^2 + \lambda\|\mathbf f\|_1$$
> Each column of $W_d$ is then a candidate "feature direction", often with a clear meaning.

> [!DEF] Safety
> Alignment (getting systems to do what we intend), reward hacking (module 11), scalable oversight (supervising systems smarter than the supervisor), and evaluations for dangerous capabilities.

> [!LEARN]
> ⭐ **[ARENA curriculum](https://www.arena.education/)** (hands-on, free notebooks) + **[TransformerLens](https://github.com/TransformerLensOrg/TransformerLens)**. Read: [Transformer Circuits Thread](https://transformer-circuits.pub/) (A Mathematical Framework, Toy Models of Superposition, Scaling Monosemanticity), [Neel Nanda's getting-started guide](https://www.neelnanda.io/mechanistic-interpretability/getting-started), [BlueDot Impact courses](https://bluedot.org/).

## Track C · Scientific ML & physics-informed DL 🔭

> [!FORMULA] Physics-informed neural networks (PINNs)
> Fit a network $u_\theta(x,t)$ to a solution of a differential equation $\mathcal N[u]=0$ by putting the equation itself into the loss, evaluated at random "collocation" points:
> $$\mathcal L = \underbrace{\sum_i\big(u_\theta(x_i,t_i)-u_i\big)^2}_{\text{data / boundary conditions}} + \lambda\underbrace{\sum_j\big(\mathcal N[u_\theta](x_j,t_j)\big)^2}_{\text{PDE residual}}$$
> Derivatives in $\mathcal N$ come from autodiff.

> [!DEF] Neural operators
> Learn a map between **function spaces** (e.g. from an initial condition to the solution at time $T$), so one trained model solves a whole family of PDE instances. Examples: Fourier Neural Operator (FNO), DeepONet.

> [!FORMULA] Equivariance
> A network $f$ is **equivariant** to a group of transformations $g$ (rotations, translations, permutations) if
> $$f(g\cdot x) = g\cdot f(x)$$
> CNNs are translation-equivariant (module 06); equivariant GNNs build in rotations for molecules and particle physics. **Geometric deep learning** organizes architectures by their symmetries.

> [!DEF] Energy-conserving and continuous-time models
> **Neural ODEs** treat depth as continuous time, $\dot{\mathbf h}=f_\theta(\mathbf h,t)$. **Hamiltonian / Lagrangian neural networks** learn an energy function and derive the dynamics from it, so energy is conserved by construction. Applications: AlphaFold (proteins), GraphCast (weather), ML for particle physics and cosmology, molecular dynamics potentials.

> [!LEARN]
> ⭐ **[Geometric Deep Learning (Bronstein et al.)](https://geometricdeeplearning.com/)** (book + lectures) and **[Steve Brunton's Physics-Informed ML lectures (YouTube)](https://www.youtube.com/@Eigensteve)**. Also [DeepXDE](https://github.com/lululxvi/deepxde) for PINNs.

## Track D · ML systems, GPUs & efficiency 💻
Where your C++ shines.

> [!DEF] GPU fundamentals
> A GPU has many **streaming multiprocessors (SMs)**, each running groups of 32 threads (**warps**) in lockstep. Memory is a hierarchy, from large and slow to small and fast: HBM (GPU main memory) → L2 cache → shared memory/SRAM (per SM) → registers. Fast kernels keep data in the fast levels as long as possible.

> [!FORMULA] Roofline model
> **Arithmetic intensity** $I$ = FLOPs performed per byte moved from memory. Then
> $$\text{attainable FLOP/s} = \min\big(\text{peak FLOP/s},\ \text{memory bandwidth}\times I\big)$$
> Low-intensity operations (element-wise ops, LLM decoding at batch 1, module 09) are **memory-bound**; large matrix multiplications are **compute-bound**. Kernel fusion and FlashAttention raise intensity.

> [!DEF] Distributed training
> - **Data parallel (DDP):** every GPU holds the whole model and a different slice of the batch; gradients are averaged with an **all-reduce**.
> - **FSDP / ZeRO:** shard parameters, gradients and optimizer state across GPUs to fit bigger models.
> - **Tensor parallel:** split individual matrix multiplications across GPUs. **Pipeline parallel:** put different layers on different GPUs.

> [!DEF] Efficiency techniques
> Quantization (int8/int4, GPTQ/AWQ), pruning, distillation into smaller models, speculative decoding (module 09), `torch.compile`, and custom kernels in **CUDA** (C++) or **Triton** (Python): tiled matmul, fused softmax, FlashAttention.

> [!LEARN]
> ⭐ **[Programming Massively Parallel Processors (Hwu, Kirk, El Hajj)](https://www.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0)** + the **[GPU MODE](https://github.com/gpu-mode/lectures)** lecture series & Discord. Also: [How to Scale Your Model (Google DeepMind, JAX/TPU book)](https://jax-ml.github.io/scaling-book/), [Triton tutorials](https://triton-lang.org/main/getting-started/tutorials/index.html), [Horace He: Making Deep Learning Go Brrrr](https://horace.io/brrr_intro.html), [The Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook), [llm.c (Karpathy, GPT-2 in raw C/CUDA)](https://github.com/karpathy/llm.c).

## Track E · Self-supervised, multimodal & representation learning
Learn useful representations without labels, by inventing a prediction task from the data itself.

> [!FORMULA] Contrastive learning (InfoNCE)
> Make two augmented views of the same example (a positive pair) close in embedding space and different examples far apart:
> $$\mathcal L_i = -\log\frac{\exp(\mathrm{sim}(\mathbf z_i,\mathbf z_i^+)/\tau)}{\sum_{k}\exp(\mathrm{sim}(\mathbf z_i,\mathbf z_k)/\tau)}$$
> $\mathrm{sim}$ is cosine similarity, $\tau$ a temperature, and the sum runs over the positive and all negatives in the batch. It is a softmax classification: "which of these is my partner?" (SimCLR, MoCo.) **CLIP** applies the same loss to matching images with their captions.

> [!DEF] Other self-supervised objectives
> **Masked modelling:** hide parts of the input and predict them (BERT for text, MAE for images). **Self-distillation:** a student network matches a slowly updated teacher on different views (DINO / DINOv2). **JEPA:** predict the *representation* of a hidden part rather than its pixels.

> [!DEF] Multimodal models
> Vision-language models (LLaVA-style) connect a vision encoder to an LLM through a small projector, so image patches become tokens the LLM can read. Similar recipes give audio (Whisper) and video models.

> [!LEARN]
> ⭐ **[Lilian Weng: Contrastive Representation Learning](https://lilianweng.github.io/posts/2021-05-31-contrastive/)** + the [CLIP paper](https://arxiv.org/abs/2103.00020). Course: [CMU Multimodal ML](https://cmu-multicomp-lab.github.io/mmml-course/fall2023/).

## Track F · Graphs & beyond-transformer architectures

> [!FORMULA] Graph neural networks (message passing)
> Each node updates its vector from its own state and an aggregate (sum, mean or max, written $\bigoplus$) of messages from its neighbours $N(v)$:
> $$\mathbf h_v' = \phi\Big(\mathbf h_v,\ \bigoplus_{u\in N(v)}\psi(\mathbf h_u)\Big)$$
> Stack $k$ layers and each node sees its $k$-hop neighbourhood. Variants: GCN, GAT (attention over neighbours), graph transformers. Used for molecules, social networks and physics simulation.

> [!FORMULA] State-space models (SSMs)
> A linear recurrence, discretized from a continuous linear ODE:
> $$\mathbf h_t = \bar A\,\mathbf h_{t-1}+\bar B\,\mathbf x_t,\qquad \mathbf y_t = C\,\mathbf h_t$$
> Because it is linear, it can be computed in parallel during training (as a convolution or a parallel scan) and as a cheap recurrence during generation: **linear** in sequence length, unlike attention's $T^2$. **Mamba** makes $\bar A,\bar B,C$ depend on the input (a *selective* SSM), so it can choose what to remember. Hybrids mix SSM and attention layers. 🔭 Discretized linear ODEs.

> [!LEARN]
> ⭐ **[Stanford CS224W: ML with Graphs](https://web.stanford.edu/class/cs224w/)** + **[PyTorch Geometric](https://pytorch-geometric.readthedocs.io/)**. For SSMs: [The Annotated S4](https://srush.github.io/annotated-s4/), the [Mamba paper](https://arxiv.org/abs/2312.00752).

## Track G · Other frameworks worth knowing

> [!DEF] JAX
> NumPy with composable function transformations: `grad` (derivatives), `jit` (compile with XLA), `vmap` (automatic batching) and `pmap`/sharding (multiple devices). Functional style: models are pure functions of their parameters. Popular in research and on TPUs. Try it once you know PyTorch well: [JAX docs](https://docs.jax.dev/).

---

## Becoming a contributor (high-school senior edition)
- **Portfolio:** 3–5 polished GitHub projects with READMEs and results (e.g. GPT from scratch, a DDPM, a paper reproduction). These count more than certificates.
- **Competitions:** the **[International Olympiad in AI (IOAI)](https://ioai-official.org/)** is a science olympiad *for high-school students*, so it's worth checking whether your country runs a national selection. Also [Kaggle](https://www.kaggle.com/) and [AIcrowd](https://www.aicrowd.com/).
- **Write:** blog your reimplementations. Teaching forces understanding (the Feynman technique).
- **Community:** EleutherAI, GPU MODE, and Hugging Face Discords. Open-source contributions (docs, bug fixes) to `transformers`, `diffusers`, `TransformerLens`.
- **Research programs for students:** look for summer research programs at universities, MATS / ARENA (safety), and reaching out to grad students with a concrete reproduction you've done.
