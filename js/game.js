class Game {
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(100, 380, 140, 140);
    this.npcs = new Npc(900, 410, 100, 100);
    this.bullet = new Bullet(210, 410, 50, 30);
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case "ArrowRight":
          this.player.shoot();
          this.drawBullet();
          this._moveLeft();
          break;
        case "ArrowUp":
          this.player.jump();
          break;
        case "Enter":
          this.player.recharge();
          break;
        default:
          break;
      }
    });
  }

  _clean(){
    this.ctx.clearRect(0, 0, 1000, 600);
  }

  _update() {
    this._clean();
    this._writeScoreAndBullets();
    this.drawPlayer();
    this.drawNpcs();
    this.npcs._moveLeft();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._regenerateAmmo();
    this._update();
  }

  drawPlayer() {
    this.ctx.drawImage(this.player.image, this.player.x, this.player.y, this.player.width, this.player.height);
  }

  drawNpcs() {
    this.ctx.drawImage(this.npcs.image, this.npcs.x, this.npcs.y, this.npcs.width, this.npcs.height);
  }

  drawBullet() {
    this.ctx.drawImage(this.bullet.image, this.bullet.x, this.bullet.y, this.bullet.width, this.bullet.height);
  }

    //Foreach enemy comprobar si la x < 0 -width => splice array lo quito + clearInterval elem.moveInterval//

  _regenerateAmmo() {
    setInterval(() => {
      if (this.bullet.bullets > 8) {
        this.bullet.mag += 1;
        console.log(`Ammo: ${this.bullet.mag}`);
      }
    }, 5000);
  }

  _writeScoreAndBullets() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Points: ${this.points}`, 900, 50);
    this.ctx.fillText(`Bullets: ${this.bullet.bullets}`, 900, 80);   
  }

  checkCollisions() {}

  gameOver() {
    canvas.classList.add('hidden');
    // show lose page
  }
}