class TicTacToeGame{
  constructor(options) {
    this.board = new Board({
      ...options,
      getCurrentValue: this.getCurrentValue,
      moveToNextTurn: this.moveToNextTurn,
      winnerPlayer: this.winnerPlayer,
      isTie: this.isTie
    });
    this.size = options.size;
    this.winnerCombination = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    this.alertWinner = options.alertWinner;
    this.alertTie = options.alertTie;
    this.restartGame = options.restartGame;
    this.turn = 0;
    this.winnerFlag = false;
    this.tieFlag = false;
  }

  getCurrentValue = () => {
    if (this.turn % 2 === 0) {
      return 'X';
    } 
    return 'O';
  }

  moveToNextTurn = () => {
    this.turn++;
    if (this.turn % 2 !== 0 && this.turn < this.size && !this.winnerFlag) {
      this.performComputerMove();
    }
  }

  performComputerMove = () => {
    let computerCell = Math.floor(Math.random() * 9);

    while (!this.board.isCellAvailable(computerCell)) {
      computerCell = Math.floor(Math.random() * 9);
    }

    this.board.performTurn(computerCell);
  }

  winnerPlayer = () => {
    this.winnerCombination.forEach((currentWinCombo) => {
      const textPos0 = this.board.cells[currentWinCombo[0]].cellElement.innerHTML;
      const textPos1 = this.board.cells[currentWinCombo[1]].cellElement.innerHTML;
      const textPos2 = this.board.cells[currentWinCombo[2]].cellElement.innerHTML;

      if(textPos0 === textPos1 && textPos1 === textPos2 && textPos0 !== ''){
        currentWinCombo.forEach((pos) => {
          this.board.cells[pos].cellElement.classList.add('winner');
          this.board.boardElement.classList.add('game-over');
        });
        this.winnerFlag = true;
        this.restartGame();
        this.alertWinner(textPos0);
        this.cleanBoard();
        
      }
    });
  }

  isTie = () => {
    if(this.turn === 8 && !this.winnerFlag){
      this.tieFlag = true;
      this.restartGame();
      this.alertTie();
    }
  }

  cleanBoard(){
    const winnerAlert = document.querySelector('.winner-message');
    const restartButton = document.querySelector('.restart-button');
    const restartDivButton = document.querySelector('.restart');
    restartButton.addEventListener('click', () => {
        for(let i = 0; i < this.size; i++)
          {
          this.board.cells[i].cellElement.innerHTML = '';
          this.board.boardElement.classList.remove('game-over');
          if(this.board.cells[i].cellElement.classList.contains('winner')){
            this.board.cells[i].cellElement.classList.remove('winner');
          }
        }
        document.querySelector('.board').parentNode.removeChild(winnerAlert);
        document.querySelector('.board').parentNode.removeChild(restartDivButton);
        console.log(this.turn);
        this.turn = 0;
    });
    
  }
  
}


const game = new TicTacToeGame({
  container: document.getElementById('main-container'),
  size: 9,
  alertWinner: (winner) => {
    const winnerMessage = document.createElement('div');
    winnerMessage.innerHTML = `${winner} is the WINNER!!! 🎉`;
    winnerMessage.classList.add('winner-message');
    document.querySelector('.board').before(winnerMessage);
  },
  alertTie: () => {
    const tieMessage = document.createElement('div');
    tieMessage.innerHTML = 'It is a Tie!! 🙀';
    tieMessage.classList.add('tie-message');
    document.querySelector('.board').before(tieMessage);
  },
  restartGame: () => {
    const restartGame = document.createElement('div');
    restartGame.classList.add('restart');
    const restartButton = document.createElement('button');
    restartButton.classList.add('restart-button');
    restartButton.innerHTML = 'Restart Game';
    restartGame.appendChild(restartButton);
    document.querySelector('.board').after(restartGame);

  }
});


