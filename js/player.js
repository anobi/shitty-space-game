function Player() {
	this.color = "#00A";
	this.position = {x: 0, y: 0};
	this.velocity = {x: 0, y: 0};
	this.size = {width: 0, height: 0};

	this.hitpoints = 0;
	this.shoting = false; //might need this one for beam weapons?
	this.reloading = false;
} 

Player.prototype = {

	init: function(){
		this.color = "#00A";
		this.position.x = 220;
		this.position.y = 270;
		this.size.width = 32;
		this.size.height = 32;
	},
	
	update: function() {
		//contain player within the canvas boundaries
		this.position.x = (this.position.x + this.velocity.x).clamp(0, ssg.canvasWidth - this.size.width);
		this.position.y = (this.position.y + this.velocity.y).clamp(0, ssg.canvasHeight - this.size.height);
		this.draw();
	},

	shoot: function(){
		if(!reloading){
			var bulletPosition = this.midpoint();

			//reload lol
			setTimeout(this.reloading = false, 200);
		}
	},

	midpoint: function(){
		return {
			x: this.x + this.width/2,
			y: this.y + this.height/2
		};
	},

	explode: function() {
		this.active = false;
	},

	draw: function() {
		ssg.canvas.fillStyle = this.color;
		ssg.canvas.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	}
}
