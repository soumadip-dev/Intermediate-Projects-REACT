import { Route, Routes } from 'react-router-dom';
import Pokedex from '../components/Pokedex';
import PokemonDetails from '../components/PokemonDetails';
import NotFound from '../components/NotFound';
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
