const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const SIDES = 6;
const ROTATION_SPEED = 0.5;
const SCALE = .4;
let difficulty = 12;

document.onkeydown = e => {
  if (e.keyCode === 38) ++difficulty;
  if (e.keyCode === 40) --difficulty;
}

function getPoint(index, tick, sides=SIDES) {
  return [Math.cos(tick + index * 2 * Math.PI / sides), Math.sin(tick + index * 2 * Math.PI / sides)];
}

(function animate() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.translate(width / 2, height / 2);
  ctx.fillStyle = `hsl(${120 - difficulty * 6}, 100%, 50%)`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const tick = ROTATION_SPEED * window.performance.now()/1000;
  const localScale = Math.min(width, height) * SCALE;

  ctx.beginPath();
  for (let i = 0; i <= SIDES; i++)
    ctx.lineTo(...(getPoint(i, tick).map(v => v * localScale)));
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = `hsl(${120 - difficulty * 6}, 100%, 25%)`;
  ctx.globalCompositeOperation = 'darken';

  ctx.font = `bold ${Math.floor(localScale*1.5)}px Comic Neue`;
  const textOffset = localScale * .4;
  const horizontalTextOffset = localScale * .15;
  ctx.fillText(difficulty, textOffset - horizontalTextOffset, textOffset);

  requestAnimationFrame(animate);
})()
