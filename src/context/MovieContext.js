import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchTrendingMovies, 
  searchMovies, 
  getMovieDetails as fetchMovieDetails, 
  getGenres 
} from '../services/tmdb';

const MovieContext = createContext(null);

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    loadTrendingMovies();
    loadGenres();
    loadFavorites();
  }, []);

  const loadTrendingMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      const data = await fetchTrendingMovies(pageNum);
      if (pageNum === 1) {
        setTrendingMovies(data);
      } else {
        setTrendingMovies(prev => [...prev, ...data]);
      }
      // TMDb trending endpoint doesn't return total_pages, so we'll assume 10
      setTotalPages(10);
    } catch (err) {
      setError('Failed to fetch trending movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const genreList = await getGenres();
      setGenres(genreList);
    } catch (err) {
      console.error('Failed to load genres:', err);
    }
  };

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const searchMoviesByQuery = async (query, pageNum = 1) => {
    if (!query || query.trim() === '') {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, pageNum);
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setPage(pageNum);
      localStorage.setItem('lastSearch', query);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      const lastSearch = localStorage.getItem('lastSearch');
      if (lastSearch) {
        searchMoviesByQuery(lastSearch, nextPage);
      } else {
        loadTrendingMovies(nextPage);
      }
    }
  };

  const getMovieDetails = async (id) => {
    try {
      return await fetchMovieDetails(id);
    } catch (err) {
      setError('Failed to fetch movie details');
      console.error(err);
      throw err;
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === movie.id);
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        newFavorites = [...prevFavorites, movie];
      }
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const filterMovies = (movieList) => {
    return movieList.filter(movie => {
      const matchesGenre = !selectedGenre || movie.genre_ids?.includes(selectedGenre);
      const matchesYear = !selectedYear || movie.release_date?.startsWith(selectedYear);
      const matchesRating = !selectedRating || movie.vote_average >= selectedRating;
      return matchesGenre && matchesYear && matchesRating;
    });
  };

  const value = {
    movies: filterMovies(movies),
    trendingMovies: filterMovies(trendingMovies),
    favorites,
    loading,
    error,
    genres,
    selectedGenre,
    selectedYear,
    selectedRating,
    setSelectedGenre,
    setSelectedYear,
    setSelectedRating,
    searchMovies: searchMoviesByQuery,
    getMovieDetails,
    toggleFavorite,
    loadMore,
    hasMore: page < totalPages
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};