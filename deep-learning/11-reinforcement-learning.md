# 11 · Reinforcement Learning
> **Goal:** learn the core ideas of RL, deep RL algorithms, and RL's role in modern LLMs. · **Time:** 25–35 h · **Needs:** 01, 05

## Skip test
- [ ] Define an MDP $(S, A, P, R, \gamma)$, return, policy, $V^\pi$, $Q^\pi$.
- [ ] Write the Bellman expectation and optimality equations.
- [ ] Explain exploration vs exploitation and ε-greedy.
- [ ] Explain Q-learning's update, and what DQN adds (replay buffer, target network).
- [ ] Derive the policy gradient $\nabla J = \mathbb E[\nabla\log\pi_\theta(a|s)\,A(s,a)]$. Explain why baselines reduce variance.
- [ ] Explain PPO's clipped objective, and how RLHF/GRPO use it for LLMs.

## Core ideas
- **Setup:** an agent observes state $s$, takes action $a$, gets reward $r$ and next state $s'$. Goal: maximize the expected **return** $G_t = \sum_k \gamma^k r_{t+k}$.
- **Value functions:** $V^\pi(s) = \mathbb E_\pi[G_t\mid s]$, $Q^\pi(s,a) = \mathbb E_\pi[G_t\mid s,a]$. **Advantage** $A = Q - V$.
- **Bellman equation:** $Q^*(s,a) = \mathbb E[r + \gamma\max_{a'}Q^*(s',a')]$. A recursive consistency condition. 🔭 Analogous to the principle of optimality / Hamilton–Jacobi–Bellman.
- **Dynamic programming** (known model): value iteration, policy iteration.
- **Model-free, value-based:**
  - **TD learning:** bootstrap from your own estimate, $V(s) \leftarrow V(s) + \alpha[r + \gamma V(s') - V(s)]$.
  - **Q-learning:** off-policy TD on $Q$. **DQN** (Atari, 2013/15) = Q-learning + a neural net + **replay buffer** + **target network**.
- **Policy-based:**
  - **REINFORCE / policy gradient:** increase the log-probability of actions with high advantage. Unbiased but high-variance → subtract a **baseline** $V(s)$.
  - **Actor-critic:** the actor = policy, the critic = value estimate. **GAE** for advantage estimation.
  - **PPO:** clip the policy ratio $r_t = \pi_\theta/\pi_{old}$ to $[1-\epsilon, 1+\epsilon]$ for stable updates. **The workhorse algorithm.**
  - **SAC:** max-entropy RL for continuous control. 🔭 Free-energy / temperature again.
- **Model-based RL:** learn a world model and plan with it (MuZero, Dreamer). **AlphaGo/AlphaZero** = MCTS + policy/value nets + self-play.
- **RL ↔ LLMs:**
  - **RLHF:** reward = a learned human-preference model. PPO + KL penalty to stay close to the SFT model.
  - **RL with verifiable rewards:** reward = a correct math answer or passing unit tests. **GRPO** drops the critic and uses group-relative advantages over several sampled answers. This is what produces "reasoning" models.
  - Risk: **reward hacking**. The policy exploits flaws in the reward.
- **Why RL is hard:** sparse/delayed rewards, credit assignment, non-stationary data, high variance, and extreme sensitivity to hyperparameters and seeds.

## Learn from
- ⭐ **[Sutton & Barto: Reinforcement Learning, an Introduction (2nd ed.)](http://incompleteideas.net/book/the-book-2nd.html)**: free. Ch. 1–6, 9, 13. *The* foundational text.
- ⭐ **[OpenAI Spinning Up in Deep RL](https://spinningup.openai.com/)**: the bridge to deep RL. Read "Introduction to RL" parts 1–3, then the algorithm docs.
- **[David Silver's RL course (UCL/DeepMind)](https://www.davidsilver.uk/teaching/)**: classic lectures that pair with Sutton & Barto.
- **[Hugging Face Deep RL Course](https://huggingface.co/learn/deep-rl-course)**: hands-on and free.
- **[CleanRL](https://github.com/vwxyzjn/cleanrl)**: single-file, readable implementations to study. **[Gymnasium](https://gymnasium.farama.org/)** for environments.
- **[The 37 Implementation Details of PPO](https://iclr-blog-track.github.io/2022/03/25/ppo-implementation-details/)**: why your PPO doesn't work.
- Advanced: [UC Berkeley CS285 (Sergey Levine)](https://rail.eecs.berkeley.edu/deeprlcourse/).

## Build
1. **Tabular Q-learning** on FrozenLake / CliffWalking. Visualize the value function.
2. **DQN** on CartPole (then Atari Pong if you have a GPU).
3. **REINFORCE → actor-critic → PPO** on CartPole/LunarLander, each written by you and compared against CleanRL.
4. Stretch: a **GRPO-style** RL fine-tune of a tiny LM on arithmetic problems with a verifiable reward (`trl` has a `GRPOTrainer`).
5. 🔭 Fun: train an agent on a physics environment (MuJoCo via Gymnasium: Hopper, Ant).

## Done when
- [ ] Your PPO solves LunarLander · [ ] you can explain how RL is used to post-train LLMs
