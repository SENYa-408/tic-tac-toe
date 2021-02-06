const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const player1Score = document.getElementById("player1Score");
const drawScore = document.getElementById("drawScore");
const player2Score = document.getElementById("player2Score");
const cells = document.querySelectorAll(".cell");
const reset_btn = document.querySelector(".reset");

let curCombination = [[], []];
let typeX = false; // if x => true; if o => false
let Clicked = [];
let scores = [0, 0, 0];
let isBlocked = false;
let isWinnerFound = [false, false];
let timeout = 0;

const reset = (isResetBtnClicked) => {
  cells.forEach((el) => {
    el.classList.remove("x");
    el.classList.remove("o");
    el.classList.remove("win");
    el.classList.remove("draw");
  });

  Clicked = [];
  curCombination = [[], []];
  isBlocked = false;
  timeout = 0;

  if (isResetBtnClicked) {
    scores = [0, 0, 0];
    drawScore.innerText = player1Score.innerText = player2Score.innerText = 0;
  }
};

const checkWinner = () => {
  let winner;
  winCombinations.forEach((winCombination, i) => {
    if (winCombination.every((r) => curCombination[0].includes(r))) {
      isWinnerFound[0] = true;
    } else if (winCombination.every((r) => curCombination[1].includes(r))) {
      isWinnerFound[1] = true;
    }

    if (winner === undefined) {
      if (isWinnerFound[0]) {
        winner = 0;
        console.log("X WINNER");
        scores[0]++;
        player1Score.innerText = scores[0];
      } else if (isWinnerFound[1]) {
        winner = 1;
        console.log("O WINNER");
        scores[1]++;
        player2Score.innerText = scores[1];
      } else if (Clicked.length === 9) {
        winner = 3;
        console.log("DRAW");
        scores[2]++;
        drawScore.innerText = scores[2];
      }
    }

    if (winner !== undefined) {
      showWinner(winner);
    }

    if (i === 7) {
      isWinnerFound = [false, false];
    }
  });
};

const showWinner = (winner) => {
  cells.forEach((cell, cellIndex) => {
    if (winner === 3) {
      cell.classList.add("draw");
      if (!timeout) {
        timeout = setTimeout(reset, 1500);
      }
    } else {
      curCombination[winner].find((el, i) => {
        if (el === cellIndex) {
          cells[cellIndex].classList.add("win");
          isBlocked = true;
          if (!timeout) {
            timeout = setTimeout(reset, 3000);
          }
        }
      });
    }
  });
};

cells.forEach((el, i) => {
  el.addEventListener("click", () => {
    if (!Clicked.includes(i) && !isBlocked) {
      Clicked.push(i);

      if (typeX) {
        curCombination[0].push(i);
      } else {
        curCombination[1].push(i);
      }

      el.classList.add(typeX ? "x" : "o");
      checkWinner();

      typeX = typeX ? false : true;
    }
  });
});

reset_btn.addEventListener("click", () => {
  clearTimeout(timeout);
  reset(true);
});
