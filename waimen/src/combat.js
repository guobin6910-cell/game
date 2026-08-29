import { SKILLS, PILL } from './skills.js';

export const ENEMIES = {
  zhao: {
    id: 'zhao',
    name: '趙師兄',
    hp: 38,
    atk: 8,
    def: 3,
    moves: [
      { id: 'press', name: '壓肩', type: 'damage', power: 10, text: '趙師兄肩一沉，像搬糧的拙力，壓向你鎖骨。' },
      { id: 'fist', name: '試手', type: 'damage', power: 14, text: '他冷笑，拳走中路，專打罰站罰軟的腰。' },
      { id: 'ankle', name: '掃踝', type: 'damage', power: 9, text: '他腳尖鉤你的踝。外庭青石很硬。' },
      { id: 'watch', name: '觀招', type: 'guard', power: 8, text: '趙師兄雙手一圈，像看你還會不會還手。' },
    ],
  },
  patrol: {
    id: 'patrol',
    name: '巡夜外門',
    hp: 34,
    atk: 8,
    def: 5,
    moves: [
      { id: 'lantern', name: '燈罩', type: 'damage', power: 11, text: '巡夜把手裡燈籠連罩砸過來，熱油濺。' },
      { id: 'grab', name: '擒袖', type: 'damage', power: 8, text: '他抓你袖口，要把你拖去值事房。' },
      { id: 'shout', name: '喝禁', type: 'special', power: 0, mpDrain: 3, text: '「夜禁！」他一喝，你內息亂了半寸。' },
      { id: 'lamp', name: '舉燈', type: 'guard', power: 6, text: '他把燈橫在胸前，當盾。' },
    ],
  },
  wang: {
    id: 'wang',
    name: '王五',
    hp: 28,
    atk: 6,
    def: 3,
    moves: [
      { id: 'broom', name: '奪帚', type: 'damage', power: 8, text: '王五奪你掃帚，柄打手背。' },
      { id: 'push', name: '搡肩', type: 'damage', power: 10, text: '他往落葉堆裡搡你，灰進眼睛。' },
      { id: 'spit', name: '啐', type: 'special', power: 0, mpDrain: 2, text: '他啐一口：「冊上有墨的，也配掃這塊？」' },
      { id: 'watch', name: '觀招', type: 'guard', power: 5, text: '王五退半步，看你還手不還。' },
    ],
  },
  inner: {
    id: 'inner',
    name: '內門雜役',
    hp: 36,
    atk: 8,
    def: 5,
    moves: [
      { id: 'shove', name: '搡出', type: 'damage', power: 11, text: '他把你往外庭方向搡。「側門不是給你們站的。」' },
      { id: 'cuff', name: '袖口', type: 'damage', power: 13, text: '袖口抽在你頰上，輕，像記一筆不必入冊的過。' },
      { id: 'ban', name: '禁停', type: 'special', power: 0, mpDrain: 3, text: '「別進門。」他一喝，你內息亂了半寸。' },
      { id: 'watch', name: '觀招', type: 'guard', power: 7, text: '他擋在門環前，像一扇不會開的門。' },
    ],
  },
  qian: {
    id: 'qian',
    name: '錢六',
    hp: 32,
    atk: 7,
    def: 4,
    moves: [
      { id: 'kick', name: '踢筐', type: 'damage', power: 9, text: '錢六踢翻你腳邊的筐，藥包滾進石縫。' },
      { id: 'elbow', name: '肘撞', type: 'damage', power: 12, text: '他肘往你肋下撞，專打搬箱的人。' },
      { id: 'mock', name: '譏', type: 'special', power: 0, mpDrain: 2, text: '「掃過側門就學內門的氣了？」他譏。' },
      { id: 'watch', name: '觀招', type: 'guard', power: 6, text: '錢六雙手一圈，看你還會不會還手。' },
    ],
  },
  jiang: {
    id: 'jiang',
    name: '漿衣的人',
    hp: 30,
    atk: 7,
    def: 3,
    moves: [
      { id: 'pestle', name: '木杵', type: 'damage', power: 10, text: '漿衣的人掄起木杵，鹼水濺上你袖。' },
      { id: 'shove', name: '搡埠', type: 'damage', power: 12, text: '他往河埠濕板上搡你，腳下一滑。' },
      { id: 'spasm', name: '鎮痙', type: 'special', power: 0, mpDrain: 3, text: '鹼氣衝鼻。他喉間一痙，像要把你的內息一起掐斷。' },
      { id: 'watch', name: '觀招', type: 'guard', power: 5, text: '他把杵橫在胸前，鹼布當盾。' },
    ],
  },
  enforcer: {
    id: 'enforcer',
    name: '執法堂弟子',
    hp: 40,
    atk: 9,
    def: 5,
    moves: [
      { id: 'strip', name: '搜袖', type: 'damage', power: 11, text: '他搜你袖口，指節磕腕骨，像核一筆未入冊的過。' },
      { id: 'seal', name: '按肩', type: 'damage', power: 13, text: '執法堂的人按你的肩，要把你按進薄冊。' },
      { id: 'party', name: '喝黨', type: 'special', power: 0, mpDrain: 3, text: '「成串！」他一喝，你內息亂了半寸。' },
      { id: 'watch', name: '觀招', type: 'guard', power: 8, text: '他擋在階前，像一頁不會合的罰冊。' },
    ],
  },
  keeper: {
    id: 'keeper',
    name: '把門的內門',
    hp: 42,
    atk: 9,
    def: 6,
    moves: [
      { id: 'bar', name: '攔門', type: 'damage', power: 12, text: '他把你往檻外攔。「這門不是給外門開的。」' },
      { id: 'cuff', name: '袖封', type: 'damage', power: 14, text: '袖口抽在你喉結下，輕，像要把氣按回去。' },
      { id: 'hush', name: '禁聲', type: 'special', power: 0, mpDrain: 4, text: '「別出聲。出聲，裡頭的氣會斷。」他一喝，你內息亂了。' },
      { id: 'watch', name: '觀招', type: 'guard', power: 9, text: '他擋在虛掩的縫前，像一扇故意不扣的閂。' },
    ],
  },
};


function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function strike(atk, power, def, guard) {
  const raw = atk + power - def - (guard || 0);
  return Math.max(1, Math.round(raw * (0.88 + Math.random() * 0.24)));
}

function moveById(enemy, id) {
  return enemy.moves.find((m) => m.id === id) || enemy.moves[0];
}

export function startBattle(enemyId, onWin, onLose) {
  const e = ENEMIES[enemyId];
  return {
    enemyId,
    name: e.name,
    enemyHp: e.hp,
    enemyMaxHp: e.hp,
    enemyGuard: 0,
    playerGuard: 0,
    sensing: 0,
    intent: pick(e.moves).id,
    log: [e.name + "擋在眼前。"],
    pillUsed: false,
    result: null,
    onWin,
    onLose,
  };
}

export function describeIntent(battle) {
  const e = ENEMIES[battle.enemyId];
  const mv = moveById(e, battle.intent);
  return e.name + "要：" + mv.name;
}

export function applyBattleAction(state, action) {
  const battle = { ...state.battle, log: state.battle.log.slice() };
  const stats = { ...state.stats };
  const enemy = ENEMIES[battle.enemyId];
  if (!enemy || battle.result) return { stats, battle };

  battle.playerGuard = 0;

  if (action.type === "skill") {
    const sk = SKILLS[action.id];
    if (!sk) return { stats, battle };
    if (stats.mp < sk.cost) {
      battle.log.push("內力不夠。");
      return { stats, battle };
    }
    stats.mp -= sk.cost;
    if (sk.type === "damage") {
      const d = strike(stats.atk, sk.power, enemy.def, battle.enemyGuard);
      battle.enemyHp = Math.max(0, battle.enemyHp - d);
      battle.log.push("你使「" + sk.name + "」。" + enemy.name + "挨了 " + d + "。");
    } else if (sk.type === "guard") {
      battle.playerGuard = stats.def + sk.power;
      battle.log.push("你落「" + sk.name + "」。氣沉下去，這一招專為挨。");
    } else if (sk.type === "heal") {
      const before = stats.hp;
      stats.hp = Math.min(stats.maxHp, stats.hp + sk.power);
      battle.log.push("你運「" + sk.name + "」。氣血 " + before + "→" + stats.hp + "。");
    } else if (sk.type === "special") {
      battle.sensing = Math.max(battle.sensing, 2);
      battle.playerGuard = stats.def + sk.power;
      const mv = moveById(enemy, battle.intent);
      battle.log.push("你使「" + sk.name + "」。他身上息一短。他要「" + mv.name + "」。");
    }
  } else if (action.type === "attack") {
    const d = strike(stats.atk, 6, enemy.def, battle.enemyGuard);
    battle.enemyHp = Math.max(0, battle.enemyHp - d);
    battle.log.push("你出拙拳。不講路數，只講挨不挨得住。" + enemy.name + "挨了 " + d + "。");
  } else if (action.type === "guard") {
    battle.playerGuard = stats.def + 4;
    const before = stats.mp;
    stats.mp = Math.min(stats.maxMp, stats.mp + 3);
    battle.log.push("你觀招。不還手，先看他從哪裡來。內息收回一寸（內力 " + before + "→" + stats.mp + "）。");
  } else if (action.type === "pill") {
    if (battle.pillUsed || !state.packedPill) {
      battle.log.push("沒有丹藥。");
      return { stats, battle };
    }
    battle.pillUsed = true;
    const before = stats.hp;
    stats.hp = Math.min(stats.maxHp, stats.hp + PILL.heal);
    battle.log.push("你咬開止血散。苦。氣血 " + before + "→" + stats.hp + "。血止了，傷還在。");
  } else {
    return { stats, battle };
  }

  battle.enemyGuard = 0;

  if (battle.enemyHp <= 0) {
    battle.enemyHp = 0;
    battle.result = "win";
    battle.log.push(enemy.name + "退了。這一場算你。");
    return { stats, battle };
  }

  const mv = moveById(enemy, battle.intent);
  if (mv.type === "damage") {
    const d = strike(enemy.atk, mv.power, stats.def, battle.playerGuard);
    stats.hp = Math.max(0, stats.hp - d);
    battle.log.push(mv.text + "你挨了 " + d + "。");
  } else if (mv.type === "guard") {
    battle.enemyGuard = enemy.def + mv.power;
    battle.log.push(mv.text);
  } else if (mv.type === "special") {
    const drain = mv.mpDrain || 0;
    stats.mp = Math.max(0, stats.mp - drain);
    battle.log.push(mv.text + (drain ? "內力散了 " + drain + "。" : ""));
  }

  if (stats.hp <= 0) {
    stats.hp = 1;
    battle.result = "lose";
    battle.log.push("你跪在青石上。氣血只剩一絲。這一場不算死——外門死了還要填冊，他懶得填。");
    return { stats, battle };
  }

  if (battle.sensing > 0) battle.sensing -= 1;
  battle.intent = pick(enemy.moves).id;
  if (battle.sensing > 0) {
    const next = moveById(enemy, battle.intent);
    battle.log.push("息還在耳裡。他下一招要「" + next.name + "」。");
  }

  return { stats, battle };
}
