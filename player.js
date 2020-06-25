class Player {
  constructor(board) {
    this.board = board;
  }
  playTurn(board){
    this.board.position.forEach(pos =>{
      pos.addEventListener('click',(e) => {
        if(e.target.innerHTML !== 'O'){
          e.target.innerHTML = 'X';
          this.board.winnerPlayer();
        } 
      });
      
    });
  }
}


class Computer {
  constructor(board){
    this.board = board;
  }
  playTurn(){
    let computerPos = Math.floor(Math.random() * 9);
    if(this.board.position[computerPos].innerHTML !== 'X'){
      this.board.position[computerPos].innerHTML = 'O';
      this.board.winnerPlayer();
    } 
  }
}
