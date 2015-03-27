Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function calcAngle(x1, x2, y1, y2) {
  var calcAngle = Math.atan2(x1-x2,y1-y2)*(180/Math.PI);
  if(calcAngle < 0)
    calcAngle = Math.abs(calcAngle);
  else
    calcAngle = 360 - calcAngle;
  
  return calcAngle;
};

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
 	 a.y < b.y + b.height &&
	 a.y + a.height > b.y;
};
