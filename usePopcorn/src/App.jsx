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
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navber />
      <Main />
    </div>
  );
}

function Navber() {
  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 h-28 p-0 px-8 grid grid-cols-3 items-center shadow-xl">
      <Logo />
      <Search />
      <NumResult />
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-4xl" role="img">
        🍿
      </span>
      <h1 className="text-3xl font-bold text-white tracking-tight">usePopcorn</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState('');
  return (
    <input
      className="justify-self-center border-none py-3 px-4 text-lg rounded-full w-full max-w-2xl transition-all duration-300 text-gray-200 bg-purple-600/80 backdrop-blur-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:shadow-lg hover:bg-purple-600/90"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}

function NumResult() {
  return (
    <p className="justify-self-end text-lg text-gray-200 font-medium">
      Found <strong className="text-white">{'X'}</strong> results
    </p>
  );
}

function Main() {
  return (
    <main className="mt-8 h-[calc(100vh-7.2rem-3*2.4rem)] flex gap-8 justify-center px-8">
      <ListBox />
      <WatchedBox />
    </main>
  );
}

function ListBox() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="w-full max-w-2xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative border border-gray-700">
      <button
        className="absolute top-3 right-3 h-7 w-7 rounded-full border-none bg-gray-700 text-gray-200 text-base font-bold cursor-pointer z-50 hover:bg-gray-600 transition-all shadow-md flex items-center justify-center"
        onClick={() => setIsOpen1(open => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && (
        <ul className="divide-y divide-gray-700/50">
          {movies?.map(movie => (
            <li
              key={movie.imdbID}
              className="grid grid-cols-[auto_1fr] gap-4 text-base items-center p-5 hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <img
                className="w-16 h-20 object-cover rounded-lg shadow-md"
                src={movie.Poster}
                alt={`${movie.Title} poster`}
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-100">{movie.Title}</h3>
                <div className="flex items-center gap-4 mt-1 text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="text-gray-500">🗓</span>
                    <span>{movie.Year}</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));

  return (
    <div className="w-full max-w-2xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative border border-gray-700">
      <button
        className="absolute top-3 right-3 h-7 w-7 rounded-full border-none bg-gray-700 text-gray-200 text-base font-bold cursor-pointer z-50 hover:bg-gray-600 transition-all shadow-md flex items-center justify-center"
        onClick={() => setIsOpen2(open => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <div className="p-6 bg-gradient-to-r from-purple-800/30 to-indigo-900/30 rounded-t-xl shadow-sm">
            <h2 className="uppercase text-sm mb-1 font-bold tracking-wider text-gray-300">
              Movies you watched
            </h2>
            <div className="flex flex-wrap items-center gap-6 text-base font-semibold mt-4">
              <p className="flex items-center gap-2 text-gray-300">
                <span className="text-gray-400">#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-yellow-400">⭐️</span>
                <span>{avgImdbRating.toFixed(1)}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-yellow-300">🌟</span>
                <span>{avgUserRating.toFixed(1)}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-400">⏳</span>
                <span>{avgRuntime.toFixed(0)} min</span>
              </p>
            </div>
          </div>

          <ul className="divide-y divide-gray-700/50 max-h-[calc(100%-9rem)] overflow-auto">
            {watched.map(movie => (
              <li
                key={movie.imdbID}
                className="grid grid-cols-[auto_1fr] gap-4 text-base items-center p-5 hover:bg-gray-700/50 transition-colors"
              >
                <img
                  className="w-16 h-20 object-cover rounded-lg shadow-md"
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">{movie.Title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-sm">
                    <p className="flex items-center gap-1.5">
                      <span className="text-yellow-400">⭐️</span>
                      <span>{movie.imdbRating}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-yellow-300">🌟</span>
                      <span>{movie.userRating}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-blue-400">⏳</span>
                      <span>{movie.runtime} min</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
