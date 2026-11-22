# 08 · Transformers
> **Goal:** be able to write a GPT from a blank file and explain every line. · **Time:** 20–30 h · **Needs:** 05, 07

## Skip test
- [ ] Write scaled dot-product attention with shapes, and explain the $\sqrt{d_k}$.
- [ ] Explain causal masking and why GPT needs it.
- [ ] Explain multi-head attention: why multiple heads, and how shapes reshape.
- [ ] Draw one (pre-norm) transformer block: LN → attention → residual → LN → MLP → residual.
- [ ] Explain why positional information is needed. Compare sinusoidal, learned, and **RoPE**.
- [ ] Give the time and memory complexity of attention in sequence length $T$.
- [ ] Explain encoder-only (BERT) vs decoder-only (GPT) vs encoder-decoder (T5).

## Core ideas
- **Attention:** $\text{Attention}(Q,K,V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}} + M\right)V$
  - $Q = XW_Q,\ K = XW_K,\ V = XW_V$. Each token *queries* every other token's *keys* and takes a weighted mix of their *values*.
  - **Why $\sqrt{d_k}$:** for random unit-variance entries, $\mathbf q\cdot\mathbf k$ has variance $d_k$. Dividing keeps the softmax out of its saturated (zero-gradient) regime.
  - **Mask $M$:** $-\infty$ above the diagonal = **causal** (can't see the future). This lets one forward pass train on all $T$ next-token predictions at once.
  - Attention is a **set operation**: permutation-equivariant, with no built-in notion of order.
- **Multi-head:** split $d_{model}$ into $h$ heads of size $d_k = d_{model}/h$. Each head learns a different relation (syntax, coreference, position…). Concatenate, then project with $W_O$.
- **Transformer block (modern pre-norm, GPT-style):**
  ```
  x = x + Attention(LayerNorm(x))
  x = x + MLP(LayerNorm(x))        # MLP: d → 4d → d, GELU (or SwiGLU in Llama-style models)
  ```
  **Residual stream view:** every layer *reads from and writes to* a shared residual stream. This is the basis of interpretability work.
- **Positional encoding:**
  - Sinusoidal (original), learned absolute (GPT-2), **RoPE** (rotates Q/K by a position-dependent angle so attention depends on *relative* position; used by Llama, Qwen, and most modern LLMs).
  - 🔭 RoPE is a complex-phase rotation $e^{i m\theta}$: relative phase = relative position.
- **Complexity:** $O(T^2 d)$ compute and $O(T^2)$ memory for the score matrix. Fixes: **FlashAttention** (exact, tiles in fast GPU SRAM, never stores $T\times T$), sparse/sliding-window attention, linear attention, and state-space models (module 12).
- **Three families:**
  - **Encoder-only (BERT):** bidirectional, masked-token objective → classification and embeddings.
  - **Decoder-only (GPT):** causal, next-token objective → generation. **Dominant today.**
  - **Encoder-decoder (T5, original Transformer):** translation and seq2seq.
- **Parameter count (decoder):** ≈ $12\,L\,d^2$ (attention $4d^2$ + MLP $8d^2$ per layer), plus embeddings $V d$.
- **Same block everywhere:** text, images (ViT), audio (Whisper), proteins (AlphaFold-style components), actions (robotics). Learn it once and it applies everywhere.

## Learn from
- ⭐ **[Let's build GPT: from scratch, in code, spelled out (Karpathy)](https://www.youtube.com/watch?v=kCc8FmEb1nY)** + **[nanoGPT](https://github.com/karpathy/nanoGPT)** / **[build-nanogpt](https://github.com/karpathy/build-nanogpt)** (the "Let's reproduce GPT-2 (124M)" video).
- ⭐ **[The Illustrated Transformer (Jay Alammar)](https://jalammar.github.io/illustrated-transformer/)**: read before the video.
- **[Attention Is All You Need (2017)](https://arxiv.org/abs/1706.03762)**: read the paper *after* building it. It'll be easy by then.
- **[The Annotated Transformer (Harvard NLP)](https://nlp.seas.harvard.edu/annotated-transformer/)**: the paper line by line in PyTorch.
- **[3Blue1Brown: Transformers & Attention](https://www.3blue1brown.com/topics/neural-networks)** (chapters 5–7): superb visual intuition.
- **[Transformer Explainer (interactive)](https://poloclub.github.io/transformer-explainer/)**: GPT-2 running live in the browser.
- Understanding Deep Learning (Prince) ch. 12.

## Build
1. **Single-head attention in NumPy**, checked against `torch.nn.functional.scaled_dot_product_attention`.
2. **nanoGPT from a blank file** on Tiny Shakespeare (char-level). Then add: multi-head, pre-norm, dropout, weight tying, LR warmup + cosine, AdamW.
3. Swap learned positions for **RoPE** and compare validation loss. Try a longer context.
4. Stretch: reproduce **GPT-2 124M** on FineWeb-Edu following build-nanogpt (needs a rented GPU: roughly 1–2 h on 8×A100, or a day-plus on a single GPU).

## Traps
- Mixing up `(B, T, C)` and `(B, heads, T, head_dim)` reshapes/transposes. Write the shapes in comments.
- A causal mask applied *after* the softmax (wrong) instead of before (right).
- Thinking you understand it after watching. Close the video and rebuild from nothing.

## Done when
- [ ] GPT written from a blank file without referencing code · [ ] every skip-test item answered on paper
