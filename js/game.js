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

  clean() {}

  gameOver() {}
}

class Player{
  constructor(x = 150, y = 450, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = undefined;
  }

  jump() {}

  shoot() {}

  rechargeBullets() {}
}

class Npc() {
  constructor() {
    this.x = 950;
    this.y = 450;
    this.width = 50;
    this.height = 50;
    this.role = undefined;
    this.image = undefined;
  }

  _assignRole() {}

  _assignImage() {}

  _moveLeft() {}
}