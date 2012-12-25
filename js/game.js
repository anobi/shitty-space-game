var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");

var canvas = canvasElement.get(0).getContext('2d');
canvasElement.appendTo('body');

var FPS = 60;
var interval;

interval = setInterval(function(){  
 update();
 draw();
 }, 1000/FPS);

function gameOver() {
  gameOverScreen.draw();
  setInterval(function(){
    gameOverScreen.draw();
    }, 0);
  clearInterval(interval);
}

var debugScreen = {
  color: "#F00",
  x: 50,
  y: 50,
  width: 800,
  height: 100,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillText("health: " + hitpoints, this.x, this.y);
    canvas.fillText("kills: " + kills, this.x + 100, this.y); 
  }
};

var bg = {
  color: "#000",
  x: 0,
  y: 0,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
}

var gameOverScreen = {
  color: "#F00",
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillText("GAME OVER LOL", this.x, this.y);
  }
};

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

var playerBullets = [];
var enemies = [];
var enemyBullets = [];
var stars = [];
var hitpoints = 100;
var kills = 0;

function update(){
  if (keydown.space) {
    player.shoot();
  }
  if (keydown.left) {
    player.x -= 5;
  }
  if (keydown.right) {
    player.x += 5;
  }
  if (keydown.up) {
    player.y -= 5;
  }
  if (keydown.down) {
    player.y += 5;
  }

  player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
  player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);

  playerBullets.forEach(function(bullet) {
    bullet.update();
  });

  playerBullets = playerBullets.filter(function(bullet) {
    return bullet.active;
  });

  enemyBullets.forEach(function(bullet) {
    bullet.update();
  });

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

  stars.forEach(function(star) {
    star.update();
  });

  stars = stars.filter(function(star) {
    return star.active;
  });

  if(Math.random() < 1) {
    stars.push(Star());
  }

  handleCollisions();
    
};

function draw(){
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  bg.draw();
  
  stars.forEach(function(star) {
    star.draw();
  });

  debugScreen.draw();
  player.draw();
  playerBullets.forEach(function(bullet) {
    bullet.draw();
  });
  enemies.forEach(function(enemy) {
    enemy.draw();
  });
  enemyBullets.forEach(function(bullet) {
    bullet.draw();
  });
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

player.shoot = function() {
  var bulletPosition = this.midpoint();

  playerBullets.push(Bullet({
    speedY: -10,
    speedX: 0,
    x: bulletPosition.x,
    y: bulletPosition.y
  }));
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
