import { useState } from 'react';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Navber>
        <Search />
        <NumResult movies={movies} />
      </Navber>
      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </div>
  );
}

function Navber({ children }) {
  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm h-20 p-0 px-8 grid grid-cols-3 items-center shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-3xl text-amber-400" role="img">
        🍿
      </span>
      <h1 className="text-2xl font-bold text-amber-400 tracking-tight">
        <span className="text-white">use</span>Popcorn
      </h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState('');
  return (
    <input
      className="justify-self-center bg-gray-800/70 border border-gray-700 py-2.5 px-5 text-base rounded-full w-full max-w-2xl transition-all duration-300 text-white shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent hover:bg-gray-800/90"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}

function NumResult({ movies }) {
  return (
    <p className="justify-self-end text-base text-gray-300 font-medium">
      Found <strong className="text-amber-400">{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return (
    <main className="mt-8 h-[calc(100vh-7.2rem-3*2.4rem)] flex gap-8 justify-center px-8">
      {children}
    </main>
  );
}

function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl relative border border-gray-700">
      <button
        className="absolute top-3 right-3 h-7 w-7 rounded-full border-none bg-amber-400/10 text-amber-400 text-base font-bold cursor-pointer z-50 hover:bg-amber-400/20 transition-all shadow-sm flex items-center justify-center backdrop-blur-sm"
        onClick={() => setIsOpen1(open => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="divide-y divide-gray-700">
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function Movie({ movie }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 text-base items-center p-5 hover:bg-gray-700/50 transition-colors cursor-pointer group">
      <img
        className="w-16 h-20 object-cover rounded-md shadow-lg border border-gray-700 group-hover:border-amber-400/30 transition-colors"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <div>
        <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
          {movie.Title}
        </h3>
        <div className="flex items-center gap-4 mt-1 text-gray-300">
          <span className="flex items-center gap-1.5 text-sm">
            <span className="text-gray-400">🗓</span>
            <span>{movie.Year}</span>
          </span>
        </div>
      </div>
    </li>
  );
}

function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl relative border border-gray-700">
      <button
        className="absolute top-3 right-3 h-7 w-7 rounded-full border-none bg-amber-400/10 text-amber-400 text-base font-bold cursor-pointer z-50 hover:bg-amber-400/20 transition-all shadow-sm flex items-center justify-center backdrop-blur-sm"
        onClick={() => setIsOpen2(open => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatechedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}

function WatechedSummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));
  return (
    <div className="p-5 bg-gray-800/50 border-b border-gray-700">
      <h2 className="uppercase text-xs mb-1 font-bold tracking-wider text-amber-400">
        Movies you watched
      </h2>
      <div className="flex flex-wrap items-center gap-6 text-sm font-semibold mt-3">
        <p className="flex items-center gap-2 text-gray-300">
          <span className="text-gray-400">#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="flex items-center gap-2 text-gray-300">
          <span className="text-yellow-400">⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p className="flex items-center gap-2 text-gray-300">
          <span className="text-amber-300">🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p className="flex items-center gap-2 text-gray-300">
          <span className="text-blue-400">⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="divide-y divide-gray-700 max-h-[calc(100%-9rem)] overflow-auto">
      {watched.map(movie => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 text-base items-center p-5 hover:bg-gray-700/50 transition-colors group">
      <img
        className="w-16 h-20 object-cover rounded-md shadow-lg border border-gray-700 group-hover:border-amber-400/30 transition-colors"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <div>
        <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
          {movie.Title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-300">
          <p className="flex items-center gap-1.5">
            <span className="text-yellow-400">⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-amber-300">🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-blue-400">⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </div>
    </li>
  );
}
