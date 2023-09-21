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

     var currentTime = (value / 100) * audio.duration;
     audio.currentTime = currentTime;
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

/// Xây dựng chức năng karaoke
const karaoke = $(".karaoke");
const karaokeInner = $(".karaoke-inner");
const karaokePlayBtn = $(".karaoke-play");
const karaokeCloseBtn = $(".close");
const player = $(".player");
const karaokeContent = $(".karaoke-content");
karaokePlayBtn.addEventListener("click", function () {
     karaokeInner.classList.add("show");
     player.classList.add("bottom");
});
karaokeCloseBtn.addEventListener("click", function () {
     karaokeInner.classList.remove("show");
     player.classList.remove("bottom");
});

var karaokeInterval;
// Lắng nghe sự kiện play, pause
audio.addEventListener("play", function () {
     console.log("play");
     karaokeInterval = setInterval(handleKaraoke, 100);
});
audio.addEventListener("pause", function () {
     console.log("pause");
     clearInterval(karaokeInterval);
});

var handleKaraoke = function () {
     console.log(audio.currentTime);
     const currentTime = audio.currentTime * 1000;
     var index = lyricData.findIndex(function (lyricItem) {
          return (
               currentTime >= lyricItem.words[0].startTime &&
               currentTime <= lyricItem.words[lyricItem.words.length - 1].endTime
          );
     });
     if (index !== -1) {
          if (index === 0) {
               // var sentencesFirst = lyricData[index].words
               //      .map(function (word) {
               //           return word.data;
               //      })
               //      .join(" ");
               // var sentencesSecond = lyricData[index + 1].words
               //      .map(function (word) {
               //           return word.data;
               //      })
               //      .join(" ");
               var outputHtml = `<p data-index="${index}">${getSentence(0)}</p>
                                   <p data-index="${index + 1}">${getSentence(1)}</p>`;
               karaokeContent.innerHTML = outputHtml;
          } else {
               // Số lẻ => Ẩn dòng đầu và hiển thị câu tiếp theo
               // Số chẵn => Ẩn dòng thứ 2 và hiển thị câu tiếp theo
               if (index % 2 !== 0) {
                    changeSentence(karaokeContent.children[0], getSentence(index + 1), index + 1);
                    // karaokeContent.children[0].innerText = getSentence(index + 1);
               } else {
                    changeSentence(karaokeContent.children[1], getSentence(index + 1), index + 1);
                    // karaokeContent.children[1].innerText = getSentence(index + 1);
               }
          }
          // Xử lý to màu
          var currentLineEl = karaokeContent.querySelector(`[data-index="${index}"]`);
          if (currentLineEl) {
               var wordIndex = getWordIndex(index, currentTime);
               Array.from(currentLineEl.children).forEach((wordEl, i) => {
                    console.log(wordEl);
                    if (wordIndex === 1) {
                         var word = lyricData[index].words[wordIndex];
                         var rate =
                              ((currentTime - word.startTime) * 100) /
                              (word.endTime - word.startTime);
                         wordEl.children[0].style.width = `${rate}%`;
                         if (i > 0) {
                              // Cập nhật từ trc
                              Array.from(currentLineEl.children)[i - 1].children[0].style.width =
                                   "100%";
                         }
                    }
               });
          }
     }
};
var getSentence = function (index) {
     return lyricData[index].words
          .map(function (word) {
               return `<span class="word">
                         ${word.data}
                         <span>${word.data}</span>
                    </span>`;
          })
          .join(" ");
};
var changeSentence = function (el, sentence, index) {
     el.style.transition = "all .4s linear";
     el.style.opacity = 0;
     setTimeout(function () {
          el.innerHTML = sentence;
          el.style.opacity = 1;
          el.dataset.index = index;
     }, 300);
};
var getWordIndex = function (index, currentTime) {
     return lyricData[index].words.findIndex((item) => {
          return currentTime >= item.startTime && currentTime <= item.endTime;
     });
};
