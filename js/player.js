class Player {
  constructor(x, y, width, height, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = context;
    this.image = jerry;
    this.bulletCapacity = 3;
    this.bulletCount = 0;
    this.bulletIndex = 0;
    this.bullets = [];
    this.shootingMusic = shootingMusic;
    this.rechargeMusic = rechargeMusic;
    this.action = actionImpossible;
  }   

  _charge() {
    for (let i=0; i < this.bulletCapacity; i++) {
      const newBullet = new Bullet(280, this.y + 70, 50, 30);
      this.bullets.push(newBullet);
      this.bulletCount = this.bullets.length;
    }
  }

  shoot() {
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
  } 

  recharge() {
    for (let i=0; i<this.bulletCapacity; i++) {
      const newBullet = new Bullet(280, this.y + 70, 50, 30);
      this.rechargeMusic.play();
      this.bullets.push(newBullet);
    }
    this.bulletCount = this.bullets.length;
  } 
}