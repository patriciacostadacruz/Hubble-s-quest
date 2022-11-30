class Game {
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(100, 360, 160, 180);
    this.npcs = new Npc(900, 380, 100, 150);
    this.bullet = new Bullet(210, 410, 50, 30);
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case "ArrowRight":
          this.player.shoot();
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
    this.drawBullet();
    this._regenerateAmmo();
    this.npcs._generateNpcArr();
    this.checkEnemyCollisions();
    this.checkBulletCollisions();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
  }

  drawPlayer() {
    this.ctx.drawImage(this.player.image, this.player.x, this.player.y, this.player.width, this.player.height);
  }

  drawNpcs() {
    this.npcs.npcArr.forEach((npc) => {
      this.ctx.drawImage(this.npcs.image, this.npcs.x, this.npcs.y, this.npcs.width, this.npcs.height);
      this.npcs._moveLeft();
      //if (this.npcs.x < 0 - this.npcs.width) {
      //  this.npcs.npcArr.splice(removeNpc);
      //}
    });
  }
// array is generated with 5 items, roles and images assigned but onyl shows first npc and then nothing

  drawBullet() {
    if (this.player.shooting === "true") {
      this.ctx.drawImage(this.bullet.image, this.bullet.x, this.bullet.y, this.bullet.width, this.bullet.height);
      this.bullet._moveLeft();
    }
  }
  // doesn't show bullet when shooting, only if condition is removed

  _regenerateAmmo() {
    setInterval(() => {
      if (this.bullet.bullets > 8) {
        this.bullet.mag += 1;
        console.log(`Ammo stored: ${this.bullet.mag}`);
      }
    }, 5000);
  }

  _writeScoreAndBullets() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Points: ${this.points}`, 900, 50);
    this.ctx.fillText(`Bullets: ${this.bullet.bullets}`, 900, 80);   
  }

  checkEnemyCollisions() {
    if (this.player.x < this.npcs.x + this.npcs.width && this.player.x + this.player.width > this.npcs.x && this.player.y < this.npcs.y + this.npcs.height && this.player.y + this.player.height > this.npcs.y) {
      // if (this.npcs.role === "enemy") {
        console.log("Collision with enemy, game over");
        this.points += 1;
      // }
    }
  }
  // cannot make difference with npc roles, doesn't detect them

  checkBulletCollisions() {
    if (this.bullet.x < this.npcs.x + this.npcs.width && this.bullet.x + this.bullet.width > this.npcs.x && this.bullet.y < this.npcs.y + this.npcs.height && this.bullet.y + this.bullet.height > this.npcs.y) {
      console.log("Bullet killed enemy, +1 points");
    }
  }

  gameOver() {
    canvas.classList.add('hidden');
    // show lose page
  }
}