class Game {
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(100, 360, 160, 180);
    this.npcs = [];
    this.level = 1;
    // this.gamePaused = false;
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
        case "Space":
          this.pausegame();
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
    this._generateNpcArr();
    this._drawNpcs();
    this._drawPlayer();
    this._drawBullet();
    this._checkCollisions();
    this._levelIncrease();
    this.win();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
    this.player._charge();
    
  }

  _drawPlayer() {
    this.ctx.drawImage(this.player.image, this.player.x, this.player.y, this.player.width, this.player.height);
  }

  _generateNpcArr() {
    setInterval(() => {
      if (this.npcs.length < 5) {
        const newNpc = new Npc(860, 370, 120, 170);
        newNpc._assignRole();
        newNpc._assignImage();
        this.npcs.push(newNpc);
      }
    }, 1500);
  } 

  _drawNpcs() {
    this.npcs.forEach((npc) => {
      this.ctx.drawImage(this.npcs[0].image, this.npcs[0].x, this.npcs[0].y, this.npcs[0].width, this.npcs[0].height);
      this.npcs[0]._moveLeft();
      if (this.npcs[0].x < 0 - this.npcs[0].width) {
        this.npcs.splice(0, 1);
      }
    });
  }

  _drawBullet() {
    this.player.bullets.forEach(bullet => {
      if (bullet.isShot) {
      this.ctx.drawImage(bullet.image, bullet.x, bullet.y, bullet.width, bullet.height);
      if (bullet.x > bullet.x + bullet.width) {
        const bulletIndex = this.player.bullets.indexOf(bullet);
        this.player.bullets.splice(bulletIndex, 1);
      }
      }
    });
  }

  _writeScoreAndBullets() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Points: ${this.points}`, 900, 50);
    this.ctx.fillText(`Bullets: ${this.player.bulletCount}`, 900, 80);   
  }

  _checkCollisions() {
    this.npcs.forEach((npc) => {
      if (this.player.x < npc.x + npc.width && this.player.x + this.player.width > npc.x && this.player.y < npc.y + npc.height && this.player.y + this.player.height > npc.y) {
        if (npc.role === "enemy") {
          this.points -= 1;
        }
      }    
      // if (this.player.x < this.npcs[0].x + this.npcs[0].width && this.player.x + this.player.width > this.npcs[0].x && this.player.y < this.npcs[0].y + this.npc[0].height && this.player.y + this.player.height > this.npcs[0].y) {
        // if (this.npcs[0].role === "enemy") {
          // this.points -= 1;
        // }
      // }
      this.player.bullets.forEach((bullet) => {
        if (bullet.x < npc.x + npc.width && bullet.x + bullet.width > npc.x && bullet.y < npc.y + npc.height && bullet.y + bullet.height > npc.y) {
          if (npc.role === "enemy") {
            this.points += 1;
            const npcIndex = this.npcs.indexOf(npc);
            this.npcs.splice(npcIndex, 1);
            const bulletIndex = this.player.bullets.indexOf(bullet);
            this.player.bullets.splice(bulletIndex, 1);
          } else if (npc.role === "friend") {
            const npcIndex = this.npcs.indexOf(npc);
            this.npcs.splice(npcIndex, 1);
            const bulletIndex = this.player.bullets.indexOf(bullet);
            this.player.bullets.splice(bulletIndex, 1);
            this.gameOver();
          };
        }
      });
    });
  }

  _levelIncrease() {
    if (this.points === 6 || this.points === 12) {
      this.level++;
    }
  }

  _displayLevel() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Level: ${this.level}`, 900, 580);  
  }

  // pausegame() {
    // if (!this.gamePaused) {
      // this.game = clearTimeout(this.game);
      // this.gamePaused = true;
    // } else if (this.gamePaused) {
      // this.gamePaused = false;
    // }
  // }

  gameOver() {
    // setTimeout(() => {
      canvas.classList.add('hidden');
      const loosePage = document.getElementById("lose-page");
      loosePage.style = "display: block";
    // }, 2000);
  }

  win() {
    if (this.points > 18) {
      canvas.classList.add('hidden');
      const winPage = document.getElementById("win-page");
      winPage.style = "display: block";
    }
  }
}