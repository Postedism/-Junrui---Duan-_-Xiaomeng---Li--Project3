/**
 * Fisher-Yates Algorithm
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

class SudokuGenerator {
    constructor(size) {
        this.size = size;
        this.board = Array(size).fill(0).map(() => Array(size).fill(null));

        if (size === 9) {
            this.subgridRows = 3;
            this.subgridCols = 3;
            this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        } else if (size === 6) {
            this.subgridRows = 2; 
            this.subgridCols = 3; 
            this.numbers = [1, 2, 3, 4, 5, 6];
        } else {
            throw new Error("Wrong Size");
        }
    }

    findEmptyCell() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.board[r][c] === null) {
                    return [r, c];
                }
            }
        }
        return null; 
    }

    isSafe(row, col, num) {
        for (let c = 0; c < this.size; c++) {
            if (this.board[row][c] === num) return false;
        }
        for (let r = 0; r < this.size; r++) {
            if (this.board[r][col] === num) return false;
        }
        const startRow = row - (row % this.subgridRows);
        const startCol = col - (col % this.subgridCols);
        for (let r = 0; r < this.subgridRows; r++) {
            for (let c = 0; c < this.subgridCols; c++) {
                if (this.board[startRow + r][startCol + c] === num) return false;
            }
        }
        return true;
    }

    fillBoard() {
        const emptyCell = this.findEmptyCell();
        if (!emptyCell) return true;
        const [row, col] = emptyCell;
        const randomNumbers = shuffle([...this.numbers]);

        for (const num of randomNumbers) {
            if (this.isSafe(row, col, num)) {
                this.board[row][col] = num;
                if (this.fillBoard()) return true; 
                this.board[row][col] = null;
            }
        }
        return false;
    }

    removeCells(cellsToKeep) {
        let cellsToRemove = (this.size * this.size) - cellsToKeep;
        while (cellsToRemove > 0) {
            const row = Math.floor(Math.random() * this.size);
            const col = Math.floor(Math.random() * this.size);
            if (this.board[row][col] !== null) {
                this.board[row][col] = null;
                cellsToRemove--;
            }
        }
    }

    generate(cellsToKeep) {
        this.board = Array(this.size).fill(0).map(() => Array(this.size).fill(null));
        this.fillBoard();
        const solution = this.board.map(row => [...row]);
        this.removeCells(cellsToKeep);
        const puzzle = this.board.map(row => row.map(cell => (cell === null ? 0 : cell)));
        
        return { puzzle, solution };
    }
}

export default SudokuGenerator;