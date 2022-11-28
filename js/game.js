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
        case 'ArrowRight':
          //action
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
  }

  drawPlayer() {}

  drawNpcs() {}

  checkCollisions() {}

  rechargeAmmo() {}

  writeScore() {}
}