class Player{
  constructor(x = 100, y = 450, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = jerry;
  }
  
  jump() {}

  shoot() {
    //const game = new Game();
    //game.ctx.fillStyle = "black";
    //game.ctx.fillRect(160, 470, 8, 8);
  }

  recharge() {
    const game = new Game();
    // wanted to define it outside to be used in all methods but have an error with max func call stack
    game.bullets += game.mag;
  }
}