import Grid from './components/Grid/Grid';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Tic Tac Toe</h1>
      <Grid numberOfCards={9} />
    </div>
  );
};
export default App;
