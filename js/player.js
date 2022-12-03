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
    }
  }

  shoot() {
    if (this.bullets.length > 0) {
      this.bullets[this.bulletIndex].isShot = true;
      this.bullets[this.bulletIndex]._moveRight();
      console.log(bullet.isShot);
      console.log(this.bulletIndex);
      this.bulletIndex++;
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
        this.bulletCount = this.bullets.length;
        console.log("charged");
      }
    } else if (this.bulletCount > 0) {
      console.log("cannot");
      // display message as to not able to recharge when have bullets
    }
  }
}