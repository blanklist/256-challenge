function Game() {};
var game = new Game

$(document).ready(function() {
  game.initialize();
  printOnScreen();
});

$(document).on('keydown', function(event) {

  if (event.which == 39) {
    game.rightArrow();
  }
  if (event.which == 37) {
    game.leftArrow();
  }
  if (event.which == 40) {
    game.downArrow();
  }
  if (event.which == 38) {
    game.upArrow();
  }

  game.addNewTile();

  printOnScreen();
});

Game.prototype.initialize = function() {
  var board = []
  this.board = [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]]
}

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

var printOnScreen = function(){
  // PRINT THE VALUES ON THE BOARD
  $($("#row1").children('td')[0]).html(game.board[0][0])
  $($("#row1").children('td')[1]).html(game.board[0][1])
  $($("#row1").children('td')[2]).html(game.board[0][2])
  $($("#row1").children('td')[3]).html(game.board[0][3])

  $($("#row2").children('td')[0]).html(game.board[1][0])
  $($("#row2").children('td')[1]).html(game.board[1][1])
  $($("#row2").children('td')[2]).html(game.board[1][2])
  $($("#row2").children('td')[3]).html(game.board[1][3])

  $($("#row3").children('td')[0]).html(game.board[2][0])
  $($("#row3").children('td')[1]).html(game.board[2][1])
  $($("#row3").children('td')[2]).html(game.board[2][2])
  $($("#row3").children('td')[3]).html(game.board[2][3])

  $($("#row4").children('td')[0]).html(game.board[3][0])
  $($("#row4").children('td')[1]).html(game.board[3][1])
  $($("#row4").children('td')[2]).html(game.board[3][2])
  $($("#row4").children('td')[3]).html(game.board[3][3])

  // PRINTS THE COLORS
  $( "td").css("background-color","#CDF9F3");
  $( "td:contains('2')" ).css("background-color","#BCDCF5");
  $( "td:contains('4')" ).css("background-color","#99B4FC");
  $( "td:contains('8')" ).css("background-color","#7983E3");
  $( "td:contains('16')" ).css("background-color","#6C5BDA");
  $( "td:contains('32')" ).css("background-color","#753FD1");
  $( "td:contains('64')" ).css("background-color","#8724C8");
  $( "td:contains('128')" ).css("background-color","#A20CBF");
  $( "td:contains('256')" ).css("background-color","#D41B6C");
  $( "td:contains('512')" ).css("background-color","#DE233A");
  $( "td:contains('1024')" ).css("background-color","#E74E2B");
  $( "td:contains('2048')" ).css("background-color","#F9D53C");
};
var printOnConsole = function(){
  console.log(game.board[0])
  console.log(game.board[1])
  console.log(game.board[2])
  console.log(game.board[3])
}
