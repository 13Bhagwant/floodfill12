/** @format */

(function () {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let dataFromStorage = JSON.parse(localStorage.getItem("winData"));
  const statusDisplay = document.querySelector("#game--status");
  const resultXDisplay = document.querySelector("#result--player-X");
  const resultODisplay = document.querySelector("#result--player-O");
  const resultDrawDisplay = document.querySelector("#result--draw");
  const resetResult = document.querySelector("#result-reset");

  let gameActive = true;
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  const winningMessage = () => `Player ${currentPlayer} has won this game!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

  function handleCellPlayed(cell, position) {
    cell.innerHTML = currentPlayer;
    gameState[position] = currentPlayer;
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
  }

  function displayResultPanel(data) {
    resultXDisplay.innerHTML = `Player X win ${data?.XTimes || 0} times`;
    resultODisplay.innerHTML = `Player O win ${data?.OTimes || 0} times`;
    resultDrawDisplay.innerHTML = `2 players draw ${
      data?.drawTimes || 0
    } times`;
  }

  function setWinningDataToStorage(winner, isDrawer) {
    const newDataFromStorage = { ...dataFromStorage };
    if (isDrawer) {
      newDataFromStorage.drawTimes = (newDataFromStorage?.drawTimes || 0) + 1;
      localStorage.setItem("winData", JSON.stringify(newDataFromStorage));
      displayResultPanel(newDataFromStorage);
      return 1;
    }
    if (winner === "X") {
      newDataFromStorage.XTimes = (newDataFromStorage?.XTimes || 0) + 1;
      localStorage.setItem("winData", JSON.stringify(newDataFromStorage));
      displayResultPanel(newDataFromStorage);
      return 1;
    }
    if (winner === "O") {
      newDataFromStorage.OTimes = (newDataFromStorage?.OTimes || 0) + 1;
      localStorage.setItem("winData", JSON.stringify(newDataFromStorage));
      displayResultPanel(newDataFromStorage);
    }
  }

  function handleResultValidation() {
    let roundWon = false;
    for (const winCondition of winningConditions) {
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (!a || !b || !c) {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    // won condition
    if (roundWon) {
      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
      setWinningDataToStorage(currentPlayer, false);
      return 1;
    }
    // draw condition
    const roundDraw = !gameState.includes("");
    if (roundDraw) {
      statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      setWinningDataToStorage(currentPlayer, true);
      return 1;
    }

    handlePlayerChange();
  }

  function handleCellClick(event) {
    const cell = event.target;
    const clickedCellPosition = parseInt(cell.getAttribute("data-cell-index"));
    if (!!gameState[clickedCellPosition] || !gameActive) {
      return;
    }

    handleCellPlayed(cell, clickedCellPosition);
    handleResultValidation();
  }

  function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
    dataFromStorage = JSON.parse(localStorage.getItem("winData"));
  }

  function handleResetResult() {
    localStorage.removeItem("winData");
    displayResultPanel({});
  }

  function startGame() {
    statusDisplay.innerHTML = currentPlayerTurn();
    displayResultPanel(dataFromStorage);
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.addEventListener("click", handleCellClick));
    document
      .querySelector(".game--restart")
      .addEventListener("click", handleRestartGame);
    resetResult.addEventListener("click", handleResetResult);
  }
  startGame();
})();
