/** Visual-novel script interpreter for 《外門》. */

export function matches(conditions, flags) {
  if (!conditions) return true;
  for (const [key, want] of Object.entries(conditions)) {
    const cur = flags[key] ?? 0;
    if (cur !== want) return false;
  }
  return true;
}

export function applyFlags(setFlags, flags) {
  if (!setFlags) return { ...flags };
  const next = { ...flags };
  for (const [key, value] of Object.entries(setFlags)) {
    if (typeof value === 'string' && /^[+-]\d+$/.test(value)) {
      next[key] = (next[key] ?? 0) + Number(value);
    } else {
      next[key] = value;
    }
  }
  return next;
}

export function subst(text, state) {
  if (!text) return '';
  const sib = state.gender === 'female' ? '師妹' : '師兄';
  const he = state.gender === 'female' ? '她' : '他';
  return String(text)
    .replaceAll('{name}', state.playerName || '無名')
    .replaceAll('{sib}', sib)
    .replaceAll('{he}', he);
}

export function resolveGoto(goto, flags) {
  if (!goto) return null;
  if (typeof goto === 'string') return goto;
  if (Array.isArray(goto)) {
    for (const branch of goto) {
      if (!branch.if || matches(branch.if, flags)) return branch.to;
    }
  }
  return null;
}

export function getNode(script, id) {
  if (!id) return null;
  return script.nodes[id] || null;
}

export function visibleChoices(node, flags) {
  if (!node || !node.choices) return [];
  return node.choices.filter((c) => matches(c.conditions, flags));
}

export function parseSprites(sprite) {
  if (!sprite || sprite === 'none') return [];
  if (Array.isArray(sprite)) {
    return sprite.map((item, i) => normalizeSprite(item, i));
  }
  return String(sprite)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item, i) => normalizeSprite(item, i));
}

function normalizeSprite(item, index) {
  if (typeof item === 'object' && item) {
    return {
      id: item.id,
      slot: item.slot || slotByIndex(index),
      far: Boolean(item.far),
    };
  }
  const [id, mod] = String(item).split(':');
  return {
    id,
    slot: slotByIndex(index),
    far: mod === 'far',
  };
}

function slotByIndex(index) {
  if (index === 0) return 'left';
  if (index === 1) return 'right';
  return 'center';
}

export const CAST = {
  ahe: { name: '阿禾', cls: 'ahe' },
  xie: { name: '謝承淵', cls: 'xie' },
  chen: { name: '陳肅', cls: 'chen' },
  wei: { name: '衛正言', cls: 'wei' },
  clerk: { name: '值事', cls: 'clerk' },
  signer: { name: '管簽', cls: 'signer' },
  servant: { name: '內門雜役', cls: 'servant' },
};

export const BACKGROUNDS = {
  青石道: 'bg-stone',
  庫房: 'bg-store',
  庫房外坪: 'bg-yard',
  外庭: 'bg-court',
  值事房外廊: 'bg-veranda',
  外門通舖: 'bg-dorm',
  外門通鋪: 'bg-dorm',
  夜夾道: 'bg-alley',
  內門側廊: 'bg-inner',
};

export const SPEED_MS = {
  slow: 42,
  mid: 22,
  fast: 10,
  instant: 0,
};

export function advance(script, state, choiceIndex) {
  const node = getNode(script, state.nodeId);
  if (!node) return { ...state, error: 'missing-node' };

  let flags = { ...state.flags };
  let nextId = null;

  if (node.type === 'choice') {
    const choices = visibleChoices(node, flags);
    const picked = choices[choiceIndex];
    if (!picked) return state;
    flags = applyFlags(picked.setFlags, flags);
    nextId = resolveGoto(picked.goto, flags);
  } else {
    nextId = resolveGoto(node.goto, flags);
  }

  if (!nextId) {
    return { ...state, flags, ended: true };
  }

  const nextNode = getNode(script, nextId);
  if (!nextNode) {
    return { ...state, flags, nodeId: nextId, error: 'missing-node' };
  }
  flags = applyFlags(nextNode.setFlags, flags);

  return {
    ...state,
    flags,
    nodeId: nextId,
    ended: nextNode.type === 'end',
  };
}

export function enterStart(script, baseState) {
  const startId = script.start;
  const node = getNode(script, startId);
  const flags = applyFlags(node?.setFlags, baseState.flags || {});
  return {
    ...baseState,
    flags,
    nodeId: startId,
    ended: node?.type === 'end',
    error: node ? null : 'missing-node',
  };
}
