import { START_SKILLS, SKILLS } from './skills.js';
import { getScene, subst, applyFlags } from './story.js';
import { startBattle, applyBattleAction } from './combat.js';

export { getScene, subst, SKILLS };

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

export function newGame(gender, name) {
  const state = {
    version: 2,
    gender: gender === 'female' ? 'female' : 'male',
    name: (name && String(name).trim()) || '無名',
    mode: 'story',
    sceneId: 'intro',
    paraIndex: 0,
    log: [],
    flags: {},
    stats: freshStats(),
    learned: START_SKILLS.slice(),
    loadout: START_SKILLS.slice(),
    pills: 1,
    packedPill: false,
    day: 1,
    mission: 'panku',
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
  const flags = data.flags || {};
  let mission = data.mission || 'panku';
  let day = data.day || 1;
  if (mission === 'done') {
    const swept = flags.sweep_done || flags.won_wang || flags.lost_wang || flags.yield_wang;
    if (flags.act1_done || flags.ajar_done) {
      mission = 'errand';
    } else if (flags.sleeve_done) {
      mission = 'ajar';
    } else if (flags.chain_done) {
      mission = 'sleeve';
    } else if (flags.credit_done) {
      mission = 'chain';
    } else if (flags.jian_done) {
      mission = 'credit';
    } else if (flags.shoes_done) {
      mission = 'jian';
    } else if (flags.sidemen_done) {
      mission = 'shoes';
    } else if (swept) {
      mission = 'sidemen';
      if (day < 3) day = 3;
    } else if (day >= 2 || flags.day1_done) {
      mission = 'sweep';
    } else {
      mission = 'panku';
    }
  }
  if (mission === 'errand' && !flags.shoes_done && !flags.act1_done) {
    mission = 'shoes';
  }
  return {
    version: 2,
    gender: data.gender === 'female' ? 'female' : 'male',
    name: data.name || '無名',
    mode: data.mode || 'hub',
    sceneId: data.sceneId || 'intro',
    paraIndex: data.paraIndex || 0,
    log: Array.isArray(data.log) ? data.log : [],
    flags,
    stats: (() => {
      const stats = { ...freshStats(), ...data.stats };
      if (!stats.level) stats.level = levelFromExp(stats.exp || 0).level;
      return stats;
    })(),
    learned: data.learned || START_SKILLS.slice(),
    loadout: data.loadout || START_SKILLS.slice(),
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
  if (effects.silver) stats.silver = Math.max(0, stats.silver + effects.silver);
  if (effects.hp) stats.hp = Math.max(1, Math.min(stats.maxHp, stats.hp + effects.hp));
  if (effects.mp) stats.mp = Math.max(0, Math.min(stats.maxMp, stats.mp + effects.mp));
  if (effects.demerit) flags.demerit = (flags.demerit || 0) + effects.demerit;
  return { ...state, stats, flags };
}

function maybeUnlock(state) {
  let learned = state.learned.slice();
  const flags = { ...state.flags };
  const log = state.log.slice();
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
  if (to === '__hub__') return toHub(next, { day: next.day || 1, mission: next.mission || 'panku' });
  if (to === '__hub_day2__') return toHub(next, { day: 2, mission: 'sweep', cultivatedToday: 0 });
  if (to === '__hub_sidemen__') return toHub(next, { day: Math.max(3, (next.day || 1) + 1), mission: 'sidemen', cultivatedToday: 0 });
  if (to === '__hub_shoes__') return toHub(next, { day: (next.day || 1) + 1, mission: 'shoes', cultivatedToday: 0 });
  if (to === '__hub_jian__') return toHub(next, { day: (next.day || 1) + 1, mission: 'jian', cultivatedToday: 0 });
  if (to === '__hub_credit__') return toHub(next, { day: (next.day || 1) + 1, mission: 'credit', cultivatedToday: 0 });
  if (to === '__hub_chain__') return toHub(next, { day: (next.day || 1) + 1, mission: 'chain', cultivatedToday: 0 });
  if (to === '__hub_sleeve__') return toHub(next, { day: (next.day || 1) + 1, mission: 'sleeve', cultivatedToday: 0 });
  if (to === '__hub_ajar__') return toHub(next, { day: (next.day || 1) + 1, mission: 'ajar', cultivatedToday: 0 });
  if (to === '__hub_errand__') return toHub(next, { day: (next.day || 1) + 1, mission: 'errand', cultivatedToday: 0 });
  if (to === '__hub_done__') return toHub(next, { day: (next.day || 1) + 1, mission: nextOpenMission(next), cultivatedToday: 0 });
  return enterScene(next, to);
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
    return { ...state, notice: '至少裝備一門功法。盤庫不是掃地，空手要記過。' };
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

function nextOpenMission(state) {
  const f = state.flags || {};
  if (!f.day1_done) return 'panku';
  if (!f.sweep_done && !f.won_wang && !f.lost_wang && !f.yield_wang) return 'sweep';
  if (!f.sidemen_done) return 'sidemen';
  if (!f.shoes_done) return 'shoes';
  if (!f.jian_done) return 'jian';
  if (!f.credit_done) return 'credit';
  if (!f.chain_done) return 'chain';
  if (!f.sleeve_done) return 'sleeve';
  if (!f.ajar_done) return 'ajar';
  return 'errand';
}

const MISSION_SCENE = {
  panku: 'panku',
  sweep: 'sweep',
  sidemen: 'sidemen',
  shoes: 'shoes',
  jian: 'jian',
  credit: 'credit',
  chain: 'chain',
  sleeve: 'sleeve',
  ajar: 'ajar',
  errand: 'errand',
};

export function startMission(state) {
  let mission = state.mission;
  if (mission === 'done' || !mission) {
    mission = nextOpenMission(state);
    state = { ...state, mission };
  }
  if (!state.loadout.length) {
    return { ...state, notice: '先裝備功法。點名未起，空手出列，先記過。' };
  }
  const sceneId = MISSION_SCENE[mission];
  if (sceneId) return enterScene(state, sceneId);
  const fallback = nextOpenMission(state);
  return enterScene({ ...state, mission: fallback }, MISSION_SCENE[fallback] || 'errand');
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
  if (result === 'win') {
    flags.fame = (flags.fame || 0) + 0;
  } else {
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
  if (state.mission === 'panku') return '盤庫';
  if (state.mission === 'sweep') return '掃外庭';
  if (state.mission === 'sidemen') return '掃側門銀杏';
  if (state.mission === 'shoes') return '井邊差事';
  if (state.mission === 'jian') return '秋薦文書';
  if (state.mission === 'credit') return '下山記功';
  if (state.mission === 'chain') return '成串';
  if (state.mission === 'sleeve') return '袖中那頁';
  if (state.mission === 'ajar') return '虛掩';
  if (state.mission === 'errand') return '外門雜差';
  return '外門雜差';
}
