import './style.css';
import script from './script/chapter1.json';
import {
  CAST,
  BACKGROUNDS,
  SPEED_MS,
  subst,
  getNode,
  parseSprites,
  visibleChoices,
  enterStart,
  advance,
} from './engine.js';
import {
  loadSettings,
  saveSettings,
  writeAuto,
  readAuto,
  writeSlot,
  readSlot,
  listSlots,
  hasContinue,
  formatSavedAt,
} from './save.js';

const app = document.getElementById('app');

const SPEED_LABEL = { slow: '慢', mid: '中', fast: '快', instant: '即顯' };

let settings = loadSettings();
let state = null;
let typing = null;
let shownFull = false;
let uiMode = 'title'; // title | newgame | load | play | menu | save | settings | end

function emptyFlags() {
  return {};
}

function freshState(gender, name) {
  return enterStart(script, {
    gender: gender === 'female' ? 'female' : 'male',
    playerName: (name && name.trim()) || '無名',
    flags: emptyFlags(),
  });
}

function restore(data) {
  const node = getNode(script, data.nodeId);
  return {
    gender: data.gender === 'female' ? 'female' : 'male',
    playerName: data.playerName || '無名',
    flags: data.flags || {},
    nodeId: data.nodeId,
    ended: node?.type === 'end',
    error: node ? null : 'missing-node',
  };
}

function sceneLabel(node) {
  if (!node) return script.chapter || '第一章';
  return node.scene || script.chapter || '第一章';
}

function persist() {
  if (!state) return;
  writeAuto(state, { chapter: script.chapter, scene: sceneLabel(getNode(script, state.nodeId)) });
}

function mount() {
  app.innerHTML = `
    <div class="stage" id="stage">
      <div class="bg bg-stone" id="bg"><div class="mist"></div></div>
      <div class="wash-stroke"></div>
      <div class="tap-layer" id="tap"></div>
      <div class="sprites" id="sprites"></div>
      <div class="hud" id="hud">
        <div class="hud-title" id="hudTitle">外門 · 第一章</div>
        <button type="button" id="btnMenu">選單</button>
      </div>
      <div class="dialogue" id="dialogue">
        <div class="speaker hidden" id="speaker">旁白</div>
        <div class="line" id="line"></div>
        <div class="continue" id="continue">▼</div>
      </div>
      <div class="choices" id="choices" hidden></div>
      <div class="screen" id="titleScreen"></div>
      <div class="overlay hidden" id="overlay"></div>
    </div>
  `;
  renderTitle();
  bind();
}

function bind() {
  document.getElementById('tap').addEventListener('click', onAdvance);
  document.getElementById('dialogue').addEventListener('click', (e) => {
    e.stopPropagation();
    onAdvance();
  });
  document.getElementById('btnMenu').addEventListener('click', (e) => {
    e.stopPropagation();
    if (uiMode === 'play' || uiMode === 'end') openMenu();
  });
  window.addEventListener('keydown', onKey);
}

function onKey(e) {
  if (e.repeat) return;
  if (uiMode === 'play') {
    const node = getNode(script, state.nodeId);
    if (node?.type === 'choice') {
      const n = Number(e.key);
      if (n >= 1 && n <= 9) {
        pickChoice(n - 1);
        e.preventDefault();
        return;
      }
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAdvance();
    }
    if (e.key === 'Escape') openMenu();
  } else if (uiMode === 'menu' || uiMode === 'save' || uiMode === 'settings' || uiMode === 'load') {
    if (e.key === 'Escape') {
      if (state && (uiMode !== 'title')) closeOverlayToPlay();
    }
  }
}

function hidePlayUi(hide) {
  document.getElementById('dialogue').style.display = hide ? 'none' : '';
  document.getElementById('sprites').style.display = hide ? 'none' : '';
  document.getElementById('hud').style.visibility = hide ? 'hidden' : 'visible';
  document.getElementById('choices').hidden = true;
}

function renderTitle() {
  uiMode = 'title';
  stopType();
  const el = document.getElementById('titleScreen');
  el.classList.remove('hidden');
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('dialogue').style.display = 'none';
  document.getElementById('sprites').style.display = 'none';
  document.getElementById('hud').style.visibility = 'hidden';
  document.getElementById('choices').hidden = true;
  el.innerHTML = `
    <div class="seal">青衡</div>
    <h1 class="game-title">外門</h1>
    <p class="game-sub">第一幕 · 第一章　盤庫</p>
    <div class="menu">
      <button type="button" data-act="new">新的故事</button>
      <button type="button" data-act="cont" ${hasContinue() ? '' : 'disabled'}>繼續</button>
      <button type="button" data-act="load">讀檔</button>
    </div>
  `;
  el.querySelector('[data-act="new"]').onclick = renderNewGame;
  el.querySelector('[data-act="cont"]').onclick = () => {
    const data = readAuto();
    if (data) startFromSave(data);
  };
  el.querySelector('[data-act="load"]').onclick = () => renderLoad(true);
}

function renderNewGame() {
  uiMode = 'newgame';
  const el = document.getElementById('titleScreen');
  let gender = 'male';
  el.innerHTML = `
    <div class="panel">
      <h2>新的故事</h2>
      <label>身分</label>
      <div class="row">
        <button type="button" class="pick on" data-g="male">男</button>
        <button type="button" class="pick" data-g="female">女</button>
      </div>
      <label>姓名（可空，預設無名）</label>
      <input id="nameInput" maxlength="8" placeholder="無名" autocomplete="off" />
      <button type="button" class="primary" id="startBtn">開始</button>
      <button type="button" class="back" id="backBtn">返回</button>
    </div>
  `;
  el.querySelectorAll('[data-g]').forEach((btn) => {
    btn.onclick = () => {
      gender = btn.dataset.g;
      el.querySelectorAll('[data-g]').forEach((b) => b.classList.toggle('on', b === btn));
    };
  });
  el.querySelector('#startBtn').onclick = () => {
    const name = el.querySelector('#nameInput').value;
    state = freshState(gender, name);
    persist();
    beginPlay();
  };
  el.querySelector('#backBtn').onclick = renderTitle;
}

function renderLoad(fromTitle) {
  uiMode = 'load';
  const slots = listSlots();
  const body = (label, data, key) => {
    if (!data) {
      return `<button type="button" class="slot" data-k="${key}" disabled>
        <div class="k">${label}</div>
        <div class="d">空</div>
      </button>`;
    }
    return `<button type="button" class="slot" data-k="${key}">
      <div class="k">${label}　${escapeHtml(data.playerName || '無名')}</div>
      <div class="d">${escapeHtml(data.chapter || '第一章')}　${formatSavedAt(data.savedAt)}</div>
    </button>`;
  };
  const inner = `
    <div class="panel">
      <h2>讀檔</h2>
      ${body('自動', slots.auto, 'auto')}
      ${body('一', slots[1], '1')}
      ${body('二', slots[2], '2')}
      ${body('三', slots[3], '3')}
      <button type="button" class="back" id="backBtn">返回</button>
    </div>
  `;
  if (fromTitle) {
    const el = document.getElementById('titleScreen');
    el.classList.remove('hidden');
    el.innerHTML = inner;
    el.querySelector('#backBtn').onclick = renderTitle;
    el.querySelectorAll('.slot:not(:disabled)').forEach((b) => {
      b.onclick = () => startFromSave(b.dataset.k === 'auto' ? slots.auto : slots[Number(b.dataset.k)]);
    });
  } else {
    showOverlay(inner);
    document.querySelector('#overlay #backBtn').onclick = openMenu;
    document.querySelectorAll('#overlay .slot:not(:disabled)').forEach((b) => {
      b.onclick = () => startFromSave(b.dataset.k === 'auto' ? slots.auto : slots[Number(b.dataset.k)]);
    });
  }
}

function startFromSave(data) {
  state = restore(data);
  persist();
  beginPlay();
}

function beginPlay() {
  document.getElementById('titleScreen').classList.add('hidden');
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('dialogue').style.display = '';
  document.getElementById('sprites').style.display = '';
  document.getElementById('hud').style.visibility = 'visible';
  uiMode = 'play';
  paintNode(true);
}

function openMenu() {
  uiMode = 'menu';
  showOverlay(`
    <div class="sheet">
      <h2>選單</h2>
      <div class="menu">
        <button type="button" data-act="resume">繼續遊玩</button>
        <button type="button" data-act="save">存檔</button>
        <button type="button" data-act="load">讀檔</button>
        <button type="button" data-act="set">文字速度</button>
        <button type="button" data-act="title">回標題</button>
      </div>
    </div>
  `);
  const ov = document.getElementById('overlay');
  ov.querySelector('[data-act="resume"]').onclick = closeOverlayToPlay;
  ov.querySelector('[data-act="save"]').onclick = renderSave;
  ov.querySelector('[data-act="load"]').onclick = () => renderLoad(false);
  ov.querySelector('[data-act="set"]').onclick = renderSettings;
  ov.querySelector('[data-act="title"]').onclick = () => {
    state = null;
    renderTitle();
  };
}

function renderSave() {
  uiMode = 'save';
  const slots = listSlots();
  const one = (n) => {
    const data = slots[n];
    const d = data
      ? `${escapeHtml(data.playerName || '無名')}　${formatSavedAt(data.savedAt)}`
      : '空';
    return `<button type="button" class="slot" data-n="${n}">
      <div class="k">檔位 ${['', '一', '二', '三'][n]}</div>
      <div class="d">${d}</div>
    </button>`;
  };
  showOverlay(`
    <div class="sheet">
      <h2>存檔</h2>
      ${one(1)}${one(2)}${one(3)}
      <button type="button" class="back" id="backBtn">返回</button>
    </div>
  `);
  document.querySelectorAll('#overlay .slot').forEach((b) => {
    b.onclick = () => {
      writeSlot(Number(b.dataset.n), state, {
        chapter: script.chapter,
        scene: sceneLabel(getNode(script, state.nodeId)),
      });
      persist();
      renderSave();
    };
  });
  document.querySelector('#overlay #backBtn').onclick = openMenu;
}

function renderSettings() {
  uiMode = 'settings';
  const cur = settings.textSpeed || 'mid';
  const btns = Object.keys(SPEED_LABEL)
    .map(
      (k) =>
        `<button type="button" data-sp="${k}" class="${k === cur ? 'on' : ''}">${SPEED_LABEL[k]}</button>`
    )
    .join('');
  showOverlay(`
    <div class="sheet">
      <h2>文字速度</h2>
      <div class="speeds">${btns}</div>
      <button type="button" class="back" id="backBtn">返回</button>
    </div>
  `);
  document.querySelectorAll('#overlay [data-sp]').forEach((b) => {
    b.onclick = () => {
      settings = { ...settings, textSpeed: b.dataset.sp };
      saveSettings(settings);
      renderSettings();
    };
  });
  document.querySelector('#overlay #backBtn').onclick = openMenu;
}

function showOverlay(html) {
  const ov = document.getElementById('overlay');
  ov.classList.remove('hidden');
  ov.innerHTML = html;
}

function closeOverlayToPlay() {
  document.getElementById('overlay').classList.add('hidden');
  uiMode = state?.ended ? 'end' : 'play';
  if (state?.ended) renderEnd();
}

function onAdvance() {
  if (uiMode !== 'play' || !state) return;
  const node = getNode(script, state.nodeId);
  if (!node) return;
  if (node.type === 'choice') return;
  if (node.type === 'end') {
    uiMode = 'end';
    renderEnd();
    return;
  }
  if (!shownFull) {
    finishType();
    return;
  }
  goNext();
}

function goNext(choiceIndex) {
  const prev = state.nodeId;
  state = advance(script, state, choiceIndex);
  if (state.error) {
    console.error('script error', state.error, state.nodeId, 'from', prev);
  }
  persist();
  if (state.ended || getNode(script, state.nodeId)?.type === 'end') {
    paintNode(true);
    return;
  }
  paintNode(false);
}

function pickChoice(i) {
  const node = getNode(script, state.nodeId);
  const choices = visibleChoices(node, state.flags);
  if (!choices[i]) return;
  goNext(i);
}

function paintNode(immediate) {
  const node = getNode(script, state.nodeId);
  if (!node) return;
  if (node.type === 'end') {
    renderEnd();
    return;
  }

  if (node.background) applyBackground(node.background);
  if (node.sprite !== undefined) renderSprites(node.sprite);
  document.getElementById('hudTitle').textContent =
    '外門 · ' + (node.scene || '第一章');

  const speakerEl = document.getElementById('speaker');
  const lineEl = document.getElementById('line');
  const cont = document.getElementById('continue');
  const choiceBox = document.getElementById('choices');

  if (node.type === 'choice') {
    if (node.text) {
      document.getElementById('dialogue').style.display = '';
      const sp = node.speaker || '';
      speakerEl.textContent = sp;
      speakerEl.classList.toggle('hidden', !sp);
      lineEl.className = 'line' + (sp ? '' : ' narration');
      typeText(subst(node.text, state), immediate || settings.textSpeed === 'instant');
    } else {
      document.getElementById('dialogue').style.display = '';
      stopType();
      shownFull = true;
    }
    cont.style.visibility = 'hidden';
    const choices = visibleChoices(node, state.flags);
    choiceBox.hidden = false;
    choiceBox.innerHTML = choices
      .map(
        (c, i) =>
          `<button type="button" class="choice" data-i="${i}"><span class="num">${i + 1}</span>${escapeHtml(
            subst(c.text, state)
          )}</button>`
      )
      .join('');
    choiceBox.querySelectorAll('.choice').forEach((b) => {
      b.onclick = (e) => {
        e.stopPropagation();
        pickChoice(Number(b.dataset.i));
      };
    });
    return;
  }

  document.getElementById('dialogue').style.display = '';
  choiceBox.hidden = true;
  choiceBox.innerHTML = '';
  const sp = node.speaker || '';
  speakerEl.textContent = sp;
  speakerEl.classList.toggle('hidden', !sp);
  lineEl.className = 'line' + (sp ? '' : ' narration');
  cont.style.visibility = 'hidden';
  typeText(subst(node.text || '', state), immediate || settings.textSpeed === 'instant');
}

function typeText(text, instant) {
  stopType();
  const lineEl = document.getElementById('line');
  const cont = document.getElementById('continue');
  if (instant || SPEED_MS[settings.textSpeed] === 0) {
    lineEl.textContent = text;
    shownFull = true;
    cont.style.visibility = 'visible';
    return;
  }
  shownFull = false;
  lineEl.textContent = '';
  const ms = SPEED_MS[settings.textSpeed] ?? 22;
  const chars = Array.from(text);
  let i = 0;
  typing = {
    text,
    timer: setInterval(() => {
      i += 1;
      lineEl.textContent = chars.slice(0, i).join('');
      if (i >= chars.length) finishType();
    }, ms),
  };
}

function finishType() {
  if (!typing) {
    shownFull = true;
    return;
  }
  const lineEl = document.getElementById('line');
  lineEl.textContent = typing.text;
  stopType();
  shownFull = true;
  document.getElementById('continue').style.visibility = 'visible';
}

function stopType() {
  if (typing?.timer) clearInterval(typing.timer);
  typing = null;
}

function applyBackground(name) {
  const bg = document.getElementById('bg');
  const cls = BACKGROUNDS[name] || bg.dataset.keep || 'bg-stone';
  if (name) bg.dataset.keep = cls;
  bg.className = 'bg ' + (name ? cls : bg.dataset.keep || 'bg-stone');
  if (!bg.querySelector('.mist')) {
    const m = document.createElement('div');
    m.className = 'mist';
    bg.appendChild(m);
  }
}

function renderSprites(sprite) {
  const wrap = document.getElementById('sprites');
  const list = parseSprites(sprite);
  wrap.innerHTML = list
    .map((s) => {
      const meta = CAST[s.id] || { name: s.id, cls: 'clerk' };
      const far = s.far || s.id === 'wei' ? ' far' : '';
      return `<div class="sprite ${meta.cls} slot-${s.slot}${far}">
        <div class="portrait">
          <div class="ink-head"></div>
          <div class="ink-body"></div>
          <div class="ink-collar"></div>
        </div>
        <div class="sprite-label">${escapeHtml(meta.name)}</div>
      </div>`;
    })
    .join('');
}

function renderEnd() {
  uiMode = 'end';
  stopType();
  persist();
  const node = getNode(script, state.nodeId);
  const extra = subst(node?.text || '夜深。寅時還遠。', state);
  document.getElementById('titleScreen').classList.remove('hidden');
  document.getElementById('dialogue').style.display = 'none';
  document.getElementById('choices').hidden = true;
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('titleScreen').innerHTML = `
    <div class="end-card">
      <h2>第一章　終</h2>
      <p>${escapeHtml(extra)}</p>
      <div class="end-actions">
        <button type="button" id="toTitle">回到標題</button>
        <button type="button" id="toLoad">讀檔</button>
      </div>
    </div>
  `;
  document.getElementById('toTitle').onclick = renderTitle;
  document.getElementById('toLoad').onclick = () => renderLoad(true);
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

mount();
