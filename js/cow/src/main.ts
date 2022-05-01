import "./style.css";
import gsap from "gsap";

let interval: NodeJS.Timeout;
const audio = new Audio("/assets/cow.wav");
const playButton = document.querySelector<HTMLButtonElement>("#playBtn")!;
const screenEl = document.querySelector<HTMLDivElement>("#app")!;

const rect = screenEl.getBoundingClientRect();

let rect2: DOMRect;
let COW_X: number;
let COW_Y: number;

let volume = 0.01;

playButton.addEventListener("click", () => startGame());

const move = (ev: any) => {
  const x = ev?.x || ev?.touches.item(0).clientX;
  const y = ev?.y || ev?.touches.item(0).clientY;

  let xAxis = parseFloat((COW_X / x).toFixed(2));
  let yAxis = parseFloat((COW_Y / y).toFixed(2));

  if (xAxis > 1) {
    xAxis = parseFloat((x / COW_X).toFixed(2));
  }

  if (yAxis > 1) {
    yAxis = parseFloat((y / COW_Y).toFixed(2));
  }

  volume = (xAxis + yAxis) / 2;
};

function startGame() {
  screenEl.addEventListener("mousemove", move);
  screenEl.addEventListener("touchmove", move);

  interval = setInterval(() => {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  }, 500);

  gsap.to(playButton, { opacity: 0, duration: 1 });
  playButton.disabled = true;

  const existingCow = document.querySelector(".cow");
  if (existingCow) existingCow.remove();

  const cowEl = document.createElement("image");
  cowEl.classList.add("cow");
  cowEl.style.left = `${Math.round(Math.random() * rect.width - 100) + 100}px`;
  cowEl.style.top = `${Math.round(Math.random() * rect.height - 100) + 100}px`;
  cowEl.style.opacity = "0";

  gsap.set(cowEl, { width: 50, height: 50 });

  screenEl.append(cowEl);

  rect2 = cowEl.getBoundingClientRect();
  COW_X = rect2.x;
  COW_Y = rect2.y;

  cowEl.addEventListener("click", () => {
    gsap.to(cowEl, {
      opacity: 1,
      top: "50%",
      left: "50%",
      duration: 1,
      width: 500,
      height: 500,
    });

    endGame();
  });
}

function endGame() {
  screenEl.removeEventListener("mousemove", move);
  screenEl.removeEventListener("touchmove", move);
  audio.pause();
  clearInterval(interval);

  playButton.textContent = "Play Again";
  gsap.to(playButton, { opacity: 1, duration: 1 });
  playButton.disabled = false;
}
