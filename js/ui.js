var debugScreen = {
	color: "#F00",
	x: 50,
	y: 50,
	width: 800,
	height: 100,
	draw: function() {
		ssg.canvas.fillStyle = this.color;
		ssg.canvas.fillText("health: " + ssg.player.hitpoints, this.x, this.y);
		ssg.canvas.fillText("kills: " + ssg.score, this.x + 100, this.y); 
	}
};

var bg = {
	color: "#000",
	x: 0,
	y: 0,
	width: 800,
	height: 600,
	draw: function() {
		ssg.canvas.fillStyle = this.color;
		ssg.canvas.fillRect(this.x, this.y, this.width, this.height);
	}
};

var gameOverScreen = {
	color: "#F00",
	x: 800 / 2,
	y: 600 / 2,
	draw: function() {
		ssg.canvas.fillStyle = this.color;
		ssg.canvas.fillText("GAME OVER LOL", this.x, this.y);
	}
};

function Ui(){
	this.elements = [];
}

Ui.prototype = {
	init: function(){
		this.elements.push(debugScreen);
	},

	update: function(){
		this.render(); //not much going on here yet
	},

	render: function(){
		for(var i = 0; i < this.elements.length; i++) {
			this.elements[i].draw();
		}
	}
}
