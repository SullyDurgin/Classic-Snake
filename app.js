/*-------------------------------- Constants --------------------------------*/



/*---------------------------- letiables (state) ----------------------------*/
let cells 
let snake 
let rat
let snakePosition = [0, 1, 2, 3, 23, 24, 25 ]
let ratPosition = [90]
let gameOver = false

//game board size (number of cells in grid)
//20x20 gameBoard = 400 cells
let width = 20 //cells
let height = 20 //cells

/*------------------------ Cached Element References ------------------------*/

const gameBoard = document.querySelector('.game-board')
const gameStatus = document.querySelectorAll('#message')


/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

//first define the required variables to track game state
//store cached elements
//define required constants

init()


function init() {
  
  for (let i = 0; i < width * height; i++) {
	const inside = document.createElement('div')
	inside.classList.add('inside')

	const cell = document.createElement('div')
  cell.classList.add('cell')
	cell.appendChild(inside)
	gameBoard.appendChild(cell)
  }
  cells = document.querySelectorAll('.game-board .cell .inside')
  render()
}


function render() {
  for (const i of snakePosition) {
    const snakeCell = cells[i]
    snakeCell.style.backgroundColor = 'black'
  } 
const ratCell = cells[ratPosition]
ratCell.innerText = '🐀'
  
}
