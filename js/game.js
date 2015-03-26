

GameStates = {
	NONE: 0,
	LOADING: 1,
	MAIN_MENU: 2,
	GAME: 3,
	GAME_OVER: 4
}

function Game(){

	//gamestates and so on
	this.loaded = false;
	this.debug = false;
	this.gamestate = GameStates.NONE;

	//screen & rendering
	this.fullscreen = false;
	this.canvasWidth = 800;
	this.canvasHeight = 600;
	this.canvasElement = null;
	this.canvas = null; //canvas shit should be changed to a global variable
	this.ui = null;

	//game data
	this.score = 0;
	this.player = null;
	this.entities = [];
	this.stars = []; //to be replaced by a star shader
};


Game.prototype = {

	init: function() {
		if(this.loaded)
		{
			return;
		}

		this.canvasElement = document.getElementById('canvas');
		this.canvas = this.canvasElement.getContext('2d');
		this.canvasElement.width = this.canvasWidth;
		this.canvasElement.height = this.canvasHeight;

		this.ui = new Ui();
		this.ui.init();

		this.player = new Player();
		this.player.init();
		this.entities.push(this.player);

		this.loaded = true;

	},
	
	update: function() {

		if(this.loaded){

			this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight); 

			//update ui
			this.ui.update();

			//update entities
			for(var i = 0; i < this.entities.length; i++) {
				this.entities[i].update();
			}

			//handle collisions

		}
	},

};
