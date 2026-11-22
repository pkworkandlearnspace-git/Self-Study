# Self-Study
A repo for learning any topic in depth, without wasting time on things I already know.

Each topic has one folder containing a **roadmap**, short **modules** you can skim, a **cheatsheet** for quick recaps, a **progress log**, and an **`interactive/`** folder of visual tools. All the material sits in one place instead of scattered across tabs.

---

## Topics

| Topic | Level | Written material | Interactive |
|---|---|---|---|
| 🧮 **Math Olympiad** (IMO track) | regional → national → IMO | [`math-olympiad/`](math-olympiad/README.md) | triangle centers, modular lab, flashcards |
| ⚛️ **Physics Olympiad** (IPhO track) | regional → national → IPhO | [`physics-olympiad/`](physics-olympiad/README.md) | orbits, oscillator, interference, linear fit, flashcards |
| 💻 **Informatics Olympiad** (IOI track) | regional → national → IOI | [`informatics-olympiad/`](informatics-olympiad/README.md) | graph search, segment tree, DP table, flashcards |
| 🗣️ **IELTS Academic** | target band 7.0–7.5 | [`ielts/`](ielts/README.md) | band calculator, writing timer, speaking practice, flashcards |
| 🧠 **Deep Learning** | beginner → research | [`deep-learning/`](deep-learning/README.md) | optimizer landscape, NN playground, attention, flashcards |

**Open the interactive tools:** download/clone the repo and open **[`index.html`](index.html)** in a browser. It links every tool, and everything works offline. (GitHub shows `.html` files as source code. To use them online, turn on GitHub Pages for this repo.)

---

## How to split your time (senior year)

The olympiads and IELTS have **hard deadlines this year**. Deep learning doesn't, so it can wait or run slowly in the background.

1. **Pick ONE primary olympiad** (the one where you're strongest or closest to the national team) and give it ~60% of your study time. Medal-level preparation for all three at once rarely works. Keep a second olympiad at maintenance level if its selection rounds are worth entering.
2. **IELTS:** ~5–7 h/week for 8–10 weeks before your test date. Take the test early enough for one retake before your application deadlines.
3. **Deep Learning:** ~2–3 h/week of fun (modules 01–04), then speed up after the olympiad season. The olympiad math and physics will make it much easier.

| Period | Primary olympiad | 2nd olympiad | IELTS | Deep learning |
|---|---|---|---|---|
| Until national selection | 8–10 h/wk | 0–3 h/wk | 5–7 h/wk (in the 10 weeks before the test) | 0–2 h/wk |
| Selection → international olympiad | 10–15 h/wk | — | done (hopefully!) | 0–2 h/wk |
| After the olympiad season | — | — | — | 10+ h/wk |

Fill in the **Key dates** table at the top of each topic's `progress.md` first. Everything else gets planned backwards from those dates.

---

## How this repo cuts learning overhead
1. **Skip tests first.** Every module begins with a *Skip test*. If you can do it all, skip the module.
2. **One main resource per idea** (⭐). Everything else is optional.
3. **Recap, don't reread.** Skim the *Core ideas* + `cheatsheet.md` and drill the **flashcards** (spaced repetition).
4. **See it, then build it.** Use the interactive tools for intuition. A module is done once its *Build* works.
5. **Log as you go.** Write 3–5 lines in `progress.md` after each session.

## Repo layout
```
Self-Study/
├── index.html                ← hub for all interactive tools (open in a browser)
├── _shared/                  ← shared style + flashcard engine for the interactive pages
├── _template/                ← copy this to start a new topic
├── math-olympiad/            ← README, 01–06 modules, cheatsheet, resources, progress, interactive/
├── physics-olympiad/         ← README, 01–07 modules, …, interactive/
├── informatics-olympiad/     ← README, 01–07 modules, …, interactive/
├── ielts/                    ← README, 01–07 modules, …, interactive/
└── deep-learning/            ← README, 01–12 modules, …, interactive/
```
