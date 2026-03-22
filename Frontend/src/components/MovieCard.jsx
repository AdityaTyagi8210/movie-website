import React from 'react';
import { Star, Play } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick(movie);
  };

  // If rating is not directly on movie via search API, we skip spamming the API 
  // to avoid hitting free-tier rate limits and crashing the app.
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
        <button className="movie-list-item-button" onClick={handleClick}>
          <Play size={12} style={{ display: 'inline', marginRight: 4 }} />
          Watch
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
