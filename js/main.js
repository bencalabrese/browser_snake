var SnakeView = require("./snake-view.js");

$(function() {
  var view = new SnakeView($("#snake-game"));
  view.setup();
});
