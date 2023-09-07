const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const progressBar = $(".progress-bar");
const progress = $(".progress");
const progressSpan = $("span");
let isDrag = false;
let initialClientX = 0;
let current = 0;
let currentWidth;

const progressBarWidth = progressBar.clientWidth;
// console.log(progressBarWidth);

var handleChange = function (width) {
     let value = (width * 100) / progressBarWidth;
     // console.log(value);
     if (value < 0) {
          value = 0;
     }
     if (value > 100) {
          value = 100;
     }
     progress.style.width = `${value}%`;
     currentWidth = width;
};
progressBar.addEventListener("mousedown", function (e) {
     if (e.which === 1) {
          // console.log(e.offsetX);
          handleChange(e.offsetX);
          isDrag = true;
          initialClientX = e.clientX;
          console.log(e.clientX);
          current = e.offsetX;
     }
});
progressSpan.addEventListener("mousedown", function (e) {
     e.stopPropagation();
     isDrag = true;
     initialClientX = e.clientX;
     // console.log(initialClientX);
});
document.addEventListener("mouseup", function (e) {
     isDrag = false;
     // valueOld += e.clientX - initialClientX;
     current = currentWidth;
});
document.addEventListener("mousemove", function (e) {
     if (isDrag) {
          let moveWidth = e.clientX - initialClientX + current;
          handleChange(moveWidth);
     }
});

// Xây dụng nhạc
var audio = new Audio("./mp3/ThuCuối.mp3");
console.log(audio);
var playBtn = $(".play-btn");
var currentTimeEl = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;
var getTime = function (seconds) {
     // Tính số phút
     var mins = Math.floor(seconds / 60);
     // console.log(mins);
     // Tính số giây còn lại
     seconds = Math.floor(seconds - mins * 60);
     // console.log(seconds);
     return `${mins < 10 ? "0" + mins : mins}:${seconds < 10 ? "0" + seconds : seconds}`;
};

// console.log(audio.duration); NaN do nhạc chưa tải xong
audio.addEventListener("loadeddata", function () {
     // console.log(audio.duration);
     console.log(getTime(audio.duration));
     durationEl.innerText = getTime(audio.duration);
});
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var playIcon = `<i class="fa-solid fa-play"></i>`;
playBtn.addEventListener("click", function () {
     console.log(audio.paused);
     if (audio.paused) {
          audio.play();
          this.innerHTML = pauseIcon;
     } else {
          audio.pause();
          this.innerHTML = playIcon;
     }
});
audio.addEventListener("timeupdate", function () {
     // console.log(audio.currentTime);
     currentTimeEl.innerText = getTime(audio.currentTime);

     var value = (audio.currentTime * 100) / audio.duration;
     progress.style.width = `${value}%`;
});
