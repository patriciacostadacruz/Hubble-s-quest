class Player {
  constructor(x, y, width, height, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = context;
    this.image = jerry;
    this.bulletCapacity = 7;
    this.bulletCount = 0;
    this.bulletIndex = 0;
    this.bullets = [];
    this.shootingMusic = shootingMusic;
    this.rechargeMusic = rechargeMusic;
    this.action = actionImpossible;
  }   

  _charge() {
    for (let i=0; i < this.bulletCapacity; i++) {
      const newBullet = new Bullet(210, this.y + 30, 50, 30);
      this.bullets.push(newBullet);
      this.bulletCount = this.bullets.length;
    }
  }

  shoot() {
    if (this.bullets.length > 0) {
      let startCounting = 1;
      let lastBullet = this.bullets[this.bullets.length-startCounting];
      while (lastBullet.isShot) {
        startCounting++;
        lastBullet = this.bullets[this.bullets.length-startCounting];
      } 
      this.bullets[this.bullets.length-startCounting].isShot = true;
      this.shootingMusic.play();
      this.bullets[this.bullets.length-startCounting]._moveRight();
      this.bulletCount -=1;
    } else {
      this.action.play();
      // this.ctx.fillStyle = "white";
      // this.ctx.font = "20px Arial";
      // this.ctx.fillText("You cannot shoot without bullets, press spacebar to recharge.", 500, 550);
    }
  }

  recharge() {
    if (this.bulletCount === 0) {
      for (let i=0; i<this.bulletCapacity; i++) {
        const newBullet = new Bullet(210, this.y + 30, 50, 30);
        this.rechargeMusic.play();
        this.bullets.push(newBullet);
      }
    } else if (this.bulletCount > 0) {
      this.action.play();
      this.ctx.fillStyle = "white";
      this.ctx.font = "20px Arial";
      this.ctx.fillText("You still have bullets.", 500, 550);
    }
    this.bulletCount = this.bullets.length;
  }
}