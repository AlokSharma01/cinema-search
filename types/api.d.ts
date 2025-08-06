// API types for the CineSearch application

export interface OMDBConfig {
  apiKey: string;
  baseUrl: string;
}

export interface SearchRequestParams {
  searchText: string; 
  apikey: string;
  page?: number;
  type?: 'movie' | 'series' | 'episode';
  year?: string; 
}

export interface DetailsRequestParams {
  id: string; 
  apikey: string;
  plot?: 'short' | 'full';
}

export interface APIError {
  Response: 'False';
  Error: string;
}

export interface APISuccess<T> extends T {
  Response: 'True';
}

export type APIResponse<T> = APISuccess<T> | APIError;

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
}

export interface SearchState {
  query: string;
  loading: boolean;
  error: string | null;
  movies: any[];
  pagination: PaginationInfo;
  filters: {
    type: string;
    year: string;
  };
} 