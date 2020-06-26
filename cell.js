class Cell {
  constructor(options) {
    this.id = options.id;
    this.onClick = options.onClick;
    this.createCellElement(options.container);
  }

  createCellElement(container) {
    this.cellElement = document.createElement('div');
    this.cellElement.classList.add('cell');

    this.cellElement.addEventListener('click', () => {
      this.onClick(this.id);
    });

    container.appendChild(this.cellElement);
  }

  setValue(value) {
    if (this.cellElement.innerHTML !== '') {
      return false;
    }

    this.cellElement.innerHTML = value;
    return true;
  }
}