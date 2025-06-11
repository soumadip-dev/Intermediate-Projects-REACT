import { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';

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

interface PokemonListResponse {
  results: PokemonSummary[];
  next: string | null;
  previous: string | null;
}

interface AllStates {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  pokedexUrl: string;
  nextUrl: string | null;
  prevUrl: string | null;
}

const PokemonList = () => {
  const [pokemonStates, setPokemonStates] = useState<AllStates>({
    pokemons: [],
    isLoading: true,
    error: null,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: null,
    prevUrl: null,
  });

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setPokemonStates(prev => ({ ...prev, isLoading: true, error: null }));

        const listResponse = await axios.get<PokemonListResponse>(pokemonStates.pokedexUrl);
        const pokemonSummaries = listResponse.data.results;

        // Combine state updates
        setPokemonStates(prev => ({
          ...prev,
          nextUrl: listResponse.data.next,
          prevUrl: listResponse.data.previous,
        }));

        const pokemonDetails = pokemonSummaries.map((pokemon: { url: string }) =>
          axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonDetails);

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

        setPokemonStates(prev => ({
          ...prev,
          pokemons: extractedData,
          isLoading: false,
        }));
      } catch (error) {
        setPokemonStates(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to fetch Pokemons',
          isLoading: false,
        }));
      }
    };
    fetchPokemons();
  }, [pokemonStates.pokedexUrl]);

  return (
    <div className="h-[calc(100%-120px)] overflow-y-auto pb-8">
      {pokemonStates.isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 border-r-red-500 border-l-blue-500"></div>
          <span className="text-lg font-medium bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Loading Pokémons...
          </span>
        </div>
      ) : pokemonStates.error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md">
          <p className="font-bold">Error:</p>
          <p>{pokemonStates.error}</p>
        </div>
      ) : pokemonStates.pokemons.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {pokemonStates.pokemons.map(({ name, image, id }) => (
              <Pokemon name={name} image={image} key={id} id={id} />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            {pokemonStates.prevUrl && (
              <button
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg hover:from-red-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() =>
                  setPokemonStates({ ...pokemonStates, pokedexUrl: pokemonStates.prevUrl! })
                }
              >
                Previous
              </button>
            )}
            {pokemonStates.nextUrl && (
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-lg hover:from-blue-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() =>
                  setPokemonStates({ ...pokemonStates, pokedexUrl: pokemonStates.nextUrl! })
                }
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">No Pokémon found</p>
        </div>
      )}
    </div>
  );
};
export default PokemonList;
