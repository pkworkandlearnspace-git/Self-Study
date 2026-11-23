// Self-Study site behaviour: theme, mobile nav, search, TOC highlight, progress bar,
// saved checkboxes, copy buttons and math rendering. Works offline (file://).
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
  };

  /* ---------- theme ---------- */
  const themeBtn = $(".theme-btn");
  function currentTheme() {
    const t = document.documentElement.dataset.theme;
    if (t) return t;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function paintThemeBtn() { if (themeBtn) themeBtn.textContent = currentTheme() === "dark" ? "☀️" : "🌙"; }
  themeBtn && themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store.set("ss-theme", next);
    paintThemeBtn();
  });
  paintThemeBtn();

  /* ---------- mobile nav ---------- */
  const menuBtn = $(".menu-btn"), scrim = $(".scrim");
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (scrim) scrim.hidden = !open;
    if (menuBtn) menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn && menuBtn.addEventListener("click", () => setNav(!document.body.classList.contains("nav-open")));
  scrim && scrim.addEventListener("click", () => setNav(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });
  const activeLink = $(".side-nav a.active");
  if (activeLink) activeLink.scrollIntoView({ block: "center" });

  /* ---------- reading progress ---------- */
  const bar = $(".progress > div");
  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- TOC scroll spy ---------- */
  const tocLinks = $$(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    tocLinks.forEach((a) => {
      const el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (el) map.set(el, a);
    });
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
      let best = null;
      map.forEach((a, el) => { if (el.getBoundingClientRect().top < 200) best = a; });
      if (!best && visible.size) best = map.get([...visible][0]);
      tocLinks.forEach((a) => a.classList.toggle("active", a === best));
    }, { rootMargin: "-60px 0px -60% 0px" });
    map.forEach((_, el) => io.observe(el));
  }

  /* ---------- checkboxes (skip tests, checklists) remembered per page ---------- */
  const boxes = $$(".doc input[type=checkbox]");
  const key = "ss-checks:" + page;
  let saved = {};
  try { saved = JSON.parse(store.get(key) || "{}"); } catch (e) { saved = {}; }
  boxes.forEach((b, i) => {
    if (i in saved) b.checked = saved[i];
    const li = b.closest("li.task");
    const sync = () => li && li.classList.toggle("done", b.checked);
    sync();
    b.addEventListener("change", () => { saved[i] = b.checked; store.set(key, JSON.stringify(saved)); sync(); });
  });

  /* ---------- copy buttons on code blocks ---------- */
  $$(".doc pre").forEach((pre) => {
    const btn = document.createElement("button");
    btn.className = "copy-btn"; btn.type = "button"; btn.textContent = "Copy";
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(pre.innerText.replace(/Copy$/, "").trim()); btn.textContent = "Copied"; }
      catch (e) { btn.textContent = "Select & copy"; }
      setTimeout(() => (btn.textContent = "Copy"), 1400);
    });
    pre.appendChild(btn);
  });

  /* ---------- click-to-play YouTube embeds ---------- */
  $$(".video").forEach((fig) => {
    const btn = $(".video-play", fig);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const id = fig.dataset.yt, list = fig.dataset.list === "1";
      const f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + (list ? "videoseries?list=" + id + "&autoplay=1" : id + "?autoplay=1&rel=0");
      f.title = btn.getAttribute("aria-label") || "Video";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      f.referrerPolicy = "strict-origin-when-cross-origin";
      btn.replaceWith(f);
    });
  });

  /* ---------- open <details> that contain a linked anchor ---------- */
  function openForHash() {
    if (!location.hash) return;
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const d = el && el.closest("details");
    if (d) d.open = true;
  }
  addEventListener("hashchange", openForHash);
  openForHash();

  /* ---------- math (KaTeX, loaded from CDN only on pages with math) ---------- */
  function renderMath() {
    if (!window.renderMathInElement) return;
    const target = $(".main");
    window.renderMathInElement(target, {
      delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
      throwOnError: false,
    });
  }
  if (window.renderMathInElement) renderMath(); else addEventListener("load", renderMath);

  /* ---------- search ---------- */
  const input = $("#search"), results = $(".search-results");
  if (!input || !results) return;
  let sel = -1;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  function highlight(text, terms) {
    let out = esc(text);
    terms.forEach((t) => { out = out.replace(new RegExp("(" + reEsc(esc(t)) + ")", "gi"), "<mark>$1</mark>"); });
    return out;
  }
  function snippet(text, terms) {
    const low = text.toLowerCase();
    let pos = -1;
    for (const t of terms) { pos = low.indexOf(t); if (pos >= 0) break; }
    if (pos < 0) return text.slice(0, 140) + "…";
    const start = Math.max(0, pos - 60);
    return (start > 0 ? "…" : "") + text.slice(start, start + 170) + "…";
  }
  function search(q) {
    const idx = window.SEARCH_INDEX || [];
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return [];
    const hits = [];
    idx.forEach((p) => {
      const title = p.t.toLowerCase(), text = p.x.toLowerCase();
      let score = 0, ok = true;
      for (const t of terms) {
        const inTitle = title.includes(t);
        const head = p.h.find((h) => h.n.toLowerCase().includes(t));
        const inText = text.includes(t);
        if (!inTitle && !head && !inText) { ok = false; break; }
        score += (inTitle ? 10 : 0) + (head ? 5 : 0) + (inText ? 1 + Math.min(5, text.split(t).length - 1) * 0.3 : 0);
      }
      if (!ok) return;
      const head = p.h.find((h) => terms.every((t) => h.n.toLowerCase().includes(t))) ||
                   p.h.find((h) => terms.some((t) => h.n.toLowerCase().includes(t)));
      hits.push({ p, score, head });
    });
    return hits.sort((a, b) => b.score - a.score).slice(0, 12).map(({ p, head }) => ({
      url: root + p.u + (head ? "#" + head.id : ""),
      title: p.t + (head ? " › " + head.n : ""),
      section: p.s,
      text: snippet(p.x, terms),
      terms,
    }));
  }
  function show(list, q) {
    sel = -1;
    if (!q.trim()) { results.hidden = true; return; }
    results.hidden = false;
    if (!list.length) { results.innerHTML = '<div class="empty">No matches for “' + esc(q) + '”.</div>'; return; }
    results.innerHTML = list.map((r) =>
      '<a href="' + esc(r.url) + '"><div class="r-s">' + esc(r.section) + '</div><div class="r-t">' +
      highlight(r.title, r.terms) + '</div><div class="r-x">' + highlight(r.text, r.terms) + "</div></a>").join("");
  }
  let timer;
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => show(search(input.value), input.value), 80); });
  input.addEventListener("focus", () => { if (input.value.trim()) show(search(input.value), input.value); });
  input.addEventListener("keydown", (e) => {
    const items = $$("a", results);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((a, i) => a.classList.toggle("sel", i === sel));
      items[sel].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      const a = items[sel >= 0 ? sel : 0];
      if (a) location.href = a.href;
    } else if (e.key === "Escape") { results.hidden = true; input.blur(); }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) results.hidden = true; });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
  });
})();
