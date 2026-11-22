# 07 · Sequences, Embeddings & RNNs
> **Goal:** learn how to model sequences, and why attention replaced recurrence. · **Time:** 10–15 h · **Needs:** 05

This module is deliberately **short**. RNNs are mostly history now, but the problems they ran into explain every transformer design choice. (Modern state-space models such as Mamba bring recurrence back. See module 12.)

## Skip test
- [ ] Explain tokenization and embeddings: why one-hot is bad and what an embedding table is.
- [ ] Write the vanilla RNN update. Explain why gradients vanish or explode through time.
- [ ] Explain how the LSTM gates (forget/input/output) fix this.
- [ ] Explain the seq2seq encoder-decoder bottleneck and how **attention** removes it.
- [ ] Explain teacher forcing and autoregressive generation.

## Core ideas
- **Language modeling** = predicting the next token: $p(x_1..x_T) = \prod_t p(x_t\mid x_{<t})$. This one objective powers GPT.
- **Tokens:** characters, words, or subwords (BPE, see module 09). **Embedding** = a learned lookup table $E \in \mathbb R^{V\times d}$, where similar meanings end up as nearby vectors.
- **word2vec** (2013): learn embeddings by predicting context words. Famous vector arithmetic: king − man + woman ≈ queen.
- **Vanilla RNN:** $\mathbf h_t = \tanh(W_h\mathbf h_{t-1} + W_x\mathbf x_t + \mathbf b)$. **BPTT** multiplies by $W_h$ $T$ times, so gradients scale like $\lambda_{\max}^T$ → **vanish or explode**.
- **LSTM / GRU:** an additive cell state $\mathbf c_t = \mathbf f_t\odot\mathbf c_{t-1} + \mathbf i_t\odot\tilde{\mathbf c}_t$ creates a gradient highway, the same idea as residual connections.
- **Seq2seq:** an encoder squeezes the input into one vector, and a decoder generates from it. **Bottleneck:** one vector for a whole sentence.
- **Attention (Bahdanau 2014):** at each decoder step, take a weighted average of *all* encoder states, with weights = softmax(similarity). → "Attention is all you need" (2017) drops recurrence entirely.
- **Why transformers won:** RNNs are sequential (no parallelism over time) and struggle with long range. Attention connects all positions in $O(1)$ steps and trains in parallel.
- **Generation:** autoregressive sampling. Train with **teacher forcing** (feed the ground-truth previous token). Decoding: greedy, temperature, top-k, top-p.

## Learn from
- ⭐ **[Karpathy Zero to Hero: makemore series](https://karpathy.ai/zero-to-hero.html)**: you'll already be partway through it from module 04. It builds bigram → MLP → WaveNet-style LMs.
- ⭐ **[Understanding LSTM Networks (colah)](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)**: the classic diagrams.
- **[The Unreasonable Effectiveness of RNNs (Karpathy)](https://karpathy.github.io/2015/05/21/rnn-effectiveness/)**.
- **[Stanford CS224n](https://web.stanford.edu/class/cs224n/)**: lectures on word vectors, RNNs, seq2seq + attention.
- **d2l.ai** ch. 9–11 (RNNs, modern RNNs, attention).

## Build
1. **Character-level LM** (makemore): bigram → MLP → small RNN/LSTM on a names or Shakespeare dataset. Compare samples and validation loss.
2. Train word2vec (skip-gram with negative sampling) on a small corpus. Show nearest neighbors and analogies.
3. Stretch: a seq2seq + attention model for date-format translation ("3rd of May 2021" → "2021-05-03"). Plot the attention heatmap.

## Done when
- [ ] Char-LM produces plausible samples · [ ] you can explain the path from RNN → attention → transformer
