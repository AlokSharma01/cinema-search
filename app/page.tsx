'use client';

import { useState, useEffect } from 'react';
import SearchBar from './_components/SearchBar';
import FilterButtons from './_components/FilterButtons';
import MovieGrid from './_components/MovieGrid';
import Pagination from './_components/Pagination';
import MovieModal from './_components/MovieModal';
import { 
  Movie, 
  MovieDetails, 
  MovieSearchResponse, 
  MovieDetailsResponse,
  MovieType,
  SearchParams,
  FilterOptions,
  OMDBConfig
} from '../types';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedType, setSelectedType] = useState<MovieType | ''>('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const OMDB_CONFIG: OMDBConfig = {
    apiKey: process.env.NEXT_PUBLIC_OMDB_API_KEY || 'YOUR_OMDB_API_KEY',
    baseUrl: 'https://www.omdbapi.com/'
  };
  
  const RESULTS_PER_PAGE = 10;

  const searchMovies = async (params: SearchParams) => {
    if (!params.query.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const searchParams = new URLSearchParams({
        s: params.query,
        apikey: OMDB_CONFIG.apiKey,
        page: params.page.toString()
      });

      if (params.type) {
        searchParams.append('type', params.type);
      }
      if (params.year) {
        searchParams.append('y', params.year);
      }

      const response = await fetch(`${OMDB_CONFIG.baseUrl}?${searchParams.toString()}`);
      const data: MovieSearchResponse = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || 'No movies found');
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
      setTotalResults(0);
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (imdbID: string) => {
    try {
      const searchParams = new URLSearchParams({
        i: imdbID,
        apikey: OMDB_CONFIG.apiKey,
        plot: 'full'
      });

      const response = await fetch(`${OMDB_CONFIG.baseUrl}?${searchParams.toString()}`);
      const data: MovieDetailsResponse = await response.json();
      
      if (data.Response === 'True') {
        setSelectedMovie(data);
        setShowModal(true);
      } else {
        setError(data.Error || 'Failed to load movie details');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Failed to load movie details. Please try again.');
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const params: SearchParams = {
        query: searchQuery,
        page: currentPage,
        type: selectedType || undefined,
        year: selectedYear || undefined
      };
      searchMovies(params);
    }
  }, [searchQuery, currentPage, selectedType, selectedYear]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setError(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type as MovieType | '');
    setCurrentPage(1);
    setError(null);
  };

  const handleYearFilter = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
    setError(null);
  };

  const handleMovieClick = (movie: Movie) => {
    getMovieDetails(movie.imdbID);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      
      <header className="bg-primary border-b border-secondary sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 transform rotate-45"></div>
              <h1 className="text-2xl font-bold">CinemaSearch</h1>
            </div>
            
          </div>
        </div>
      </header>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <div className="text-center mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for movies or series"
            className="max-w-2xl mx-auto"
            loading={loading}
            disabled={loading}
          />
        </div>

        
        <div className="flex justify-center mb-8">
          <FilterButtons 
            onTypeFilter={handleTypeFilter}
            onYearFilter={handleYearFilter}
            selectedType={selectedType}
            selectedYear={selectedYear}
            disabled={loading}
          />
        </div>

  
        {error && (
          <div className="text-center py-4">
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 max-w-md mx-auto backdrop-blur">
              <p className="text-red-200">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-red-300 hover:text-red-100 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

       
        {!loading && movies.length > 0 && (
          <>
            <MovieGrid 
              movies={movies} 
              onMovieClick={handleMovieClick}
              loading={loading}
            />
            
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  disabled={loading}
                />
              </div>
            )}
          </>
        )}


        {loading && (
          <MovieGrid 
            movies={[]} 
            onMovieClick={() => {}}
            loading={true}
          />
        )}

        
        {!loading && !error && searchQuery && movies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-text-muted">No movies found for "{searchQuery}"</p>
          </div>
        )}

   
        {!loading && !error && !searchQuery && movies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-text-muted">Search for movies or series to get started</p>
          </div>
        )}
      </main>


      {showModal && selectedMovie && (
        <MovieModal 
          movie={selectedMovie}
          onClose={closeModal}
          isOpen={showModal}
        />
      )}
    </div>
  );
}
