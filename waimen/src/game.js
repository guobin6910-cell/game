import { START_SKILLS, SKILLS } from './skills.js';
import { getScene, subst, applyFlags, CHAPTERS } from './story.js';
import { startBattle, applyBattleAction } from './combat.js';

export { getScene, subst, SKILLS, CHAPTERS };

const LAYER = ['初', '二', '三', '四', '五', '六', '七', '八', '九'];
const EXP_AT = [0, 24, 56, 100, 156, 224, 306, 402, 512];

export function realmName(level) {
  const i = Math.max(1, Math.min(9, level || 1)) - 1;
  return '外門煉體·' + LAYER[i] + '層';
}

export function levelFromExp(exp) {
  const e = exp || 0;
  let lv = 1;
  for (let i = 1; i < EXP_AT.length; i += 1) {
    if (e >= EXP_AT[i]) lv = i + 1;
  }
  const cur = EXP_AT[lv - 1];
  const nextAt = lv >= 9 ? null : EXP_AT[lv];
  return {
    level: lv,
    into: e - cur,
    next: nextAt == null ? 0 : nextAt - cur,
    nextAt,
  };
}

export function expProgress(stats) {
  const p = levelFromExp(stats?.exp || 0);
  p.level = stats?.level || p.level;
  p.realm = realmName(p.level);
  return p;
}

function applyGainExp(stats, gain) {
  const prev = stats.exp || 0;
  const nextExp = prev + gain;
  const before = (stats.level || levelFromExp(prev).level);
  const after = levelFromExp(nextExp).level;
  const s = { ...stats, exp: nextExp, level: after };
  const ups = [];
  for (let lv = before + 1; lv <= after; lv += 1) {
    s.maxHp += 5;
    s.maxMp += 3;
    s.atk += 1;
    if (lv % 2 === 1) s.def += 1;
    s.hp = s.maxHp;
    s.mp = s.maxMp;
    s.level = lv;
    ups.push(realmName(lv));
  }
  return { stats: s, levelUp: ups };
}

export function freshStats() {
  return { hp: 40, maxHp: 40, mp: 18, maxMp: 18, atk: 8, def: 4, exp: 0, silver: 12, level: 1 };
}

export function chapterIndex(mission) {
  const m = String(mission || '');
  const n = /^c(\d+)$/.exec(m);
  return n ? Number(n[1]) : 0;
}

export function nextOpenMission(state) {
  const f = state.flags || {};
  for (let i = 1; i <= 48; i += 1) {
    if (!f['ch' + i + '_done']) return 'c' + i;
  }
  return 'errand';
}

export function newGame(gender, name) {
  const state = {
    version: 3,
    gender: gender === 'female' ? 'female' : 'male',
    name: (name && String(name).trim()) || '無名',
    mode: 'story',
    sceneId: 'c1',
    paraIndex: 0,
    log: [],
    flags: {},
    stats: freshStats(),
    learned: [],
    loadout: [],
    pills: 1,
    packedPill: false,
    day: 1,
    mission: 'c1',
    battle: null,
    settle: null,
    cultivatedToday: 0,
    awaiting: 'more',
    notice: '',
  };
  return revealPara(state);
}

export function restoreState(data) {
  if (!data || !data.stats) return null;
  if ((data.version || 0) < 3) return null;
  const flags = data.flags || {};
  let mission = data.mission || 'c1';
  const day = data.day || 1;
  if (!mission || mission === 'done') mission = nextOpenMission({ flags });
  return {
    version: 3,
    gender: data.gender === 'female' ? 'female' : 'male',
    name: data.name || '無名',
    mode: data.mode || 'hub',
    sceneId: data.sceneId || 'c1',
    paraIndex: data.paraIndex || 0,
    log: Array.isArray(data.log) ? data.log : [],
    flags,
    stats: (() => {
      const stats = { ...freshStats(), ...data.stats };
      if (!stats.level) stats.level = levelFromExp(stats.exp || 0).level;
      return stats;
    })(),
    learned: Array.isArray(data.learned) ? data.learned.slice() : [],
    loadout: Array.isArray(data.loadout) ? data.loadout.slice() : [],
    pills: data.pills ?? 1,
    packedPill: Boolean(data.packedPill),
    day,
    mission,
    battle: data.battle || null,
    settle: data.settle || null,
    cultivatedToday: data.cultivatedToday || 0,
    awaiting: data.awaiting || 'more',
    notice: '',
  };
}

function trimLog(log) {
  if (log.length <= 80) return log;
  return log.slice(-60);
}

function applyEffects(state, effects) {
  if (!effects) return state;
  const stats = { ...state.stats };
  const flags = { ...state.flags };
  if (effects.maxHp) {
    stats.maxHp += effects.maxHp;
    if (effects.maxHp > 0) stats.hp = Math.min(stats.maxHp, stats.hp + effects.maxHp);
  }
  if (effects.maxMp) {
    stats.maxMp += effects.maxMp;
    if (effects.maxMp > 0) stats.mp = Math.min(stats.maxMp, stats.mp + effects.maxMp);
  }
  if (effects.silver) stats.silver = Math.max(0, stats.silver + effects.silver);
  if (effects.hp) stats.hp = Math.max(1, Math.min(stats.maxHp, stats.hp + effects.hp));
  if (effects.mp) stats.mp = Math.max(0, Math.min(stats.maxMp, stats.mp + effects.mp));
  if (effects.atk) stats.atk += effects.atk;
  if (effects.def) stats.def += effects.def;
  if (effects.demerit) flags.demerit = (flags.demerit || 0) + effects.demerit;
  let next = { ...state, stats, flags };
  if (effects.exp) {
    const gained = applyGainExp(next.stats, effects.exp);
    next = { ...next, stats: gained.stats };
  }
  return next;
}

function maybeUnlock(state) {
  let learned = state.learned.slice();
  const flags = { ...state.flags };
  const log = state.log.slice();
  if (flags.unlock_listen && !learned.includes('listen')) {
    learned.push('listen');
    log.push({ kind: 'sys', text: '領悟功法：聽壁息。牆那邊息長的是巡夜，息短的是怕。' });
    flags.unlock_listen = 0;
  }
  if (flags.unlock_sweep && !learned.includes('sweep')) {
    learned.push('sweep');
    log.push({ kind: 'sys', text: '領悟功法：掃地掃勢。掃帚橫掃的路數，成了招。' });
    flags.unlock_sweep = 0;
  }
  if (flags.unlock_slip && !learned.includes('slip')) {
    learned.push('slip');
    log.push({ kind: 'sys', text: '領悟功法：捲紙。廢帖進掌，這一招少挨不必入冊的打。' });
    flags.unlock_slip = 0;
  }
  if (flags.unlock_merit && !learned.includes('merit')) {
    learned.push('merit');
    log.push({ kind: 'sys', text: '領悟功法：肩勒。下山押箱的勒痕還在肩上，成了招。' });
    flags.unlock_merit = 0;
  }
  return { ...state, learned, flags, log: trimLog(log) };
}

function grantTempleSkills(state) {
  let learned = state.learned.slice();
  let loadout = state.loadout.slice();
  const log = state.log.slice();
  let added = false;
  for (const id of START_SKILLS) {
    if (!learned.includes(id)) {
      learned.push(id);
      added = true;
    }
  }
  if (!loadout.length) loadout = START_SKILLS.slice();
  if (added) {
    log.push({ kind: 'sys', text: '外門晨課把兩門拙功夫塞進你骨頭裡：青衡樁、搬箱勁。' });
  }
  return { ...state, learned, loadout, log: trimLog(log) };
}

function awaitingOf(scene) {
  if (!scene) return 'idle';
  if (scene.choices && scene.choices.length) return 'choice';
  if (scene.battle) return 'battle_ready';
  if (scene.next) return 'next';
  return 'idle';
}

export function enterScene(state, id) {
  let next = {
    ...state,
    sceneId: id,
    paraIndex: 0,
    mode: 'story',
    battle: null,
    settle: null,
    notice: '',
    awaiting: 'more',
  };
  const scene = getScene(id, next);
  if (!scene) {
    return { ...next, notice: '缺場：' + id, awaiting: 'idle' };
  }
  if (scene.setFlags) next.flags = applyFlags(scene.setFlags, next.flags);
  next = applyEffects(next, scene.effects);
  next = maybeUnlock(next);
  return revealPara(next);
}

export function revealPara(state) {
  const scene = getScene(state.sceneId, state);
  if (!scene) return { ...state, awaiting: 'idle' };
  if (state.paraIndex >= scene.paras.length) {
    return { ...state, awaiting: awaitingOf(scene) };
  }
  const text = subst(scene.paras[state.paraIndex], state);
  const log = trimLog([...state.log, { kind: 'p', text }]);
  const paraIndex = state.paraIndex + 1;
  const awaiting = paraIndex >= scene.paras.length ? awaitingOf(scene) : 'more';
  return { ...state, log, paraIndex, awaiting };
}

export function continueStory(state) {
  if (state.awaiting === 'more') return revealPara(state);
  if (state.awaiting === 'next') {
    const scene = getScene(state.sceneId, state);
    if (scene?.next === '__hub_done__') return finishMission(state);
    if (scene?.next === '__hub__') return toHub(state);
    if (scene?.next) return enterScene(state, scene.next);
  }
  if (state.awaiting === 'battle_ready') return beginBattle(state);
  return state;
}

export function pickChoice(state, index) {
  const scene = getScene(state.sceneId, state);
  if (!scene?.choices) return state;
  const choice = scene.choices[index];
  if (!choice) return state;
  let next = { ...state, flags: applyFlags(choice.setFlags, state.flags) };
  const said = subst(choice.text, next);
  next.log = trimLog([...next.log, { kind: 'choice', text: '你：' + said }]);
  const to = choice.to;
  if (to === '__hub__') return toHub(next);
  if (to === '__hub_done__') return finishMission(next);
  return enterScene(next, to);
}

function finishMission(state) {
  const n = chapterIndex(state.mission);
  const flags = { ...state.flags };
  if (n >= 1 && n <= 48) flags['ch' + n + '_done'] = 1;
  if (n === 48) flags.tale_done = 1;
  let next = { ...state, flags };
  if (n === 6) next = grantTempleSkills(next);
  const mission = nextOpenMission(next);
  return toHub(next, { day: (next.day || 1) + 1, mission, cultivatedToday: 0 });
}

function toHub(state, extra = {}) {
  return {
    ...state,
    mode: 'hub',
    awaiting: 'hub',
    battle: null,
    settle: null,
    notice: '',
    ...extra,
  };
}

export function goHub(state) {
  return toHub(state);
}

export function openPrep(state) {
  return { ...state, mode: 'prep', notice: '', awaiting: 'prep' };
}

export function openSkills(state) {
  return { ...state, mode: 'skills', notice: '', awaiting: 'skills' };
}

export function openCultivate(state) {
  if (state.cultivatedToday) {
    return { ...state, notice: '今日已修煉過。內息散了再煉，會走岔。' };
  }
  return { ...state, mode: 'cultivate', notice: '', awaiting: 'cultivate' };
}

export function confirmPrep(state, loadout, packedPill) {
  const ids = (loadout || []).filter((id) => state.learned.includes(id)).slice(0, 3);
  if (!ids.length) {
    return { ...state, notice: '至少裝備一門功法。空手出列，先記過。' };
  }
  const pack = Boolean(packedPill) && state.pills > 0;
  return toHub({ ...state, loadout: ids, packedPill: pack }, { notice: pack ? '已備功法與止血散。' : '已備功法。' });
}

export function cultivate(state, kind) {
  if (state.mode !== 'cultivate' && state.mode !== 'hub') return state;
  if (state.cultivatedToday) {
    return toHub(state, { notice: '今日已修煉過。內息散了再煉，會走岔。' });
  }
  let stats = { ...state.stats };
  let notice = '';
  if (kind === 'body') {
    stats.maxHp += 1;
    stats.hp = Math.min(stats.maxHp, stats.hp + 8);
    notice = '你站青衡樁。肩沉下去，氣血多一寸。煉體。';
  } else if (kind === 'breath') {
    stats.maxMp += 1;
    stats.mp = stats.maxMp;
    notice = '你調息。外門土牆那邊有人換氣。息收回來，內力多一寸。';
  } else if (kind === 'form') {
    stats.atk += 1;
    notice = '空地上對自己的影子比劃。拆招。勢比昨天短，也比昨天準。';
  } else {
    return state;
  }
  const gained = applyGainExp(stats, 10);
  stats = gained.stats;
  let learned = state.learned.slice();
  if (!learned.includes('listen')) {
    learned.push('listen');
    notice += ' 牆那邊息長的是巡夜，息短的是怕。領悟：聽壁息。';
  }
  if (gained.levelUp.length) {
    notice += ' 境界進一層：' + gained.levelUp.join('、') + '。氣血內力皆長。';
  }
  return toHub({ ...state, stats, learned, cultivatedToday: 1 }, { notice });
}

export function buyPill(state) {
  if (state.stats.silver < 4) return { ...state, notice: '碎銀不夠。止血散要四文。' };
  if (state.pills >= 3) return { ...state, notice: '袖裡裝不下更多散。' };
  return {
    ...state,
    pills: state.pills + 1,
    stats: { ...state.stats, silver: state.stats.silver - 4 },
    notice: '兌了一包止血散。苦藥，活藥。',
  };
}

function missionNeedsLoadout(mission) {
  const ch = CHAPTERS.find((c) => c.id === mission);
  if (ch) return !ch.skipPrep;
  return true;
}

export function startMission(state) {
  let mission = state.mission;
  if (mission === 'done' || !mission) {
    mission = nextOpenMission(state);
    state = { ...state, mission };
  }
  const n = chapterIndex(mission);
  if (n >= 7) state = grantTempleSkills(state);
  if (missionNeedsLoadout(mission) && !state.loadout.length) {
    return { ...state, notice: '先裝備功法。點名未起，空手出列，先記過。' };
  }
  const sceneId = mission === 'errand' ? 'errand' : mission;
  return enterScene({ ...state, log: [] }, sceneId);
}

export function beginBattle(state) {
  const scene = getScene(state.sceneId, state);
  if (!scene?.battle) return state;
  const b = startBattle(scene.battle.enemyId, scene.battle.onWin, scene.battle.onLose);
  return {
    ...state,
    mode: 'battle',
    awaiting: 'battle',
    battle: b,
    notice: '',
  };
}

export function battleAct(state, action) {
  if (state.mode !== 'battle' || !state.battle || state.battle.result) return state;
  const { stats, battle } = applyBattleAction(state, action);
  let pills = state.pills;
  let packedPill = state.packedPill;
  if (action.type === 'pill' && battle.pillUsed && state.packedPill) {
    pills = Math.max(0, pills - 1);
    packedPill = false;
  }
  let next = { ...state, stats, battle, pills, packedPill };
  if (battle.result) next = finishBattle(next, battle.result);
  return next;
}

function finishBattle(state, result) {
  const battle = state.battle;
  const stats = { ...state.stats };
  const flags = { ...state.flags };
  const log = state.log.slice();
  for (const line of battle.log) {
    log.push({ kind: 'battle', text: line });
  }
  const gain = result === 'win' ? 12 : 4;
  const gained = applyGainExp(stats, gain);
  Object.assign(stats, gained.stats);
  if (result !== 'win') {
    stats.hp = 1;
    flags.demerit = (flags.demerit || 0) + 1;
  }
  const settle = {
    result,
    enemy: battle.name,
    onWin: battle.onWin,
    onLose: battle.onLose,
    exp: gain,
    levelUp: gained.levelUp,
  };
  return {
    ...state,
    stats,
    flags,
    log: trimLog(log),
    mode: 'settle',
    awaiting: 'settle',
    settle,
    battle,
  };
}

export function continueSettle(state) {
  if (state.mode !== 'settle' || !state.settle) return state;
  const to = state.settle.result === 'win' ? state.settle.onWin : state.settle.onLose;
  return enterScene({ ...state, settle: null, battle: null }, to);
}

export function missionLabel(state) {
  if (state.mission === 'errand' || (state.flags && state.flags.tale_done && chapterIndex(state.mission) === 0)) {
    return '外門雜差';
  }
  const ch = CHAPTERS.find((c) => c.id === state.mission);
  if (ch) return '第' + ch.n + '章：' + ch.title;
  return '外門雜差';
}
