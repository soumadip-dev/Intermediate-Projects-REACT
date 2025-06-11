import { Link } from 'react-router-dom';
const Pokemon = ({ name, image, id }: { name: string; image: string; id: number }) => {
  return (
    <Link
      className="rounded-xl overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border-2 border-yellow-300"
      to={`/pokemon/${id}`}
    >
      <div className="p-4 bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500">
        <h3 className="text-xl font-bold text-center text-white capitalize truncate drop-shadow-md">
          {name}
        </h3>
      </div>
      <div className="flex justify-center p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-yellow-50">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-red-100 via-blue-100 to-yellow-100 text-gray-500 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
};
export default Pokemon;
