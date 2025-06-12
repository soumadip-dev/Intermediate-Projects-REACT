import usePokemonDetails from '../hooks/usePokemonDetails';
import { Link } from 'react-router-dom';

const SearchedPokemon = ({ name }: { name: string }) => {
  const { pokemon, isLoading, error } = usePokemonDetails({ name });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-300 h-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500 border-r-red-500 border-l-blue-500"></div>
          <span className="text-md font-medium bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-red-300 h-full flex items-center justify-center">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="mt-2 text-red-500 font-medium">No Pokémon found</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="block bg-white rounded-xl p-4 shadow-lg border-2 border-yellow-300 hover:border-blue-300 transition-all h-full transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-gray-600 font-medium">#{pokemon.id.toString().padStart(3, '0')}</span>
        <div className="flex space-x-2">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-red-400 to-yellow-400 text-white font-bold capitalize shadow-sm"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center p-4">
        {pokemon.image ? (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-red-100 via-blue-100 to-yellow-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-500"
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

      <h3 className="text-center font-bold text-lg capitalize mt-2 bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
        {pokemon.name}
      </h3>
    </Link>
  );
};

export default SearchedPokemon;
