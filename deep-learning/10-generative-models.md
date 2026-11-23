# 10 · Generative Models
> **Goal:** learn the four big ideas for modeling $p(x)$: autoregressive, VAE, GAN, diffusion/flow. · **Time:** 25–35 h · **Needs:** 01, 05

🔭 This module is where physics pays off most: diffusion is Langevin dynamics, score matching is about gradients of log-densities, flow matching moves probability mass by ODEs (continuity equation), and energy-based models are Boltzmann distributions.

> [!GOAL]
> By the end of this chapter you can:
>
> - compare the four families of generative models and say when each is used;
> - derive the **ELBO**, explain the **reparameterization trick**, and train a VAE;
> - write the **GAN** objective and explain mode collapse;
> - explain **diffusion models** in both the noise-prediction and the score/SDE views, including classifier-free guidance and latent diffusion;
> - explain **flow matching**, the current state of the art, in one paragraph.

## Skip test
- [ ] Derive the **ELBO**: $\log p(x) \ge \mathbb E_{q(z|x)}[\log p(x|z)] - D_{KL}(q(z|x)\,\|\,p(z))$.
- [ ] Explain the **reparameterization trick** and why it's needed.
- [ ] Write the GAN min-max objective. Explain mode collapse.
- [ ] Describe the DDPM forward process $q(x_t\mid x_0)$ in closed form, and what the network predicts.
- [ ] Explain classifier-free guidance.
- [ ] Explain the idea of flow matching / rectified flow in one paragraph.

## 1 · What a generative model does

A classifier learns $p(y\mid x)$. A **generative model** learns the data distribution $p(x)$ itself, so it can produce **new samples** that look like the training data (images, audio, text, molecules), and sometimes evaluate how likely a sample is.

> [!DEF] The four families
> | Family | Idea | Pros | Cons | Used in |
> |---|---|---|---|---|
> | **Autoregressive** | $p(x)=\prod_t p(x_t\mid x_{<t})$ | exact likelihood, simple | slow sequential sampling | GPT, audio LMs |
> | **VAE** | latent $z$, maximize the ELBO | fast, smooth latent space | blurry samples | the latent space of Stable Diffusion |
> | **GAN** | generator vs discriminator game | sharp, fast sampling | unstable, mode collapse | StyleGAN, super-resolution |
> | **Diffusion / flow** | learn to reverse a noising process | top quality, stable training | many sampling steps | Stable Diffusion, image/video/audio models |
>
> Autoregressive models were covered in modules 07–09. This chapter covers the other three.

## 2 · Autoencoders and VAEs

> [!DEF] Autoencoder
> An **encoder** compresses $x$ into a small code $z$ (the **bottleneck**); a **decoder** reconstructs $\hat x$ from $z$; train on reconstruction error. It learns compression, but it isn't a generative model: random codes $z$ decode to garbage, because nothing organizes the code space.

> [!DEF] Variational autoencoder (VAE)
> Make the code space a probability distribution:
>
> - **prior** $p(z)=\mathcal N(0,I)$: how we'll sample new codes;
> - **encoder** $q_\phi(z\mid x) = \mathcal N(\boldsymbol\mu_\phi(x),\ \mathrm{diag}\,\boldsymbol\sigma^2_\phi(x))$: a fuzzy region of code space for each input;
> - **decoder** $p_\theta(x\mid z)$: turns a code into data.
>
> To generate, sample $z\sim\mathcal N(0,I)$ and decode.

> [!FORMULA] The ELBO (evidence lower bound)
> $$\log p_\theta(x) \;\ge\; \underbrace{\mathbb E_{q_\phi(z\mid x)}\big[\log p_\theta(x\mid z)\big]}_{\text{reconstruction}} \;-\; \underbrace{D_{KL}\big(q_\phi(z\mid x)\,\|\,p(z)\big)}_{\text{stay close to the prior}}$$
> Maximize the right-hand side over $\theta$ and $\phi$. The loss is −ELBO = reconstruction error + KL penalty.

> [!EXAMPLE] Deriving the ELBO
> $\log p(x) = \log\int p(x,z)\,dz = \log\mathbb E_{q(z\mid x)}\Big[\frac{p(x,z)}{q(z\mid x)}\Big] \ge \mathbb E_{q}\Big[\log\frac{p(x\mid z)\,p(z)}{q(z\mid x)}\Big]$ by Jensen's inequality ($\log$ is concave) $= \mathbb E_q[\log p(x\mid z)] - D_{KL}(q(z\mid x)\,\|\,p(z))$. The gap is exactly $D_{KL}(q(z\mid x)\,\|\,p(z\mid x))$, so the bound is tight when the encoder matches the true posterior.

> [!FORMULA] KL between Gaussians (closed form)
> For one latent dimension:
> $$D_{KL}\big(\mathcal N(\mu,\sigma^2)\,\|\,\mathcal N(0,1)\big) = \tfrac12\big(\mu^2+\sigma^2-1-\log\sigma^2\big)$$
> Sum over dimensions. It is 0 only when $\mu=0,\sigma=1$.

> [!DEF] Reparameterization trick
> We need gradients of $\mathbb E_{z\sim q_\phi}[\cdot]$ with respect to $\phi$, but you can't backpropagate through "draw a random sample". Rewrite the sample as a deterministic function of the parameters plus independent noise:
> $$z = \boldsymbol\mu_\phi(x) + \boldsymbol\sigma_\phi(x)\odot\boldsymbol\epsilon,\qquad\boldsymbol\epsilon\sim\mathcal N(0,I)$$
> Now the randomness sits in $\boldsymbol\epsilon$, and gradients flow through $\boldsymbol\mu$ and $\boldsymbol\sigma$ normally.

> [!INTUITION] Physics view
> The negative ELBO is the **variational free energy** of statistical mechanics: an "energy" term (reconstruction) minus an "entropy" term, minimized over a family of trial distributions.

## 3 · GANs

> [!FORMULA] The GAN game
> A **generator** $G$ turns noise $z$ into fake samples; a **discriminator** $D$ outputs the probability that its input is real. They play
> $$\min_G\max_D\ \mathbb E_{x\sim p_{\text{data}}}[\log D(x)] + \mathbb E_{z\sim p(z)}[\log(1-D(G(z)))]$$
> For a fixed $G$, the best discriminator is $D^*(x)=\frac{p_{\text{data}}(x)}{p_{\text{data}}(x)+p_G(x)}$, and the generator's objective then becomes (up to constants) the Jensen–Shannon divergence between $p_{\text{data}}$ and $p_G$.

> [!WARN] Mode collapse and instability
> The generator can "win" by producing only a few kinds of convincing samples (**mode collapse**: e.g. only one digit). Training is a moving target for both players and can oscillate or diverge. Fixes: Wasserstein GANs (WGAN), spectral normalization, careful architectures (StyleGAN). GANs are mostly displaced by diffusion, but adversarial losses live on (sharper VAE decoders, distilling diffusion models into one-step generators).

## 4 · Diffusion models

Idea: destroying data by adding noise is easy. **Learn to undo it**, one small step at a time. Then start from pure noise and run the undo process to create new data.

> [!FORMULA] Forward (noising) process
> Over $t=1..T$ (e.g. $T=1000$) add a little Gaussian noise with variance $\beta_t$. With $\alpha_t=1-\beta_t$ and $\bar\alpha_t=\prod_{s\le t}\alpha_s$, you can jump straight to any step:
> $$q(x_t\mid x_0) = \mathcal N\big(\sqrt{\bar\alpha_t}\,x_0,\ (1-\bar\alpha_t)I\big)\quad\Longleftrightarrow\quad x_t = \sqrt{\bar\alpha_t}\,x_0 + \sqrt{1-\bar\alpha_t}\,\boldsymbol\epsilon,\ \ \boldsymbol\epsilon\sim\mathcal N(0,I)$$
> As $t\to T$, $\bar\alpha_t\to0$ and $x_T$ is pure noise.

> [!FORMULA] Training (DDPM)
> Pick a random image $x_0$, a random step $t$ and random noise $\boldsymbol\epsilon$; build $x_t$; train a network to **predict the noise**:
> $$\mathcal L = \big\|\boldsymbol\epsilon - \boldsymbol\epsilon_\theta(x_t, t)\big\|^2$$
> **Literally an MSE regression.** That simplicity and stability is why diffusion overtook GANs.

> [!FORMULA] Sampling
> Start from $x_T\sim\mathcal N(0,I)$ and step backwards:
> $$x_{t-1} = \frac{1}{\sqrt{\alpha_t}}\Big(x_t - \frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\,\boldsymbol\epsilon_\theta(x_t,t)\Big) + \sigma_t\,\mathbf z,\qquad \mathbf z\sim\mathcal N(0,I)$$
> Each step removes a little predicted noise and adds back a little fresh noise. Many steps (hundreds) are needed in the original form.

> [!DEF] The score view
> The **score** of a distribution is $\nabla_x\log p(x)$: the direction in which the data becomes more likely. The noise predictor is a scaled score estimate, $\boldsymbol\epsilon_\theta(x_t,t)\approx-\sqrt{1-\bar\alpha_t}\,\nabla_x\log p_t(x_t)$. Sampling then looks like **Langevin dynamics** (follow the score uphill plus noise) and can be written as a reverse-time stochastic differential equation (Song et al., 2021).
>
> 🔭 Brownian motion forwards, a drift toward the data backwards; the densities evolve by a Fokker–Planck equation.

> [!DEF] Faster sampling
> **DDIM** turns sampling into a deterministic ODE that works with far fewer steps (e.g. 20–50). **Distillation** and **consistency models** train a student to jump in one to a few steps.

> [!FORMULA] Classifier-free guidance (CFG)
> Train one network both with the condition $c$ (e.g. a text prompt) and without it (by randomly dropping $c$). At sampling time, extrapolate away from the unconditional prediction:
> $$\hat{\boldsymbol\epsilon} = \boldsymbol\epsilon_\theta(x_t,\varnothing) + w\big(\boldsymbol\epsilon_\theta(x_t,c)-\boldsymbol\epsilon_\theta(x_t,\varnothing)\big)$$
> $w=1$ is plain conditioning; $w>1$ (e.g. 3–8) follows the prompt more closely at the cost of diversity.

> [!DEF] Latent diffusion and DiT
> Running diffusion on full-resolution pixels is expensive. **Latent diffusion** (Stable Diffusion) first compresses images with a VAE (e.g. 512×512×3 → 64×64×4) and runs diffusion in that latent space; the VAE decoder turns the result back into pixels. Text conditions the denoiser through cross-attention on text-encoder embeddings (CLIP/T5). The denoiser was a U-Net (module 06); modern models use a **Diffusion Transformer (DiT)**.

> [!VIDEO] iv-5mZ_9CPY | But how do AI images and videos actually work? | Welch Labs on 3Blue1Brown · 37 min

## 5 · Flow matching (current state of the art)

> [!FORMULA] Flow matching / rectified flow
> Learn a velocity field $v_\theta(x,t)$ so that following the ODE $\dot x = v_\theta(x,t)$ from $t=0$ to $1$ carries noise to data. Training is again a plain regression: take noise $x_0$, data $x_1$, a random $t$, the straight-line point $x_t = (1-t)\,x_0 + t\,x_1$, and minimize
> $$\mathcal L = \big\|v_\theta(x_t,t) - (x_1 - x_0)\big\|^2$$
> Paths are close to straight, so sampling needs few steps. Used in Stable Diffusion 3, Flux and many video models.

> [!INTUITION] Physics view
> The density moves by a continuity equation, $\partial_t p + \nabla\cdot(p\,v)=0$: the network learns the velocity field that transports probability mass from the noise distribution to the data distribution.

## 6 · Also know

> [!FORMULA] Normalizing flows
> Build $x = f(z)$ from a stack of **invertible** layers with easy Jacobian determinants. Then the exact likelihood follows from the change-of-variables formula:
> $$\log p(x) = \log p(z) + \log\Big|\det\frac{\partial z}{\partial x}\Big|,\qquad z=f^{-1}(x)$$

> [!DEF] Energy-based models
> $p(x) = e^{-E_\theta(x)}/Z$ with a learned energy $E_\theta$ (🔭 a Boltzmann distribution). Very flexible, but the normalizer $Z$ is intractable, so training and sampling rely on MCMC or score-based tricks.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **10 GenAI** deck and drill this chapter's key facts with spaced repetition, then do the practice questions below.

## Practice (answers hidden)

1. Compute $D_{KL}(\mathcal N(1, 0.5^2)\,\|\,\mathcal N(0,1))$ in one dimension.
<details><summary>Answer</summary>

$\tfrac12(1+0.25-1-\ln0.25)=\tfrac12(0.25+1.386)\approx0.82$ nats.
</details>

2. Why can't you just backpropagate through `z = torch.normal(mu, sigma)`, and how does the reparameterization fix it?
<details><summary>Answer</summary>

Sampling is not a differentiable function of `mu` and `sigma` (the gradient of a random draw is undefined). Writing `z = mu + sigma * eps` with `eps = torch.randn_like(mu)` makes `z` a smooth function of the parameters, and the randomness comes from an input that needs no gradient.
</details>

3. With $\bar\alpha_t=0.25$, write $x_t$ in terms of $x_0$ and $\boldsymbol\epsilon$. How much of the signal is left?
<details><summary>Answer</summary>

$x_t=0.5\,x_0+\sqrt{0.75}\,\boldsymbol\epsilon\approx0.5\,x_0+0.866\,\boldsymbol\epsilon$. Half the amplitude (a quarter of the variance) of the original image remains.
</details>

4. At the GAN optimum, $p_G=p_{\text{data}}$. What does the optimal discriminator output?
<details><summary>Answer</summary>

$D^*(x)=\frac{p}{p+p}=\tfrac12$ everywhere: it can't tell real from fake.
</details>

5. CFG with $w=3$: the unconditional prediction is $0.2$ and the conditional one $0.5$ (one coordinate). What is the guided prediction?
<details><summary>Answer</summary>

$0.2+3(0.5-0.2)=1.1$: pushed well past the conditional prediction, in the direction the prompt points.
</details>

6. In flow matching with $x_0=(0,0)$ (noise) and $x_1=(2,4)$ (data), what is $x_{0.25}$ and the regression target?
<details><summary>Answer</summary>

$x_{0.25}=0.75\,(0,0)+0.25\,(2,4)=(0.5,1)$; target $x_1-x_0=(2,4)$ (the same for every $t$ along this straight path).
</details>

## Build
1. **VAE on MNIST:** visualize the 2D latent space and interpolate between digits.
2. **DCGAN** on a small image dataset. Observe instabilities and mode collapse.
3. **DDPM from scratch** (small U-Net) on MNIST/Fashion-MNIST, then add **class conditioning + classifier-free guidance**.
4. **Flow matching on 2D toy data** (e.g. moons → spiral), then on MNIST. Compare sampling steps with DDPM.
5. Stretch: fine-tune Stable Diffusion with LoRA/DreamBooth on your own images using `diffusers`.

## Go deeper (all optional)
- ⭐ **[Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/)** ch. 14–18 (unsupervised, GANs, flows, VAEs, diffusion). The clearest unified treatment, with notebooks.
- ⭐ **[MIT 6.S184: Introduction to Flow Matching and Diffusion Models](https://diffusion.csail.mit.edu/)**: lecture notes + labs. Built on SDEs/ODEs, perfect for a physics mind.
- **Lilian Weng:** [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) · [From Autoencoder to Beta-VAE](https://lilianweng.github.io/posts/2018-08-12-vae/) · [From GAN to WGAN](https://lilianweng.github.io/posts/2017-08-20-gan/).
- **[Yang Song: Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/)**: the score/SDE view.
- **[Hugging Face Diffusion Models Course](https://github.com/huggingface/diffusion-models-class)** + the `diffusers` library.
- Papers: [VAE](https://arxiv.org/abs/1312.6114) · [GAN](https://arxiv.org/abs/1406.2661) · [DDPM](https://arxiv.org/abs/2006.11239) · [Score SDE](https://arxiv.org/abs/2011.13456) · [Latent Diffusion](https://arxiv.org/abs/2112.10752) · [CFG](https://arxiv.org/abs/2207.12598) · [DiT](https://arxiv.org/abs/2212.09748) · [Flow Matching](https://arxiv.org/abs/2210.02747).

## Done when
- [ ] ELBO derived on paper · [ ] your DDPM generates recognizable digits · [ ] you can explain diffusion in both the noise-prediction and the score/SDE views
