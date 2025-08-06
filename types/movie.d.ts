// Movie types for the CineSearch application

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Actors: string;
  Rating: string;
  Released: string;
  Director: string;
  Genre: string;
  Runtime: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailsResponse extends MovieDetails {
  Response: string;
  Error?: string;
}

export type MovieType = 'movie' | 'series' | 'episode';

export interface FilterOptions {
  type: MovieType | '';
  year: string;
}

export interface SearchParams {
  query: string;
  page: number;
  type?: MovieType;
  year?: string;
} 