import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-list-item glass">
      <img 
        className="movie-list-item-img" 
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : '/img/1.jpeg'} 
        alt={movie.Title} 
        loading="lazy"
      />
      <div className="movie-list-item-info">
        <span className="movie-list-item-title">{movie.Title}</span>
        <p className="movie-list-item-desc">
          Released: {movie.Year}
        </p>
        <button className="movie-list-item-button">Watch</button>
      </div>
    </div>
  );
};

export default MovieCard;
