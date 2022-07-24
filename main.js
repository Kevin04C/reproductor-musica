import "./normalize.css";
import "./style.css";

import data from "./songs.json";

const $ = (selector) => document.querySelector(selector);
const audio = new Audio();

let isPause = true;
let isPlay = false;

const atxBox = $("#atx-box");
const btnPause = $("#btn-pause");
const btnPlay = $("#btn-play");
const btnNext = $("#btn-next");
const btnBefore = $("#btn-before");
const nameMusic = $("#name-music");
const authorMusic = $("#author-music");
const timeElapsed = $("#time-elapsed");
const timeTotal = $("#time-total");
const progressPercentage = $("#progress-precentage");
const iconListMusic = $("#icon-list-music");
const listMusic = $("#list-music");

let indexAudio = 0;

document.addEventListener("DOMContentLoaded", () => {
  printMusicInTheDocument();
  showDataMusic();
});

const printMusicInTheDocument = () => {
  data.forEach((music, i) => {
    listMusic.innerHTML += ` <li class="list-music__item" data-index=${i}>${
      i + 1
    }. ${music.artist} - ${music.title}</li>`;
  });
};

const showDataMusic = () => {
  nameMusic.textContent = data[indexAudio].title;
  authorMusic.textContent = data[indexAudio].artist;
  audio.src = data[indexAudio].url;
  atxBox.style.background = `linear-gradient(to bottom, rgba(0,0,0, .2) 60%, rgba(0,0,0, .8)) 40%, url("${data[indexAudio].image}")`;
  setDurationAudio();
  progressPercentage.style.width = `${0}%`;

  isPause = true;
  isPlay = false;
};

const changeStateAudio = () => {
  if (isPause && !isPlay) {
    isPause = false;
    isPlay = true;

    audio.play();
  } else {
    isPause = true;
    isPlay = false;

    audio.pause();
  }
  showControls();
};

const nextMusic = () => {
  if (indexAudio < data.length - 1) {
    indexAudio++;
    showDataMusic();
    showControls();
  }
};

const beforeMusic = () => {
  if (indexAudio <= data.length - 1 && indexAudio !== 0) {
    indexAudio--;
    showDataMusic();
    showControls();
  }
};

document.addEventListener("click", (e) => {
  if (e.target === btnPause) {
    changeStateAudio();
  } else if (e.target === btnPlay) {
    changeStateAudio();
  } else if (
    e.target === btnNext ||
    e.target.className.includes("fa-step-forward")
  ) {
    nextMusic();
  } else if (
    e.target === btnBefore ||
    e.target.className.includes("fa-step-backward")
  ) {
    beforeMusic();
  } else if (e.target === progressPercentage || e.target.matches("#progress")) {
    // console.log(e.target.getBoundingClientRect());
    // console.log(e.pageY - y);
  } else if (e.target === iconListMusic) {
    listMusic.classList.toggle("hidden-list-music");
  } else if (e.target.matches(".list-music__item")) {
    indexAudio = e.target.dataset.index;
    listMusic.classList.toggle("hidden-list-music");
    showDataMusic();
    showControls();
  }
});

audio.addEventListener("timeupdate", (e) => {
  timeElapsed.textContent = addFormat(parseInt(audio.currentTime));
  const percentage = Number.parseInt(
    (audio.currentTime * 100) / audio.duration
  );

  progressPercentage.style.width = `${percentage}%`;
});

const showControls = () => {
  if (isPlay) {
    btnPause.classList.remove("hidden");
    btnPlay.classList.add("hidden");
  } else {
    btnPause.classList.add("hidden");
    btnPlay.classList.remove("hidden");
  }

  if (indexAudio === data.length - 1) {
    btnNext.setAttribute("disabled", "true");
  } else if (indexAudio !== data.length) {
    btnNext.removeAttribute("disabled");
  }

  if (indexAudio === 0) {
    btnBefore.setAttribute("disabled", "true");
  } else if (indexAudio !== 0) {
    btnBefore.removeAttribute("disabled");
  }
};

const setDurationAudio = () => {
  audio.onloadedmetadata = () => {
    timeTotal.textContent = addFormat(parseInt(audio.duration));
  };
};

const addFormat = (time) => {
  const minutes = Math.round(time / 60);
  const seconds = ("0" + (time % 60)).slice(-2);

  return `${minutes}:${seconds}`;
};
