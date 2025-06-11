import { Route, Routes } from 'react-router-dom';
import Pokedex from '../components/Pokedex/Pokedex';
import PokemonDetails from '../components/PokemonDetails/PokemonDetails';
import NotFound from '../components/NotFound/NotFound';
const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default CustomRoutes;
