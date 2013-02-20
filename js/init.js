/*
---------------------------------------------------------------------
Shitty Space Game - A javascript shoot-em-up
init.js - initialization and configuration scripts for the game
---------------------------------------------------------------------
Copyright 2013 Niko Salakka
https://github.com/anobi

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
----------------------------------------------------------------------
*/

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");

var canvas = canvasElement.get(0).getContext('2d');
canvasElement.appendTo('body');

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

var playerBullets = [];
var enemies = [];
var enemyBullets = [];
var stars = [];
var hitpoints = 100;
var kills = 0;
var isLoaded = true;