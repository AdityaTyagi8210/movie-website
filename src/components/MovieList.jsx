import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const listRef = useRef(null);

  const handleScroll = (direction) => {
    if (listRef.current) {
      const { scrollLeft, clientWidth } = listRef.current;
      const scrollAmount = clientWidth * 0.8; // scroll 80% of width
      listRef.current.scrollTo({
        left: direction === 'right' ? scrollLeft + scrollAmount : scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title text-gradient">{title}</h1>
      <div className="movie-list-wrapper">
        {/* Left Arrow */}
        <div className="arrow left-arrow glass" onClick={() => handleScroll('left')}>
          <ChevronLeft size={30} />
        </div>
        
        {/* Scrollable list */}
        <div className="movie-list" ref={listRef}>
          {movies && movies.map((movie, index) => (
             <MovieCard key={movie.imdbID || index} movie={movie} />
          ))}
        </div>
        
        {/* Right Arrow */}
        <div className="arrow right-arrow glass" onClick={() => handleScroll('right')}>
          <ChevronRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
