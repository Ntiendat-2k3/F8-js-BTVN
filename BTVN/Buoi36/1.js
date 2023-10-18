var songName = "Hoa Cỏ Lau";
var singerName = "Phong Max";

/**
 * Khởi tạo yêu cầu dùng GPU để render các câu hát
 * cho hiệu ứng được mượt mà hơn hay vì dùng event timeupdate
 */
var requestAnimationFrame =
     window.requestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var audio = document.querySelector("audio");
var player = document.querySelector(".player");
var playBtn = document.querySelector(".play-btn");
var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var karaokeModel = document.getElementById("karaoke-model");
var karaokeToggle = document.querySelectorAll(".karaoke-btn");

var progressSpan = progress.children[0];
var timeLeft = progressBar.nextElementSibling;
var timeRight = progressBar.previousElementSibling;
var isSeeking = false;

/**
 * @typedef {Object} Word
 * @property {number} startTime
 * @property {number} endTime
 * @property {string} data
 */

/**
 * @typedef {Object} Sentence
 * @property {Word[]} words
 * @property {[number, number]} timeRange
 */

/**
 * @typedef {Object} KaraokeData
 * @property {Sentence[]} sentences
 */

/**
 * @class
 * @param {HTMLElement} rootElm
 * @param {KaraokeData} data
 */
function Karaoke(rootElm, data = []) {
     /** @type {Sentence[]} */
     this.lyrics = data.sentences.map(function (s) {
          var startTime = s.words[0].startTime;
          var endTime = s.words[s.words.length - 1].endTime;
          return { ...s, timeRange: [startTime, endTime] };
     });

     this.lines = [null, null];

     this.countDownTimeOut = null;
     this.countDownInterval = null;
     this.countDownTime = data.sentences[0].words[0].startTime - 3000;

     /** @type {HTMLElement} */
     this.firstLine = null;

     /** @type {HTMLElement} */
     this.secondLine = null;

     this.start = function () {
          this.firstLine = document.createElement("div");
          this.firstLine.classList.add("words");
          this.secondLine = document.createElement("div");
          this.secondLine.classList.add("words");
          rootElm.append(this.firstLine, this.secondLine);
     };

     this.requestId = undefined;

     this.setRequest = function (requestId) {
          this.requestId = requestId;
     };

     this.resetCountDown = function () {
          if (this.countDownTimeOut) {
               clearTimeout(this.countDownTimeOut);
          }

          if (this.countDownInterval) {
               clearTimeout(this.countDownInterval);
               this.countDownInterval = null;
          }

          for (const dot of rootElm.previousElementSibling.children) {
               dot.style.opacity = 1;
          }
     };

     this.hideCountDown = function () {
          this.resetCountDown();
          rootElm.previousElementSibling.classList.remove("show");
     };

     this.startCountDown = function (currentTime = 0) {
          this.resetCountDown();

          if (currentTime <= this.countDownTime) {
               this.countDownTimeOut = setTimeout(() => {
                    var i = 2;
                    rootElm.previousElementSibling.classList.add("show");
                    this.countDownInterval = setInterval(() => {
                         rootElm.previousElementSibling.children[i].style.opacity = 0;
                         i--;

                         if (i < 0) {
                              this.hideCountDown();
                              clearInterval(this.countDownInterval);
                         }
                    }, 1000);
               }, this.countDownTime - currentTime);
          }
     };

     this.run = function (currentTime) {
          requestAnimationFrame(karaokeRender);
          this.startCountDown(currentTime);
     };

     this.pause = function () {
          cancelAnimationFrame(this.requestId);
          this.setRequest();
          this.hideCountDown();
     };
}

var karaoke = new Karaoke(document.getElementById("karaoke"), lyricData.data);
karaoke.start();

function getWordPercent(word, currentTime) {
     return currentTime <= word.startTime
          ? 0
          : currentTime <= word.endTime
          ? (currentTime - word.startTime) / (word.endTime - word.startTime)
          : 1;
}

/**
 * @param {string} id
 * @param {number} currentTime
 * @param {Sentence} sentence
 * @param {HTMLElement} elm
 * @param {number} offetRange
 */
function getSentenceWords(id, sentence, currentTime, elm, offetRange) {
     // *(1) Kiểm tra xem câu hát hiện tại có đang được hiện thị hay không
     if (elm.children.length > 0 && elm.dataset.id == id) {
          /**
           * Nếu được được hiện thị thì tiến hành
           * tính toán lại phần trăm của từng từ trong câu
           * so với thời gian hiện tại của bài hát
           */
          // console.log({ offetRange });
          var index = 0;
          /**
           * 50% giá trị của {{offetRange}} dùng để
           * tạo delay cho hiệu ứng opacity
           * và 50% còn là thời gian để ẩn đi
           */
          elm.style.transitionDelay = `${offetRange / 2}ms`;
          elm.style.transition = `opacity ${offetRange / 2}ms ease-out`;

          for (var word of elm.children) {
               var percent = getWordPercent(sentence.words[index], currentTime);
               word.children[1].style.width = (percent * 100).toFixed(2) + "%";
               if (index === sentence.words.length - 1 && percent === 1) {
                    elm.style.opacity = 0;
               }

               index++;
          }
     } else {
          /**
           * Nếu câu hát hiện tại không phải là câu
           * đang được hiện thị trong element thì tiến hành
           * xóa nó đi và khởi tạo các thành phần cho câu hát mới
           *
           * Đặt lại opacity và transitionDelay cho câu hát mới này
           */
          elm.innerHTML = "";
          elm.style.opacity = 1;
          // elm.style.transition = "";
          elm.style.transitionDelay = 0;

          elm.append(
               ...sentence.words.map(function (word) {
                    var percent = getWordPercent(word, currentTime);
                    var wordWrap = document.createElement("div");
                    wordWrap.classList.add("word-wrap");
                    var span = document.createElement("span");
                    span.textContent =
                         index === sentence.words.length - 1 ? word.data : word.data + " ";
                    var spanShadow = span.cloneNode(true);
                    spanShadow.style.width = (percent * 100).toFixed(2) + "%";
                    wordWrap.append(span, spanShadow);
                    return wordWrap;
               })
          );

          // Đặt id cho element dùng để xác định câu hát hiện tại ở *(1)
          elm.dataset.id = id.toString();
     }
}

function karaokeRender() {
     var offetRange = 0;
     var currentTime = audio.currentTime * 1000;

     var index = karaoke.lyrics.findIndex(function (sentence) {
          /**
           * Giá trị {{offetRange}} là khoảng thời gian bằng 20%
           * thời gian của câu hát sẽ được hiện thị
           * dùng để tạo hiệu ứng cho câu hát được ẩn đi mượt hơn
           */
          offetRange = (sentence.timeRange[1] - sentence.timeRange[0]) * 0.2;
          return (
               currentTime >= sentence.timeRange[0] - 5000 &&
               currentTime <= sentence.timeRange[1] + offetRange
          );
     });

     if (index > -1) {
          /**
           * Tính toán xem trong 5 (5000ms) giây tiếp theo bài hát có câu nào đc hát hay không
           */
          var hasNext = false;
          var nextSentence = karaoke.lyrics[index + 1];

          if (nextSentence) {
               hasNext = nextSentence.timeRange[0] - karaoke.lyrics[index].timeRange[1] < 5000;
          }

          /**
           * Chuyển câu tiếp theo lên dòng đầu tiên nếu
           * câu hiện tại đang hiển thị ở dòng thử 2
           *
           * Nếu không không có câu tiếp theo thì
           * xóa câu trong dòng trước đó đi
           */
          if (karaoke.lines[1] === index) {
               karaoke.lines = hasNext ? [index + 1, index] : [null, index];
          } else {
               karaoke.lines = hasNext ? [index, index + 1] : [index, null];
          }

          var current = karaoke.lyrics[karaoke.lines[0]];
          var next = karaoke.lyrics[karaoke.lines[1]];

          if (current) {
               getSentenceWords(
                    index,
                    current,
                    audio.currentTime * 1000,
                    karaoke.firstLine,
                    offetRange
               );
          }

          if (next) {
               getSentenceWords(
                    index + 1,
                    next,
                    audio.currentTime * 1000,
                    karaoke.secondLine,
                    offetRange
               );
          }
     } else {
          /**
           * Nếu không có câu nào được hát thì
           * hiện tên bài hát và tên ca sĩ
           */
          karaoke.firstLine.style.opacity = 1;
          karaoke.firstLine.innerHTML = songName;
          karaoke.firstLine.dataset.id = "";

          karaoke.secondLine.style.opacity = 1;
          karaoke.secondLine.innerHTML = singerName;
          karaoke.secondLine.dataset.id = "";
     }

     karaoke.setRequest(requestAnimationFrame(karaokeRender));
}

function updateProgress(percent, seeking = false) {
     if (percent < 0) {
          percent = 0;
     }
     if (percent > 100) {
          percent = 100;
     }
     if (seeking) {
          karaoke.pause();
          audio.currentTime = Math.floor((audio.duration / 100) * percent);
          karaoke.run(audio.currentTime * 1000);
     }
     progress.style.width = `${percent}%`;
}

function dragging() {
     var flag = true;
     isSeeking = true;
     function moveAt(event, seeking) {
          var bounding = progressBar.getBoundingClientRect();
          var diffOffetX = event.clientX - bounding.left;
          updateProgress((diffOffetX / progressBar.clientWidth) * 100, seeking);
     }

     document.addEventListener("mouseup", function (event) {
          flag && moveAt(event, flag);
          flag = false;
          isSeeking = false;
          document.removeEventListener("mousemove", moveAt);
     });

     document.addEventListener("mousemove", moveAt);
}

function millisToMinutesAndSeconds(millis) {
     var minutes = Math.floor(millis / 60000);
     var seconds = ((millis % 60000) / 1000).toFixed(0);

     if (seconds === "60") {
          minutes++;
          seconds = 0;
     }

     return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function updateTime(currentTime, totalTime) {
     timeLeft.textContent = millisToMinutesAndSeconds(totalTime);
     timeRight.textContent = millisToMinutesAndSeconds(currentTime);
     !isSeeking && updateProgress((currentTime / totalTime) * 100);
}

progressBar.addEventListener("mousedown", function (event) {
     if (event.which === 1) {
          var percent = (event.offsetX / progressBar.clientWidth) * 100;
          updateProgress(percent, true);
     }
});

progressSpan.addEventListener("mousedown", function (event) {
     event.stopPropagation();
     dragging();
});

playBtn.addEventListener("click", function () {
     if (audio.paused) {
          audio.play();
     } else {
          audio.pause();
     }
});

audio.addEventListener("loadeddata", function () {
     updateTime(0, audio.duration * 1000);
     player.classList.add("paused");
});

audio.addEventListener("timeupdate", function () {
     updateTime(audio.currentTime * 1000, audio.duration * 1000);
});

audio.addEventListener("pause", function () {
     karaoke.pause();
     player.classList.remove("playing");
     player.classList.add("paused");
});

audio.addEventListener("play", function () {
     karaoke.run(audio.currentTime * 1000);
     player.classList.remove("paused");
     player.classList.add("playing");
});

karaokeToggle.forEach(function (e) {
     e.addEventListener("click", function () {
          this.classList.toggle("active");
          karaokeModel.classList.toggle("show");
     });
});
