/*-------------------------------- Constants --------------------------------*/



/*---------------------------- letiables (state) ----------------------------*/ 
let snake = [0,1,2]
let rat
let currentIndex = 0
let snakePositions = [
	{ x: 6, y: 0 },
	{ x: 7, y: 0 },
	{ x: 8, y: 0 },
	{ x: 9, y: 0 },
]
let moveDirection = 'right'
let ratPosition = { x: 0, y: 0 }
let gameOver = false
let userInputs = []
let headPosition
let speed = 0.8
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
  if (!['left', 'right', 'up', 'down'].includes(event.key))
  return

  event.preventDefault()
  
  if (event.key === "left") {
  moveDirection = 'left'
  return
}

if (event.key === 'right') {
	moveDirection = 'right'
	return
}

if (event.key === 'up') {
  moveDirection = 'up'
  return
}

if (event.key === 'down') {
  moveDirection = 'down'
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
		cells[i].style.removeProperty('background-color')
	}
	for (const segment of snakePositions) {
		const cellIndex = segment.x + width * segment.y
		const snakeCell = cells[cellIndex]
		snakeCell.style.backgroundColor = 'black'
	}
	const ratCellIndex = ratPosition.x + width * ratPosition.y
	const ratCell = cells[ratCellIndex]
	ratCell.innerText = '🐀'

}


// function startGame() {
// 	direction = 1
// 	intervalTime = 1000
// 	interval = setInterval(moveOutcome, intervalTime)
// }

// function moveOutcome() {
// 	let cells = document.querySelectorAll('.cell')
// 		move(cells)
// 	}

//   function move(cells) {
//     let tail = snake.pop()
//     cells[tail].classList.remove('snakeCell')
//     snake.unshift(snake[0] + direction)
//     cells[snake[0]].classList.add('snakeCell')
// 	}


  window.tempSnakeRenderTest = function() {
  snakePositions = [
		{ x: 11, y: 0 },
		{ x: 12, y: 0 },
		{ x: 13, y: 0 },
		{ x: 14, y: 0 },
	]
  render();
};