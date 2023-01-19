class Bullet {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = bullet;
    this.isShot = false;
  }

  _moveRight()  {
    setInterval(() => {
      this.x = this.x + 35;
    }, 45);
  }
}