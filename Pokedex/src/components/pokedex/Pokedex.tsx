import PokemonList from '../pokemonList/PokemonList';
import Search from '../search/Search';

const Pokedex = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="w-full h-full p-4">
        <div className="bg-white rounded-3xl shadow-xl h-full min-h-[calc(100vh-2rem)] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800">Pokédex</h1>
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-md">
              <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300"></div>
            </div>
          </div>
          <Search />
          <PokemonList />
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
