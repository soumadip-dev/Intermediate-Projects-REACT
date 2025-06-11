import { Link } from 'react-router-dom';
import { type PokemonType } from './PokemonDetails';
import usePokemonList from '../hooks/usePokemonList';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
}

interface SimilarPokemonsProps {
  typeName: string | undefined;
  currentPokemonId: number | undefined;
}

const SimilarPokemon = ({ typeName, currentPokemonId }: SimilarPokemonsProps) => {
  const { pokemonStates } = usePokemonList(
    typeName ? `https://pokeapi.co/api/v2/type/${typeName}` : '',
    !!typeName
  );

  return (
    <div>
      {pokemonStates.pokemons.length > 0 && (
        <div className="max-w-7xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Other {typeName} Type Pokémons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {pokemonStates.pokemons
              .filter(p => p.id !== currentPokemonId) // Exclude the current Pokémon
              .map(({ name, image, id }) => (
                <Link to={`/pokemon/${id}`} key={id}>
                  <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                    <img src={image} alt={name} className="w-full h-32 object-contain" />
                    <h3 className="text-center font-medium capitalize mt-2">{name}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarPokemon;
