# 06 · Contest Practice & Solution Writing
> **Goal:** turn knowledge into points under exam conditions. · **Time:** ongoing from week 3

> [!GOAL]
> By the end of this chapter you can:
>
> - run realistic **mock exams** and grade them honestly on the IMO 0–7 scale;
> - manage the 4.5 hours: reading, small cases, choosing a problem, switching, writing up;
> - write solutions that collect **partial credit** when you don't finish;
> - learn from every mock with a structured **post-mortem**;
> - choose problems at the right difficulty from the right sources.

## 1 · How the IMO is scored

> [!DEF] The format
> Two consecutive days, **3 problems per day, 4.5 hours per day**, each problem worth **7 points** (42 total). Problems cover algebra, combinatorics, geometry and number theory, ordered roughly easy → hard: problems 1 and 4 are the most accessible, 3 and 6 the hardest. At most half of the contestants receive medals, in a gold : silver : bronze ratio of about $1:2:3$; a contestant without a medal who scores 7 on some problem gets an honourable mention. National olympiads often copy this format.

> [!DEF] What earns points
> - **7:** a complete, correct proof (minor slips may cost a point).
> - **1–3 typical partial credit:** substantial progress defined in the marking scheme, e.g. a key lemma proved, a correct reduction, the right answer with a construction *and* part of the bound.
> - **0:** the answer alone, examples, unjustified claims, an idea without proof, "it is easy to see".
>
> A "nearly complete" proof with a real gap usually scores **0–2, not 6**. Grade yourself that strictly.

## 2 · The mock-exam routine

> [!KEY] Make mocks realistic
> 3 problems, 4.5 hours, no notes, no internet, a real timer, scrap paper, a clean final write-up. Use past national olympiads → **IMO Shortlist (ISL)** → past IMOs, at the right difficulty (section 5). From week 3 of your preparation, sit one mock a week.

> [!DEF] Time plan for 4.5 hours
> 1. **First 30 minutes:** read **all three** problems. Try small cases on each. Note first ideas.
> 2. **Choose:** spend most of your time on the problem you are **most likely to fully solve** (usually the first), not the most interesting one.
> 3. **Switch rule:** if you've had no new idea for ~45 minutes, move to another problem and come back later; a fresh look often unlocks it.
> 4. **Last 45–60 minutes:** write up. A solved-but-unwritten problem scores 0. Write partial progress on unsolved problems too.

> [!EXAMPLE] A post-mortem log entry
> *Mock 7, Problem 2 (number theory), score 2/7.* I found the answer $n=1$ from small cases and proved $n$ is odd, but missed the key idea: **take the smallest prime factor $p$ of $n$ and use $\operatorname{ord}_p(2)\mid\gcd(n,p-1)$**. What would have led me there faster: the expression $2^n-1$ with $n$ in the exponent should trigger "orders". Next time: when a variable appears both as modulus and exponent, try the smallest prime factor + orders.

> [!KEY] Post-mortem every mock
> For each problem write: (1) your score and why; (2) the **key idea in one line**; (3) **what should have triggered it**; (4) any write-up mistakes. Keep these in `progress.md`. Re-reading this log before contests is worth more than any new theory.

## 3 · Writing under time pressure

> [!KEY] A solution template
> 1. **Answer** (for "find all" / "determine"): state it first.
> 2. **Setup:** notation and any WLOG, with justification.
> 3. **Claims:** numbered lemmas, each followed by its proof.
> 4. **Main argument:** how the claims combine.
> 5. **Verification:** the answer actually works (for "find all"), or the construction (for extremal problems).

> [!WARN] Common write-up losses
> - "Find all" solutions that never check the answers satisfy the conditions.
> - Extremal problems with only the bound or only the construction.
> - Geometry proofs that rely on one drawing's configuration.
> - Skipped "obvious" cases ($n=1$, equal variables, degenerate triangles).
> - Messy scratch work submitted instead of a clean, ordered write-up.

> [!KEY] Collecting partial credit
> If you can't finish: write down every result you **did** prove as a clearly stated claim (e.g. "Claim: $n$ must be odd"), the reduction you found ("it suffices to show…"), the answer with its construction, and small cases you verified. Graders reward substantial, correctly proven progress; they don't reward vague outlines.

## 4 · Training beyond mocks

> [!DEF] A balanced week (~10–12 h)
> | Day | Do |
> |---|---|
> | 3 days | **Topic study:** one handout section, then 4–6 problems from it |
> | 1 day | **Hard problem:** one problem above your level, 1.5–2 h, no hints for the first hour |
> | 1 day | **Mock:** 3 problems in 4.5 h, graded strictly |
> | 1 day | **Review:** clean write-ups, read official solutions, update the post-mortem log |

> [!KEY] Using hints and solutions well
> Stay stuck for **at least 30–60 minutes** before looking at a hint. Read one hint, then try again. After reading a full solution, close it and write it yourself from memory the next day, and record the one-line key idea. Solutions you only read are forgotten; solutions you reconstruct are learned.

## 5 · Where to find problems, and at what level

> [!DEF] The difficulty ladder (roughly)
> school/regional rounds → national olympiad → hard national olympiads and regional international contests (e.g. USAMO, Balkan MO, APMO) → ISL easy (A1/C1/G1/N1) → IMO P1/P4 → ISL medium → IMO P2/P5 → IMO P3/P6.
>
> Work mostly at the level where you solve **about half** the problems in the time limit: easier is too comfortable, harder gives too little feedback.

> [!LEARN]
> - ⭐ **[AoPS Contest Collections](https://artofproblemsolving.com/community/c13_contest_collections)**: almost every olympiad ever, with community solutions.
> - ⭐ **[IMO official site: problems & results](https://www.imo-official.org/problems.aspx)**, including the Shortlists (published after the following IMO).
> - **[Evan Chen's MOHS hardness ratings](https://web.evanchen.cc/upload/MOHS-hardness.pdf)** to pick problems at the right level, and his **[website](https://web.evanchen.cc/)** for practice materials.
> - Past papers of your **own national olympiad**. Ask the committee or past participants.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Run the **Strategy** deck before each mock as a warm-up.

## Practice (answers hidden)

1. You have 4.5 hours. After 1 hour you've solved nothing but have a promising idea for P1 and nothing for P2 or P3. What do you do?
<details><summary>Answer</summary>

Keep working on P1: it's the one most likely to become a full 7. Set a checkpoint (e.g. 2.5 h). If it's done, write it up immediately, then spend remaining time looking for partial progress on P2. Reserve the last 45–60 minutes for write-ups no matter what.
</details>

2. Your solution to a "find all $n$" problem proves every solution satisfies $n\le5$ and then checks $n=1,\dots,5$ by hand, finding $n=1,3$. What score would a strict grader give if you forgot to show that $n=3$ actually works?
<details><summary>Answer</summary>

Usually a 1-point deduction (6/7) if the verification is routine, but possibly more if it's not obvious. Always include the check; it costs a minute.
</details>

3. You proved a key lemma but couldn't finish. How should you write it?
<details><summary>Answer</summary>

As a clearly labelled claim with a complete proof, plus one sentence explaining how it would finish the problem ("If additionally … then the result follows"). Graders can then award the partial-credit points tied to that lemma.
</details>

## Done when
- [ ] You consistently fully solve P1/P4-level problems in mocks and have partial progress on P2/P5.
- [ ] Your post-mortem log has entries for at least 10 mocks.
