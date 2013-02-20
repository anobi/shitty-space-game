/*
---------------------------------------------------------------------
Shitty Space Game - A javascript shoot-em-up
game.js - generic entities like enemies and stuff
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

function Star(I) {
  
  I = I || {};
  I.active = true;
  
  I.x = Math.floor((Math.random()*CANVAS_WIDTH)+1);
  I.y = 1;
  I.xVelocity = 0;
  I.yVelocity = 4;

  I.width = 2;
  I.height = 2;
  I.color = "#FFF";

  I.inBounds = function() {
    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
    I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function () {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;
    
    I.active = I.active && I.inBounds();
  };
  
  return I;
}


function Enemy(I) {
  I = I || {};
  
  I.active = true;
  I.age = Math.floor(Math.random() * 128);

  I.color = "#A2B";

  I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
  I.y = 1;
  I.xVelocity = 0;
  I.yVelocity = 2;

  I.width = 32;
  I.height = 32;
  I.bullets = [];
  I.inBounds = function() {
    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
      I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);

    I.age++;

    I.active = I.active && I.inBounds();
  };

  I.explode = function() {
    this.active = false;
    kills++;
  };
     
  I.shoot = function() {
    var bulletPosition = I.midpoint();
    var bulletSpeed = 8;
    var angle = Math.atan2(player.y - I.y, player.x - I.x);
    var scale_x = Math.cos(angle);
    var scale_y = Math.sin(angle);

    enemyBullets.push(Bullet({
      speedX: bulletSpeed * scale_x,
      speedY: bulletSpeed * scale_y,
      x: bulletPosition.x,
      y: bulletPosition.y
    }));
  };

  I.midpoint = function() {
    return {
      x: I.x + I.width/2,
      y: I.y + I.height/2
    };
  };
  return I;
};

function Bullet(I) {
  I.active = true;

  I.xVelocity = I.speedX;
  I.yVelocity = I.speedY;
  I.width =3;
  I.height = 3;
  I.color = "#FFCC00";

  I.inBounds = function() {
    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
    I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}