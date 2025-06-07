import { useState } from 'react';
import Card from '../Card/Card';

const Grid = ({ numberOfCards }) => {
  const [turn, setTurn] = useState(true); // true = circle, false = cross
  const [board, setBoard] = useState(Array(numberOfCards).fill(''));

  const play = index => {
    if (turn === true) {
      board[index] = 'O';
    } else {
      board[index] = 'X';
    }
    setBoard([...board]);
    setTurn(!turn);
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Current Turn:
        <span className="ml-2 text-red-950">{turn ? 'O' : 'X'}</span>
      </h1>
      <div
        className="
      grid grid-cols-3 gap-2 md:gap-4 
      bg-gray-800 p-2 md:p-4 
      rounded-lg
      shadow-xl
    "
      >
        {board.map((value, index) => (
          <Card key={index} index={index} onPlay={play} player={value} />
        ))}
      </div>
    </>
  );
};
export default Grid;
