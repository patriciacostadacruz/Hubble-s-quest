class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = jerry;
  }
  
  jump() {
    setInterval(() => {
      if(this.y > 280){
        this.y = this.y - 15;
      }
    }, 100);
  }
  //only goes up

  shoot() {
    bullet.bullets -= 1;
  }

  recharge() {
    bullet.bullets += bullet.mag;
    bullet.mag = 0;
  }
}