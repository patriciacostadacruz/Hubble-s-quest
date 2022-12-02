window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const startPage = document.getElementById('start-page');
  const startButton = document.getElementById('start');
  const replayButton = document.getElementById("try-again");
  const playAgainButton = document.getElementById("play-again");
  const winPage = document.getElementById("win-page");
  const loosePage = document.getElementById("lose-page");

  startButton.onclick = function () {
    startPage.style = "display: none";
    canvas.classList.remove('hidden');
    const game = new Game(ctx);
    game.start();
  };

  replayButton.onclick = function () {
    loosePage.style = "display: none";
    canvas.classList.remove('hidden');
    const game = new Game(ctx);
    game.start();
  };

  playAgainButton.onclick = function () {
    winPage.style = "display: none";
    canvas.classList.remove('hidden');
    const game = new Game(ctx);
    game.start();
  }  

}