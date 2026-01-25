const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = canvas.width / 2;
let y = canvas.height / 2;
let score = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);

// mouse
window.addEventListener("mousemove", e => {
  x = e.clientX;
  y = e.clientY;
});

// touch
window.addEventListener("touchmove", e => {
  x = e.touches[0].clientX;
  y = e.touches[0].clientY;
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#900";
  ctx.fill();

  score++;
  document.getElementById("score").textContent = score;

  requestAnimationFrame(loop);
}

loop();