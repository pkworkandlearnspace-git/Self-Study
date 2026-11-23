# 07 · Sequences, Embeddings & RNNs
> **Goal:** learn how to model sequences, and why attention replaced recurrence. · **Time:** 10–15 h · **Needs:** 05

This module is deliberately **short**. RNNs are mostly history now, but the problems they ran into explain every transformer design choice. (Modern state-space models such as Mamba bring recurrence back. See module 12.)

> [!GOAL]
> By the end of this chapter you can:
>
> - state the **language-modelling** objective and turn text into tokens and **embeddings**;
> - write the RNN update and explain why gradients **vanish or explode** through time;
> - explain how LSTM/GRU gates fix that;
> - explain the seq2seq bottleneck and how **attention** removes it, leading straight to the transformer;
> - generate text autoregressively with greedy, temperature, top-k and top-p sampling.

## Skip test
- [ ] Explain tokenization and embeddings: why one-hot is bad and what an embedding table is.
- [ ] Write the vanilla RNN update. Explain why gradients vanish or explode through time.
- [ ] Explain how the LSTM gates (forget/input/output) fix this.
- [ ] Explain the seq2seq encoder-decoder bottleneck and how **attention** removes it.
- [ ] Explain teacher forcing and autoregressive generation.

## 1 · Language modelling

> [!DEF] Language model
> A **language model** assigns a probability to a sequence of tokens. By the chain rule of probability it can always be factored into next-token predictions:
> $$p(x_1,\dots,x_T) = \prod_{t=1}^{T} p(x_t\mid x_1,\dots,x_{t-1})$$
> So a model that predicts "the next token given everything so far" is a complete language model. **This single objective powers GPT** (modules 08–09).

> [!FORMULA] Training loss and perplexity
> Train by minimizing the average cross-entropy of the next token:
> $$L = -\frac1T\sum_{t=1}^T\log p_\theta(x_t\mid x_{<t}),\qquad \text{perplexity} = e^{L}$$
> Perplexity is the "effective number of choices" the model is torn between at each step. A uniform guess over a vocabulary of $V$ tokens has perplexity $V$.

> [!EXAMPLE] A bigram model
> The simplest LM looks only at the previous character: count how often each pair occurs in the training text, normalize each row into probabilities, and sample. On a list of names it produces name-like gibberish ("kalia", "jonen"). Everything after this (MLP, RNN, transformer) is a better way to use **more** context.

> [!VIDEO] PaCmpygFfXo | The spelled-out intro to language modeling: building makemore | Andrej Karpathy · 1 h 57 min

## 2 · Tokens and embeddings

> [!DEF] Tokenization
> Text is split into **tokens** and each token gets an integer id from a fixed **vocabulary** of size $V$. Tokens can be characters (small $V$, long sequences), words (huge $V$, unknown words are a problem) or **subwords** (the standard: frequent words stay whole, rare ones split into pieces; byte-pair encoding, module 09).

> [!DEF] Embedding
> One-hot vectors (length $V$, a single 1) treat every pair of tokens as equally different and are huge. Instead, keep a learned table $E\in\mathbb R^{V\times d}$ and represent token $i$ by its row $E_i$, a dense $d$-dimensional vector (e.g. $d=768$). Looking up a row is the same as multiplying a one-hot vector by $E$, so the table is trained by backprop like any other weight. Tokens used in similar contexts end up with nearby vectors.

> [!DEF] word2vec
> A 2013 method that learns word embeddings by predicting the words around each word (skip-gram) with a cheap trick (**negative sampling**: tell real context words from random ones). The resulting vectors show striking structure, like $\vec{\text{king}}-\vec{\text{man}}+\vec{\text{woman}}\approx\vec{\text{queen}}$. Similarity between embeddings is measured with cosine similarity (module 01).

## 3 · Recurrent neural networks

An RNN reads a sequence one step at a time, carrying a **hidden state** that summarizes everything seen so far.

> [!FORMULA] Vanilla RNN
> $$\mathbf h_t = \tanh\big(W_h\mathbf h_{t-1} + W_x\mathbf x_t + \mathbf b\big),\qquad \hat{\mathbf y}_t = \mathrm{softmax}(W_y\mathbf h_t)$$
> The **same** weights are used at every time step (weight sharing over time, like a convolution shares over space).

> [!DEF] Backpropagation through time (BPTT)
> Unroll the RNN over the $T$ steps of a sequence into one long feed-forward graph and run ordinary backprop on it. Long sequences are often cut into chunks (**truncated BPTT**) to save memory.

> [!KEY] Why gradients vanish or explode
> The gradient from step $t$ back to step $t-k$ passes through $k$ copies of the Jacobian $\partial\mathbf h_t/\partial\mathbf h_{t-1} = \mathrm{diag}(\tanh')\,W_h$. Roughly, it scales like $\lambda_{\max}^k$, where $\lambda_{\max}$ is the largest eigenvalue magnitude of $W_h$ (times the tanh slopes, which are ≤ 1). If that is below 1 the gradient **vanishes** exponentially and the network can't learn long-range dependencies; above 1 it **explodes** (fix: gradient clipping, module 05).

> [!FORMULA] LSTM (long short-term memory)
> Add a separate **cell state** $\mathbf c_t$ that is updated *additively*, controlled by gates (sigmoids between 0 and 1):
> $$\mathbf f_t,\mathbf i_t,\mathbf o_t = \sigma(\cdot),\quad \tilde{\mathbf c}_t = \tanh(\cdot)\qquad(\text{each a linear function of } \mathbf h_{t-1},\mathbf x_t)$$
> $$\mathbf c_t = \mathbf f_t\odot\mathbf c_{t-1} + \mathbf i_t\odot\tilde{\mathbf c}_t,\qquad \mathbf h_t = \mathbf o_t\odot\tanh(\mathbf c_t)$$
> **Forget gate** $\mathbf f$: how much old memory to keep. **Input gate** $\mathbf i$: how much new content to write. **Output gate** $\mathbf o$: how much memory to expose. When $\mathbf f\approx1$ the gradient flows along $\mathbf c$ almost unchanged: a gradient highway, the same idea as residual connections. The **GRU** is a simpler two-gate variant.

## 4 · Seq2seq and the birth of attention

> [!DEF] Sequence-to-sequence (seq2seq)
> For tasks like translation, an **encoder** RNN reads the whole input sentence into its final hidden state; a **decoder** RNN then generates the output one token at a time starting from that state. **The bottleneck:** one fixed-size vector must hold the meaning of an entire sentence, and quality drops for long inputs.

> [!FORMULA] Attention (Bahdanau et al., 2014)
> At each decoder step $t$, look back at **all** encoder states $\mathbf h_1,\dots,\mathbf h_S$:
> $$\alpha_{t,s} = \mathrm{softmax}_s\big(\mathrm{score}(\mathbf s_t,\mathbf h_s)\big),\qquad \mathbf c_t = \sum_s\alpha_{t,s}\,\mathbf h_s$$
> The **attention weights** $\alpha_{t,s}$ (summing to 1) say how much the decoder focuses on each input position; the **context vector** $\mathbf c_t$ is their weighted average. No more single-vector bottleneck, and the weights are interpretable (they align words across languages).

> [!KEY] Why transformers won
> RNNs must process tokens one after another, so they can't use GPU parallelism over time, and information between distant tokens passes through many steps. "Attention Is All You Need" (2017) dropped recurrence entirely: every token attends to every other token directly, in one parallel step. That is module 08.

## 5 · Generating text

> [!DEF] Teacher forcing and autoregressive generation
> **Training** (teacher forcing): feed the *true* previous tokens and predict each next one, so all positions train in parallel. **Generation** (autoregressive): feed the model's *own* sampled token back in as the next input, one step at a time.

> [!DEF] Decoding strategies
> | Method | Rule | Effect |
> |---|---|---|
> | greedy | always take the most likely token | deterministic, often repetitive |
> | temperature $T$ | sample from $\mathrm{softmax}(\mathbf z/T)$ | $T<1$ sharper, $T>1$ more random |
> | top-k | sample only among the $k$ most likely tokens | cuts off the long tail of nonsense |
> | top-p (nucleus) | sample among the smallest set whose probability sums to $p$ (e.g. 0.9) | adapts the cut-off to the model's confidence |

## Practice (answers hidden)

1. A model's average next-token cross-entropy on validation text is 1.2 nats. What is its perplexity, and how does it compare to uniform guessing over 65 characters?
<details><summary>Answer</summary>

$e^{1.2}\approx3.3$: the model is about as uncertain as a choice between 3.3 equally likely characters, versus 65 for uniform guessing ($\ln65\approx4.17$ nats).
</details>

2. An embedding table has $V=50\,000$ tokens and $d=768$. How many parameters, and what does looking up token 42 do?
<details><summary>Answer</summary>

$50\,000\cdot768 = 38.4$ million parameters. The lookup returns row 42 of the table, equivalent to multiplying the one-hot vector for token 42 by $E$.
</details>

3. An RNN's recurrent Jacobian has largest eigenvalue magnitude 0.9. By roughly what factor is a gradient scaled after 50 steps? And with 1.1?
<details><summary>Answer</summary>

$0.9^{50}\approx0.005$ (vanishing) and $1.1^{50}\approx117$ (exploding).
</details>

4. In an LSTM, what forget-gate value lets information survive for many steps, and why does that help the gradient?
<details><summary>Answer</summary>

$\mathbf f_t\approx1$. Then $\mathbf c_t\approx\mathbf c_{t-1}+\dots$, so $\partial\mathbf c_t/\partial\mathbf c_{t-1}\approx I$ and the gradient passes back without shrinking, like a residual connection.
</details>

5. Logits for three tokens are $(2, 1, 0)$. Give the sampling probabilities at temperature 1 and at temperature 0.5.
<details><summary>Answer</summary>

$T=1$: $e^{(2,1,0)}/\Sigma = (7.39, 2.72, 1)/11.11 \approx (0.67, 0.24, 0.09)$. $T=0.5$: logits become $(4,2,0)$: $(54.6, 7.39, 1)/63.0\approx(0.87, 0.12, 0.02)$. Lower temperature concentrates probability on the top token.
</details>

## Build
1. **Character-level LM** (makemore): bigram → MLP → small RNN/LSTM on a names or Shakespeare dataset. Compare samples and validation loss.
2. Train word2vec (skip-gram with negative sampling) on a small corpus. Show nearest neighbors and analogies.
3. Stretch: a seq2seq + attention model for date-format translation ("3rd of May 2021" → "2021-05-03"). Plot the attention heatmap.

## Go deeper (all optional)
- ⭐ **[Karpathy Zero to Hero: makemore series](https://karpathy.ai/zero-to-hero.html)**: you'll already be partway through it from module 04. It builds bigram → MLP → WaveNet-style LMs.
- ⭐ **[Understanding LSTM Networks (colah)](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)**: the classic diagrams.
- **[The Unreasonable Effectiveness of RNNs (Karpathy)](https://karpathy.github.io/2015/05/21/rnn-effectiveness/)**.
- **[Stanford CS224n](https://web.stanford.edu/class/cs224n/)**: lectures on word vectors, RNNs, seq2seq + attention.
- **[d2l.ai](https://d2l.ai/)** ch. 9–11 (RNNs, modern RNNs, attention).

## Done when
- [ ] Char-LM produces plausible samples · [ ] you can explain the path from RNN → attention → transformer
