class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = jerry;
    this.shooting = false;
  }
  
  jump() {
    const baseline = this.y + this.height;
    const upInterval = setInterval(() => {
        this.y = this.y - 15;
    }, 60);
    if (this.y < 220) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        this.y = this.y + 15;
      }, 50);
      if (this.y > baseline) {
        clearInterval(downInterval);
      }
    }
  }
  // only goes up without stopping

  shoot() {
    console.log("shooting");
    const newBullet = new Bullet(210, 410, 50, 30);
    if (newBullet.bullets > 0) {
      this.shooting === true;
      newBullet._moveRight();
      newBullet.bullets -= 1;
      console.log(`Bullets remain: ${newBullet.bullets}`);
    }
    this.shooting === false;
  }
  // doesn't let bullet show AND only deducts one bullet and then nothing

  recharge() {
    bullet.bullets += bullet.mag;
    bullet.mag = 0;
    console.log(`${bullet.bullets}`);
    // says NaN
  }
}