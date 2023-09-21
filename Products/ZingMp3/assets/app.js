const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const progressBar = $(".progress-bar");
const progressSpan = $(".progress-bar span");
const progress = $(".progress");

const progressBarWidth = progressBar.clientWidth;
let isDrag = false;
let initialClientX = 0;
let current = 0;
let approximately;

const handleChange = (width) => {
     var value = (width * 100) / progressBarWidth;
     if (value < 0) {
          value = 0;
     }
     if (value > 100) {
          value = 100;
     }
     progress.style.width = `${value}%`;
     approximately = width;

     let currentTime = (value / 100) * audio.duration;
     audio.currentTime = currentTime;
};
progressBar.addEventListener("mousedown", function (e) {
     if (e.which === 1) {
          isDrag = true;
          handleChange(e.offsetX);
          initialClientX = e.clientX;
          current = e.offsetX;
     }
});
progressSpan.addEventListener("mousedown", function (e) {
     e.stopPropagation();
     isDrag = true;
     initialClientX = e.clientX;
});
document.addEventListener("mouseup", function () {
     isDrag = false;
     // console.log(approximately);
     current = approximately;
});
document.addEventListener("mousemove", function (e) {
     if (isDrag) {
          let moveWidth = e.clientX - initialClientX;
          handleChange(moveWidth + current);
     }
});

/// Music
// const audio = new Audio("./audio/HatMuaVuongVan.mp3");
const audio = $(".audio");
const playBtn = $(".play-btn");
let currentTimeEl = progressBar.previousElementSibling;
let durationTimeEl = progressBar.nextElementSibling;

const getTime = (seconds) => {
     let mins = Math.floor(seconds / 60);
     seconds = Math.floor(seconds - mins * 60);
     return `${mins}:${seconds < 10 ? "0" + seconds : seconds}`;
};
audio.addEventListener("loadeddata", function () {
     // console.log(getTime(audio.duration));
     durationTimeEl.innerHTML = getTime(audio.duration);
});
const pauseIcon = `<i class="fa-solid fa-pause"></i>`;
const playIcon = `<i class="fa-solid fa-play"></i>`;
playBtn.addEventListener("click", function () {
     // console.log(audio.paused);
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
     currentTimeEl.innerHTML = getTime(audio.currentTime);

     let value = (audio.currentTime * 100) / audio.duration;
     progress.style.width = `${value}%`;
});

/// karaoke
const closeBtn = $(".close");
const karaokeInner = $(".karaoke-inner");
const player = $(".player");
const karaokePlay = $(".karaoke-play");
const karaokeContent = $(".karaoke-content");

closeBtn.addEventListener("click", function () {
     karaokeInner.classList.add("show");
     player.classList.remove("bottom");
});
karaokePlay.addEventListener("click", function () {
     karaokeInner.classList.remove("show");
     player.classList.add("bottom");
});

let karaokeInterval;
console.log(lyric);
//: lắng nghe sự kiện play
audio.addEventListener("play", function () {
     karaokeInterval = setInterval(handleKaraoke, 100);
});
//: lắng nghe sự kiện pause
audio.addEventListener("pause", function () {
     clearInterval(karaokeInterval);
});
const handleKaraoke = () => {
     // console.log(audio.currentTime);
     let currentTime = audio.currentTime * 1000;
     var index = lyric.findIndex(function (lyricItem) {
          return (
               currentTime >= lyricItem.words[0].startTime &&
               currentTime <= lyricItem.words[lyricItem.words.length - 1].endTime
          );
     });
     if (index !== -1) {
          // let sentenceFirst = lyric[index].words
          //      .map((word) => {
          //           return word.data;
          //      })
          //      .join(" ");
          // let sentenceSecond = lyric[index + 1].words
          //      .map((word) => {
          //           return word.data;
          //      })
          //      .join(" ");
          if (index === 0) {
               let outputHTML = `<p data-index="${index}">${getSentences(0)}</p>
                                   <p data-index="${index + 1}>${getSentences(1)}</p>`;
               karaokeContent.innerHTML = outputHTML;
          } else {
               //  lẻ => Ẩn dòng đầu , hiển thị câu tiếp theo
               //  chẵn => Ẩn dòng 2 , hiển thị câu tiếp theo
               if (index % 2 !== 0) {
                    // karaokeContent.children[0].style.transition = "all .4s linear";
                    // karaokeContent.children[0].style.opacity = 0;
                    // setTimeout(function () {
                    //      karaokeContent.children[0].innerText = getSentences(index + 1);
                    //      karaokeContent.children[0].style.opacity = 1;
                    // }, 400);
                    changeSentences(karaokeContent.children[0], getSentences(index + 1), index + 1);
               } else {
                    // karaokeContent.children[1].innerText = getSentences(index + 1);
                    changeSentences(karaokeContent.children[1], getSentences(index + 1), index + 1);
               }
          }

          /// Tô màu
          const currentLineEl = karaokeContent.querySelector(`[data-index="${index}"]`);
          
     }
};

const getSentences = (index) => {
     return lyric[index].words
          .map((word) => {
               return `<span class="word">
                         ${word.data}
                         <span>${word.data}</span>
                    </span>`;
          })
          .join(" ");
};
const changeSentences = (element, sentence, index) => {
     element.style.transition = "all .3s linear";
     element.style.opacity = 0;
     setTimeout(function () {
          element.innerHTML = sentence;
          element.style.opacity = 1;
          element.dataset.index = index;
     }, 300);
};

/**
 * index = 1 -> Ẩn element 0 -> hiển thị index = 2
 * index = 2 -> Ẩn element 1 -> hiển thị index = 3
 * index = 3 -> Ẩn element 0 -> hiển thị index = 4
 * index = 4 -> Ẩn element 1 -> hiển thị index = 5 ...
 */
