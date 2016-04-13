var Coord = require("./coordinate.js");

function Snake(startingPosition) {
  this.direction = [0, 0];
  this.segments = [startingPosition];
}

Snake.DIRECTIONS = {
  "N": [0, -1],
  "E": [1, 0],
  "S": [0, 1],
  "W": [-1, 0]
};

Snake.prototype.move = function() {
  var newSegment = (new Coord(this.segments[0])).plus(this.direction);
  this.segments.unshift(newSegment);
  this.segments.pop();
};

Snake.prototype.turn = function(newDirection) {
  var dirVect = Snake.DIRECTIONS[newDirection];

  if (!(new Coord(this.direction).isOpposite(dirVect))) {
    this.direction = dirVect;
  }
};

module.exports = Snake;
