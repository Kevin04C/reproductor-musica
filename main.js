import "./normalize.css";
import "./style.css";

import data from "./songs.json";

const $ = (selector) => document.querySelector(selector);
const audio = new Audio();
let isPause = true;
let isPlay = false;

const btnPause = $("#btn-pause");
const btnPlay = $("#btn-play");
const btnNext = $("#btn-next");
const btnBefore = $("#btn-before");
const nameMusic = $("#name-music");
const authorMusic = $("#author-music");


let indexAudio = 0;

document.addEventListener("DOMContentLoaded", () => {
  init();
  playOrPause();
});

const init = () => {
  nameMusic.textContent = data[indexAudio].title;
  authorMusic.textContent = data[indexAudio].artist;
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

const nextMusic = () => {
  if (indexAudio < data.length - 1) {
    indexAudio++;
    nameMusic.textContent = data[indexAudio].title;
    authorMusic.textContent = data[indexAudio].artist;
    audio.src = data[indexAudio].url;
    audio.play();

    return;
  }
  alert("End of playlist");
  
};

const beforeMusic = () => {};

document.addEventListener("click", (e) => {

  if (e.target === btnPause) {
    playOrPause();
  } else if (e.target === btnPlay) {
    playOrPause();
  } else if (e.target === btnNext ||e.target.className.includes("fa-step-forward")) {
    console.log("nexttt")
  } else if (e.target === btnBefore) {
    console.log("before musiccc");
  }
});
