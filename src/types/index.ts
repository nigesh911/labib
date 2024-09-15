export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    release_date?: string;
  }
  
  export interface GenreList {
    [id: number]: string;
  }
  
  export interface WatchedMovies {
    [genre: string]: Movie[];
  }