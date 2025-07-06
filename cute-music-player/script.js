// script.js

const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
const trackName = document.getElementById("track-name");
const trackListItems = document.querySelectorAll(".tracklist li");

let currentTrackIndex = 1;
const tracks = [
  { name: "Summertime Sadness", src: "songs/song1.mp3", duration: "2:40" },
  { name: "Dandelions", src: "songs/song2.mp3", duration: "2:58" },
  { name: "Aaja Piya Tohe Pyaar du", src: "songs/song3.mp3", duration: "3:20" },
];

function loadTrack(index) {
  audio.src = tracks[index].src;
  trackName.textContent = tracks[index].name;
  totalDurationEl.textContent = tracks[index].duration;
  progress.value = 0;
  currentTimeEl.textContent = "0:00";
  currentTrackIndex = index;
}

function playPauseTrack() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.textContent = "⏸️";
}

audio.addEventListener("timeupdate", () => {
  const progressValue = (audio.currentTime / audio.duration) * 100;
  progress.value = progressValue;

  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  currentTimeEl.textContent = `${minutes}:${seconds}`;
});

progress.addEventListener("input", () => {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

playBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

trackListItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    loadTrack(index);
    audio.play();
    playBtn.textContent = "⏸️";
  });
});

// Load the initial track
loadTrack(currentTrackIndex);
