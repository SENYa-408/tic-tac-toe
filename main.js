const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

const playerScore = document.getElementById("playerScore");
const drawScore = document.getElementById("drawScore");
const computerScore = document.getElementById("computerScore");
const cells = document.querySelectorAll(".cell");
const reset_btn = document.querySelector(".reset");

let curCombination = [[], []];
let typeX = false; // if x => true; if o => false
let Clicked = [];

const reset = () => {
  cells.forEach((el) => {
    el.classList.remove("x");
    el.classList.remove("o");
    el.classList.remove("win");
    el.classList.remove("draw");
    Clicked = [];
    curCombination = [[], []];
  });
};

const checkWinner = () => {
  winCombinations.forEach((winCombination, i) => {
    let winner;
    if (winCombination.every((r) => curCombination[0].indexOf(r) >= 0)) {
      winner = 0;
      console.log("X WINNER");
    } else if (winCombination.every((r) => curCombination[1].indexOf(r) >= 0)) {
      winner = 1;
      console.log("O WINNER");
    }

    if (winner !== undefined) {
      cells.forEach((cell, cellIndex) => {
        curCombination[winner].find((el, i) => {
          if (el === cellIndex) {
            console.log(el, cells[cellIndex - 1]);
            cells[cellIndex - 1].classList.add("win");
            setTimeout(reset, 3000);
          }
        });
      });
    }
  });
};

cells.forEach((el, i) => {
  if (!Clicked.includes(i)) {
    el.addEventListener("click", () => {
      Clicked.push(i);
      let type = typeX ? "x" : "o";

      if (typeX) {
        curCombination[0].push(i + 1);
      } else {
        curCombination[1].push(i + 1);
      }

      el.classList.add(type);
      checkWinner();

      typeX = typeX ? false : true;
    });
  }
});

reset_btn.addEventListener("click", reset);
