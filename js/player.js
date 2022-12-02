class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = jerry;
    this.bulletCapacity = 7;
    this.bulletCount = 0;
    this.bulletIndex = 0;
    this.bullets = [];
  }
  
  jump() {
    const baseline = this.y + this.height;
    const upInterval = setInterval(() => {
        this.y = this.y - 15;
    }, 60);
    if (this.y < 220) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        this.y = this.y + 12;
      }, 50);
      if (this.y > baseline) {
        clearInterval(downInterval);
      }
    }
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
      this.bullets[this.bulletIndex].isShot = true;
      this.bullets[this.bulletIndex]._moveRight();
      this.bulletIndex++;
      this.bulletCount -=1;
    } else {
      // display message as no bullet, please recharge
    }
  }

  recharge() {
    if (this.bulletCount <= 0) {
      for (let i=0; i<this.bulletCapacity; i++) {
        const newBullet = new Bullet(210, this.y + 30, 50, 30);
        this.bullets.push(newBullet);
      }
    } else if (this.bulletCount > 0) {
      // display message as to not able to recharge when have bullets
    }
  }
}