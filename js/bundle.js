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
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Coord = __webpack_require__(2);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map