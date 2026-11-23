#!/usr/bin/env python3
"""Build the Self-Study documentation website.

Turns every Markdown file in the repo into a styled HTML page and writes the
whole site to ``docs/`` (ready for GitHub Pages: Settings -> Pages -> "Deploy
from a branch" -> folder ``/docs``). The interactive tools are copied in too, so
``docs/index.html`` also works offline straight from disk.

Usage:
    pip install markdown
    python3 site/build.py
"""
from __future__ import annotations

import html
import json
import re
import shutil
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(__file__).resolve().parent
OUT = ROOT / "docs"

SITE_NAME = "Self-Study"

TOPICS = [
    {"slug": "math-olympiad", "name": "Math Olympiad", "icon": "🧮", "track": "IMO track",
     "blurb": "Proofs, algebra, number theory, combinatorics and geometry, from regional rounds to the IMO."},
    {"slug": "physics-olympiad", "name": "Physics Olympiad", "icon": "⚛️", "track": "IPhO track",
     "blurb": "Mechanics, thermodynamics, electromagnetism, optics, modern physics and experiments."},
    {"slug": "informatics-olympiad", "name": "Informatics Olympiad", "icon": "💻", "track": "IOI track",
     "blurb": "C++ for contests, data structures, graphs, dynamic programming and IOI-level skills."},
    {"slug": "ielts", "name": "IELTS Academic", "icon": "🗣️", "track": "Target band 7.0–7.5",
     "blurb": "Strategy, listening, reading, both writing tasks, speaking, and band-7 vocabulary."},
    {"slug": "deep-learning", "name": "Deep Learning", "icon": "🧠", "track": "Beginner → research",
     "blurb": "From the math and NumPy to transformers, LLMs, generative models and RL."},
]

SUPPORT = [("cheatsheet", "Cheatsheet"), ("resources", "Resources"), ("progress", "Progress log")]



# --------------------------------------------------------------------------- markdown

CODE_RE = re.compile(r"(^```.*?^```[ \t]*$|`[^`\n]+`)", re.S | re.M)
MATH_RE = re.compile(r"\$\$.+?\$\$|(?<![\\$])\$(?!\s)[^$\n]+?(?<![\s\\])\$(?!\d)", re.S)


def protect_math(text: str) -> tuple[str, list[str]]:
    """Swap TeX for placeholders so Markdown leaves it alone (underscores, pipes...)."""
    store: list[str] = []

    def sub_math(m: re.Match) -> str:
        store.append(m.group(0))
        return f"⁣MATH{len(store) - 1}⁣"

    parts = CODE_RE.split(text)
    for i in range(0, len(parts), 2):  # even indices are outside code
        parts[i] = MATH_RE.sub(sub_math, parts[i])
    return "".join(parts), store


def restore_math(html_text: str, store: list[str]) -> str:
    return re.sub(r"⁣MATH(\d+)⁣", lambda m: html.escape(store[int(m.group(1))], quote=False), html_text)


def slugify(value: str, sep: str) -> str:
    value = re.sub(r"[^\w\s-]", "", value.lower()).strip()
    return re.sub(r"[\s_-]+", sep, value) or "section"


def fix_nested_lists(text: str) -> str:
    """The notes nest lists with 2-3 spaces (GitHub style); Python-Markdown needs 4."""
    out, in_fence = [], False
    for line in text.split("\n"):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
        elif not in_fence:
            m = re.match(r"^( {2,3})([-*+]|\d+\.) ", line)
            if m:
                line = "    " + line[len(m.group(1)):]
        out.append(line)
    return "\n".join(out)


def render_markdown(text: str) -> tuple[str, list[dict]]:
    text = fix_nested_lists(text)
    text = re.sub(r"<details>", '<details markdown="1">', text)
    text, store = protect_math(text)
    md = markdown.Markdown(
        extensions=["tables", "fenced_code", "md_in_html", "sane_lists", "toc"],
        extension_configs={"toc": {"slugify": slugify, "permalink": "#", "permalink_class": "anchor",
                                   "permalink_title": "Link to this section"}},
    )
    body = md.convert(text)
    body = restore_math(body, store)
    # Task lists: "- [ ] item" and inline "· [ ] item"
    body = re.sub(r"<li>\s*\[( |x|X)\]\s*", lambda m: '<li class="task"><input type="checkbox"%s> ' %
                  (" checked" if m.group(1).lower() == "x" else ""), body)
    body = re.sub(r"(·\s*)\[( |x)\]\s*", lambda m: m.group(1) + '<input type="checkbox"%s> ' %
                  (" checked" if m.group(2) == "x" else ""), body)
    # Scrollable tables on small screens
    body = body.replace("<table>", '<div class="table-wrap"><table>').replace("</table>", "</table></div>")
    # Make external links open in a new tab
    body = re.sub(r'<a href="(https?://[^"]+)"', r'<a href="\1" target="_blank" rel="noopener"', body)
    return body, md.toc_tokens


def rewrite_links(body: str, at_root: bool) -> str:
    def fix(m: re.Match) -> str:
        url = m.group(1)
        if re.match(r"^(https?:|mailto:|#|data:)", url):
            return m.group(0)
        path, _, frag = url.partition("#")
        if path.endswith("README.md"):
            path = path[: -len("README.md")] + "index.html"
        elif path.endswith(".md"):
            path = path[:-3] + ".html"
        elif path.endswith("/"):
            path += "index.html"
        elif at_root and path == "index.html":
            path = "tools.html"  # the old hub of interactive tools
        return f'href="{path}{"#" + frag if frag else ""}"'

    return re.sub(r'href="([^"]+)"', fix, body)


def plain_text(body: str) -> str:
    t = re.sub(r'<a class="anchor"[^>]*>.*?</a>', "", body)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", html.unescape(t)).strip()


def search_text(t: str) -> str:
    """Make TeX readable in search snippets: $\\mathbf{x}^\\top A$ -> x^top A."""
    t = re.sub(r"\\(?:mathbf|mathrm|text|boldsymbol|operatorname|mathbb|mathcal)\{([^}]*)\}", r"\1", t)
    t = re.sub(r"\\([a-zA-Z]+)", r"\1", t)
    return t.replace("$", "").replace("{", "").replace("}", "")


# --------------------------------------------------------------------------- pages

def page_list() -> list[dict]:
    """Every page in reading order, with sidebar metadata."""
    pages = []
    for t in TOPICS:
        d = ROOT / t["slug"]
        pages.append({"src": d / "README.md", "out": f"{t['slug']}/index.html", "topic": t, "kind": "overview",
                      "label": "Overview"})
        for f in sorted(d.glob("[0-9][0-9]-*.md")):
            pages.append({"src": f, "out": f"{t['slug']}/{f.stem}.html", "topic": t, "kind": "module",
                          "num": f.stem[:2]})
        for stem, label in SUPPORT:
            f = d / f"{stem}.md"
            if f.exists():
                pages.append({"src": f, "out": f"{t['slug']}/{stem}.html", "topic": t, "kind": "support",
                              "label": label})
    tmpl = ROOT / "_template" / "TOPIC_TEMPLATE.md"
    if tmpl.exists():
        pages.append({"src": tmpl, "out": "template/TOPIC_TEMPLATE.html", "topic": None, "kind": "extra",
                      "label": "Start a new topic"})
    for p in pages:
        first = p["src"].read_text(encoding="utf-8").lstrip().splitlines()[0]
        p["title"] = re.sub(r"^#+\s*", "", first).strip()
        if p["kind"] == "module":
            p["label"] = re.sub(r"^\d+\s*·\s*", "", p["title"])
    return pages


def sidebar(pages: list[dict], current: str, root: str) -> str:
    out = ['<nav class="side-nav" aria-label="All pages">',
           f'<a class="side-home{" active" if current == "index.html" else ""}" href="{root}index.html">🏠 Home</a>',
           f'<a class="side-home{" active" if current == "tools.html" else ""}" href="{root}tools.html">🎛️ All interactive tools</a>']
    for t in TOPICS:
        tp = [p for p in pages if p["topic"] is t]
        is_open = any(p["out"] == current for p in tp)
        out.append(f'<details class="side-topic"{" open" if is_open else ""}><summary>'
                   f'<span class="ico">{t["icon"]}</span>{t["name"]}</summary><ul>')
        for p in tp:
            if p["kind"] == "support" and p["label"] == SUPPORT[0][1]:
                out.append('<li class="side-sep">Reference</li>')
            num = f'<span class="num">{p["num"]}</span>' if p["kind"] == "module" else ""
            cls = ' class="active" aria-current="page"' if p["out"] == current else ""
            out.append(f'<li><a{cls} href="{root}{p["out"]}">{num}{html.escape(p["label"])}</a></li>')
        out.append(f'<li><a href="{root}{t["slug"]}/interactive/index.html">🎛️ Interactive tools</a></li>')
        out.append("</ul></details>")
    extras = [p for p in pages if p["kind"] == "extra"]
    for p in extras:
        cls = ' class="side-home active"' if p["out"] == current else ' class="side-home"'
        out.append(f'<a{cls} href="{root}{p["out"]}">🧩 {p["label"]}</a>')
    out.append("</nav>")
    return "\n".join(out)


def toc_html(tokens: list[dict]) -> str:
    items = []
    for tok in tokens:  # top level is the H1
        for h2 in tok.get("children", []) if tok["level"] == 1 else [tok]:
            items.append(f'<li><a href="#{h2["id"]}">{h2["name"]}</a>')
            kids = [c for c in h2.get("children", []) if c["level"] == 3]
            if kids:
                items.append("<ul>" + "".join(f'<li><a href="#{c["id"]}">{c["name"]}</a></li>' for c in kids) + "</ul>")
            items.append("</li>")
    if not items:
        return ""
    return '<nav class="toc" aria-label="On this page"><p class="toc-title">On this page</p><ul>' + "".join(items) + "</ul></nav>"


def layout(*, title: str, root: str, current: str, pages: list[dict], main: str, toc: str = "",
           math: bool = False, description: str = "") -> str:
    katex = ""
    if math:
        k = f"{root}assets/katex/"  # KaTeX 0.16.11, bundled so math works offline
        katex = (f'<link rel="stylesheet" href="{k}katex.min.css">\n'
                 f'<script defer src="{k}katex.min.js"></script>\n'
                 f'<script defer src="{k}contrib/auto-render.min.js"></script>')
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)} · {SITE_NAME}</title>
<meta name="description" content="{html.escape(description)}">
<script>try{{var t=localStorage.getItem('ss-theme');if(t)document.documentElement.dataset.theme=t;}}catch(e){{}}</script>
<link rel="stylesheet" href="{root}assets/site.css">
{katex}
<script defer src="{root}assets/search-index.js"></script>
<script defer src="{root}assets/site.js"></script>
</head>
<body data-root="{root}" data-page="{current}">
<a class="skip" href="#content">Skip to content</a>
<div class="progress" aria-hidden="true"><div></div></div>
<header class="topbar">
  <button class="icon-btn menu-btn" aria-label="Open navigation" aria-expanded="false">☰</button>
  <a class="brand" href="{root}index.html"><span class="brand-mark">📚</span>{SITE_NAME}</a>
  <div class="search">
    <input id="search" type="search" placeholder="Search all notes…  ( / )" autocomplete="off" aria-label="Search">
    <div class="search-results" role="listbox" hidden></div>
  </div>
  <button class="icon-btn theme-btn" aria-label="Toggle dark mode" title="Toggle dark mode">◐</button>
</header>
<div class="shell">
  <aside class="sidebar">{sidebar(pages, current, root)}</aside>
  <div class="scrim" hidden></div>
  <main id="content" class="main">{main}</main>
  <aside class="toc-col">{toc}</aside>
</div>
</body>
</html>
"""


def article_page(p: dict, pages: list[dict], index: list[dict]) -> None:
    src_text = p["src"].read_text(encoding="utf-8")
    body, toc_tokens = render_markdown(src_text)
    body = rewrite_links(body, at_root=False)
    root = "../"
    words = len(plain_text(body).split())
    minutes = max(1, round(words / 220))

    # Header chip line + breadcrumbs
    t = p["topic"]
    crumbs = [f'<a href="{root}index.html">Home</a>']
    if t:
        crumbs.append(f'<a href="{root}{t["slug"]}/index.html">{t["name"]}</a>')
    if p["kind"] != "overview":
        crumbs.append(f'<span>{html.escape(p["label"])}</span>')
    chip = {"module": f"Module {p.get('num', '')}", "overview": "Roadmap", "support": p["label"],
            "extra": "Template"}[p["kind"]]
    meta = (f'<div class="page-meta"><span class="chip">{chip}</span>'
            f'<span>⏱ {minutes} min read</span>'
            f'<a class="src-link" href="https://github.com/pkworkandlearnspace-git/Self-Study/blob/main/'
            f'{p["src"].relative_to(ROOT).as_posix()}" target="_blank" rel="noopener">View Markdown source</a></div>')

    # Put the meta line right after the H1
    body = re.sub(r"(</h1>)", r"\1" + meta, body, count=1)

    # Prev / next within the topic
    nav = ""
    if t:
        tp = [q for q in pages if q["topic"] is t]
        i = tp.index(p)
        prev = tp[i - 1] if i > 0 else None
        nxt = tp[i + 1] if i + 1 < len(tp) else None
        cells = []
        cells.append(f'<a class="pn prev" href="{root}{prev["out"]}"><small>← Previous</small>{html.escape(prev["label"])}</a>'
                     if prev else "<span></span>")
        cells.append(f'<a class="pn next" href="{root}{nxt["out"]}"><small>Next →</small>{html.escape(nxt["label"])}</a>'
                     if nxt else f'<a class="pn next" href="{root}{t["slug"]}/interactive/index.html"><small>Next →</small>Interactive tools</a>')
        nav = '<nav class="pager">' + "".join(cells) + "</nav>"

    crumb_html = '<nav class="crumbs" aria-label="Breadcrumb">' + ' <span class="sep">›</span> '.join(crumbs) + "</nav>"
    main = f'{crumb_html}<article class="doc">{body}</article>{nav}'
    math = bool(MATH_RE.search(src_text))
    html_out = layout(title=p["title"], root=root, current=p["out"], pages=pages, main=main,
                      toc=toc_html(toc_tokens), math=math,
                      description=(t["blurb"] if t else "Template for a new study topic"))
    dest = OUT / p["out"]
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html_out, encoding="utf-8")

    heads = []
    def walk(toks):
        for tk in toks:
            if tk["level"] > 1:
                heads.append({"n": html.unescape(re.sub("<[^>]+>", "", tk["name"])), "id": tk["id"]})
            walk(tk.get("children", []))
    walk(toc_tokens)
    index.append({"t": p["title"], "u": p["out"], "s": t["name"] if t else "Extras", "h": heads,
                  "x": search_text(plain_text(body))})


def home_page(pages: list[dict]) -> None:
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    # Keep the guidance sections; the hero + topic cards replace the intro and topic table.
    rest = readme.split("## How to split", 1)
    rest_md = "## How to split" + rest[1] if len(rest) == 2 else ""
    body, toc_tokens = render_markdown(rest_md)
    body = rewrite_links(body, at_root=True)

    n_modules = sum(1 for p in pages if p["kind"] == "module")
    n_tools = len([f for f in ROOT.glob("*/interactive/*.html") if f.name != "index.html"])
    cards = []
    for t in TOPICS:
        mods = [p for p in pages if p["topic"] is t and p["kind"] == "module"]
        first = mods[0] if mods else None
        cards.append(f"""<div class="topic-card">
  <div class="tc-head"><span class="tc-ico">{t["icon"]}</span><div><h3><a href="{t["slug"]}/index.html">{t["name"]}</a></h3><span class="tc-track">{t["track"]}</span></div></div>
  <p>{t["blurb"]}</p>
  <div class="tc-foot"><span>{len(mods)} modules</span>
    <span class="tc-links"><a href="{t["slug"]}/index.html">Roadmap</a>{f'<a href="{first["out"]}">Start module 01</a>' if first else ""}<a href="{t["slug"]}/interactive/index.html">Tools</a></span></div>
</div>""")
    main = f"""<section class="hero">
  <p class="eyebrow">Study notes · roadmaps · interactive tools</p>
  <h1>Learn any topic in depth, without wasting time on what you already know.</h1>
  <p class="hero-lead">Each topic has a roadmap, short modules you can skim (each opens with a <em>skip test</em>), a cheatsheet for quick recaps, a progress log, and visual tools you can play with.</p>
  <div class="stats"><div><b>{len(TOPICS)}</b><span>topics</span></div><div><b>{n_modules}</b><span>modules</span></div><div><b>{n_tools}</b><span>interactive tools</span></div></div>
</section>
<h2 class="section-title" id="topics">Choose a topic</h2>
<div class="topic-grid">{''.join(cards)}</div>
<section class="how">
  <h2 class="section-title">How to use each module</h2>
  <ol class="steps">
    <li><b>Take the skip test.</b> If you can do all of it, skip the module.</li>
    <li><b>Read the core ideas.</b> One main resource (⭐) per idea; everything else is optional.</li>
    <li><b>Work the examples &amp; practice.</b> Answers stay hidden until you click them.</li>
    <li><b>Recap, don't reread.</b> Use the cheatsheet and flashcards.</li>
    <li><b>Log it.</b> Write 3–5 lines in the progress log after each session.</li>
  </ol>
</section>
<article class="doc">{body}</article>"""
    out = layout(title="Home", root="", current="index.html", pages=pages, main=main, toc=toc_html(toc_tokens),
                 description="Self-study roadmaps for the olympiads, IELTS and deep learning.")
    (OUT / "index.html").write_text(out, encoding="utf-8")


def tools_page(pages: list[dict]) -> None:
    hub = (ROOT / "index.html").read_text(encoding="utf-8")
    m = re.search(r'<div class="sections">(.*?)</div>\s*<footer', hub, re.S)
    sections = m.group(1) if m else ""
    main = f"""<nav class="crumbs"><a href="index.html">Home</a> <span class="sep">›</span> <span>Interactive tools</span></nav>
<article class="doc wide"><h1>Interactive tools</h1>
<p class="lead">Visual, hands-on tools for every topic. They all work offline. Flashcard progress and writing drafts are saved in this browser only.</p>
<div class="tool-grid">{sections}</div></article>"""
    out = layout(title="Interactive tools", root="", current="tools.html", pages=pages, main=main,
                 description="All interactive study tools.")
    (OUT / "tools.html").write_text(out, encoding="utf-8")


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copytree(SRC / "assets", OUT / "assets")
    # Published folders must not start with "_" (Jekyll and some hosts hide them),
    # so _shared/ becomes shared/ and the tool pages are rewritten to match.
    shutil.copytree(ROOT / "_shared", OUT / "shared")
    for t in TOPICS:
        inter = ROOT / t["slug"] / "interactive"
        if inter.exists():
            shutil.copytree(inter, OUT / t["slug"] / "interactive")
            for f in (OUT / t["slug"] / "interactive").glob("*.html"):
                f.write_text(f.read_text(encoding="utf-8").replace("../../_shared/", "../../shared/"), encoding="utf-8")

    pages = page_list()
    index: list[dict] = []
    for p in pages:
        article_page(p, pages, index)
    home_page(pages)
    tools_page(pages)
    (OUT / "assets" / "search-index.js").write_text(
        "window.SEARCH_INDEX=" + json.dumps(index, ensure_ascii=False, separators=(",", ":")) + ";",
        encoding="utf-8")
    print(f"Built {len(pages) + 2} pages into {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
