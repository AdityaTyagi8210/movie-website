import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies, onMovieSelect, isGrid = false }) => {
  const listRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(!isGrid);

  const checkScroll = () => {
    if (isGrid) return;
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
    }
  };

  useEffect(() => {
    const current = listRef.current;
    if (current && !isGrid) {
      current.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      // Also check on window resize
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (current && !isGrid) {
        current.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [movies, isGrid]);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e) => {
    if (isGrid) return;
    setIsMouseDown(true);
    setDragged(false);
    if (listRef.current) {
      setStartX(e.pageX - listRef.current.offsetLeft);
      setScrollLeft(listRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (isGrid || !isMouseDown || !listRef.current) return;
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX); 
    
    // threshold before starting actual drag
    if (Math.abs(walk) < 5) return; 
    
    e.preventDefault();
    setDragged(true);
    listRef.current.scrollLeft = scrollLeft - walk * 1.5; // adjust scroll speed
  };

  const handleScrollClick = (direction) => {
    if (isGrid) return;
    if (listRef.current) {
      const { scrollLeft, clientWidth } = listRef.current;
      const scrollAmount = clientWidth * 0.8; 
      listRef.current.scrollTo({
        left: direction === 'right' ? scrollLeft + scrollAmount : scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleClickCapture = (e) => {
    if (dragged) {
      e.stopPropagation();
      e.preventDefault();
      setDragged(false);
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title text-gradient">{title}</h1>
      <div className="movie-list-wrapper">
        {/* Left Arrow */}
        {!isGrid && showLeftArrow && (
          <div className="arrow left-arrow glass" onClick={() => handleScrollClick('left')}>
            <ChevronLeft size={30} />
          </div>
        )}
        
        {/* Scrollable list */}
        <div 
          className={`movie-list ${isMouseDown && !isGrid ? 'active' : ''} ${isGrid ? 'grid-layout' : ''}`} 
          ref={listRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onClickCapture={handleClickCapture}
        >
          {movies.map((movie, index) => (
             <MovieCard key={movie.imdbID || index} movie={movie} onClick={onMovieSelect} />
          ))}
        </div>
        
        {/* Right Arrow */}
        {!isGrid && showRightArrow && (
          <div className="arrow right-arrow glass" onClick={() => handleScrollClick('right')}>
            <ChevronRight size={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
