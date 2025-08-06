# CineSearch

A modern movie search application built with Next.js, TypeScript, and Tailwind CSS. Search for movies and TV series using the OMDB API with advanced filtering and pagination.

## Features

### 🎬 Search & Display
- **Search Bar**: Type movie or series names to find content
- **Grid Layout**: Beautiful responsive grid displaying 10 results per page
- **Movie Cards**: Each card shows poster, title, type, and release year
- **Pagination**: Navigate through search results with numbered pages

### 🔍 Advanced Filtering
- **Type Filter**: Filter by Movie, Series, or Episode
- **Year Filter**: Filter by release year (last 30 years)
- **Combined Queries**: Use filters alongside search terms

### 📱 Movie Details (Bonus Feature)
- **Modal Popup**: Click any movie card to see detailed information
- **Complete Details**: View plot, cast, director, genre, rating, and more
- **Responsive Design**: Works perfectly on desktop and mobile

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development with comprehensive type declarations
- **Tailwind CSS** - Utility-first CSS framework
- **OMDB API** - Movie database integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cinesearch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get OMDB API Key**
   - Visit [OMDB API](http://www.omdbapi.com/)
   - Sign up for a free API key
   - The free tier allows 1,000 requests per day

4. **Configure API Key**
   - Open `app/page.tsx`
   - Replace `'YOUR_OMDB_API_KEY'` with your actual API key
   - For production, use environment variables

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables (Optional)

For better security, create a `.env.local` file:

```env
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

Then update the API key reference in `app/page.tsx`:

```typescript
const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'YOUR_OMDB_API_KEY';
```

## Usage

1. **Search Movies**: Type a movie or series name in the search bar
2. **Apply Filters**: Use the Type and Year filters to narrow results
3. **Browse Results**: View movies in the responsive grid layout
4. **View Details**: Click any movie card to see detailed information
5. **Navigate Pages**: Use pagination controls to browse more results

## API Integration

The application uses the OMDB API for:
- **Search**: Find movies by title
- **Details**: Get complete movie information
- **Filtering**: Filter by type and year
- **Pagination**: Handle large result sets

## Project Structure

```
cinesearch/
├── app/
│   ├── _components/          # Reusable components
│   │   ├── SearchBar.tsx     # Search input component
│   │   ├── FilterButtons.tsx # Type and year filters
│   │   ├── MovieGrid.tsx     # Movie grid display
│   │   ├── Pagination.tsx    # Page navigation
│   │   └── MovieModal.tsx    # Movie details modal
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── types/                   # TypeScript type declarations
│   ├── movie.ts             # Movie-related types
│   ├── api.ts               # API-related types
│   ├── components.ts        # Component prop types
│   ├── index.ts             # Central type exports
│   └── global.d.ts          # Global type declarations
├── utils/                   # Utility functions
│   └── api.ts               # API utility functions
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## Features in Detail

### Type System
- **Comprehensive Type Declarations**: All components, API responses, and data structures are properly typed
- **Type Safety**: Full TypeScript support with strict type checking
- **Centralized Types**: All types are organized in the `types/` folder for easy maintenance
- **API Integration**: Type-safe API calls with proper error handling

### Search Functionality
- Real-time search with OMDB API
- Debounced input to prevent excessive API calls
- Error handling for failed requests
- Loading states during search

### Filtering System
- Type filter: Movie, Series, Episode, or All
- Year filter: Last 30 years or All years
- Combined filtering with search queries
- Reset filters functionality

### Movie Grid
- Responsive grid layout (1-5 columns based on screen size)
- Movie poster display with fallback for missing images
- Hover effects and smooth transitions
- Click to view detailed information

### Pagination
- Smart page number display (shows 5 pages max)
- Previous/Next navigation arrows
- Current page highlighting
- Disabled states for edge cases

### Movie Details Modal
- Complete movie information display
- Responsive layout for mobile and desktop
- Keyboard navigation (ESC to close)
- Click outside to close functionality

## Styling

The application uses a dark theme with:
- **Background**: Dark gray (#111827)
- **Cards**: Slightly lighter gray (#1f2937)
- **Accents**: Blue (#3b82f6) for highlights
- **Text**: White and gray variations for hierarchy

## Performance

- **Optimized Images**: Proper image handling with fallbacks
- **Lazy Loading**: Components load as needed
- **Efficient API Calls**: Debounced search and smart caching
- **Responsive Design**: Works on all device sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues or questions:
1. Check the [OMDB API documentation](http://www.omdbapi.com/)
2. Review the component structure
3. Check browser console for errors
4. Verify your API key is working

---

**Note**: The OMDB API has rate limits. The free tier allows 1,000 requests per day. For production use, consider upgrading to a paid plan.
