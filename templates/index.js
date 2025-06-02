let secretNumber = '';
let guessLength = 4;

function generateSecretNumber(length) {
  let digits = [];
  while (digits.length < length) {
    let digit = Math.floor(Math.random() * 10).toString();
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join('');
}

function createGuessInputs(length) {
  const guessRow = document.getElementById('guessRow');
  guessRow.innerHTML = '';
  for (let i = 0; i < length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.className = 'digit-input';
    guessRow.appendChild(input);
  }
}

function addGuessToHistory(guess) {
  const table = document.getElementById('guessDisplayTable');
  const row = document.createElement('div');
  row.className = 'guess-history-row';

  for (let i = 0; i < guess.length; i++) {
    const cell = document.createElement('div');
    cell.className = 'guess-history-cell';
    cell.textContent = guess[i];
    if (guess[i] === secretNumber[i]) {
      cell.classList.add('correct');
    }

    row.appendChild(cell);
  }

  table.appendChild(row);

  if (guess === secretNumber) {
    setTimeout(() => {
      alert('🎉 Поздравляем! Вы угадали число!');
    }, 100);
  }
}

document.getElementById('start').addEventListener('click', () => {
  const lengthInput = document.getElementById('lengthInput');
  guessLength = parseInt(lengthInput.value);

  if (isNaN(guessLength) || guessLength < 4 || guessLength > 7) {
    alert('Введите число от 4 до 7');
    return;
  }

  secretNumber = generateSecretNumber(guessLength);
  document.getElementById('gameArea').classList.remove('hidden');
  document.getElementById('guessSection').classList.remove('hidden');
  document.getElementById('guessDisplayTable').innerHTML = '';
  createGuessInputs(guessLength);
});

document.getElementById('submitGuess').addEventListener('click', () => {
  const inputs = document.querySelectorAll('#guessRow input');
  const guess = Array.from(inputs).map(input => input.value.trim()).join('');

  if (guess.length !== guessLength || !/^\d+$/.test(guess)) {
    alert('Введите корректное число полностью');
    return;
  }

  addGuessToHistory(guess);
  createGuessInputs(guessLength);
});

