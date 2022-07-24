import "./normalize.css";
import "./style.css";

import data from "./songs.json";

const $ = (selector) => document.querySelector(selector);
const audio = new Audio();
let isPause = true;
let isPlay = false;

const btnPause = $("#btn-pause");
const btnPlay = $("#btn-play");
const indexAudio = 0;

console.log(btnPause);
console.log(btnPlay);

document.addEventListener("DOMContentLoaded", () => {
  init();
  playOrPause();
});

const init = () => {
  audio.src = data[indexAudio].url;
};

const playOrPause = () => {
  if (isPause) {
    isPause = false;
    isPlay = true;
    btnPlay.classList.remove("hidden");
    btnPause.classList.toggle("hidden");
    audio.pause();
  } else {
    isPause = true;
    isPlay = false;
    btnPause.classList.remove("hidden");
    btnPlay.classList.toggle("hidden");
    audio.play();
  }
};

document.addEventListener("click", (e) => {
  if (e.target === btnPause) {
    isPause = true;
    isPlay = false;
    playOrPause();
  } else if (e.target === btnPlay) {
    isPause = false;
    isPlay = true;
    playOrPause();
  }
});
