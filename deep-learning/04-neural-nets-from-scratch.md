# 04 · Neural Networks from Scratch
> **Goal:** understand backprop so well you could build PyTorch's core yourself. · **Time:** 15–20 h · **Needs:** 01, 03

**The most important module.** Everything after this is architecture choices on top of the same engine.

## Skip test
- [ ] Draw a 2-layer MLP. Write the forward pass in matrix form with shapes.
- [ ] Derive backprop for `Linear → ReLU → Linear → softmax-cross-entropy` by hand.
- [ ] Show that $\partial L/\partial \mathbf z = \hat{\mathbf y} - \mathbf y$ for softmax + cross-entropy.
- [ ] Explain why stacked linear layers without nonlinearities collapse to one linear layer.
- [ ] Explain reverse-mode autodiff and why it suits "many params → one scalar loss".
- [ ] Explain vanishing gradients with sigmoid, and why ReLU helps.

## Core ideas
- **Neuron:** $a = \phi(\mathbf w^\top\mathbf x + b)$. **Layer:** $\mathbf h = \phi(W\mathbf x + \mathbf b)$. **MLP:** a stack of layers.
- **Why nonlinearity:** $W_2(W_1\mathbf x) = (W_2W_1)\mathbf x$ is still linear. $\phi$ (ReLU, GELU, tanh) gives expressive power.
- **Universal approximation:** one wide hidden layer can approximate any continuous function. *Depth* makes it **efficient** (exponentially fewer units for compositional functions).
- **Computational graph:** each op is a node. Forward computes values. Backward sends **gradients** from the loss back to every parameter.
- **Backprop = chain rule + caching.** Each node only needs its *local* derivative and the upstream gradient:
  `grad_input = local_jacobianᵀ · grad_output`
- **Key local gradients** (for $\mathbf y = W\mathbf x$ in batch form $Y = XW^\top$):
  - $\partial L/\partial W = (\partial L/\partial Y)^\top X$, $\partial L/\partial X = (\partial L/\partial Y)\, W$
  - ReLU: pass the gradient where input > 0, zero elsewhere.
  - Softmax + CE combined: $\hat{\mathbf y} - \mathbf y$ (clean and stable, which is why frameworks fuse them).
- **Gradients accumulate (+=)** when a value is used in several places. This is the multivariable chain rule.
- **Reverse-mode AD** costs ~2–3× a forward pass, whatever the number of parameters. That's why training billion-parameter nets is possible.
- **Activations:** sigmoid/tanh saturate → **vanishing gradients**. ReLU doesn't saturate for x > 0 (but neurons can "die"). GELU/SiLU are smooth variants used in transformers.
- **Initialization matters:** variance-preserving init keeps signals from exploding or vanishing — **Xavier/Glorot** $\text{Var}(w)=1/n_{in}$ (tanh), **He/Kaiming** $2/n_{in}$ (ReLU).

## Learn from
- ⭐ **[Neural Networks: Zero to Hero (Andrej Karpathy)](https://karpathy.ai/zero-to-hero.html)**: videos 1–5 (micrograd → makemore with MLPs, BatchNorm, "Becoming a Backprop Ninja"). **Code along with every line.** This is the best single resource in the whole curriculum.
- **[3Blue1Brown: Neural Networks](https://www.3blue1brown.com/topics/neural-networks)**: the intuition, watched first (~1.5 h).
- **[Neural Networks and Deep Learning (Michael Nielsen)](http://neuralnetworksanddeeplearning.com/)**: free book. Ch. 1–3 for a clear backprop derivation.
- **[CS231n: Backprop notes](https://cs231n.github.io/optimization-2/)** + **[Yes you should understand backprop](https://karpathy.medium.com/yes-you-should-understand-backprop-e2f06eab496b)**.

## Build
1. **micrograd**: a scalar autograd engine (~150 lines) plus a tiny MLP that learns a 2D dataset (moons). Follow Karpathy, then **rewrite it from memory**.
2. **NumPy MLP on MNIST** with hand-derived matrix backprop. Target ≥ 97% test accuracy. Gradient-check every layer.
3. 💡 C++ bonus: port micrograd to C++ (a `Value` class with `shared_ptr` children and a topological sort). It cements the graph idea and uses your STL skills.

## Traps
- "I understand it from the video." You don't until you've written it from a blank file.
- Forgetting to **zero gradients** between steps (they accumulate).
- Using float32 for gradient checks. Use float64.

## Done when
- [ ] micrograd rewritten from memory · [ ] NumPy MLP ≥ 97% on MNIST · [ ] all skip-test derivations done on paper
