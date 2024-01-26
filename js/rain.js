const canvas = document.getElementById('rain');
// const dpr = window.devicePixelRatio;
const dpr = 1;

const width = window.innerWidth * dpr;
const height = window.innerHeight * dpr;

const ctx = canvas.getContext('2d');
const fontSize = 10 * dpr;
const colWidth = fontSize;
const colCount = Math.floor(width / colWidth);
const nextChars = new Array(colCount).fill(0);

function getRandomColor() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#800080', '#FFA500', '#FF4444', '#800000'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomText() {
  const str = 'Hello world,this is Lester,and-will=show*you(a)code@rain.';
  return str[Math.floor(Math.random() * str.length)];
}

function paint() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < colCount; i++) {
    const char = getRandomText();
    ctx.fillStyle = getRandomColor();
    ctx.font = `${fontSize}px serif`;
    const x = colWidth * i;
    const index = nextChars[i];
    const y = fontSize * (index + 1);
    ctx.fillText(char, x, y);
    console.log(y, height);
    if (y > height) {
      nextChars[i] = 0;
    } else {
      nextChars[i]++;
    }
  }
}

setInterval(() => {
//   paint();
}, 40);

// function runAnimation() {
//   paint();
//   requestAnimationFrame(runAnimation);
// }

// runAnimation();