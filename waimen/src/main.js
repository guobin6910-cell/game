import './style.css';
import {
  newGame,
  restoreState,
  revealPara,
  continueStory,
  pickChoice,
  goHub,
  openPrep,
  openSkills,
  confirmPrep,
  openCultivate,
  cultivate,
  buyPill,
  startMission,
  battleAct,
  continueSettle,
  getScene,
  subst,
  missionLabel,
  realmName,
  expProgress,
} from './game.js';
import { SKILLS, PILL, TYPE_LABEL } from './skills.js';
import { describeIntent } from './combat.js';
import { writeAuto, readAuto, hasContinue } from './save.js';
import { PORTRAITS, BACKGROUNDS, artFor, metFaces } from './art.js';

const app = document.getElementById('app');

let state = null;
let ui = 'title';
let prepPick = [];
let prepPill = false;

function persist() {
  if (state) writeAuto(state);
}

function mount() {
  app.innerHTML = `
    <div class="shell" id="shell">
      <header class="top" id="top"></header>
      <main class="mid" id="mid"></main>
      <footer class="bot" id="bot"></footer>
    </div>
    <div class="overlay hidden" id="overlay"></div>
  `;
  window.addEventListener('keydown', onKey);
  renderTitle();
}

function onKey(e) {
  if (e.repeat) return;
  if (e.key === 'Escape') {
    if (ui === 'play' && state) openMenu();
    return;
  }
  if (ui !== 'play' || !state) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const more = document.querySelector('[data-act="more"]');
    if (more) more.click();
  }
  const n = Number(e.key);
  if (n >= 1 && n <= 9) {
    const btn = document.querySelector(`[data-choice="${n - 1}"]`);
    if (btn) btn.click();
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function bar(cur, max, cls) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((cur / max) * 100))) : 0;
  return `<div class="bar ${cls}"><i style="width:${pct}%"></i></div>`;
}

function still(bgKey, loc, portraitKey, portraitName, extraHtml) {
  const src = BACKGROUNDS[bgKey];
  const who = portraitKey && PORTRAITS[portraitKey]
    ? `<img class="stage-who" src="${PORTRAITS[portraitKey]}" alt="${escapeHtml(portraitName || '')}">`
    : '';
  const label = [loc, portraitName].filter(Boolean).join(' · ');
  const locEl = extraHtml ? '' : `<div class="still-loc">${escapeHtml(label)}</div>`;
  if (!src) return `<div class="stage"><div class="loc">${escapeHtml(label)}</div>${extraHtml || ''}</div>`;
  return `<div class="stage"><div class="still"><img src="${src}" alt="">${who}${locEl}${extraHtml || ''}</div></div>`;
}

function faceRow(flags) {
  const faces = metFaces(flags);
  if (!faces.length) return '';
  const bits = faces.map(([id, name]) => {
    const src = PORTRAITS[id];
    if (!src) return '';
    return `<div class="face"><img src="${src}" alt="${escapeHtml(name)}"><span>${escapeHtml(name)}</span></div>`;
  }).join('');
  return `<div class="faces">${bits}</div>`;
}

function sceneArt(mode, sceneId) {
  const scene = sceneId ? getScene(sceneId, state) : null;
  return artFor(mode, sceneId, scene);
}

function renderTitle() {
  ui = 'title';
  state = null;
  const shell = document.getElementById('shell');
  shell.dataset.screen = 'title';
  document.getElementById('top').innerHTML = '';
  document.getElementById('bot').innerHTML = '';
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('mid').innerHTML = `
    <div class="title-wrap">
      <div class="seal">青衡</div>
      <h1 class="game-title">外門</h1>
      <p class="game-sub">文字RPG　第一幕 · 盤庫至虛掩</p>
      <p class="game-tag">外門雜役 · 煉體 · 門規合法</p>
      <div class="menu">
        <button type="button" data-act="new">新的故事</button>
        <button type="button" data-act="cont" ${hasContinue() ? '' : 'disabled'}>繼續</button>
      </div>
    </div>
  `;
  document.querySelector('[data-act="new"]').onclick = renderCreate;
  document.querySelector('[data-act="cont"]').onclick = () => {
    const data = readAuto();
    const restored = restoreState(data);
    if (restored) {
      state = restored;
      ui = 'play';
      paint();
    }
  };
}

function renderCreate() {
  ui = 'create';
  document.getElementById('shell').dataset.screen = 'title';
  let gender = 'male';
  document.getElementById('mid').innerHTML = `
    <div class="panel">
      <h2>建立角色</h2>
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
  document.getElementById('bot').innerHTML = '';
  document.querySelectorAll('[data-g]').forEach((btn) => {
    btn.onclick = () => {
      gender = btn.dataset.g;
      document.querySelectorAll('[data-g]').forEach((b) => b.classList.toggle('on', b === btn));
    };
  });
  document.getElementById('startBtn').onclick = () => {
    const name = document.getElementById('nameInput').value;
    state = newGame(gender, name);
    ui = 'play';
    persist();
    paint();
  };
  document.getElementById('backBtn').onclick = renderTitle;
}

function paint() {
  ui = 'play';
  const shell = document.getElementById('shell');
  shell.dataset.screen = state.mode;
  document.getElementById('overlay').classList.add('hidden');
  paintTop();
  paintMid();
  paintBot();
  const pane = document.querySelector('.pane');
  if (pane) pane.scrollTop = pane.scrollHeight;
}

function paintTop() {
  if (!state || state.mode === 'title') {
    document.getElementById('top').innerHTML = '';
    return;
  }
  const s = state.stats;
  const dem = state.flags.demerit || 0;
  document.getElementById('top').innerHTML = `
    <div class="who">
      <div class="who-name">${escapeHtml(state.name)}</div>
      <div class="who-realm">${escapeHtml(realmName(state.stats.level || 1))}</div>
    </div>
    <button type="button" class="menu-btn" id="btnMenu">選單</button>
    <div class="meters">
      <div class="meter"><span>氣血</span>${bar(s.hp, s.maxHp, 'hp')}<b>${s.hp}/${s.maxHp}</b></div>
      <div class="meter"><span>內力</span>${bar(s.mp, s.maxMp, 'mp')}<b>${s.mp}/${s.maxMp}</b></div>
    </div>
    <div class="chips">
      <span>碎銀 ${s.silver}</span>
      <span>記過 ${dem}</span>
      <span>經驗 ${s.exp}</span>
    </div>
  `;
  document.getElementById('btnMenu').onclick = (e) => {
    e.stopPropagation();
    openMenu();
  };
}

function paintMid() {
  const mid = document.getElementById('mid');
  if (state.mode === 'hub' || state.mode === 'cultivate') {
    mid.innerHTML = renderHub();
    return;
  }
  if (state.mode === 'prep') {
    mid.innerHTML = renderPrep();
    bindPrep();
    return;
  }
  if (state.mode === 'skills') {
    mid.innerHTML = renderSkillBook();
    return;
  }
  if (state.mode === 'battle') {
    mid.innerHTML = renderBattle();
    return;
  }
  if (state.mode === 'settle') {
    mid.innerHTML = renderSettle();
    return;
  }
  mid.innerHTML = renderLog();
}

function renderLog() {
  const scene = getScene(state.sceneId, state);
  const loc = scene ? subst(scene.loc || '', state) : '';
  const art = artFor('story', state.sceneId, scene);
  const entries = (state.log || [])
    .map((e) => {
      const cls = e.kind || 'p';
      return `<p class="log-${cls}">${escapeHtml(e.text)}</p>`;
    })
    .join('');
  return `${still(art.bg, loc, art.portrait, art.portraitName)}<div class="pane log">${entries}</div>`;
}

function renderHub() {
  const f = state.flags;
  const notes = [];
  notes.push(`第${state.day}日　差事：${missionLabel(state)}`);
  if (f.he_confides) notes.push('阿禾：還肯說話。');
  else if (f.he_fear || f.he_grudge) notes.push('阿禾：門關著。');
  else if (f.willful_blind) notes.push('阿禾：當你沒看見。');
  if (f.xie_hold || f.xie_cover || f.xie_line) notes.push('謝承淵：傘在，也是繩。');
  if (f.token_jian) notes.push('鞋裡有「薦」。');
  if (f.box_clue) notes.push('箱出庫時比入庫輕。');
  if (f.won_zhao) notes.push('趙師兄退過。掃地掃勢已入冊。');
  if (f.xiao_alert) notes.push('小滿：提醒過，鞋仍新。');
  else if (f.xiao_case) notes.push('小滿：執法堂有案。');
  else if (f.xie_eye) notes.push('小滿：謝師兄在看。');
  if (f.player_listed) notes.push(f.player_zheng ? '薦冊正薦有你的名。' : '薦冊備選有你的名。');
  if (f.he_saved) notes.push('阿禾：你保過。他還在。');
  else if (f.he_to_cart) notes.push('阿禾：車上。');
  if (f.page_hide) notes.push('缺箱那頁在你身上。');
  else if (f.page_to_xie) notes.push('那頁進了謝承淵袖。');
  else if (f.page_to_chen) notes.push('那頁進了陳肅袖。');
  else if (f.page_burn) notes.push('那頁成了灰。');
  if (f.act1_done) notes.push('第一幕止於門檻。門仍虛掩。');
  const learned = state.learned.map((id) => SKILLS[id]?.name).filter(Boolean).join('、');
  const prog = expProgress(state.stats);
  const expLine = prog.nextAt == null
    ? `經驗 ${state.stats.exp}　九層已滿`
    : `經驗 ${prog.into}/${prog.next}`;
  const cultHint = state.mode === 'cultivate'
    ? '<p class="muted">煉體長氣血，調息長內力，拆招長勢。一日一煉。</p>'
    : '';
  return `
    ${still('bunk', '青衡宗 · 外門')}
    <div class="pane hub-prose">
    ${faceRow(state.flags)}
      <div class="sheet-row">
        <span>${escapeHtml(prog.realm)}</span>
        <span>${escapeHtml(expLine)}</span>
        <span>攻 ${state.stats.atk}　防 ${state.stats.def}</span>
        <span>已習 ${state.learned.length} 門</span>
      </div>
      <p>${f.day1_done
        ? '雜役院。通鋪潮，土階乾。功法冊在枕下，丹藥在袖。門規把日子一寸寸削下去，削得合法。'
        : '外門晨課。饅頭還有餘溫。銀杏葉金黃，有人把掃帚當槍使。午後才盤庫——阿禾說先把樁站住，別一進門就想內門的事。'}</p>
      <p class="journal">${notes.map(escapeHtml).join('<br>')}</p>
      <p class="muted">已習：${escapeHtml(learned || '無')}</p>
      ${cultHint}
      ${state.notice ? `<p class="notice">${escapeHtml(state.notice)}</p>` : ''}
    </div>
  `;
}

function renderPrep() {
  const art = artFor('prep', '', { loc: '準備' });
  const cards = state.learned
    .map((id) => {
      const sk = SKILLS[id];
      if (!sk) return '';
      const on = prepPick.includes(id) ? ' on' : '';
      return `<button type="button" class="card${on}" data-sk="${id}">
        <div class="card-top"><b>${escapeHtml(sk.name)}</b><em>${TYPE_LABEL[sk.type]}</em></div>
        <div class="card-meta">耗內力 ${sk.cost}　勢 ${sk.power}</div>
        <p>${escapeHtml(sk.desc)}</p>
      </button>`;
    })
    .join('');
  const canPill = state.pills > 0;
  const pillOn = prepPill && canPill ? ' on' : '';
  return `
    ${still(art.bg, '準備')}
    <div class="pane">
    <p class="muted">出任務前選至多三門功法，可備一包止血散。點名未起，空手出列，先記過。</p>
    <div class="cards">${cards}</div>
    <button type="button" class="card${pillOn}" data-pill="1" ${canPill ? '' : 'disabled'}>
      <div class="card-top"><b>${PILL.name}</b><em>丹</em></div>
      <div class="card-meta">存 ${state.pills}　回氣血 ${PILL.heal}</div>
      <p>${escapeHtml(PILL.desc)}</p>
    </button>
    ${state.notice ? `<p class="notice">${escapeHtml(state.notice)}</p>` : ''}
    </div>
  `;
}

function bindPrep() {
  document.querySelectorAll('[data-sk]').forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.sk;
      if (prepPick.includes(id)) prepPick = prepPick.filter((x) => x !== id);
      else if (prepPick.length < 3) prepPick = [...prepPick, id];
      paint();
    };
  });
  const pillBtn = document.querySelector('[data-pill]');
  if (pillBtn && !pillBtn.disabled) {
    pillBtn.onclick = () => {
      prepPill = !prepPill;
      paint();
    };
  }
}

function renderSkillBook() {
  const cards = state.learned
    .map((id) => {
      const sk = SKILLS[id];
      if (!sk) return '';
      return `<div class="card static">
        <div class="card-top"><b>${escapeHtml(sk.name)}</b><em>${TYPE_LABEL[sk.type]}</em></div>
        <div class="card-meta">耗內力 ${sk.cost}　勢 ${sk.power}</div>
        <p>${escapeHtml(sk.desc)}</p>
      </div>`;
    })
    .join('');
  return `${still('bunk', '功法冊')}<div class="pane"><div class="cards">${cards || '<p class="muted">冊是空的。</p>'}</div></div>`;
}

function renderBattle() {
  const b = state.battle;
  const s = state.stats;
  const scene = getScene(state.sceneId, state);
  const art = artFor('battle', state.sceneId, scene);
  const intent = b.sensing > 0 ? `<p class="intent">${escapeHtml(describeIntent(b))}</p>` : '';
  const blog = b.log.map((t) => `<p class="log-battle">${escapeHtml(t)}</p>`).join('');
  const hud = `<div class="hud">
      <div class="hud-side">
        <div class="hud-name">${escapeHtml(b.name)}</div>
        ${bar(b.enemyHp, b.enemyMaxHp, 'hp')}
        <b>氣血 ${b.enemyHp}/${b.enemyMaxHp}</b>
      </div>
      <div class="hud-side">
        <div class="hud-name">${escapeHtml(state.name)}</div>
        ${bar(s.hp, s.maxHp, 'hp')}
        <b>氣血 ${s.hp}/${s.maxHp}</b>
        <em>內力 ${s.mp}/${s.maxMp}</em>
      </div>
    </div>`;
  return `
    ${still(art.bg, '衝突', art.portrait, art.portraitName, hud)}
    <div class="pane log battle-log">${intent}${blog}</div>
  `;
}

function renderSettle() {
  const se = state.settle;
  const win = se.result === 'win';
  const up = (se.levelUp && se.levelUp.length)
    ? `<p class="notice">境界進一層：${escapeHtml(se.levelUp.join('、'))}。氣血內力皆長。</p>`
    : '';
  return `
    ${still('cover', '結算')}
    <div class="pane settle">
      <h2>${win ? '這一場算你' : '這一場不算死'}</h2>
      <p>${escapeHtml(se.enemy)}　${win ? '退了' : '你跪過'}</p>
      <p>經驗 +${se.exp}</p>
      ${up}
      ${win ? '' : '<p>記過 +1。氣血只剩一絲。</p>'}
      <p class="muted">勝敗都要繼續當差。門規不給外門「結束」。 </p>
    </div>
  `;
}

function paintBot() {
  const bot = document.getElementById('bot');
  if (state.mode === 'hub') {
    const mission = `開始今日差事：${missionLabel(state)}`;
    bot.innerHTML = `
      <button type="button" data-h="prep">準備</button>
      <button type="button" data-h="cult">修煉</button>
      <button type="button" data-h="go">${escapeHtml(mission)}</button>
      <button type="button" data-h="book">功法冊</button>
      <button type="button" data-h="pill">兌止血散（四文）</button>
    `;
    bot.querySelector('[data-h="prep"]').onclick = () => {
      prepPick = state.loadout.slice();
      prepPill = state.packedPill && state.pills > 0;
      state = openPrep(state);
      persist();
      paint();
    };
    bot.querySelector('[data-h="cult"]').onclick = () => {
      state = openCultivate(state);
      persist();
      paint();
    };
    bot.querySelector('[data-h="go"]').onclick = () => {
      state = startMission(state);
      persist();
      paint();
    };
    bot.querySelector('[data-h="book"]').onclick = () => {
      state = openSkills(state);
      persist();
      paint();
    };
    bot.querySelector('[data-h="pill"]').onclick = () => {
      state = buyPill(state);
      persist();
      paint();
    };
    return;
  }
  if (state.mode === 'cultivate') {
    bot.innerHTML = `
      <button type="button" data-c="body">煉體（氣血）</button>
      <button type="button" data-c="breath">調息（內力）</button>
      <button type="button" data-c="form">拆招（勢）</button>
      <button type="button" data-act="back">返回</button>
    `;
    bot.querySelectorAll('[data-c]').forEach((b) => {
      b.onclick = () => {
        state = cultivate(state, b.dataset.c);
        persist();
        paint();
      };
    });
    bot.querySelector('[data-act="back"]').onclick = () => {
      state = goHub(state);
      persist();
      paint();
    };
    return;
  }
  if (state.mode === 'prep') {
    bot.innerHTML = `
      <button type="button" class="primary" data-act="ok">確認準備</button>
      <button type="button" data-act="back">返回</button>
    `;
    bot.querySelector('[data-act="ok"]').onclick = () => {
      state = confirmPrep(state, prepPick, prepPill);
      persist();
      paint();
    };
    bot.querySelector('[data-act="back"]').onclick = () => {
      state = goHub(state);
      persist();
      paint();
    };
    return;
  }
  if (state.mode === 'skills') {
    bot.innerHTML = `<button type="button" data-act="back">返回</button>`;
    bot.querySelector('[data-act="back"]').onclick = () => {
      state = goHub(state);
      persist();
      paint();
    };
    return;
  }
  if (state.mode === 'battle' && state.battle && !state.battle.result) {
    const skills = state.loadout
      .map((id) => SKILLS[id])
      .filter(Boolean)
      .map((sk) => {
        const low = state.stats.mp < sk.cost;
        return `<button type="button" data-sk="${sk.id}" ${low ? 'disabled' : ''}>${escapeHtml(sk.name)}　${sk.cost}</button>`;
      })
      .join('');
    const pill = state.packedPill && !state.battle.pillUsed
      ? `<button type="button" data-act="pill">${PILL.name}</button>`
      : '';
    bot.innerHTML = `<button type="button" data-act="atk">拙拳</button>${skills}<button type="button" data-act="guard">觀招（回內力）</button>${pill}`;
    bot.querySelectorAll('[data-sk]').forEach((b) => {
      b.onclick = () => {
        state = battleAct(state, { type: 'skill', id: b.dataset.sk });
        persist();
        paint();
      };
    });
    bot.querySelector('[data-act="atk"]').onclick = () => {
      state = battleAct(state, { type: 'attack' });
      persist();
      paint();
    };
    bot.querySelector('[data-act="guard"]').onclick = () => {
      state = battleAct(state, { type: 'guard' });
      persist();
      paint();
    };
    const pb = bot.querySelector('[data-act="pill"]');
    if (pb) {
      pb.onclick = () => {
        state = battleAct(state, { type: 'pill' });
        persist();
        paint();
      };
    }
    return;
  }
  if (state.mode === 'settle') {
    bot.innerHTML = `<button type="button" class="primary" data-act="more">繼續</button>`;
    bot.querySelector('[data-act="more"]').onclick = () => {
      state = continueSettle(state);
      persist();
      paint();
    };
    return;
  }
  // story
  if (state.awaiting === 'choice') {
    const scene = getScene(state.sceneId, state);
    const btns = (scene?.choices || [])
      .map((c, i) => `<button type="button" data-choice="${i}"><span class="num">${i + 1}</span>${escapeHtml(subst(c.text, state))}</button>`)
      .join('');
    bot.innerHTML = btns;
    bot.querySelectorAll('[data-choice]').forEach((b) => {
      b.onclick = () => {
        state = pickChoice(state, Number(b.dataset.choice));
        persist();
        paint();
      };
    });
    return;
  }
  const label = state.awaiting === 'battle_ready' ? '應戰' : '繼續';
  bot.innerHTML = `<button type="button" class="primary" data-act="more">${label}</button>`;
  bot.querySelector('[data-act="more"]').onclick = () => {
    if (state.awaiting === 'more' ) state = revealPara(state);
    else state = continueStory(state);
    persist();
    paint();
  };
}

function openMenu() {
  const ov = document.getElementById('overlay');
  ov.classList.remove('hidden');
  ov.innerHTML = `
    <div class="sheet">
      <h2>選單</h2>
      <div class="menu">
        <button type="button" data-act="resume">繼續遊玩</button>
        <button type="button" data-act="title">回標題</button>
      </div>
      <p class="muted">進度已自動寫入本機。</p>
    </div>
  `;
  ov.querySelector('[data-act="resume"]').onclick = () => {
    ov.classList.add('hidden');
  };
  ov.querySelector('[data-act="title"]').onclick = () => {
    persist();
    renderTitle();
  };
}

mount();
