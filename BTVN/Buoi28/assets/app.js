var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");

var timer = document.querySelector(".timer");

var isDrag = false;
var value = 0;
var initialClientX = 0;
var initialValue = 0;

var audio = document.querySelector(".audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationTimeEl = progressBar.nextElementSibling;
var playBtn = document.querySelector(".play-btn");

var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var progressBarWidth = progressBar.clientWidth;

var getTime = function (second) {
     var minute = Math.floor(second / 60);
     var second = Math.floor(second - minute * 60);
     second = second < 10 ? `0${second}` : second;
     minute = minute < 10 ? `0${minute}` : minute;
     return `${minute}:${second}`;
};

var handleUpdateValue = function (value) {
     if (value > 100) {
          value = 100;
     }
     if (value < 0) {
          value = 0;
     }
     progress.style.width = `${value}%`;
};

progressBar.addEventListener("mousedown", function (e) {
     if (e.which === 1) {
          value = (100 * e.offsetX) / progressBarWidth;
          handleUpdateValue(value);
          initialValue = value;
          isDrag = true;
          initialClientX = e.clientX;
          var time = (audio.duration * value) / 100;
          currentTimeEl.innerText = getTime(time);
          audio.currentTime = time;
     }
});

progressSpan.addEventListener("mousedown", function (e) {
     e.stopPropagation();
     isDrag = true;
     initialClientX = e.clientX;
});

document.addEventListener("mousemove", function (e) {
     if (isDrag) {
          var moveWidth = e.clientX - initialClientX;
          value = (moveWidth / progressBarWidth) * 100 + initialValue;
     }
     handleUpdateValue(value);
});

document.addEventListener("mouseup", function (e) {
     if (isDrag) {
          isDrag = false;
          initialValue = value;
          var time = (audio.duration * value) / 100;
          currentTimeEl.innerText = getTime(time);
          audio.currentTime = time;
     }
});

audio.addEventListener("loadeddata", function () {
     durationTimeEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function (e) {
     e.stopPropagation();
     if (audio.paused) {
          audio.play();
          playBtn.innerHTML = pauseIcon;
     } else {
          audio.pause();
          playBtn.innerHTML = playIcon;
     }
});

audio.addEventListener("timeupdate", function () {
     if (!isDrag) {
          value = (100 * audio.currentTime) / audio.duration;
          progress.style.width = `${value}%`;
          currentTimeEl.innerText = getTime(audio.currentTime);
          handleLyric(audio.currentTime);
     }
});

audio.addEventListener("ended", function () {
     value = 0;
     audio.currentTime = 0;
     progress.style.width = `${value}%`;
     playBtn.innerHTML = playIcon;
});

progressBar.addEventListener("mousemove", function (e) {
     e.stopPropagation();
     timer.style.display = "block";
     timer.style.left = `${e.offsetX}px`;
     var rate = (100 * e.offsetX) / progressBarWidth;
     var time = (audio.duration * rate) / 100;
     timer.innerText = getTime(time);
});

progressBar.addEventListener("mouseout", function () {
     timer.style.display = "none";
});

progressSpan.addEventListener("mousemove", function (e) {
     e.stopPropagation();
});

progressSpan.addEventListener("mouseover", function (e) {
     e.stopPropagation();
     timer.style.display = "none";
});

// Karaoke
var lyricData = ` [
      {
        "words": [
          {
            "startTime": 28350,
            "endTime": 28630,
            "data": "Có"
          },
          {
            "startTime": 28630,
            "endTime": 28890,
            "data": "những"
          },
          {
            "startTime": 28890,
            "endTime": 29150,
            "data": "nỗi"
          },
          {
            "startTime": 29150,
            "endTime": 29430,
            "data": "nhớ"
          },
          {
            "startTime": 29430,
            "endTime": 29690,
            "data": "khuất"
          },
          {
            "startTime": 29690,
            "endTime": 30220,
            "data": "sâu"
          },
          {
            "startTime": 30220,
            "endTime": 30490,
            "data": "trong"
          },
          {
            "startTime": 30490,
            "endTime": 31020,
            "data": "đêm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 31020,
            "endTime": 31540,
            "data": "Cùng"
          },
          {
            "startTime": 31540,
            "endTime": 31810,
            "data": "với"
          },
          {
            "startTime": 31810,
            "endTime": 32070,
            "data": "những"
          },
          {
            "startTime": 32070,
            "endTime": 32340,
            "data": "kí"
          },
          {
            "startTime": 32340,
            "endTime": 32610,
            "data": "ức"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 32610,
            "endTime": 33130,
            "data": "Đã"
          },
          {
            "startTime": 33130,
            "endTime": 33410,
            "data": "tan"
          },
          {
            "startTime": 33410,
            "endTime": 33930,
            "data": "trong"
          },
          {
            "startTime": 33930,
            "endTime": 34470,
            "data": "mưa"
          },
          {
            "startTime": 34470,
            "endTime": 35460,
            "data": "buồn"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 35460,
            "endTime": 35730,
            "data": "Em"
          },
          {
            "startTime": 35730,
            "endTime": 36260,
            "data": "đâu"
          },
          {
            "startTime": 36260,
            "endTime": 38120,
            "data": "hay,"
          },
          {
            "startTime": 38120,
            "endTime": 38650,
            "data": "anh"
          },
          {
            "startTime": 38650,
            "endTime": 38910,
            "data": "mang"
          },
          {
            "startTime": 38910,
            "endTime": 39450,
            "data": "chua"
          },
          {
            "startTime": 39450,
            "endTime": 41040,
            "data": "cay"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 41040,
            "endTime": 41570,
            "data": "Hãy"
          },
          {
            "startTime": 41570,
            "endTime": 41830,
            "data": "nói"
          },
          {
            "startTime": 41830,
            "endTime": 42100,
            "data": "những"
          },
          {
            "startTime": 42100,
            "endTime": 42360,
            "data": "ước"
          },
          {
            "startTime": 42360,
            "endTime": 42630,
            "data": "muốn"
          },
          {
            "startTime": 42630,
            "endTime": 43170,
            "data": "trong"
          },
          {
            "startTime": 43170,
            "endTime": 43440,
            "data": "em"
          },
          {
            "startTime": 43440,
            "endTime": 43950,
            "data": "hôm"
          },
          {
            "startTime": 43950,
            "endTime": 44490,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 44490,
            "endTime": 44750,
            "data": "Để"
          },
          {
            "startTime": 44750,
            "endTime": 45030,
            "data": "xóa"
          },
          {
            "startTime": 45030,
            "endTime": 45290,
            "data": "những"
          },
          {
            "startTime": 45290,
            "endTime": 45550,
            "data": "kí"
          },
          {
            "startTime": 45550,
            "endTime": 46080,
            "data": "ức"
          },
          {
            "startTime": 46080,
            "endTime": 46350,
            "data": "trong"
          },
          {
            "startTime": 46350,
            "endTime": 46890,
            "data": "anh"
          },
          {
            "startTime": 46890,
            "endTime": 47150,
            "data": "cồn"
          },
          {
            "startTime": 47150,
            "endTime": 47680,
            "data": "cào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 47680,
            "endTime": 48210,
            "data": "Mà"
          },
          {
            "startTime": 48210,
            "endTime": 48740,
            "data": "em"
          },
          {
            "startTime": 48740,
            "endTime": 49270,
            "data": "đâu"
          },
          {
            "startTime": 49270,
            "endTime": 51400,
            "data": "hay"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 51400,
            "endTime": 51940,
            "data": "Anh"
          },
          {
            "startTime": 51940,
            "endTime": 52190,
            "data": "đang"
          },
          {
            "startTime": 52190,
            "endTime": 52730,
            "data": "nơi"
          },
          {
            "startTime": 52730,
            "endTime": 53520,
            "data": "dây"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 53520,
            "endTime": 53790,
            "data": "Hạt"
          },
          {
            "startTime": 53790,
            "endTime": 54320,
            "data": "mưa"
          },
          {
            "startTime": 54320,
            "endTime": 54850,
            "data": "vương"
          },
          {
            "startTime": 54850,
            "endTime": 56720,
            "data": "vấn"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 56720,
            "endTime": 57230,
            "data": "Em"
          },
          {
            "startTime": 57230,
            "endTime": 57510,
            "data": "giờ"
          },
          {
            "startTime": 57510,
            "endTime": 58030,
            "data": "đây"
          },
          {
            "startTime": 58030,
            "endTime": 58570,
            "data": "đang"
          },
          {
            "startTime": 58570,
            "endTime": 59100,
            "data": "nơi"
          },
          {
            "startTime": 59100,
            "endTime": 60170,
            "data": "đâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 60170,
            "endTime": 60430,
            "data": "Một"
          },
          {
            "startTime": 60430,
            "endTime": 60960,
            "data": "mình"
          },
          {
            "startTime": 60960,
            "endTime": 61220,
            "data": "anh"
          },
          {
            "startTime": 61220,
            "endTime": 62020,
            "data": "trong"
          },
          {
            "startTime": 62020,
            "endTime": 62820,
            "data": "đêm"
          },
          {
            "startTime": 62820,
            "endTime": 63350,
            "data": "thâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 63350,
            "endTime": 63890,
            "data": "Xóa"
          },
          {
            "startTime": 63890,
            "endTime": 64420,
            "data": "tan"
          },
          {
            "startTime": 64420,
            "endTime": 65210,
            "data": "nỗi"
          },
          {
            "startTime": 65210,
            "endTime": 66810,
            "data": "sầu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 66810,
            "endTime": 67330,
            "data": "Hòa"
          },
          {
            "startTime": 67330,
            "endTime": 67610,
            "data": "cùng"
          },
          {
            "startTime": 67610,
            "endTime": 68130,
            "data": "yêu"
          },
          {
            "startTime": 68130,
            "endTime": 70250,
            "data": "dấu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 70250,
            "endTime": 70520,
            "data": "Nỗi"
          },
          {
            "startTime": 70520,
            "endTime": 70790,
            "data": "buồn"
          },
          {
            "startTime": 70790,
            "endTime": 71310,
            "data": "anh"
          },
          {
            "startTime": 71310,
            "endTime": 72110,
            "data": "đang"
          },
          {
            "startTime": 72110,
            "endTime": 72650,
            "data": "chôn"
          },
          {
            "startTime": 72650,
            "endTime": 73450,
            "data": "sâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 73450,
            "endTime": 73710,
            "data": "Theo"
          },
          {
            "startTime": 73710,
            "endTime": 74240,
            "data": "cùng"
          },
          {
            "startTime": 74240,
            "endTime": 74500,
            "data": "hạt"
          },
          {
            "startTime": 74500,
            "endTime": 75300,
            "data": "mưa"
          },
          {
            "startTime": 75300,
            "endTime": 75830,
            "data": "tan"
          },
          {
            "startTime": 75830,
            "endTime": 76630,
            "data": "mau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 76630,
            "endTime": 77170,
            "data": "Trôi"
          },
          {
            "startTime": 77170,
            "endTime": 77700,
            "data": "về"
          },
          {
            "startTime": 77700,
            "endTime": 80700,
            "data": "đâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 82480,
            "endTime": 82740,
            "data": "Phải"
          },
          {
            "startTime": 82740,
            "endTime": 83000,
            "data": "cố"
          },
          {
            "startTime": 83000,
            "endTime": 83800,
            "data": "quên"
          },
          {
            "startTime": 83800,
            "endTime": 85390,
            "data": "nhau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 85390,
            "endTime": 85660,
            "data": "Dù"
          },
          {
            "startTime": 85660,
            "endTime": 86190,
            "data": "những"
          },
          {
            "startTime": 86190,
            "endTime": 86980,
            "data": "cơn"
          },
          {
            "startTime": 86980,
            "endTime": 88330,
            "data": "đau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 88330,
            "endTime": 88590,
            "data": "Không"
          },
          {
            "startTime": 88590,
            "endTime": 89130,
            "data": "sao"
          },
          {
            "startTime": 89130,
            "endTime": 89670,
            "data": "đâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 89670,
            "endTime": 90190,
            "data": "Do"
          },
          {
            "startTime": 90190,
            "endTime": 90470,
            "data": "yêu"
          },
          {
            "startTime": 90470,
            "endTime": 90980,
            "data": "nhau"
          },
          {
            "startTime": 90980,
            "endTime": 91260,
            "data": "có"
          },
          {
            "startTime": 91260,
            "endTime": 92050,
            "data": "lâu"
          },
          {
            "startTime": 92050,
            "endTime": 92850,
            "data": "đâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 92850,
            "endTime": 93110,
            "data": "Yêu"
          },
          {
            "startTime": 93110,
            "endTime": 93380,
            "data": "chẳng"
          },
          {
            "startTime": 93380,
            "endTime": 93650,
            "data": "được"
          },
          {
            "startTime": 93650,
            "endTime": 94180,
            "data": "đậm"
          },
          {
            "startTime": 94180,
            "endTime": 94980,
            "data": "sâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 94980,
            "endTime": 95250,
            "data": "Vì"
          },
          {
            "startTime": 95250,
            "endTime": 95510,
            "data": "lừa"
          },
          {
            "startTime": 95510,
            "endTime": 96040,
            "data": "dối"
          },
          {
            "startTime": 96040,
            "endTime": 96300,
            "data": "hay"
          },
          {
            "startTime": 96300,
            "endTime": 96830,
            "data": "do"
          },
          {
            "startTime": 96830,
            "endTime": 97370,
            "data": "ai"
          },
          {
            "startTime": 97370,
            "endTime": 97890,
            "data": "sai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 97890,
            "endTime": 98430,
            "data": "Tình"
          },
          {
            "startTime": 98430,
            "endTime": 98970,
            "data": "ngang"
          },
          {
            "startTime": 98970,
            "endTime": 99230,
            "data": "trái"
          },
          {
            "startTime": 99230,
            "endTime": 99760,
            "data": "biết"
          },
          {
            "startTime": 99760,
            "endTime": 100020,
            "data": "lỗi"
          },
          {
            "startTime": 100020,
            "endTime": 100560,
            "data": "do"
          },
          {
            "startTime": 100560,
            "endTime": 101350,
            "data": "ai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 101350,
            "endTime": 101880,
            "data": "Nhìn"
          },
          {
            "startTime": 101880,
            "endTime": 102150,
            "data": "cơn"
          },
          {
            "startTime": 102150,
            "endTime": 102670,
            "data": "mưa"
          },
          {
            "startTime": 102670,
            "endTime": 102950,
            "data": "nhớ"
          },
          {
            "startTime": 102950,
            "endTime": 103480,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 103480,
            "endTime": 104000,
            "data": "Trong"
          },
          {
            "startTime": 104000,
            "endTime": 104270,
            "data": "lòng"
          },
          {
            "startTime": 104270,
            "endTime": 104800,
            "data": "vương"
          },
          {
            "startTime": 104800,
            "endTime": 107800,
            "data": "vấn"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 108260,
            "endTime": 108520,
            "data": "Có"
          },
          {
            "startTime": 108520,
            "endTime": 108790,
            "data": "những"
          },
          {
            "startTime": 108790,
            "endTime": 109060,
            "data": "nỗi"
          },
          {
            "startTime": 109060,
            "endTime": 109320,
            "data": "nhớ"
          },
          {
            "startTime": 109320,
            "endTime": 109580,
            "data": "khuất"
          },
          {
            "startTime": 109580,
            "endTime": 110110,
            "data": "sâu"
          },
          {
            "startTime": 110110,
            "endTime": 110650,
            "data": "trong"
          },
          {
            "startTime": 110650,
            "endTime": 110910,
            "data": "đêm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 110910,
            "endTime": 111440,
            "data": "Cùng"
          },
          {
            "startTime": 111440,
            "endTime": 111710,
            "data": "với"
          },
          {
            "startTime": 111710,
            "endTime": 111970,
            "data": "những"
          },
          {
            "startTime": 111970,
            "endTime": 112250,
            "data": "kí"
          },
          {
            "startTime": 112250,
            "endTime": 112780,
            "data": "ức"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 112780,
            "endTime": 113050,
            "data": "Đã"
          },
          {
            "startTime": 113050,
            "endTime": 113310,
            "data": "tan"
          },
          {
            "startTime": 113310,
            "endTime": 113830,
            "data": "trong"
          },
          {
            "startTime": 113830,
            "endTime": 114360,
            "data": "mưa"
          },
          {
            "startTime": 114360,
            "endTime": 114630,
            "data": "buồn"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 114630,
            "endTime": 115160,
            "data": "Em"
          },
          {
            "startTime": 115160,
            "endTime": 115950,
            "data": "đâu"
          },
          {
            "startTime": 115950,
            "endTime": 118090,
            "data": "hay,"
          },
          {
            "startTime": 118090,
            "endTime": 118620,
            "data": "anh"
          },
          {
            "startTime": 118620,
            "endTime": 118880,
            "data": "mang"
          },
          {
            "startTime": 118880,
            "endTime": 119410,
            "data": "chua"
          },
          {
            "startTime": 119410,
            "endTime": 121010,
            "data": "cay"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 121010,
            "endTime": 121540,
            "data": "Hãy"
          },
          {
            "startTime": 121540,
            "endTime": 121820,
            "data": "nói"
          },
          {
            "startTime": 121820,
            "endTime": 122080,
            "data": "những"
          },
          {
            "startTime": 122080,
            "endTime": 122340,
            "data": "ước"
          },
          {
            "startTime": 122340,
            "endTime": 122610,
            "data": "muốn"
          },
          {
            "startTime": 122610,
            "endTime": 123130,
            "data": "trong"
          },
          {
            "startTime": 123130,
            "endTime": 123400,
            "data": "em"
          },
          {
            "startTime": 123400,
            "endTime": 123930,
            "data": "hôm"
          },
          {
            "startTime": 123930,
            "endTime": 124190,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 124190,
            "endTime": 124730,
            "data": "Để"
          },
          {
            "startTime": 124730,
            "endTime": 124990,
            "data": "xóa"
          },
          {
            "startTime": 124990,
            "endTime": 125250,
            "data": "những"
          },
          {
            "startTime": 125250,
            "endTime": 125530,
            "data": "kí"
          },
          {
            "startTime": 125530,
            "endTime": 126050,
            "data": "ức"
          },
          {
            "startTime": 126050,
            "endTime": 126330,
            "data": "trong"
          },
          {
            "startTime": 126330,
            "endTime": 126850,
            "data": "anh"
          },
          {
            "startTime": 126850,
            "endTime": 127120,
            "data": "cồn"
          },
          {
            "startTime": 127120,
            "endTime": 128130,
            "data": "cào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 128130,
            "endTime": 128940,
            "data": "Em"
          },
          {
            "startTime": 128940,
            "endTime": 129200,
            "data": "đâu"
          },
          {
            "startTime": 129200,
            "endTime": 131320,
            "data": "hay"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 131320,
            "endTime": 131850,
            "data": "Anh"
          },
          {
            "startTime": 131850,
            "endTime": 132110,
            "data": "đang"
          },
          {
            "startTime": 132110,
            "endTime": 132640,
            "data": "nơi"
          },
          {
            "startTime": 132640,
            "endTime": 133710,
            "data": "dây"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 133710,
            "endTime": 133960,
            "data": "Hạt"
          },
          {
            "startTime": 133960,
            "endTime": 134240,
            "data": "mưa"
          },
          {
            "startTime": 134240,
            "endTime": 134760,
            "data": "vương"
          },
          {
            "startTime": 134760,
            "endTime": 136900,
            "data": "vấn"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 136900,
            "endTime": 137160,
            "data": "Em"
          },
          {
            "startTime": 137160,
            "endTime": 137690,
            "data": "giờ"
          },
          {
            "startTime": 137690,
            "endTime": 137950,
            "data": "đây"
          },
          {
            "startTime": 137950,
            "endTime": 138750,
            "data": "đang"
          },
          {
            "startTime": 138750,
            "endTime": 139280,
            "data": "nơi"
          },
          {
            "startTime": 139280,
            "endTime": 140080,
            "data": "đâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 140080,
            "endTime": 140620,
            "data": "Một"
          },
          {
            "startTime": 140620,
            "endTime": 140880,
            "data": "mình"
          },
          {
            "startTime": 140880,
            "endTime": 141410,
            "data": "anh"
          },
          {
            "startTime": 141410,
            "endTime": 141930,
            "data": "trong"
          },
          {
            "startTime": 141930,
            "endTime": 142470,
            "data": "đêm"
          },
          {
            "startTime": 142470,
            "endTime": 143260,
            "data": "thâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 143260,
            "endTime": 143800,
            "data": "Xóa"
          },
          {
            "startTime": 143800,
            "endTime": 144600,
            "data": "tan"
          },
          {
            "startTime": 144600,
            "endTime": 145130,
            "data": "nỗi"
          },
          {
            "startTime": 145130,
            "endTime": 146720,
            "data": "sầu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 146720,
            "endTime": 146980,
            "data": "Hòa"
          },
          {
            "startTime": 146980,
            "endTime": 147520,
            "data": "cùng"
          },
          {
            "startTime": 147520,
            "endTime": 148040,
            "data": "yêu"
          },
          {
            "startTime": 148040,
            "endTime": 150180,
            "data": "dấu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 150180,
            "endTime": 150440,
            "data": "Nỗi"
          },
          {
            "startTime": 150440,
            "endTime": 150710,
            "data": "buồn"
          },
          {
            "startTime": 150710,
            "endTime": 151230,
            "data": "anh"
          },
          {
            "startTime": 151230,
            "endTime": 152030,
            "data": "đang"
          },
          {
            "startTime": 152030,
            "endTime": 152560,
            "data": "chôn"
          },
          {
            "startTime": 152560,
            "endTime": 153360,
            "data": "sâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 153360,
            "endTime": 153900,
            "data": "Theo"
          },
          {
            "startTime": 153900,
            "endTime": 154160,
            "data": "cùng"
          },
          {
            "startTime": 154160,
            "endTime": 154700,
            "data": "hạt"
          },
          {
            "startTime": 154700,
            "endTime": 155210,
            "data": "mưa"
          },
          {
            "startTime": 155210,
            "endTime": 156010,
            "data": "tan"
          },
          {
            "startTime": 156010,
            "endTime": 156810,
            "data": "mau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 156810,
            "endTime": 157080,
            "data": "Trôi"
          },
          {
            "startTime": 157080,
            "endTime": 157610,
            "data": "về"
          },
          {
            "startTime": 157610,
            "endTime": 160610,
            "data": "đâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 161330,
            "endTime": 161600,
            "data": "Một"
          },
          {
            "startTime": 161600,
            "endTime": 161860,
            "data": "ngày"
          },
          {
            "startTime": 161860,
            "endTime": 162120,
            "data": "người"
          },
          {
            "startTime": 162120,
            "endTime": 162400,
            "data": "trở"
          },
          {
            "startTime": 162400,
            "endTime": 162930,
            "data": "về"
          },
          {
            "startTime": 162930,
            "endTime": 163720,
            "data": "trong"
          },
          {
            "startTime": 163720,
            "endTime": 164510,
            "data": "cơn"
          },
          {
            "startTime": 164510,
            "endTime": 167510,
            "data": "say"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 167970,
            "endTime": 168240,
            "data": "Anh"
          },
          {
            "startTime": 168240,
            "endTime": 168500,
            "data": "chẳng"
          },
          {
            "startTime": 168500,
            "endTime": 168770,
            "data": "phải"
          },
          {
            "startTime": 168770,
            "endTime": 169290,
            "data": "là"
          },
          {
            "startTime": 169290,
            "endTime": 170360,
            "data": "người"
          },
          {
            "startTime": 170360,
            "endTime": 170620,
            "data": "mau"
          },
          {
            "startTime": 170620,
            "endTime": 171160,
            "data": "đổi"
          },
          {
            "startTime": 171160,
            "endTime": 174160,
            "data": "thay"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 174340,
            "endTime": 174880,
            "data": "Dẫu"
          },
          {
            "startTime": 174880,
            "endTime": 175150,
            "data": "biết"
          },
          {
            "startTime": 175150,
            "endTime": 175410,
            "data": "rằng"
          },
          {
            "startTime": 175410,
            "endTime": 175940,
            "data": "người"
          },
          {
            "startTime": 175940,
            "endTime": 176470,
            "data": "không"
          },
          {
            "startTime": 176470,
            "endTime": 177000,
            "data": "trở"
          },
          {
            "startTime": 177000,
            "endTime": 177800,
            "data": "lại"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 177800,
            "endTime": 178070,
            "data": "Hãy"
          },
          {
            "startTime": 178070,
            "endTime": 178330,
            "data": "để"
          },
          {
            "startTime": 178330,
            "endTime": 178860,
            "data": "cuộc"
          },
          {
            "startTime": 178860,
            "endTime": 179130,
            "data": "tình"
          },
          {
            "startTime": 179130,
            "endTime": 179660,
            "data": "kia"
          },
          {
            "startTime": 179660,
            "endTime": 180190,
            "data": "tàn"
          },
          {
            "startTime": 180190,
            "endTime": 180980,
            "data": "phai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 180980,
            "endTime": 181510,
            "data": "Sẽ"
          },
          {
            "startTime": 181510,
            "endTime": 181780,
            "data": "chẳng"
          },
          {
            "startTime": 181780,
            "endTime": 182070,
            "data": "còn"
          },
          {
            "startTime": 182070,
            "endTime": 182570,
            "data": "gì"
          },
          {
            "startTime": 182570,
            "endTime": 183110,
            "data": "quanh"
          },
          {
            "startTime": 183110,
            "endTime": 183650,
            "data": "ta"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 183650,
            "endTime": 183910,
            "data": "Giờ"
          },
          {
            "startTime": 183910,
            "endTime": 184170,
            "data": "không"
          },
          {
            "startTime": 184170,
            "endTime": 184710,
            "data": "còn"
          },
          {
            "startTime": 184710,
            "endTime": 186830,
            "data": "ai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 186830,
            "endTime": 187090,
            "data": "Hạt"
          },
          {
            "startTime": 187090,
            "endTime": 187630,
            "data": "mưa"
          },
          {
            "startTime": 187630,
            "endTime": 188170,
            "data": "vương"
          },
          {
            "startTime": 188170,
            "endTime": 190020,
            "data": "vấn"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 190020,
            "endTime": 190560,
            "data": "Em"
          },
          {
            "startTime": 190560,
            "endTime": 190830,
            "data": "giờ"
          },
          {
            "startTime": 190830,
            "endTime": 191360,
            "data": "đây"
          },
          {
            "startTime": 191360,
            "endTime": 191890,
            "data": "đang"
          },
          {
            "startTime": 191890,
            "endTime": 192690,
            "data": "nơi"
          },
          {
            "startTime": 192690,
            "endTime": 193480,
            "data": "đâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 193480,
            "endTime": 193750,
            "data": "Một"
          },
          {
            "startTime": 193750,
            "endTime": 194030,
            "data": "mình"
          },
          {
            "startTime": 194030,
            "endTime": 194560,
            "data": "anh"
          },
          {
            "startTime": 194560,
            "endTime": 195350,
            "data": "trong"
          },
          {
            "startTime": 195350,
            "endTime": 195870,
            "data": "đêm"
          },
          {
            "startTime": 195870,
            "endTime": 196670,
            "data": "thâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 196670,
            "endTime": 196940,
            "data": "Xóa"
          },
          {
            "startTime": 196940,
            "endTime": 197740,
            "data": "tan"
          },
          {
            "startTime": 197740,
            "endTime": 198540,
            "data": "nỗi"
          },
          {
            "startTime": 198540,
            "endTime": 200130,
            "data": "sầu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 200130,
            "endTime": 200390,
            "data": "Hòa"
          },
          {
            "startTime": 200390,
            "endTime": 200930,
            "data": "cùng"
          },
          {
            "startTime": 200930,
            "endTime": 201450,
            "data": "yêu"
          },
          {
            "startTime": 201450,
            "endTime": 203570,
            "data": "dấu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 203570,
            "endTime": 203850,
            "data": "Nỗi"
          },
          {
            "startTime": 203850,
            "endTime": 204110,
            "data": "buồn"
          },
          {
            "startTime": 204110,
            "endTime": 204650,
            "data": "anh"
          },
          {
            "startTime": 204650,
            "endTime": 205170,
            "data": "đang"
          },
          {
            "startTime": 205170,
            "endTime": 205970,
            "data": "chôn"
          },
          {
            "startTime": 205970,
            "endTime": 206770,
            "data": "sâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 206770,
            "endTime": 207040,
            "data": "Theo"
          },
          {
            "startTime": 207040,
            "endTime": 207300,
            "data": "cùng"
          },
          {
            "startTime": 207300,
            "endTime": 207840,
            "data": "hạt"
          },
          {
            "startTime": 207840,
            "endTime": 208360,
            "data": "mưa"
          },
          {
            "startTime": 208360,
            "endTime": 209150,
            "data": "tan"
          },
          {
            "startTime": 209150,
            "endTime": 209950,
            "data": "mau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 209950,
            "endTime": 210220,
            "data": "Trôi"
          },
          {
            "startTime": 210220,
            "endTime": 211020,
            "data": "về"
          },
          {
            "startTime": 211020,
            "endTime": 214020,
            "data": "đâu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 214470,
            "endTime": 214730,
            "data": "Dẫu"
          },
          {
            "startTime": 214730,
            "endTime": 215260,
            "data": "biết"
          },
          {
            "startTime": 215260,
            "endTime": 215540,
            "data": "rằng"
          },
          {
            "startTime": 215540,
            "endTime": 215810,
            "data": "người"
          },
          {
            "startTime": 215810,
            "endTime": 216330,
            "data": "không"
          },
          {
            "startTime": 216330,
            "endTime": 217130,
            "data": "trở"
          },
          {
            "startTime": 217130,
            "endTime": 217650,
            "data": "lại"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 217650,
            "endTime": 218190,
            "data": "Hãy"
          },
          {
            "startTime": 218190,
            "endTime": 218450,
            "data": "để"
          },
          {
            "startTime": 218450,
            "endTime": 218730,
            "data": "cuộc"
          },
          {
            "startTime": 218730,
            "endTime": 219250,
            "data": "tình"
          },
          {
            "startTime": 219250,
            "endTime": 219780,
            "data": "kia"
          },
          {
            "startTime": 219780,
            "endTime": 220330,
            "data": "tàn"
          },
          {
            "startTime": 220330,
            "endTime": 221110,
            "data": "phai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 221110,
            "endTime": 221370,
            "data": "Sẽ"
          },
          {
            "startTime": 221370,
            "endTime": 221640,
            "data": "chẳng"
          },
          {
            "startTime": 221640,
            "endTime": 222170,
            "data": "còn"
          },
          {
            "startTime": 222170,
            "endTime": 222970,
            "data": "gì"
          },
          {
            "startTime": 222970,
            "endTime": 223510,
            "data": "quanh"
          },
          {
            "startTime": 223510,
            "endTime": 224030,
            "data": "ta"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 224030,
            "endTime": 228010,
            "data": "Giờ"
          },
          {
            "startTime": 228010,
            "endTime": 228540,
            "data": "không"
          },
          {
            "startTime": 228540,
            "endTime": 229350,
            "data": "còn"
          },
          {
            "startTime": 229350,
            "endTime": 230350,
            "data": "ai"
          }
        ]
      }
    ]`;

lyricData = JSON.parse(lyricData);

const btnDisplayLyric = document.querySelector(".open-karaoke button");
const btnHiddenLyric = document.querySelector(".close");
const karaoke = document.querySelector(".karaoke");
const karaokeInner = document.querySelector(".karaoke-inner");
const karaokeContent = document.querySelector(".karaoke-content");

var songInfo = `<p>Hạt mưa vương vấn</p>
               <p> Ca sỹ: Thành Đạt </p>`;
btnDisplayLyric.addEventListener("click", function () {
     karaoke.classList.add("show");
     karaokeContent.innerHTML = songInfo;
});
btnHiddenLyric.addEventListener("click", function () {
     karaoke.classList.remove("show");
     karaokeContent.innerHTML = "";
});

function handleLyric(time) {
     var time = time * 1000;
     var index = lyricData.findIndex(function (item) {
          var sentences = item.words;
          return time >= sentences[0].startTime && time <= sentences[sentences.length - 1].endTime;
     });
     if (index !== -1) {
          karaokeContent.innerText = "";

          var page = Math.floor(index / 2 + 1);
          var offset = (page - 1) * 2;
          var divEle = document.createElement("div");
          for (i = offset; i < offset + 2; i++) {
               var p = document.createElement("p");
               lyricData[i].words.forEach(function (word) {
                    var wordEle = document.createElement("span");
                    wordEle.classList.add("word");
                    wordEle.innerText = word.data + " ";
                    var spanEle = document.createElement("span");
                    spanEle.innerText = word.data;
                    wordEle.append(spanEle);
                    p.appendChild(wordEle);
               });
               divEle.append(p);
          }
          karaokeContent.append(divEle);
     } else {
          karaokeContent.innerHTML = songInfo;
     }
}
