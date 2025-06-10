const Search = () => {
  return (
    <div className="mb-8 relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-400 group-focus-within:text-indigo-600 transition-colors"
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
        className="w-full pl-12 pr-5 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm 
                 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none 
                 transition-all duration-200 placeholder-gray-400
                 hover:border-indigo-300 hover:shadow-md"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded">
          ⌘K
        </span>
      </div>
    </div>
  );
};
export default Search;
