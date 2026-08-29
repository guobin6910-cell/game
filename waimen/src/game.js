import { START_SKILLS, SKILLS } from './skills.js';
import { getScene, subst, applyFlags } from './story.js';
import { startBattle, applyBattleAction } from './combat.js';

export { getScene, subst, SKILLS };

export function freshStats() {
  return { hp: 40, maxHp: 40, mp: 18, maxMp: 18, atk: 8, def: 4, exp: 0, silver: 12 };
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
    if (flags.sidemen_done) {
      mission = 'errand';
    } else if (swept) {
      mission = 'sidemen';
      if (day < 3) day = 3;
    } else if (day >= 2 || flags.day1_done) {
      mission = 'sweep';
    } else {
      mission = 'panku';
    }
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
    stats: { ...freshStats(), ...data.stats },
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
  if (to === '__hub_errand__') return toHub(next, { day: (next.day || 1) + 1, mission: 'errand', cultivatedToday: 0 });
  if (to === '__hub_done__') return toHub(next, { day: (next.day || 1) + 1, mission: nextOpenMission(next), cultivatedToday: 0 });
  return enterScene(next, to);
}

function toHub(state, extra = {}) {
  return {
    ...state,
    ...extra,
    mode: 'hub',
    awaiting: 'hub',
    battle: null,
    settle: null,
    notice: '',
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

export function confirmPrep(state, loadout, packedPill) {
  const ids = (loadout || []).filter((id) => state.learned.includes(id)).slice(0, 3);
  if (!ids.length) {
    return { ...state, notice: '至少裝備一門功法。盤庫不是掃地，空手要記過。' };
  }
  const pack = Boolean(packedPill) && state.pills > 0;
  return toHub({ ...state, loadout: ids, packedPill: pack, notice: pack ? '已備功法與止血散。' : '已備功法。' });
}

export function cultivate(state) {
  if (state.mode !== 'hub') return state;
  if (state.cultivatedToday) {
    return { ...state, notice: '今日已修煉過。內息散了再煉，會走岔。' };
  }
  const stats = {
    ...state.stats,
    hp: state.stats.maxHp,
    mp: state.stats.maxMp,
    exp: state.stats.exp + 6,
  };
  let learned = state.learned.slice();
  let notice = '氣血內力已復。外門煉體，一日一煉。';
  if (!learned.includes('listen')) {
    learned.push('listen');
    notice = '你把耳朵貼在外門土牆上。牆那邊有人換氣。息長的，是巡夜；息短的，是怕。這不是功法冊上的東西，是雜役活下來的耳朵。領悟：聽壁息。';
  }
  return { ...state, stats, learned, cultivatedToday: 1, notice };
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
  if (state.mission === 'panku' || !f.day1_done) return 'sweep';
  if (state.mission === 'sweep' || !f.sweep_done) return 'sidemen';
  return 'errand';
}

export function startMission(state) {
  let mission = state.mission;
  if (mission === 'done' || !mission) {
    mission = nextOpenMission(state);
    state = { ...state, mission };
  }
  if (!state.loadout.length) {
    return { ...state, notice: '先裝備功法。點名未起，空手出列，先記過。' };
  }
  if (mission === 'panku') return enterScene(state, 'panku');
  if (mission === 'sweep') return enterScene(state, 'sweep');
  if (mission === 'sidemen') return enterScene(state, 'sidemen');
  if (mission === 'errand') return enterScene(state, 'errand');
  return enterScene({ ...state, mission: 'errand' }, 'errand');
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
  if (result === 'win') {
    stats.exp += 12;
    flags.fame = (flags.fame || 0) + 0;
  } else {
    stats.exp += 4;
    stats.hp = 1;
    flags.demerit = (flags.demerit || 0) + 1;
  }
  const settle = {
    result,
    enemy: battle.name,
    onWin: battle.onWin,
    onLose: battle.onLose,
    exp: result === 'win' ? 12 : 4,
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
  if (state.mission === 'errand') return '外門雜差';
  return '外門雜差';
}
