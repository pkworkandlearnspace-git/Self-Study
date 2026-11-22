# Self-Study

A repo for learning any topic in depth, without wasting time on things I already know.

Each topic gets one folder with a **roadmap**, short **modules** you can skim, a **cheatsheet** for quick recaps, and a **progress log**. That way all the material sits in one place and I never have to piece it together from scattered tabs again.

---

## Topics

| Status | Topic | Start here |
|---|---|---|
| 🟢 Active | **Deep Learning** (beginner → research level) | [`deep-learning/README.md`](deep-learning/README.md) |
| ⚪ Planned | *(add the next topic with the [template](_template/TOPIC_TEMPLATE.md))* | — |

Ideas for later topics (they connect well with deep learning): GPU / CUDA programming, Reinforcement Learning (in depth), Computational Physics, Probability Theory, Algorithms & Competitive Programming, Computer Systems.

---

## How this repo cuts learning overhead

1. **Skip tests first.** Every module begins with a *Skip test*. If you can answer every item without looking anything up, skip the module. This keeps you from relearning things you already know.
2. **One main resource per idea.** Each module marks ⭐ the **one** resource to use. Everything else is optional. Pick one and finish it instead of collecting ten.
3. **Recap, don't reread.** The *Core ideas* section of each module is a skimmable summary. Come back to it, not to a 60-hour course.
4. **Build to prove it.** A module is done once its *Build* project works, not when the videos are watched.
5. **Log as you go.** Write 3–5 lines in the topic's `progress.md` after each session. Future-you can then see exactly where you stopped and what was hard.

## Repo layout

```
Self-Study/
├── README.md                  ← you are here (index of all topics)
├── _template/TOPIC_TEMPLATE.md← copy this to start a new topic
└── deep-learning/
    ├── README.md              ← roadmap, phases, timeline
    ├── 01-…12-*.md            ← modules (skimmable)
    ├── cheatsheet.md          ← every key formula on one page
    ├── resources.md           ← curated master list + paper reading order
    └── progress.md            ← checklist + learning log
```
