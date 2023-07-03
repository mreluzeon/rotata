const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const N = 5;
const speed = 0.5;
const scale = .4;
let difficulty = 12; 

document.onkeyup = e => {
  if (e.keyCode === 38) ++difficulty;
  if (e.keyCode === 40) --difficulty;
}

function getNthPoint(n, t, ngon=N) {
  return [Math.cos(t + n * 2*Math.PI / ngon), Math.sin(t + n * 2*Math.PI / ngon)];
}

function animate() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,width,height);
  ctx.translate(width / 2, height / 2);

  //ctx.fillStyle = '#ff5555';
  ctx.fillStyle = `hsl(${120 - difficulty * 6}, 100%, 50%)`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let t = speed * window.performance.now()/1000;

  const localScale = Math.min(width, height) * scale;
  ctx.beginPath();
  ctx.moveTo(...getNthPoint(N, t));
  for (let i = 0; i <= N; i++)
    ctx.lineTo(...(getNthPoint(i, t).map(v => v*localScale)));
  ctx.fill();
  ctx.closePath();

  // ctx.fillStyle = "#ffffff";
  ctx.fillStyle = `hsl(${120 - difficulty * 6}, 100%, 25%)`;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 5;
  ctx.font = `bold ${Math.floor(localScale*1.5)}px Comic Neue`;

  ctx.globalCompositeOperation = 'darken';
  const textOffset = localScale * .4;
  const horizontalTextOffset = localScale * .15;
  ctx.fillText(difficulty, textOffset - horizontalTextOffset, textOffset);
  ctx.globalCompositeOperation = 'xor';
  // ctx.strokeText(difficulty, textOffset - horizontalTextOffset, textOffset);
  
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
