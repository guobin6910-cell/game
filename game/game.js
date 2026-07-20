const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");
const playerCountEl = document.getElementById("playerCount");
const monsterCountEl = document.getElementById("monsterCount");

const TILE_W = 72;
const TILE_H = 36;
const MAP_W = 30;
const MAP_H = 23;
const state = {
  id: null,
  players: new Map(),
  monsters: new Map(),
  floating: [],
  mouse: { x: 0, y: 0, tileX: 0, tileY: 0 },
  connected: false
};

const terrain = Array.from({ length: MAP_H }, (_, y) =>
  Array.from({ length: MAP_W }, (_, x) => {
    const edge = x < 2 || y < 2 || x > MAP_W - 3 || y > MAP_H - 3;
    const road = Math.abs(x - y - 2) < 2 || Math.abs(x + y - 28) < 2;
    const noise = Math.sin(x * 1.7 + y * 0.8) + Math.cos(y * 1.3);
    return edge ? "rock" : road ? "road" : noise > 1.1 ? "grass" : "dirt";
  })
);

let socket;
let lastTime = performance.now();

function connect() {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  socket = new WebSocket(`${protocol}://${location.host}`);

  socket.addEventListener("open", () => {
    state.connected = true;
    statusEl.textContent = "已連線：左鍵移動，點魔物攻擊";
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "welcome") {
      state.id = message.id;
      applyWorld(message.world);
    }
    if (message.type === "join" || message.type === "player") {
      state.players.set(message.player.id, message.player);
    }
    if (message.type === "leave") {
      state.players.delete(message.id);
    }
    if (message.type === "tick") {
      applyWorld(message.world);
    }
    if (message.type === "combat") {
      state.monsters.set(message.monster.id, message.monster);
      const screen = isoToScreen(message.monster.x, message.monster.y);
      state.floating.push({ text: `-${message.damage}`, x: screen.x, y: screen.y - 42, life: 0.8 });
    }
    if (message.type === "monster") {
      state.monsters.set(message.monster.id, message.monster);
    }
  });

  socket.addEventListener("close", () => {
    state.connected = false;
    statusEl.textContent = "斷線，重新連線中...";
    setTimeout(connect, 900);
  });
}

function applyWorld(world) {
  for (const player of world.players) state.players.set(player.id, player);
  for (const id of state.players.keys()) {
    if (!world.players.some((player) => player.id === id)) state.players.delete(id);
  }
  for (const monster of world.monsters) state.monsters.set(monster.id, monster);
  playerCountEl.textContent = String(state.players.size);
  monsterCountEl.textContent = String([...state.monsters.values()].filter((monster) => monster.hp > 0).length);
}

function resize() {
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resize);
resize();

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  state.mouse.x = event.clientX - rect.left;
  state.mouse.y = event.clientY - rect.top;
  const tile = screenToIso(state.mouse.x, state.mouse.y);
  state.mouse.tileX = tile.x;
  state.mouse.tileY = tile.y;
});

canvas.addEventListener("click", () => {
  const target = pickMonster(state.mouse.x, state.mouse.y);
  if (target) {
    send({ type: "attack", monsterId: target.id });
    return;
  }
  send({ type: "move", x: state.mouse.tileX, y: state.mouse.tileY });
});

function send(payload) {
  if (socket && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(payload));
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  draw(now);
  requestAnimationFrame(loop);
}

function update(dt) {
  for (const float of state.floating) {
    float.y -= 38 * dt;
    float.life -= dt;
  }
  state.floating = state.floating.filter((float) => float.life > 0);
}

function draw(now) {
  const w = innerWidth;
  const h = innerHeight;
  ctx.clearRect(0, 0, w, h);
  drawBackdrop(w, h);

  const hoverValid = inMap(state.mouse.tileX, state.mouse.tileY);
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      drawTile(x, y, hoverValid && x === Math.floor(state.mouse.tileX) && y === Math.floor(state.mouse.tileY));
    }
  }

  const actors = [
    ...[...state.monsters.values()].filter((monster) => monster.hp > 0).map((monster) => ({ kind: "monster", ...monster })),
    ...[...state.players.values()].map((player) => ({ kind: "player", ...player }))
  ].sort((a, b) => (a.x + a.y) - (b.x + b.y));

  for (const actor of actors) {
    if (actor.kind === "monster") drawMonster(actor, now);
    else drawPlayer(actor, now);
  }

  drawFloatingText();
  drawVignette(w, h);
}

function drawBackdrop(w, h) {
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "#1b1b21");
  gradient.addColorStop(0.55, "#121116");
  gradient.addColorStop(1, "#211b16");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

function drawTile(x, y, hovered) {
  const screen = isoToScreen(x, y);
  const type = terrain[y][x];
  const palette = {
    grass: ["#354331", "#273528"],
    dirt: ["#3b3328", "#2b261f"],
    road: ["#4a3d2e", "#332b23"],
    rock: ["#34363a", "#26282c"]
  }[type];

  ctx.beginPath();
  ctx.moveTo(screen.x, screen.y);
  ctx.lineTo(screen.x + TILE_W / 2, screen.y + TILE_H / 2);
  ctx.lineTo(screen.x, screen.y + TILE_H);
  ctx.lineTo(screen.x - TILE_W / 2, screen.y + TILE_H / 2);
  ctx.closePath();
  ctx.fillStyle = hovered ? "#63543a" : palette[0];
  ctx.fill();
  ctx.strokeStyle = hovered ? "rgba(242,197,107,.72)" : "rgba(0,0,0,.32)";
  ctx.lineWidth = hovered ? 2 : 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screen.x - TILE_W / 2, screen.y + TILE_H / 2);
  ctx.lineTo(screen.x, screen.y + TILE_H);
  ctx.lineTo(screen.x + TILE_W / 2, screen.y + TILE_H / 2);
  ctx.lineTo(screen.x, screen.y + TILE_H + 7);
  ctx.closePath();
  ctx.fillStyle = palette[1];
  ctx.fill();
}

function drawPlayer(player, now) {
  const screen = isoToScreen(player.x, player.y);
  const isMe = player.id === state.id;
  const bob = Math.sin(now / 170 + player.x) * 2;
  const attacking = player.attackUntil && player.attackUntil > Date.now();

  drawShadow(screen.x, screen.y + 29, 23, 9);
  ctx.save();
  ctx.translate(screen.x, screen.y + bob);
  ctx.scale(player.facing || 1, 1);

  ctx.fillStyle = "#1b1715";
  ctx.fillRect(-8, -28, 16, 30);
  ctx.fillStyle = player.color || "#4fb0d8";
  ctx.beginPath();
  ctx.roundRect(-13, -43, 26, 26, 6);
  ctx.fill();
  ctx.fillStyle = "#f0d0a2";
  ctx.beginPath();
  ctx.arc(0, -53, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = attacking ? "#f2c56b" : "#b9c1c8";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(9, -34);
  ctx.lineTo(attacking ? 31 : 20, attacking ? -46 : -31);
  ctx.stroke();
  ctx.restore();

  drawBar(screen.x, screen.y - 72, 42, player.hp / player.maxHp, isMe ? "#69d289" : "#4fb0d8");
  drawName(screen.x, screen.y - 84, isMe ? "你" : player.name);
}

function drawMonster(monster, now) {
  const screen = isoToScreen(monster.x, monster.y);
  const pulse = Math.sin(now / 220 + monster.x) * 2;

  drawShadow(screen.x, screen.y + 30, 30, 11);
  ctx.save();
  ctx.translate(screen.x, screen.y + pulse);
  ctx.fillStyle = "#211316";
  ctx.beginPath();
  ctx.ellipse(0, -24, 23, 29, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#8f2d2c";
  ctx.beginPath();
  ctx.arc(-10, -31, 5, 0, Math.PI * 2);
  ctx.arc(10, -31, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#d8b15e";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-16, -50);
  ctx.lineTo(-27, -64);
  ctx.moveTo(16, -50);
  ctx.lineTo(27, -64);
  ctx.stroke();
  ctx.restore();

  drawBar(screen.x, screen.y - 72, 46, monster.hp / monster.maxHp, "#c94a3d");
}

function drawShadow(x, y, rx, ry) {
  ctx.fillStyle = "rgba(0,0,0,.34)";
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawBar(x, y, width, ratio, color) {
  ctx.fillStyle = "rgba(0,0,0,.55)";
  ctx.fillRect(x - width / 2, y, width, 5);
  ctx.fillStyle = color;
  ctx.fillRect(x - width / 2, y, width * Math.max(0, ratio), 5);
}

function drawName(x, y, text) {
  ctx.font = "12px Microsoft JhengHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(0,0,0,.65)";
  ctx.fillText(text, x + 1, y + 1);
  ctx.fillStyle = "#f5efe3";
  ctx.fillText(text, x, y);
}

function drawFloatingText() {
  ctx.font = "bold 18px Microsoft JhengHei, sans-serif";
  ctx.textAlign = "center";
  for (const float of state.floating) {
    ctx.globalAlpha = Math.max(0, float.life);
    ctx.fillStyle = "#f2c56b";
    ctx.fillText(float.text, float.x, float.y);
  }
  ctx.globalAlpha = 1;
}

function drawVignette(w, h) {
  const gradient = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.74);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,.42)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

function isoToScreen(x, y) {
  return {
    x: innerWidth / 2 + (x - y) * (TILE_W / 2),
    y: innerHeight * 0.2 + (x + y) * (TILE_H / 2)
  };
}

function screenToIso(screenX, screenY) {
  const x = screenX - innerWidth / 2;
  const y = screenY - innerHeight * 0.2;
  return {
    x: y / TILE_H + x / TILE_W,
    y: y / TILE_H - x / TILE_W
  };
}

function inMap(x, y) {
  return x >= 0 && y >= 0 && x < MAP_W && y < MAP_H;
}

function pickMonster(screenX, screenY) {
  let best = null;
  let bestDistance = Infinity;
  for (const monster of state.monsters.values()) {
    if (monster.hp <= 0) continue;
    const screen = isoToScreen(monster.x, monster.y);
    const distance = Math.hypot(screen.x - screenX, screen.y - 34 - screenY);
    if (distance < 34 && distance < bestDistance) {
      best = monster;
      bestDistance = distance;
    }
  }
  return best;
}

connect();
requestAnimationFrame(loop);
