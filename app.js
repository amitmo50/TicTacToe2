const board = new Board;
const player1 = new Player(board);
const player2 = new Computer(board);
let turn = 0;
class ticTacToeGame{
  constructor(player1,player2,board)
  {
    this.player1 = player1;
    this.player2 = player2;
    this.board = board;
  }
  playTurn(){
    if(this.board.winnerPlayer()){
      return;
    }
    if(turn % 2 === 0){
      this.player1.playTurn();
    }else{
      this.player2.playTurn();
    }
    turn++;
  }
}
const game = new ticTacToeGame(player1, player2, board);
game.playTurn();



