/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var SnakeView = __webpack_require__(3);
	
	$(function() {
	  var view = new SnakeView($("#snake-game"));
	  view.setup();
	  view.eventBinding();
	  view.step();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Coord = __webpack_require__(2);
	
	function Snake(startingPosition) {
	  this.direction = [0, 0];
	  this.segments = [startingPosition];
	  this.appleCount = 0;
	}
	
	Snake.DIRECTIONS = {
	  "N": [0, -1],
	  "E": [1, 0],
	  "S": [0, 1],
	  "W": [-1, 0]
	};
	
	Snake.prototype.move = function() {
	  this.appleCount -= 1;
	
	  var newSegment = (new Coord(this.segments[0])).plus(this.direction);
	  this.segments.unshift(newSegment);
	
	  if (this.appleCount < 0) {
	    this.segments.pop();
	  }
	};
	
	Snake.prototype.turn = function(newDirection) {
	  var dirVect = Snake.DIRECTIONS[newDirection];
	
	  if (!(new Coord(this.direction).isOpposite(dirVect))) {
	    this.direction = dirVect;
	  }
	};
	
	module.exports = Snake;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(4);
	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(1);
	var Coord = __webpack_require__(2);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map