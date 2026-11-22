# Resources: the curated master list
**Rule:** ⭐ = the main resource, and the only one you *need*. Everything else is optional depth or an alternative explanation if the ⭐ doesn't click. All ⭐ items are **free** unless marked 💲.

## The core stack (if you only use five things)
1. ⭐ **[Karpathy: Neural Networks Zero to Hero](https://karpathy.ai/zero-to-hero.html)**: build everything from scratch (modules 04, 07, 08, 09)
2. ⭐ **[Understanding Deep Learning (Prince, 2023)](https://udlbook.github.io/udlbook/)**: the theory textbook (all modules)
3. ⭐ **[Dive into Deep Learning (d2l.ai)](https://d2l.ai/)**: the textbook with runnable PyTorch code (05–07)
4. ⭐ **[Stanford CS231n](https://cs231n.stanford.edu/)** → **[CS336](https://stanford-cs336.github.io/)**: university-grade assignments (06, 09)
5. ⭐ **[Mathematics for Machine Learning](https://mml-book.github.io/)**: math, only when you need it (01)

## Books (free online unless 💲)
| Book | Best for |
|---|---|
| [Understanding Deep Learning, Prince](https://udlbook.github.io/udlbook/) | modern, clear, illustrated. **Best overall DL textbook** |
| [Dive into Deep Learning, Zhang et al.](https://d2l.ai/) | code + math side by side |
| [Mathematics for Machine Learning, Deisenroth et al.](https://mml-book.github.io/) | linear algebra, calculus, and probability for ML |
| [Deep Learning: Foundations and Concepts, Bishop & Bishop](https://www.bishopbook.com/) | rigorous, probabilistic view (free online viewing) |
| [Deep Learning, Goodfellow, Bengio, Courville](https://www.deeplearningbook.org/) | classic (2016). Part I math and Part II are still great |
| [Probabilistic Machine Learning, Murphy](https://probml.github.io/pml-book/) | encyclopedic reference (Book 1 + 2) |
| [Neural Networks and Deep Learning, Nielsen](http://neuralnetworksanddeeplearning.com/) | gentlest backprop introduction |
| [An Introduction to Statistical Learning (ISLP)](https://www.statlearning.com/) | classical ML with Python |
| [Reinforcement Learning, Sutton & Barto](http://incompleteideas.net/book/the-book-2nd.html) | RL foundations |
| [The Principles of Deep Learning Theory](https://arxiv.org/abs/2106.10165) | physics-style DL theory (advanced) |
| [Geometric Deep Learning, Bronstein et al.](https://geometricdeeplearning.com/) | symmetry, GNNs, equivariance |
| [How to Scale Your Model (DeepMind)](https://jax-ml.github.io/scaling-book/) | LLM systems and parallelism |
| 💲 Build a Large Language Model (From Scratch), Raschka | LLMs step by step ([free code](https://github.com/rasbt/LLMs-from-scratch)) |
| 💲 Programming Massively Parallel Processors, Hwu et al. | CUDA / GPU programming |

## Courses (lectures free on YouTube or the course site)
| Course | Module | Notes |
|---|---|---|
| [3Blue1Brown: linear algebra & neural nets](https://www.3blue1brown.com/) | 01, 04, 08 | intuition first |
| [ML Specialization (Andrew Ng)](https://www.coursera.org/specializations/machine-learning-introduction) | 03 | free audit / financial aid options vary, check the page |
| [Stanford CS229: Machine Learning](https://cs229.stanford.edu/) | 03 | math-heavy |
| [fast.ai: Practical Deep Learning](https://course.fast.ai/) | 05–06 | top-down alternative |
| [Stanford CS231n: CNNs for Visual Recognition](https://cs231n.stanford.edu/) | 06 | assignments are gold |
| [Stanford CS224n: NLP with Deep Learning](https://web.stanford.edu/class/cs224n/) | 07–08 | |
| [Stanford CS336: Language Modeling from Scratch](https://stanford-cs336.github.io/) | 09 | hardest and best LLM course |
| [Hugging Face Learn (LLM, Diffusion, Deep RL courses)](https://huggingface.co/learn) | 09–11 | practical ecosystem |
| [MIT 6.S184: Flow Matching & Diffusion](https://diffusion.csail.mit.edu/) | 10 | SDE/ODE view |
| [OpenAI Spinning Up](https://spinningup.openai.com/) | 11 | deep RL bridge |
| [UC Berkeley CS285: Deep RL](https://rail.eecs.berkeley.edu/deeprlcourse/) | 11 | advanced |
| [Stanford CS224W: ML with Graphs](https://web.stanford.edu/class/cs224w/) | 12 | GNNs |
| [ARENA](https://www.arena.education/) | 12 | interpretability, hands-on |
| [GPU MODE lectures](https://github.com/gpu-mode/lectures) | 12 | CUDA/Triton |
| [MIT Missing Semester](https://missing.csail.mit.edu/) | 02 | shell, git, tooling |

## Blogs & interactive explainers
- [Lilian Weng](https://lilianweng.github.io/): deep, well-cited surveys (diffusion, RL, LLMs, agents)
- [Andrej Karpathy's blog](https://karpathy.github.io/): Recipe for Training NNs, RNN effectiveness
- [colah's blog](https://colah.github.io/): LSTMs, visual explanations
- [Jay Alammar](https://jalammar.github.io/): the Illustrated Transformer / GPT-2 / BERT
- [Distill.pub](https://distill.pub/): interactive research articles (archived, still excellent)
- [Transformer Circuits Thread](https://transformer-circuits.pub/): interpretability research
- [Sebastian Raschka's Ahead of AI](https://magazine.sebastianraschka.com/): LLM research digests
- [Yang Song's blog](https://yang-song.net/blog/): score-based generative models
- Interactive: [TensorFlow Playground](https://playground.tensorflow.org/) · [CNN Explainer](https://poloclub.github.io/cnn-explainer/) · [Transformer Explainer](https://poloclub.github.io/transformer-explainer/)

## Code to read (well-written references)
- [micrograd](https://github.com/karpathy/micrograd) · [nanoGPT](https://github.com/karpathy/nanoGPT) · [build-nanogpt](https://github.com/karpathy/build-nanogpt) · [nanochat](https://github.com/karpathy/nanochat) · [llm.c](https://github.com/karpathy/llm.c)
- [CleanRL](https://github.com/vwxyzjn/cleanrl): single-file RL algorithms
- [timm](https://github.com/huggingface/pytorch-image-models): vision models · [diffusers](https://github.com/huggingface/diffusers) · [transformers](https://github.com/huggingface/transformers) · [trl](https://github.com/huggingface/trl)
- [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/) · [The Annotated S4](https://srush.github.io/annotated-s4/)

## Tools
- **Compute:** [Google Colab](https://colab.research.google.com/), [Kaggle Notebooks](https://www.kaggle.com/code) (free GPUs) · rent: Lambda, RunPod, Vast.ai
- **Tracking:** [Weights & Biases](https://wandb.ai/) (free for personal use), TensorBoard
- **Data/models:** [Hugging Face Hub](https://huggingface.co/)
- **Papers:** [arXiv](https://arxiv.org/), [Hugging Face Papers](https://huggingface.co/papers), [alphaXiv](https://www.alphaxiv.org/), [Semantic Scholar](https://www.semanticscholar.org/)

---

## Paper reading order
Read each one **after** the module that covers it, when it'll feel easy. ✅ = reimplement a small version.

**Foundations**
1. [Learning representations by back-propagating errors (Rumelhart et al., 1986)](https://www.nature.com/articles/323533a0): backprop (just skim)
2. [ImageNet Classification with Deep CNNs, AlexNet (2012)](https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
3. [Adam (2014)](https://arxiv.org/abs/1412.6980) · [Decoupled Weight Decay, AdamW (2017)](https://arxiv.org/abs/1711.05101)
4. [Dropout (2014)](https://jmlr.org/papers/v15/srivastava14a.html) · [Batch Normalization (2015)](https://arxiv.org/abs/1502.03167) · [Layer Normalization (2016)](https://arxiv.org/abs/1607.06450)
5. ✅ [Deep Residual Learning, ResNet (2015)](https://arxiv.org/abs/1512.03385)

**Sequences → Transformers**
6. [word2vec (2013)](https://arxiv.org/abs/1301.3781) · [Seq2Seq (2014)](https://arxiv.org/abs/1409.3215) · [Bahdanau Attention (2014)](https://arxiv.org/abs/1409.0473)
7. ✅ [Attention Is All You Need (2017)](https://arxiv.org/abs/1706.03762)
8. [BERT (2018)](https://arxiv.org/abs/1810.04805) · ✅ [GPT-2 (2019)](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) · [GPT-3 (2020)](https://arxiv.org/abs/2005.14165)
9. [ViT (2020)](https://arxiv.org/abs/2010.11929) · [RoFormer / RoPE (2021)](https://arxiv.org/abs/2104.09864) · [FlashAttention (2022)](https://arxiv.org/abs/2205.14135)

**LLMs**
10. [Scaling Laws (Kaplan, 2020)](https://arxiv.org/abs/2001.08361) · [Chinchilla (2022)](https://arxiv.org/abs/2203.15556)
11. [InstructGPT / RLHF (2022)](https://arxiv.org/abs/2203.02155) · ✅ [LoRA (2021)](https://arxiv.org/abs/2106.09685) · [DPO (2023)](https://arxiv.org/abs/2305.18290)
12. [Llama (2023)](https://arxiv.org/abs/2302.13971) · [Chain-of-Thought (2022)](https://arxiv.org/abs/2201.11903) · [RAG (2020)](https://arxiv.org/abs/2005.11401)
13. [Mixtral / MoE (2024)](https://arxiv.org/abs/2401.04088) · [DeepSeek-R1 (2025)](https://arxiv.org/abs/2501.12948) (RL for reasoning, GRPO)

**Generative**
14. ✅ [VAE (2013)](https://arxiv.org/abs/1312.6114) · [GAN (2014)](https://arxiv.org/abs/1406.2661)
15. ✅ [DDPM (2020)](https://arxiv.org/abs/2006.11239) · [Score-based SDEs (2020)](https://arxiv.org/abs/2011.13456) · [Classifier-Free Guidance (2022)](https://arxiv.org/abs/2207.12598)
16. [Latent Diffusion (2021)](https://arxiv.org/abs/2112.10752) · [DiT (2022)](https://arxiv.org/abs/2212.09748) · ✅ [Flow Matching (2022)](https://arxiv.org/abs/2210.02747)
17. [CLIP (2021)](https://arxiv.org/abs/2103.00020)

**RL**
18. ✅ [DQN, Atari (2013)](https://arxiv.org/abs/1312.5602) · [AlphaGo Zero (2017)](https://www.nature.com/articles/nature24270) · ✅ [PPO (2017)](https://arxiv.org/abs/1707.06347)

**Frontier/theory (pick by track)**
19. [Double Descent (2019)](https://arxiv.org/abs/1912.02292) · [NTK (2018)](https://arxiv.org/abs/1806.07572) · [Grokking (2022)](https://arxiv.org/abs/2201.02177)
20. [A Mathematical Framework for Transformer Circuits (2021)](https://transformer-circuits.pub/2021/framework/index.html) · [Toy Models of Superposition (2022)](https://transformer-circuits.pub/2022/toy_model/index.html)
21. [Mamba (2023)](https://arxiv.org/abs/2312.00752) · [PINNs (2017)](https://arxiv.org/abs/1711.10561) · [Fourier Neural Operator (2020)](https://arxiv.org/abs/2010.08895)
