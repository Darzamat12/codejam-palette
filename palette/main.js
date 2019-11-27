const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let currentTool = 'pencil';
let currentColor = localStorage.getItem('currentColor');
let previusColor = localStorage.getItem('previusColor');
function removeActiveClass() {
  document.querySelector('.tools__bucket').classList.remove('active-tool');
  document.querySelector('.tools__color-picker').classList.remove('active-tool');
  document.querySelector('.tools__pencil').classList.remove('active-tool');
}
function rgbTranslate(r, g, b) {
  let rc = r.toString(16);
  let gc = g.toString(16);
  let bc = b.toString(16);

  if (rc.length === 1) rc = `0${r}`;
  if (gc.length === 1) gc = `0${g}`;
  if (bc.length === 1) bc = `0${b}`;

  return `#${rc}${gc}${bc}`;
}


function changeColor() {
  document.querySelector('.previus-circle').style.backgroundColor = previusColor;
  document.querySelector('.current-circle').style.backgroundColor = currentColor;
}
changeColor();
const basicColors = [
  ['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
  ['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
  ['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
  ['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
];
if (localStorage.getItem('canvas')) {
  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
} else {
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      ctx.fillStyle = basicColors[i][j];
      ctx.fillRect(128 * i, 128 * j, 128, 128);
    }
  }
}
canvas.onmousedown = (event) => {
  if (currentTool === 'pencil') {
    ctx.fillStyle = currentColor;
    const xOffset = event.offsetX;
    const yOffset = event.offsetY;
    ctx.fillRect(128 * Math.floor(xOffset / 128), 128 * Math.floor(yOffset / 128), 128, 128);
    canvas.onmousemove = (e) => {
      ctx.fillRect(128 * Math.floor(e.offsetX / 128), 128 * Math.floor(e.offsetY / 128), 128, 128);
    };
    canvas.onmouseup = () => {
      canvas.onmousemove = null;
      localStorage.setItem('canvas', canvas.toDataURL());
    };
  } else if (currentTool === 'bucket') {
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, 512, 512);
  } else if (currentTool === 'colorPicker') {
    const r = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[0];
    const g = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[1];
    const b = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[2];
    previusColor = currentColor;
    currentColor = rgbTranslate(r, g, b);
    changeColor();
  }
};

document.addEventListener('keyup', (event) => {
  switch (event.keyCode) {
    case 80: removeActiveClass();
      currentTool = 'pencil';
      document.querySelector('.tools__pencil').classList.add('active-tool');
      break;
    case 66: removeActiveClass();
      currentTool = 'bucket';
      document.querySelector('.tools__bucket').classList.add('active-tool');
      break;
    case 67: removeActiveClass();
      currentTool = 'colorPicker';
      document.querySelector('.tools__color-picker').classList.add('active-tool');
      break;
    default: break;
  }
});
document.querySelector('.colors__red').addEventListener('click', () => {
  previusColor = currentColor;
  currentColor = '#FF0000';
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('previusColor', previusColor);
  changeColor();
});

document.querySelector('.colors__blue').addEventListener('click', () => {
  previusColor = currentColor;
  currentColor = '#0000FF';
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('previusColor', previusColor);
  changeColor();
});

document.querySelector('.colors__previus-color').addEventListener('click', () => {
  const tmp = previusColor;
  previusColor = currentColor;
  currentColor = tmp;
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('previusColor', previusColor);
  changeColor();
});


document.querySelector('.tools__bucket').addEventListener('click', () => {
  removeActiveClass();
  currentTool = 'bucket';
  document.querySelector('.tools__bucket').classList.add('active-tool');
});

document.querySelector('.tools__color-picker').addEventListener('click', () => {
  removeActiveClass();
  currentTool = 'colorPicker';
  document.querySelector('.tools__color-picker').classList.add('active-tool');
});

document.querySelector('.tools__pencil').addEventListener('click', () => {
  removeActiveClass();
  currentTool = 'pencil';
  document.querySelector('.tools__pencil').classList.add('active-tool');
});
