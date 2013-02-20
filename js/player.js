/*
---------------------------------------------------------------------
Shitty Space Game - A javascript shoot-em-up
player.js - player entity and event handling
---------------------------------------------------------------------
Copyright 2013 Niko Salakka
https://github.com/anobi

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
----------------------------------------------------------------------
*/

var player = {
  color: "#00A",
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};

function updatePlayer(){
  //contain player within the canvas boundaries
  player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
  player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);

  //update the player bullets
  playerBullets.forEach(function(bullet) {
    bullet.update();
  });

  //remove the inactive bullets
  playerBullets = playerBullets.filter(function(bullet) {
    return bullet.active;
  });
}

function bulletLoaded(){
   isLoaded = true;
}

player.shoot = function() {
  var bulletPosition = this.midpoint();
  playerBullets.push(Bullet({
    speedY: -10,
    speedX: 0,
    x: bulletPosition.x,
    y: bulletPosition.y
  }));

  //reload lol
  setTimeout(bulletLoaded, 200);
};

player.midpoint = function() {
  return {
    x: this.x + this.width/2,
    y: this.y + this.height/2
  };
};

player.explode = function() {
  this.active = false;
};