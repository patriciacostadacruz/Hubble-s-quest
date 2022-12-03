class Game {
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(100, 360, 160, 180);
    this.npcs = [];
    this.level = 1;
    this.generateInterval = undefined;
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
    this._drawNpcs();
    this._drawPlayer();
    this._drawBullet();
    this._checkBodyCollision();
    this._checkBulletCollisions();
    this._levelIncrease();
    this.win();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this.player._charge();
    this._generateNpcArr();
    this._update();
  }

  _drawPlayer() {
    this.ctx.drawImage(this.player.image, this.player.x, this.player.y, this.player.width, this.player.height);
  }

  _generateNpcArr() {
    this.generateInterval = setInterval(() => {
      if (this.npcs.length < 100) {
        const newNpc = new Npc(1100, 370, 120, 170);
        newNpc._assignRole();
        newNpc._assignImage();
        newNpc._moveLeft();
        this.npcs.push(newNpc);
        console.log(newNpc);
      }
    }, 2000);
    console.log(this.npcs);
  } 

  _drawNpcs() {
    this.npcs.forEach((npc) => {
      this.ctx.drawImage(npc.image, npc.x, npc.y, npc.width, npc.height);
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

  _checkBodyCollision() {    
    this.npcs.forEach((npc) => {
      const npcIndex = this.npcs.indexOf(npc);
      if (this.player.x < npc.x + npc.width && this.player.x + this.player.width > npc.x && this.player.y < npc.y + npc.height && this.player.y + this.player.height > npc.y) {
        if (npc.role === "enemy") {
          console.log(npc);
          this.points -= 1;
          this.npcs.splice(npcIndex, 1);
          if (this.points <= 0) {
            this.gameOver();
          }
        }
      }
     });
  }
  _checkBulletCollisions(){
    this.npcs.forEach((npc) => {
      const npcIndex = this.npcs.indexOf(npc);
          this.player.bullets.forEach((bullet) => {
            const bulletIndex = this.player.bullets.indexOf(bullet);
            if (bullet.x < npc.x + npc.width && bullet.x + bullet.width > npc.x && bullet.y < npc.y + npc.height && bullet.y + bullet.height > npc.y) {
              if (npc.role === "enemy" && bullet.isShot) {
                this.points += 1;
                this.npcs.splice(npcIndex, 1);
                this.player.bullets.splice(bulletIndex, 1);
              } else if (npc.role === "friend" && bullet.isShot) {
                this.npcs.splice(npcIndex, 1);
                this.player.bullets.splice(bulletIndex, 1);
                this.gameOver();
              }
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
      clearInterval(this.generateInterval);
    // }, 2000);
  }

  win() {
    if (this.points > 18) {
      canvas.classList.add('hidden');
      clearInterval(this.generateInterval);
      const winPage = document.getElementById("win-page");
      winPage.style = "display: block";
    }
  }
}