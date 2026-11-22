# 10 · Generative Models
> **Goal:** learn the four big ideas for modeling $p(x)$: autoregressive, VAE, GAN, diffusion/flow. · **Time:** 25–35 h · **Needs:** 01, 05

🔭 This module is where physics pays off most: diffusion is Langevin dynamics, score matching is about gradients of log-densities, flow matching moves probability mass by ODEs (continuity equation), and energy-based models are Boltzmann distributions.

## Skip test
- [ ] Derive the **ELBO**: $\log p(x) \ge \mathbb E_{q(z|x)}[\log p(x|z)] - D_{KL}(q(z|x)\,\|\,p(z))$.
- [ ] Explain the **reparameterization trick** and why it's needed.
- [ ] Write the GAN min-max objective. Explain mode collapse.
- [ ] Describe the DDPM forward process $q(x_t\mid x_0)$ in closed form, and what the network predicts.
- [ ] Explain classifier-free guidance.
- [ ] Explain the idea of flow matching / rectified flow in one paragraph.

## Core ideas

### The landscape
| Family | Idea | Pros | Cons | Used in |
|---|---|---|---|---|
| **Autoregressive** | $p(x)=\prod p(x_t\mid x_{<t})$ | exact likelihood, simple | slow sequential sampling | GPT, audio LMs |
| **VAE** | latent $z$, maximize ELBO | fast, smooth latent space | blurry samples | latent space for Stable Diffusion |
| **GAN** | generator vs discriminator game | sharp, fast sampling | unstable, mode collapse | StyleGAN, super-resolution |
| **Diffusion / flow** | learn to reverse a noising process | top quality, stable training | many sampling steps | Stable Diffusion, image/video/audio models |

### Autoencoders & VAEs
- **Autoencoder:** encoder → bottleneck $z$ → decoder, trained to reconstruct. It compresses, but it isn't a generative model.
- **VAE:** encoder outputs $q_\phi(z\mid x) = \mathcal N(\mu,\sigma^2)$, prior $p(z)=\mathcal N(0,I)$.
  - Loss = −ELBO = reconstruction + KL. **Reparameterize** $z = \mu + \sigma\odot\epsilon,\ \epsilon\sim\mathcal N(0,I)$ so gradients flow through the sampling step.
  - 🔭 The ELBO is the (negative) **variational free energy** from statistical mechanics.

### GANs
- $\min_G\max_D\ \mathbb E[\log D(x)] + \mathbb E[\log(1 - D(G(z)))]$, a two-player game.
- Problems: unstable training, **mode collapse**. Fixes: WGAN (Wasserstein distance), spectral norm, StyleGAN tricks. Mostly displaced by diffusion, but the ideas live on (adversarial losses in VAE decoders, distillation).

### Diffusion models (DDPM)
- **Forward:** gradually add Gaussian noise, $q(x_t\mid x_0) = \mathcal N(\sqrt{\bar\alpha_t}\,x_0,\ (1-\bar\alpha_t)I)$. So $x_t = \sqrt{\bar\alpha_t}\,x_0 + \sqrt{1-\bar\alpha_t}\,\epsilon$.
- **Train:** a network $\epsilon_\theta(x_t, t)$ predicts the noise. Loss $\|\epsilon - \epsilon_\theta(x_t,t)\|^2$. **Literally an MSE regression.**
- **Sample:** start from pure noise and denoise step by step.
- **Score view:** $\epsilon_\theta \propto -\nabla_x \log p_t(x)$ (the **score**). Sampling = **Langevin dynamics** / a reverse-time SDE (Song et al.). 🔭 Fokker–Planck, Brownian motion.
- **Speedups:** DDIM (deterministic ODE sampling, fewer steps), consistency models, distillation.
- **Conditioning:** text via cross-attention (CLIP/T5 embeddings). **Classifier-free guidance:** $\hat\epsilon = \epsilon_{uncond} + w(\epsilon_{cond} - \epsilon_{uncond})$.
- **Latent diffusion (Stable Diffusion):** diffuse in a VAE's latent space → much cheaper. Backbone: U-Net → **Diffusion Transformer (DiT)** in modern models.

### Flow matching / rectified flow (current state of the art)
- Learn a velocity field $v_\theta(x,t)$ whose ODE $\dot x = v_\theta$ carries noise to data along (nearly) straight paths. With $x_0$ = noise and $x_1$ = data, interpolate linearly $x_t = (1-t)x_0 + t x_1$ and regress $v_\theta(x_t,t)$ onto $x_1 - x_0$. That's again a plain MSE.
- 🔭 A continuity equation $\partial_t p + \nabla\cdot(p v) = 0$ is transporting probability mass. Used in Stable Diffusion 3, Flux, and many video models.

### Also know
- **Normalizing flows:** invertible maps with exact likelihood via the change of variables $\log p(x) = \log p(z) + \log|\det \partial z/\partial x|$.
- **Energy-based models:** $p(x) \propto e^{-E(x)}$ (🔭 Boltzmann). Hard to normalize, sampled with MCMC.

## Learn from
- ⭐ **[Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/)** ch. 14–18 (unsupervised, GANs, flows, VAEs, diffusion). The clearest unified treatment, with notebooks.
- ⭐ **[MIT 6.S184: Introduction to Flow Matching and Diffusion Models](https://diffusion.csail.mit.edu/)**: lecture notes + labs. Built on SDEs/ODEs, perfect for a physics mind.
- **Lilian Weng:** [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) · [From Autoencoder to Beta-VAE](https://lilianweng.github.io/posts/2018-08-12-vae/) · [From GAN to WGAN](https://lilianweng.github.io/posts/2017-08-20-gan/).
- **[Yang Song: Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.net/blog/2021/score/)**: the score/SDE view.
- **[Hugging Face Diffusion Models Course](https://github.com/huggingface/diffusion-models-class)** + the `diffusers` library.
- Papers: [VAE](https://arxiv.org/abs/1312.6114) · [GAN](https://arxiv.org/abs/1406.2661) · [DDPM](https://arxiv.org/abs/2006.11239) · [Score SDE](https://arxiv.org/abs/2011.13456) · [Latent Diffusion](https://arxiv.org/abs/2112.10752) · [CFG](https://arxiv.org/abs/2207.12598) · [DiT](https://arxiv.org/abs/2212.09748) · [Flow Matching](https://arxiv.org/abs/2210.02747).

## Build
1. **VAE on MNIST:** visualize the 2D latent space and interpolate between digits.
2. **DCGAN** on a small image dataset. Observe instabilities and mode collapse.
3. **DDPM from scratch** (small U-Net) on MNIST/Fashion-MNIST, then add **class conditioning + classifier-free guidance**.
4. **Flow matching on 2D toy data** (e.g. moons → spiral), then on MNIST. Compare sampling steps with DDPM.
5. Stretch: fine-tune Stable Diffusion with LoRA/DreamBooth on your own images using `diffusers`.

## Done when
- [ ] ELBO derived on paper · [ ] your DDPM generates recognizable digits · [ ] you can explain diffusion in both the noise-prediction and the score/SDE views
