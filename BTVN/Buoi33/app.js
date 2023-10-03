function startRecognition() {
     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
     recognition.lang = "vi-VN";
     recognition.start();

     recognition.onresult = function (event) {
          const speechResult = event.results[0][0].transcript.toLowerCase();
          document.getElementById("output").textContent = "Bạn vừa nói: " + speechResult;

          setTimeout(() => {
               const directURLs = {
                    google: "https://www.google.com",
                    facebook: "https://www.facebook.com",
                    youtube: "https://www.youtube.com",
                    "google drive": "https://drive.google.com",
                    "google maps": "https://maps.google.com",
                    "bản đồ": "https://maps.google.com",
               };

               if (directURLs[speechResult]) {
                    window.location.href = directURLs[speechResult];
                    return;
               }

               if (
                    speechResult.includes("chỉ đường") ||
                    speechResult.includes("tới") ||
                    speechResult.includes("đường tới")
               ) {
                    navigateToLocation(speechResult);
               } else if (
                    speechResult.includes("bài hát") ||
                    speechResult.includes("mở bài hát") ||
                    speechResult.includes("nghe bài hát")
               ) {
                    playSong(speechResult);
               } else if (
                    speechResult.includes("video") ||
                    speechResult.includes("mở video") ||
                    speechResult.includes("xem video")
               ) {
                    playVideo(speechResult);
               } else {
                    alert("Không thực hiện được yêu cầu");
               }
          }, 1500);
     };

     recognition.onerror = function (event) {
          alert("Có lỗi xảy ra: " + event.error);
     };
}

function navigateToLocation(phrase) {
     const location = phrase
          .replace("chỉ đường", "")
          .replace("tới", "")
          .replace("đường tới", "")
          .trim();
     window.location.href = "https://maps.google.com?q=" + location;
}

function playSong(phrase) {
     const song = phrase
          .replace("bài hát", "")
          .replace("mở bài hát", "")
          .replace("nghe bài hát", "")
          .trim();
     window.location.href =
          "https://zingmp3.vn/tim-kiem/bai-hat.html?q=" + encodeURIComponent(song);
}

function playVideo(phrase) {
     const video = phrase
          .replace("video", "")
          .replace("mở video", "")
          .replace("xem video", "")
          .trim();
     window.location.href =
          "https://www.youtube.com/results?search_query=" + encodeURIComponent(video);
}
