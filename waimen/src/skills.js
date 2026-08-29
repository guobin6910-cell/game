/** 外門功法與丹藥 */

export const SKILLS = {
  qingheng: {
    id: 'qingheng',
    name: '青衡樁',
    type: 'guard',
    cost: 2,
    power: 8,
    desc: '外門晨課的站樁。氣沉丹田，這一招少挨。拙，可活。',
  },
  box: {
    id: 'box',
    name: '搬箱勁',
    type: 'damage',
    cost: 4,
    power: 12,
    desc: '雜役搬箱的拙力。肩肘一送，當拳使。箱是別人的，勁是自己的。',
  },
  listen: {
    id: 'listen',
    name: '聽壁息',
    type: 'special',
    cost: 3,
    power: 4,
    desc: '貼牆聽息。看清對方下一招。內力消耗不多，像偷聽門規。',
  },
  sweep: {
    id: 'sweep',
    name: '掃地掃勢',
    type: 'damage',
    cost: 5,
    power: 16,
    desc: '掃帚橫掃的路數。勢寬，挨打的面也寬。外門的地，掃久了會成招。',
  },
};

export const PUNCH = {
  id: 'punch',
  name: '拙拳',
  type: 'damage',
  cost: 0,
  power: 7,
  desc: '不會功法時也會握拳。勢短，不耗內力。外門人人會，人人不夠。',
};

export const START_SKILLS = ['qingheng', 'box'];

export const PILL = {
  id: 'zhixue',
  name: '止血散',
  heal: 18,
  desc: '外門藥房的粗藥。血止了，傷還在。出任務前可備一包。',
};

export const TYPE_LABEL = {
  damage: '攻',
  guard: '守',
  heal: '療',
  special: '奇',
};

export function skillById(id) {
  return SKILLS[id] || null;
}
