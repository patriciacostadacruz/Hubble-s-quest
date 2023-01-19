class Ovni {
  constructor(x, y, width, height, speed = 50) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = ovni;
    this.speed = speed;
  }

  _moveRight() {
    setInterval(() => {
      this.x = this.x + 10;
    }, this.speed);
  }

}