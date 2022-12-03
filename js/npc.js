class Npc {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.role = undefined;
    this.image = undefined;
  }

  _assignRole() {
    if (Math.floor(Math.random() * 5) > 2) {
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
    setInterval(() => {
      this.x = this.x - 20;
    }, 50); 
  }
}