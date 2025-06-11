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
const usePokemonDetails = ({ id }: { id: string | number }) => {
  const link = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [captureRate, setCaptureRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
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
        console.error('Error fetching Pokémon data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load Pokémon details');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [link]);

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
