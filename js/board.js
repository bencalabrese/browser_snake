var Snake = require("./snake.js");
var Coord = require("./coordinate.js");

function Board(dimX, dimY) {
  var DIMX = 20;
  var DIMY = 20;
  this.dimX = dimX || DIMX;
  this.dimY = dimY || DIMY;
  var pos = [10, 10];
  this.snake = new Snake(pos);
  this.addApple();
}

Board.prototype.addApple = function() {
  var randX = Math.floor(Math.random()*this.dimX);
  var randY = Math.floor(Math.random()*this.dimY);
  var randCoord = new Coord([randX, randY]);

  var segments = this.snake.segments;
  var noOverlap = false;

  while (!noOverlap) {
    noOverlap = true;

    for (var i = 0; i < segments; i++) {
      if (randCoord.equals(segments[i])) {
        noOverlap = false;

        randX = Math.floor(Math.random()*this.dimX);
        randY = Math.floor(Math.random()*this.dimY);
        randCoord = new Coord([randX, randY]);
      }
    }
  }

  this.apple = [randX, randY];
};

Board.prototype.gameOver = function() {
  var snakeHead = this.snake.segments[0];

  var offBoard = (
    (snakeHead[0] < 0) ||
    (snakeHead[0] >= this.dimX) ||
    (snakeHead[1] < 0) ||
    (snakeHead[1] >= this.dimY)
  );

  var eatenSelf = false;
  var coord = new Coord(snakeHead);

  for (var i = 1; i < this.snake.segments.length; i++) {
    if (coord.equals(this.snake.segments[i])) {
      eatenSelf = true;
    }
  }

  return offBoard || eatenSelf;
};

Board.prototype.checkApple = function () {
  if (new Coord(this.snake.segments[0]).equals(this.apple)) {
    this.snake.appleCount = 2;
    this.addApple();
    return true;
  }

  return false;
};

module.exports = Board;
