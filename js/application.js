function Game() {};
var game = new Game

Game.prototype.initialize = function() {
  var board = []
  this.board = [[2,2,2,2],[2,2,null,null],[2,null,2,null],[2,null,null,null]]
}


$(document).ready(function() {
  game.initialize();
  console.log(game)
});

Game.prototype.empty = function(row,column) {
  return game.board[row][column] == null
  return false
}

Game.prototype.upArrow = function() {
  console.log("UP ARROW PRESSED!")
}

Game.prototype.slide = function() {
  for (column=3;column>0;column--){
    if(game.empty(row,column) && !game.empty(row,column-1)){
      game.board[row][column] = game.board[row][column-1]
      game.board[row][column-1] = null
    }
  }
}

Game.prototype.rightArrow = function() {
  console.log("RIGHT ARROW PRESSED!")
  console.log("Initial board")
  console.log(game.board[0])
  console.log(game.board[1])
  console.log(game.board[2])
  console.log(game.board[3])

  for (row=0;row<=3;row++){

    // Send all numbers to the right
    for (column=3;column>0;column--){
      if(game.empty(row,column) && !game.empty(row,column-1)){
        game.board[row][column] = game.board[row][column-1]
        game.board[row][column-1] = null
      }
    }
    for (column=3;column>0;column--){
      if(game.empty(row,column) && !game.empty(row,column-1)){
        game.board[row][column] = game.board[row][column-1]
        game.board[row][column-1] = null
      }
    }
    for (column=3;column>0;column--){
      if(game.empty(row,column) && !game.empty(row,column-1)){
        game.board[row][column] = game.board[row][column-1]
        game.board[row][column-1] = null
      }
    }

    // Check if the value before is the same and then merges them
    for (column=3;column>=0;column--){
      if(game.board[row][column] == game.board[row][column-1] && game.board[row][column-1] != undefined){
        game.board[row][column] = game.board[row][column] * 2
        game.board[row][column-1] = null
      }
    }

    // Send the newly merges numbers to the right if possible
    for (column=3;column>0;column--){
      if(game.empty(row,column) && !game.empty(row,column-1)){
        game.board[row][column] = game.board[row][column-1]
        game.board[row][column-1] = null
      }
    }
  }
  console.log("Post button press:")
  console.log(game.board[0])
  console.log(game.board[1])
  console.log(game.board[2])
  console.log(game.board[3])
}


Game.prototype.addNewTile = function() {
  if (game.board.every(x => x != null)){
    return true
  }
  var randomIndex = Math.floor(Math.random()*16)
  if ( game.empty(randomIndex) ){
    game.board[randomIndex] = 2
  }
  else { Game.prototype.addNewTile(); }
}

$(document).on('keyup', function(event) {
  if (event.which == 39) {
    console.log("BOARD BEFORE:")
    console.log(game.board)
    Game.prototype.rightArrow();
    // Game.prototype.addNewTile();
    // console.log("BOARD AFTER:")
    // console.log(game.board)
  }
  if (event.which == 38) {
    Game.prototype.upArrow();
    Game.prototype.addNewTile();
  }
});
