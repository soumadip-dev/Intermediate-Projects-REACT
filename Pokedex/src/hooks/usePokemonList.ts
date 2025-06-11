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

interface TypePokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

interface TypeResponse {
  pokemon: TypePokemon[];
}

interface AllStates {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  currentUrl: string;
  nextUrl: string | null;
  prevUrl: string | null;
}

const usePokemonList = (initialUrl: string, type: boolean) => {
  const [state, setState] = useState<AllStates>({
    pokemons: [],
    isLoading: true,
    error: null,
    currentUrl: initialUrl,
    nextUrl: null,
    prevUrl: null,
  });

  const fetchPokemons = async (url: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      if (type) {
        const typeResponse = await axios.get<TypeResponse>(url);
        const pokemonSummaries = typeResponse.data.pokemon.slice(0, 5).map(p => p.pokemon);

        const pokemonDetails = pokemonSummaries.map(pokemon => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonDetails);

        setState({
          pokemons: pokemonData.map(p => ({
            id: p.data.id,
            name: p.data.name,
            image: p.data.sprites.other?.dream_world.front_default || p.data.sprites.front_shiny,
            types: p.data.types,
          })),
          isLoading: false,
          error: null,
          currentUrl: url,
          nextUrl: null,
          prevUrl: null,
        });
      } else {
        const listResponse = await axios.get<PokemonListResponse>(url);
        const pokemonDetails = await axios.all(
          listResponse.data.results.map(p => axios.get(p.url))
        );

        setState({
          pokemons: pokemonDetails.map(p => ({
            id: p.data.id,
            name: p.data.name,
            image: p.data.sprites.other?.dream_world.front_default || p.data.sprites.front_shiny,
            types: p.data.types,
          })),
          isLoading: false,
          error: null,
          currentUrl: url,
          nextUrl: listResponse.data.next,
          prevUrl: listResponse.data.previous,
        });
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch Pokemons',
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchPokemons(initialUrl);
  }, [initialUrl, type]);

  const setUrl = (newUrl: string) => {
    fetchPokemons(newUrl);
  };

  return {
    pokemonStates: state,
    setPokemonUrl: setUrl,
  };
};

export default usePokemonList;
