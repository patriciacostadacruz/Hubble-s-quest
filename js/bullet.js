class Bullet {
  constructor(x, y, width, height) {
    this.bullets = 8;
    this.mag = 0;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = bullet;
  }

  _moveRight()  {
    this.x = this.x + 15;
  }
}