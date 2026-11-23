# 11 · Reinforcement Learning
> **Goal:** learn the core ideas of RL, deep RL algorithms, and RL's role in modern LLMs. · **Time:** 25–35 h · **Needs:** 01, 05

> [!GOAL]
> By the end of this chapter you can:
>
> - define a Markov decision process, returns, policies and value functions;
> - write the **Bellman equations** and solve small problems with value iteration;
> - learn from experience with **TD learning and Q-learning**, and scale it up with **DQN**;
> - derive the **policy gradient**, and explain baselines, actor-critic, GAE and **PPO**;
> - explain how RL post-trains LLMs (RLHF, GRPO) and why reward hacking is a risk.

## Skip test
- [ ] Define an MDP $(S, A, P, R, \gamma)$, return, policy, $V^\pi$, $Q^\pi$.
- [ ] Write the Bellman expectation and optimality equations.
- [ ] Explain exploration vs exploitation and ε-greedy.
- [ ] Explain Q-learning's update, and what DQN adds (replay buffer, target network).
- [ ] Derive the policy gradient $\nabla J = \mathbb E[\nabla\log\pi_\theta(a|s)\,A(s,a)]$. Explain why baselines reduce variance.
- [ ] Explain PPO's clipped objective, and how RLHF/GRPO use it for LLMs.

## 1 · The reinforcement-learning problem

In supervised learning someone tells the model the right answer. In **reinforcement learning (RL)** an **agent** acts in an **environment** and only receives a **reward** signal saying how good things went, often much later. It must discover good behaviour by trial and error.

> [!DEF] Markov decision process (MDP)
> An MDP is a tuple $(S, A, P, R, \gamma)$:
>
> - $S$: states, $A$: actions;
> - $P(s'\mid s,a)$: the probability of moving to $s'$ after taking $a$ in $s$;
> - $R(s,a)$: the expected reward;
> - $\gamma\in[0,1)$: the **discount factor**.
>
> **Markov** means the next state depends only on the current state and action, not on the earlier history. At each step: observe $s_t$, choose $a_t$, receive $r_t$ and $s_{t+1}$.

> [!DEF] Policy and return
> A **policy** $\pi(a\mid s)$ is the agent's behaviour: the probability of each action in each state. The **return** from time $t$ is the discounted sum of future rewards:
> $$G_t = r_t + \gamma r_{t+1} + \gamma^2 r_{t+2}+\dots = \sum_{k\ge0}\gamma^k r_{t+k}$$
> The goal is a policy that maximizes the expected return. $\gamma$ makes near rewards count more than far ones and keeps infinite sums finite.

> [!EXAMPLE] A return
> Rewards $1, 0, 2$ then nothing, $\gamma=0.9$: $G_0 = 1 + 0.9\cdot0 + 0.81\cdot2 = 2.62$.

> [!DEF] Exploration vs exploitation
> To do well you must **exploit** what you know (pick the best-looking action) but also **explore** (try others, which might be better). **ε-greedy:** with probability $\varepsilon$ take a random action, otherwise the greedy one; decay $\varepsilon$ over time.

> [!VIDEO] 2pWv7GOvuf0 | RL Course by David Silver, Lecture 1: Introduction to Reinforcement Learning | David Silver (UCL / DeepMind), the first of 10 lectures

## 2 · Value functions and the Bellman equations

> [!DEF] Value functions and advantage
> $$\begin{aligned} V^\pi(s) &= \mathbb E_\pi[G_t\mid s_t=s]\\ Q^\pi(s,a) &= \mathbb E_\pi[G_t\mid s_t=s,\,a_t=a]\\ A^\pi(s,a) &= Q^\pi(s,a)-V^\pi(s)\end{aligned}$$
> $V$: how good is this state (following $\pi$)? $Q$: how good is this action here? The **advantage** $A$: how much better is this action than the policy's average?

> [!FORMULA] Bellman equations
> **Expectation** (for a given policy): the value of a state is the immediate reward plus the discounted value of where you end up:
> $$V^\pi(s) = \sum_a\pi(a\mid s)\Big[R(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\,V^\pi(s')\Big]$$
> **Optimality** (for the best policy):
> $$Q^*(s,a) = R(s,a) + \gamma\sum_{s'}P(s'\mid s,a)\,\max_{a'}Q^*(s',a')$$
> Once you know $Q^*$, the optimal policy is simply greedy: $\pi^*(s)=\arg\max_a Q^*(s,a)$. 🔭 The same principle of optimality underlies the Hamilton–Jacobi–Bellman equation in control.

> [!DEF] Dynamic programming (when the model is known)
> **Value iteration:** start with $V=0$ and repeatedly apply $V(s)\leftarrow\max_a\big[R(s,a)+\gamma\sum_{s'}P(s'\mid s,a)V(s')\big]$ until it stops changing. **Policy iteration:** alternate evaluating the current policy and making it greedy with respect to its values. Both need $P$ and $R$, which real problems rarely give you.

> [!EXAMPLE] Value iteration on a tiny chain
> States A → B → goal. Moving right gives reward 0, except B → goal which gives 1. $\gamma=0.9$. After convergence: $V(B)=1$, $V(A)=0+0.9\cdot1=0.9$. Values "flow back" from the reward, discounted at each step.

## 3 · Learning from experience: TD and Q-learning

> [!FORMULA] Temporal-difference (TD) learning
> After one step $(s, r, s')$, move $V(s)$ toward a **bootstrapped** target, using your own estimate of the next state:
> $$V(s)\leftarrow V(s)+\alpha\big[\underbrace{r+\gamma V(s')}_{\text{TD target}}-V(s)\big]$$
> The bracket is the **TD error** $\delta$. Unlike Monte Carlo (wait for the full return), TD learns after every step.

> [!EXAMPLE] One TD update
> $V(s)=0.5$, $r=1$, $\gamma=0.9$, $V(s')=2$, $\alpha=0.1$. Target $=1+1.8=2.8$, error $=2.3$, new $V(s)=0.5+0.23=0.73$.

> [!FORMULA] Q-learning
> $$Q(s,a)\leftarrow Q(s,a)+\alpha\Big[r+\gamma\max_{a'}Q(s',a')-Q(s,a)\Big]$$
> **Off-policy:** the target uses the best next action regardless of what the agent actually does next, so it learns $Q^*$ even while exploring with ε-greedy. (SARSA uses the action actually taken instead: on-policy.)

> [!DEF] Deep Q-network (DQN)
> Replace the table with a neural net $Q_\theta(s,a)$ (Atari from pixels, 2013/2015) and minimize $\big(r+\gamma\max_{a'}Q_{\bar\theta}(s',a')-Q_\theta(s,a)\big)^2$. Two tricks make it stable:
>
> - **Replay buffer:** store past transitions and train on random mini-batches of them, breaking the correlation between consecutive steps.
> - **Target network** $Q_{\bar\theta}$: a slowly updated copy used for the target, so the network isn't chasing its own moving prediction.

## 4 · Policy gradients

Value-based methods struggle with continuous or huge action spaces. **Policy-gradient** methods instead parameterize the policy directly, $\pi_\theta(a\mid s)$ (e.g. a network outputting action probabilities), and do gradient ascent on the expected return $J(\theta)$.

> [!FORMULA] The policy gradient theorem
> $$\nabla_\theta J(\theta) = \mathbb E_{\pi_\theta}\Big[\sum_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)\;A_t\Big]$$
> **Meaning:** raise the log-probability of actions that turned out better than average ($A_t>0$) and lower it for worse ones.

> [!EXAMPLE] Where it comes from (the log-derivative trick)
> For a trajectory $\tau$ with probability $p_\theta(\tau)$ and return $R(\tau)$: $\nabla_\theta\mathbb E[R] = \int R\,\nabla_\theta p_\theta = \int R\,p_\theta\nabla_\theta\log p_\theta = \mathbb E[R\,\nabla_\theta\log p_\theta(\tau)]$. The environment's transition probabilities don't depend on $\theta$, so $\nabla_\theta\log p_\theta(\tau)=\sum_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)$. No model of the environment needed.

> [!DEF] REINFORCE and baselines
> **REINFORCE** uses the sampled return $G_t$ in place of $A_t$: unbiased but very noisy. Subtracting a **baseline** $b(s_t)$ that doesn't depend on the action (usually $V(s_t)$) keeps the gradient unbiased, because $\mathbb E[\nabla\log\pi\cdot b(s)]=b(s)\nabla\sum_a\pi(a\mid s)=0$, while greatly reducing variance.

> [!DEF] Actor-critic and GAE
> The **actor** is the policy; the **critic** learns $V(s)$ to provide the baseline. **Generalized advantage estimation** blends one-step and long-horizon estimates:
> $$\delta_t = r_t+\gamma V(s_{t+1})-V(s_t),\qquad \hat A_t = \sum_{l\ge0}(\gamma\lambda)^l\,\delta_{t+l}$$
> $\lambda=0$: low variance, more bias; $\lambda=1$: Monte Carlo. $\lambda\approx0.95$ is typical.

> [!FORMULA] PPO (proximal policy optimization)
> With the probability ratio $r_t(\theta)=\pi_\theta(a_t\mid s_t)/\pi_{\text{old}}(a_t\mid s_t)$:
> $$L^{\text{CLIP}}(\theta)=\mathbb E_t\Big[\min\big(r_t\hat A_t,\ \mathrm{clip}(r_t,\,1-\epsilon,\,1+\epsilon)\,\hat A_t\big)\Big],\qquad\epsilon\approx0.2$$
> Collect a batch with the old policy, then take several gradient steps on it; the clip removes any incentive to move the policy too far in one update. Simple, robust: **the workhorse algorithm** of deep RL and RLHF.

> [!DEF] Other important ideas
> - **SAC** (soft actor-critic): maximize reward *plus* policy entropy, for continuous control. 🔭 Free energy at a temperature again.
> - **Model-based RL:** learn a model of the environment and plan with it (Dreamer, MuZero).
> - **AlphaGo / AlphaZero:** Monte-Carlo tree search guided by policy and value networks, trained by self-play.

## 5 · RL for large language models

> [!DEF] The LLM as a policy
> State = the prompt plus the tokens so far; action = the next token; the episode ends when the answer is complete, and a **reward** scores the whole answer.
>
> - **RLHF:** reward from a learned human-preference model, optimized with PPO plus a KL penalty to the SFT model (module 09).
> - **RL with verifiable rewards:** reward = the math answer is correct, or the code passes the unit tests. **GRPO** samples a group of answers per prompt and uses each answer's reward relative to the group, $A_i=(r_i-\bar r)/\mathrm{std}(r)$, in a PPO-style update with no critic network. This is what produces "reasoning" models.

> [!WARN] Reward hacking
> The policy maximizes the reward you wrote, not the one you meant: e.g. a reward model that likes long answers gets padded answers; a test-based reward gets code that special-cases the tests. KL penalties, better reward models and careful evaluation are the defences.

> [!KEY] Why RL is hard
> Sparse and delayed rewards (credit assignment), data that changes as the policy changes, high-variance gradients, and extreme sensitivity to hyperparameters and random seeds. Always run several seeds and compare against a known-good implementation.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **11 RL** deck and drill this chapter's key facts with spaced repetition, then do the practice questions below.

## Practice (answers hidden)

1. Rewards $0, 0, 0, 10$ (then the episode ends), $\gamma=0.9$. What is $G_0$? And with $\gamma=0.5$?
<details><summary>Answer</summary>

$0.9^3\cdot10=7.29$; $0.5^3\cdot10=1.25$. A smaller $\gamma$ makes the agent short-sighted.
</details>

2. Q-learning: $Q(s,a)=2$, $r=-1$, $\gamma=0.9$, $\max_{a'}Q(s',a')=5$, $\alpha=0.5$. What is the new $Q(s,a)$?
<details><summary>Answer</summary>

Target $=-1+4.5=3.5$; error $=1.5$; new $Q=2+0.75=2.75$.
</details>

3. Why does DQN need a replay buffer and a target network, when tabular Q-learning doesn't?
<details><summary>Answer</summary>

With a neural net, updating on one transition changes $Q$ everywhere. Consecutive transitions are highly correlated (breaking the i.i.d. assumption of SGD), and the target moves every time the network updates, which can make learning oscillate or diverge. The buffer decorrelates the data; the frozen target stabilizes the regression target.
</details>

4. Show that subtracting a baseline $b(s)$ doesn't bias the policy gradient.
<details><summary>Answer</summary>

$\mathbb E_{a\sim\pi}[\nabla_\theta\log\pi_\theta(a\mid s)\,b(s)] = b(s)\sum_a\pi_\theta(a\mid s)\nabla_\theta\log\pi_\theta(a\mid s) = b(s)\nabla_\theta\sum_a\pi_\theta(a\mid s)=b(s)\nabla_\theta1=0$.
</details>

5. In PPO with $\epsilon=0.2$, an action has $\hat A=+1$ and the ratio is already $1.5$. What is its contribution to the objective, and its gradient?
<details><summary>Answer</summary>

$\min(1.5\cdot1,\ 1.2\cdot1)=1.2$. It's on the clipped branch, which is constant in $\theta$, so the gradient is 0: no further push to increase that action's probability in this update.
</details>

6. GRPO samples four answers with rewards $1, 0, 0, 1$. What are the advantages?
<details><summary>Answer</summary>

Mean $0.5$, standard deviation $0.5$: advantages $+1, -1, -1, +1$. Correct answers are reinforced, incorrect ones discouraged, with no critic.
</details>

## Build
1. **Tabular Q-learning** on FrozenLake / CliffWalking. Visualize the value function.
2. **DQN** on CartPole (then Atari Pong if you have a GPU).
3. **REINFORCE → actor-critic → PPO** on CartPole/LunarLander, each written by you and compared against CleanRL.
4. Stretch: a **GRPO-style** RL fine-tune of a tiny LM on arithmetic problems with a verifiable reward (`trl` has a `GRPOTrainer`).
5. 🔭 Fun: train an agent on a physics environment (MuJoCo via Gymnasium: Hopper, Ant).

## Go deeper (all optional)
- ⭐ **[Sutton & Barto: Reinforcement Learning, an Introduction (2nd ed.)](http://incompleteideas.net/book/the-book-2nd.html)**: free. Ch. 1–6, 9, 13. *The* foundational text.
- ⭐ **[OpenAI Spinning Up in Deep RL](https://spinningup.openai.com/)**: the bridge to deep RL. Read "Introduction to RL" parts 1–3, then the algorithm docs.
- **[David Silver's RL course (UCL/DeepMind)](https://www.davidsilver.uk/teaching/)**: classic lectures that pair with Sutton & Barto (lecture 1 is embedded above).
- **[Hugging Face Deep RL Course](https://huggingface.co/learn/deep-rl-course)**: hands-on and free.
- **[CleanRL](https://github.com/vwxyzjn/cleanrl)**: single-file, readable implementations to study. **[Gymnasium](https://gymnasium.farama.org/)** for environments.
- **[The 37 Implementation Details of PPO](https://iclr-blog-track.github.io/2022/03/25/ppo-implementation-details/)**: why your PPO doesn't work.
- Advanced: [UC Berkeley CS285 (Sergey Levine)](https://rail.eecs.berkeley.edu/deeprlcourse/).

## Done when
- [ ] Your PPO solves LunarLander · [ ] you can explain how RL is used to post-train LLMs
