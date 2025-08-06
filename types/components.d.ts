// Component types for the CineSearch application

import { Movie, MovieDetails } from './movie';

// SearchBar Component
export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

// FilterButtons Component
export interface FilterButtonsProps {
  onTypeFilter: (type: string) => void;
  onYearFilter: (year: string) => void;
  selectedType: string;
  selectedYear: string;
  disabled?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
}

// MovieGrid Component
export interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  loading?: boolean;
  emptyMessage?: string;
}

// Pagination Component
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

// MovieModal Component
export interface MovieModalProps {
  movie: MovieDetails;
  onClose: () => void;
  isOpen: boolean;
}

// Layout and UI Types
export interface LayoutProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

// Form Types
export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface InputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// Dropdown Types
export interface DropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Image Types
export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
} 