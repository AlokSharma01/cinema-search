// Central export file for all types

// Movie types
export * from './movie';

// API types
export * from './api';

// Component types
export * from './components';

// Re-export commonly used types for convenience
export type { Movie, MovieDetails, MovieType } from './movie';
export type { SearchBarProps, FilterButtonsProps, MovieGridProps, PaginationProps, MovieModalProps } from './components';
export type { OMDBConfig, SearchRequestParams, DetailsRequestParams } from './api'; 