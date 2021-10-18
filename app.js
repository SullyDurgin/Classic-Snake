/*-------------------------------- Constants --------------------------------*/



/*---------------------------- letiables (state) ----------------------------*/ 
let snakePositions = []
let direction = 'right'
let ratPosition = { x: 0, y: 0 }
let gameOver = false
let userInputs = []
let intervalTime = 0
let interval = 0

//game board size (number of cells in grid)
//20x20 gameBoard = 400 cells
let width = 20 //cells
let height = 20 //cells

/*------------------------ Cached Element References ------------------------*/

const gameBoard = document.querySelector('.game-board')
const gameStatus = document.querySelectorAll('#message')


/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", function (event) { 
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) //move direction based on key pressed
  return

  event.preventDefault()
  
  if (event.key === "ArrowLeft") {
  direction = 'left'
  return
}

if (event.key === 'ArrowRight') {
	direction = 'right'
	return
}

if (event.key === 'ArrowUp') {
  direction = 'up'
  return
}

if (event.key === 'ArrowDown') {
  direction = 'down'
  return
}
})


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
  for (let i = 0; i < width * height; i++) {
		cells[i].style.removeProperty('background-color')// makes old snake disappear 
	}
	for (const segment of snakePositions) {
		const cellIndex = segment.x + width * segment.y
		const snakeCell = cells[cellIndex]
		snakeCell.style.backgroundColor = 'black'//makes current snake show up 
	}
	const ratCellIndex = ratPosition.x + width * ratPosition.y
	const ratCell = cells[ratCellIndex]
	ratCell.innerText = '🐀'

}

function startGame() {
  snakePositions = [
		{ x: 6, y: 0 },
		{ x: 7, y: 0 },
		{ x: 8, y: 0 },
		{ x: 9, y: 0 },
	]
	direction = "right"
	intervalTime = 1000
	interval = setInterval(move, intervalTime)
}

// make new function move (that is what you picked in setInterval, in startGame)
  // grab the head of the snake, like `const headPosition = snakePositions[0];`
  // declare variables for newHeadX and newHeadY
  // put an if statement for each direction that sets the values of newHeadX and newHeadY based on the 
  // direction.
  // for example if direction is left, `newHeadX = headPosition.x - 1; newHeadY = headPosition.y;`
  // same for right, up and down, you're either adding or subtracting 1 from either X or Y.
  // `snakePositions.unshift({ x: newHeadX, y: newHeadY });`
  // `snakePositions.pop();`
  // `render();`