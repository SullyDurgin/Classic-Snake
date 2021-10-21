/*-------------------------------- Constants --------------------------------*/

/*---------------------------- letiables (state) ----------------------------*/
let snakePositions = []
let direction
let ratPosition = { x: 13, y: 13 }
let userInputs = []
let intervalTime = 0
let interval = 0
let score
let width = 20
let height = 20
let highScore = parseInt(localStorage.getItem('highScore') || 0)
const gameOverSound = new Audio ("../audio/gameover.mp3")
const eatRatSound = new Audio ("../audio/nomnoise.mp3")



/*------------------------ Cached Element References ------------------------*/

const gameBoard = document.querySelector('.game-board')
const gameStatus = document.querySelector('#message')
const gameButton = document.querySelector('#start')
const gameScore = document.querySelector('#score')
const gameHighScore = document.querySelector('#highscore')
const colorButton = document.querySelector('#color')
const spaceStart = document.querySelector('#space-start')

/*----------------------------- Event Listeners -----------------------------*/
gameButton.addEventListener('click', startGame)
colorButton.addEventListener('click', changeColor)

window.addEventListener('keydown', function (event) {
	if (
		!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(
			event.key
		)
	)
		return

	if (event.key === ' ') {
		startGame()
		return
	}

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

//mobile keys

document.getElementById('up').addEventListener('click', function () {
	direction = 'up'
})
document.getElementById('down').addEventListener('click', function () {
	direction = 'down'
})
document.getElementById('left').addEventListener('click', function () {
	direction = 'left'
})
document.getElementById('right').addEventListener('click', function () {
	direction = 'right'
})

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
	gameScore.innerText = '🐀 Score:'
	gameHighScore.innerText = '🏆 High Score: ' + highScore
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
		snakeCell.style.backgroundColor = 'var(--snake-color)' //makes current snake show up
	}
	const ratCellIndex = ratPosition.x + width * ratPosition.y
	const ratCell = cells[ratCellIndex]
	ratCell.innerText = '🐀'
}

function startGame() {
	spaceStart.innerText = ''
	gameStatus.innerText = ''
	clearInterval(interval) //stops from starting multiple timers
	snakePositions = [
		{ x: 6, y: 0 },
		{ x: 7, y: 0 },
		{ x: 8, y: 0 },
	]
	direction = 'down'
	intervalTime = 300
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
			eatRatSound.volume = 0.5
			eatRatSound.play()
		snakePositions.splice(0, 1, { x: newHeadX, y: newHeadY })
		ratPosition.x = Math.floor(Math.random() * width)
		ratPosition.y = Math.floor(Math.random() * height)
	} else {
		snakePositions.pop()
	}
	const score = snakePositions.length - 3
	gameScore.innerText = '🐀 Score: ' + score
	gameHighScore.innerText = '🏆 High Score: ' + highScore
	if (score > highScore) {
		//Whenever your score increases, compare it with the highScore variable, and if it's larger, both update that variable (so it can continue to rise) and update storage
		highScore = score
		localStorage.setItem('highScore', score)
	}
	render()
}

function hitSelf(x, y) {
	for (let i = 1; i < snakePositions.length; i++) {
		if (x == snakePositions[i].x && y == snakePositions[i].y) return true
	}
	return false
}

function gameOver() {
	gameOverSound.volume = 0.3
	gameOverSound.play()
	gameStatus.innerText = 'Game Over'
	spaceStart.innerText = 'Hit Space Bar to Restart'
	clearInterval(interval)
	render()
}

function hitBorder(x, y) {
	if (x < 0 || x > 19 || y < 0 || y > 19) return true
	return false
}

function changeColor() {
	if (document.body.classList.contains('darkMode')) {
		document.body.classList.remove('darkMode')
	} else {
		document.body.classList.add('darkMode')
	}
}
