const board = document.getElementById('board');
        const message = document.getElementById('message');
        const resetButton = document.getElementById('reset');

        let currentPlayer = 'X';
        let gameActive = true;
        let gameState = Array(9).fill('');

        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function checkWin() {
            for (const pattern of winningPatterns) {
                const [a, b, c] = pattern;
                if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    return true;
                }
            }
            return false;
        }

        function checkDraw() {
            return gameState.every(cell => cell !== '');
        }

        function handleCellClick(e) {
            const cell = e.target;
            const cellIndex = Array.from(board.children).indexOf(cell);

            if (gameState[cellIndex] || !gameActive) return;

            gameState[cellIndex] = currentPlayer;
            cell.innerHTML = `<span>${currentPlayer}</span>`;
            cell.classList.add('taken');

            if (checkWin()) {
                message.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                return;
            }

            if (checkDraw()) {
                message.textContent = 'It\'s a draw!';
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}\'s turn`;
        }

        function resetGame() {
            currentPlayer = 'X';
            gameActive = true;
            gameState = Array(9).fill('');
            message.textContent = "Player X\'s turn";
            board.innerHTML = '';
            createBoard();
        }

        function createBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }

        resetButton.addEventListener('click', resetGame);

        createBoard();