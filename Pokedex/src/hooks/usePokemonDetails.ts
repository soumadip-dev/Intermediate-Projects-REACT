import axios from 'axios';
import { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  image: string;
  types: PokemonType[];
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  id: number;
  stats: PokemonStat[];
  base_experience: number;
  species: {
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonSpecies {
  capture_rate: number;
}

const fetchAllPokemonNames = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1300');
    return response.data.results.map((p: { name: string }) => p.name.toLowerCase());
  } catch (error) {
    console.error('Failed to fetch Pokémon list:', error);
    return [];
  }
};

const usePokemonDetails = (identifier: { id?: string | number; name?: string }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [captureRate, setCaptureRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!identifier.id && !identifier.name) {
        setError('Either id or name must be provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Construct the URL based on what's provided
        const link = `https://pokeapi.co/api/v2/pokemon/${identifier.name ?? identifier.id}/`;

        // Fetch Pokémon data
        const response = await axios.get(link);

        // Fetch species data for capture rate
        const speciesResponse = await axios.get(response.data.species.url);

        setPokemon({
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.other
            ? response.data.sprites.other.dream_world.front_default ||
              response.data.sprites.other['official-artwork'].front_default
            : response.data.sprites.front_shiny,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities,
          types: response.data.types,
          stats: response.data.stats,
          base_experience: response.data.base_experience,
          species: response.data.species,
        });

        setCaptureRate(speciesResponse.data.capture_rate);
      } catch (error) {
        setError('Failed to fetch Pokémon data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [identifier.id, identifier.name]);

  const statNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };

  return { pokemon, captureRate, isLoading, error, statNames };
};

export default usePokemonDetails;
