import React, { useState, useEffect } from 'react';
import { X, Star, Clock, Calendar, Film, Globe, Award } from 'lucide-react';
import { getMovieById } from '../api/movies';

const MovieDetailModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!movie) return;

    const fetchDetails = async () => {
      // If the movie already has full details (e.g. from featured), use them directly
      if (movie.Plot && movie.Plot !== 'N/A') {
        if (mounted) {
          setDetails(movie);
          setLoading(false);
        }
        return;
      }

      if (mounted) setLoading(true);
      try {
        const data = await getMovieById(movie.imdbID);
        if (mounted && data && data.Response !== 'False') {
          setDetails(data);
        }
      } catch {
        // fail silently
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDetails();
    return () => { mounted = false; };
  }, [movie]);

  if (!movie) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const poster = details?.Poster && details.Poster !== 'N/A'
    ? details.Poster
    : movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : '/img/1.jpeg';

  return (
    <div className="detail-overlay" onClick={handleOverlayClick}>
      <div className="detail-modal glass">
        <button className="detail-close" onClick={onClose}>
          <X size={22} />
        </button>

        {loading ? (
          <div className="detail-loading">
            <div className="loader" />
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Loading details...</p>
          </div>
        ) : (
          <div className="detail-content">
            {/* Left: Poster */}
            <div className="detail-poster-wrap">
              <img
                src={poster}
                alt={details?.Title || movie.Title}
                className="detail-poster"
              />
              {details?.imdbRating && details.imdbRating !== 'N/A' && (
                <div className="detail-rating-badge">
                  <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                  <span>{details.imdbRating}/10</span>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="detail-info">
              <h2 className="detail-title text-gradient">{details?.Title || movie.Title}</h2>

              {/* Meta row */}
              <div className="detail-meta">
                {details?.Year && (
                  <span className="detail-meta-item">
                    <Calendar size={13} /> {details.Year}
                  </span>
                )}
                {details?.Runtime && details.Runtime !== 'N/A' && (
                  <span className="detail-meta-item">
                    <Clock size={13} /> {details.Runtime}
                  </span>
                )}
                {details?.Rated && details.Rated !== 'N/A' && (
                  <span className="detail-meta-badge">{details.Rated}</span>
                )}
                {details?.Type && (
                  <span className="detail-meta-badge">
                    {details.Type === 'series' ? 'Series' : 'Movie'}
                  </span>
                )}
              </div>

              {/* Genre */}
              {details?.Genre && details.Genre !== 'N/A' && (
                <div className="detail-genres">
                  {details.Genre.split(',').map(g => (
                    <span key={g.trim()} className="detail-genre-tag">{g.trim()}</span>
                  ))}
                </div>
              )}

              {/* Plot */}
              {details?.Plot && details.Plot !== 'N/A' && (
                <p className="detail-plot">{details.Plot}</p>
              )}

              {/* Cast & Crew */}
              <div className="detail-crew">
                {details?.Director && details.Director !== 'N/A' && (
                  <div className="detail-crew-row">
                    <Film size={14} />
                    <span className="detail-crew-label">Director:</span>
                    <span className="detail-crew-val">{details.Director}</span>
                  </div>
                )}
                {details?.Actors && details.Actors !== 'N/A' && (
                  <div className="detail-crew-row">
                    <Star size={14} />
                    <span className="detail-crew-label">Cast:</span>
                    <span className="detail-crew-val">{details.Actors}</span>
                  </div>
                )}
                {details?.Language && details.Language !== 'N/A' && (
                  <div className="detail-crew-row">
                    <Globe size={14} />
                    <span className="detail-crew-label">Language:</span>
                    <span className="detail-crew-val">{details.Language}</span>
                  </div>
                )}
                {details?.Awards && details.Awards !== 'N/A' && (
                  <div className="detail-crew-row">
                    <Award size={14} />
                    <span className="detail-crew-label">Awards:</span>
                    <span className="detail-crew-val">{details.Awards}</span>
                  </div>
                )}
              </div>

              {/* Ratings from various sources */}
              {details?.Ratings && details.Ratings.length > 0 && (
                <div className="detail-ratings">
                  {details.Ratings.map(r => (
                    <div key={r.Source} className="detail-rating-source glass">
                      <span className="detail-source-name">{r.Source.replace('Internet Movie Database', 'IMDb')}</span>
                      <span className="detail-source-val">{r.Value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Watch button */}
              <a
                href={`https://www.imdb.com/title/${details?.imdbID || movie.imdbID}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-watch-btn featured-button"
              >
                View on IMDb
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailModal;
