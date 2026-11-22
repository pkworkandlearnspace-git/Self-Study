// Self-Study offline site: menu, theme, search, progress tracking. No network access.
(function () {
  'use strict';
  var root = document.body.dataset.root || '';
  var page = document.body.dataset.page || '';
  var KEY = 'ss-progress-v1';

  // ---- storage (works on file:// in most browsers; fails silently otherwise) ----
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || { tasks: {}, done: {}, last: null }; } catch (e) { return { tasks: {}, done: {}, last: null }; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var state = load();
  state.tasks = state.tasks || {}; state.done = state.done || {};

  // ---- menu + theme ----
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-action]');
    if (!a) return;
    var act = a.dataset.action;
    if (act === 'menu') document.body.classList.toggle('menu-open');
    if (act === 'theme') {
      var cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var nxt = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nxt;
      try { localStorage.setItem('ss-theme', nxt); } catch (err) {}
    }
    if (act === 'search') openSearch();
    if (act === 'export') {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      var l = document.createElement('a'); l.href = URL.createObjectURL(blob); l.download = 'self-study-progress.json'; l.click();
    }
    if (act === 'reset' && confirmReset()) { state = { tasks: {}, done: {}, last: null }; save(state); refresh(); }
  });
  function confirmReset() { var b = document.querySelector('[data-action="reset"]'); if (b.dataset.armed) return true; b.dataset.armed = 1; b.textContent = 'Click again to confirm reset'; setTimeout(function () { delete b.dataset.armed; b.textContent = 'Reset progress'; }, 4000); return false; }
  var imp = document.querySelector('[data-action="import"]');
  if (imp) imp.addEventListener('change', function () {
    var f = imp.files[0]; if (!f) return;
    f.text().then(function (t) { try { var s = JSON.parse(t); state = { tasks: s.tasks || {}, done: s.done || {}, last: s.last || null }; save(state); refresh(); imp.parentNode.firstChild.textContent = '✅ Imported '; } catch (e) { alert('That file is not a Self-Study progress file.'); } });
  });

  // ---- code copy ----
  document.querySelectorAll('.code .copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var txt = b.parentNode.querySelector('code').innerText;
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { b.textContent = 'Copied'; }, function () { b.textContent = 'Select & copy'; });
      setTimeout(function () { b.textContent = 'Copy'; }, 1500);
    });
  });

  // ---- skip-test checkboxes ----
  var boxes = Array.prototype.slice.call(document.querySelectorAll('.prose .task-list-item input[type=checkbox]'));
  boxes.forEach(function (cb, i) {
    var k = page + '#' + i;
    cb.disabled = false;
    cb.checked = !!state.tasks[k];
    cb.closest('li').classList.toggle('checked', cb.checked);
    cb.addEventListener('change', function () {
      if (cb.checked) state.tasks[k] = 1; else delete state.tasks[k];
      cb.closest('li').classList.toggle('checked', cb.checked);
      save(state); skipStatus();
    });
  });
  var firstList = document.querySelector('.prose .contains-task-list');
  var statusEl;
  if (firstList && document.body.classList.contains('kind-module')) {
    statusEl = document.createElement('p'); statusEl.className = 'skip-status';
    firstList.after(statusEl);
  }
  function skipStatus() {
    if (!statusEl) return;
    var list = firstList.querySelectorAll('input'); var n = 0;
    list.forEach(function (c) { if (c.checked) n++; });
    statusEl.classList.toggle('all', n === list.length);
    statusEl.textContent = n === list.length ? '🎉 You can do everything in the skip test. Consider skipping ahead or just skimming this module.' : n + ' of ' + list.length + ' skip-test items ticked. The unticked items are what to study here.';
  }
  skipStatus();

  // ---- module done ----
  document.querySelectorAll('.done-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.key;
      if (state.done[k]) delete state.done[k]; else state.done[k] = Date.now();
      save(state); refresh();
    });
  });

  // ---- remember last page ----
  if (page && page !== 'home') { state.last = { u: location.pathname.split('/').slice(-2).join('/'), t: document.title.replace(/ · Self-Study$/, '') }; save(state); }

  function refresh() {
    document.querySelectorAll('[data-key]').forEach(function (el) {
      var on = !!state.done[el.dataset.key];
      el.classList.toggle('is-done', on);
      if (el.classList.contains('done-btn')) { el.classList.toggle('on', on); el.textContent = on ? 'Module done' : 'Mark module as done'; }
    });
    var totals = {}, allMods = 0, allDone = 0;
    document.querySelectorAll('.sidebar a.mod[data-key]').forEach(function (a) {
      var t = a.dataset.key.split('/')[0]; totals[t] = totals[t] || [0, 0]; totals[t][0]++; allMods++;
      if (state.done[a.dataset.key]) { totals[t][1]++; allDone++; }
    });
    Object.keys(totals).forEach(function (t) {
      var p = Math.round(100 * totals[t][1] / totals[t][0]);
      document.querySelectorAll('[data-topic="' + t + '"]').forEach(function (e) { e.textContent = totals[t][1] ? p + '%' : ''; });
      document.querySelectorAll('[data-topic-bar="' + t + '"]').forEach(function (e) { e.style.width = p + '%'; });
      document.querySelectorAll('[data-topic-text="' + t + '"]').forEach(function (e) { e.textContent = totals[t][1] + ' of ' + totals[t][0] + ' modules done'; });
    });
    var ov = document.querySelector('[data-overall]');
    if (ov) ov.textContent = (allMods ? Math.round(100 * allDone / allMods) : 0) + '%';
    var cont = document.querySelector('.continue');
    if (cont && state.last && state.last.u) { cont.hidden = false; var a = cont.querySelector('a'); a.href = state.last.u; a.textContent = state.last.t; }
  }
  refresh();

  // ---- TOC highlight ----
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {}; tocLinks.forEach(function (a) { map[decodeURIComponent(a.hash.slice(1))] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting && map[en.target.id]) { tocLinks.forEach(function (x) { x.classList.remove('active'); }); map[en.target.id].classList.add('active'); } });
    }, { rootMargin: '-70px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) io.observe(h); });
  }

  // ---- search ----
  var modal = document.querySelector('.search-modal');
  var input = modal.querySelector('input');
  var results = modal.querySelector('.results');
  var idx = (window.SEARCH_INDEX || []).map(function (r) { return { r: r, hay: (r.h + ' ' + r.p + ' ' + r.x).toLowerCase(), head: (r.h || '').toLowerCase() }; });
  var sel = 0, shown = [];
  function openSearch() { modal.hidden = false; document.body.classList.remove('menu-open'); input.value = ''; doSearch(); setTimeout(function () { input.focus(); }, 10); }
  function closeSearch() { modal.hidden = true; }
  function escHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hl(s, terms) { var h = escHtml(s); terms.forEach(function (t) { if (t.length > 1) h = h.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); }); return h; }
  function snippet(x, terms) { var lx = x.toLowerCase(), i = -1; for (var k = 0; k < terms.length && i < 0; k++) i = lx.indexOf(terms[k]); var s = Math.max(0, i - 50); return (s ? '…' : '') + x.slice(s, s + 170); }
  function doSearch() {
    var q = input.value.trim().toLowerCase();
    var terms = q.split(/\s+/).filter(Boolean);
    if (!terms.length) { results.innerHTML = '<div class="empty">Type to search ' + idx.length + ' sections across every topic.</div>'; shown = []; return; }
    shown = idx.map(function (e) {
      var sc = 0;
      for (var i = 0; i < terms.length; i++) { var t = terms[i]; if (e.hay.indexOf(t) < 0) return null; sc += (e.head.indexOf(t) >= 0 ? 10 : 0) + (e.r.p.toLowerCase().indexOf(t) >= 0 ? 3 : 0) + 1; }
      if (e.head === q) sc += 20;
      return { e: e, sc: sc };
    }).filter(Boolean).sort(function (a, b) { return b.sc - a.sc; }).slice(0, 40);
    sel = 0;
    results.innerHTML = shown.length ? shown.map(function (s, i) {
      var r = s.e.r;
      return '<a href="' + root + r.u + '" class="' + (i === 0 ? 'sel' : '') + '"><span class="rp">' + escHtml(r.p) + '</span><span class="rh">' + hl(r.h || r.p, terms) + '</span>' + (r.x ? '<span class="rx">' + hl(snippet(r.x, terms), terms) + '</span>' : '') + '</a>';
    }).join('') : '<div class="empty">No matches for “' + escHtml(q) + '”.</div>';
  }
  input.addEventListener('input', doSearch);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeSearch(); if (e.target.closest('.results a')) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    var typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '');
    if (!modal.hidden) {
      var links = results.querySelectorAll('a');
      if (e.key === 'Escape') closeSearch();
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!links.length) return; links[sel].classList.remove('sel'); sel = (sel + (e.key === 'ArrowDown' ? 1 : links.length - 1)) % links.length; links[sel].classList.add('sel'); links[sel].scrollIntoView({ block: 'nearest' }); }
      else if (e.key === 'Enter' && links[sel]) { location.href = links[sel].href; closeSearch(); }
      return;
    }
    if (typing) return;
    if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') document.body.classList.remove('menu-open');
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { var p = document.querySelector(e.key === 'ArrowLeft' ? '.pager .prev' : '.pager .next'); if (p && !e.altKey && !e.ctrlKey && !e.metaKey) location.href = p.href; }
  });
})();
