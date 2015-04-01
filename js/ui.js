"use strict";
var debugScreen = {
    color: "#F00",
    x: 50,
    y: 50,
    width: 800,
    height: 100,
    draw: function () {
        return;
    }
};


var gameOverScreen = {
    color: "#F00",
    x: 800 / 2,
    y: 600 / 2,
    draw: function () {
        return;
    }
};

function Ui() {
    this.elements = [];
}

Ui.prototype = {
    init: function () {
        this.elements.push(debugScreen);
    },

    update: function () {
        this.render(); //not much going on here yet
    },

    render: function () {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].draw();
        }
    }
}
