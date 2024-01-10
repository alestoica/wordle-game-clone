const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

// function getWordle () {
//     fetch('http://localhost:8000/word')
//         .then(response => response.json())
//         .then(json => {
//             console.log(json)
//             wordle = json.toUpperCase()
//         })
//         .catch(err => console.log(err));
// }

// getWordle();

const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '«'];

let guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

let wordle = 'POLAR';
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach(function (guessRow, guessRowIndex) {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach(function (guess, guessIndex) {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile');
        rowElement.append(tileElement);
    })
    tileDisplay.append(rowElement);
});

keys.forEach(function (key) {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
});

function handleClick (letter) {
    if (!isGameOver) {
        if (letter === '«') {
            deleteLetter();
            return 0;
        }
        if (letter === 'ENTER') {
            checkRow();
            return 0;
        }
        addLetter(letter);
    }
}

function addLetter (letter) {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
    }
}

function deleteLetter () {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
}

function checkRow () {
    const guess = guessRows[currentRow].join('');
    if (currentTile > 4) {
        flipTile();
        if (wordle === guess) {
            showMessage('Nice :)');
            isGameOver = true;
            return 0;
        } else {
            if (currentRow >= 5) {
                isGameOver = true;
                showMessage('Game Over :(     the wordle was: ' + wordle);
                return 0;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

function showMessage (message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 5000);
}

function flipTile () {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach(function (tile) {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'});
    });

    guess.forEach(function (guess, index) {
        if (guess.letter === wordle[index]) {
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    });

    guess.forEach(function (guess) {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    });

    rowTiles.forEach(function (tile, index) {
        setTimeout(function () {
            tile.classList.add('flip');
            tile.classList.add(guess[index].color);
        }, 500 * index);
    });
}
