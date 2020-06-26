class Board {
  constructor(options){
    this.createBoardElement(options.container, options.size);
    this.getCurrentValue = options.getCurrentValue;
    this.moveToNextTurn = options.moveToNextTurn;
    this.checkIfWinner = options.winnerPlayer;
  }

  createBoardElement = (container, size, cellsInARow) => {
    this.cells = {};
    this.boardElement = document.createElement('div');
    this.boardElement.classList.add('board');

    for (let i = 0; i < size; i++) {
      this.cells[i] = new Cell({
        container: this.boardElement,
        id: i,
        onClick: this.performTurn
      }); 
    }

    container.appendChild(this.boardElement);
  }

  performTurn = (id) => {
    const currentValue = this.getCurrentValue();
    
    if (this.cells[id].setValue(currentValue)) {
      this.checkIfWinner();
      this.moveToNextTurn();
    }
  }
  
  isCellAvailable = (selectedCell) => {
    return this.cells[selectedCell].cellElement.innerHTML === '';
  }

  cleanBoard(){
    this.position.forEach(pos => {
      pos.innerHTML = "";
      pos.classList.remove("winner");
    })
  }
}