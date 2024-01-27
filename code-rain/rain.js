const canvas = document.getElementById('rain');
const dpr = window.devicePixelRatio;

const width = window.innerWidth * dpr;
const height = window.innerHeight * dpr;
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');
const fontSize = 10 * dpr;
const colWidth = fontSize;
const colCount = Math.floor(width / (colWidth * dpr));
const nextChars = new Array(colCount).fill(0);

ctx.scale(dpr, dpr);

function getRandomColor() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#800080', '#FFA500', '#FF4444', '#800000'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomText() {
  const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97))
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function paint() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < colCount; i++) {
    const char = getRandomText();
    ctx.fillStyle = getRandomColor();
    ctx.font = `${fontSize}px Arial`;
    const x = colWidth * i;
    const index = nextChars[i];
    const y = fontSize * (index + 1);
    ctx.fillText(char, x, y);
    if (y * 2 > height && Math.random() > 0.99) {
      nextChars[i] = 0;
    } else {
      nextChars[i]++;
    }
  }
}

function runAnimation() {
  paint();
  requestAnimationFrame(runAnimation);
}

runAnimation();