import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Movie } from '../types';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Movie[];
  addMovie: (movie: Movie) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  addMovie,
  isSearchOpen,
  setIsSearchOpen
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearchOpen(true)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {isSearchOpen && searchResults.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => addMovie(movie)}
            >
              <span>{movie.title}</span>
              <SearchIcon className="w-4 h-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;