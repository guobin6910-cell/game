const SAVE_KEY = "frontierQuestSaveV1";

const RARITIES = {
  common: { name: "普通", color: 0xb8c8c0, power: 1 },
  uncommon: { name: "精良", color: 0x72d685, power: 1.25 },
  rare: { name: "稀有", color: 0x6cb7ff, power: 1.65 },
  epic: { name: "史詩", color: 0xc689ff, power: 2.15 },
  relic: { name: "遺物", color: 0xffc85a, power: 2.85 }
};

const SKILLS = [
  { id: "iron_lungs", name: "鋼鐵肺腑", text: "生命上限 +18", apply: p => { p.maxHp += 18; p.hp += 18; } },
  { id: "keen_edge", name: "銳刃心得", text: "攻擊 +4", apply: p => { p.attack += 4; } },
  { id: "warding_oath", name: "守誓護甲", text: "護甲 +3", apply: p => { p.armor += 3; } },
  { id: "trail_medic", name: "荒路醫術", text: "藥水治療 +16", apply: p => { p.potionPower += 16; } },
  { id: "quick_hands", name: "迅捷手腕", text: "暴擊率 +8%", apply: p => { p.crit += 0.08; } },
  { id: "gold_sense", name: "尋金直覺", text: "金幣收入 +25%", apply: p => { p.goldBonus += 0.25; } },
  { id: "second_wind", name: "第二口氣", text: "戰後恢復 8 生命", apply: p => { p.afterFightHeal += 8; } },
  { id: "storm_brand", name: "風暴烙印", text: "技能傷害 +35%", apply: p => { p.skillBonus += 0.35; } }
];

const ENEMIES = [
  { id: "wolf", name: "璃牙荒狼", asset: "wolf", hp: 44, attack: 9, armor: 1, xp: 20, gold: 14 },
  { id: "golem", name: "里程碑魔像", asset: "golem", hp: 68, attack: 12, armor: 4, xp: 30, gold: 18 },
  { id: "witch", name: "餘燼女巫", asset: "witch", hp: 54, attack: 15, armor: 2, xp: 34, gold: 22 }
];

const BOSSES = [
  { id: "ash_drake", name: "灰燼收稅龍", asset: "drake", hp: 150, attack: 18, armor: 5, xp: 105, gold: 75 },
  { id: "gate_drake", name: "邊境門龍", asset: "drake", hp: 220, attack: 25, armor: 8, xp: 180, gold: 150 }
];

const ITEM_NAMES = {
  weapon: ["拓荒者軍刀", "裂隙斬斧", "提燈長槍", "天鉤刃"],
  armor: ["防塵鎖甲", "玄武岩外套", "行旅板甲", "地平線背心"],
  trinket: ["羅盤戒指", "誓言護符", "星鑄硬幣", "風玻璃"]
};

const LEGACY_NAME_MAP = {
  "Dawn Road": "晨曦古道",
  "Ember Pass": "餘燼山道",
  "Merchant Mile": "商旅大道",
  "Quiet Ford": "寂靜淺灘",
  "Pioneer Saber": "拓荒者軍刀",
  "Rift Cleaver": "裂隙斬斧",
  "Lantern Pike": "提燈長槍",
  "Skyhook Blade": "天鉤刃",
  "Duster Mail": "防塵鎖甲",
  "Basalt Coat": "玄武岩外套",
  "Wayfarer Plate": "行旅板甲",
  "Horizon Vest": "地平線背心",
  "Compass Ring": "羅盤戒指",
  "Oath Charm": "誓言護符",
  "Star Coin": "星鑄硬幣",
  Windglass: "風玻璃",
  "Iron Lungs": "鋼鐵肺腑",
  "Keen Edge": "銳刃心得",
  "Warding Oath": "守誓護甲",
  "Trail Medic": "荒路醫術",
  "Quick Hands": "迅捷手腕",
  "Gold Sense": "尋金直覺",
  "Second Wind": "第二口氣",
  "Storm Brand": "風暴烙印"
};

const SLOT_NAMES = {
  weapon: "武器",
  armor: "護甲",
  trinket: "飾品"
};

const BUTTON_LABELS = {
  Start: "開始遠征",
  Continue: "繼續存檔",
  Attack: "攻擊",
  Skill: "技能",
  Potion: "藥水",
  Flee: "逃跑",
  Bag: "背包",
  Save: "存檔",
  Choice1: "選擇一",
  Choice2: "選擇二",
  Choice3: "選擇三",
  Equip: "裝備",
  Sell: "出售",
  BuyPotion: "買藥水",
  Leave: "離開"
};

const DEFAULT_PLAYER = {
  level: 1,
  xp: 0,
  nextXp: 70,
  hp: 110,
  maxHp: 110,
  attack: 12,
  armor: 2,
  crit: 0.08,
  gold: 55,
  potions: 3,
  potionPower: 36,
  goldBonus: 0,
  afterFightHeal: 0,
  skillBonus: 0,
  distance: 0,
  act: 1,
  bossEvery: 7,
  route: "晨曦古道",
  perks: [],
  inventory: [],
  equipment: {
    weapon: null,
    armor: null,
    trinket: null
  }
};

class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.svg("weapon", "assets/sprites/hero-weapon.svg", { width: 420, height: 260 });
    this.load.svg("wolf", "assets/sprites/beast-wolf.svg", { width: 360, height: 260 });
    this.load.svg("golem", "assets/sprites/stone-golem.svg", { width: 360, height: 280 });
    this.load.svg("witch", "assets/sprites/ember-witch.svg", { width: 340, height: 280 });
    this.load.svg("drake", "assets/sprites/boss-drake.svg", { width: 520, height: 330 });
    this.load.svg("shopkeeper", "assets/sprites/shopkeeper.svg", { width: 340, height: 280 });
    this.load.svg("logo", "assets/sprites/frontier-logo.svg", { width: 640, height: 200 });
    this.load.audio("hit", "assets/audio/hit.wav");
    this.load.audio("loot", "assets/audio/loot.wav");
    this.load.audio("level", "assets/audio/level.wav");
    this.load.audio("bgm", "assets/audio/frontier-loop.wav");
  }

  create() {
    this.scene.start("GameScene");
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.mode = "title";
    this.player = structuredClone(DEFAULT_PLAYER);
    this.enemy = null;
    this.turn = "player";
    this.travelTimer = 0;
    this.stepPulse = 0;
    this.routeChoices = [];
    this.skillChoices = [];
    this.shopStock = [];
    this.pendingAfterSkill = null;
    this.logLines = [];
    this.buttons = [];
  }

  create() {
    this.scale.on("resize", this.layout, this);
    this.createAudio();
    this.createWorld();
    this.createPanels();
    this.createButtons();
    this.showTitle();
    this.layout();
  }

  createAudio() {
    this.music = this.sound.add("bgm", { volume: 0.24, loop: true });
    this.sfx = {
      hit: this.sound.add("hit", { volume: 0.5 }),
      loot: this.sound.add("loot", { volume: 0.48 }),
      level: this.sound.add("level", { volume: 0.55 })
    };
  }

  createWorld() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor("#101418");
    this.sky = this.add.rectangle(0, 0, width, height, 0x223440).setOrigin(0);
    this.horizon = this.add.rectangle(0, height * 0.48, width, height * 0.16, 0x5c785f).setOrigin(0);
    this.road = this.add.graphics();
    this.sideLines = this.add.graphics();
    this.stars = Array.from({ length: 60 }, () => this.add.circle(Math.random() * width, Math.random() * height * 0.42, Math.random() * 1.7 + 0.7, 0xf5dca6, Math.random() * 0.75 + 0.15));
    this.posts = Array.from({ length: 9 }, (_, i) => this.add.rectangle(0, 0, 10, 52, 0x6d4d35).setDepth(1).setData("z", i / 9));
    this.weapon = this.add.image(width * 0.68, height * 0.74, "weapon").setDepth(8).setScale(0.72).setRotation(-0.12);
    this.enemySprite = this.add.image(width * 0.5, height * 0.44, "wolf").setDepth(5).setVisible(false);
    this.shopSprite = this.add.image(width * 0.5, height * 0.48, "shopkeeper").setDepth(5).setVisible(false);
    this.logo = this.add.image(width * 0.5, height * 0.23, "logo").setDepth(20);
  }

  createPanels() {
    this.topBar = this.add.rectangle(0, 0, 10, 10, 0x12191f, 0.92).setOrigin(0).setDepth(10);
    this.bottomPanel = this.add.rectangle(0, 0, 10, 10, 0x151d22, 0.94).setOrigin(0).setDepth(10);
    this.modalShade = this.add.rectangle(0, 0, 10, 10, 0x030506, 0.62).setOrigin(0).setDepth(18).setVisible(false);
    this.modal = this.add.rectangle(0, 0, 10, 10, 0x182228, 0.98).setStrokeStyle(2, 0xd2b36a, 0.8).setDepth(19).setVisible(false);
    this.titleText = this.add.text(0, 0, "", {
      fontFamily: "Georgia, serif",
      fontSize: "28px",
      color: "#f7d88b",
      align: "center"
    }).setOrigin(0.5).setDepth(21);
    this.subtitleText = this.add.text(0, 0, "", {
      fontFamily: "Segoe UI, Arial",
      fontSize: "16px",
      color: "#dce8df",
      align: "center",
      lineSpacing: 7,
      wordWrap: { width: 620 }
    }).setOrigin(0.5).setDepth(21);
    this.statsText = this.add.text(0, 0, "", {
      fontFamily: "Consolas, monospace",
      fontSize: "15px",
      color: "#f3ead0"
    }).setDepth(11);
    this.logText = this.add.text(0, 0, "", {
      fontFamily: "Segoe UI, Arial",
      fontSize: "16px",
      color: "#e7efe8",
      lineSpacing: 5,
      wordWrap: { width: 760 }
    }).setDepth(11);
    this.enemyText = this.add.text(0, 0, "", {
      fontFamily: "Segoe UI, Arial",
      fontSize: "20px",
      color: "#fff0d0",
      align: "center"
    }).setOrigin(0.5).setDepth(7);
    this.bagText = this.add.text(0, 0, "", {
      fontFamily: "Segoe UI, Arial",
      fontSize: "14px",
      color: "#dce8df",
      lineSpacing: 4,
      wordWrap: { width: 260 }
    }).setDepth(11);
  }

  createButtons() {
    const names = ["Start", "Continue", "Attack", "Skill", "Potion", "Flee", "Bag", "Save", "Choice1", "Choice2", "Choice3", "Equip", "Sell", "BuyPotion", "Leave"];
    this.buttons = names.map((name) => new GameButton(this, name));
  }

  layout() {
    const { width, height } = this.scale;
    this.sky.setSize(width, height * 0.52);
    this.horizon.setPosition(0, height * 0.43).setSize(width, height * 0.18);
    this.topBar.setSize(width, 78);
    this.bottomPanel.setPosition(0, height - 168).setSize(width, 168);
    this.modalShade.setSize(width, height);
    this.modal.setPosition(width * 0.5, height * 0.5).setSize(Math.min(720, width - 42), Math.min(420, height - 120));
    this.logo.setPosition(width * 0.5, height * 0.2).setScale(Math.min(0.72, width / 900)).setVisible(this.mode === "title");
    this.titleText.setPosition(width * 0.5, height * 0.32);
    this.subtitleText.setPosition(width * 0.5, height * 0.45);
    this.weapon.setPosition(width * 0.69, height * 0.72).setScale(Math.min(0.75, width / 1050));
    this.enemySprite.setPosition(width * 0.5, height * 0.43).setScale(Math.min(0.78, width / 880));
    this.shopSprite.setPosition(width * 0.5, height * 0.44).setScale(Math.min(0.78, width / 880));
    this.statsText.setPosition(20, 14);
    this.logText.setPosition(22, height - 148);
    this.bagText.setPosition(width - 292, 96);
    this.enemyText.setPosition(width * 0.5, height * 0.25);
    this.placeButtons();
    this.drawRoad();
  }

  placeButtons() {
    const { width, height } = this.scale;
    const y = height - 60;
    const combat = ["Attack", "Skill", "Potion", "Flee", "Bag", "Save"];
    combat.forEach((name, i) => this.getButton(name).place(24 + i * 122, y, 110, 38));
    ["Start", "Continue"].forEach((name, i) => this.getButton(name).place(width * 0.5 - 122 + i * 144, height * 0.62, 124, 42));
    ["Choice1", "Choice2", "Choice3"].forEach((name, i) => this.getButton(name).place(width * 0.5 - 255 + i * 170, height * 0.62, 154, 56));
    this.getButton("Equip").place(width - 286, height - 112, 82, 34);
    this.getButton("Sell").place(width - 196, height - 112, 82, 34);
    this.getButton("BuyPotion").place(width * 0.5 - 116, height * 0.72, 110, 38);
    this.getButton("Leave").place(width * 0.5 + 10, height * 0.72, 110, 38);
  }

  showTitle() {
    this.mode = "title";
    this.logo.setVisible(true);
    this.modalShade.setVisible(true);
    this.modal.setVisible(false);
    this.enemySprite.setVisible(false);
    this.shopSprite.setVisible(false);
    this.titleText.setText("邊境遠征");
    this.subtitleText.setText("自動前進的第一人稱邊境角色扮演遊戲\n探索道路、遭遇怪物、蒐集裝備、升級技能，並在每個首領前做出路線抉擇。");
    this.logLines = ["準備出發。存檔會保存在這個瀏覽器。"];
    this.refreshHud();
    this.showButtons(["Start", "Continue"]);
    this.getButton("Continue").setEnabled(Boolean(localStorage.getItem(SAVE_KEY)));
  }

  newRun() {
    this.player = structuredClone(DEFAULT_PLAYER);
    this.player.inventory.push(createItem(1, "weapon", "common"));
    this.player.inventory.push(createItem(1, "armor", "common"));
    this.equipItem(0, false);
    this.equipItem(0, false);
    this.startTravel("你踏上晨光邊境，靴底敲著古道節奏。");
    this.music.play();
  }

  loadRun() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    try {
      this.player = JSON.parse(raw);
      this.normalizePlayer();
      this.startTravel("讀取存檔。邊境的風又開始推著你往前。");
      this.music.play();
    } catch {
      this.addLog("存檔損壞，無法讀取。");
    }
  }

  normalizePlayer() {
    const merged = structuredClone(DEFAULT_PLAYER);
    Object.assign(merged, this.player);
    merged.equipment = Object.assign({ weapon: null, armor: null, trinket: null }, merged.equipment || {});
    merged.inventory = Array.isArray(merged.inventory) ? merged.inventory : [];
    merged.perks = Array.isArray(merged.perks) ? merged.perks : [];
    merged.route = translateLegacyText(merged.route);
    merged.perks = merged.perks.map(translateLegacyText);
    merged.inventory.forEach(translateLegacyItem);
    Object.values(merged.equipment).forEach(translateLegacyItem);
    this.player = merged;
  }

  startTravel(message) {
    this.mode = "travel";
    this.enemy = null;
    this.routeChoices = [];
    this.shopStock = [];
    this.modalShade.setVisible(false);
    this.modal.setVisible(false);
    this.logo.setVisible(false);
    this.enemySprite.setVisible(false);
    this.shopSprite.setVisible(false);
    this.titleText.setText("");
    this.subtitleText.setText("");
    this.enemyText.setText("");
    this.travelTimer = 0;
    this.addLog(message);
    this.showButtons(["Bag", "Save"]);
    this.refreshHud();
  }

  update(_time, delta) {
    if (this.mode === "travel") {
      this.stepPulse += delta * 0.003;
      this.player.distance += delta * 0.0018;
      this.travelTimer += delta;
      this.animateTrail(delta);
      if (this.travelTimer > 2600) {
        this.travelTimer = 0;
        this.rollEvent();
      }
      this.refreshHud();
    } else {
      this.animateTrail(delta * 0.25);
    }
  }

  animateTrail(delta) {
    this.posts.forEach((post) => {
      let z = post.getData("z") + delta * 0.00035;
      if (z > 1) z -= 1;
      post.setData("z", z);
      const { width, height } = this.scale;
      const side = post.getData("side") || (Math.random() > 0.5 ? 1 : -1);
      post.setData("side", side);
      const y = height * (0.48 + z * 0.44);
      const spread = width * (0.1 + z * 0.42);
      post.setPosition(width * 0.5 + side * spread, y);
      post.setScale(0.35 + z * 1.55);
      post.setAlpha(0.25 + z * 0.75);
    });
    this.weapon.y = this.scale.height * 0.72 + Math.sin(this.stepPulse) * 6;
    this.weapon.rotation = -0.12 + Math.sin(this.stepPulse * 0.7) * 0.025;
    this.stars.forEach((s, i) => s.setAlpha(0.18 + Math.sin(this.stepPulse * 0.2 + i) * 0.08 + 0.35));
    this.drawRoad();
  }

  drawRoad() {
    const { width, height } = this.scale;
    const cx = width * 0.5;
    this.road.clear();
    this.road.fillStyle(0x3a3430, 1);
    this.road.beginPath();
    this.road.moveTo(cx - 80, height * 0.49);
    this.road.lineTo(cx + 80, height * 0.49);
    this.road.lineTo(width * 0.92, height);
    this.road.lineTo(width * 0.08, height);
    this.road.closePath();
    this.road.fillPath();
    this.road.lineStyle(4, 0xd7b56b, 0.45);
    for (let i = 0; i < 7; i += 1) {
      const z = ((this.stepPulse * 0.07 + i / 7) % 1);
      const y = height * (0.52 + z * 0.47);
      const half = 8 + z * width * 0.28;
      this.road.strokeLineShape(new Phaser.Geom.Line(cx - half, y, cx + half, y));
    }
  }

  rollEvent() {
    const node = Math.floor(this.player.distance);
    if (node > 0 && node % this.player.bossEvery === 0) {
      this.startBoss();
      return;
    }
    const r = Math.random();
    if (r < 0.48) this.startCombat(false);
    else if (r < 0.63) this.showBranch();
    else if (r < 0.76) this.showShop();
    else if (r < 0.88) this.findTreasure();
    else this.camp();
  }

  startCombat(isElite) {
    const base = Phaser.Utils.Array.GetRandom(ENEMIES);
    const scale = 1 + (this.player.act - 1) * 0.28 + Math.floor(this.player.distance / 6) * 0.12 + (isElite ? 0.42 : 0);
    this.enemy = {
      ...base,
      name: isElite ? `菁英${base.name}` : base.name,
      maxHp: Math.round(base.hp * scale),
      hp: Math.round(base.hp * scale),
      attack: Math.round(base.attack * scale),
      armor: Math.round(base.armor * scale),
      xp: Math.round(base.xp * scale),
      gold: Math.round(base.gold * scale),
      elite: isElite
    };
    this.mode = "combat";
    this.turn = "player";
    this.enemySprite.setTexture(this.enemy.asset).setVisible(true).setAlpha(1);
    this.shopSprite.setVisible(false);
    this.addLog(`${this.enemy.name} 擋在路中央。`);
    this.showButtons(["Attack", "Skill", "Potion", "Flee", "Bag", "Save"]);
    this.refreshHud();
  }

  startBoss() {
    const base = BOSSES[Math.min(this.player.act - 1, BOSSES.length - 1)];
    const scale = 1 + (this.player.act - 1) * 0.35;
    this.enemy = {
      ...base,
      maxHp: Math.round(base.hp * scale),
      hp: Math.round(base.hp * scale),
      attack: Math.round(base.attack * scale),
      armor: Math.round(base.armor * scale),
      xp: Math.round(base.xp * scale),
      gold: Math.round(base.gold * scale),
      boss: true
    };
    this.mode = "combat";
    this.enemySprite.setTexture(this.enemy.asset).setVisible(true);
    this.addLog(`首領 ${this.enemy.name} 從邊境門柱上俯衝而下。`);
    this.showButtons(["Attack", "Skill", "Potion", "Bag", "Save"]);
    this.refreshHud();
  }

  attack(skill = false) {
    if (this.mode !== "combat" || this.turn !== "player") return;
    const base = this.totalAttack() * (skill ? 1.75 + this.player.skillBonus : 1);
    const crit = Math.random() < this.totalCrit();
    const damage = Math.max(3, Math.round(base * (crit ? 1.75 : 1) - this.enemy.armor + Phaser.Math.Between(-2, 3)));
    this.enemy.hp = Math.max(0, this.enemy.hp - damage);
    this.sfx.hit.play();
    this.tweens.add({ targets: this.enemySprite, x: this.enemySprite.x + 18, yoyo: true, duration: 60, repeat: 2 });
    this.addLog(`${skill ? "你釋放邊境技" : "你揮劍"}造成 ${damage} 傷害${crit ? "，暴擊！" : "。"}`);
    if (this.enemy.hp <= 0) {
      this.winCombat();
      return;
    }
    this.turn = "enemy";
    this.time.delayedCall(550, () => this.enemyAttack());
    this.refreshHud();
  }

  enemyAttack() {
    if (this.mode !== "combat" || !this.enemy) return;
    const damage = Math.max(1, this.enemy.attack - this.totalArmor() + Phaser.Math.Between(-2, 3));
    this.player.hp = Math.max(0, this.player.hp - damage);
    this.cameras.main.shake(120, 0.006);
    this.addLog(`${this.enemy.name} 反擊，造成 ${damage} 傷害。`);
    if (this.player.hp <= 0) {
      this.gameOver();
      return;
    }
    this.turn = "player";
    this.refreshHud();
  }

  usePotion() {
    if (this.player.potions <= 0) {
      this.addLog("沒有藥水了。");
      return;
    }
    this.player.potions -= 1;
    const heal = Math.min(this.player.maxHp - this.player.hp, this.player.potionPower);
    this.player.hp += heal;
    this.addLog(`你喝下藥水，恢復 ${heal} 生命。`);
    if (this.mode === "combat") {
      this.turn = "enemy";
      this.time.delayedCall(450, () => this.enemyAttack());
    }
    this.refreshHud();
  }

  flee() {
    if (this.enemy?.boss) {
      this.addLog("首領封鎖了退路。");
      return;
    }
    if (Math.random() < 0.58) this.startTravel("你甩開敵人，重新踏上道路。");
    else {
      this.addLog("逃跑失敗。");
      this.enemyAttack();
    }
  }

  winCombat() {
    const gold = Math.round(this.enemy.gold * (1 + this.player.goldBonus));
    this.player.gold += gold;
    this.player.xp += this.enemy.xp;
    this.player.hp = Math.min(this.player.maxHp, this.player.hp + this.player.afterFightHeal);
    this.sfx.loot.play();
    this.addLog(`擊敗 ${this.enemy.name}，獲得 ${this.enemy.xp} 經驗與 ${gold} 金幣。`);
    if (Math.random() < (this.enemy.boss ? 1 : this.enemy.elite ? 0.82 : 0.58)) {
      const item = createItem(this.player.level, undefined, rollRarity(this.enemy.boss));
      this.player.inventory.push(item);
      this.addLog(`掉落：${item.name}【${RARITIES[item.rarity].name}】。`);
    }
    const bossWin = this.enemy.boss;
    this.enemy = null;
    this.enemySprite.setVisible(false);
    this.checkLevelUps();
    if (this.mode === "skill") {
      this.pendingAfterSkill = bossWin ? "branch" : "travel";
      return;
    }
    if (bossWin) {
      this.player.act += 1;
      this.player.distance += 1;
      this.showBranch("首領倒下，前方出現三條新的邊境線。");
    } else if (this.mode !== "skill") {
      this.startTravel("道路再次伸展。");
    }
    this.refreshHud();
  }

  checkLevelUps() {
    while (this.player.xp >= this.player.nextXp) {
      this.player.xp -= this.player.nextXp;
      this.player.level += 1;
      this.player.nextXp = Math.round(this.player.nextXp * 1.32 + 35);
      this.player.maxHp += 10;
      this.player.hp = this.player.maxHp;
      this.player.attack += 2;
      this.player.armor += 1;
      this.sfx.level.play();
      this.showSkillChoices();
      return;
    }
  }

  showSkillChoices() {
    this.mode = "skill";
    this.modalShade.setVisible(true);
    this.modal.setVisible(true);
    this.titleText.setText(`等級 ${this.player.level}`);
    this.subtitleText.setText("選擇一個升級技能。");
    this.skillChoices = Phaser.Utils.Array.Shuffle(SKILLS.slice()).slice(0, 3);
    this.skillChoices.forEach((skill, i) => this.getButton(`Choice${i + 1}`).setText(`${skill.name}\n${skill.text}`));
    this.showButtons(["Choice1", "Choice2", "Choice3"]);
  }

  chooseSkill(index) {
    const skill = this.skillChoices[index];
    if (!skill) return;
    skill.apply(this.player);
    this.player.perks.push(skill.name);
    this.addLog(`習得 ${skill.name}：${skill.text}`);
    this.modalShade.setVisible(false);
    this.modal.setVisible(false);
    this.titleText.setText("");
    this.subtitleText.setText("");
    const next = this.pendingAfterSkill;
    this.pendingAfterSkill = null;
    if (next === "branch") this.showBranch("首領倒下，前方出現三條新的邊境線。");
    else if (this.enemy) this.mode = "combat";
    else this.startTravel("新技巧讓步伐更穩。");
    this.refreshHud();
  }

  showBranch(message = "道路分岔，地平線吐出三種風聲。") {
    this.mode = "branch";
    this.modalShade.setVisible(true);
    this.modal.setVisible(true);
    this.enemySprite.setVisible(false);
    this.shopSprite.setVisible(false);
    this.titleText.setText("選擇路線");
    this.subtitleText.setText(message);
    this.routeChoices = [
      { name: "餘燼山道", text: "高風險戰鬥，裝備掉率提高", apply: () => { this.player.route = "餘燼山道"; this.startCombat(true); } },
      { name: "商旅大道", text: "商店與補給機率提高", apply: () => { this.player.route = "商旅大道"; this.showShop(); } },
      { name: "寂靜淺灘", text: "立即治療，獲得少量經驗", apply: () => { this.player.route = "寂靜淺灘"; this.player.hp = Math.min(this.player.maxHp, this.player.hp + 32); this.player.xp += 18; this.checkLevelUps(); if (this.mode !== "skill") this.startTravel("淺灘洗去疲憊，你繼續前進。"); } }
    ];
    this.routeChoices.forEach((choice, i) => this.getButton(`Choice${i + 1}`).setText(`${choice.name}\n${choice.text}`));
    this.showButtons(["Choice1", "Choice2", "Choice3"]);
    this.refreshHud();
  }

  chooseRoute(index) {
    const choice = this.routeChoices[index];
    if (!choice) return;
    this.modalShade.setVisible(false);
    this.modal.setVisible(false);
    this.titleText.setText("");
    this.subtitleText.setText("");
    choice.apply();
  }

  showShop() {
    this.mode = "shop";
    this.shopStock = [
      createItem(this.player.level, "weapon", rollRarity(false)),
      createItem(this.player.level, "armor", rollRarity(false)),
      createItem(this.player.level, "trinket", rollRarity(false))
    ];
    this.enemySprite.setVisible(false);
    this.shopSprite.setVisible(true);
    this.modalShade.setVisible(true);
    this.modal.setVisible(true);
    this.titleText.setText("路邊商店");
    this.subtitleText.setText(`藥水 25g。選一件庫存購買：${this.shopStock.map(item => item.name).join(" / ")}`);
    this.showButtons(["BuyPotion", "Choice1", "Choice2", "Choice3", "Leave", "Bag", "Save"]);
    this.shopStock.forEach((item, i) => this.getButton(`Choice${i + 1}`).setText(`${item.name}\n${item.price}g`));
    this.refreshHud();
  }

  buyPotion() {
    if (this.player.gold < 25) {
      this.addLog("金幣不足。");
      return;
    }
    this.player.gold -= 25;
    this.player.potions += 1;
    this.addLog("買了一瓶藥水。");
    this.refreshHud();
  }

  buyStock(index) {
    const item = this.shopStock[index];
    if (!item) return;
    if (this.player.gold < item.price) {
      this.addLog("金幣不足。");
      return;
    }
    this.player.gold -= item.price;
    this.player.inventory.push(item);
    this.addLog(`買下 ${item.name}。`);
    this.shopStock.splice(index, 1, createItem(this.player.level, item.slot, rollRarity(false)));
    this.showShop();
  }

  findTreasure() {
    const item = createItem(this.player.level, undefined, rollRarity(false));
    this.player.inventory.push(item);
    this.player.gold += 12;
    this.sfx.loot.play();
    this.addLog(`你在倒塌驛站找到 ${item.name} 與 12 金幣。`);
    this.refreshHud();
  }

  camp() {
    const heal = Math.min(this.player.maxHp - this.player.hp, 24 + this.player.level * 3);
    this.player.hp += heal;
    this.player.xp += 12;
    this.addLog(`營火仍有餘溫。恢復 ${heal} 生命，獲得 12 經驗。`);
    this.checkLevelUps();
    this.refreshHud();
  }

  toggleBag() {
    if (this.mode === "bag") {
      this.mode = this.previousMode || "travel";
      this.modalShade.setVisible(false);
      this.modal.setVisible(false);
      this.titleText.setText("");
      this.subtitleText.setText("");
      this.showButtons(this.mode === "combat" ? ["Attack", "Skill", "Potion", "Flee", "Bag", "Save"] : ["Bag", "Save"]);
      return;
    }
    this.previousMode = this.mode;
    this.mode = "bag";
    this.modalShade.setVisible(true);
    this.modal.setVisible(true);
    this.titleText.setText("背包");
    this.subtitleText.setText("裝備會穿戴背包第一件物品，出售會賣出背包最後一件物品。");
    this.showButtons(["Equip", "Sell", "Leave", "Save"]);
    this.refreshHud();
  }

  equipFirst() {
    if (!this.player.inventory.length) {
      this.addLog("背包是空的。");
      return;
    }
    this.equipItem(0, true);
    this.refreshHud();
  }

  equipItem(index, announce = true) {
    const item = this.player.inventory.splice(index, 1)[0];
    if (!item) return;
    const old = this.player.equipment[item.slot];
    this.player.equipment[item.slot] = item;
    if (old) this.player.inventory.push(old);
    const hpDelta = (item.stats.hp || 0) - (old?.stats.hp || 0);
    this.player.maxHp += hpDelta;
    this.player.hp = Phaser.Math.Clamp(this.player.hp + Math.max(0, hpDelta), 1, this.player.maxHp);
    if (announce) this.addLog(`裝備 ${item.name}。`);
  }

  sellLast() {
    const item = this.player.inventory.pop();
    if (!item) {
      this.addLog("沒有可賣的物品。");
      return;
    }
    const value = Math.max(6, Math.floor(item.price * 0.55));
    this.player.gold += value;
    this.addLog(`賣出 ${item.name}，獲得 ${value} 金幣。`);
    this.refreshHud();
  }

  saveGame() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(this.player));
    this.addLog("已存檔。");
  }

  gameOver() {
    this.mode = "gameover";
    this.enemySprite.setVisible(false);
    this.modalShade.setVisible(true);
    this.modal.setVisible(true);
    this.titleText.setText("遠征失敗");
    this.subtitleText.setText(`你倒在 ${this.player.route}，抵達 ${Math.floor(this.player.distance)} 里。\n保留存檔或開始新的遠征。`);
    this.showButtons(["Start", "Continue"]);
    this.refreshHud();
  }

  totalAttack() {
    return this.player.attack + Object.values(this.player.equipment).reduce((sum, item) => sum + (item?.stats.attack || 0), 0);
  }

  totalArmor() {
    return this.player.armor + Object.values(this.player.equipment).reduce((sum, item) => sum + (item?.stats.armor || 0), 0);
  }

  totalCrit() {
    return this.player.crit + Object.values(this.player.equipment).reduce((sum, item) => sum + (item?.stats.crit || 0), 0);
  }

  addLog(line) {
    this.logLines.unshift(line);
    this.logLines = this.logLines.slice(0, 5);
    this.refreshHud();
  }

  refreshHud() {
    if (!this.statsText) return;
    const p = this.player;
    this.statsText.setText(`等級 ${p.level}  生命 ${p.hp}/${p.maxHp}  經驗 ${p.xp}/${p.nextXp}  攻擊 ${this.totalAttack()}  護甲 ${this.totalArmor()}  暴擊 ${Math.round(this.totalCrit() * 100)}%  金幣 ${p.gold}  藥水 ${p.potions}  路線 ${p.route}  里程 ${Math.floor(p.distance)}`);
    this.logText.setText(this.logLines.join("\n"));
    const eq = ["weapon", "armor", "trinket"].map(slot => `${SLOT_NAMES[slot]}：${p.equipment[slot]?.name || "-"}`).join("\n");
    const bag = p.inventory.slice(0, 7).map((item, i) => `${i + 1}. ${this.itemLine(item)}`).join("\n") || "空";
    this.bagText.setText(`裝備\n${eq}\n\n背包\n${bag}${p.inventory.length > 7 ? `\n另有 ${p.inventory.length - 7} 件` : ""}`);
    if (this.enemy) this.enemyText.setText(`${this.enemy.name}\n生命 ${this.enemy.hp}/${this.enemy.maxHp}`);
  }

  itemLine(item) {
    const parts = [];
    if (item.stats.attack) parts.push(`攻擊+${item.stats.attack}`);
    if (item.stats.armor) parts.push(`護甲+${item.stats.armor}`);
    if (item.stats.hp) parts.push(`生命+${item.stats.hp}`);
    if (item.stats.crit) parts.push(`暴擊+${Math.round(item.stats.crit * 100)}%`);
    return `${item.name}【${RARITIES[item.rarity].name}】${parts.length ? ` ${parts.join(" ")}` : ""}`;
  }

  showButtons(names) {
    this.buttons.forEach(button => button.setVisible(names.includes(button.name)));
  }

  getButton(name) {
    return this.buttons.find(button => button.name === name);
  }

  handleButton(name) {
    if (name === "Start") this.newRun();
    if (name === "Continue") this.loadRun();
    if (name === "Attack") this.attack(false);
    if (name === "Skill") this.attack(true);
    if (name === "Potion") this.usePotion();
    if (name === "Flee") this.flee();
    if (name === "Bag") this.toggleBag();
    if (name === "Save") this.saveGame();
    if (name === "Equip") this.equipFirst();
    if (name === "Sell") this.sellLast();
    if (name === "BuyPotion") this.buyPotion();
    if (name === "Leave") {
      if (this.mode === "bag") this.toggleBag();
      else this.startTravel("你離開攤車，重新走入荒野。");
    }
    if (name.startsWith("Choice")) {
      const index = Number(name.replace("Choice", "")) - 1;
      if (this.mode === "skill") this.chooseSkill(index);
      else if (this.mode === "branch") this.chooseRoute(index);
      else if (this.mode === "shop") this.buyStock(index);
    }
  }
}

class GameButton {
  constructor(scene, name) {
    this.scene = scene;
    this.name = name;
    this.enabled = true;
    this.box = scene.add.rectangle(0, 0, 100, 36, 0x26323a, 0.96).setStrokeStyle(2, 0xcaa85e, 0.8).setDepth(30).setInteractive({ useHandCursor: true });
    this.label = scene.add.text(0, 0, BUTTON_LABELS[name] || name, {
      fontFamily: "Segoe UI, Arial",
      fontSize: "14px",
      color: "#fff4d6",
      align: "center",
      wordWrap: { width: 132 }
    }).setOrigin(0.5).setDepth(31);
    this.box.on("pointerover", () => this.enabled && this.box.setFillStyle(0x34434b, 1));
    this.box.on("pointerout", () => this.enabled && this.box.setFillStyle(0x26323a, 0.96));
    this.box.on("pointerdown", () => this.enabled && scene.handleButton(name));
    this.setText(BUTTON_LABELS[name] || name);
    this.setVisible(false);
  }

  place(x, y, w, h) {
    this.box.setPosition(x + w / 2, y + h / 2).setSize(w, h);
    this.label.setPosition(x + w / 2, y + h / 2);
    this.label.setWordWrapWidth(Math.max(72, w - 10));
    return this;
  }

  setText(text) {
    this.label.setText(text);
    return this;
  }

  setVisible(visible) {
    this.box.setVisible(visible);
    this.label.setVisible(visible);
    return this;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.box.setAlpha(enabled ? 1 : 0.35);
    this.label.setAlpha(enabled ? 1 : 0.35);
    return this;
  }
}

function createItem(level, forcedSlot, forcedRarity) {
  const slot = forcedSlot || Phaser.Utils.Array.GetRandom(["weapon", "armor", "trinket"]);
  const rarity = forcedRarity || rollRarity(false);
  const power = RARITIES[rarity].power;
  const name = `${Phaser.Utils.Array.GetRandom(ITEM_NAMES[slot])} +${Math.max(1, Math.floor(level * power))}`;
  const stats = { attack: 0, armor: 0, hp: 0, crit: 0 };
  if (slot === "weapon") stats.attack = Math.round((4 + level * 1.7) * power);
  if (slot === "armor") {
    stats.armor = Math.round((2 + level * 1.2) * power);
    stats.hp = Math.round((8 + level * 2.5) * power);
  }
  if (slot === "trinket") {
    stats.attack = Math.round((1 + level * 0.8) * power);
    stats.crit = Number((0.03 + level * 0.004 * power).toFixed(3));
  }
  return {
    id: `${slot}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    slot,
    rarity,
    name,
    stats,
    price: Math.round((22 + level * 12) * power)
  };
}

function rollRarity(boss) {
  const r = Math.random();
  if (boss && r < 0.18) return "relic";
  if (r < 0.08) return "epic";
  if (r < 0.24) return "rare";
  if (r < 0.56) return "uncommon";
  return "common";
}

function translateLegacyItem(item) {
  if (!item || !item.name) return;
  item.name = translateLegacyText(item.name);
}

function translateLegacyText(text) {
  if (typeof text !== "string") return text;
  return Object.entries(LEGACY_NAME_MAP).reduce((value, [from, to]) => value.replaceAll(from, to), text);
}

const config = {
  type: Phaser.AUTO,
  parent: "game-root",
  width: 1280,
  height: 720,
  backgroundColor: "#101418",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  audio: {
    disableWebAudio: false
  },
  scene: [BootScene, GameScene]
};

new Phaser.Game(config);
