export const mockMovies = [
  { imdbID: '1', Title: 'Her', Year: '2013', Poster: '/img/1.jpeg' },
  { imdbID: '2', Title: 'Star Wars', Year: '1977', Poster: '/img/2.jpeg' },
  { imdbID: '3', Title: 'Storm', Year: '2001', Poster: '/img/3.jpg' },
  { imdbID: '4', Title: '1917', Year: '2019', Poster: '/img/4.jpg' },
  { imdbID: '5', Title: 'Avengers', Year: '2012', Poster: '/img/5.jpg' },
  { imdbID: '6', Title: 'Interstellar', Year: '2014', Poster: '/img/6.jpg' },
  { imdbID: '7', Title: 'Inception', Year: '2010', Poster: '/img/7.jpg' },
  { imdbID: '8', Title: 'The Matrix', Year: '1999', Poster: '/img/8.jpg' },
  { imdbID: '9', Title: 'Parasite', Year: '2019', Poster: '/img/9.jpg' },
  { imdbID: '10', Title: 'Joker', Year: '2019', Poster: '/img/10.jpg' },
  { imdbID: '11', Title: 'Batman', Year: '2022', Poster: '/img/11.jpg' },
  { imdbID: '12', Title: 'Dune', Year: '2021', Poster: '/img/12.jpg' },
];

export const getMockData = (count = 6) => {
  // Return random assortment
  const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
