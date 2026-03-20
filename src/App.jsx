import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FeaturedContent from './components/FeaturedContent';
import MovieList from './components/MovieList';
import AuthModal from './components/AuthModal';
import { getMockData } from './data';
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

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      let fetchedLists = [];
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      if (activeMenu === 'Home') {
        fetchedLists = [
          { title: "NEW RELEASES", movies: getMockData(6) },
          { title: "POPULAR", movies: getMockData(6) },
          { title: "ACTION & ADVENTURE", movies: getMockData(6) }
        ];
      } else if (activeMenu === 'Movies') {
        fetchedLists = [
          { title: "TOP MOVIES", movies: getMockData(6) },
          { title: "COMEDY", movies: getMockData(6) },
          { title: "DRAMA", movies: getMockData(6) }
        ];
      } else if (activeMenu === 'Series') {
        fetchedLists = [
          { title: "TRENDING SERIES", movies: getMockData(6) },
          { title: "SCI-FI", movies: getMockData(6) },
          { title: "CRIME & THRILLER", movies: getMockData(6) }
        ];
      } else if (activeMenu === 'Popular' || activeMenu === 'Trends') {
        fetchedLists = [
          { title: `${activeMenu.toUpperCase()} NOW`, movies: getMockData(6) }
        ];
      } else if (activeMenu === 'Search') {
        fetchedLists = [
          { title: `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"`, movies: getMockData(4) }
        ];
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
      <div className="main-content">
        <FeaturedContent />
        
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="content-rows">
            {movieDataList.map((list, index) => (
               <MovieList key={index} title={list.title} movies={list.movies} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
