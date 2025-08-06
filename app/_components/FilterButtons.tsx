'use client';

import { useState, useEffect, useRef } from 'react';
import { FilterButtonsProps, FilterOption } from '../../types';

export default function FilterButtons({ 
  onTypeFilter, 
  onYearFilter, 
  selectedType, 
  selectedYear,
  disabled = false
}: FilterButtonsProps) {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  const typeOptions: FilterOption[] = [
    { value: '', label: 'All Types' },
    { value: 'movie', label: 'Movie' },
    { value: 'series', label: 'Series' },
    { value: 'episode', label: 'Episode' }
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions: FilterOption[] = [
    { value: '', label: 'All Years' },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: (currentYear - i).toString(),
      label: (currentYear - i).toString()
    }))
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setShowTypeDropdown(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTypeLabel = () => {
    const option = typeOptions.find(opt => opt.value === selectedType);
    return option ? option.label : 'Type';
  };

  const getYearLabel = () => {
    const option = yearOptions.find(opt => opt.value === selectedYear);
    return option ? option.label : 'Year of Release';
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
     
      <div className="relative" ref={typeDropdownRef}>
        <button
          onClick={() => !disabled && setShowTypeDropdown(!showTypeDropdown)}
          disabled={disabled}
          className="px-4 py-3 bg-primary border border-secondary rounded-lg text-text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent min-w-[140px] flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <span>{getTypeLabel()}</span>
          <svg 
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${showTypeDropdown ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showTypeDropdown && !disabled && (
          <div className="absolute z-10 mt-2 w-full bg-primary border border-secondary rounded-lg shadow-xl backdrop-blur">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onTypeFilter(option.value);
                  setShowTypeDropdown(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-secondary transition-colors duration-200 ${
                  selectedType === option.value ? 'bg-accent text-text-primary' : 'text-text-secondary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>


      <div className="relative" ref={yearDropdownRef}>
        <button
          onClick={() => !disabled && setShowYearDropdown(!showYearDropdown)}
          disabled={disabled}
          className="px-4 py-3 bg-primary border border-secondary rounded-lg text-text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent min-w-[160px] flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <span>{getYearLabel()}</span>
          <svg 
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${showYearDropdown ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showYearDropdown && !disabled && (
          <div className="absolute z-10 mt-2 w-full bg-primary border border-secondary rounded-lg shadow-xl backdrop-blur max-h-60 overflow-y-auto">
            {yearOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onYearFilter(option.value);
                  setShowYearDropdown(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-secondary transition-colors duration-200 ${
                  selectedYear === option.value ? 'bg-accent text-text-primary' : 'text-text-secondary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 