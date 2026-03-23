import React from 'react';
import { Star, Play, Info } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick(movie);
  };

  const rating = movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : null;

  return (
    <div className="movie-list-item glass" onClick={handleClick}>
      <img 
        className="movie-list-item-img" 
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : '/img/1.jpeg'} 
        alt={movie.Title} 
        loading="lazy"
        draggable={false}
      />
      {rating && (
        <div className="movie-rating-badge">
          <Star size={12} fill="#fbbf24" stroke="#fbbf24" />
          <span>{rating}</span>
        </div>
      )}
      <div className="movie-list-item-info">
        <span className="movie-list-item-title">{movie.Title}</span>
        <p className="movie-list-item-desc">
          {movie.Year} · {movie.Type === 'series' ? 'Series' : 'Movie'}
        </p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button className="movie-list-item-button" onClick={handleClick} style={{ flex: 1, justifyContent: 'center' }}>
            <Play size={12} style={{ display: 'inline', marginRight: 4 }} />
            Watch
          </button>
          <button className="movie-list-item-button" onClick={handleClick} style={{ flex: 1, justifyContent: 'center', background: 'rgba(255,255,255,0.1)' }}>
            <Info size={12} style={{ display: 'inline', marginRight: 4 }} />
            Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
