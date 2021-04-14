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

let curCombinations = {
  x: [],
  o: [],
};
let typeX = true; // x => true; o => false
let timeout;
let Clicked = [];
let isBlocked = false;
let scores = {
  x: 0,
  draw: 0,
  o: 0,
};

const reset = () => {
  // Clear all values
  curCombinations = {
    x: [],
    o: [],
  };
  Clicked = [];
  typeX = true;
  clearTimeout(timeout);

  cells.forEach((cell) => {
    cell.classList.remove("win");
    cell.classList.remove("x");
    cell.classList.remove("o");
  });
  isBlocked = false;
};

const isXWinner = (el) => {
  return curCombinations.x.includes(el);
};

const isOWinner = (el) => {
  return curCombinations.o.includes(el);
};

const checkWinner = () => {
  winCombinations.forEach((winCombination, winCombindex) => {
    if (winCombination.every(isXWinner)) {
      console.log("X WIN");
      scores.x++;
      player1Score.innerText = scores.x;
      curCombinations.x.forEach((el) => {
        cells[el].classList.add("win");
      });
      isBlocked = true;
      timeout = setTimeout(reset, 3000);
    } else if (winCombination.every(isOWinner)) {
      console.log("O WIN");
      scores.o++;
      player2Score.innerText = scores.o;
      curCombinations.o.forEach((el) => {
        cells[el].classList.add("win");
      });
      isBlocked = true;
      timeout = setTimeout(reset, 3000);
    } else if (
      !winCombination.every(isOWinner) &&
      !winCombination.every(isXWinner) &&
      Clicked.length === 9
    ) {
      console.log("DRAW");
      scores.draw++;
      drawScore.innerText = scores.draw;
      cells.forEach((cell) => {
        cell.classList.add("draw");
      });
      isBlocked = true;
      timeout = setTimeout(reset, 3000);
    }
  });
};

cells.forEach((cell, cellIndex) => {
  cell.addEventListener("click", () => {
    if (!isBlocked) {
      typeX
        ? curCombinations.x.push(cellIndex)
        : curCombinations.o.push(cellIndex);

      if (!Clicked.includes(cellIndex)) {
        cell.classList.add(typeX ? "x" : "o");
      }

      Clicked.push(cellIndex);
      checkWinner();
      typeX = !typeX;
    }
  });
});

reset_btn.addEventListener("click", reset);
