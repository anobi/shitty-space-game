

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

    //modules
    this.world = null;
    this.ui = null;
    this.player = null;

    //game data
    this.score = 0;
    this.entities = [];
};


Game.prototype = {

    init: function() {
        if(this.loaded)
        {
            return;
        }

        this.world = new World();
        this.world.init();
        
        this.ui = new Ui();
        this.ui.init();

        this.player = new Player();
        this.player.init();
        this.entities.push(this.player);

        this.loaded = true;

    },
    
    update: function() {

        if(this.loaded){

            //
            //update the screen layers: 1) world, 2) entities, 3) ui
            //
            
            //update the world first
            this.world.update();

            //update entities
            for(var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
            }

            //update ui
            this.ui.update();

            //handle collisions

        }
    },
};
