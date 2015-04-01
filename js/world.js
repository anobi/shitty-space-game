"use strict";

var bg = {
    color: "#000",
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    draw: function () {
        return;
    }
};

function World() {
    this.background = bg;
    this.elements = [];
}

World.prototype = {
    init: function () {
        return;
    },

    update: function () {
        this.draw();
    },

    draw: function () {

        this.background.draw();
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].draw();
        }
    }
}
