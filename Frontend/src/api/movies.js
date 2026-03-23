// Central API helper for movie-related requests
const BASE = 'https://movie-website-1-1.onrender.com/api/movies';

export async function searchMovies(query) {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  if (data.Response === 'True') {
    // Deduplicate by imdbID
    const seen = new Set();
    return data.Search.filter(m => {
      if (seen.has(m.imdbID)) return false;
      seen.add(m.imdbID);
      return true;
    });
  }
  return [];
}

export async function getMovieById(imdbID) {
  const res = await fetch(`${BASE}/${imdbID}`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
