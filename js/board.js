var Snake = require("./snake.js");
var Coord = require("./coordinate.js");

function Board(dimX, dimY) {
  var DIMX = 20;
  var DIMY = 20;
  this.dimX = dimX || DIMX;
  this.dimY = dimY || DIMY;
  var pos = [10, 10];
  this.snake = new Snake(pos);
}

Board.prototype.gameOver = function() {
  var snakeHead = this.snake.sements[0];

  var offBoard = (
    (snakeHead[0] < 0) ||
    (snakeHead[0] >= this.dimX) ||
    (snakeHead[1] > 0) ||
    (snakeHead[1] >= this.dimY)
  );

  var eatenSelf = false;
  var sortedSegments = this.snake.segments.sort();
  for (var i = 0; i < sortedSegments.length - 1; i++) {
    var coord = new Coord(sortedSegments[i]);
    if (coord.equals(sortedSegments[i + 1])) {
      eatenSelf = true;
    }
  }

  return offBoard || eatenSelf;
};

module.exports = Board;
