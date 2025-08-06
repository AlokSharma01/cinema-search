'use client';

import { useEffect } from 'react';
import { MovieDetails, MovieModalProps } from '../../types';

export default function MovieModal({ movie, onClose, isOpen }: MovieModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-primary/95 border border-secondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-text-primary">{movie.Title}</h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Poster */}
            <div className="md:col-span-1">
              {movie.Poster && movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-secondary rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-16 h-16 text-text-muted" 
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
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-4">
              {/* Basic Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span className="bg-accent px-2 py-1 rounded text-text-primary text-xs">
                    {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
                  </span>
                  <span>{movie.Year}</span>
                  {movie.Runtime && <span>{movie.Runtime}</span>}
                </div>
                
                {movie.Rating && (
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-text-primary font-semibold">{movie.Rating}</span>
                  </div>
                )}
              </div>

              {/* Plot */}
              {movie.Plot && (
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Plot</h3>
                  <p className="text-text-secondary leading-relaxed">{movie.Plot}</p>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movie.Director && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-muted mb-1">Director</h4>
                    <p className="text-text-primary">{movie.Director}</p>
                  </div>
                )}

                {movie.Actors && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-muted mb-1">Cast</h4>
                    <p className="text-text-primary">{movie.Actors}</p>
                  </div>
                )}

                {movie.Genre && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-muted mb-1">Genre</h4>
                    <p className="text-text-primary">{movie.Genre}</p>
                  </div>
                )}

                {movie.Released && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-muted mb-1">Released</h4>
                    <p className="text-text-primary">{movie.Released}</p>
                  </div>
                )}

                {movie.Language && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-muted mb-1">Language</h4>
                    <p className="text-text-primary">{movie.Language}</p>
                  </div>
                )}

                {movie.Country && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-muted mb-1">Country</h4>
                    <p className="text-text-primary">{movie.Country}</p>
                  </div>
                )}

                {movie.Awards && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-muted mb-1">Awards</h4>
                    <p className="text-text-primary">{movie.Awards}</p>
                  </div>
                )}

                {movie.imdbRating && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-muted mb-1">IMDB Rating</h4>
                    <p className="text-text-primary">{movie.imdbRating}/10</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 