import { useState } from 'react';
import Card from '../Card/Card';
import isWinner from '../Helper/isWinner';

const Grid = ({ numberOfCards }) => {
  const [turn, setTurn] = useState(true);
  const [board, setBoard] = useState(Array(numberOfCards).fill(''));
  const [winner, setWinner] = useState('');
  const [draw, setDraw] = useState('');

  const play = index => {
    // Prevent moves if game already ended
    if (winner || draw || board[index] !== '') return;

    // Make move
    const newBoard = [...board];
    newBoard[index] = turn ? 'O' : 'X';

    // Check winner first
    const currentWinner = isWinner(newBoard, turn ? 'O' : 'X');
    if (currentWinner) {
      setWinner(currentWinner);
      setBoard(newBoard);
      return;
    }

    // Then check for draw (only if no winner)
    if (newBoard.every(cell => cell !== '')) {
      setDraw(true);
    }

    // Update board and turn
    setBoard(newBoard);
    setTurn(!turn);
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <div className="text-center space-y-1">
        {winner ? (
          <div className="animate-pulse">
            <p className="text-sm font-medium text-gray-500">Victory!</p>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
              Player {winner} Wins!
            </h2>
          </div>
        ) : draw ? (
          <div className="animate-pulse">
            <p className="text-sm font-medium text-gray-500">Draw!</p>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
              It's a Draw!
            </h2>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-500">Current turn</p>
            <h2 className={`text-3xl font-bold ${turn ? 'text-blue-500' : 'text-rose-500'}`}>
              {turn ? 'O' : 'X'}
            </h2>
          </>
        )}
      </div>

      <div className="w-full grid grid-cols-3 gap-3 p-4 bg-gray-100/50 rounded-2xl shadow-inner border border-gray-200/50">
        {board.map((value, index) => (
          <Card
            key={index}
            index={index}
            onPlay={play}
            player={value}
            gameOver={winner || draw ? true : false}
          />
        ))}
      </div>

      {(winner || draw) && (
        <button
          onClick={() => {
            setBoard(Array(numberOfCards).fill(''));
            setWinner('');
            setTurn(true);
            setDraw('');
          }}
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-full shadow-md transition-colors duration-200"
        >
          Play Again
        </button>
      )}
    </div>
  );
};
export default Grid;
