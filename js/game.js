class Game {
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(100, 360, 160, 180);
    this.npcs = new Npc(900, 380, 100, 150);
    this.bullet = new Bullet(210, 410, 50, 30);
    this.level = 1;
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
    this._displayLevel();
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
      // if (this.npcs.x < 0 - this.npcs.width) {
      //   let index = this.npcs.npcArr.indexOf(npc);
      //   this.npcs.splice(index, 1);
      // }
    });
  }
// array is generated with 5 items, roles and images assigned but only shows first npc and then nothing. Also cannot remove npc from arr

  drawBullet() {
    // if (this.player.shooting === "true") {
      this.ctx.drawImage(this.bullet.image, this.bullet.x, this.bullet.y, this.bullet.width, this.bullet.height);
      this.bullet._moveRight();
      if (this.bullet.x < 0 - this.bullet.width) {
        // make it disappear
      }
    // }
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
        // make npc disappear
        this.points -=1;
        if (this.points < 0) {
          this.gameOver();
        }
      // }
    }
  }
  // cannot make difference with npc roles, doesn't detect them

  checkBulletCollisions() {
    if (this.bullet.x < this.npcs.x + this.npcs.width && this.bullet.x + this.bullet.width > this.npcs.x && this.bullet.y < this.npcs.y + this.npcs.height && this.bullet.y + this.bullet.height > this.npcs.y) {
      // make npc and bullet disappear
      // if npc is friend : gameOver
      // if npc is enemy: +1
      this.points += 1;
    }
  }

  _levelIncrease() {
    // increase level based on time playing? 1 min?
    this.level += 1;
    // change NPC speed: _moveLeft() should change to this.x = this.x - 2 and then - 2.5; ---- to be added here on in moveLeft() method directly based on level condition
  }

  _displayLevel() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Level: ${this.level}`, 900, 580);  
  }

  gameOver() {
    canvas.classList.add('hidden');
    const loosePage = document.getElementById("lose-page");
    loosePage.style = "display: block";
  }
}