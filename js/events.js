
function onKeyDown(e){

	if (isLoaded && keydown.space) {
		isLoaded = false;
		player.shoot();
	}
	if (e.keyCode == 37) {
		player.velocityx = -5;
	}
	if (e.keyCode == 39) {
		player.velocityx = 5;
	}
	if (e.keyCode == 38) {
		player.velocityy = -5;
	}
	if (e.keyCode == 40) {
		player.velocityy = 5;
	}
}

function onKeyUp(e){

	if (isLoaded && keydown.space) {
		isLoaded = false;
		player.shoot();
	}
	if (e.keyCode == 37 || e.keyCode == 39) {
		player.velocityx = 0;
	}
	if (e.keyCode == 38 || e.keyCode == 40) {
		player.velocityy = 0;
	}
}
window.addEventListener("keydown", onKeyDown, true);
window.addEventListener("keyup", onKeyUp, true);

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
