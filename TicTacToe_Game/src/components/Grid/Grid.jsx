import Card from '../Card/Card';

const Grid = ({ numberOfCards }) => {
  return (
    <div
      className="
      grid grid-cols-3 gap-2 md:gap-4 
      bg-gray-800 p-2 md:p-4 
      rounded-lg
      shadow-xl
    "
    >
      {Array(numberOfCards)
        .fill(null)
        .map((el, index) => (
          <Card key={index} />
        ))}
    </div>
  );
};
export default Grid;
