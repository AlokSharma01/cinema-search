'use client';

import { Movie, MovieGridProps } from '../../types';

export default function MovieGrid({ movies, onMovieClick, loading = false, emptyMessage = "No movies found" }: MovieGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="bg-primary rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-[2/3] bg-secondary"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-secondary rounded"></div>
              <div className="h-3 bg-secondary rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-text-muted text-lg mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-text-muted/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6c0 1.482-.564 2.833-1.5 3.854" />
          </svg>
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          onClick={() => onMovieClick(movie)}
          className="movie-card bg-primary rounded-lg overflow-hidden cursor-pointer hover:bg-secondary transition-colors duration-300 group"
        >
          <div className="relative aspect-[2/3] overflow-hidden">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Use a simple SVG data URL instead of a non-existent file
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%234a3434'/%3E%3Ctext x='100' y='150' text-anchor='middle' fill='%23b0b0b0' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
                  target.onerror = null; // Prevent infinite loop
                }}
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-text-muted" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="p-4">
            <h3 className="text-text-primary font-semibold text-sm mb-1 line-clamp-2 group-hover:text-accent transition-colors duration-200">
              {movie.Title}
            </h3>
            <p className="text-text-muted text-xs">
              {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}, {movie.Year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 