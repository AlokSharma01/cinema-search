// Global type declarations for CineSearch

declare global {
  interface Window {
    // Add any global window properties here if needed
  }
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_OMDB_API_KEY?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

export {}; 