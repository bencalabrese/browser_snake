function Coord(pos) {
  this.x = pos[0];
  this.y = pos[1];
}

Coord.prototype.plus = function(vector) {
  var x = this.x + vector[0];
  var y = this.y + vector[1];
  return [x,y];
};

Coord.prototype.equals = function(otherPos) {
  return (this.x === otherPos[0]) && (this.y === otherPos[1]);
};

Coord.prototype.isOpposite = function(otherPos) {
  var oppX = this.x * -1;
  var oppY = this.y * -1;

  return (oppX === otherPos[0]) && (oppY === otherPos[1]);
};

module.exports = Coord;
