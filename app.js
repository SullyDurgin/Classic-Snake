/*-------------------------------- Constants --------------------------------*/

/*---------------------------- letiables (state) ----------------------------*/
let snakePositions = []
let direction
let ratPosition = { x: 13, y: 13 }
let userInputs = []
let intervalTime = 0
let interval = 0
let score

//game board size (number of cells in grid)
//20x20 gameBoard = 400 cells
let width = 20 //cells
let height = 20 //cells

/*------------------------ Cached Element References ------------------------*/

const gameBoard = document.querySelector('.game-board')
const gameStatus = document.querySelector('#message')
const gameButton = document.querySelector('#start')
const gameScore = document.querySelector('#score')
const colorButton = document.querySelector('#color')
/*----------------------------- Event Listeners -----------------------------*/
gameButton.addEventListener('click', startGame)
colorButton.addEventListener('click', changeColor)

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
	gameScore.innerText = 'Score:'
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
		cells[i].innerText = ''
	}
	for (const segment of snakePositions) {
		const cellIndex = segment.x + width * segment.y
		const snakeCell = cells[cellIndex]
		snakeCell.style.backgroundColor = 'black' //makes current snake show up
	}
	const ratCellIndex = ratPosition.x + width * ratPosition.y
	const ratCell = cells[ratCellIndex]
	ratCell.innerText = '🐀'
}

function startGame() {
	gameStatus.innerText = ''
	snakePositions = [
		{ x: 6, y: 0 },
		{ x: 7, y: 0 },
		{ x: 8, y: 0 },
	]
	direction = 'left'
	intervalTime = 400
	interval = setInterval(move, intervalTime)

	render()
}

function move() {
	const headPosition = snakePositions[0]
	let newHeadX = headPosition.x
	let newHeadY = headPosition.y
	let ratX = ratPosition.x
	let ratY = ratPosition.y
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

	if (newHeadX === ratX && newHeadY === ratY) {
		snakePositions.splice(0, 1, { x: newHeadX, y: newHeadY })
		ratPosition.x = Math.floor(Math.random() * width)
		ratPosition.y = Math.floor(Math.random() * height)
		console.log(ratPosition)
	} else {
		snakePositions.pop()
	}
	gameScore.innerText = 'Score ' + (snakePositions.length - 3)
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

function changeColor() {
		if (document.body.classList.contains('darkMode')) {document.body.classList.remove('darkMode')
 } 
 
 else {
 
  document.body.classList.add('darkMode')
	} 
}
