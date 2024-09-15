import React from 'react';
import { Movie } from '../types';

export interface MovieCardProps {
  movie: Movie;
  onAdd?: () => void;
  isTrending?: boolean;
  fullPoster?: boolean; // Add this line
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAdd, isTrending }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{movie.release_date || 'N/A'}</p>
        {onAdd && (
          <button 
            onClick={onAdd}
            className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1 hover:bg-indigo-700 transition-colors duration-200"
          >
            {isTrending ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            ) : (
              'Add to Watchlist'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;