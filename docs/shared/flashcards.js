/*
  Shared spaced-repetition flashcard engine (Leitner boxes 1–5).
  Usage in a page:
    <div id="fc"></div>
    <script>window.FLASHCARDS = { id: "topic-id", cards: [{ deck: "Algebra", q: "...", a: "..." }, ...] };</script>
    <script src="../../_shared/flashcards.js"></script>
  Progress is saved in this browser only (localStorage). It is a convenience, not a backup.
*/
(function () {
  const cfg = window.FLASHCARDS;
  const root = document.getElementById("fc");
  if (!cfg || !root) return;
  const KEY = "selfstudy-fc-" + cfg.id;

  const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return "c" + (h >>> 0).toString(36); };
  const cards = cfg.cards.map((c) => ({ ...c, id: hash(c.deck + "|" + c.q) }));
  const decks = ["All decks", ...Array.from(new Set(cards.map((c) => c.deck)))];

  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ } };
  const box = (c) => (state[c.id] && state[c.id].box) || 1;

  let deck = decks[0], current = null, flipped = false, sessionSeen = 0, sessionKnown = 0;

  root.innerHTML = `
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <div class="row">
        <select id="fc-deck" aria-label="Deck"></select>
        <button id="fc-reset" title="Forget all progress for this page">Reset progress</button>
      </div>
      <div class="note" id="fc-session"></div>
    </div>
    <div class="card fc-card" id="fc-card" tabindex="0" role="button" aria-label="Flashcard: click or press space to flip">
      <div class="fc-deck" id="fc-d"></div>
      <div class="fc-q" id="fc-q"></div>
      <div class="fc-a" id="fc-a" hidden></div>
      <div class="fc-hint" id="fc-h">Click or press <b>Space</b> to reveal</div>
    </div>
    <div class="row" style="justify-content:center;margin:12px 0 18px">
      <button id="fc-no" disabled>✗ Didn't know <span class="note">(1)</span></button>
      <button id="fc-yes" class="primary" disabled>✓ Knew it <span class="note" style="color:inherit">(2)</span></button>
    </div>
    <div class="card">
      <div class="row" style="justify-content:space-between;margin-bottom:8px"><b>Mastery</b><span class="note" id="fc-pct"></span></div>
      <div class="fc-bar"><div id="fc-bar"></div></div>
      <div class="boxes" style="margin-top:12px" id="fc-boxes"></div>
      <p class="note" style="margin:10px 0 0">Leitner boxes: a card you know moves up a box, a card you miss drops to box 1. Low boxes come up more often. Box 5 = mastered.</p>
    </div>`;

  const $ = (id) => document.getElementById(id);
  const sel = $("fc-deck");
  decks.forEach((d) => { const o = document.createElement("option"); o.textContent = d; sel.appendChild(o); });

  const pool = () => cards.filter((c) => deck === decks[0] || c.deck === deck);

  function pick() {
    const p = pool();
    // weight 2^(5-box): box 1 cards are 16x more likely than box 5 cards
    const weights = p.map((c) => Math.pow(2, 5 - box(c)) * (current && c.id === current.id && p.length > 1 ? 0 : 1));
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < p.length; i++) { r -= weights[i]; if (r <= 0) return p[i]; }
    return p[p.length - 1];
  }

  function render() {
    const p = pool();
    const counts = [0, 0, 0, 0, 0];
    p.forEach((c) => counts[box(c) - 1]++);
    $("fc-boxes").innerHTML = counts.map((n, i) => `<div><b>${n}</b>box ${i + 1}</div>`).join("");
    const score = p.reduce((s, c) => s + (box(c) - 1), 0) / (p.length * 4 || 1);
    $("fc-bar").style.width = (score * 100).toFixed(0) + "%";
    $("fc-pct").textContent = `${(score * 100).toFixed(0)}% · ${counts[4]}/${p.length} mastered`;
    $("fc-session").textContent = sessionSeen ? `This session: ${sessionKnown}/${sessionSeen} known` : `${p.length} cards`;
    if (!current) return;
    $("fc-d").textContent = current.deck + " · box " + box(current);
    $("fc-q").innerHTML = current.q;
    $("fc-a").innerHTML = current.a;
    $("fc-a").hidden = !flipped;
    $("fc-h").hidden = flipped;
    $("fc-no").disabled = $("fc-yes").disabled = !flipped;
  }

  function next() { current = pick(); flipped = false; render(); }
  function flip() { if (!flipped) { flipped = true; render(); } }
  function grade(known) {
    if (!flipped || !current) return;
    const b = box(current);
    state[current.id] = { box: known ? Math.min(5, b + 1) : 1, t: Date.now() };
    sessionSeen++; if (known) sessionKnown++;
    save(); next();
  }

  $("fc-card").addEventListener("click", flip);
  $("fc-no").addEventListener("click", () => grade(false));
  $("fc-yes").addEventListener("click", () => grade(true));
  sel.addEventListener("change", () => { deck = sel.value; next(); });
  $("fc-reset").addEventListener("click", () => {
    if (confirm("Reset all flashcard progress on this page?")) { state = {}; save(); sessionSeen = sessionKnown = 0; next(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.code === "Space") { e.preventDefault(); flip(); }
    else if (e.key === "1") grade(false);
    else if (e.key === "2") grade(true);
  });
  next();
})();
