class Player{
  constructor(x = 100, y = 450, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = jerry;
  }
  
  jump() {
    game.ctx.clearRect(0, 0, 1000, 600);
    this.y = this.y - 10;
  }

  shoot() {
    // display bullet image and move towards enemy -> right
    game.bullets -= 1;
  }

  recharge() {
    game.bullets += game.mag;
  }
}