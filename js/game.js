class Game {
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(100, 310, 140, 180, this.ctx);
    this.npcs = [];
    this.level = 1;
    this.winningPoints = 12;
    this.generateInterval = undefined;
    this.gameMusic = gameMusic;
    this.levelUp = levelUp;
    this.pointMusic = point;
    this.looserMusic = looserMusic;
    this.winnerMusic = winnerMusic;
    this.speed = 50;
    this.gameMessage = " ";
    this.collision = undefined;
    this.collisionInterval = undefined;
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case "ArrowRight":
          this.tryToShoot();
          break;
        case "Space":
          this.tryToRecharge();
          break;
        default:
          break;
      }
    });
  }
  
  tryToShoot() {
    if (this.player.bulletCount > 0) {
      this.player.shoot();
    } else if (this.player.bulletCount == 0) {
      this._updateMessage("You can't shoot without bullets, please recharge.");
    }
  }

  tryToRecharge() {
    if (this.player.bulletCount == 0) {
      this.player.recharge();
    } else if (this.player.bulletCount > 0) {
      this._updateMessage(`You still have ${this.player.bulletCount} bullets.`);
    }
  }

  _clean() {
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
    this._checkBulletCollision();
    this._drawMessage();
    // this._drawCollisionEffect();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this.player._charge();
    this._generateNpcArr();
    this._update();
    this.gameMusic.play();
  }

  _drawPlayer() {
    this.ctx.drawImage(this.player.image, this.player.x, this.player.y, this.player.width, this.player.height);
  }

  _generateNpcArr() {
    this.generateInterval = setInterval(() => {
      if (this.npcs.length < 100) {
        const newNpc = new Npc(1100, 320, 120, 160, this.speed);
        newNpc._assignRole();
        newNpc._assignImage();
        newNpc._moveLeft();
        this.npcs.push(newNpc);
      }
    }, 2000);
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

  _drawMessage() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 25px Courier New";
    this.ctx.fillText(`${this.gameMessage}`, 300, 550);
  }

  _updateMessage(message) {
    this.gameMessage = message;
    setTimeout(() => {
      this.gameMessage = " ";
    }, 2000);
  }

  _writeScoreAndBullets() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 20px Courier New";
    this.ctx.fillText(`Points: ${this.points}`, 60, 70);
    this.ctx.fillText(`Bullets: ${this.player.bulletCount}`, 60, 100);   
  }

  // _applyCollision() {
    // let counter = 0;
    // this.collisionInterval = setInterval(() => {
      // if (counter < collisionSerie.length) {
        // this.collision = collisionSerie[counter];
        // counter++;
      // }
      // if (counter == collisionSerie.length) {
        // this.collision = undefined;
        // clearInterval(this.collisionInterval);
        // counter = 0;
      // }
    // }, 40);
  // }
  // 
  // _drawCollisionEffect() {
    // if (this.collision) {
      // this.ctx.drawImage(this.collision, npc.x, npx.y, npx.width, npc.width);
    // }
  // }

  _checkBodyCollision() {    
    this.npcs.forEach((npc) => {
      const npcIndex = this.npcs.indexOf(npc);
      if (this.player.x < npc.x + npc.width && this.player.x + this.player.width > npc.x && this.player.y < npc.y + npc.height && this.player.y + this.player.height > npc.y) {
        if (npc.role === "enemy") {
          this.npcs.splice(npcIndex, 1);
          this.gameOver();
        }
      }
     });
  }
  _checkBulletCollision() {
    this.npcs.forEach((npc) => {
      const npcIndex = this.npcs.indexOf(npc);
          this.player.bullets.forEach((bullet) => {
            const bulletIndex = this.player.bullets.indexOf(bullet);
            if (bullet.x < npc.x + npc.width && bullet.x + bullet.width > npc.x && bullet.y < npc.y + npc.height && bullet.y + bullet.height > npc.y) {
              if (npc.role === "enemy" && bullet.isShot) {
                this.points += 1;
                this.pointMusic.play();
                // this._applyCollision();
                this.npcs.splice(npcIndex, 1);
                this.player.bullets.splice(bulletIndex, 1);
                this._levelIncrease();
                if (this.points === this.winningPoints) {
                  this.winnerMusic.play();
                  this.win();
                }
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
    if (this.points === 4 || this.points === 8) {
      this.level += 1;
      this.levelUp.play();
      this._updateMessage(`Next level!!!`);
    }
    if (this.level == 2) {
      this.speed = 35;
    }
    if (this.level == 3) {
      this.speed = 25;
    }
  }

  _displayLevel() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 20px Courier New";
    this.ctx.fillText(`Level: ${this.level}`, 60, 550);  
  }

  gameOver() {
      canvas.classList.add('hidden');
      clearInterval(this.generateInterval);
      const loosePage = document.getElementById("lose-page");
      const winPage = document.getElementById("win-page");
      winPage.style = "display: none";
      loosePage.style = "display: block";
      this.looserMusic.play();
  }

  win() {
      canvas.classList.add('hidden');
      clearInterval(this.generateInterval);
      const winPage = document.getElementById("win-page");
      winPage.style = "display: block";
  }
}