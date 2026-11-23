# 08 · Transformers
> **Goal:** be able to write a GPT from a blank file and explain every line. · **Time:** 20–30 h · **Needs:** 05, 07

> [!GOAL]
> By the end of this chapter you can:
>
> - compute **scaled dot-product attention** by hand and in code, with every shape, and explain the $\sqrt{d_k}$;
> - explain **causal masking** and **multi-head attention**;
> - draw a modern (pre-norm) **transformer block** and count its parameters;
> - compare sinusoidal, learned and **RoPE** position encodings;
> - explain attention's $O(T^2)$ cost, FlashAttention and the KV cache;
> - tell encoder-only, decoder-only and encoder–decoder models apart, and build a small GPT.

## Skip test
- [ ] Write scaled dot-product attention with shapes, and explain the $\sqrt{d_k}$.
- [ ] Explain causal masking and why GPT needs it.
- [ ] Explain multi-head attention: why multiple heads, and how shapes reshape.
- [ ] Draw one (pre-norm) transformer block: LN → attention → residual → LN → MLP → residual.
- [ ] Explain why positional information is needed. Compare sinusoidal, learned, and **RoPE**.
- [ ] Give the time and memory complexity of attention in sequence length $T$.
- [ ] Explain encoder-only (BERT) vs decoder-only (GPT) vs encoder-decoder (T5).

## 1 · Self-attention

In module 07, a decoder *attended* to encoder states. **Self-attention** lets every token in a sequence attend to every other token of the *same* sequence, so each token's vector can absorb information from wherever it is relevant ("it" looks at the noun it refers to).

> [!DEF] Queries, keys and values
> From each token's vector $\mathbf x_t$, compute three vectors with learned matrices:
> - **query** $\mathbf q_t = W_Q\mathbf x_t$: what am I looking for?
> - **key** $\mathbf k_t = W_K\mathbf x_t$: what do I contain?
> - **value** $\mathbf v_t = W_V\mathbf x_t$: what do I pass on?
>
> Token $t$ compares its query with every key (dot product = similarity, module 01), turns the scores into weights with softmax, and takes the weighted average of the values.

> [!FORMULA] Scaled dot-product attention
> Stacking all tokens as rows ($X$ is $T\times d$; $Q=XW_Q^\top$, $K=XW_K^\top$, $V=XW_V^\top$):
> $$\mathrm{Attention}(Q,K,V) = \mathrm{softmax}\!\Big(\frac{QK^\top}{\sqrt{d_k}}+M\Big)V$$
> Shapes: $QK^\top$ is $T\times T$ (every query against every key); softmax runs along each **row**; the result is $T\times d_v$. $M$ is an optional mask (section 2).

> [!KEY] Why divide by $\sqrt{d_k}$?
> If the entries of $\mathbf q$ and $\mathbf k$ are independent with variance 1, then $\mathbf q\cdot\mathbf k=\sum_{i=1}^{d_k}q_ik_i$ has variance $d_k$. For $d_k=64$ the scores would be ~8× too spread out, pushing softmax into a nearly one-hot, saturated regime where gradients vanish. Dividing by $\sqrt{d_k}$ brings the variance back to 1.

> [!EXAMPLE] Attention by hand
> One query $\mathbf q=(2,0)$; three keys $\mathbf k_1=(1,0)$, $\mathbf k_2=(0,1)$, $\mathbf k_3=(1,1)$ with values $\mathbf v_1=(1,0)$, $\mathbf v_2=(0,1)$, $\mathbf v_3=(1,1)$; $d_k=2$.
>
> Scores $\mathbf q\cdot\mathbf k_j/\sqrt2 = (1.414,\ 0,\ 1.414)$ → softmax weights $(0.446,\ 0.108,\ 0.446)$ → output $0.446\,\mathbf v_1+0.108\,\mathbf v_2+0.446\,\mathbf v_3 = (0.892,\ 0.554)$.
>
> The query "points along the first axis", so it attends mostly to keys 1 and 3 and pulls in a mix of their values.

> [!KEY] Attention is a set operation
> Nothing in the formula knows the *order* of the tokens: shuffle the rows of $X$ and the outputs shuffle the same way (permutation equivariance). Word order has to be injected separately (section 5).

> [!TRY] [Attention Visualizer](interactive/attention.html)
> Edit queries and keys, toggle the causal mask and the $\sqrt{d_k}$ scaling, and watch the attention matrix and the outputs change.

> [!VIDEO] eMlx5fFNoYc | Attention in transformers, step-by-step | 3Blue1Brown · 26 min

## 2 · Causal masking

> [!DEF] Causal mask
> A GPT predicts token $t+1$ from tokens $1..t$, so token $t$ must not see the future. Set $M_{ij}=-\infty$ for $j>i$ (above the diagonal) and $0$ elsewhere. After softmax, $e^{-\infty}=0$, so every token attends only to itself and earlier tokens.

> [!KEY] Training on all positions at once
> With the mask, one forward pass over a sequence of $T$ tokens produces $T$ next-token predictions, each using only its own past. Training on all of them in parallel is what makes transformers so much faster to train than RNNs.

> [!WARN] Mask before the softmax
> The $-\infty$ must be added to the **scores**, before softmax. Zeroing weights *after* softmax leaves rows that no longer sum to 1, and the future has already leaked into the normalization.

## 3 · Multi-head attention

> [!DEF] Multi-head attention
> Instead of one attention with $d_k=d_{model}$, run $h$ smaller attentions ("heads") in parallel, each with its own $W_Q,W_K,W_V$ and head size $d_k=d_{model}/h$. Concatenate their outputs and mix them with an output matrix $W_O$:
> $$\mathrm{MHA}(X) = \mathrm{Concat}(\text{head}_1,\dots,\text{head}_h)\,W_O^\top$$
> Different heads learn different relations (previous token, syntax, coreference, position…) at the same total cost as one big head.

> [!CODE] Causal multi-head attention in PyTorch
> ```python
> class CausalSelfAttention(nn.Module):
>     def __init__(self, d, h):
>         super().__init__()
>         self.h = h
>         self.qkv = nn.Linear(d, 3 * d)       # W_Q, W_K, W_V in one matmul
>         self.proj = nn.Linear(d, d)          # W_O
>     def forward(self, x):                    # x: (B, T, d)
>         B, T, d = x.shape
>         q, k, v = self.qkv(x).split(d, dim=-1)
>         # (B, T, d) -> (B, h, T, d/h): each head attends independently
>         q, k, v = (t.view(B, T, self.h, d // self.h).transpose(1, 2) for t in (q, k, v))
>         y = F.scaled_dot_product_attention(q, k, v, is_causal=True)   # (B, h, T, d/h)
>         y = y.transpose(1, 2).contiguous().view(B, T, d)               # concat heads
>         return self.proj(y)
> ```

## 4 · The transformer block

> [!FORMULA] A modern (pre-norm, GPT-style) block
> ```
> x = x + MultiHeadAttention(LayerNorm(x))     # tokens exchange information
> x = x + MLP(LayerNorm(x))                    # each token is processed on its own
> ```
> The **MLP** is two linear layers with a nonlinearity, applied to every token separately: $d\to4d\to d$ with GELU (or a SwiGLU variant in Llama-style models). A GPT is: token embedding (+ positions) → $L$ blocks → final LayerNorm → linear layer to $V$ logits.

> [!DEF] The residual stream
> Because every sub-layer *adds* its output to $\mathbf x$, you can view the model as one vector per token (the **residual stream**) that each attention and MLP layer reads from and writes into. Attention moves information *between* positions; the MLP transforms information *within* a position. This view is the basis of mechanistic interpretability (module 12).

> [!FORMULA] Parameter count (decoder-only)
> Per block: attention $4d^2$ ($W_Q,W_K,W_V,W_O$) + MLP $8d^2$ ($d\times4d$ and $4d\times d$) $=12d^2$ (ignoring biases and norms). Total:
> $$N\approx12\,L\,d^2 + V d$$
> **GPT-2 small:** $L=12$, $d=768$, $V=50\,257$: $12\cdot12\cdot768^2\approx84.9$M + $Vd\approx38.6$M + positions $1024\cdot768\approx0.8$M $\approx$ **124M** ✓.

> [!KEY] Why pre-norm?
> The original Transformer put LayerNorm *after* each residual addition (post-norm), which is hard to train when deep without careful warmup. Putting it *before* each sub-layer (pre-norm) leaves a clean identity path through the whole network, so modern LLMs almost all use pre-norm (often with RMSNorm, module 05).

> [!VIDEO] wjZofJX0v4M | But what is a GPT? Visual intro to transformers | 3Blue1Brown · 27 min

## 5 · Positional information

> [!FORMULA] Sinusoidal positions (original Transformer)
> Add a fixed vector to each token embedding:
> $$PE(pos,2i)=\sin\frac{pos}{10000^{2i/d}},\qquad PE(pos,2i+1)=\cos\frac{pos}{10000^{2i/d}}$$
> Each pair of dimensions is a clock ticking at a different frequency, so every position gets a unique pattern. **Learned** absolute positions (GPT-2) simply train a table of $T_{\max}$ vectors instead, but can't go beyond $T_{\max}$.

> [!FORMULA] RoPE (rotary position embedding)
> Instead of adding anything, **rotate** each pair of dimensions $(x_{2i},x_{2i+1})$ of the query and key at position $m$ by an angle $m\theta_i$, with $\theta_i = 10000^{-2i/d}$. Rotations preserve dot products up to the angle difference, so
> $$\langle R_m\mathbf q,\ R_n\mathbf k\rangle\ \text{depends only on}\ \mathbf q,\mathbf k\ \text{and}\ m-n$$
> Attention therefore sees **relative** positions. Used by Llama, Qwen and most modern LLMs, and it extends to longer contexts with tricks that rescale the angles.
>
> 🔭 In complex notation it is multiplication by $e^{im\theta}$: relative phase = relative position.

## 6 · Cost and efficiency

> [!FORMULA] Complexity of attention
> For sequence length $T$ and width $d$: computing $QK^\top$ costs $O(T^2d)$ time, and the score matrix needs $O(T^2)$ memory per head. Doubling the context quadruples that part of the cost. The MLPs cost $O(Td^2)$, which dominates for short contexts.

> [!DEF] FlashAttention
> An **exact** attention algorithm that computes softmax in tiles inside the GPU's small, fast on-chip memory (SRAM) and never writes the full $T\times T$ matrix to slow memory. Same result, much less memory traffic: a large speed-up and memory that grows linearly with $T$. PyTorch's `scaled_dot_product_attention` uses it automatically when it can.

> [!DEF] KV cache
> When generating token by token, the keys and values of earlier tokens never change, so store them instead of recomputing them. Each new token then needs only one new query against the cached keys. The cache costs $2\cdot L\cdot T\cdot d$ numbers per sequence: for 32 layers, $d=4096$, $T=4096$ in 16-bit floats that is about **2.1 GB**. Variants like grouped-query attention (GQA) share keys/values across heads to shrink it.

> [!NOTE] Other ways around $T^2$
> Sparse or sliding-window attention, linear-attention approximations, and state-space models such as Mamba (module 12) trade some flexibility for cost that grows linearly with $T$.

## 7 · Three families of transformers

> [!DEF] Encoder-only, decoder-only, encoder–decoder
> | Family | Attention | Training objective | Examples | Used for |
> |---|---|---|---|---|
> | encoder-only | bidirectional (no mask) | predict masked tokens | BERT, RoBERTa | classification, embeddings, search |
> | **decoder-only** | causal | next token | GPT, Llama, Claude-style LLMs | generation, chat, **dominant today** |
> | encoder–decoder | encoder bidirectional + decoder causal with cross-attention | predict the output sequence | T5, original Transformer, Whisper | translation, summarization, speech |

> [!KEY] The same block everywhere
> Text, images (ViT, module 06), audio (Whisper), proteins (AlphaFold-style components) and robot actions all use the same block with a different tokenizer. Learn it once and it applies everywhere.

## 8 · Build a GPT

> [!VIDEO] kCc8FmEb1nY | Let's build GPT: from scratch, in code, spelled out | Andrej Karpathy · 1 h 56 min. Code along, then rebuild it from a blank file.

> [!TRY] [Attention Visualizer](interactive/attention.html)
> Before you code, predict the attention matrix for a short sentence with and without the causal mask, then check.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **08 Transformer** deck and drill this chapter's key facts with spaced repetition, then do the practice questions below.

## Practice (answers hidden)

1. $X$ is $(B=8, T=128, d=512)$ with $h=8$ heads. What is the shape of $Q$ per head, of the score matrix, and of the output?
<details><summary>Answer</summary>

Per head $d_k=512/8=64$: $Q,K,V$ are $(8, 8, 128, 64)$ (batch, heads, $T$, $d_k$); scores $(8, 8, 128, 128)$; output after concatenation $(8, 128, 512)$.
</details>

2. Why would attention without the $\sqrt{d_k}$ train badly at $d_k=128$?
<details><summary>Answer</summary>

Scores would have standard deviation $\sqrt{128}\approx11$, so softmax would be almost one-hot: tiny gradients for all but one key (saturation), slow and unstable training.
</details>

3. Write the causal mask for $T=3$, and the attention weights of token 1 (the first token).
<details><summary>Answer</summary>

$M=\begin{pmatrix}0&-\infty&-\infty\\0&0&-\infty\\0&0&0\end{pmatrix}$. Token 1 can only see itself, so its weights are $(1,0,0)$.
</details>

4. Estimate the parameter count of a decoder with $L=24$, $d=1024$, $V=50\,000$.
<details><summary>Answer</summary>

$12\cdot24\cdot1024^2\approx302$M + $50\,000\cdot1024\approx51$M $\approx353$M (GPT-2 medium is ~350M).
</details>

5. Going from 4k to 32k context, how do the attention score memory and the KV-cache size change?
<details><summary>Answer</summary>

Context grows 8×. Score memory (without FlashAttention) grows $8^2=64$×; the KV cache grows linearly, 8×.
</details>

6. Show that attention without positions can't tell "dog bites man" from "man bites dog".
<details><summary>Answer</summary>

Both sentences have the same set of token embeddings. Attention is permutation-equivariant, so each word's output vector is the same in both orders (just in different positions), and any order-independent readout gives the same answer. Positional encodings break the symmetry.
</details>

## Build
1. **Single-head attention in NumPy**, checked against `torch.nn.functional.scaled_dot_product_attention`.
2. **nanoGPT from a blank file** on Tiny Shakespeare (char-level). Then add: multi-head, pre-norm, dropout, weight tying, LR warmup + cosine, AdamW.
3. Swap learned positions for **RoPE** and compare validation loss. Try a longer context.
4. Stretch: reproduce **GPT-2 124M** on FineWeb-Edu following build-nanogpt (needs a rented GPU: roughly 1–2 h on 8×A100, or a day-plus on a single GPU).

## Traps
- Mixing up `(B, T, C)` and `(B, heads, T, head_dim)` reshapes/transposes. Write the shapes in comments.
- A causal mask applied *after* the softmax (wrong) instead of before (right).
- Thinking you understand it after watching. Close the video and rebuild from nothing.

## Go deeper (all optional)
- ⭐ **[nanoGPT](https://github.com/karpathy/nanoGPT)** / **[build-nanogpt](https://github.com/karpathy/build-nanogpt)** (the "Let's reproduce GPT-2 (124M)" video).
- ⭐ **[The Illustrated Transformer (Jay Alammar)](https://jalammar.github.io/illustrated-transformer/)**.
- **[Attention Is All You Need (2017)](https://arxiv.org/abs/1706.03762)**: read the paper *after* building it. It'll be easy by then.
- **[The Annotated Transformer (Harvard NLP)](https://nlp.seas.harvard.edu/annotated-transformer/)**: the paper line by line in PyTorch.
- **[3Blue1Brown: Neural Networks](https://www.3blue1brown.com/topics/neural-networks)** (chapters 5–7): superb visual intuition.
- **[Transformer Explainer (interactive)](https://poloclub.github.io/transformer-explainer/)**: GPT-2 running live in the browser.
- [Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/) ch. 12.

## Done when
- [ ] GPT written from a blank file without referencing code · [ ] every skip-test item answered on paper
