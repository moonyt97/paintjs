const canvas = document.getElementById("jsCanvas");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const ctx = canvas.getContext("2d");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

let painting = false;
let filling = false;

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleClickColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleSize(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleClickCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleClickCanvas);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleClickColor)
);

if (range) {
  range.addEventListener("input", handleSize);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
