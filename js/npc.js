class Npc{
  constructor() {
    this.x = 950;
    this.y = 450;
    this.width = 50;
    this.height = 50;
    this.role = undefined;
    this.image = undefined;
  }

  _assignRole() {
    if (Math.floor(Math.random() * 4) > 2) {
      this.role = "enemy";
    } else {
      this.role = "friend";
    }
  }

  _assignImage() {
    if (this.role === "enemy") {
      this.image = enemy;
    } else if (this.role === "friend") {
      this.image = friend;
    }
  }

  _moveLeft() {
    const game = new Game();
    game.ctx.clearRect(0, 0, 1000, 600);
    this.x = this.x - 5;
    if (this.x < 0 - this.width) {
      // make it disappear
    }
  }
  
  //setTimeout(() => {
  //  setInterval(_moveLeft, 100);
  //}, 2000);
}