import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { getMovieById } from '../api/movies';

// Featured movies pool - rotate through these
const FEATURED_IDS = [
  'tt1375666', // Inception
  'tt0816692', // Interstellar
  'tt0468569', // The Dark Knight
  'tt4154796', // Avengers: Endgame
  'tt0110912', // Pulp Fiction
];

const FeaturedContent = ({ onMovieSelect }) => {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadFeatured = async () => {
      if (mounted) setLoading(true);
      const randomId = FEATURED_IDS[Math.floor(Math.random() * FEATURED_IDS.length)];
      try {
        const data = await getMovieById(randomId);
        if (mounted && data && data.Response !== 'False') {
          setFeatured(data);
        }
      } catch {
        // silent fail
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadFeatured();
    return () => { mounted = false; };
  }, []);

  const bgImage = featured?.Poster && featured.Poster !== 'N/A'
    ? featured.Poster
    : '/img/f-1.jpg';

  // Use a large backdrop-style image for featured
  const backdropStyle = {
    background: `linear-gradient(to right, rgba(0,0,0,0.85) 40%, transparent 100%),
                 linear-gradient(to top, var(--bg-primary) 0%, transparent 30%),
                 url('${bgImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
  };

  if (loading) {
    return (
      <div
        className="featured-content animate-fade-in"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, var(--bg-primary) 100%), url('/img/f-1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="featured-skeleton">
          <div className="featured-skeleton-title" />
          <div className="featured-skeleton-desc" />
          <div className="featured-skeleton-btns" />
        </div>
      </div>
    );
  }

  if (!featured) {
    return (
      <div
        className="featured-content animate-fade-in"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, var(--bg-primary) 100%), url('/img/f-1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img className="featured-title" src="/img/f-t-1.png" alt="Featured Title" />
        <p className="featured-desc glass">
          Experience the ultimate cinematic journey. Watch the latest blockbusters and timeless classics.
        </p>
        <div className="featured-buttons">
          <button className="featured-button">
            <Play size={16} fill="white" /> WATCH NOW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-content animate-fade-in" style={backdropStyle}>
      {/* Badges */}
      <div className="featured-badges">
        {featured.Rated && featured.Rated !== 'N/A' && (
          <span className="featured-badge">{featured.Rated}</span>
        )}
        {featured.Year && (
          <span className="featured-badge">{featured.Year}</span>
        )}
        {featured.Runtime && featured.Runtime !== 'N/A' && (
          <span className="featured-badge">{featured.Runtime}</span>
        )}
      </div>

      {/* Title */}
      <h2 className="featured-movie-title">{featured.Title}</h2>

      {/* Genre */}
      {featured.Genre && featured.Genre !== 'N/A' && (
        <p className="featured-genre">{featured.Genre}</p>
      )}

      {/* Rating + Score */}
      {featured.imdbRating && featured.imdbRating !== 'N/A' && (
        <div className="featured-rating">
          <span className="featured-star">★</span>
          <span className="featured-rating-val">{featured.imdbRating}</span>
          <span className="featured-rating-max">/10</span>
          {featured.imdbVotes && featured.imdbVotes !== 'N/A' && (
            <span className="featured-votes">({featured.imdbVotes} votes)</span>
          )}
        </div>
      )}

      {/* Plot */}
      {featured.Plot && featured.Plot !== 'N/A' && (
        <p className="featured-desc glass">{featured.Plot}</p>
      )}

      {/* Cast */}
      {featured.Actors && featured.Actors !== 'N/A' && (
        <p className="featured-cast">
          <span className="featured-cast-label">Starring: </span>
          {featured.Actors}
        </p>
      )}

      {/* Buttons */}
      <div className="featured-buttons">
        <button
          className="featured-button"
          onClick={() => onMovieSelect && onMovieSelect(featured)}
        >
          <Play size={16} fill="white" /> WATCH NOW
        </button>
        <button
          className="featured-button featured-info-btn glass"
          onClick={() => onMovieSelect && onMovieSelect(featured)}
        >
          <Info size={16} /> MORE INFO
        </button>
      </div>
    </div>
  );
};

export default FeaturedContent;
