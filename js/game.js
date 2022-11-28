class Game{
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(150, 450, 50, 50);
    this.npcs = [];
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case "ArrowRight":
          console.log("right");
          this.drawBullet();
          break;
        default:
          break;
      }
    });
  }

  _update() {
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
    this.drawPlayer();
    this.drawNpcs();
  }

  drawPlayer() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(100, 450, 50, 50);
  }

  drawNpcs() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(900, 450, 50, 50);
  }

  drawBullet() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(160, 470, 8, 8);
  }

  checkCollisions() {}

  rechargeAmmo() {}

  writeScore() {}

  clean() {}

  gameOver() {}
}