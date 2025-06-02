const lengthInput = document.getElementById('lengthInput');
const startBtn = document.getElementById('start');
const gameArea = document.getElementById('gameArea');
const userNumberInput = document.getElementById('userNumberInput');
const submitUser  = document.getElementById('submitUser Number');
const guessInput = document.getElementById('guessInput');
const submitGuessBtn = document.getElementById('submitGuess');
const historyList = document.getElementById('historyList');
const guessDisplay = document.getElementById('guessDisplay');

let userSecretNumber = '';
let computerSecretNumber = '';
let numberLength = 4;

startBtn.addEventListener('click', () => {
    numberLength = parseInt(lengthInput.value, 10);

    if (isNaN(numberLength) || numberLength < 4 || numberLength > 7) {
        alert('Пожалуйста, выберите длину от 4 до 7.');
        return;
    }

    computerSecretNumber = generateSecretNumber(numberLength);
    console.log('Загаданное число компьютера:', computerSecretNumber);

    historyList.innerHTML = '';
    guessDisplay.innerHTML = '';
    userNumberInput.value = '';
    guessInput.value = '';
    gameArea.classList.remove('hidden');

    alert(`Игра началась! Угадайте число компьютера из ${numberLength} цифр. Удачи!`);
    userNumberInput.focus();
});

submitUser.addEventListener('click', () => {
    userSecretNumber = userNumberInput.value.trim();

    if (userSecretNumber.length !== numberLength) {
        alert(`Введите число ровно из ${numberLength} цифр.`);
        return;
    }

    if (!/^\d+$/.test(userSecretNumber)) {
        alert('Введите только цифры.');
        return;
    }

    alert('Вы загадали число! Теперь попробуйте угадать число компьютера.');
    guessInput.focus();
});

submitGuessBtn.addEventListener('click', () => {
    const guess = guessInput.value.trim();

    if (guess.length !== numberLength) {
        alert(`Введите число ровно из ${numberLength} цифр.`);
        return;
    }

    if (!/^\d+$/.test(guess)) {
        alert('Введите только цифры.');
        return;
    }

    displayGuess(guess);

    addGuessToHistory(guess);

    if (guess === computerSecretNumber) {
        alert('Поздравляем! Вы угадали число компьютера! 🎉');
        resetGame();
        return;
    }

    const computerGuess = generateSecretNumber(numberLength);
    alert(`Компьютер пытается угадать: ${computerGuess}`);

    if (computerGuess === userSecretNumber) {
        alert('Компьютер угадал ваше число! 😱');
        resetGame();
        return;
    }

    guessInput.value = '';
    guessInput.focus();
});

function generateSecretNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function displayGuess(guess) {
    guessDisplay.innerHTML = '';
    for (let i = 0; i < guess.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'number-cell';
        cell.textContent = guess[i];
        if (guess[i] === computerSecretNumber[i]) {
            cell.classList.add('correct');
        }

        guessDisplay.appendChild(cell);
    }
}

function addGuessToHistory(guess) {
    const li = document.createElement('li');
    li.textContent = guess;
    historyList.appendChild(li);
}

function resetGame() {
    userSecretNumber = '';
    computerSecretNumber = '';
    historyList.innerHTML = '';
    guessDisplay.innerHTML = '';
    userNumberInput.value = '';
    guessInput.value = '';
    gameArea.classList.add('hidden');
}
