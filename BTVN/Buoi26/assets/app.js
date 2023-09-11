window.addEventListener("load", function () {
     const song = document.querySelector("#song");
     const playButton = document.querySelector(".player-play");
     const prevButton = document.querySelector(".player-prev");
     const nextButton = document.querySelector(".player-next");
     const playerDuration = document.querySelector(".player-duration");
     const remaining = document.querySelector(".player-remaining");
     const progressBar = document.querySelector("#progress-bar");
     const playerImage = document.querySelector(".player-image");
     let playing = true;
     const list = ["Arcade.mp3", "AsYouFadeAway.mp3", "CuoiCungThi.mp3"];
     let songIndex = 0;

     nextButton.addEventListener("click", function () {
          handleChangeMusic(1);
     });
     prevButton.addEventListener("click", function () {
          handleChangeMusic(-1);
     });
     song.addEventListener("ended", function () {
          handleChangeMusic(1);
     });

     //
     function handleChangeMusic(dir) {
          if (dir === 1) {
               // next music
               songIndex++;
               if (songIndex > list.length - 1) {
                    songIndex = 0;
               }
               song.setAttribute("src", `./mp3/${list[songIndex]}`);
               playing = true;
               handleMusicPlay();
               console.log("next music");
          } else if (dir === -1) {
               // prev music
               songIndex--;
               if (songIndex < 0) {
                    songIndex = list.length - 1;
               }
               song.setAttribute("src", `.mp3/${list[songIndex]}`);
               playing = true;
               handleMusicPlay();
               console.log("prev music");
          }
     }

     playButton.addEventListener("click", handleMusicPlay);
     function handleMusicPlay() {
          if (playing) {
               song.play();
               playerImage.classList.add("is-playing");
               playButton.classList.add("fa-pause");
               playing = false;
          } else {
               song.pause();
               playerImage.classList.remove("is-playing");
               playButton.classList.remove("fa-pause");
               playing = true;
          }
     }

     function displayTimer() {
          const { duration, currentTime } = song;

          progressBar.max = duration; //: = thời lượng bài đó để nó dừng
          progressBar.value = currentTime; //: để nó chạy theo

          remaining.textContent = formatTimer(currentTime); //: thời gian bên phải

          if (!duration) {
               playerDuration.textContent = "0:00";
          } else {
               playerDuration.textContent = formatTimer(duration);
          }
     }

     function formatTimer(number) {
          const minutes = Math.floor(number / 60);
          const seconds = Math.floor(number - minutes * 60);
          return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
     }

     progressBar.addEventListener("change", handleDragProgressBar);
     function handleDragProgressBar() {
          song.currentTime = progressBar.value;
     }

     displayTimer();
     const timer = setInterval(displayTimer, 500);
});
