import Icon from '../Icon/Icon';

const Card = ({ onPlay, player, index }) => {
  let icon = <Icon />;
  if (player === 'O') {
    icon = <Icon name="circle" />;
  } else if (player === 'X') {
    icon = <Icon name="cross" />;
  }
  return (
    <div
      onClick={() => onPlay(index)}
      className="
      border-2 border-gray-800 
      flex justify-center items-center 
      w-24 h-24 md:w-32 md:h-32 
      bg-white hover:bg-gray-50 
      cursor-pointer transition-colors
      text-4xl font-bold
      shadow-md
    "
    >
      {icon}
    </div>
  );
};
export default Card;
