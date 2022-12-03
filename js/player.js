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
  }   

  jump() {
    setInterval(() => {
      if (this.y > 150) {
        this.y -= 15;
      }
    }, 60);
  }

  _charge() {
    for (let i=0; i < this.bulletCapacity; i++) {
      const newBullet = new Bullet(210, this.y + 30, 50, 30);
      this.bullets.push(newBullet);
      this.bulletCount = this.bullets.length;
      console.log('Number of bullets beginning: ', this.bullets);
    }
  }

  shoot() {
    if (this.bullets.length > 0) {
      let startCounting = 1;
      let lastBullet = this.bullets[this.bullets.length-startCounting];
      while (lastBullet.isShot) {
        console.log(lastBullet);
        startCounting++;
        lastBullet = this.bullets[this.bullets.length-startCounting];
      } 
      this.bullets[this.bullets.length-startCounting].isShot = true;
      this.bullets[this.bullets.length-startCounting]._moveRight();
      this.bulletCount -=1;
    } else {
      // display message as no bullet, please recharge
    }
  }

  recharge() {
    if (this.bulletCount === 0) {
      for (let i=0; i<this.bulletCapacity; i++) {
        const newBullet = new Bullet(210, this.y + 30, 50, 30);
        this.bullets.push(newBullet);
        console.log("charged");
      }
    } else if (this.bulletCount > 0) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px Arial";
      this.ctx.fillText(`Points: ${this.points}`, 900, 50);
      // display message as to not able to recharge when have bullets
    }
    this.bulletCount = this.bullets.length;
  }
}