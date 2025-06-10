import { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

interface Pokemon {
  name: string;
  image: string;
  types: PokemonType[];
  id: number;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonSummary {
  name: string;
  url: string;
}

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch Initial list of pokemons
        const listResponse = await axios.get<{ results: PokemonSummary[] }>(
          'https://pokeapi.co/api/v2/pokemon'
        );
        const pokemonSummaries = listResponse.data.results;

        // Fetch detailed data for each pokemon in parallel
        const pokemonDetails = pokemonSummaries.map((pokemon: { url: string }) =>
          axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonDetails);

        // Extracted data from response
        const extractedData: Pokemon[] = pokemonData.map(pokemon => {
          return {
            id: pokemon.data.id,
            name: pokemon.data.name,
            image: pokemon.data.sprites.other
              ? pokemon.data.sprites.other.dream_world.front_default
              : pokemon.data.sprites.front_shiny,
            types: pokemon.data.types,
          };
        });
        console.log(extractedData);

        // Update state once with all data
        setPokemons(extractedData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch Pokemons');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  return (
    <div className="h-[calc(100%-120px)] overflow-y-auto pb-8">
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 border-r-red-500 border-l-blue-500"></div>
          <span className="text-lg font-medium bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Loading Pokémons...
          </span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md">
          {/* ... (keep error display the same) */}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemons.map(({ name, image, id }) => (
          <Pokemon name={name} image={image} key={id} />
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg hover:from-red-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
          Previous
        </button>
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-lg hover:from-blue-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
          Next
        </button>
      </div>
    </div>
  );
};
export default PokemonList;
