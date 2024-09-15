import React, { useState, useEffect, useCallback } from 'react';
import { Movie, GenreList } from '../types';
import { searchMovies, getTrendingMovies, getGenres } from '../utils/api';
import MovieCard from './MovieCard';
import type { MovieCardProps } from './MovieCard';
import SearchBar from './SearchBar';
import PortfolioHeader from './PortfolioHeader';

// Add this new type
type MovieWithReview = Movie & { review?: string };

const MoviePortfolio: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<{ [genre: string]: MovieWithReview[] }>({});
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("My Movie Portfolio");
  const [activeTab, setActiveTab] = useState<'watched' | 'trending'>('watched');
  const [genres, setGenres] = useState<GenreList>({});

  useEffect(() => {
    const fetchGenres = async () => {
      const genreList = await getGenres();
      setGenres(genreList);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.length > 2) {
        const results = await searchMovies(searchTerm);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };
    performSearch();
  }, [searchTerm]);

  const addMovie = useCallback((movie: Movie) => {
    setWatchedMovies(prev => {
      const newMovies = { ...prev };
      const genre = movie.genre_ids[0] ? genres[movie.genre_ids[0]] : "Uncategorized";
      if (!newMovies[genre]) {
        newMovies[genre] = [];
      }
      newMovies[genre] = [...newMovies[genre], { ...movie, review: '' }];
      return newMovies;
    });
    setSearchTerm("");
    setIsSearchOpen(false);
  }, [genres]);

  const updateReview = useCallback((movie: MovieWithReview, review: string) => {
    setWatchedMovies(prev => {
      const newMovies = { ...prev };
      Object.keys(newMovies).forEach(genre => {
        newMovies[genre] = newMovies[genre].map(m => 
          m.id === movie.id ? { ...m, review } : m
        );
      });
      return newMovies;
    });
  }, []);

  const sharePortfolio = useCallback(() => {
    // Implement sharing logic for the entire portfolio here
    const portfolioData = {
      name: portfolioName,
      movies: watchedMovies
    };
    console.log('Sharing portfolio:', portfolioData);
    // You can implement actual sharing functionality here, e.g., generating a shareable link
  }, [portfolioName, watchedMovies]);

  // Update MovieCard component to use fullPoster prop
  const MovieCardWithFullPoster = useCallback((props: MovieCardProps) => (
    <MovieCard {...props} fullPoster={true} />
  ), []);

  const shareMovie = useCallback((movie: MovieWithReview) => {
    // Implement sharing logic here
    console.log('Sharing movie:', movie.title);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100"> {/* Changed to min-h-screen and added bg-gray-100 */}
      <div className="container mx-auto p-4">
        <PortfolioHeader portfolioName={portfolioName} setPortfolioName={setPortfolioName} />
        
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchResults={searchResults}
          addMovie={addMovie}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />

        <div className="mt-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 ${activeTab === 'watched' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('watched')}
            >
              Watched
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'trending' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('trending')}
            >
              Trending
            </button>
          </div>
          {activeTab === 'watched' ? (
            Object.entries(watchedMovies).map(([genre, movies]) => (
              <div key={genre} className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-indigo-600">{genre}</h2>
                <div className="flex flex-wrap -mx-2">
                  {movies.map((movie) => (
                    <div key={movie.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                      <MovieCard movie={movie} fullPoster={true} />
                      <textarea
                        className="w-full mt-2 p-2 border rounded bg-white text-gray-800"
                        placeholder="Add your review..."
                        value={movie.review || ''}
                        onChange={(e) => updateReview(movie, e.target.value)}
                      />
                      <button
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => shareMovie(movie)}
                      >
                        Share
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-wrap -mx-2 mt-4">
              {trendingMovies.map((movie) => (
                <div key={movie.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                  <MovieCard movie={movie} onAdd={() => addMovie(movie)} isTrending={true} /> {/* Added isTrending prop */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePortfolio;