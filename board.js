class Board {
  constructor(){
    this.position = Array.from(document.querySelectorAll('.col'));
  }
  
  winnerPlayer(){
    let winnerFlag = false;
    const winnerCombination = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];
    
    const position = this.position;
    winnerCombination.forEach((winCombo) => {
      const textPos0 = position[winCombo[0]].innerText;
      const textPos1 = position[winCombo[1]].innerText;
      const textPos2 = position[winCombo[2]].innerText;
      if(textPos0 === textPos1 && textPos1 === textPos2 && textPos0 !== ''){
        winCombo.forEach((pos) => {
          position[pos].className += ' winner';
        });
        winnerFlag = true;
      }
    });
    return winnerFlag;
  }

  cleanBoard(){
    this.position.forEach(pos => {
      pos.innerHTML = "";
      pos.classList.remove("winner");
      
    })
  }
}