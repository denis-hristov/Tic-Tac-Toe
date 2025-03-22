import { useState } from 'react'
import './App.css'

function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [move, setMove] = useState(0)
    
    function handleClick(index) {
        if (board[index] || checkWinner(board)) return; // Не позволява презаписване или игра след победа

        const newBoard = [...board];
        newBoard[index] = move % 2 === 0 ? "X" : "O"; // Редуване на X и O
        setBoard(newBoard);
        setMove(move + 1);
    }

    function checkWinner(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Хоризонтални
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикални
            [0, 4, 8], [2, 4, 6] // Диагонални
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    function resetGame() {
        setBoard(Array(9).fill(null));
        setMove(0);
    }

    const winner = checkWinner(board);
    
    return (
        <>
            <div className="TicTacToe">
                <h1>Tic-Tac-Toe</h1>
                {winner ? <h2>Winner: {winner}</h2> : <h2>Go: {move % 2 === 0 ? "X" : "O"}</h2>}
                <h2 className='board'>
                    {board.map((cell, index) => (
                    <button key={index} onClick={() => handleClick(index)}>{cell}</button>
                ))}
                </h2>
                
                <button className="reset" onClick={resetGame}>Рестарт</button>
            </div>
        </>
    )
}   

export default App
