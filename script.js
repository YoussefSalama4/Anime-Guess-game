// fetch data
fetch("word.json")
  .then((result) => {
    return result.json();
  })
  .then((myData) => {
    const letters = "abcdefghijklmnopqrstuvwxyz'";

    const LettersArray = Array.from(letters);

    //select letters container

    let lettersContainer = document.querySelector(".letters");

    //audios
    let success = new Audio("success.mp3");
    let fail = new Audio("fail.mp3");

    //select the draw Element
    let theDraw = document.querySelector(".hangman-draw");

    // the words to guess

    let animeValues = myData["Anime"];

    //play game
    playGame();

    function playGame() {
      let randWord =
        animeValues[Math.floor(Math.random() * animeValues.length)];

      //convert word to array

      let lettersAndSpace = Array.from(randWord);

      // LETTERS GUESS
      let lettersGuessContainer = document.querySelector(".letters-guess");

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

      // set wron attempts
      let wrongAttempts = 0;

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
      // adding letters to the letters containe and attach events into it
      LettersArray.forEach((letter) => {
        let span = document.createElement("span");
        span.innerText = `${letter}`;
        span.className = "letter-box";
        span.addEventListener("click", (e) => {
          // boolean value that determines weather or not the clicked letter exists in the word
          let theStatus = false;
          //the spans that should carry the letters of the word to gues
          let guessSpans = Array.from(
            document.querySelectorAll(".letters-guess span")
          );
          //add class list to the clicked letter to not click it again
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
          //the letter doesnt exist
          if (theStatus !== true) {
            fail.currentTime = 0;
            fail.play();
            wrongAttempts++;
            //add part of the shape to tell the user that he is wrong
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            //the user reached the max limit of wrong attempts
            if (wrongAttempts === 8) {
              endGame();
              lettersContainer.classList.add("finished");
            }
          } else {
            success.currentTime = 0;
            success.play();
            let gameFinished = true;
            //check if the user got thhe name right
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
                resetGame();
                playGame();
              };
              div.appendChild(btn);
              document.body.appendChild(div);
              lettersContainer.style.pointerEvents = "none";
            }
          }
        });
        lettersContainer.appendChild(span);
      });

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
          resetGame();
          playGame();
        };
        div.appendChild(btn);
        document.body.appendChild(div);
      }
    }

    function resetGame() {
      theDraw.className = "hangman-draw";
      lettersContainer.className = "letters";
      lettersContainer.innerHTML = "";
      lettersContainer.style.pointerEvents = "auto";
      document.querySelector(".letters-guess").innerHTML = "";
      let popup = document.querySelector(".popup");
      popup.parentNode.removeChild(popup);
    }
  });
