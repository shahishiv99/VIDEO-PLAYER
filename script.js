const video = document.querySelector(".video");
const progressRange = document.querySelector(".video-progress-back");
const progressBar = document.querySelector(".video-progress");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-progress");
const volumeBar = document.querySelector(".volumeBar");
const currentTime = document.querySelector(".start-time");
const durationEl = document.querySelector(".duration");
const fullScreen = document.querySelector(".expand");
const speed = document.getElementById("speed");

// Play & Pause btn

function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function toggle() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// if Video ended to show play icon
video.addEventListener("ended", showPlayIcon);

// Progress Bar
// calculate display time
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;

  return `${minutes}:${seconds}`;
}
// Update Progress bar with video current time
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)}`;
  durationEl.textContent = `${displayTime(video.duration)}`;
}
// SetProgress range
function setProgress(e) {
  const newTime = e.offsetX / e.srcElement.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}
// Volume Control

let lastVolume = 1;

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  volumeBar.style.width = `${volume * 100}%`;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  video.volume = volume;
  // change volume icon with volume effects
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fa", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fa", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fa", "fa-volume-off");
  }
  lastVolume = volume;
}
// Mute / Unmute

function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fa", "fa-volume-off");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add("fa", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
  }
}

// Change Play back Speed

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Full Screen Video
/* View in fullscreen */
function openFullscreen(element) {
  console.log(element);
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(video);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// function changeScreen() {
//   if (video.requestFullscreen) {
//     video.requestFullscreen();
//   } else {
//     video.exitFullscreen();
//   }
// }

// Event
playBtn.addEventListener("click", toggle);
video.addEventListener("click", toggle);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("click", changeSpeed);
fullScreen.addEventListener("click", toggleFullscreen);
