
const logo = document.querySelector(".logo-wrapper");

function animate(x, y) {
  const rotateX = y * -12;
  const rotateY = x * 12;

  logo.style.transform = `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;
}

window.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = (e.clientY / window.innerHeight) * 2 - 1;
  animate(x, y);
});

window.addEventListener("touchmove", e => {
  const t = e.touches[0];
  const x = (t.clientX / window.innerWidth) * 2 - 1;
  const y = (t.clientY / window.innerHeight) * 2 - 1;
  animate(x, y);
});
