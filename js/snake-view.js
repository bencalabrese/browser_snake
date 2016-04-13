var Board = require("./board.js");

function SnakeView($rootEl, dimX, dimY) {
  this.$rootEl = $rootEl;
  this.board = new Board(dimX, dimY);
}

SnakeView.prototype.setup = function() {
  for (var i = 0; i < this.board.dimY; i++) {
    var $row = $("<ul></ul>");
    $row.addClass("row group");

    for (var j = 0; j < this.board.dimX; j++) {
      var $square = $("<li></li>");
      $square.addClass("square");
      $square.attr("data-pos", [j, i]);
      $row.append($square);
    }

    this.$rootEl.append($row);
  }
};


module.exports = SnakeView;
