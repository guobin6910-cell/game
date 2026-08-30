export function subst(text, state) {
  if (!text) return '';
  const sib = state.gender === 'female' ? '師妹' : '師兄';
  const he = state.gender === 'female' ? '她' : '他';
  return String(text)
    .replaceAll('{name}', state.name || '無名')
    .replaceAll('{sib}', sib)
    .replaceAll('{he}', he);
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

export function getScene(id, state) {
  const fn = SCENES[id];
  if (!fn) return null;
  return fn(state);
}

export const CHAPTERS = [
  { n: 1, id: 'c1', title: '燈節家宴', skipPrep: true },
  { n: 2, id: 'c2', title: '夜襲滅門', skipPrep: true },
  { n: 3, id: 'c3', title: '潛力爆發', skipPrep: true },
  { n: 4, id: 'c4', title: '火中昏厥', skipPrep: true },
  { n: 5, id: 'c5', title: '雨中被救', skipPrep: true },
  { n: 6, id: 'c6', title: '青衡觀山門', skipPrep: true },
  { n: 7, id: 'c7', title: '雜役晨課', skipPrep: false },
  { n: 8, id: 'c8', title: '站樁切磋', skipPrep: false },
  { n: 9, id: 'c9', title: '小滿草鞋', skipPrep: false },
  { n: 10, id: 'c10', title: '觀規點名', skipPrep: false },
  { n: 11, id: 'c11', title: '夢回滅門', skipPrep: false },
  { n: 12, id: 'c12', title: '下山雜差', skipPrep: false },
  { n: 13, id: 'c13', title: '功法冊', skipPrep: false },
  { n: 14, id: 'c14', title: '藥圃', skipPrep: false },
  { n: 15, id: 'c15', title: '試劍坪', skipPrep: false },
  { n: 16, id: 'c16', title: '外門小比', skipPrep: false },
  { n: 17, id: 'c17', title: '攬功', skipPrep: false },
  { n: 18, id: 'c18', title: '側門銀杏', skipPrep: false },
  { n: 19, id: 'c19', title: '後山禁林', skipPrep: false },
  { n: 20, id: 'c20', title: '關內', skipPrep: false },
  { n: 21, id: 'c21', title: '記功', skipPrep: false },
  { n: 22, id: 'c22', title: '秋薦風聲', skipPrep: false },
  { n: 23, id: 'c23', title: '外門亦是門', skipPrep: false },
  { n: 24, id: 'c24', title: '山門虛掩', skipPrep: false },
  { n: 25, id: 'c25', title: '舊物', skipPrep: false },
  { n: 26, id: 'c26', title: '名冊除名', skipPrep: false },
  { n: 27, id: 'c27', title: '阿禾', skipPrep: false },
  { n: 28, id: 'c28', title: '盤庫缺箱', skipPrep: false },
  { n: 29, id: 'c29', title: '夜探庫房', skipPrep: false },
  { n: 30, id: 'c30', title: '袖中那頁', skipPrep: false },
  { n: 31, id: 'c31', title: '小滿秋薦', skipPrep: false },
  { n: 32, id: 'c32', title: '成串', skipPrep: false },
  { n: 33, id: 'c33', title: '舊姓', skipPrep: false },
  { n: 34, id: 'c34', title: '清繳', skipPrep: false },
  { n: 35, id: 'c35', title: '三方逼近', skipPrep: false },
  { n: 36, id: 'c36', title: '薦冊', skipPrep: false },
  { n: 37, id: 'c37', title: '內門虛掩', skipPrep: false },
  { n: 38, id: 'c38', title: '不像拳腳', skipPrep: false },
  { n: 39, id: 'c39', title: '青袍', skipPrep: false },
  { n: 40, id: 'c40', title: '知情', skipPrep: false },
  { n: 41, id: 'c41', title: '不可逆', skipPrep: false },
  { n: 42, id: 'c42', title: '仙路試煉', skipPrep: false },
  { n: 43, id: 'c43', title: '被點', skipPrep: false },
  { n: 44, id: 'c44', title: '仇恩', skipPrep: false },
  { n: 45, id: 'c45', title: '冊裡舊名', skipPrep: false },
  { n: 46, id: 'c46', title: '終局前夜', skipPrep: false },
  { n: 47, id: 'c47', title: '分叉', skipPrep: false },
  { n: 48, id: 'c48', title: '尾聲', skipPrep: false },
];

export function endingTrack(flags) {
  const f = flags || {};
  if (f.path_reveal) return 'reveal';
  if (f.path_climb) return 'climb';
  if (f.path_flee) return 'flee';
  const r = f.reveal_lean || 0;
  const c = f.climb_lean || 0;
  const e = f.flee_lean || 0;
  if (r >= c && r >= e) return 'reveal';
  if (c >= e) return 'climb';
  return 'flee';
}

export function hubLoc(state) {
  const f = state.flags || {};
  if (!f.ch6_done) return '舊宅之外';
  if (!f.ch28_done) return '青衡觀 · 外門';
  return '青衡宗 · 外門';
}

export function hubProse(state) {
  const f = state.flags || {};
  if (!f.ch7_done) {
    if (!f.ch6_done) {
      return '燈還亮著的日子很短。你尚未知道青衡觀的饅頭是什麼味道。有些差事不像差事，像命。這幾章可以不備功法。';
    }
    return '山門裡有香。有人把饅頭塞到你手裏。外門兩個字，這會兒還像家。';
  }
  if (f.ch28_done) {
    return '雜役院。通鋪潮，土階乾。門規把日子一寸寸削下去，削得合法。黃耆的空架還在。名冊上的空格也在。';
  }
  return '外門晨課。饅頭還有餘溫。銀杏葉金黃，有人把掃帚當槍使。內門的鐘還遠，遠得像別人的事。';
}

const SCENES = {};

SCENES.c1 = () => ({
  loc: '舊宅·燈節',
  paras: [
    '燈節。門上貼著舊姓，燈籠把廳柱照成橘色。娘在後院煮湯圓，鍋沿一圈白沫。爹在正廳擦一把不常用的刀，刀背反光，像笑。',
    '幼弟把糖人舉過頭頂，糖油滴在你袖上。外頭有人放炮，近得像從牆根炸。爹把刀收回鞘，說：「今夜別出後門。」娘在院裡喊你的名字，喊得像喊一碗湯。',
    '你還小。家還在。你不知道火會從哪扇門進來。你只知道今夜有三條路可走。',
  ],
  choices: [
    { text: '跟娘去後院', setFlags: { c1: 'mom', flee_lean: '+1', mom_follow: 1 }, to: 'c1_out' },
    { text: '跟爹看那把刀', setFlags: { c1: 'dad', reveal_lean: '+1', dad_knife: 1 }, to: 'c1_out' },
    { text: '偷跑出後門', setFlags: { c1: 'sneak', climb_lean: '+1', sneak_out: 1 }, to: 'c1_out' },
  ],
});
SCENES.c1_out = (state) => {
  const k = state.flags.c1;
  const paras = k === 'mom'
    ? ['後院蒸汽把娘的鬢角打濕。她塞你一顆還沒包嚴的湯圓，「燙。吹一吹。」糯米黏在牙上，甜。', '牆外炮仗再響。娘皺眉，卻仍笑。「有娘在。吃完再怕。」你把甜咽下去。這一晚的甜，後來很短。']
    : k === 'dad'
      ? ['刀不是新的。鞘裡有一點陳年的油。爹說：「這不是給你玩的。記住鞘上的雲紋——以後看見，別認。」', '你問為什麼。爹不答。只把你的手指從刃上撥開。「燈節。先做人。」刀收回去。雲紋在暗裡像一筆沒寫完的姓。']
      : ['後門虛掩。你鑽出去。巷裡燈比家裡密，有人賣糖，有人醉。你走了十步，又退回來——不是怕，是冷。', '門軸響時爹已經站在那兒。他沒罵。只把你領回去，掌心燙。「記住路。記住，不是今晚。」'];
  return { loc: '舊宅·燈節', paras, next: '__hub_done__' };
};

SCENES.c2 = () => ({
  loc: '舊宅·夜襲滅門',
  paras: [
    '炮仗停了。換成靴。蒙面人進院的時候，湯圓鍋還滾著。火先從廂房起，紙窗一亮，像燈節沒散。',
    '娘把你按進櫃。幼弟在廳裡哭。爹的刀出鞘，很短。有人喊舊姓，喊得像點名。',
    '你聽見桌翻。你還能做一件事。一件。',
  ],
  choices: [
    { text: '躲進櫃', setFlags: { c2: 'hide', flee_lean: '+1', hide_cabinet: 1 }, to: 'c2_out' },
    { text: '衝出去救幼弟', setFlags: { c2: 'bro', reveal_lean: '+1', save_bro: 1 }, to: 'c2_out' },
    { text: '跟著火衝出院門', setFlags: { c2: 'rush', climb_lean: '+1', rush_out: 1 }, to: 'c2_out' },
  ],
});
SCENES.c2_out = (state) => {
  const k = state.flags.c2;
  const paras = k === 'hide'
    ? ['櫃裡是娘的衣。香。你數息。數到第七息，幼弟的哭斷了。不是睡著。', '有人停在櫃外。布面的呼吸。他沒開櫃。像數過這家該留一顆種子。火從門縫進來，燙你的膝。']
    : k === 'bro'
      ? ['你撞開櫃。幼弟在桌下。你抓住他的腕，糖人還黏在他掌心。火舌舔過門檻。', '有人把你肩上一扯。幼弟的手滑脫。你只帶走半截糖人。甜，和血，分不清。']
      : ['你跑。火把你的影子投在牆上，像一個大人。院門開了一半，外面是雨還沒下的天。', '有人從背後叫舊姓。你沒回頭。腳下是娘的湯圓，踩破了，白。'];
  return { loc: '舊宅·夜襲滅門', paras, effects: { hp: -6 }, next: '__hub_done__' };
};

SCENES.c3 = () => ({
  loc: '舊宅·火中',
  paras: [
    '蒙面人抓住你的領。刀還沒落下。你肚子裡有一股熱，不像怕，像有人用指節在你脈上「點」過——你當時不知道這個字。',
    '熱衝上四肢。櫃裂。火讓路。你聽見自己的聲音，不像孩子。你要把這股熱用在哪。',
  ],
  choices: [
    { text: '護還活著的人', setFlags: { c3: 'people', reveal_lean: '+1' }, to: 'c3_go' },
    { text: '護家譜', setFlags: { c3: 'book', climb_lean: '+1' }, to: 'c3_go' },
    { text: '發狂', setFlags: { c3: 'rage', flee_lean: '+1' }, to: 'c3_go' },
  ],
});
SCENES.c3_go = (state) => {
  const k = state.flags.c3;
  const line = k === 'people' ? '你擋在人前面。刀光來了。' : k === 'book' ? '你撲向案上那本燙著的譜。刀光來了。' : '你什麼都不護。只出手。刀光來了。';
  return {
    loc: '舊宅·火中',
    paras: [line, '蒙面人比你高一個頭。布後只有一隻眼。這一場不是比武。是活。'],
    battle: { enemyId: 'masked', onWin: 'c3_win', onLose: 'c3_lose' },
  };
};
SCENES.c3_win = (state) => {
  const extra = state.flags.c3 === 'people' ? '你身後的人還喘。喘就夠了。' : state.flags.c3 === 'book' ? '家譜邊燒黑了一角。姓還在。' : '你停不下來，直到火把你的拳頭燙醒。';
  return {
    loc: '舊宅·火中',
    paras: ['蒙面人退了。不是敗，是像看見不該在孩子身上的勢。他低聲對身後說了一句你沒聽清的話。', extra, '熱退了。你跪在青磚上。天開始下雨。'],
    setFlags: { burst_win: 1 },
    next: '__hub_done__',
  };
};
SCENES.c3_lose = () => ({
  loc: '舊宅·火中',
  paras: ['刀沒砍斷你。像故意。蒙面人在你眉心一指，熱被按回去，疼。', '你倒下。火在雨裡嘶。有人把你從磚上拖走，拖得很穩，像搬一件還能用的東西。'],
  setFlags: { burst_lose: 1 },
  next: '__hub_done__',
});

SCENES.c4 = () => ({
  loc: '舊宅·火中昏厥',
  paras: [
    '昏過去前只剩殘影。三樣。你只能抓住一樣。蒙面人的布。一角青袍，袍角沒有灰。還有一張臉——像自家的人，被火照得不像人。',
    '雨打在你眼皮上。你選你看見的。',
  ],
  choices: [
    { text: '記住蒙面', setFlags: { c4: 'mask', reveal_lean: '+1', saw_mask: 1 }, to: 'c4_out' },
    { text: '記住青袍', setFlags: { c4: 'robe', climb_lean: '+1', saw_robe: 1 }, to: 'c4_out' },
    { text: '記住自己人', setFlags: { c4: 'kin', flee_lean: '+1', saw_kin: 1 }, to: 'c4_out' },
  ],
});
SCENES.c4_out = (state) => {
  const k = state.flags.c4;
  const line = k === 'mask' ? '布後那隻眼後來會在夢裡眨眼。你把它當仇。' : k === 'robe' ? '青袍無灰。不像來殺人的。像來裁。裁什麼，你當時不會說。' : '那張臉讓你往後怕熟人。怕比蒙面更難。';
  return { loc: '舊宅·火中昏厥', paras: [line, '世界黑下去。刀、湯圓、舊姓，都摺進黑暗裡。你沒死。死了就不必記。'], next: '__hub_done__' };
};

SCENES.c5 = () => ({
  loc: '山道·雨中',
  paras: [
    '雨。泥。有人把你從溝裡撈起。道袍濕了，仍暖。他沒問你疼不疼，先把熱湯抵到你唇邊。「喝。」聲音不疾。你後來才知這是青衡的人。當時他只是雨裡一個人。',
    '他問：「你叫什麼。」家沒了。名還在不在，是你的。',
  ],
  choices: [
    { text: '報家名', setFlags: { c5: 'name', climb_lean: '+1', gave_name: 1 }, to: 'c5_out' },
    { text: '不說', setFlags: { c5: 'hush', reveal_lean: '+1', hid_name: 1 }, to: 'c5_out' },
    { text: '裝忘', setFlags: { c5: 'forget', flee_lean: '+1', fake_forget: 1 }, to: 'c5_out' },
  ],
});
SCENES.c5_out = (state) => {
  const k = state.flags.c5;
  const paras = k === 'name'
    ? ['你把舊姓說出來。他點頭，像把兩個字收進袖裡，不是寫，是藏。「記住就好。觀裡不必常說。」', '湯是苦的。苦完有甜。他背你走。山道的石階一級級把火遠掉。']
    : k === 'hush'
      ? ['你搖頭。他也不逼。「不說也活。說了，有人會來對冊。」他像隨口。你記住「對冊」。', '湯是苦的。他背你走。雨停的時候，遠遠有一扇山門。']
      : ['你說忘了。他看你一眼，很淺。「忘也是一種活法。」他把一件乾的短打披上你肩。', '你沒忘。你只是把忘當成盾。山門在雨幕後，像溫的。'];
  return { loc: '山道·雨中', paras, effects: { hp: 10 }, next: '__hub_done__' };
};

SCENES.c6 = () => ({
  loc: '青衡觀山門',
  paras: [
    '青衡觀。不是你聽過的那種殺氣。山門漆著淡青，香從裡頭溢出來，混著饅頭的麥味。有人掃地，掃得慢，像掃給神仙看。',
    '值事的道人笑著接你，說「外門有通鋪，先睡，再學站樁。」仇還在胸口，觀卻暖。暖得你差點信。山門檻一寸高。跨不跨，怎麼跨，是你的。',
  ],
  choices: [
    { text: '拜觀', setFlags: { c6: 'bow', climb_lean: '+1' }, to: 'c6_out' },
    { text: '先問仇', setFlags: { c6: 'hate', reveal_lean: '+1' }, to: 'c6_out' },
    { text: '沉默跨入', setFlags: { c6: 'silent', flee_lean: '+1' }, to: 'c6_out' },
  ],
});
SCENES.c6_out = (state) => {
  const k = state.flags.c6;
  const line = k === 'bow' ? '你跪了。額抵青石。值事扶你，「外門不講這個。起來吃飯。」可他記下了你跪。' : k === 'hate' ? '「誰殺我家。」你問。值事仍笑：「觀裡先養人。仇，門規不收。」他沒否認有仇。' : '你不拜不問。跨過檻。香灌進鼻。有人在裡頭喊「新來的有饅頭」。';
  return { loc: '青衡觀山門', paras: [line, '從此你有一個新的住處。匾上寫青衡觀。觀字溫。你還不知道它後來會被叫成宗。'], next: '__hub_done__' };
};

SCENES.c7 = () => ({
  loc: '外門通鋪',
  paras: [
    '寅時鼓響。通鋪裡有人把你被子掀了一角。阿禾的臉倒掛在床沿，缺了一點睡，多了一點笑。',
    '「新來的，起來。饅頭還熱。熱過這一陣，就輪到趙師兄喊站樁。」他把半個饅頭塞到你手裏，自己咬另一半，含糊地說，「青衡觀外門第一課：先吃飽，再挨訓。」',
    '窗外銀杏在亮。有人在院裡把掃帚當槍使，笑成一團。內門的鐘還遠。阿禾踢了踢你的床板。「先活著。活著比較要緊。」',
  ],
  setFlags: { met_ahe: 1 },
  choices: [
    { text: '把饅頭吃完（再去站樁）', setFlags: { c7: 'eat', breakfast: 1, he_bond: 1, climb_lean: '+1' }, to: 'c7_out' },
    { text: '拉阿禾去晨課', setFlags: { c7: 'drill', keen: 1, he_bond: 1, reveal_lean: '+1' }, to: 'c7_out' },
    { text: '再躺一刻', setFlags: { c7: 'lie', lazy: 1, flee_lean: '+1' }, to: 'c7_out' },
  ],
});
SCENES.c7_out = (state) => {
  const k = state.flags.c7;
  if (k === 'eat') {
    return { loc: '外門灶前·阿禾', paras: ['饅頭是麥麩的，甜在焦邊。阿禾又給你撕了塊鹹菜，「別跟內門比。內門吃白麵，我們吃得香。」', '灶口有人起鬨。阿禾替你擋：「人家饅頭還沒嚥下去。」他朝你眨眼，「站樁別笑。笑了，趙師兄以為你在笑他。」外門這會兒，像真能把人養熟。'], effects: { hp: 4 }, next: '__hub_done__' };
  }
  if (k === 'drill') {
    return { loc: '外庭·阿禾', paras: ['你拉他去外庭。阿禾哎了一聲，饅頭還在腮幫。話是抱怨，腳已經跟上。', '青衡樁並不玄。肩沉、膝微屈。有人站歪了，被掃帚柄輕輕敲正，一院子都笑。阿禾低聲：「氣沉下去，趙師兄就少罵一句。少罵一句就夠了。」'], effects: { mp: 3 }, next: '__hub_done__' };
  }
  return { loc: '外門通鋪·阿禾', paras: ['你把被角搶回去。阿禾蹲在床邊，把饅頭放在你枕邊。「行。懶也是功夫。別噎著。」', '通鋪那頭有人唱歌，走調，被拍枕頭。你再起來時，饅頭還溫，阿禾在院裡喊你的名字，喊得理直氣壯。外門的早晨不等人，可它也不趕著把人嚇死。'], effects: { hp: 6 }, next: '__hub_done__' };
};

SCENES.c8 = () => ({
  loc: '外庭',
  paras: [
    '趙師兄在外庭喊站樁。兩年了還在煉體，臉曬得黑，專揀新來的「試手」。不是虐。是外門的見面禮。',
    '「陳執法還沒來點你，我先點。」他擋在夾道最窄的地方，袖口沾著掃階的灰，「當差的勁，我看看夠不夠掃地。」列裡的人繞開。沒人勸。勸，也是黨。',
  ],
  choices: [
    { text: '認真對', setFlags: { c8: 'hard', reveal_lean: '+1' }, to: 'c8_go' },
    { text: '留力', setFlags: { c8: 'hold', climb_lean: '+1' }, to: 'c8_go' },
    { text: '先觀再打', setFlags: { c8: 'watch', flee_lean: '+1' }, to: 'c8_go' },
  ],
});
SCENES.c8_go = () => ({
  loc: '外庭',
  paras: ['趙師兄已經抬手。試手，不是虐。你若有功法在腰，這會兒用得上；沒有，就拙拳。'],
  battle: { enemyId: 'zhao', onWin: 'c8_win', onLose: 'c8_lose' },
});
SCENES.c8_win = (state) => {
  const extra = state.flags.c8 === 'hold' ? '你沒打滿。他卻當你打滿了。外門的眼，只看誰退。' : state.flags.c8 === 'watch' ? '你先看清他掃踝，再還。阿禾在廊柱後吹了一聲口哨。' : '你那一下不是拳。是掃地時手腕一翻的路數。';
  return { loc: '外庭', paras: ['趙師兄退了半步，嘴角裂開。他沒倒。外門的人很少倒給同門看——倒了要填冊。', extra, '「雜役也有爪子。」他啐了口血沫，讓開夾道。名聲不入冊，入嘴。'], setFlags: { won_zhao: 1, fame: '+1', unlock_sweep: 1 }, next: '__hub_done__' };
};
SCENES.c8_lose = (state) => {
  const help = state.flags.he_bond ? '阿禾從廊柱後出來，把你從青石上拽起來。「別躺著。躺著的，當逃。」他沒問你疼不疼。外門不問這個。' : '沒有人拉你。你自己撐起來。膝上的灰，像罰站沒罰完。';
  return { loc: '外庭', paras: ['趙師兄在你肩上拍了拍，像拍一袋米。「記住。先低頭。」他走了。', help], setFlags: { lost_zhao: 1 }, next: '__hub_done__' };
};

SCENES.c9 = () => ({
  loc: '井邊·小滿',
  paras: [
    '灶房的小滿蹲在井邊洗筐。他新了一雙草鞋，新得很假，繩還白。外門的鞋不該這麼白。',
    '阿禾經過時看了一眼，沒停。像看過這種白。劉三從前也白過一陣——你後來才把這兩個白疊在一起。這會兒你只看見一個孩子，一雙鞋。',
  ],
  setFlags: { met_xiaoman: 1 },
  choices: [
    { text: '提醒小滿', setFlags: { c9: 'warn', xiao_alert: 1, reveal_lean: '+1' }, to: 'c9_out' },
    { text: '裝沒看見', setFlags: { c9: 'blind', ignore_shoes: 1, flee_lean: '+1' }, to: 'c9_out' },
    { text: '告訴值事', setFlags: { c9: 'report', xiao_case: 1, climb_lean: '+1' }, to: 'c9_out' },
  ],
});
SCENES.c9_out = (state) => {
  const k = state.flags.c9;
  const paras = k === 'warn'
    ? ['你蹲下去，只說：「鞋太新。」小滿眨眼，把腳往筐後藏。「灶房發的。」他撒謊的樣子很笨。', '「別穿去點名。」你說。他嗯了一聲。鞋仍新。提醒過，就不算沒看見。']
    : k === 'blind'
      ? ['你打水，沒看他的腳。小滿卻把筐洗得更響，像求你看，又求你別看。', '阿禾後來問你看見沒。你說沒有。他「哦」了一聲，把沒有兩個字還給你。']
      : ['值事聽完，記在袖冊邊上，不是正冊。「小滿，灶房。鞋。」他打了個哈欠，「我問問是誰發的。」', '問，就是把孩子寫進別人的眼裡。小滿午後洗筐，沒再穿那雙。赤腳。石冷。'];
  return { loc: '井邊·小滿', paras, next: '__hub_done__' };
};

SCENES.c10 = () => ({
  loc: '值事房·陳肅',
  paras: [
    '陳肅第一次來外門點名。不是執法堂的殺氣，是觀規。他打開薄冊，硃筆未點，聲音不疾不徐：「應到者出列。」',
    '他叫的是職，偶爾是名。叫到你時，筆尖在紙上停了一息。像對過什麼。又像沒有。阿禾在你身側。冊在案上。',
  ],
  setFlags: { met_chen: 1 },
  choices: [
    { text: '應得很響', setFlags: { c10: 'loud', climb_lean: '+1' }, to: 'c10_out' },
    { text: '跟阿禾對眼', setFlags: { c10: 'eye', he_bond: 1, reveal_lean: '+1' }, to: 'c10_out' },
    { text: '偷看冊', setFlags: { c10: 'peek', unlock_slip: 1, reveal_lean: '+1' }, to: 'c10_out' },
  ],
});
SCENES.c10_out = (state) => {
  const k = state.flags.c10;
  const paras = k === 'loud'
    ? ['你應得很響。列裡有人笑。陳肅「嗯」了一聲，筆落下，像給聽話的人蓋印。', '「外門亦要應。應，才在。」他淡淡的。在，是獎。也是被看見。']
    : k === 'eye'
      ? ['你沒先看冊。你看阿禾。阿禾嚇了一跳，又把眼還給你，短，像暗號。', '陳肅：「東張西望者，心不在冊。」硃筆在你名下點了一點，極輕。點過，就不算無。阿禾後來把饅頭多分你一口。']
      : ['冊邊有一行淡墨，不是今日的名。你只看清一個「除」的偏旁，和一個不像功法的字。', '陳肅抬眼。你已經低頭。袖裡卻像捲進了一張廢帖——紙薄，門規更薄。你後來把這路數練成招。'];
  return { loc: '值事房·陳肅', paras, next: '__hub_done__' };
};

SCENES.c11 = () => ({
  loc: '外門通鋪·夢回滅門',
  paras: [
    '夜。通鋪潮。你夢見火、湯圓、那隻布後的眼。醒來時牙關是緊的。窗外銀杏葉落，像細的炮仗。',
    '阿禾在那頭翻身，含糊問：「又咬牙？」他沒逼你。外門的人各有咬牙的夜。這場夢你要不要變成話。',
  ],
  choices: [
    { text: '告訴阿禾', setFlags: { c11: 'tell', he_bond: 1, he_knows_fire: 1, reveal_lean: '+1' }, to: 'c11_out' },
    { text: '寫進功法冊夾層', setFlags: { c11: 'write', fire_note: 1, climb_lean: '+1' }, to: 'c11_out' },
    { text: '吞下去', setFlags: { c11: 'swallow', flee_lean: '+1' }, to: 'c11_out' },
  ],
});
SCENES.c11_out = (state) => {
  const k = state.flags.c11;
  const paras = k === 'tell'
    ? ['你說了火。說了幼弟。沒說舊姓。阿禾聽完，把枕頭拍扁，「觀裡不收仇。可我收著。收著不是揭，是怕你一個人咬。」', '他塞你半塊冷饃。「明天站樁。夢不能當飯。」你嚼著。夢仍在，可有人知道。']
    : k === 'write'
      ? ['功法冊夾層有一頁空白。你寫了三個字：火、布、袍。墨淡。像怕寫太實。', '冊是你的。夾層也是。以後若有人翻你的功法，會先翻到仇。這是把柄，也是骨。']
      : ['你說做了個吃湯圓的夢。阿禾「哦」了一聲，又睡。', '火你自己嚥。嚥下去的東西會在胃裡長。外門能活到下一頁名冊的人，多半這樣。'];
  return { loc: '外門通鋪·夢回滅門', paras, next: '__hub_done__' };
};

SCENES.c12 = () => ({
  loc: '青陽鎮·下山',
  paras: [
    '下山雜差。押的是空筐，換的是醬菜。青陽鎮比觀熱鬧，有人漿衣，有人喊舊年的戲文。',
    '有個漿衣的人看你第二眼。像看一張燒殘的譜。阿禾在你身後哼歌，走調。差是趕路。路中間有人。',
  ],
  choices: [
    { text: '幫鎮民搬筐', setFlags: { c12: 'help', reveal_lean: '+1', unlock_merit: 1 }, to: 'c12_out' },
    { text: '趕路', setFlags: { c12: 'rush', climb_lean: '+1', unlock_merit: 1 }, to: 'c12_out' },
    { text: '打聽舊姓', setFlags: { c12: 'ask', flee_lean: '+1', ask_old: 1 }, to: 'c12_fight' },
  ],
});
SCENES.c12_out = (state) => {
  const k = state.flags.c12;
  const paras = k === 'help'
    ? ['你幫一個跛腿的婦人把醬筐抬過橋。她塞你兩文，又塞一句：「觀裡的孩子心善。善，別用在刀口上。」', '肩上勒痕還在。下山的勁，後來成了招。阿禾說你像要搶內門的名額。你說只是筐。']
    : ['你趕路。醬菜入筐，名入冊。值事喜歡準時的人。準時是爬的第一級。', '肩上勒痕還在。外門把差事煉成功夫，把功夫煉成聽話。'];
  return { loc: '青陽鎮·下山', paras, effects: { silver: 2 }, next: '__hub_done__' };
};
SCENES.c12_fight = () => ({
  loc: '青陽鎮·河埠',
  paras: ['你把舊姓問出口。漿衣的人臉色變了。木杵還在他手裡。「別在鎮裡喊這個。喊，就有人來對。」', '他像要把你的話捶回去。鹼水濺上你袖。'],
  battle: { enemyId: 'jiang', onWin: 'c12_win', onLose: 'c12_lose' },
});
SCENES.c12_win = () => ({
  loc: '青陽鎮·河埠',
  paras: ['他坐下，杵橫在膝上。「你家那字，鎮東祠裡還供過。後來牌位撤了。撤的人穿青。」', '你沒再問。問下去，他要填冊。你把這句「穿青」帶走。肩勒成招。'],
  setFlags: { old_name_clue: 1, unlock_merit: 1 },
  effects: { silver: 1 },
  next: '__hub_done__',
});
SCENES.c12_lose = () => ({
  loc: '青陽鎮·河埠',
  paras: ['他沒往死裡打。只把你搡到濕板上。「當我沒聽見。你也當沒問。」', '鹼氣衝鼻。舊姓仍在你牙關裡。你自己起來。差還要交差。'],
  setFlags: { unlock_merit: 1 },
  next: '__hub_done__',
});
SCENES.c13 = () => ({
  loc: '外門·功法冊',
  paras: [
    '外門功法冊薄。能練的只有拙的：樁、搬、聽。值事說：「選一個方向。選了，月例好看一點。不選，也沒人逼——只是冊上空白難看。」',
    '阿禾已選了搬。「我有的是肩。」他敲你的冊，「你別跟我一樣。你那種熱，不像只會搬。」方向會進骨頭。進了就不肯出來。',
  ],
  choices: [
    { text: '煉體', setFlags: { c13: 'body', climb_lean: '+1' }, to: 'c13_out' },
    { text: '調息', setFlags: { c13: 'breath', flee_lean: '+1' }, to: 'c13_out' },
    { text: '聽壁', setFlags: { c13: 'listen', unlock_listen: 1, reveal_lean: '+1' }, to: 'c13_out' },
  ],
});
SCENES.c13_out = (state) => {
  const k = state.flags.c13;
  if (k === 'body') return { loc: '外門·功法冊', paras: ['你在冊上寫「煉體」。肩沉下去，氣血多一寸。值事點頭：「外門活著，靠這。」', '阿禾拍你後背，「以後搬筐你走前。」永久的。拙的。夠用。'], effects: { maxHp: 3, atk: 1 }, next: '__hub_done__' };
  if (k === 'breath') return { loc: '外門·功法冊', paras: ['你在冊上寫「調息」。內息收回來，像把火藏進丹田。值事「嗯」了一聲，沒多誇。', '牆那邊有人換氣。你聽得見自己的。逃的人，先要有息可逃。'], effects: { maxMp: 3 }, next: '__hub_done__' };
  return { loc: '外門·功法冊', paras: ['你在冊上寫「聽壁」。值事看你一眼，很淺。「聽多了，會聽見不該聽見的。」像勸，像招。', '你把耳朵貼過土牆。息長的是巡夜，息短的是怕。這一門後來叫聽壁息。'], effects: { def: 1, maxMp: 1 }, next: '__hub_done__' };
};

SCENES.c14 = () => ({
  loc: '藥圃',
  paras: [
    '藥圃的黃耆還小，不像後來缺的那箱。小滿蹲在壟間拔草，草鞋舊了些，仍白。',
    '管圃的外門丟給你三株嫩苗：「自己看。獻上去，記功。自己煉，補氣。給灶房——」他撇嘴，「灶房不入冊。」苗在你掌心。嫩。',
  ],
  setFlags: { met_xiaoman: 1 },
  choices: [
    { text: '給小滿', setFlags: { c14: 'xiao', xiao_gift: 1, reveal_lean: '+1' }, to: 'c14_out' },
    { text: '自己煉', setFlags: { c14: 'self', flee_lean: '+1' }, to: 'c14_out' },
    { text: '獻給值事', setFlags: { c14: 'offer', climb_lean: '+1' }, to: 'c14_out' },
  ],
});
SCENES.c14_out = (state) => {
  const k = state.flags.c14;
  if (k === 'xiao') return { loc: '藥圃·小滿', paras: ['小滿把苗藏進筐底。「我熬湯。湯不分內外。」他笑，缺了一顆牙。', '午後灶房多一碗苦湯。阿禾說你傻。傻有時比冊好看。'], effects: { hp: 2 }, next: '__hub_done__' };
  if (k === 'self') return { loc: '藥圃', paras: ['你按外門的拙法把苗焙了。苦。氣血回了一截。藥是自己的，過也是自己的。', '小滿看了一眼，沒要。他習慣不伸手。'], effects: { hp: 8, mp: 4 }, next: '__hub_done__' };
  return { loc: '藥圃', paras: ['值事收了苗，在你名下點了一筆功。功很淺。淺也是往上。', '小滿仍在拔草。圃裡的黃耆，後來會缺一箱。這會兒還齊。'], effects: { silver: 3 }, next: '__hub_done__' };
};

SCENES.c15 = () => ({
  loc: '試劍坪',
  paras: [
    '試劍坪的沙是新的。外門弟子輪著上場，像把人過篩。值事說：「過了，秋薦好看。不過，仍掃地。」',
    '對你的那人肩比你寬，樁比你穩。他不恨你。他只想把你從沙裡壓出去。',
  ],
  choices: [
    { text: '進攻', setFlags: { c15: 'atk', reveal_lean: '+1' }, to: 'c15_go' },
    { text: '守樁', setFlags: { c15: 'guard', climb_lean: '+1' }, to: 'c15_go' },
    { text: '尋隙', setFlags: { c15: 'slip', flee_lean: '+1' }, to: 'c15_go' },
  ],
});
SCENES.c15_go = () => ({ loc: '試劍坪', paras: ['外門弟子已經抬手。沙揚起來。'], battle: { enemyId: 'outer', onWin: 'c15_win', onLose: 'c15_lose' } });
SCENES.c15_win = () => ({ loc: '試劍坪', paras: ['他坐進沙裡。不是跪。外門不跪給同門。值事遠遠點了一筆。', '阿禾在場邊比了個「還行」。試劍坪把人分成能被看見的，和仍掃地的。你這次被看見了。'], setFlags: { won_outer: 1, fame: '+1' }, next: '__hub_done__' });
SCENES.c15_lose = () => ({ loc: '試劍坪', paras: ['你坐進沙裡。他伸手拉你，又縮回去——拉，像黨。', '值事沒記過。只沒記功。秋薦的風還遠。遠的東西，會走近。'], setFlags: { lost_outer: 1 }, next: '__hub_done__' });

SCENES.c16 = () => ({
  loc: '外庭·小比',
  paras: [
    '外門小比。不是內門那套。一塊地，兩個人，贏的掃中間，輸的掃邊兒。錢六嘴損，王五帚狠。',
    '值事懶得排。他說：「自己點。」點了，就是名。',
  ],
  choices: [
    { text: '挑戰錢六', setFlags: { c16: 'qian', climb_lean: '+1' }, to: 'c16_qian' },
    { text: '挑戰王五', setFlags: { c16: 'wang', reveal_lean: '+1' }, to: 'c16_wang' },
    { text: '避讓（仍被點名）', setFlags: { c16: 'yield', flee_lean: '+1', yield_wang: 1 }, to: 'c16_wang' },
  ],
});
SCENES.c16_qian = () => ({ loc: '外庭·小比', paras: ['錢六踢翻腳邊的筐，藥包滾進石縫。「掃過試劍坪就學內門的氣了？」'], battle: { enemyId: 'qian', onWin: 'c16_win', onLose: 'c16_lose' } });
SCENES.c16_wang = () => ({ loc: '外庭·小比', paras: ['王五的掃帚先動。柄打手背的路數，外門人人會。葉灰揚起來。'], battle: { enemyId: 'wang', onWin: 'c16_win', onLose: 'c16_lose' } });
SCENES.c16_win = () => ({ loc: '外庭·小比', paras: ['對方坐下揉腕。「掃就掃。」葉還是那些葉。你把中間也掃了。', '有人用氣音說：「昨天試劍的，今天也不讓。」名聲不入冊，入嘴。'], setFlags: { won_small: 1, fame: '+1' }, next: '__hub_done__' });
SCENES.c16_lose = () => ({ loc: '外庭·小比', paras: ['你坐在葉堆裡。對方把中間掃完，邊兒留給你。「記住。」外門的記住，都是同一句。', '值事經過，當沒看見。你自己起來。'], setFlags: { lost_small: 1 }, next: '__hub_done__' });

SCENES.c17 = () => ({
  loc: '外庭·謝承淵',
  paras: [
    '小比的功還沒收，謝承淵來了。青袍無塵。他對值事一揖，聲線溫的：「這場我看過。功記我名下——外門的孩子，記功太滿，秋薦會刺眼。」',
    '像攬過。像護。值事已經抬筆。阿禾在你身側，耳根紅了。功是你的。名是誰的，你還能爭一次。',
  ],
  setFlags: { met_xie: 1 },
  choices: [
    { text: '讓', setFlags: { c17: 'yield', xie_hold: 1, climb_lean: '+1' }, to: 'c17_out' },
    { text: '爭', setFlags: { c17: 'fight', xie_watch: 1, reveal_lean: '+1' }, to: 'c17_out' },
    { text: '看阿禾', setFlags: { c17: 'he', he_bond: 1, flee_lean: '+1' }, to: 'c17_out' },
  ],
});
SCENES.c17_out = (state) => {
  const k = state.flags.c17;
  const paras = k === 'yield'
    ? ['你沒開口。謝承淵接得極熟。「穩就好。」他說，幾乎像誇獎。功從你名下挪走，過也像被他擋了一擋。', '傘在。也是繩。阿禾後來只說：「讓了就讓了。別讓第二次還當自己聰明。」']
    : k === 'fight'
      ? ['「功是我的。」你說。場上有人倒吸氣。謝承淵目光從你臉上擦過，沒有怒，有一點可惜。', '值事愣了，仍把功寫在你名下。謝承淵笑意不散：「也好。認得乾脆的人，內門缺。」乾脆兩個字，日後要還。']
      : ['你看阿禾。阿禾小聲：「別讓。」又改口：「讓也行。」他什麼都怕，又什麼都站在你旁邊。', '謝承淵看見了這一眼。「同門之間，話少些。」他記住了你們兩個。功仍被他攬走一半。一半，是恩。'];
  return { loc: '外庭·謝承淵', paras, next: '__hub_done__' };
};

SCENES.c18 = () => ({
  loc: '側門銀杏',
  paras: [
    '值事點差：側門那兩棵銀杏，葉子多。掃到側門即可。即可兩個字說得輕。側門不是外門該久停的地方。',
    '有人會看見。謝承淵說過這句。看見是獎賞。能被想起，才有機會從名冊底欄往上挪。葉金黃。門環涼。',
  ],
  choices: [
    { text: '多停一刻', setFlags: { c18: 'stay', xie_eye: 1, climb_lean: '+1' }, to: 'c18_out' },
    { text: '掃完就走', setFlags: { c18: 'go', flee_lean: '+1' }, to: 'c18_out' },
    { text: '在根上留暗號', setFlags: { c18: 'sign', sidemen_sign: 1, reveal_lean: '+1' }, to: 'c18_out' },
  ],
});
SCENES.c18_out = (state) => {
  const k = state.flags.c18;
  const paras = k === 'stay'
    ? ['你多停一刻。內門有青袍經過，沒站下。可你知道自己被掃進某隻眼裡。', '葉落在肩上。你沒抖。被看見的人，要像一棵願意被記住的樹。']
    : k === 'go'
      ? ['你掃完就走。葉在筐裡。沒有人看見你，也就沒有人把你寫進秋薦的邊。', '阿禾在夾道口等，「走得好。側門停久了，像求。」']
      : ['你在銀杏根上用枝劃了一道極淺的痕。不是功法。是給自己留的路：這門虛掩過。', '有人會當沒看見。有人會當看見。痕跡這種東西，外門不入冊，入骨。'];
  return { loc: '側門銀杏', paras, next: '__hub_done__' };
};

SCENES.c19 = () => ({
  loc: '後山禁林',
  paras: [
    '後山禁林有關。值事說秋習，外門走一遭，見識關。見識兩個字，常死人。',
    '巡夜的燈在關前晃。林中有人息，不像外門。阿禾拽你袖：「別鑽。鑽了，冊上寫『擅入』。」關就在那兒。',
  ],
  choices: [
    { text: '走巡夜的路', setFlags: { c19: 'patrol', climb_lean: '+1' }, to: 'c19_patrol' },
    { text: '鑽林', setFlags: { c19: 'forest', reveal_lean: '+1' }, to: 'c19_forest' },
    { text: '退後（仍遇林中人）', setFlags: { c19: 'back', flee_lean: '+1' }, to: 'c19_forest' },
  ],
});
SCENES.c19_patrol = () => ({ loc: '後山禁林關', paras: ['巡夜把手裡燈籠連罩砸過來。「夜禁！外門走邊兒。」關前沒邊兒。'], battle: { enemyId: 'patrol', onWin: 'c19_win', onLose: 'c19_lose' } });
SCENES.c19_forest = () => ({ loc: '後山禁林', paras: ['林中人從樹影裡出來。不像匪。像守關的。枯枝當鞭。'], battle: { enemyId: 'forest', onWin: 'c19_win', onLose: 'c19_lose' } });
SCENES.c19_win = () => ({ loc: '後山禁林關', paras: ['對方退進影裡。關沒開。可你看見關內的燈，比外門亮一寸，亮得不像練功。', '阿禾喘，「別再往裡。裡頭的氣，不像樁。」你把這不像帶走。'], setFlags: { forest_seen: 1 }, next: '__hub_done__' });
SCENES.c19_lose = () => ({ loc: '後山禁林關', paras: ['你跪在關前的土上。對方沒報。報了，他自己也要解釋為何外門能摸到關。', '阿禾把你拖回。禁林的土還在牙縫裡。關仍關。'], next: '__hub_done__' });

SCENES.c20 = () => ({
  loc: '禁林關內',
  paras: [
    '關內有一間石屋。藥香衝鼻。有個外門同門跪著，腕上勒著繩，繩上有火漆碎渣，紅得發黑。',
    '架上有黃耆。籤是真的。箱比籤小。有人把裡面換過。你只能做一件。巡夜的息在關外，還有三轉。',
  ],
  choices: [
    { text: '救同門', setFlags: { c20: 'save', saved_inner: 1, reveal_lean: '+1' }, to: 'c20_out' },
    { text: '搶藥', setFlags: { c20: 'grab', took_herb: 1, climb_lean: '+1' }, to: 'c20_out' },
    { text: '原路退出', setFlags: { c20: 'back', flee_lean: '+1' }, to: 'c20_out' },
  ],
});
SCENES.c20_out = (state) => {
  const k = state.flags.c20;
  if (k === 'save') return { loc: '禁林關內', paras: ['你割繩。同門沒謝，只說：「別報我的名。報了，成串。」他鑽進林。火漆渣掉在你掌心。', '你沒拿藥。拿了一個人。人比藥難入冊。'], setFlags: { box_clue: 1, inner_unlike: 1 }, next: '__hub_done__' };
  if (k === 'grab') return { loc: '禁林關內', paras: ['你抓了一把黃耆就走。同門的眼睛在暗裡發亮，不是恨，是懂。懂你選了能入口的。', '藥苦。苦完能打。關外的風把藥香冲淡。你沒回頭。'], effects: { hp: 6, mp: 4 }, setFlags: { box_clue: 1, inner_unlike: 1 }, next: '__hub_done__' };
  return { loc: '禁林關內', paras: ['你原路退出。石屋的香還在袖裡。同門的呼吸還在耳裡。你什麼都沒做，所以什麼都能做。', '阿禾在關外等，「看見就行。看見，不要當自己是英雄。」'], setFlags: { box_clue: 1, inner_unlike: 1 }, next: '__hub_done__' };
};

SCENES.c21 = () => ({
  loc: '值事房·記功',
  paras: [
    '下山與禁林的差要入冊。功在案上。謝承淵又來了，仍溫：「這筆我擔。外門記滿，秋薦刺眼。」',
    '陳肅這次也在。硃筆未點。「擔功者擔核。」他看你，看向你腳邊那塊磨凹的磚。功被搶。你怎麼認。',
  ],
  setFlags: { met_xie: 1, met_chen: 1 },
  choices: [
    { text: '當眾認是自己的', setFlags: { c21: 'admit', admit_self: 1, reveal_lean: '+1' }, to: 'c21_out' },
    { text: '讓給謝承淵', setFlags: { c21: 'xie', xie_hold: 1, climb_lean: '+1' }, to: 'c21_out' },
    { text: '把功賣給陳肅', setFlags: { c21: 'chen', sell_chen_merit: 1, climb_lean: '+1' }, to: 'c21_out' },
  ],
});
SCENES.c21_out = (state) => {
  const k = state.flags.c21;
  if (k === 'admit') return { loc: '值事房·記功', paras: ['「是我。」值事房裡有人倒吸氣。陳肅筆尖停了一息。謝承淵幾乎同時接口：「別聽這句。箱是我的。」', '陳肅仍記你一筆自認。自認是骨。也是把名字送到刀口。'], effects: { demerit: 1 }, next: '__hub_done__' };
  if (k === 'xie') return { loc: '值事房·謝承淵', paras: ['你讓了。謝承淵替你把功攬走，又讓人補了你半月月例。「別跟執法堂說是我。」補，是恩，也是欠。', '陳肅把冊合上。合上不是完。是另案。'], effects: { silver: 3 }, next: '__hub_done__' };
  return { loc: '值事房·陳肅', paras: ['你把話送到陳肅耳邊：功可記執法堂核。陳肅看你，第一次像看一把可用的筆。', '硃筆點在別人的名下。謝承淵的笑淡了一寸。你賣的不是功。是站隊。'], effects: { silver: 6 }, next: '__hub_done__' };
};

SCENES.c22 = () => ({
  loc: '外門廊·秋薦',
  paras: [
    '秋薦的風先從灶房過來。有人說南邊要人。有人說聯姻。有人把劉三的名字嚼碎了吐在井裡。',
    '劉三上月還在這條廊外掃地。手背有凍裂的口。後來他有過新草鞋。再後來沒人見。風聲是刀的影子。',
  ],
  choices: [
    { text: '打聽', setFlags: { c22: 'ask', jian_rumour: 1, reveal_lean: '+1' }, to: 'c22_out' },
    { text: '裝聾', setFlags: { c22: 'deaf', flee_lean: '+1' }, to: 'c22_out' },
    { text: '問謝承淵', setFlags: { c22: 'xie', met_xie: 1, climb_lean: '+1' }, to: 'c22_out' },
  ],
});
SCENES.c22_out = (state) => {
  const k = state.flags.c22;
  const paras = k === 'ask'
    ? ['管簽的人酒後說漏：「薦不是府裡點的。是門裡薦的。薦的人吃禮。被薦的——有的成親，有的連親事都沒見到，名冊就除了。」', '他立刻摀嘴。你已經聽見。聽見就不能裝成風。']
    : k === 'deaf'
      ? ['你當風是風。阿禾看你，沒再講劉三。小滿洗筐洗得更響。', '裝聾的人活得久。久，有時只是把別人的名推遲到自己頭上。']
      : ['謝承淵在側廊喝茶。「南邊的薦，不是每年都有。今年……快滿。」像安慰。像提醒。像告訴你位子暫時還能掃地。', '他拈盞，並不給你。「外門的職責是別傳。傳，就是黨。」'];
  return { loc: k === 'xie' ? '側廊·謝承淵' : '外門廊·秋薦', paras, setFlags: { sell_disciple_known: 1 }, next: '__hub_done__' };
};

SCENES.c23 = () => ({
  loc: '外庭·衛正言',
  paras: [
    '衛正言來外庭講法。青衣，鬚整齊，像門規本身會走路。外門這一列幾乎同時折腰。',
    '他說：「外門亦是門。門內門外，都是青衡的骨。骨正，則觀正。」聲很正。正得像沒有縫。阿禾在你身後用氣音：「正的，才要小心。」',
  ],
  setFlags: { met_wei: 1, wei_seen: 1 },
  choices: [
    { text: '信', setFlags: { c23: 'trust', wei_trust: 1, climb_lean: '+1' }, to: 'c23_out' },
    { text: '疑', setFlags: { c23: 'doubt', wei_doubt: 1, reveal_lean: '+1' }, to: 'c23_out' },
    { text: '只聽阿禾的', setFlags: { c23: 'he', he_bond: 1, flee_lean: '+1' }, to: 'c23_out' },
  ],
});
SCENES.c23_out = (state) => {
  const k = state.flags.c23;
  const paras = k === 'trust'
    ? ['你把腰折得更低。衛正言經過時看了你一眼，像看一塊可雕的玉。「外門有可教者。」', '可教，是往上。也是被拿去刻字。']
    : k === 'doubt'
      ? ['你聽完，沒把腰折盡。他未必看見。你看見他袖口一點舊的火漆色，紅得發黑，像禁林繩上的。', '正的人，袖裡也可能有渣。你沒問。問是下一章的事。']
      : ['衛正言的話從你耳邊過。你只記住阿禾那句。同門的氣音，有時比長老的正言硬。', '講法散了。他沒往外門這邊看。不看，也是一種看。'];
  return { loc: '外庭·衛正言', paras, next: '__hub_done__' };
};

SCENES.c24 = () => ({
  loc: '山門·夜',
  paras: [
    '小成的夜。你煉體的層數在冊上好看了一點。山門那一側的燈先亮。外門這邊晚一盞。',
    '你去看。門虛掩。不是忘了扣。是故意留一縫。縫裡有香，不像外門的麥香。推，退，還是報。',
  ],
  choices: [
    { text: '推門', setFlags: { c24: 'push', ajar_push: 1, reveal_lean: '+1' }, to: 'c24_out' },
    { text: '退回', setFlags: { c24: 'back', flee_lean: '+1' }, to: 'c24_out' },
    { text: '報值事', setFlags: { c24: 'report', climb_lean: '+1' }, to: 'c24_out' },
  ],
});
SCENES.c24_out = (state) => {
  const k = state.flags.c24;
  const paras = k === 'push'
    ? ['你推。縫開一指。裡頭不是匪。是兩個人在對數，數的不是功法，是名。你沒聽全。門軸響，他們停。', '你退。虛掩仍虛掩。你已經比外門多看見一指寬的青衡。']
    : k === 'back'
      ? ['你退。門仍虛掩。有些縫不是給你開的。活到小成的人，多半會退。', '通鋪的燈滅了。你躺下。縫在腦子裡，比門寬。']
      : ['值事聽完，臉白了一下，又笑：「山門夜風。你看錯。」他記下你的報。記，不是信。', '次日山門扣死。扣死的門，比虛掩更像有事。'];
  return { loc: '山門·夜', paras, next: '__hub_done__' };
};
SCENES.c25 = () => ({
  loc: '庫房·舊物',
  paras: [
    '雜役院清理舊物。箱底有半頁燒殘的譜，墨是舊姓的偏旁。旁有一截香，香灰的味，你在滅門夜聞過。',
    '庫房架上的火漆碎渣，紅得發黑，與這截香同一種苦。阿禾在門口放風。舊物不是垃圾。是證。',
  ],
  choices: [
    { text: '藏入袖', setFlags: { c25: 'hide', token_page: 1, reveal_lean: '+1' }, to: 'c25_out' },
    { text: '給阿禾看', setFlags: { c25: 'he', he_bond: 1, token_page: 1, reveal_lean: '+1' }, to: 'c25_out' },
    { text: '丟回架', setFlags: { c25: 'drop', flee_lean: '+1' }, to: 'c25_out' },
  ],
});
SCENES.c25_out = (state) => {
  const k = state.flags.c25;
  const paras = k === 'drop'
    ? ['你把殘頁放回。手卻顫。丟得掉的是紙，丟不掉的是味。', '阿禾說：「丟得好。留著，像自己往冊上寫。」他沒問你為什麼認得這味。']
    : k === 'he'
      ? ['阿禾看完，臉白。「這味不是外門祭的。內門側殿才有。你從哪——」他咬住，「別說從哪。說了，成串。」', '他把殘頁塞回你袖。「你收。我當沒看。沒看的人能活。」']
      : ['殘頁進袖。香灰蹭在腕上。從此你走路都側一點，像袖裡有刃。', '庫房的火漆還在架上。同類。你已經能對。'];
  return { loc: k === 'he' ? '庫房·阿禾' : '庫房·舊物', paras, setFlags: { inner_unlike: 1 }, next: '__hub_done__' };
};

SCENES.c26 = () => ({
  loc: '值事房外廊',
  paras: [
    '晚冊。值事報在、不在、病、差。輪到一個空缺，他停了。「劉三。」沒人應。',
    '事先備好的口氣：「上月薦往南邊聯姻。按例除名。」筆尖在「除」上頓了頓，像這字寫過很多次，每次還是要頓。廊外有靴聲。衛正言從遠廊過去，沒停。',
  ],
  setFlags: { met_wei: 1 },
  choices: [
    { text: '追問南邊', setFlags: { c26: 'ask', reveal_lean: '+1' }, to: 'c26_out' },
    { text: '默記空格', setFlags: { c26: 'memo', flee_lean: '+1' }, to: 'c26_out' },
    { text: '看陳肅的筆', setFlags: { c26: 'pen', met_chen: 1, climb_lean: '+1' }, to: 'c26_out' },
  ],
});
SCENES.c26_out = (state) => {
  const k = state.flags.c26;
  const paras = k === 'ask'
    ? ['「南邊是哪一家。」你問。值事的眼跳了一下。「按例不宣。再問，記過。」', '陳肅在案那頭沒抬頭。可筆停了。停，就是聽見。劉三的空格在你眼裡比冊大。']
    : k === 'memo'
      ? ['你把「除」字的頓記進骨頭。不問。問的人先除。', '散了。你經過名冊案。那一格空了，只留下一個墨點。妹妹這兩個字沒地方寫。門規不收家屬。']
      : ['陳肅的筆在「除」上走得很穩。穩得不像第一回。他抬眼，看你在看筆。', '「外門看筆，也是過。」他沒記。只讓你知道：筆比刀乾淨，也比刀快。'];
  return { loc: k === 'pen' ? '值事房外廊·陳肅' : '值事房外廊', paras, setFlags: { liu_gone: 1 }, next: '__hub_done__' };
};

SCENES.c27 = () => ({
  loc: '夾道·阿禾',
  paras: [
    '執法堂的風往阿禾那邊吹。有人說他多嘴。有人說他與缺箱有過旁證。陳肅的冊還沒合，可眼已經點過他。',
    '阿禾蹲在筍乾小房門口，把饅頭掰開，沒吃。「你要是聰明，這會兒別認我。」他又塞你一半，「你要是還是你，就認。」保，棄，還是投名。',
  ],
  setFlags: { met_ahe: 1 },
  choices: [
    { text: '保他', setFlags: { c27: 'save', he_saved: 1, he_bond: 1, reveal_lean: '+1' }, to: 'c27_out' },
    { text: '棄', setFlags: { c27: 'drop', he_grudge: 1, flee_lean: '+1' }, to: 'c27_out' },
    { text: '把他的名投給陳肅', setFlags: { c27: 'sell', sell_he: 1, he_to_cart: 1, climb_lean: '+1' }, to: 'c27_out' },
  ],
});
SCENES.c27_out = (state) => {
  const k = state.flags.c27;
  if (k === 'save') return { loc: '夾道·阿禾', paras: ['你去值事房說：缺箱的話是你逼他說的。陳肅看你，像看一塊自己往刀上送的肉。「膽，或黨。先按膽記。」', '阿禾罰掃階三日。你記過。他還在。還在，就不是車上。'], effects: { demerit: 1 }, next: '__hub_done__' };
  if (k === 'drop') return { loc: '夾道·阿禾', paras: ['你沒認他。他看懂了。門關上一條縫。「行。聰明。」聰明兩個字咬得很白。', '次日他仍給你留饅頭，只是放在階上，不放進你手。'], next: '__hub_done__' };
  return { loc: '夾道·陳肅', paras: ['陳肅收下你的投名。硃筆在阿禾名下走。午後有車。車上不講饅頭。', '謝承淵後來對你說：「穩。」穩得你想吐。你往上挪了一寸。寸下是人。'], effects: { silver: 4 }, next: '__hub_done__' };
};

SCENES.c28 = () => ({
  loc: '外門庫房',
  paras: [
    '秋盤。外門庫房。高窗，窄光。案上攤開盤冊。陳肅進門的時候，沒人聽見靴聲。是冊子先落在案上。',
    '點到黃耆。管簽的額上的汗滴進冊縫。「昨日記入一箱。今早……箱在籤上，貨不在架。」陳肅：「缺一箱。記入者誰。」',
    '門軸響。謝承淵進來，先對陳肅一揖，再把你擋在袖影裡。「那一箱是我經手。功勞記我，錯也算我。」像解圍。陳肅：「擔功者擔核。你。昨天送箱的，出列。」',
  ],
  setFlags: { met_chen: 1, met_xie: 1 },
  choices: [
    { text: '看向謝承淵，等他說', setFlags: { c28: 'wait', wait_xie: 1, xie_hold: 1, climb_lean: '+1' }, to: 'c28_out' },
    { text: '「是我。」', setFlags: { c28: 'admit', admit_self: 1, reveal_lean: '+1' }, to: 'c28_out' },
    { text: '看向阿禾', setFlags: { c28: 'he', look_he: 1, flee_lean: '+1' }, to: 'c28_out' },
  ],
});
SCENES.c28_out = (state) => {
  const k = state.flags.c28;
  if (k === 'wait') return { loc: '外門庫房·謝承淵', paras: ['你沒開口。謝承淵接得極熟。「缺，從我查。外門的月例薄，別先往他們身上砍。」', '陳肅把話收進冊裡。「內門可自請核。外門在場經手，仍記一筆。站外庭。扣半月月例。」硃筆落下。他的「擔」，聽著像傘，看著像繩。'], effects: { silver: -6, hp: -2 }, setFlags: { box_clue: 1 }, next: '__hub_done__' };
  if (k === 'admit') return { loc: '外門庫房', paras: ['「是我。」庫房裡有人倒吸氣。謝承淵接口：「別聽這句。箱是我的。」陳肅：「自認經手。記過。扣一月月例。謝承淵——知情。」', '知情兩個字落在他身上，輕得像拂袖。阿禾眼底閃過一下，不是感激，是「你瘋了」。'], effects: { silver: -12, demerit: 1, hp: -2 }, setFlags: { box_clue: 1 }, next: '__hub_done__' };
  const he = state.flags.he_saved || state.flags.he_bond;
  const paras = he
    ? ['你的視線偏了。阿禾的嘴張了一下。「……箱比黃耆沉。」話出口，他自己先白了。陳肅：「旁證。記。看同門，不看執法。膽，或黨。」', '阿禾罰掃執法堂階。你記過。他沒恨你——至少此刻沒有。他只是發現：可以說話的人，代價是一起被寫進冊。']
    : ['你的視線偏了。阿禾比你更快低頭。陳肅沒追那一瞥。「東張西望。記過。站外庭。」', '沒有旁證，沒有自認。處罰落在「神色」上——門規裡最軟、也最隨便的一刀。'];
  return { loc: '外門庫房·阿禾', paras, effects: { silver: -6, demerit: 1, hp: -2 }, setFlags: { box_clue: 1 }, next: '__hub_done__' };
};

SCENES.c29 = () => ({
  loc: '庫房夾道·夜探',
  paras: [
    '寅時還遠。黃耆的空架在庫房裡。劉三的空格在冊上。你的記過在陳肅袖裡那一頁的邊上。',
    '罰站的下午，你看見側門的門閂只是虛扣。盤庫的日子，人以為鎖過了，手就鬆。怎麼進。',
  ],
  choices: [
    { text: '鑽側門', setFlags: { c29: 'side', reveal_lean: '+1' }, to: 'c29_go' },
    { text: '跟著巡夜的燈', setFlags: { c29: 'lamp', climb_lean: '+1' }, to: 'c29_go' },
    { text: '退，仍被撞見', setFlags: { c29: 'back', flee_lean: '+1' }, to: 'c29_go' },
  ],
});
SCENES.c29_go = () => ({
  loc: '庫房夾道·夜探',
  paras: ['你進去。沒有開燈。鼻尖先碰到空架。黃耆那一格，籤還在，墨新。格子裡剩幾根斷的麻繩，繩上有火漆碎渣。', '燈籠的光從另一頭折進來。「誰？庫房夜禁。」巡夜認鎖。鎖是虛的，人是實的。退不出去。'],
  battle: { enemyId: 'patrol', onWin: 'c29_win', onLose: 'c29_lose' },
});
SCENES.c29_win = () => ({ loc: '外門庫房·夜', paras: ['巡夜捂著肋，燈籠滾到架下。他沒喊第二聲——喊了，自己也要解釋為何門是虛扣。', '你摸到箱底一塊木屑，夾著半枚極薄的牙牌。牌上刻一個「薦」字，小得要用指甲去湊。你把牙牌塞進鞋裡。硌著腳心。'], setFlags: { token_jian: 1 }, next: '__hub_done__' });
SCENES.c29_lose = () => ({ loc: '庫房夾道·夜探', paras: ['巡夜把你拖到值事房門口，又懶得報全。「外門夜鬥，記一筆。」他沒提庫房。提了，虛扣也要上冊。', '你沒摸到那格裡的東西。牙牌不在你鞋裡。你躺回通鋪，氣血只剩一絲。'], setFlags: { warehouse_fail: 1 }, next: '__hub_done__' });

SCENES.c30 = () => ({
  loc: '外門通鋪',
  paras: [
    '袖中那頁——盤庫時陳肅袖走的抄件，夜裡又從值事案邊落下半張。阿禾撿到，塞給你，手冰。「我不是好人。我只是還沒被薦走。」',
    '頁上有缺箱的秤碼，有火漆印，有一個不像功法的符。給陳，是刀。給謝，是傘。藏，是自己當刀。',
  ],
  choices: [
    { text: '給陳肅', setFlags: { c30: 'chen', page_to_chen: 1, met_chen: 1, climb_lean: '+1' }, to: 'c30_out' },
    { text: '給謝承淵', setFlags: { c30: 'xie', page_to_xie: 1, met_xie: 1, climb_lean: '+1' }, to: 'c30_out' },
    { text: '藏起來', setFlags: { c30: 'hide', page_hide: 1, reveal_lean: '+1' }, to: 'c30_out' },
  ],
});
SCENES.c30_out = (state) => {
  const k = state.flags.c30;
  const paras = k === 'chen'
    ? ['陳肅收下。硃筆在你名下點了「可核」。可核不是平安。是你被他當成筆。', '阿禾看你的眼神空了一下。「你把火交給執法堂。執法堂是火的家。」']
    : k === 'xie'
      ? ['謝承淵看完，把頁收進袖。「我擔。」又是這句。頁進了他袖，你進了他的帳。', '他讓人給你補月例。「好好當差。」當差兩個字，把揭的路蓋上了一層紙。']
      : ['你把頁貼在功法冊夾層，挨著火、布、袍。燒不燒，以後再說。現在它是你的。', '阿禾鬆了口氣，又更怕。「藏的人，被搜出來，比交上去更像黨。」'];
  return { loc: k === 'chen' ? '值事房·陳肅' : k === 'xie' ? '側廊·謝承淵' : '外門通鋪', paras, next: '__hub_done__' };
};

SCENES.c31 = () => ({
  loc: '灶房·小滿',
  paras: [
    '小滿的名上了秋薦的邊。不是正薦，是備選。備選兩個字，像新草鞋，白，假。',
    '他還在洗筐，問你：「我去南邊，是不是有新鞋穿？」他不知道劉三。提醒，告陳，還是裝沒看見。',
  ],
  setFlags: { met_xiaoman: 1 },
  choices: [
    { text: '提醒小滿別去', setFlags: { c31: 'warn', xiao_alert: 1, reveal_lean: '+1' }, to: 'c31_out' },
    { text: '告訴陳肅', setFlags: { c31: 'chen', xiao_case: 1, met_chen: 1, climb_lean: '+1' }, to: 'c31_out' },
    { text: '裝沒看見', setFlags: { c31: 'blind', ignore_xiao: 1, flee_lean: '+1' }, to: 'c31_out' },
  ],
});
SCENES.c31_out = (state) => {
  const k = state.flags.c31;
  const paras = k === 'warn'
    ? ['你說：「南邊不是新鞋。是除名。」小滿把筐抱緊。他信你一半。一半就夠他夜裡哭。', '次日他的名還在邊上。提醒過，就不算賣他。也不算救成。']
    : k === 'chen'
      ? ['陳肅聽完，「灶房備選，按例核。」按例兩個字把孩子變成案。午後小滿被叫去值事房，出來時沒有草鞋，也沒有笑。', '你用規則當刀。刀很快。很快的刀，不認人。']
      : ['你看井，不看他。小滿把新鞋又穿上，白。阿禾經過，沒停。', '裝沒看見，是外門的功法。練久了，會成自己的眼病。'];
  return { loc: k === 'chen' ? '灶房·陳肅' : '灶房·小滿', paras, next: '__hub_done__' };
};

SCENES.c32 = () => ({
  loc: '執法堂階',
  paras: [
    '成串。陳肅用這兩個字整肅外門。缺箱、夜探、側門停久的、多嘴的，名字寫在同一頁邊上。邊上就是黨。',
    '執法堂弟子在階上搜袖。阿禾若還在，他的肩會碰你。若不在，空。這串你要怎麼拆。',
  ],
  setFlags: { met_chen: 1 },
  choices: [
    { text: '把過攬到自己身上', setFlags: { c32: 'take', reveal_lean: '+1' }, to: 'c32_go' },
    { text: '把阿禾的名摘出去', setFlags: { c32: 'cut', climb_lean: '+1' }, to: 'c32_out' },
    { text: '跪求劃掉', setFlags: { c32: 'kneel', flee_lean: '+1' }, to: 'c32_out' },
  ],
});
SCENES.c32_go = () => ({ loc: '執法堂階', paras: ['執法堂弟子搜你袖。指節磕腕骨。成串兩個字當喝。你若硬扛，這一場要過手。'], battle: { enemyId: 'enforcer', onWin: 'c32_win', onLose: 'c32_lose' } });
SCENES.c32_win = () => ({ loc: '執法堂階', paras: ['他退了半步。陳肅在門裡看著，筆沒停。「外門還手，記膽。膽可留。」', '這一串沒全斷。可你的名從邊上挪到了中間——中間更顯。顯，是揭的代價。'], setFlags: { chain_resist: 1 }, next: '__hub_done__' });
SCENES.c32_lose = () => ({ loc: '執法堂階', paras: ['你跪在階上。氣血一絲。陳肅：「成串未散。先記。」', '同門繞開你。繞開是活法。你自己起來。門規不給外門「結束」。'], next: '__hub_done__' });
SCENES.c32_out = (state) => {
  const k = state.flags.c32;
  const paras = k === 'cut'
    ? ['你說阿禾只是掃階。話是真的，也是刀。陳肅把阿禾的名從邊上劃掉，加在你邊上。', '阿禾活命。你更像黨首。爬的人，常用別人的活當階。']
    : ['你跪。額抵青石。陳肅看了你一眼，「無骨。可無骨的人好使。」硃筆劃了你名下三分之一。', '活了。活成好使的。階上的灰粘在額頭，像印。'];
  return { loc: '執法堂階·陳肅', paras, next: '__hub_done__' };
};
SCENES.c33 = () => ({
  loc: '青陽鎮·舊姓',
  paras: [
    '再下山。鎮東祠的香灰裡有人叫住你。老，眼濁，卻把舊姓唸對了。「你是那夜沒燒完的。」',
    '他手抖。「牌位撤了。撤的人說是清繳。清繳不是匪。」周圍有耳。相認，否認，還是付錢封口。',
  ],
  choices: [
    { text: '相認', setFlags: { c33: 'yes', old_name_known: 1, reveal_lean: '+1' }, to: 'c33_out' },
    { text: '否認', setFlags: { c33: 'no', climb_lean: '+1' }, to: 'c33_out' },
    { text: '付錢封口', setFlags: { c33: 'pay', flee_lean: '+1' }, to: 'c33_out' },
  ],
});
SCENES.c33_out = (state) => {
  const k = state.flags.c33;
  if (k === 'yes') return { loc: '青陽鎮·舊姓', paras: ['你點頭。老人哭，又立刻止住。「別回祠。祠裡的青，不是祭。」', '舊姓在鎮裡活了一息。一息就夠把清繳兩個字釘進你耳裡。'], setFlags: { purge_hint: 1 }, next: '__hub_done__' };
  if (k === 'no') return { loc: '青陽鎮·舊姓', paras: ['你說認錯人。老人看你袖口的外門灰，把話嚥回去。嚥回去的話，比說出來的重。', '你仍是青衡的雜役。雜役沒有舊姓。沒有舊姓，好入冊。'], setFlags: { purge_hint: 1 }, next: '__hub_done__' };
  return { loc: '青陽鎮·舊姓', paras: ['你把碎銀塞進他手。「當沒看見。」他收了，又把其中一文扔回你腳邊。「這文給你買忘。買不掉。」', '封口是逃的一種。逃的人，常先堵住別的嘴。'], effects: { silver: -8 }, setFlags: { purge_hint: 1 }, next: '__hub_done__' };
};

SCENES.c34 = () => ({
  loc: '側門·清繳',
  paras: [
    '殘頁、牙牌、老人的「清繳」、禁林的火漆，終於能對上。滅門不是匪。是門裡的字。清繳。繳的是人，是譜，是不聽話的骨。',
    '青衡觀的饅頭仍熱。熱的下面是宗。外門是臉。臉要笑。刀在冊上。這一角真相，你信誰。',
  ],
  choices: [
    { text: '信殘頁', setFlags: { c34: 'page', purge_known: 1, reveal_lean: '+1' }, to: 'c34_out' },
    { text: '去問衛正言', setFlags: { c34: 'wei', met_wei: 1, climb_lean: '+1' }, to: 'c34_out' },
    { text: '去問謝承淵', setFlags: { c34: 'xie', met_xie: 1, flee_lean: '+1' }, to: 'c34_out' },
  ],
});
SCENES.c34_out = (state) => {
  const k = state.flags.c34;
  const paras = k === 'page'
    ? ['你把殘頁對著側門的光。香、火漆、清繳，同一種苦。沒有人替你簽字。簽字的是你自己的眼。', '阿禾聽你說完，沒勸你忘。「揭，要有比嘴硬的東西。你現在有紙。紙怕火。」']
    : k === 'wei'
      ? ['衛正言聽完，鬚仍整齊。「清繳是先朝的話。外門勿傳。傳，則亂。」他拍你的肩，力道像父。', '父的掌，有時按人。你退出時，看見他袖口那點紅，仍在。']
      : ['謝承淵沉默很久。「有些箱，不是藥。我攬過，因為不攬，死的是外門。」他沒否認清繳。', '「你要活，把這兩個字咽回去。」他給你茶，仍不給你盞。傘又撐了一角。'];
  return { loc: k === 'wei' ? '內廊·衛正言' : k === 'xie' ? '側廊·謝承淵' : '側門·清繳', paras, setFlags: { purge_known: 1 }, next: '__hub_done__' };
};

SCENES.c35 = () => ({
  loc: '外門·三方',
  paras: [
    '同一日。陳肅召你核冊。謝承淵使人來請安。衛正言的雜役說長老有話給外門可教者。',
    '三方逼近。不是巧。是篩。篩還能站在誰的影子裡。你見誰。',
  ],
  choices: [
    { text: '見陳肅', setFlags: { c35: 'chen', met_chen: 1, climb_lean: '+1' }, to: 'c35_out' },
    { text: '見謝承淵', setFlags: { c35: 'xie', met_xie: 1, flee_lean: '+1' }, to: 'c35_out' },
    { text: '見衛正言', setFlags: { c35: 'wei', met_wei: 1, reveal_lean: '+1' }, to: 'c35_out' },
  ],
});
SCENES.c35_out = (state) => {
  const k = state.flags.c35;
  const paras = k === 'chen'
    ? ['陳肅把薄冊翻到你名。「可薦。可核。可除。三個字我都有筆。」他看你選哪一支筆。', '你沒選。他已經把「可核」點上。點上的人，離刀近，離地也近。']
    : k === 'xie'
      ? ['謝承淵說：「別見另外兩位。見了，你就是兩邊的人。兩邊的人，陳執法最厭。」', '他把一封素箋塞給你：「明日側門。有事，我擔。」擔了太多次。多次的擔，像網。']
      : ['衛正言在內廊等你。燈亮。「你那夜沒死，是青衡的氣。氣要用在正處。」', '他說正處的時候，你想起火。想起青袍無灰。他的袍，今晚也無灰。'];
  return { loc: k === 'chen' ? '值事房·陳肅' : k === 'xie' ? '側廊·謝承淵' : '內廊·衛正言', paras, next: '__hub_done__' };
};

SCENES.c36 = () => ({
  loc: '值事房·薦冊',
  paras: [
    '你的名進了備選薦冊。不是小滿那種灶房邊，是正薦旁邊的備。備，就是下一輛車。',
    '陳肅把冊攤開，硃筆懸著。「求劃，求寫，替人說，或沉默。外門少有人自己開口。開口的，我聽。」阿禾若還在，他的名不在這頁。小滿的名在邊上，像舊草鞋。',
  ],
  setFlags: { player_listed: 1, met_chen: 1 },
  choices: [
    { text: '求劃掉', setFlags: { c36: 'cut', flee_lean: '+1' }, to: 'c36_out' },
    { text: '求寫上正薦', setFlags: { c36: 'up', player_zheng: 1, climb_lean: '+1' }, to: 'c36_out' },
    { text: '替阿禾說', setFlags: { c36: 'he', reveal_lean: '+1' }, to: 'c36_out' },
  ],
});
SCENES.c36_out = (state) => {
  const k = state.flags.c36;
  const paras = k === 'cut'
    ? ['「劃掉。」陳肅看你，像看無骨，又像看還想活的。「劃了，仍在我眼裡。」筆尖走。你的名淡了，沒消失。', '逃的第一步，常是求人不寫。求人的逃，仍在冊上。']
    : k === 'up'
      ? ['「寫上。」硃砂落。正薦。衛正言後日會看見這頁。看見，就是被選。', '阿禾若聽見，會把饅頭塞進你手裡，說你瘋了。瘋，是往上。']
      : ['「阿禾不是黨。」你說。陳肅筆尖在阿禾空著的格上停。「你用自己的備選換他的活？」他沒答應。也沒拒絕。', '次日阿禾的掃階罰滿了。他還在。你的名更顯。顯給誰看，你知道。'];
  return { loc: '值事房·陳肅', paras, next: '__hub_done__' };
};

SCENES.c37 = () => ({
  loc: '內門虛掩',
  paras: [
    '內門又虛掩。這次不是夜風。是有人要你看見，或要你死在看見裡。',
    '縫裡有香，有數名的聲音，有青袍一角。阿禾在外庭假裝掃地，掃得極響，像給你打掩。探，聽，還是叫人。',
  ],
  choices: [
    { text: '探進去', setFlags: { c37: 'in', reveal_lean: '+1' }, to: 'c37_out' },
    { text: '在檻外聽', setFlags: { c37: 'listen', climb_lean: '+1' }, to: 'c37_out' },
    { text: '叫阿禾一起', setFlags: { c37: 'he', he_bond: 1, flee_lean: '+1' }, to: 'c37_out' },
  ],
});
SCENES.c37_out = (state) => {
  const k = state.flags.c37;
  let paras;
  if (k === 'in') paras = ['你側身進縫。裡頭在點「可繳」的名。有舊姓的偏旁。有外門的職。沒有饅頭。', '有人回頭。你退。退的時候衣角沾了香灰。灰的味，是滅門夜的味。'];
  else if (k === 'listen') paras = ['你貼門。聽壁息的路數用在這兒。裡頭說：「外門備選，過篩。篩剩的，可點。」點這個字，你肚子裡的熱應了一下。', '你沒進。聽已經夠把人變成證。證還不是揭。'];
  else if (state.flags.he_to_cart) paras = ['你回頭。夾道空。阿禾在車上。你一個人聽門縫。門縫不認人。', '你把響帚的活自己做了。做完，縫還在。'];
  else paras = ['阿禾進來半步，臉白。「別再往裡。裡頭在點人。」他拽你袖。你們退出。', '兩個人的腳印在檻外。成串的證據。也是成串的活。'];
  return { loc: k === 'he' ? '內門虛掩·阿禾' : '內門虛掩', paras, setFlags: { inner_ajar: 1 }, next: '__hub_done__' };
};

SCENES.c38 = () => ({
  loc: '內門側殿·不像拳腳',
  paras: [
    '側殿的香、火漆、殘香，三樣擺在一起。不像拳腳。不像外門練的那些。像裁人的儀式。',
    '滅門夜的香是這一種。庫房箱上的火漆是這一種。衛正言袖口那點紅，也是。收，說，還是裝掃地。',
  ],
  choices: [
    { text: '收香灰', setFlags: { c38: 'ash', ash_token: 1, reveal_lean: '+1' }, to: 'c38_out' },
    { text: '對阿禾說', setFlags: { c38: 'he', he_bond: 1, reveal_lean: '+1' }, to: 'c38_out' },
    { text: '假裝掃地', setFlags: { c38: 'sweep', climb_lean: '+1' }, to: 'c38_out' },
  ],
});
SCENES.c38_out = (state) => {
  const k = state.flags.c38;
  const paras = k === 'ash'
    ? ['香灰進紙包。紙包進鞋，挨著牙牌。腳心兩塊硌。走起路來像踩著兩種字：薦，與繳。', '不像拳腳的東西，才是這座觀的功法。']
    : k === 'he'
      ? ['阿禾聞了香，嘔。「這不是祭神。這是祭冊。」他擦嘴，「你要揭，這味比嘴硬。你要走，把味帶走。你要爬——」他看你，「爬的人穿這香。」', '你們把側殿的灰掃回爐。掃回不是沒有。是暫時。']
      : ['你掃地。把殘香掃進爐。內門雜役看你一眼，「外門也懂事。」懂事就是把證據當灰。', '灰仍香。香仍在袖口。你裝成掃帚。掃帚有時比人安全。'];
  return { loc: k === 'he' ? '內門側殿·阿禾' : '內門側殿·不像拳腳', paras, next: '__hub_done__' };
};

SCENES.c39 = () => ({
  loc: '內門廊·青袍',
  paras: [
    '青袍從廊轉出來。裁。滅門夜你見過的那種無灰。這次你看清了鬚。衛正言。最義正的那種正。',
    '他對你笑，像講法那日。「外門亦是門。你既看見門縫，便該進來，或回去睡覺。」當場揭，跟著走，還是退回觀。',
  ],
  setFlags: { met_wei: 1, saw_robe: 1 },
  choices: [
    { text: '當場揭', setFlags: { c39: 'call', reveal_lean: '+1' }, to: 'c39_out' },
    { text: '跟著走', setFlags: { c39: 'follow', climb_lean: '+1' }, to: 'c39_out' },
    { text: '退回觀', setFlags: { c39: 'back', flee_lean: '+1' }, to: 'c39_out' },
  ],
});
SCENES.c39_out = (state) => {
  const k = state.flags.c39;
  const paras = k === 'call'
    ? ['「那夜的青袍是你。」你說。廊上風停。衛正言仍笑。「孩子的夢，當不得冊。冊上寫的是清繳。清繳合法。」', '合法兩個字比刀快。他走過你身邊，袖口那點紅擦過你腕。像認。像警告。']
    : k === 'follow'
      ? ['你跟著。他帶你看內門的燈。「燈要有人添。添燈的人，不問燈下有沒有血。」', '他把一枚素箋給你：「可教。」可教就是可點。你把箋收下。收下不是跪。是還沒逃。']
      : ['你退。退回外門土階。阿禾在銀杏下等，「看見誰了。」你沒說。說了，他要成串。', '青袍在廊裡沒追。不追的人，更像已經把你寫進某一頁。'];
  return { loc: '內門廊·衛正言', paras, setFlags: { robe_is_wei: 1 }, next: '__hub_done__' };
};

SCENES.c40 = (state) => {
  const xieLine = (state.flags.xie_hold || 0) > 0 && !state.flags.wei_trust;
  return {
    loc: xieLine ? '側廊·謝承淵' : '雨廊·衛正言',
    paras: xieLine ? [
      '反轉來得不像刀——來得像雨。謝承淵把茶盞放下。「救你入觀的人，不是路遇。是衛長老的令。令上寫：火裡那顆種，可留。」',
      '「我知情。知情不是下手。下手的人穿青。我穿青，可我那夜不在你家。」他看你，「你要恨，恨令。你要爬，令也能把你托上去。你要走，我不能攔山門——攔了，是叛。」',
      '雨打廊。仇與恩在同一隻盞裡。',
    ] : [
      '反轉來得不像刀——來得像雨。衛正言立在你被救起的那種雨裡，雖然今夜無雨。「撈你的人，是我的令。火裡那顆種，可留。點過的，不可廢。」',
      '「你當那是路遇。路遇不入冊。入冊的是清繳餘種。」他鬚仍整齊。「恩是真的。仇也是。青衡要骨。骨從火裡揀。」',
      '你肚子裡那股熱，找到了主人。',
    ],
    setFlags: { savior_knew: 1, met_wei: 1 },
    choices: [
      { text: '質問', setFlags: { c40: 'ask', reveal_lean: '+1' }, to: 'c40_out' },
      { text: '還恩', setFlags: { c40: 'owe', climb_lean: '+1' }, to: 'c40_out' },
      { text: '先走', setFlags: { c40: 'go', flee_lean: '+1' }, to: 'c40_out' },
    ],
  };
};
SCENES.c40_out = (state) => {
  const k = state.flags.c40;
  const paras = k === 'ask'
    ? ['「為什麼留我。」他答得正：「因為你能用。能用的，比能殺的貴。」貴這個字，把人做成貨。', '你沒出手。出手是下一章。這一章只把恩撕開，看看裡頭的令。']
    : k === 'owe'
      ? ['你低頭。「命是觀的。」他很高興。高興得像講法。「外門亦是門。門要傳。」', '傳，就是你坐上某把椅子之前的那一級。恩把你綁在階上。']
      : ['你走。雨廊的水濺上你褲腳。沒有人攔。攔會把「叛」寫早。', '先走不是逃成。是把一口氣留到能選的時候。'];
  return { loc: '雨廊', paras, next: '__hub_done__' };
};

SCENES.c41 = () => ({
  loc: '外門通鋪·不可逆',
  paras: [
    '第一次不可逆。燈油還剩一截。阿禾若在，會把冷饃掰給你。不在，饃也在枕邊，不知誰放的。',
    '揭，是把清繳、青袍、點種，送到能聽見的耳朵——或自己當耳朵。爬，是把令當成梯，把椅子當成命。逃，是把真相帶出山門，不當英雄，當證人。',
    '選了，就不能用「還沒選」活。',
  ],
  choices: [
    { text: '揭', setFlags: { c41: 'reveal', path_reveal: 1, reveal_lean: '+5' }, to: 'c41_out' },
    { text: '爬', setFlags: { c41: 'climb', path_climb: 1, climb_lean: '+5' }, to: 'c41_out' },
    { text: '逃', setFlags: { c41: 'flee', path_flee: 1, flee_lean: '+5' }, to: 'c41_out' },
  ],
});
SCENES.c41_out = (state) => {
  const k = state.flags.c41;
  const line = k === 'reveal' ? '你把殘頁、牙牌、香灰，並成一疊。揭不是今晚就喊。是從此只往能喊的地方走。' : k === 'climb' ? '你把素箋放在功法冊最上。爬不是今晚就坐椅。是從此把令當成路。' : '你把包袱的繩先量好。逃不是今晚就翻山。是從此把出口當呼吸。';
  return { loc: '外門通鋪·不可逆', paras: [line, '寅時還會來。來了，仍要當差。差事會把你送到分叉那一頁。'], next: '__hub_done__' };
};

SCENES.c42 = () => ({
  loc: '試煉坪·仙路',
  paras: [
    '仙路試煉。名目漂亮。實為篩人。把門的內門立在坪上：「過者可入內聽氣。不過者，外門終老。逃者，叛。」',
    '薦冊上有名的，可以走中門。無名的，硬闖或翻牆。牆有刺。中門有香。篩開始了。',
  ],
  choices: [
    { text: '硬闖', setFlags: { c42: 'force', reveal_lean: '+1' }, to: 'c42_go' },
    { text: '用薦名走中門', setFlags: { c42: 'name', climb_lean: '+1' }, to: 'c42_go' },
    { text: '翻牆', setFlags: { c42: 'wall', flee_lean: '+1' }, to: 'c42_go' },
  ],
});
SCENES.c42_go = (state) => {
  const k = state.flags.c42;
  const line = k === 'name' ? '中門仍要試手。薦名不是免死。' : k === 'wall' ? '牆沒翻成。把門的內門已經攔在刺下。' : '把門的內門擋在你面前。「這門不是給外門開的。」';
  return { loc: '試煉坪·仙路', paras: [line], battle: { enemyId: 'keeper', onWin: 'c42_win', onLose: 'c42_lose' } };
};
SCENES.c42_win = () => ({ loc: '試煉坪·仙路', paras: ['把門的內門退了。他沒倒。倒了要填內冊。他只說：「過。過了，裡頭的氣會認你。」', '氣認你，是因為那夜的點。你走進燈裡。燈下有血的味道，很淡，像香。'], setFlags: { trial_pass: 1 }, next: '__hub_done__' });
SCENES.c42_lose = () => ({ loc: '試煉坪·仙路', paras: ['你跪在坪上。氣血一絲。把門的人懶得填死。「外門終老。記住。」', '終老不是結束。是把你放回掃帚。掃帚仍能揭，能爬，能逃。只是更慢。'], setFlags: { trial_fail: 1 }, next: '__hub_done__' });

SCENES.c43 = () => ({
  loc: '禁地·被點',
  paras: [
    '裡頭的氣告訴你一件事，或謝承淵終於說破，或你自己在脈上摸到那顆不屬於你的熱：潛力不是天賜。是當夜被人「點」過。',
    '點，是清繳的副產品。留種。種要長在觀裡，長成骨，長成椅，長成下一場清繳的筆。恨，用完，還是卸掉。',
  ],
  choices: [
    { text: '恨點你的人', setFlags: { c43: 'hate', reveal_lean: '+1' }, to: 'c43_out' },
    { text: '把點用完', setFlags: { c43: 'use', climb_lean: '+1' }, to: 'c43_out' },
    { text: '想把點卸掉', setFlags: { c43: 'shed', flee_lean: '+1' }, to: 'c43_out' },
  ],
});
SCENES.c43_out = (state) => {
  const k = state.flags.c43;
  if (k === 'hate') return { loc: '禁地·被點', paras: ['恨讓熱聽話。熱聽話就成刀。刀仍是他們給的。你知道。你仍握。', '阿禾若在，會說：「恨比饅頭頂飽。飽了，別把自己吃掉。」'], effects: { atk: 1 }, next: '__hub_done__' };
  if (k === 'use') return { loc: '禁地·被點', paras: ['你把點當自己的。當自己的，才爬得上去。上去的人，很少再問種從哪來。', '衛正言會喜歡這種用。喜歡，就是成功。'], effects: { atk: 1, maxHp: 2 }, next: '__hub_done__' };
  return { loc: '禁地·被點', paras: ['你調息，想把那顆熱吐出去。吐不乾淨。可你吐了。吐了，就不是全給他們用。', '卸不掉的東西，也能不當主人。逃的人，先逃成為兵器。'], effects: { maxMp: 2 }, next: '__hub_done__' };
};

SCENES.c44 = () => ({
  loc: '內廊·衛正言',
  paras: [
    '仇與恩對折。衛正言立在你面前，像門規。謝承淵在廊外，像傘。陳肅的冊在案上，像刀。',
    '滅門、撈你、點你、養你、薦你，都是同一隻手的五指。你要報仇，問一句為什麼，還是跪下。',
  ],
  setFlags: { met_wei: 1 },
  choices: [
    { text: '報仇', setFlags: { c44: 'venge', reveal_lean: '+1' }, to: 'c44_out' },
    { text: '問一句為什麼', setFlags: { c44: 'why', flee_lean: '+1' }, to: 'c44_out' },
    { text: '跪下', setFlags: { c44: 'kneel', climb_lean: '+1' }, to: 'c44_out' },
  ],
});
SCENES.c44_out = (state) => {
  const k = state.flags.c44;
  const paras = k === 'venge'
    ? ['你說要報。衛正言點頭，像聽一個孩子說要長大。「報，也要按冊。按冊的報，叫整肅。我可以教你。」', '他把仇收進門規裡。你若跟，仇就變成他的刀。你若不服，下一場才是真報。']
    : k === 'why'
      ? ['「為什麼我家。」他答：「因為不聽話的譜，會生不聽話的人。清繳是護門。護門要血。」', '一句夠了。夠你走。夠你揭。夠你把這句帶出山門。他以為為什麼能把人留下。留下的是字，不是你。']
      : ['你跪。額抵他靴前的青石。他扶你，力道仍像父。「外門亦是門。門要人守。」', '守門的人，有時就是門本身。你起身時，膝蓋上的灰，像印。'];
  return { loc: '內廊·衛正言', paras, next: '__hub_done__' };
};

SCENES.c45 = () => ({
  loc: '執法堂·陳肅',
  paras: [
    '陳肅把一本舊冊翻給你看。童年的名在上面。舊姓。火那夜的旁注：可留，已點。硃砂新過一次。',
    '「我是筆。」他說，不辯。「筆不決定砍誰。筆決定砍得乾不乾淨。你要撕，抄，還是求我劃。」他的眼睛沒有喜怒。像硯。',
  ],
  setFlags: { met_chen: 1 },
  choices: [
    { text: '撕冊', setFlags: { c45: 'tear', reveal_lean: '+1' }, to: 'c45_out' },
    { text: '抄一頁', setFlags: { c45: 'copy', page_copy: 1, flee_lean: '+1' }, to: 'c45_out' },
    { text: '求他劃', setFlags: { c45: 'cut', climb_lean: '+1' }, to: 'c45_out' },
  ],
});
SCENES.c45_out = (state) => {
  const k = state.flags.c45;
  const paras = k === 'tear'
    ? ['紙聲很響。陳肅沒攔。「撕的是抄件。正本在衛長老處。」他幾乎給你一個讚：「至少你動手了。」', '動手比求乾淨。乾淨不是完。完在正本。']
    : k === 'copy'
      ? ['你抄。舊姓、可留、已點。陳肅看著你抄，像看人把刀藏進袖。「帶出去，是叛。留在袖裡，是證。」', '你把抄件貼進夾層。逃的人要有紙。揭的人也要。']
      : ['「劃掉。」他劃了抄件上的名。正本他不碰。「我只能劃我能劃的。這就是筆。」', '你欠他一筆。欠筆的人，常去當下一支筆。'];
  return { loc: '執法堂·陳肅', paras, next: '__hub_done__' };
};

SCENES.c46 = () => ({
  loc: '外門通鋪·終局前夜',
  paras: [
    '終局前夜。饅頭冷了。小滿若還在，會把草鞋藏進筐。阿禾若還在，會說：「別一個人。」謝承淵的燈在側門。陳肅的冊合著。衛正言的正言在廊上走動。',
    '你把三條路收到枕下：約人揭；把把柄交給上層，換椅；打好包袱。明天分叉。今夜只選你把力氣放在哪。',
  ],
  choices: [
    { text: '約人揭', setFlags: { c46: 'reveal', reveal_lean: '+2' }, to: 'c46_out' },
    { text: '把把柄交上層', setFlags: { c46: 'climb', climb_lean: '+2' }, to: 'c46_out' },
    { text: '打好包袱', setFlags: { c46: 'flee', flee_lean: '+2' }, to: 'c46_out' },
  ],
});
SCENES.c46_out = (state) => {
  const k = state.flags.c46;
  const line = k === 'reveal' ? '你約了還肯聽的人。人數很少。很少也是眾。' : k === 'climb' ? '你把殘頁與牙牌送到該送的袖裡。袖收了，椅就近了。' : '包袱很輕。輕的是衣。重的是紙。紙在貼肉的那一層。';
  return { loc: '外門通鋪·終局前夜', paras: [line, '鼓還沒響。你睡。不是因為無事。是因為寅時會把人送到第十七次站樁，或第一次真正的門。'], next: '__hub_done__' };
};
SCENES.c47 = (state) => {
  const t = endingTrack(state.flags);
  if (t === 'reveal') {
    return {
      loc: '執法堂階·分叉',
      paras: [
        '揭。你把清繳、青袍、點種，當眾攤在執法堂階上。外門有人低頭。內門有人微笑。',
        '衛正言立在門裡，仍正。「夢與香灰，當不得冊。」陳肅的筆懸著，看你要刀還是要字。把門的人已經下階。對質要過手。',
      ],
      choices: [
        { text: '對質衛正言', setFlags: { c47: 'wei' }, to: 'c47_rev_go' },
        { text: '逼陳肅下筆', setFlags: { c47: 'chen' }, to: 'c47_rev_go' },
        { text: '讓外門聽見', setFlags: { c47: 'crowd' }, to: 'c47_rev_go' },
      ],
    };
  }
  if (t === 'climb') {
    return {
      loc: '內門·分叉',
      paras: [
        '爬。椅子就在檻內。衛正言要你過最後一門：把外門的舊自己按回去。把門的內門是試，也是祭。',
        '謝承淵在廊上不攔。不攔就是準。陳肅已經把你的名寫在可教那一欄。怎麼坐上去。',
      ],
      choices: [
        { text: '按門規坐', setFlags: { c47: 'rule' }, to: 'c47_cl_go' },
        { text: '踩著把柄坐', setFlags: { c47: 'leverage' }, to: 'c47_cl_go' },
        { text: '先把攔路的人打退', setFlags: { c47: 'force' }, to: 'c47_cl_go' },
      ],
    };
  }
  return {
    loc: '山門·分叉',
    paras: [
      '逃。包袱在肩。山門那一側的燈亮。巡夜與把門的人不會當這是夜風。',
      '你要帶的是真相：清繳、舊姓、點種。不是功名。阿禾若在，會問你帶不帶他。車若在，你不回頭。怎麼出。',
    ],
    choices: [
      { text: '硬闖山門', setFlags: { c47: 'gate' }, to: 'c47_fl_go' },
      { text: '走側門銀杏', setFlags: { c47: 'side' }, to: 'c47_fl_go' },
      { text: '趁虛掩', setFlags: { c47: 'ajar' }, to: 'c47_fl_go' },
    ],
  };
};
SCENES.c47_rev_go = () => ({ loc: '執法堂階·分叉', paras: ['執法堂弟子下階。成串的喝，這次對著揭的人。衛正言的正言在門裡。'], battle: { enemyId: 'enforcer', onWin: 'c47_win', onLose: 'c47_lose' } });
SCENES.c47_cl_go = () => ({ loc: '內門·分叉', paras: ['把門的內門攔在椅前。「這門不是給外門開的。除非你不再是外門。」'], battle: { enemyId: 'keeper', onWin: 'c47_win', onLose: 'c47_lose' } });
SCENES.c47_fl_go = () => ({ loc: '山門·分叉', paras: ['巡夜的燈罩砸過來。「夜禁！帶包袱的，當逃。」逃，在冊上是叛。在你腳下是路。'], battle: { enemyId: 'patrol', onWin: 'c47_win', onLose: 'c47_lose' } });
SCENES.c47_win = (state) => {
  const t = endingTrack(state.flags);
  const line = t === 'reveal'
    ? '他退了。階上有人聽見清繳。聽見不是完。是開始有縫。衛正言的笑淡了一寸。淡一寸，就夠你走進尾聲。'
    : t === 'climb'
      ? '他把路讓開。椅子近了。近得能看見扶手上的舊汗。前人坐過。前人清繳過。現在輪到你的手。'
      : '燈籠滾在山門下。你跨過檻。檻外的風不香。不香就是活。包袱裡的紙還在。';
  return { loc: t === 'flee' ? '山門·分叉' : t === 'climb' ? '內門·分叉' : '執法堂階·分叉', paras: [line, '這一場算你。下一場是日子。日子叫尾聲。'], setFlags: { c47_win: 1 }, next: '__hub_done__' };
};
SCENES.c47_lose = (state) => {
  const t = endingTrack(state.flags);
  const line = t === 'reveal'
    ? '你跪在階上。可字已經出口。出口的字，跪不回去。衛正言讓人把你拖進尾聲——尾聲仍是揭過的門。'
    : t === 'climb'
      ? '你跪。膝上的灰仍像印。印夠了。他們仍讓你坐——坐一個低頭的椅。椅仍是椅。'
      : '你跪在山門外的土上。氣血一絲。可你已經在門外。門外就是逃成的一半。另一半是路。';
  return { loc: t === 'flee' ? '山門·分叉' : t === 'climb' ? '內門·分叉' : '執法堂階·分叉', paras: [line, '敗也不把你送回第零章。門規不給結束。尾聲仍要你自己走。'], setFlags: { c47_lose: 1 }, next: '__hub_done__' };
};

SCENES.c48 = (state) => {
  const t = endingTrack(state.flags);
  if (t === 'reveal') {
    return {
      loc: '揭開後的門',
      paras: [
        '揭開後的門仍是門。青衡觀的饅頭還在蒸。有人罵你多事。有人把劉三的空格用手指描了一遍。陳肅在冊邊寫了「另核」。另核不是勝。是縫。',
        '衛正言沒倒。正的人很少倒給外門看。他只是少了一寸正。少一寸，外門就能喘氣。你站在門檻上。門開了。開了還要人守——守的是縫，不是謊。',
      ],
      choices: [
        { text: '留下守縫', setFlags: { c48: 'stay' }, to: 'c48_out' },
        { text: '把紙送到鎮裡', setFlags: { c48: 'town' }, to: 'c48_out' },
        { text: '回頭看阿禾一眼', setFlags: { c48: 'he' }, to: 'c48_out' },
      ],
    };
  }
  if (t === 'climb') {
    return {
      loc: '那把椅子',
      paras: [
        '你坐上那把椅子。扶手有舊汗。汗裡有清繳。有薦。有劉三。有你童年的名。',
        '外門仍掃地。饅頭仍麥麩。你沒忘自己從哪一階爬上來。忘了，就真成衛正言。謝承淵來揖。陳肅把筆擱在你案上。筆比刀乾淨。你知道乾淨的意思。',
      ],
      choices: [
        { text: '把筆擱下', setFlags: { c48: 'pen' }, to: 'c48_out' },
        { text: '把外門月例加一寸', setFlags: { c48: 'pay' }, to: 'c48_out' },
        { text: '看向山門的縫', setFlags: { c48: 'ajar' }, to: 'c48_out' },
      ],
    };
  }
  return {
    loc: '山門外的路',
    paras: [
      '山門外的路不香。不香就是活。你袖裡有抄件，鞋裡或有牙牌，心裡有清繳兩個字。',
      '青衡仍在山裡蒸饅頭。有人會把你的名寫成叛。叛比除乾淨，也更死——他們以為。你還在走。走的人沒死。路分三岔。岔仍是你的。',
    ],
    choices: [
      { text: '往鎮東祠', setFlags: { c48: 'shrine' }, to: 'c48_out' },
      { text: '把紙藏進無人的山', setFlags: { c48: 'hide' }, to: 'c48_out' },
      { text: '不回頭', setFlags: { c48: 'on' }, to: 'c48_out' },
    ],
  };
};
SCENES.c48_out = (state) => {
  const t = endingTrack(state.flags);
  const k = state.flags.c48;
  let extra = '日子還長。長的日子叫當差。';
  if (t === 'reveal') {
    extra = k === 'town' ? '鎮裡有人開始在井邊說清繳。說，就是縫。' : k === 'he' ? (state.flags.he_to_cart ? '車上沒人。你看的是空。空也是看見。' : '阿禾在銀杏下。饅頭還有半個。他說：「揭完仍要吃。」') : '你守縫。縫裡有風。風比香乾淨。';
  } else if (t === 'climb') {
    extra = k === 'pay' ? '外門月例加一寸。一寸買不回劉三。一寸能讓小滿少穿一雙假鞋。' : k === 'ajar' ? '你讓山門仍虛掩。虛掩是你坐上椅子之後還肯留的縫。' : '筆在案上。你暫時不寫除。不寫，就是一種權。';
  } else {
    extra = k === 'shrine' ? '祠裡的牌位沒了。你把抄件壓在香灰下。灰認得舊姓。' : k === 'hide' ? '紙進石縫。石縫不入冊。不入冊的東西活得久。' : '你不回頭。山門的燈在背後滅了一盞。滅了也能走。';
  }
  return {
    loc: t === 'reveal' ? '揭開後的門' : t === 'climb' ? '那把椅子' : '山門外的路',
    paras: [
      extra,
      '四十八章到此。沒有偽的第四十九章。外門還在。功法還在腰上。天亮之後，仍可煉，仍要準備下一回差事。門規不給結束。你給自己一個完。完了，仍是你。',
    ],
    setFlags: { tale_done: 1 },
    next: '__hub_done__',
  };
};

SCENES.errand = (state) => {
  const t = endingTrack(state.flags);
  const tail = t === 'reveal'
    ? '揭開之後，門仍要人守。你守的是縫，不是謊。'
    : t === 'climb'
      ? '椅子是你的了。外門的掃帚還在。你沒忘自己從哪一階爬上來。'
      : '你已出過山門。有時仍回來當差——像一個人把自己的舊名字借給這座觀。';
  return {
    loc: '外門',
    paras: [
      '寅時。通鋪潮，土階乾。' + tail,
      '值事點差：掃外庭、下山兌散、幫灶房搬柴。沒有偽的下一幕。修煉仍可。功法仍在腰上。',
      '你仍是你。門規仍合法。合法的日子，還要過。',
    ],
    choices: [
      { text: '掃外庭', setFlags: { errand: 'sweep' }, to: 'errand_out' },
      { text: '下山兌散', setFlags: { errand: 'town' }, to: 'errand_out' },
      { text: '幫灶房搬柴', setFlags: { errand: 'wood' }, to: 'errand_out' },
    ],
  };
};
SCENES.errand_out = (state) => {
  const k = state.flags.errand;
  if (k === 'town') return { loc: '青陽鎮·下山', paras: ['青陽鎮仍喊戲文。止血散四文。你兌了一包，或只是走一遭。', '舊姓若有人認得，也只點頭。點頭不入冊。'], effects: { hp: 2 }, next: '__hub_done__' };
  if (k === 'wood') return { loc: '灶房·小滿', paras: ['灶房的柴是濕的。小滿若還在，會把乾的留給你。若不在，筐仍在。', '饅頭焦邊仍甜。甜是外門的。'], effects: { hp: 4 }, next: '__hub_done__' };
  return { loc: '外庭', paras: ['外庭的葉還是那些葉。掃帚橫掃的路數還在臂骨裡。', '掃完。值事遠遠看了一眼，沒記功，也沒記過。'], effects: { mp: 2 }, next: '__hub_done__' };
};
