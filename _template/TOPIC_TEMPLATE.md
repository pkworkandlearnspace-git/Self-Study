# Template: a new topic

Copy this folder layout to start a topic:

```
<topic-name>/
├── README.md        ← roadmap (use the "Roadmap" section below)
├── 01-<module>.md   ← one file per module (use the "Module" section below)
├── cheatsheet.md    ← formulas / commands / facts, one page
├── resources.md     ← ⭐ main resource per area + optional extras
├── progress.md      ← checklist + learning log
└── interactive/     ← index.html + visual tools; link ../../_shared/style.css
                       and reuse ../../_shared/flashcards.js for a flashcard deck
```

---

## Roadmap (topic README.md)

```markdown
# <Topic>
**Why I'm learning it:** …
**Target level:** …   **Time budget:** … h/week → ~… months

| Phase | Modules | Time | Outcome |
|---|---|---|---|
| 1. Foundations | 01, 02 | 3 wk | can … |
| 2. Core | 03–05 | 6 wk | can … |
| 3. Advanced | 06+ | open | can … |
```

---

## Module (NN-<name>.md)

```markdown
# NN · <Module name>
> **Goal:** one sentence. · **Time:** ~X h · **Needs:** modules …

## Skip test
If you can do ALL of these without notes, skip the module.
- [ ] …

## Core ideas (skim this to recap)
- **Idea** — one-line explanation. Key formula.

## Learn from
- ⭐ **Main resource** — what to use from it (chapters/lectures)
- Optional: …

## Build
- Project that proves you understand it.

## Traps
- Common misunderstanding → correction.

## Done when
- [ ] Build works  - [ ] can explain X to someone else
```

---

## Progress log entry

```markdown
### YYYY-MM-DD · module NN · 1.5 h
- Did: …
- Clicked: …
- Still fuzzy: …   ← review this next session
```
