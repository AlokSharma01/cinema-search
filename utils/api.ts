// API utility functions for CineSearch

import { OMDBConfig, SearchRequestParams, DetailsRequestParams, MovieSearchResponse, MovieDetailsResponse } from '../types';

export const OMDB_CONFIG: OMDBConfig = {
  apiKey: process.env.NEXT_PUBLIC_OMDB_API_KEY || 'n/a',
  baseUrl: 'https://www.omdbapi.com/'
};

export const buildSearchUrl = (params: SearchRequestParams): string => {
  const searchParams = new URLSearchParams({
    searchText: params.searchText,
    apikey: params.apikey,
    page: params.page?.toString() || '1'
  });

  if (params.type) {
    searchParams.append('type', params.type);
  }
  if (params.year) {
    searchParams.append('y', params.year);
  }

  return `${OMDB_CONFIG.baseUrl}?${searchParams.toString()}`;
};

export const buildDetailsUrl = (params: DetailsRequestParams): string => {
  const searchParams = new URLSearchParams({
    id: params.id,
    apikey: params.apikey
  });

  if (params.plot) {
    searchParams.append('plot', params.plot);
  }

  return `${OMDB_CONFIG.baseUrl}?${searchParams.toString()}`;
};

export const searchMovies = async (params: SearchRequestParams): Promise<MovieSearchResponse> => {
  const url = buildSearchUrl(params);
  const response = await fetch(url);
  return response.json();
};

export const getMovieDetails = async (params: DetailsRequestParams): Promise<MovieDetailsResponse> => {
  const url = buildDetailsUrl(params);
  const response = await fetch(url);
  return response.json();
};

export const validateApiKey = (apiKey: string): boolean => {
  return apiKey !== '' && apiKey !== 'n/a';
};