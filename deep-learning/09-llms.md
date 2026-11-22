# 09 · Large Language Models
> **Goal:** understand the full LLM pipeline (data → pretraining → post-training → inference → evaluation) and be able to do each step at small scale. · **Time:** 25–40 h · **Needs:** 08

## Skip test
- [ ] Explain how BPE tokenization is trained, and give two LLM quirks it causes.
- [ ] State what **scaling laws** predict, and the Chinchilla rule of thumb (~20 tokens per parameter).
- [ ] Explain the pipeline: pretraining → SFT → preference tuning (RLHF / DPO) → (RL for reasoning).
- [ ] Explain **LoRA** and why it cuts fine-tuning memory.
- [ ] Explain the **KV cache** and why inference is memory-bandwidth-bound.
- [ ] Explain RAG and when to use it instead of fine-tuning.
- [ ] Explain why benchmark scores can mislead (contamination, saturation).

## Core ideas

### Data & tokenization
- **BPE:** start from bytes and repeatedly merge the most frequent adjacent pair → a vocabulary of ~32k–200k tokens.
  - Quirks: odd arithmetic (numbers split strangely), letter-counting failures, weaker non-English efficiency, and the space-before-word trick.
- **Pretraining data:** trillions of tokens of web text (filtered, deduplicated), code, books, math. **Data quality > data quantity** (e.g. FineWeb-Edu).

### Pretraining
- Next-token cross-entropy on a decoder-only transformer. **Loss in nats; perplexity** $= e^{\text{loss}}$.
- **Scaling laws** (Kaplan 2020, **Chinchilla** 2022): loss falls as a power law in parameters $N$, data $D$, and compute $C \approx 6ND$ FLOPs. Compute-optimal is about $D \approx 20N$ (modern models train far *past* this, because smaller models are cheaper to serve).
- 🔭 Power laws, universality, and "emergence" debates resemble critical phenomena in statistical physics.
- **Architecture upgrades (Llama-style):** RMSNorm, SwiGLU, RoPE, grouped-query attention (GQA), no biases. **Mixture-of-Experts (MoE):** each token activates only a few expert MLPs, so there are many params but cheap compute per token.
- **Systems:** data/tensor/pipeline parallelism, FSDP/ZeRO, bf16, FlashAttention (see module 12).

### Post-training (turning a base model into an assistant)
1. **SFT (supervised fine-tuning):** train on (instruction, good response) pairs. Mostly teaches *format and behavior*.
2. **Preference tuning:**
   - **RLHF:** train a reward model on human comparisons → optimize the policy with **PPO** plus a KL penalty to the SFT model (see module 11).
   - **DPO:** optimizes preferences directly with a classification-style loss, no separate reward model or RL loop. Simpler, and very common.
3. **RL for reasoning:** RL with *verifiable rewards* (math answers, unit tests) produces long chain-of-thought "thinking" models (e.g. GRPO, used by DeepSeek-R1). **This is the research frontier.**
- **Parameter-efficient fine-tuning:** **LoRA** freezes $W$ and learns $W + BA$ with rank $r \ll d$ (≈0.1–1% of params). **QLoRA** = LoRA on a 4-bit-quantized base model, so it can run on a single consumer GPU.

### Inference
- **Autoregressive decoding:** one forward pass per token. The **KV cache** stores past keys and values so each step is $O(T)$, not $O(T^2)$.
- It's bottlenecked by **memory bandwidth** (reading the weights + cache each token), not FLOPs. Hence **quantization** (int8/int4), **speculative decoding**, batching (vLLM, PagedAttention).
- **Sampling:** temperature, top-k, top-p (nucleus). Low $T$ = deterministic, high $T$ = creative.

### Using & extending LLMs
- **Prompting:** few-shot examples, chain-of-thought, structured outputs.
- **RAG:** retrieve relevant documents (embeddings + vector search) and put them in the context. Use it for *knowledge*; use fine-tuning for *behavior/style*.
- **Agents & tool use:** the LLM calls functions/tools in a loop (code execution, search).
- **Evaluation:** perplexity; benchmarks (MMLU, GSM8K, HumanEval, SWE-bench…); LLM-as-judge; **always build your own task-specific eval**. Watch for test-set contamination.
- **Safety & alignment:** jailbreaks, reward hacking, honesty, interpretability (module 12). This is a serious open problem worth caring about.

## Learn from
- ⭐ **[Stanford CS336: Language Modeling from Scratch](https://stanford-cs336.github.io/)**: lectures + assignments (tokenizer, transformer, systems, scaling, data, alignment). The deepest modern course. Do it after nanoGPT.
- ⭐ **Karpathy:** [Let's build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE) · [Deep Dive into LLMs like ChatGPT](https://www.youtube.com/watch?v=7xTGNNLPyMI) · [nanochat](https://github.com/karpathy/nanochat) (a full ChatGPT-style pipeline, from tokenizer through SFT/RL to a web UI, in one small repo).
- **[Hugging Face LLM Course](https://huggingface.co/learn/llm-course)**: the `transformers`, `datasets`, and PEFT ecosystem in practice.
- **Build a Large Language Model (From Scratch)**, Sebastian Raschka (book + [repo](https://github.com/rasbt/LLMs-from-scratch)).
- **[The Smol Training Playbook (HF)](https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook)** and **[The Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook)**: how real LLMs get trained.
- Key papers (in order): GPT-2 → GPT-3 → Scaling Laws → Chinchilla → InstructGPT → LoRA → Llama → DPO → DeepSeek-R1. Links in [resources.md](resources.md#paper-reading-order).
- Stay current: [Sebastian Raschka's newsletter](https://magazine.sebastianraschka.com/), [Lilian Weng's blog](https://lilianweng.github.io/).

## Build
1. **BPE tokenizer from scratch** (train, encode, decode). Match GPT-2's tokenizer (`tiktoken`) output.
2. **Fine-tune with LoRA** a small open model (~0.5–3B, e.g. Qwen/Llama/SmolLM) on a custom instruction dataset in Colab. Evaluate before and after on your own eval set.
3. **DPO** on a small preference dataset with Hugging Face `trl`. Compare outputs with the SFT model.
4. **RAG app:** embed your own notes (e.g. this repo!), retrieve, answer questions with citations.
5. Stretch: implement a **KV cache** in your nanoGPT and measure the tokens/sec speedup. Run **nanochat** end to end.

## Traps
- Fine-tuning to add *knowledge* (use RAG) instead of *behavior*.
- Trusting public benchmarks over your own evals.
- Chasing every new model release. Fundamentals change slowly, so read papers selectively.

## Done when
- [ ] Tokenizer matches tiktoken · [ ] LoRA fine-tune shows a measurable gain on your eval · [ ] you can explain the whole ChatGPT pipeline end to end
