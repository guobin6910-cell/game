const AUTO = 'waimen_rpg_auto';
const SETTINGS = 'waimen_rpg_settings';

function nowIso() {
  return new Date().toISOString();
}

export function defaultSettings() {
  return { textSpeed: 'mid' };
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS);
    if (!raw) return defaultSettings();
    return { ...defaultSettings(), ...JSON.parse(raw) };
  } catch {
    return defaultSettings();
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS, JSON.stringify(settings));
}

export function snapshot(state) {
  return {
    version: 3,
    savedAt: nowIso(),
    gender: state.gender,
    name: state.name,
    mode: state.mode,
    sceneId: state.sceneId,
    paraIndex: state.paraIndex,
    log: state.log,
    flags: state.flags,
    stats: state.stats,
    learned: state.learned,
    loadout: state.loadout,
    pills: state.pills,
    packedPill: state.packedPill,
    day: state.day,
    mission: state.mission,
    battle: state.battle,
    settle: state.settle,
    cultivatedToday: state.cultivatedToday,
  };
}

export function writeAuto(state) {
  if (!state || state.mode === 'title' || state.mode === 'create') return;
  localStorage.setItem(AUTO, JSON.stringify(snapshot(state)));
}

export function readAuto() {
  try {
    const raw = localStorage.getItem(AUTO);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data) return null;
    return data;
  } catch {
    return null;
  }
}

export function hasContinue() {
  const d = readAuto();
  return Boolean(d && d.stats);
}

export function formatSavedAt(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const parts = new Intl.DateTimeFormat('zh-Hant-TW', {
    timeZone: 'Asia/Taipei',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(d);
  const get = (t) => parts.find((p) => p.type === t)?.value || '';
  return `${get('month')}/${get('day')} ${get('hour')}:${get('minute')}`;
}
