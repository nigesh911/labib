import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onAdd?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAdd }) => {
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Watched
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;