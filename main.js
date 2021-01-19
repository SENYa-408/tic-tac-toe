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
const reset_btn = document.querySelector("reset");
const typeX = false; // if x => true; if o => false
