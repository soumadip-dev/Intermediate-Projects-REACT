// Card:
import Icon from '../Icon/Icon';

const Card = ({ onPlay, player, index, gameOver }) => {
  let icon = <Icon />;
  if (player === 'O') {
    icon = <Icon name="circle" />;
  } else if (player === 'X') {
    icon = <Icon name="cross" />;
  }
  return (
    <div
      onClick={() => !gameOver && player === '' && onPlay(index)}
      className="
        aspect-square w-full
        flex justify-center items-center
        bg-white/90 hover:bg-white
        border-2 border-gray-300 hover:border-indigo-300
        rounded-xl
        cursor-pointer transition-all duration-150
        text-6xl font-light
        shadow-sm hover:shadow-md
        active:scale-[0.98]
        group
      "
    >
      <span
        className={`
        ${player === 'O' ? 'text-blue-500 group-hover:text-blue-600' : ''}
        ${player === 'X' ? 'text-rose-500 group-hover:text-rose-600' : ''}
        transition-colors duration-200
      `}
      >
        {icon}
      </span>
    </div>
  );
};
export default Card;
