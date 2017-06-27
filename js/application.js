function Game() {};
var game = new Game

Game.prototype.initialize = function() {
  var board = []
  this.board = [[2,null,null,null],[2,null,null,null],[2,null,2,2],[2,null,null,null]]
}

$(document).ready(function() {
  game.initialize();
  console.log(game)
});


Game.prototype.slide = function(direction) {
  if(direction == "right"){
    for (column=3;column>0;column--){
      if(game.empty(row,column) && !game.empty(row,column-1)){
        game.board[row][column] = game.board[row][column-1]
        game.board[row][column-1] = null
      }
    }
  }
  if(direction == "left"){
    for (column=0;column<3;column++){
      if(game.empty(row,column) && !game.empty(row,column+1)){
        game.board[row][column] = game.board[row][column+1]
        game.board[row][column+1] = null
      }
    }
  }
}

Game.prototype.merge = function(direction) {
  if(direction == "right"){
    for (column=3;column>=0;column--){
      if(game.board[row][column] == game.board[row][column-1] && game.board[row][column-1] != undefined){
        game.board[row][column] = game.board[row][column] * 2
        game.board[row][column-1] = null
      }
    }
  }
  if(direction == "left"){
    for (column=0;column<=3;column++){
      if(game.board[row][column] == game.board[row][column+1] && game.board[row][column+1] != undefined){
        game.board[row][column] = game.board[row][column] * 2
        game.board[row][column+1] = null
      }
    }
  }
}

Game.prototype.rightArrow = function() {
  console.log("RIGHT ARROW PRESSED!")
  for (row=0;row<=3;row++){
    // Send all numbers to the right
    game.slide("right");
    game.slide("right");
    game.slide("right");
    // Check if the value before is the same and then merges them
    game.merge("right");
    // Send the newly merges numbers to the right if possible
    game.slide("right");
  }
}

Game.prototype.leftArrow = function() {
  for (row=0;row<=3;row++){
    game.slide("left");
    game.slide("left");
    game.slide("left");
    game.merge("left");
    game.slide("left");
  }
}

function transposeBoard(board){
    var newBoard = [];
    for(var i = 0; i < board.length; i++){
        newBoard.push([]);
    };
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < 4; j++){
            newBoard[j].push(board[i][j]);
        };
    };
    return newBoard;
}


Game.prototype.downArrow = function() {
  console.log("down arrow pressed")
  game.board = transposeBoard(game.board)
  game.rightArrow();
  game.board = transposeBoard(game.board)
}

Game.prototype.upArrow = function() {
  game.board = transposeBoard(game.board)
  game.board = transposeBoard(game.board)
  game.board = transposeBoard(game.board)
  game.leftArrow();
  game.board = transposeBoard(game.board)
}

$(document).on('keydown', function(event) {
  console.log(game.board[0])
  console.log(game.board[1])
  console.log(game.board[2])
  console.log(game.board[3])
  if (event.which == 39) {
    game.rightArrow();
  }
  if (event.which == 37) {
    game.leftArrow();
    // game.addNewTile();
  }
  if (event.which == 40) {
    game.downArrow();
    // game.addNewTile();
  }
  if (event.which == 38) {
    game.upArrow();
  }
  console.log("Post button press:")
  console.log(game.board[0])
  console.log(game.board[1])
  console.log(game.board[2])
  console.log(game.board[3])
  game.addNewTile();
});

Game.prototype.addNewTile = function() {
  if (game.board[0].every(x => x != null) && game.board[1].every(x => x != null) && game.board[2].every(x => x != null) && game.board[3].every(x => x != null) ){
    return true
  }
  var randomRow = Math.floor(Math.random()*4)
  var randomColumn = Math.floor(Math.random()*4)
  if ( game.empty(randomRow,randomColumn) ){
    game.board[randomRow][randomColumn] = 2
  }
  else { Game.prototype.addNewTile(); }
}

Game.prototype.empty = function(row,column) {
  return game.board[row][column] == null
  return false
}
