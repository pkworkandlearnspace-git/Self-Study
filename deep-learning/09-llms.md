# 09 · Large Language Models
> **Goal:** understand the full LLM pipeline (data → pretraining → post-training → inference → evaluation) and be able to do each step at small scale. · **Time:** 25–40 h · **Needs:** 08

> [!GOAL]
> By the end of this chapter you can:
>
> - train a **BPE tokenizer** and explain the odd behaviours tokenization causes;
> - explain pretraining, compute ($C\approx6ND$) and **scaling laws** (Chinchilla's ~20 tokens per parameter);
> - walk through post-training: **SFT → reward model → RLHF / DPO → RL for reasoning**;
> - fine-tune cheaply with **LoRA / QLoRA**;
> - explain why inference is memory-bandwidth-bound, and the tricks that speed it up;
> - choose between prompting, **RAG** and fine-tuning, and evaluate an LLM honestly.

## Skip test
- [ ] Explain how BPE tokenization is trained, and give two LLM quirks it causes.
- [ ] State what **scaling laws** predict, and the Chinchilla rule of thumb (~20 tokens per parameter).
- [ ] Explain the pipeline: pretraining → SFT → preference tuning (RLHF / DPO) → (RL for reasoning).
- [ ] Explain **LoRA** and why it cuts fine-tuning memory.
- [ ] Explain the **KV cache** and why inference is memory-bandwidth-bound.
- [ ] Explain RAG and when to use it instead of fine-tuning.
- [ ] Explain why benchmark scores can mislead (contamination, saturation).

## 1 · Tokenization

> [!DEF] Byte-pair encoding (BPE)
> A way to build a subword vocabulary from data:
>
> 1. Start with the 256 possible **bytes** as tokens (so any text can be encoded).
> 2. Count every pair of adjacent tokens in the training corpus.
> 3. **Merge** the most frequent pair into a new token and record the merge.
> 4. Repeat until the vocabulary reaches the target size (~32k–200k tokens).
>
> To encode new text, apply the recorded merges in order. Frequent words become single tokens; rare words split into pieces.

> [!EXAMPLE] Two BPE merges
> Corpus: `low low low lower newest`. The most frequent adjacent pair is `l o` (4 times) → new token `lo`. Next, `lo w` (4 times) → `low`. Now "low" is one token, while "newest" is still split into smaller pieces.

> [!WARN] Quirks caused by tokenization
> - **Arithmetic and digits:** numbers split into irregular chunks ("1234" might be "12" + "34"), making digit-level reasoning harder.
> - **Spelling and letter counting:** the model sees "strawberry" as a few tokens, not letters.
> - **Other languages:** text in languages under-represented in the tokenizer's training data costs more tokens per word (slower, more expensive, shorter effective context).
> - **Spaces:** "hello" and " hello" are different tokens.

> [!VIDEO] zduSFxRajkE | Let's build the GPT Tokenizer | Andrej Karpathy · 2 h 13 min

## 2 · Pretraining and scaling laws

> [!DEF] Pretraining
> Train a decoder-only transformer (module 08) with next-token cross-entropy on trillions of tokens of filtered and deduplicated web text, code, books and math. The result is a **base model**: it continues text, but it isn't yet a helpful assistant. **Data quality matters more than data quantity** (e.g. FineWeb-Edu keeps the most "educational" web pages).

> [!FORMULA] Training compute
> $$C \approx 6\,N\,D\ \text{FLOPs}$$
> for a model with $N$ parameters trained on $D$ tokens: about $2N$ FLOPs per token for the forward pass and $4N$ for the backward pass.

> [!DEF] Scaling laws
> Loss falls smoothly as a **power law** in the number of parameters $N$, the amount of data $D$ and the compute $C$ (Kaplan et al., 2020). **Chinchilla** (Hoffmann et al., 2022) found that for a fixed compute budget, $N$ and $D$ should grow together, at roughly
> $$D \approx 20\,N\ \text{(tokens per parameter)}$$
> Modern models train far *past* this point, because a smaller model trained longer is cheaper to serve to millions of users.

> [!EXAMPLE] Chinchilla's own numbers
> 70B parameters × 1.4T tokens (= 20 tokens per parameter). Compute $\approx6\cdot70\times10^9\cdot1.4\times10^{12}\approx5.9\times10^{23}$ FLOPs. It beat the 280B-parameter Gopher, trained with the same compute on far fewer tokens.

> [!INTUITION] Physics view
> Power laws, universality and debates about sudden "emergent" abilities look a lot like critical phenomena in statistical physics.

> [!DEF] Llama-style architecture upgrades
> Compared with GPT-2: **RMSNorm** (module 05), **SwiGLU** MLPs, **RoPE** positions (module 08), **grouped-query attention** (fewer key/value heads, a smaller KV cache), and no bias terms. **Mixture-of-Experts (MoE)** layers replace one MLP with many "expert" MLPs and a router that sends each token to only a few of them: many parameters, but cheap compute per token.

> [!NOTE] Systems
> Training at this scale needs data, tensor and pipeline parallelism, sharded optimizers (FSDP/ZeRO), bf16 and FlashAttention across thousands of GPUs (module 12).

## 3 · Post-training: from base model to assistant

> [!DEF] Supervised fine-tuning (SFT)
> Continue training on (instruction, good response) pairs written or curated by people, with the loss applied only to the response tokens. SFT mostly teaches **format and behaviour** (answering, following instructions, chat turns), not new knowledge.

> [!FORMULA] Reward model (Bradley–Terry)
> Collect comparisons: for a prompt $x$, people say which of two responses, $y_w$ (winner) or $y_l$ (loser), is better. Train a model $r_\phi(x,y)$ so that
> $$P(y_w\succ y_l) = \sigma\big(r_\phi(x,y_w)-r_\phi(x,y_l)\big),\qquad \mathcal L = -\log\sigma\big(r_\phi(x,y_w)-r_\phi(x,y_l)\big)$$

> [!FORMULA] RLHF objective
> Optimize the policy (the LLM) $\pi_\theta$ to get high reward without drifting too far from the SFT model $\pi_{\text{ref}}$:
> $$\max_\theta\ \mathbb E_{y\sim\pi_\theta(\cdot\mid x)}\big[r_\phi(x,y)\big] - \beta\,D_{KL}\big(\pi_\theta(\cdot\mid x)\,\|\,\pi_{\text{ref}}(\cdot\mid x)\big)$$
> usually with **PPO** (module 11). The KL term stops the model from exploiting flaws in the reward model (**reward hacking**).

> [!FORMULA] DPO (direct preference optimization)
> Skip the reward model and the RL loop: train directly on the preference pairs with a classification-style loss
> $$\mathcal L_{\text{DPO}} = -\log\sigma\Big(\beta\Big[\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\text{ref}}(y_w\mid x)} - \log\frac{\pi_\theta(y_l\mid x)}{\pi_{\text{ref}}(y_l\mid x)}\Big]\Big)$$
> It raises the probability of preferred answers relative to the reference model and lowers the rejected ones. Simpler and very common.

> [!DEF] RL for reasoning (verifiable rewards)
> For tasks with checkable answers (math results, passing unit tests), reward the model only for being right and let RL discover long **chain-of-thought** reasoning on its own. **GRPO** (used by DeepSeek-R1) samples a group of answers per question and scores each relative to the group average, $A_i = (r_i-\text{mean})/\text{std}$, removing the need for a separate value network. **This is the research frontier.**

## 4 · Efficient fine-tuning: LoRA and QLoRA

> [!FORMULA] LoRA (low-rank adaptation)
> Freeze the pretrained weight $W\in\mathbb R^{d\times k}$ and learn a low-rank update:
> $$W' = W + \frac{\alpha}{r}\,BA,\qquad B\in\mathbb R^{d\times r},\ A\in\mathbb R^{r\times k},\ r\ll d$$
> $B$ starts at zero, so training begins from the original model. Only $r(d+k)$ numbers are trained per matrix, and the optimizer state (Adam keeps two extra copies) shrinks by the same factor. After training, $BA$ can be merged into $W$, so inference costs nothing extra.

> [!EXAMPLE] How small is LoRA?
> A $4096\times4096$ projection has 16.8M weights. LoRA with $r=8$ trains $8\cdot(4096+4096)=65\,536$ of them: **0.39%**.

> [!DEF] QLoRA
> LoRA on top of a base model stored in **4-bit** precision. The frozen weights take a quarter of the 16-bit memory, so fine-tuning a 7B model fits on a single consumer GPU.

## 5 · Inference

> [!DEF] Autoregressive decoding and the KV cache
> Generating $n$ tokens takes $n$ forward passes, one token at a time. The **KV cache** (module 08) stores past keys and values, so each step only processes the new token instead of the whole prefix.

> [!KEY] Inference is memory-bandwidth-bound
> At batch size 1, each new token requires reading **every weight** (plus the KV cache) from GPU memory, but only does ~2 FLOPs per weight. GPUs can compute far faster than they can read memory, so memory bandwidth sets the speed.
>
> *Rough numbers:* a 7B model in 16-bit is 14 GB. A GPU reading ~1 TB/s can stream it at most ~70 times per second, i.e. **≲70 tokens/s** for one sequence.

> [!DEF] Speed-ups
> - **Quantization:** store weights in 8 or 4 bits → less to read, faster and smaller (small quality loss).
> - **Batching:** serve many users at once; each weight read is shared across the batch. Systems like vLLM manage the KV cache in pages (PagedAttention).
> - **Speculative decoding:** a small fast model drafts several tokens; the big model checks them all in one pass and keeps the ones it agrees with. Exact same output distribution, fewer big-model steps.

## 6 · Using and extending LLMs

> [!DEF] Prompting
> Give clear instructions and context, **few-shot** examples of the desired input→output, ask for step-by-step reasoning (**chain-of-thought**) on hard problems, and request **structured output** (e.g. JSON) when a program will read the answer.

> [!DEF] Retrieval-augmented generation (RAG)
> 1. Split your documents into chunks and **embed** each chunk (module 07).
> 2. For a question, embed it and retrieve the most similar chunks (vector search).
> 3. Put those chunks in the prompt and ask the model to answer from them, with citations.
>
> **Use RAG for knowledge** (facts that change, private documents); **use fine-tuning for behaviour** (style, format, a skill).

> [!DEF] Agents and tool use
> The model can call **tools** (run code, search the web, query a database) by emitting a structured request; the program runs it and feeds the result back, in a loop until the task is done.

## 7 · Evaluation and safety

> [!DEF] Evaluating LLMs
> - **Perplexity** on held-out text (for base models).
> - **Benchmarks:** MMLU (knowledge), GSM8K (math word problems), HumanEval / SWE-bench (code), and many more.
> - **LLM-as-judge:** a strong model grades outputs; cheap, but biased (e.g. toward longer answers).
> - **Your own task-specific eval:** the only number that tells you whether the model works for *your* use case. Always build one.

> [!WARN] Why benchmark scores mislead
> **Contamination:** benchmark questions leak into the training data, so the model has seen the answers. **Saturation:** top models all score ~90%+, so the benchmark no longer separates them. Scores also depend heavily on prompt format.

> [!KEY] Safety and alignment
> Jailbreaks, reward hacking, honesty and understanding what models are doing internally (interpretability, module 12) are serious open problems worth caring about.

> [!VIDEO] 7xTGNNLPyMI | Deep Dive into LLMs like ChatGPT | Andrej Karpathy · 3 h 31 min, the whole pipeline for a general audience

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **09 LLM** deck and drill this chapter's key facts with spaced repetition, then do the practice questions below.

## Practice (answers hidden)

1. Using $C\approx6ND$, how much compute does it take to train a 1B-parameter model Chinchilla-optimally?
<details><summary>Answer</summary>

$D\approx20N=20$B tokens. $C\approx6\cdot10^9\cdot2\times10^{10}=1.2\times10^{20}$ FLOPs.
</details>

2. Why does SFT alone not make a model reliably prefer *better* answers among plausible ones?
<details><summary>Answer</summary>

SFT only imitates the demonstrations; it never sees a comparison saying one answer is worse than another. Preference tuning (RLHF/DPO) uses those comparisons directly, so it can push down bad-but-plausible answers.
</details>

3. A reward model gives $r(x,y_w)=2$ and $r(x,y_l)=0.5$. What probability does it assign to $y_w$ being preferred, and what is its loss?
<details><summary>Answer</summary>

$\sigma(1.5)\approx0.82$; loss $=-\log0.82\approx0.20$.
</details>

4. LoRA with $r=16$ on all four attention projections ($4096\times4096$) of 32 layers: how many trainable parameters?
<details><summary>Answer</summary>

Per matrix $16\cdot(4096+4096)=131\,072$; × 4 matrices × 32 layers $=16.8$M trainable parameters (vs ~7B in the model).
</details>

5. Your company's assistant must answer questions about internal documents that change weekly. Fine-tuning or RAG?
<details><summary>Answer</summary>

RAG: the knowledge changes often, must be up to date and citable. Fine-tune only if you also need a particular behaviour or format that prompting can't achieve.
</details>

6. A 13B model in 4-bit precision, on a GPU with 1 TB/s of memory bandwidth. Rough upper bound on tokens/s at batch size 1?
<details><summary>Answer</summary>

$13\times10^9\cdot0.5$ bytes $=6.5$ GB per token, so at most $\approx1000/6.5\approx150$ tokens/s (ignoring the KV cache and overheads).
</details>

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

## Go deeper (all optional)
- ⭐ **[Stanford CS336: Language Modeling from Scratch](https://stanford-cs336.github.io/)**: lectures + assignments (tokenizer, transformer, systems, scaling, data, alignment). The deepest modern course. Do it after nanoGPT.
- ⭐ **Karpathy:** [nanochat](https://github.com/karpathy/nanochat) (a full ChatGPT-style pipeline, from tokenizer through SFT/RL to a web UI, in one small repo).
- **[Hugging Face LLM Course](https://huggingface.co/learn/llm-course)**: the `transformers`, `datasets`, and PEFT ecosystem in practice.
- **Build a Large Language Model (From Scratch)**, Sebastian Raschka (book + [repo](https://github.com/rasbt/LLMs-from-scratch)).
- **[The Smol Training Playbook (HF)](https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook)** and **[The Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook)**: how real LLMs get trained.
- Key papers (in order): GPT-2 → GPT-3 → Scaling Laws → Chinchilla → InstructGPT → LoRA → Llama → DPO → DeepSeek-R1. Links in [resources.md](resources.md#paper-reading-order).
- Stay current: [Sebastian Raschka's newsletter](https://magazine.sebastianraschka.com/), [Lilian Weng's blog](https://lilianweng.github.io/).

## Done when
- [ ] Tokenizer matches tiktoken · [ ] LoRA fine-tune shows a measurable gain on your eval · [ ] you can explain the whole ChatGPT pipeline end to end
