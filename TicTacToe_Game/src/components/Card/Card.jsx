import Icon from '../Icon/Icon';

const Card = ({ iconName }) => {
  return (
    <div
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
      <Icon name={iconName} />
    </div>
  );
};
export default Card;
