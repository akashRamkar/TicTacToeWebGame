const player1Win = 3;
const player2Win = 0;
const player1 = "X";
const player2 = "O";
const info = document.querySelector("[current-player]");
const cells = document.querySelectorAll(".cell");
const cell1 = document.querySelector("[cell1]");
const cell2 = document.querySelector("[cell2]");
const cell3 = document.querySelector("[cell3]");
const cell4 = document.querySelector("[cell4]");
const cell5 = document.querySelector("[cell5]");
const cell6 = document.querySelector("[cell6]");
const cell7 = document.querySelector("[cell7]");
const cell8 = document.querySelector("[cell8]");
const cell9 = document.querySelector("[cell9]");
const newGameBtn = document.querySelector(".btn");
const board = document.querySelector(".bg-board");

let currentPlayer = "";
const defaultPlayer = "X";

const winningPositions = [
	// horizontals
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	//verticals
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// diagonals
	[0, 4, 8],
	[2, 4, 6],
];
let Cells;
let winningCells = [];
initGame();
function initGame() {
	currentPlayer = defaultPlayer;
	Cells = ["", "", "", "", "", "", "", "", ""];
	cells.forEach((box) => {
		if (box.classList.contains("win")) {
			box.classList.remove("win");
		}
	});
	info.innerText = `Current Player-${currentPlayer}`;
}

cells.forEach((cell, index) => {
	cell.addEventListener("click", () => {
		handleClick(index);
	});
});

function handleClick(index) {
	if (Cells[index] === "") {
		Cells[index] = currentPlayer;
		//handles Ui
		displayUi(index);
		checkGameOver();
		flipPlayer();
	}
}
function markWin(set) {
	if (set === null || set.length < 3) {
		console.log("No WINNIG SET");
	} else {
		set.forEach((val, index) => {
			// console.log(val);
			cells[val].classList.add("win");
		});
	}
}

function checkGameOver() {
	let winner = "";
	winningPositions.forEach((set) => {
		if (
			Cells[set[0]] !== "" &&
			Cells[set[1]] !== "" &&
			Cells[set[2]] !== "" &&
			Cells[set[0]] === Cells[set[1]] &&
			Cells[set[1]] === Cells[set[2]]
		) {
			//we have a winner
			if (set[0] === player1) {
				winner = player1;
			} else {
				winner = player2;
			}

			//mark green
			cells[set[0]].classList.add("win");

			cells[set[1]].classList.add("win");
			cells[set[2]].classList.add("win");
			cells.forEach((box) => {
				box.style.pointerEvents = "none";
			});
			newGameBtn.classList.add("active");
			return;
		}
	});
	let fillCount = 0;
	Cells.forEach((cell) => {
		if (cell !== "") {
			fillCount++;
		}
	});
	if (fillCount === 9) {
		// i.e game is tie
		info.innerText = `Game Tie`;
	}
}

function checkWin(currentPlayer) {
	let win = false;
	winningPositions.forEach((set, index) => {
		set.forEach((val, i) => {
			if (Cells[val] !== "" && Cells[val] == currentPlayer) {
				winningCells.push(val);
				win = true;
				// if (winningPositions.length === 3) {
				// 	return true;
				// }
			} else {
				win = false;
				winningCells = [];
			}
		});
		if (win) {
			return true;
		}
	});

	return false;

	// return win;
}

function displayUi(index) {
	cells[index].innerText = currentPlayer;
	// cells.[index].
}
function updatePlayerInfo(player) {
	info.innerText = `Next Player - ${player}`;
}

function flipPlayer() {
	if (currentPlayer === player1) {
		currentPlayer = player2;
	} else {
		currentPlayer = player1;
	}

	updatePlayerInfo(currentPlayer);
}

newGameBtn.addEventListener("click", () => {
	currentPlayer = "";
	cells.forEach((box, index) => {
		displayUi(index);
	});
	newGameBtn.classList.remove("active");
	initGame();
	cells.forEach((box) => {
		box.style.pointerEvents = "inherit";
	});
});
