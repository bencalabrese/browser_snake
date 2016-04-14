var Board = require("./board.js");

function SnakeView($rootEl, dimX, dimY) {
  this.$rootEl = $rootEl;
  this.board = new Board(dimX, dimY);
}

SnakeView.KEYMAP = {
  "37": "W",
  "38": "N",
  "39": "E",
  "40": "S",
};

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

SnakeView.prototype.eventBinding = function () {
  var self = this;

  $("body").on("keydown", function(event){
    self.board.snake.turn(SnakeView.KEYMAP[event["keyCode"]]);
  });
};

SnakeView.prototype.render = function() {
  $(".square").removeClass("snake-body");
  $(".square").removeClass("apple");

  var applePos = this.board.apple;
  $(".square[data-pos='" + applePos + "']").addClass("apple");


  var segments = this.board.snake.segments;
  for (var i = 0; i < segments.length; i++) {
    var pos = segments[i];
    $(".square[data-pos='" + pos + "']").addClass("snake-body");
  }
};

SnakeView.prototype.step = function () {
  setTimeout(function() {
    this.board.snake.move();
    this.board.checkApple();

    if (this.board.gameOver()) {
      alert("You died");
    } else {
      this.render();
      this.step();
    }
  }.bind(this), 200);
};


module.exports = SnakeView;
