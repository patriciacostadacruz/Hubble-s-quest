class Game {
  constructor(context) {
    this.ctx = context;
    this.points = 0;
    this.player = new Player(100, 360, 160, 180);
    this.npcs = [];
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
          this.recharge();
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
    this.player._charge();
    this._writeScoreAndBullets();
    this._displayLevel();
    this._drawPlayer();
    this._generateNpcArr();
    this._drawNpcs();
    this._drawBullet();
    // this._regenerateAmmo();
    this.checkCollisions();
    // this.checkBulletCollisions();
    this._generateNpcArr()
    // this._levelIncrease();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
    
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
      if(bullet.isShot){
      this.ctx.drawImage(bullet.image, bullet.x, bullet.y, bullet.width, bullet.height);
      }
    });
  }

  // _regenerateAmmo() {
    // setInterval(() => {
      // this.player.mag += 1;
      // console.log("added 1 ammo");
    // }, 1000);
  // }
// 
  // recharge() {
    // this.player.bullets += this.player.mag;
    // this.player.mag = 0;
  // }

  _writeScoreAndBullets() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Points: ${this.points}`, 900, 50);
    this.ctx.fillText(`Bullets: ${this.player.bullets.length}`, 900, 80);   
  }

  checkCollisions() {
    this.npcs.forEach((npc) => {
      if (this.player.x < npc.x + npc.width && this.player.x + this.player.width > npc.x && this.player.y < npc.y + npc.height && this.player.y + this.player.height > npc.y) {
        if (npc.role === "enemy") {
          this.points -= 1;
          if (this.points < 0) {
            this.gameOver();
          }
        }
      }
      this.player.bullets.forEach((bullet) => {
        if (bullet.x < npc.x + npc.width && bullet.x + bullet.width > npc.x && bullet.y < npc.y + npc.height && bullet.y + bullet.height > npc.y) {
          if (npc.role === "enemy") {
            this.points += 1;
          } else if (npc.role === "friend") {
            this.gameOver();
          };
        }
      });
    });
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