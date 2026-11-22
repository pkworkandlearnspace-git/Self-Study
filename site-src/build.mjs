// Builds the offline Self-Study website into ../site from the repo's Markdown + interactive tools.
// Usage:  cd site-src && npm install && node build.mjs
// Output: site/index.html — open it directly from disk; no server or internet needed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import texmath from 'markdown-it-texmath';
import taskLists from 'markdown-it-task-lists';
import katex from 'katex';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const OUT = path.join(ROOT, 'site');
const SKIP_DIRS = new Set(['.git', 'site', 'site-src', '_shared', '_template', 'node_modules', '.github']);

// ---------- helpers ----------
const read = (p) => fs.readFileSync(p, 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripMd = (s) => s.replace(/\$[^$]*\$/g, (m) => m.slice(1, -1)).replace(/[*_`#>]/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').trim();
const slugify = (s) => stripMd(s).toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-') || 'section';
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

// ---------- markdown ----------
const md = new MarkdownIt({ html: true, linkify: true, typographer: false })
  .use(texmath, { engine: katex, delimiters: 'dollars', katexOptions: { throwOnError: false, strict: 'ignore' } })
  .use(taskLists, { enabled: true, label: true });

// Link rewriting: .md → .html, README → index, external links open in a new tab.
const defaultLinkOpen = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
  const t = tokens[idx];
  let href = t.attrGet('href') || '';
  if (/^https?:\/\//i.test(href)) {
    t.attrSet('target', '_blank'); t.attrSet('rel', 'noopener'); t.attrJoin('class', 'ext');
  } else if (!href.startsWith('#') && !href.startsWith('mailto:')) {
    href = href.replace(/(^|\/)README\.md(#|$)/i, '$1index.html$2').replace(/\.md(#|$)/, '.html$1');
    t.attrSet('href', href);
  }
  return defaultLinkOpen(tokens, idx, opts, env, self);
};
// Headings get stable ids + collected into a TOC.
md.renderer.rules.heading_open = (tokens, idx, opts, env, self) => {
  const t = tokens[idx];
  const inline = tokens[idx + 1];
  const raw = inline.children.filter((c) => c.type === 'text' || c.type === 'code_inline').map((c) => c.content).join('') || inline.content;
  let id = slugify(raw);
  env.ids = env.ids || {};
  if (env.ids[id]) id = `${id}-${++env.ids[id]}`; else env.ids[id] = 1;
  t.attrSet('id', id);
  const level = Number(t.tag.slice(1));
  if (level === 2 || level === 3) (env.toc = env.toc || []).push({ level, id, text: stripMd(inline.content) });
  env.anchor = level >= 2 ? id : null;
  return self.renderToken(tokens, idx, opts);
};
md.renderer.rules.heading_close = (tokens, idx, opts, env, self) =>
  (env.anchor ? `<a class="anchor" href="#${env.anchor}" aria-label="Link to this section">#</a>` : '') + self.renderToken(tokens, idx, opts);
// Tables scroll horizontally on small screens.
md.renderer.rules.table_open = () => '<div class="table-wrap"><table>';
md.renderer.rules.table_close = () => '</table></div>';
// ASCII-art code blocks keep their layout; others get a copy button.
md.renderer.rules.fence = (tokens, idx) => {
  const t = tokens[idx];
  const lang = (t.info || '').trim().split(/\s+/)[0];
  const isArt = !lang && /[┌│└─▶╔═]/.test(t.content);
  return `<div class="code${isArt ? ' art' : ''}">${lang ? `<span class="lang">${esc(lang)}</span>` : ''}<button class="copy" type="button" aria-label="Copy code">Copy</button><pre><code${lang ? ` class="language-${esc(lang)}"` : ''}>${esc(t.content)}</code></pre></div>`;
};

function render(src) {
  const env = {};
  const html = md.render(src, env);
  return { html, toc: env.toc || [] };
}

// Title = first H1; goal line = first blockquote right after it.
function meta(src, fallback) {
  const h1 = src.match(/^#\s+(.+)$/m);
  const quote = src.match(/^#\s+.+\n+>\s*(.+)$/m);
  let title = h1 ? stripMd(h1[1]) : fallback;
  let num = null;
  const m = title.match(/^(\d{2})\s*[·.:-]\s*(.+)$/);
  if (m) { num = m[1]; title = m[2]; }
  const info = {};
  if (quote) {
    for (const part of quote[1].split('·')) {
      const kv = part.match(/\*\*(\w[\w ]*):\*\*\s*(.+)/);
      if (kv) info[kv[1].toLowerCase()] = stripMd(kv[2]);
    }
  }
  return { title, num, info };
}

// Plain-text sections for the search index.
function searchChunks(src) {
  const out = [];
  let cur = { id: '', head: '', text: [] };
  const ids = {};
  for (const line of src.split('\n')) {
    const h = line.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      if (cur.text.length || cur.head) out.push(cur);
      let id = slugify(h[2]);
      if (ids[id]) id = `${id}-${++ids[id]}`; else ids[id] = 1;
      cur = { id: h[1].length === 1 ? '' : id, head: stripMd(h[2]), text: [] };
    } else if (line.trim() && !/^\|?\s*[-:|\s]+\|?\s*$/.test(line) && !line.startsWith('```')) {
      cur.text.push(stripMd(line.replace(/\|/g, ' ').replace(/<[^>]+>/g, ' ')));
    }
  }
  out.push(cur);
  return out.map((c) => ({ ...c, text: c.text.join(' ').replace(/\s+/g, ' ').slice(0, 600) }));
}

// ---------- discover topics ----------
const rootReadme = read(path.join(ROOT, 'README.md'));
const topicRows = {};
for (const line of rootReadme.split('\n')) {
  const m = line.match(/^\|\s*(\S+)\s+\*\*(.+?)\*\*(.*?)\|\s*(.*?)\s*\|.*\]\(([\w-]+)\/README\.md\)/);
  if (m) topicRows[m[5]] = { emoji: m[1], name: m[2].trim(), sub: m[3].trim().replace(/^\(|\)$/g, ''), level: m[4] };
}
const ORDER = ['README.md'];
const topics = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !SKIP_DIRS.has(e.name) && !e.name.startsWith('.') && fs.existsSync(path.join(ROOT, e.name, 'README.md')))
  .map((e) => e.name)
  .sort((a, b) => {
    const keys = Object.keys(topicRows);
    return (keys.indexOf(a) === -1 ? 99 : keys.indexOf(a)) - (keys.indexOf(b) === -1 ? 99 : keys.indexOf(b));
  })
  .map((slug) => {
    const dir = path.join(ROOT, slug);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
    const modules = files.filter((f) => /^\d{2}-/.test(f)).sort();
    const support = ['cheatsheet.md', 'resources.md', 'progress.md'].filter((f) => files.includes(f));
    const extra = files.filter((f) => !ORDER.includes(f) && !modules.includes(f) && !support.includes(f)).sort();
    const readme = read(path.join(dir, 'README.md'));
    const row = topicRows[slug] || {};
    const h1 = meta(readme, slug).title;
    // Interactive tools: parse tiles from interactive/index.html, fall back to <title>.
    const tools = [];
    const idir = path.join(dir, 'interactive');
    if (fs.existsSync(idir)) {
      const idx = path.join(idir, 'index.html');
      const tiles = fs.existsSync(idx) ? [...read(idx).matchAll(/<a class="tile" href="([^"]+)">\s*<span class="tag">(.*?)<\/span>\s*<div class="t">(.*?)<\/div>\s*<div class="d">(.*?)<\/div>/gs)] : [];
      const seen = new Set();
      for (const t of tiles) { tools.push({ href: t[1], tag: t[2], name: t[3], desc: t[4] }); seen.add(t[1]); }
      for (const f of fs.readdirSync(idir).filter((f) => f.endsWith('.html') && f !== 'index.html' && !seen.has(f)).sort()) {
        const tt = read(path.join(idir, f)).match(/<title>(.*?)<\/title>/);
        tools.push({ href: f, tag: 'Interactive', name: tt ? tt[1] : f, desc: '' });
      }
    }
    return {
      slug, readme, tools,
      name: row.name || h1.split(':')[0],
      emoji: row.emoji || '📘',
      level: row.level || '',
      headline: h1,
      modules: modules.map((f) => ({ file: f, ...meta(read(path.join(dir, f)), f) })),
      support: support.concat(extra).map((f) => ({ file: f, ...meta(read(path.join(dir, f)), f) })),
    };
  });

// ---------- page shell ----------
const SUPPORT_LABEL = { 'cheatsheet.md': ['Cheatsheet', '📄'], 'resources.md': ['Resources', '📚'], 'progress.md': ['Progress log', '📈'] };
const html = (f) => f.replace(/\.md$/, '.html');

function shell({ title, depth, topic, current, body, toc = [], pageKey, kind = 'page', prev, next }) {
  const up = depth ? '../'.repeat(depth) : '';
  const nav = topics.map((t) => {
    const open = topic && t.slug === topic.slug;
    const base = `${up}${t.slug}/`;
    const items = [
      `<a href="${base}index.html" class="${open && current === 'README.md' ? 'active' : ''}"><span class="n">◎</span>Overview &amp; roadmap</a>`,
      ...t.modules.map((m) => `<a href="${base}${html(m.file)}" data-key="${t.slug}/${m.file}" class="mod ${open && current === m.file ? 'active' : ''}"><span class="n">${m.num || '·'}</span>${esc(m.title)}<span class="done-dot" aria-hidden="true"></span></a>`),
      ...t.support.map((s) => `<a href="${base}${html(s.file)}" class="${open && current === s.file ? 'active' : ''}"><span class="n">${(SUPPORT_LABEL[s.file] || [, '•'])[1]}</span>${esc((SUPPORT_LABEL[s.file] || [s.title])[0])}</a>`),
      t.tools.length ? `<a href="${base}tools.html" class="${open && current === 'tools' ? 'active' : ''}"><span class="n">🧪</span>Interactive tools <span class="count">${t.tools.length}</span></a>` : '',
    ].join('');
    return `<details class="nav-topic" ${open ? 'open' : ''}><summary><span class="emoji">${t.emoji}</span>${esc(t.name)}<span class="pct" data-topic="${t.slug}"></span></summary><nav>${items}</nav></details>`;
  }).join('');
  const tocHtml = toc.filter((x) => x.level === 2).length > 2
    ? `<aside class="toc" aria-label="On this page"><div class="toc-title">On this page</div>${toc.map((x) => `<a href="#${x.id}" class="l${x.level}">${esc(x.text)}</a>`).join('')}</aside>` : '';
  const pager = (prev || next) ? `<nav class="pager">${prev ? `<a class="prev" href="${prev.href}"><small>← Previous</small><span>${esc(prev.title)}</span></a>` : '<span></span>'}${next ? `<a class="next" href="${next.href}"><small>Next →</small><span>${esc(next.title)}</span></a>` : ''}</nav>` : '';
  const crumbs = topic ? `<a href="${up}index.html">Home</a><span>›</span><a href="${up}${topic.slug}/index.html">${esc(topic.name)}</a>${current !== 'README.md' ? `<span>›</span><b>${esc(title)}</b>` : ''}` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}${topic ? ` · ${esc(topic.name)}` : ''} · Self-Study</title>
<link rel="stylesheet" href="${up}assets/katex/katex.min.css">
<link rel="stylesheet" href="${up}assets/site.css">
<script>try{var t=localStorage.getItem('ss-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body class="kind-${kind}" data-root="${up}" data-page="${esc(pageKey || '')}">
<a class="skip" href="#main">Skip to content</a>
<header class="topbar">
  <button class="icon menu" type="button" aria-label="Open menu" data-action="menu">☰</button>
  <a class="brand" href="${up}index.html"><span class="logo">S</span><span>Self-Study</span></a>
  <button class="search-btn" type="button" data-action="search"><span>🔍 Search everything…</span><kbd>/</kbd></button>
  <button class="icon" type="button" aria-label="Search" data-action="search" id="search-icon">🔍</button>
  <button class="icon" type="button" aria-label="Toggle dark mode" data-action="theme">🌓</button>
</header>
<div class="layout">
  <aside class="sidebar" aria-label="Topics">
    <a class="side-home ${kind === 'home' ? 'active' : ''}" href="${up}index.html">🏠 Home</a>
    <a class="side-home ${kind === 'tools-all' ? 'active' : ''}" href="${up}tools.html">🧪 All interactive tools</a>
    <a class="side-home ${kind === 'guide' ? 'active' : ''}" href="${up}guide.html">🧭 How to use this site</a>
    <div class="side-label">Topics</div>
    ${nav}
  </aside>
  <div class="scrim" data-action="menu"></div>
  <main id="main" class="main">
    ${crumbs ? `<div class="crumbs">${crumbs}</div>` : ''}
    <div class="content-row">
      <article class="prose">${body}${pager}</article>
      ${tocHtml}
    </div>
    <footer class="sitefoot">Self-Study · private offline edition · built ${new Date().toISOString().slice(0, 10)}</footer>
  </main>
</div>
<div class="search-modal" hidden>
  <div class="search-box" role="dialog" aria-label="Search">
    <input type="search" placeholder="Search modules, formulas, techniques…" aria-label="Search">
    <div class="results"></div>
    <div class="search-hint"><kbd>↑</kbd><kbd>↓</kbd> to move · <kbd>Enter</kbd> to open · <kbd>Esc</kbd> to close</div>
  </div>
</div>
<script src="${up}assets/search-index.js"></script>
<script src="${up}assets/site.js"></script>
</body>
</html>`;
}

// ---------- build ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
copyDir(path.join(HERE, 'assets'), path.join(OUT, 'assets'));
const katexDist = path.join(HERE, 'node_modules', 'katex', 'dist');
fs.mkdirSync(path.join(OUT, 'assets', 'katex'), { recursive: true });
fs.copyFileSync(path.join(katexDist, 'katex.min.css'), path.join(OUT, 'assets', 'katex', 'katex.min.css'));
copyDir(path.join(katexDist, 'fonts'), path.join(OUT, 'assets', 'katex', 'fonts'));
for (const f of fs.readdirSync(path.join(OUT, 'assets', 'katex', 'fonts'))) if (!f.endsWith('.woff2')) fs.rmSync(path.join(OUT, 'assets', 'katex', 'fonts', f));
copyDir(path.join(ROOT, '_shared'), path.join(OUT, '_shared'));

const search = [];
const write = (rel, content) => { const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, content); };
const toolCard = (t, base) => `<a class="tool" href="${base}${t.href}"><span class="tag">${t.tag}</span><b>${t.name}</b>${t.desc ? `<span class="d">${t.desc}</span>` : ''}<span class="go">Open tool →</span></a>`;
let pages = 0;

for (const t of topics) {
  if (fs.existsSync(path.join(ROOT, t.slug, 'interactive'))) copyDir(path.join(ROOT, t.slug, 'interactive'), path.join(OUT, t.slug, 'interactive'));
  const seq = [{ file: 'README.md', title: 'Overview & roadmap' }, ...t.modules.map((m) => ({ ...m, title: `${m.num ? m.num + ' · ' : ''}${m.title}` })), ...t.support.map((s) => ({ ...s, title: (SUPPORT_LABEL[s.file] || [s.title])[0] }))];
  seq.forEach((p, i) => {
    const src = read(path.join(ROOT, t.slug, p.file));
    const { html: body, toc } = render(src);
    const isModule = /^\d{2}-/.test(p.file);
    const m = t.modules.find((x) => x.file === p.file);
    let header = '';
    if (isModule) {
      const chips = Object.entries(m.info).map(([k, v]) => `<span class="chip"><b>${esc(k)}</b> ${esc(v)}</span>`).join('');
      header = `<div class="module-head"><span class="kicker">${t.emoji} ${esc(t.name)} · Module ${m.num}</span>${chips ? `<div class="chips">${chips}</div>` : ''}<button class="done-btn" type="button" data-key="${t.slug}/${p.file}">Mark module as done</button></div>`;
    }
    let extra = '';
    if (p.file === 'README.md') {
      const cards = t.modules.map((mm) => `<a class="mcard" href="${html(mm.file)}" data-key="${t.slug}/${mm.file}"><span class="num">${mm.num}</span><span class="mt">${esc(mm.title)}</span>${mm.info.time ? `<span class="mm">⏱ ${esc(mm.info.time)}</span>` : ''}<span class="check" aria-hidden="true">✓</span></a>`).join('');
      extra = `<section class="topic-hero"><div class="big-emoji">${t.emoji}</div><div><div class="kicker">${esc(t.level)}</div><div class="progress-line"><div class="bar"><i data-topic-bar="${t.slug}"></i></div><span data-topic-text="${t.slug}"></span></div></div></section>
      <h2 id="modules-at-a-glance">Modules at a glance</h2><div class="mgrid">${cards}</div>
      ${t.tools.length ? `<h2 id="try-the-tools">Try the interactive tools</h2><div class="tgrid">${t.tools.slice(0, 6).map((x) => toolCard(x, 'interactive/')).join('')}</div>` : ''}
      <hr class="sep"><h2 id="full-roadmap" class="sr-only">Full roadmap</h2>`;
    }
    const prev = i > 0 ? { href: html(seq[i - 1].file).replace(/^README\.html$/, 'index.html'), title: seq[i - 1].title } : null;
    const next = i < seq.length - 1 ? { href: html(seq[i + 1].file), title: seq[i + 1].title } : (t.tools.length ? { href: 'tools.html', title: 'Interactive tools' } : null);
    const out = p.file === 'README.md' ? 'index.html' : html(p.file);
    let finalBody = body;
    if (p.file === 'README.md') finalBody = body.replace(/^(<h1[^>]*>.*?<\/h1>)/s, `$1${extra}`);
    else if (isModule) finalBody = body.replace(/^(<h1[^>]*>.*?<\/h1>)\s*(<blockquote>.*?<\/blockquote>)?/s, `$1${header}`);
    write(`${t.slug}/${out}`, shell({ title: p.file === 'README.md' ? t.name : p.title.replace(/^\d{2} · /, ''), depth: 1, topic: t, current: p.file, body: finalBody, toc, pageKey: `${t.slug}/${p.file}`, kind: isModule ? 'module' : 'page', prev, next }));
    pages++;
    for (const c of searchChunks(src)) search.push({ u: `${t.slug}/${out}${c.id ? '#' + c.id : ''}`, p: `${t.emoji} ${t.name} · ${p.title}`, h: c.head, x: c.text });
  });
  if (t.tools.length) {
    const body = `<h1>${t.emoji} ${esc(t.name)} · Interactive tools</h1><p class="lead">Hands-on visual tools for this topic. Open one next to the module it belongs to. Each tool works fully offline.</p><div class="tgrid">${t.tools.map((x) => toolCard(x, 'interactive/')).join('')}</div>`;
    write(`${t.slug}/tools.html`, shell({ title: 'Interactive tools', depth: 1, topic: t, current: 'tools', body, kind: 'tools', prev: t.support.length ? { href: html(t.support.at(-1).file), title: (SUPPORT_LABEL[t.support.at(-1).file] || [t.support.at(-1).title])[0] } : null }));
    pages++;
    for (const x of t.tools) search.push({ u: `${t.slug}/interactive/${x.href}`, p: `${t.emoji} ${t.name} · Interactive tool`, h: x.name.replace(/<[^>]+>/g, ''), x: `${x.tag} ${x.desc}`.replace(/<[^>]+>/g, '') });
  }
}

// Home page
const sections = rootReadme.split(/^## /m);
const intro = stripMd(rootReadme.split('\n').find((l) => l.trim() && !l.startsWith('#')) || '');
const planSections = sections.slice(1).filter((s) => !/^(Topics|Repo layout)/i.test(s)).map((s) => '## ' + s.replace(/\n---\s*$/, '')).join('\n');
const plan = render(planSections.replace(/\]\((\w[\w-]*)\/README\.md\)/g, ']($1/index.html)'));
const totalModules = topics.reduce((a, t) => a + t.modules.length, 0);
const totalTools = topics.reduce((a, t) => a + t.tools.length, 0);
const homeBody = `
<section class="hero">
  <div class="kicker">Private offline study library</div>
  <h1>Learn deeply. Skip what you already know.</h1>
  <p class="lead">${esc(intro)}</p>
  <div class="stats"><div><b>${topics.length}</b><span>topics</span></div><div><b>${totalModules}</b><span>modules</span></div><div><b>${totalTools}</b><span>interactive tools</span></div><div><b data-overall>0%</b><span>your progress</span></div></div>
  <div class="hero-actions"><a class="btn primary" href="#topics">Choose a topic</a><a class="btn" href="guide.html">How this site works</a><button class="btn" type="button" data-action="search">🔍 Search</button></div>
</section>
<div class="continue" hidden><span>Pick up where you left off:</span> <a href="#"></a></div>
<h2 id="topics">Topics</h2>
<div class="topics">${topics.map((t) => `<a class="topic-card" href="${t.slug}/index.html">
  <div class="tc-top"><span class="big-emoji">${t.emoji}</span><span class="tc-level">${esc(t.level)}</span></div>
  <h3>${esc(t.name)}</h3>
  <p>${esc(t.headline.includes(':') ? t.headline.split(':').slice(1).join(':').trim() : t.headline)}</p>
  <div class="tc-meta"><span>📘 ${t.modules.length} modules</span><span>🧪 ${t.tools.length} tools</span></div>
  <div class="bar"><i data-topic-bar="${t.slug}"></i></div><span class="tc-pct" data-topic-text="${t.slug}"></span>
</a>`).join('')}</div>
<h2 id="how-it-works">How each topic works</h2>
<div class="steps">
  <div class="step"><span>1</span><b>Take the skip test</b><p>Every module opens with a short checklist. If you can already do it all, skip the module.</p></div>
  <div class="step"><span>2</span><b>Read the core ideas</b><p>Short, dense explanations with one ⭐ main resource per idea. Everything else is optional.</p></div>
  <div class="step"><span>3</span><b>See it, then build it</b><p>Use the interactive tools for intuition, then finish the module's build or problem set.</p></div>
  <div class="step"><span>4</span><b>Recap and track</b><p>Revise with the cheatsheet and flashcards. Tick off modules to see your progress here.</p></div>
</div>
<div class="prose-plan">${plan.html}</div>`;
write('index.html', shell({ title: 'Home', depth: 0, body: homeBody, toc: [], kind: 'home', pageKey: 'home' }));
pages++;
for (const c of searchChunks(planSections)) if (c.head) search.push({ u: `index.html#${c.id}`, p: '🏠 Home · Study plan', h: c.head, x: c.text });

// All tools page
const allTools = `<h1>🧪 All interactive tools</h1><p class="lead">Every simulation, visualizer, practice tool and flashcard deck in one place. They all run offline in your browser.</p>${topics.filter((t) => t.tools.length).map((t) => `<h2 id="${t.slug}">${t.emoji} ${esc(t.name)}</h2><div class="tgrid">${t.tools.map((x) => toolCard(x, `${t.slug}/interactive/`)).join('')}</div>`).join('')}`;
write('tools.html', shell({ title: 'All interactive tools', depth: 0, body: allTools, kind: 'tools-all', toc: topics.map((t) => ({ level: 2, id: t.slug, text: t.name })) }));
pages++;

// Guide page
const guide = `<h1>🧭 How to use this site</h1>
<p class="lead">A quick tour for anyone opening this library for the first time.</p>
<h2 id="opening">Opening the site</h2>
<ul><li>This is a <b>private, offline</b> website. It is not published anywhere online, and nothing you do here is sent to the internet.</li>
<li>Unzip the download (or the repo's <code>site/</code> folder) and double-click <b><code>index.html</code></b>. Any modern browser works: Chrome, Edge, Safari or Firefox, on computer or tablet.</li>
<li>Keep the folder together. Pages link to each other with relative paths, so moving single files out will break links.</li>
<li>Links marked with ↗ go to outside resources (books, videos, papers) and need an internet connection.</li></ul>
<h2 id="finding">Finding your way</h2>
<ul><li><b>Left menu</b>: every topic with its modules in order. On a phone, tap ☰.</li>
<li><b>Search</b>: press <kbd>/</kbd> or click 🔍 to search every module, formula name and tool.</li>
<li><b>On this page</b>: long pages show a contents list on the right (on wide screens).</li>
<li><b>Previous / Next</b> buttons at the bottom of each page walk through a topic in order.</li></ul>
<h2 id="page-types">What each page is for</h2>
<div class="table-wrap"><table><thead><tr><th>Page</th><th>Use it to</th></tr></thead><tbody>
<tr><td>◎ Overview &amp; roadmap</td><td>See the whole path for a topic, the time budget and the weekly routine.</td></tr>
<tr><td>01, 02, … Modules</td><td>Learn one area. Start with the <b>Skip test</b>; then core ideas, resources and a build/problem set.</td></tr>
<tr><td>📄 Cheatsheet</td><td>Recap the whole topic on one page before a test.</td></tr>
<tr><td>📚 Resources</td><td>The single best resource per area (⭐) plus optional extras.</td></tr>
<tr><td>📈 Progress log</td><td>Key dates, status board and learning log template.</td></tr>
<tr><td>🧪 Interactive tools</td><td>Simulations, visualizers, practice timers and flashcards.</td></tr></tbody></table></div>
<h2 id="progress">Tracking progress</h2>
<ul><li>Tick the <b>Skip test</b> boxes as you master each item. Press <b>Mark module as done</b> when you finish a module.</li>
<li>Progress bars on the home page and in the menu update automatically.</li>
<li>Progress is saved <b>only in this browser on this device</b>. Clearing browser data resets it. Use the buttons below to back it up or move it to another device.</li></ul>
<div class="backup"><button class="btn" type="button" data-action="export">⬇️ Export my progress</button><label class="btn">⬆️ Import progress<input type="file" accept="application/json" data-action="import" hidden></label><button class="btn danger" type="button" data-action="reset">Reset progress</button></div>
<h2 id="keys">Keyboard shortcuts</h2>
<ul><li><kbd>/</kbd> search · <kbd>Esc</kbd> close search · <kbd>←</kbd> <kbd>→</kbd> previous / next page</li></ul>`;
write('guide.html', shell({ title: 'How to use this site', depth: 0, body: guide, kind: 'guide', toc: [] }));
pages++;
search.push({ u: 'guide.html', p: '🧭 Guide', h: 'How to use this site', x: 'open offline index.html progress export import search keyboard shortcuts' });

write('assets/search-index.js', `window.SEARCH_INDEX=${JSON.stringify(search)};`);
write('README.txt', `SELF-STUDY · PRIVATE OFFLINE WEBSITE\n\nOpen index.html in any web browser (double-click it).\nNo internet or installation needed. Keep this folder together.\n\nBuilt ${new Date().toISOString().slice(0, 10)} from the Self-Study repository.\n`);
console.log(`Built ${pages} pages, ${topics.length} topics, ${search.length} search entries → ${path.relative(ROOT, OUT)}/`);
