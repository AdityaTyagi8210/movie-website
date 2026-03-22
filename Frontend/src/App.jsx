import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FeaturedContent from './components/FeaturedContent';
import MovieList from './components/MovieList';
import AuthModal from './components/AuthModal';
import MovieDetailModal from './components/MovieDetailModal';
import './components.css'; 

function App() {
  const [activeMenu, setActiveMenu] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('flakesUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState('login');

  const [movieDataList, setMovieDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenAuth = (view) => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('flakesUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('flakesUser');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'light' ? 'light-mode' : '';
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Helper to fetch movies from backend API (deduplicates by imdbID)
  const fetchMovies = async (query, type = '') => {
    try {
      let url = `/api/movies/search?q=${encodeURIComponent(query)}`;
      if (type) url += `&type=${type}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network error or Rate Limit");
      const data = await response.json();
      if (data.Response === "True") {
        // Deduplicate by imdbID
        const seen = new Set();
        return data.Search.filter(movie => {
          if (seen.has(movie.imdbID)) return false;
          seen.add(movie.imdbID);
          return true;
        });
      }
      throw new Error(data.Error || "API returned False");
    } catch {
      console.warn(`API Limit Reached or Error fetching "${query}". Using Fallback Mock Data.`);
      // Dynamic import to use fallback logic if OMDB key is exhausted
      return import('./data.js').then(module => module.getMockData(10)).catch(() => []);
    }
  };

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      let fetchedLists = [];

      if (activeMenu === 'Home') {
        const [newReleases, popular, action] = await Promise.all([
          fetchMovies("Avatar"),
          fetchMovies("Avengers"),
          fetchMovies("Fast")
        ]);
        fetchedLists = [
          { title: "NEW RELEASES", movies: newReleases },
          { title: "POPULAR", movies: popular },
          { title: "ACTION & ADVENTURE", movies: action }
        ];
      } else if (activeMenu === 'Movies') {
        const [top, comedy, drama] = await Promise.all([
          fetchMovies("Batman", "movie"),
          fetchMovies("Hangover", "movie"),
          fetchMovies("Godfather", "movie")
        ]);
        fetchedLists = [
          { title: "TOP MOVIES", movies: [...top, ...comedy, ...drama], isGrid: true }
        ];
      } else if (activeMenu === 'Series') {
        const [trending, scifi, crime] = await Promise.all([
          fetchMovies("Breaking Bad", "series"),
          fetchMovies("Stranger Things", "series"),
          fetchMovies("Peaky Blinders", "series")
        ]);
        fetchedLists = [
          { title: "TRENDING SERIES", movies: [...trending, ...scifi, ...crime], isGrid: true }
        ];
      } else if (activeMenu === 'Popular') {
        const popular = await fetchMovies("Interstellar");
        fetchedLists = [
          { title: "POPULAR NOW", movies: popular, isGrid: true }
        ];
      } else if (activeMenu === 'Trends') {
        const trends = await fetchMovies("Spider");
        fetchedLists = [
          { title: "TRENDS NOW", movies: trends, isGrid: true }
        ];
      } else if (activeMenu === 'Search') {
        if (searchQuery.trim()) {
          const results = await fetchMovies(searchQuery);
          fetchedLists = [
            { title: `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"`, movies: results, isGrid: true }
          ];
          if (results.length === 0) {
            fetchedLists = [
              { title: `NO RESULTS FOR "${searchQuery.toUpperCase()}"`, movies: [] }
            ];
          }
        }
      }
      
      setMovieDataList(fetchedLists);
      setIsLoading(false);
    };

    loadData();
  }, [activeMenu, searchQuery]);

  return (
    <div className="app-container">
      <Navbar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        onSearch={handleSearch} 
        theme={theme}
        toggleTheme={toggleTheme}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialView={authView}
        onLoginSuccess={handleLoginSuccess}
      />
      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
      <div className="main-content">
        <FeaturedContent onMovieSelect={setSelectedMovie} />
        
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="content-rows">
            {movieDataList.map((list, index) => (
               <MovieList key={index} title={list.title} movies={list.movies} onMovieSelect={setSelectedMovie} isGrid={list.isGrid} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
