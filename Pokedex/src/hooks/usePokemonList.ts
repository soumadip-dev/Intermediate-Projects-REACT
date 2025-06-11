import axios from 'axios';
import { useEffect, useState } from 'react';

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
const usePokemonList = () => {
  const [pokemonStates, setPokemonStates] = useState<AllStates>({
    pokemons: [],
    isLoading: true,
    error: null,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: null,
    prevUrl: null,
  });

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

  useEffect(() => {
    fetchPokemons();
  }, [pokemonStates.pokedexUrl]);

  return { pokemonStates, setPokemonStates };
};
export default usePokemonList;
