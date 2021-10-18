/*-------------------------------- Constants --------------------------------*/



/*---------------------------- letiables (state) ----------------------------*/ 
let snakePositions = []
let direction = 'right'
let ratPosition = { x: 0, y: 0 }
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
const gameButton = document.querySelector('button')


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

gameButton.addEventListener('click', startGame)

/*-------------------------------- Functions --------------------------------*/

//first define the required letiables to track game state
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
		cells[i].style.removeProperty('background-color') // makes old snake disappear
	}
	for (const segment of snakePositions) {
		const cellIndex = segment.x + width * segment.y
		const snakeCell = cells[cellIndex]
		snakeCell.style.backgroundColor = 'blue' //makes current snake show up
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
		{ x: 10, y: 0 },
		{ x: 11, y: 0 },
		{ x: 12, y: 0 },
		{ x: 13, y: 0 },
		{ x: 14, y: 0 },
		{ x: 15, y: 0 },
	]
	direction = 'right'
	intervalTime = 500
	interval = setInterval(move, intervalTime)
	render()
}

function move() {
	const headPosition = snakePositions[0]
	let newHeadX = headPosition.x
	let newHeadY = headPosition.y

	if (direction === 'left') {
		newHeadX = headPosition.x - 1
    
	} else if (direction === 'up') {

		newHeadY = headPosition.y - 1

	} else if (direction ==='right') {

		newHeadX = headPosition.x + 1
		
	} else if (direction === 'down') {
		
		newHeadY = headPosition.y + 1
	}
if (hitSelf(newHeadX, newHeadY)) {
	gameOver()
	return
}

	snakePositions.unshift({ x: newHeadX, y: newHeadY })
	snakePositions.pop()
	render()
}

  function hitSelf(x, y) {
		for (let i = 1; i < snakePositions.length; i++) {
			if (x == snakePositions[i].x && y == snakePositions[i].y) return true
		}
		return false
	}

function gameOver() {
}

// function hitBorder() {
// 	let headPosition = snakePositions.length - 1 // leaves grid
// 	if (
// 		(snakePositions[headPosition][0] === gameBoard.cell - 1 &&
// 			snake.direction === 'right') ||
// 		(snakePositions[headPosition][0] === 0 && snakePositions.direction === 'left') ||
// 		(snakePositions[headPosition][1] === gameBoard.cell - 1 &&
// 			snakePositions.direction === 'down') ||
// 		(snakePositions[headPosition][1] === 0 && snake.direction === 'up')
//   )
// {
//   return gameOver()
// } 
// }
