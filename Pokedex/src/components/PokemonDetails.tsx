import { useParams, Link } from 'react-router-dom';
import SimilarPokemon from './SimilerPokemon';
import usePokemonDetails from '../hooks/usePokemonDetails';

const PokemonDetails = () => {
  const { id } = useParams();

  const { pokemon, captureRate, isLoading, error, statNames } = usePokemonDetails({ id: id || 0 });
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-yellow-50 p-4 md:p-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-lg hover:from-blue-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Pokédex
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 border-r-red-500 border-l-blue-500"></div>
          <span className="text-lg font-medium bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Loading Pokémon...
          </span>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      ) : pokemon ? (
        <>
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent capitalize">
                {pokemon.name}
              </h1>
              <p className="text-2xl text-gray-600 mt-2">
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Image */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-300 flex flex-col items-center">
                  <div className="w-full aspect-square flex items-center justify-center">
                    {pokemon.image ? (
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                        style={{ maxHeight: '400px' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 via-blue-100 to-yellow-100 text-gray-500 rounded-lg">
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
                </div>

                {/* Types */}
                <div className="w-full max-w-md mt-6 bg-white rounded-xl p-6 shadow-lg border-2 border-blue-300">
                  <h2 className="text-2xl font-bold text-gray-700 mb-4">Types</h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    {pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-red-400 to-yellow-400 text-white font-bold text-lg capitalize shadow-md"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column - Stats */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-300 h-full">
                  <h2 className="text-2xl font-bold text-gray-700 mb-6">Base Stats</h2>
                  <div className="space-y-4">
                    {pokemon.stats.map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-700 capitalize">
                            {statNames[stat.stat.name] || stat.stat.name}
                          </span>
                          <span className="font-bold">{stat.base_stat}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-yellow-500 h-4 rounded-full"
                            style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Height and Weight */}
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg shadow-inner">
                      <h3 className="text-lg font-semibold text-gray-600 mb-1">Height</h3>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
                        {(pokemon.height / 10).toFixed(1)} m
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-yellow-50 p-4 rounded-lg shadow-inner">
                      <h3 className="text-lg font-semibold text-gray-600 mb-1">Weight</h3>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
                        {(pokemon.weight / 10).toFixed(1)} kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Abilities */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-300 h-full">
                  <h2 className="text-2xl font-bold text-gray-700 mb-6">Abilities</h2>
                  <ul className="space-y-3">
                    {pokemon.abilities.map((ability, index) => (
                      <li
                        key={index}
                        className={`p-3 rounded-lg ${
                          ability.is_hidden
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100'
                            : 'bg-gradient-to-r from-blue-50 to-yellow-50'
                        } shadow-md`}
                      >
                        <div className="flex items-center">
                          <span
                            className={`w-3 h-3 rounded-full mr-3 ${
                              ability.is_hidden
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                : 'bg-gradient-to-r from-blue-500 to-yellow-500'
                            }`}
                          ></span>
                          <span className="text-lg font-medium capitalize">
                            {ability.ability.name}
                            {ability.is_hidden && (
                              <span className="ml-2 px-2 py-1 text-xs bg-purple-500 text-white rounded-full">
                                Hidden
                              </span>
                            )}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Additional Info Section */}
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Pokémon Data</h2>
                    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-yellow-50 p-4 rounded-lg shadow-inner">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500">Height</h3>
                          <p className="text-lg font-medium">
                            {(pokemon.height / 10).toFixed(1)} m
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500">Weight</h3>
                          <p className="text-lg font-medium">
                            {(pokemon.weight / 10).toFixed(1)} kg
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500">Base Experience</h3>
                          <p className="text-lg font-medium">
                            {pokemon.base_experience || 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500">Capture Rate</h3>
                          <p className="text-lg font-medium">
                            {captureRate !== null ? captureRate : 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SimilarPokemon typeName={pokemon.types[0].type.name} currentPokemonId={pokemon.id} />
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">No Pokémon data found</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
