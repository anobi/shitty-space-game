"use strict";

function Player() {
    this.color = "#00A";
    this.position = {x: 0, y: 0};
    this.velocity = {x: 0, y: 0};
    this.size = {width: 0, height: 0};

    this.hitpoints = 0;
    this.shoting = false; //might need this one for beam weapons?
    this.reloading = false;
    this.texture = null;
    this.sprite = null;
}

Player.prototype = {

    init: function () {
        this.position.x = 220;
        this.position.y = 270;
        this.size.width = 32;
        this.size.height = 32;

        this.color = "#00A";
        this.texture = PIXI.Texture.fromImage("res/player.png");
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.x = 200;
        this.sprite.position.y = 400;

        stage.addChild(this.sprite);
    },

    update: function () {
        //contain player within the canvas boundaries
        this.position.x = (this.position.x + this.velocity.x).clamp(0, ssg.canvasWidth - this.size.width);
        this.position.y = (this.position.y + this.velocity.y).clamp(0, ssg.canvasHeight - this.size.height);
        this.draw();
    },

    shoot: function () {
        if (!this.reloading) {
            return;
        }
    },

    midpoint: function () {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    },

    explode: function () {
        this.active = false;
    },

    draw: function () {
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
    }
};
