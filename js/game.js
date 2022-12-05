class Game {
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(100, 360, 140, 180, this.ctx);
    this.npcs = [];
    this.level = 1;
    this.generateInterval = undefined;
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case "ArrowRight":
          this.player.shoot();
          break;
        case "Space":
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
    this._drawNpcs();
    this._drawPlayer();
    this._drawBullet();
    this._checkBodyCollision();
    this._checkBulletCollision();
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
        const newNpc = new Npc(1100, 370, 120, 160);
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
                this.ctx.drawImage(npc.blood, npc.y, npc.y, npc.width, npc.height);
                this.npcs.splice(npcIndex, 1);
                this.player.bullets.splice(bulletIndex, 1);
                this._levelIncrease();
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
      this.ctx.fillStyle = "white";
      this.ctx.font = "40px Arial";
      this.ctx.fillText(`Next level: ${this.level}`, 400, 300); 
      // make message show longer
    }
  }

  _displayLevel() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Level: ${this.level}`, 900, 580);  
  }

  gameOver() {
      canvas.classList.add('hidden');
      clearInterval(this.generateInterval);
      const loosePage = document.getElementById("lose-page");
      const winPage = document.getElementById("win-page");
      winPage.style = "display: none";
      loosePage.style = "display: block";
  }

  win() {
    if (this.points === 12) {
      canvas.classList.add('hidden');
      clearInterval(this.generateInterval);
      const winPage = document.getElementById("win-page");
      winPage.style = "display: block";
    }
  }
}