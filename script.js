// state of result between 2 player
const gameResultData = {
  xPlayer: 0,
  oPlayer: 0,
  tie: 0,
};

// html elements

const squares = document.querySelectorAll(".square");
const restartBtn = document.querySelector(".btn-restart");
const boardContainer = document.querySelector(".board");
const noti = document.querySelector(".noti");
const playerXScore = document.querySelector(".player1 .score");
const playerOScore = document.querySelector(".player2 .score");
const tiesScore = document.querySelector(".ties .score");

// game logic control variables
let activePlayer = "x";
let selectedPositions = new Array(9).fill(null);

//  define 2 dimension arrays of array contain winning position
const wonPositions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 5, 8],
  [6, 7, 8],
  [1, 4, 7],
  [2, 4, 6],
  [3, 4, 5],
];

// utility functions

// render result in the UI

function renderGameResult() {
  playerXScore.innerHTML = gameResultData.xPlayer;
  playerOScore.innerHTML = gameResultData.oPlayer;
  tiesScore.innerHTML = gameResultData.tie;
}

// function will be call when user click on each square on board game
function handleSquareClick(event, index) {
  // get inner div
  const innerDiv = event.target.childNodes[0];

  //  check to see if current clicked square has been clicked

  if (!selectedPositions[index]) {
    //  add class name corresponding to current player;
    innerDiv.className = activePlayer;

    // add player chosen position to selected positions at corresponding index
    selectedPositions[index] = activePlayer;
  }

  // check if any player won the game
  handleWonCondition();

  //  check if the game is finished
  checkEndDrawGame();

  // switch to other player
  activePlayer = activePlayer === "x" ? "o" : "x";
}

function endTheGame() {
  //  add overlay to game board to prevent user action
  boardContainer.classList.add("end");
  // show restart game button on the right
  restartBtn.classList.add("show");
}

// function to end the game and reset application state & UI
function checkEndDrawGame() {
  // check if all position has been selected.
  if (selectedPositions.filter((position) => position === null).length === 0) {
    gameResultData.tie = gameResultData.tie + 1;
    endTheGame();
    noti.innerHTML = `Two players draw the game`;
    noti.classList.add("show");
  }
}

// check won condition

function handleWonCondition() {
  wonPositions.forEach((positions) => {
    // won condition
    if (
      selectedPositions[positions[0]] &&
      selectedPositions[positions[0]] === selectedPositions[positions[1]] &&
      selectedPositions[positions[1]] === selectedPositions[positions[2]]
    ) {
      // render notify message on top
      noti.innerHTML = `Player ${activePlayer.toUpperCase()} win the game`;
      noti.classList.add("show");

      // update winning result data
      gameResultData.xPlayer =
        activePlayer === "x"
          ? gameResultData.xPlayer + 1
          : gameResultData.xPlayer;
      gameResultData.oPlayer =
        activePlayer === "o"
          ? gameResultData.oPlayer + 1
          : gameResultData.oPlayer;

      endTheGame();
      return;
    }
  });
}

// show playing result;

function handleNewGame() {
  activePlayer = "x";
  //  remove overlay form game board to continue playing
  boardContainer.classList.remove("end");
  // hide restart game button
  restartBtn.classList.remove("show");
  // remove all selected positions
  selectedPositions = new Array(9).fill(null);
  // update result panel UI
  renderGameResult();
  // remove notify from UI
  noti.classList.remove("show");
  // remove all square active player icon class names
  squares.forEach((squareItem) => {
    const innerDiv = squareItem.childNodes[0];
    innerDiv.className = "";
  });
}

// event listeners

squares.forEach((squareItem, index) =>
  squareItem.addEventListener("click", (e) => handleSquareClick(e, index))
);
restartBtn.addEventListener("click", handleNewGame);

renderGameResult();
