const PREFIX = 'waimen';
const AUTO = `${PREFIX}_auto`;
const SETTINGS = `${PREFIX}_settings`;
const slotKey = (n) => `${PREFIX}_slot_${n}`;

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

export function snapshot(state, extra = {}) {
  return {
    version: 1,
    savedAt: nowIso(),
    nodeId: state.nodeId,
    flags: state.flags || {},
    playerName: state.playerName || '無名',
    gender: state.gender || 'male',
    chapter: extra.chapter || '第一章：盤庫',
    scene: extra.scene || '',
  };
}

export function writeAuto(state, extra) {
  localStorage.setItem(AUTO, JSON.stringify(snapshot(state, extra)));
}

export function readAuto() {
  return read(AUTO);
}

export function writeSlot(n, state, extra) {
  localStorage.setItem(slotKey(n), JSON.stringify(snapshot(state, extra)));
}

export function readSlot(n) {
  return read(slotKey(n));
}

export function listSlots() {
  return {
    auto: readAuto(),
    1: readSlot(1),
    2: readSlot(2),
    3: readSlot(3),
  };
}

export function hasContinue() {
  return Boolean(readAuto());
}

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.version !== 1 || !data.nodeId) return null;
    return data;
  } catch {
    return null;
  }
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
