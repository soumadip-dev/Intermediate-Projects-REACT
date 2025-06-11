const Search = () => {
  return (
    <div className="mb-8 relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500 group-focus-within:text-yellow-500 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Find your Pokémon..."
        className="w-full pl-12 pr-5 py-4 text-lg bg-white border-4 border-blue-400 rounded-xl shadow-lg 
                 focus:ring-4 focus:ring-yellow-300 focus:border-red-500 focus:outline-none 
                 transition-all duration-200 placeholder-blue-300
                 hover:border-yellow-400 hover:shadow-xl"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4"></div>
    </div>
  );
};
export default Search;
