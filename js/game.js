class Game{
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(150, 500, 50, 50);
    this.npcs = new Npc(950, 500, 50, 50);
    this.mag = 0; // used to store regenerated bullets
    this.bullets = 8; // starting value
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case "ArrowRight":
          //this.player.shoot();
          this.drawBullet();
          break;
        case "ArrowUp":
          console.log("up");
          this.player.jump();
          break;
        case "Enter":
          console.log("Enter");
          this.player.recharge();
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
    this._writeScoreAndBullets();
    this.drawPlayer();
    this.drawNpcs();
    this._regenerateAmmo();
  }

  drawPlayer() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(100, 490, 50, 50);
    // need to show image jerry
  }

  drawNpcs() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(900, 490, 50, 50);
    // need to show image enemy
  }

  drawBullet() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(160, 510, 8, 8);
    // need to show image bullet
  }

  _regenerateAmmo() {
    setInterval(() => {
      if (this.bullets > 8) {
        this.mag += 1;
        console.log(`Ammo: ${this.mag}`);
      }
    }, 5000);
  }
  // not working

  _writeScoreAndBullets() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Points: ${this.points}`, 900, 50);
    this.ctx.fillText(`Bullets: ${this.bullets}`, 900, 80);   
  }

  checkCollisions() {}

  gameOver() {
    canvas.classList.add('hidden');
    // show loose page
  }
}