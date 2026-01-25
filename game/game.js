const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("start");
const scoreEl = document.getElementById("score");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let running = false;
let time = 0;
let score = 0;

const player = {
  x: w/2,
  y: h/2,
  r: 8
};

const enemies = [];
const orbs = [];

function spawnEnemy() {
  const side = Math.random() * 4 | 0;
  let x, y;
  if (side === 0) { x = 0; y = Math.random()*h }
  if (side === 1) { x = w; y = Math.random()*h }
  if (side === 2) { x = Math.random()*w; y = 0 }
  if (side === 3) { x = Math.random()*w; y = h }

  enemies.push({ x, y, r: 10, speed: 0.6 + time*0.00005 });
}

function spawnOrb() {
  orbs.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 4
  });
}

window.addEventListener("mousemove", e => {
  player.x = e.clientX;
  player.y = e.clientY;
});
window.addEventListener("touchmove", e => {
  player.x = e.touches[0].clientX;
  player.y = e.touches[0].clientY;
});

function dist(a,b,c,d) {
  return Math.hypot(a-c, b-d);
}

function loop() {
  if (!running) return;
  time++;

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,w,h);

  // player
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, Math.PI*2);
  ctx.fillStyle = "#900";
  ctx.fill();

  // glow
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#900";

  // enemies
  enemies.forEach(e => {
    const dx = player.x - e.x;
    const dy = player.y - e.y;
    const d = Math.hypot(dx,dy);
    e.x += dx/d * e.speed;
    e.y += dy/d * e.speed;

    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI*2);
    ctx.fillStyle = "#300";
    ctx.fill();

    if (dist(e.x,e.y,player.x,player.y) < e.r + player.r) {
      running = false;
      startScreen.textContent = "GAME OVER";
      startScreen.style.display = "flex";
    }
  });

  // orbs
  orbs.forEach((o,i) => {
    ctx.beginPath();
    ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
    ctx.fillStyle="#600";
    ctx.fill();

    if (dist(o.x,o.y,player.x,player.y) < o.r + player.r) {
      orbs.splice(i,1);
      score += 100;
    }
  });

  if (time % 120 === 0) spawnEnemy();
  if (time % 180 === 0) spawnOrb();

  score++;
  scoreEl.textContent = score;

  ctx.shadowBlur = 0;
  requestAnimationFrame(loop);
}

startScreen.addEventListener("click", () => {
  enemies.length = 0;
  orbs.length = 0;
  score = 0;
  time = 0;
  running = true;
  startScreen.style.display = "none";
  loop();
});