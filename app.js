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
const gameStatus = document.querySelector('#message')
const gameButton = document.querySelector('button')

/*----------------------------- Event Listeners -----------------------------*/
gameButton.addEventListener('click', startGame)

window.addEventListener('keydown', function (event) {
	if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key))
		//move direction based on key pressed
		return

	event.preventDefault()

	if (event.key === 'ArrowLeft') {
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

//first define the required letiables to track game state
//store cached elements
//define required constants

init()

function init() {
	gameStatus.innerText = ''
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
	direction = 'left'
	intervalTime = 500
	interval = setInterval(move, intervalTime)
	render()
}

function move() {
	console.log(snakePositions)
	const headPosition = snakePositions[0]
	let newHeadX = headPosition.x
	let newHeadY = headPosition.y

	if (direction === 'left') {
		newHeadX = headPosition.x - 1
	} else if (direction === 'up') {
		newHeadY = headPosition.y - 1
	} else if (direction === 'right') {
		newHeadX = headPosition.x + 1
	} else if (direction === 'down') {
		newHeadY = headPosition.y + 1
	}
	if (hitSelf(newHeadX, newHeadY) || hitBorder(newHeadX, newHeadY)) {
		gameOver()
		return
	}

	snakePositions.unshift({ x: newHeadX, y: newHeadY })
	//after move snake onto rat but before draw snake again
	//if new hit x = rat x and new hit y = rat y then do rat stuff
	// else snakePositions.pop()
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
	gameStatus.innerText = 'Game Over'
	clearInterval(interval)
	render()
}

function hitBorder(x, y) {
	if (x < 0 || x > 19 || y < 0 || y > 19) return true
	return false
}
