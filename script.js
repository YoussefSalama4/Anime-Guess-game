// fetch data
let words;
fetch("word.json")
  .then((result) => {
    return result.json();
  })
  .then((myData) => {
    const letters = "abcdefghijklmnopqrstuvwxyz'";

    const LettersArray = Array.from(letters);

    //select letters container

    let lettersContainer = document.querySelector(".letters");

    // set wron attempts
    let wrongAttempts = 0;
    //audios
    let success = new Audio("success.mp3");
    let fail = new Audio("fail.mp3");
    //select the draw Element
    let theDraw = document.querySelector(".hangman-draw");
    //skill tears
    let skillTears = [
      "legendary",
      "outstanding",
      "fluent",
      "so good",
      "good",
      "kinda good",
      "not bad",
      "nearly a loser",
    ];

    LettersArray.forEach((letter) => {
      let span = document.createElement("span");
      span.innerText = `${letter}`;
      span.className = "letter-box";
      span.addEventListener("click", (e) => {
        let theStatus = false;
        let guessSpans = Array.from(
          document.querySelectorAll(".letters-guess span")
        );
        span.classList.add("clicked");
        //The clicked Letter
        let theClickedLetter = span.innerText.toLowerCase();
        lettersAndSpace.forEach((wordLetter, idx) => {
          if (wordLetter.toLowerCase() == theClickedLetter) {
            //set status
            theStatus = true;
            guessSpans[idx].innerText = span.innerText;
          }
        });
        //skill tears
        if (theStatus !== true) {
          fail.currentTime = 0;
          fail.play();
          wrongAttempts++;
          theDraw.classList.add(`wrong-${wrongAttempts}`);
          if (wrongAttempts === 8) {
            endGame();
            lettersContainer.classList.add("finished");
          }
        } else {
          success.currentTime = 0;
          success.play();
          let gameFinished = true;
          guessSpans.forEach((el) => {
            if (el.innerText == "" && !el.classList.contains("with-space")) {
              gameFinished = false;
            }
          });
          if (gameFinished) {
            let div = document.createElement("div");
            div.innerText = `You won after ${wrongAttempts} wrong attempts
        You are ${skillTears[wrongAttempts]}
        `;
            div.className = "popup";
            let btn = document.createElement("button");
            btn.innerText = "Try again";
            btn.onclick = function () {
              window.location.reload();
            };
            div.appendChild(btn);
            document.body.appendChild(div);
            lettersContainer.style.pointerEvents = "none";
          }
        }
      });
      lettersContainer.appendChild(span);
    });
    words = myData;
    let allKeys = Object.keys(words);
    let randKey = Math.floor(Math.random() * allKeys.length);
    let randKeyName = allKeys[randKey];
    let randValue = words[randKeyName];
    let randWord = randValue[Math.floor(Math.random() * randValue.length)];

    // // set category info

    // document.querySelector(".game-info .category span").innerText = randKeyName;

    // LETTERS GUESS
    let lettersGuessContainer = document.querySelector(".letters-guess");

    //convert word to array

    let lettersAndSpace = Array.from(randWord);

    //create spans based on the word

    lettersAndSpace.forEach((letter) => {
      //create empty span
      let emptySpan = document.createElement("span");
      if (letter === " ") {
        emptySpan.className = "with-space";
      }
      //add the spans to the guess container
      lettersGuessContainer.appendChild(emptySpan);
    });

    //endGame function
    function endGame() {
      let div = document.createElement("div");
      let randSpan = document.createElement("span");
      randSpan.innerText = randWord;
      randSpan.style.textTransform = "capitalize";
      div.innerText = `Game Over, The word is `;
      div.appendChild(randSpan);
      div.className = "popup";
      let btn = document.createElement("button");
      btn.innerText = "Try again";
      btn.onclick = function () {
        window.location.reload();
      };
      div.appendChild(btn);
      document.body.appendChild(div);
    }
  });
