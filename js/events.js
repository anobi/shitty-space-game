/*
---------------------------------------------------------------------
Shitty Space Game - A javascript shoot-em-up
events.js - main event handling functions
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

function gameOver() {
  gameOverScreen.draw();
  setInterval(function(){
    gameOverScreen.draw();
    }, 0);
  clearInterval(interval);
}

function draw(){

  //clear the screen
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 

  //draw background and stars
  bg.draw();
  stars.forEach(function(star) {
    star.draw();
  });

  //draw the UI
  debugScreen.draw();

  //draw player and player related things
  player.draw();
  playerBullets.forEach(function(bullet) {
    bullet.draw();
  });

  //draw enemies and enemy related things
  enemies.forEach(function(enemy) {
    enemy.draw();
  });
  enemyBullets.forEach(function(bullet) {
    bullet.draw();
  });
}

function updateEnemies(){
  //handle the enemy bullets..
  enemyBullets.forEach(function(bullet) {
    bullet.update();
  });

  //and remove the inactive ones
  enemyBullets = enemyBullets.filter(function(bullet) {
    return bullet.active;
  });


  enemies.forEach(function(enemy) {
    enemy.update();
    if(Math.floor((Math.random()*100)+1) == 2) {
      enemy.shoot();
    }
  });

  enemies = enemies.filter(function(enemy) {
    return enemy.active;
  });

  if(Math.floor((Math.random()*100)+1) <= 2) {
    enemies.push(Enemy());
  }
}

function updateWorld(){
    stars.forEach(function(star) {
    star.update();
  });

  stars = stars.filter(function(star) {
    return star.active;
  });

  if(Math.random() < 1) {
    stars.push(Star());
  }
}

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
 	 a.y < b.y + b.height &&
	 a.y + a.height > b.y;
};

function handleCollisions() {
  playerBullets.forEach(function(bullet) {
    enemies.forEach(function(enemy) {
      if (collides(bullet, enemy)) {
        enemy.explode();
        bullet.active = false;
      }
    });
  });

  enemyBullets.forEach(function(bullet) {
    if (collides(bullet, player)) {
      bullet.active = false;
      if (hitpoints > 0) {
        hitpoints = hitpoints - 1;
      }
      if (hitpoints == 0) {
        player.explode();
        gameOver();
      }
    }
  });

  enemies.forEach(function(enemy) {
    if (collides(enemy, player)) {
      enemy.explode();
      if (hitpoints > 0) {
        hitpoints = hitpoints - 1;
      }
      if (hitpoints == 0) {
        player.explode();
        gameOver();
      }
    }
  });
};