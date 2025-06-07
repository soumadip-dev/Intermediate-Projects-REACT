// APP:
import Grid from './components/Grid/Grid';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 font-mono tracking-tighter mb-2">
          TIC TAC TOE
        </h1>
        <div className="w-24 h-1 bg-indigo-400 mx-auto rounded-full"></div>
      </div>
      <Grid numberOfCards={9} />
    </div>
  );
};
export default App;
