import axios from 'axios';

const API_KEY = 'e4df77a81416d46ee4f7181b19c4f8f4';
const BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance with default headers
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  params: {
    api_key: API_KEY
  }
});

/**
 * Fetches trending movies
 * @param {number} page - Page number
 * @returns {Promise<Array>} - Array of trending movies
 */
export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get('/trending/movie/week', {
      params: { page }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

/**
 * Searches for movies
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @returns {Promise<Object>} - Search results with pagination info
 */
export const searchMovies = async (query, page = 1) => {
  if (!query || typeof query !== 'string') {
    throw new Error('Invalid search query');
  }

  try {
    const response = await api.get('/search/movie', {
      params: {
        query: encodeURIComponent(query),
        page,
        include_adult: false
      }
    });
    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies. Please try again later.');
  }
};

/**
 * Gets detailed information about a movie
 * @param {number} id - Movie ID
 * @returns {Promise<Object>} - Detailed movie information
 */
export const getMovieDetails = async (id) => {
  if (!id || isNaN(id)) {
    throw new Error('Invalid movie ID');
  }

  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,similar'
      }
    });

    const { data } = response;
    
    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      release_date: data.release_date,
      runtime: data.runtime,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      genres: data.genres || [],
      videos: data.videos?.results || [],
      cast: data.credits?.cast || [],
      similar: data.similar?.results || []
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Gets list of movie genres
 * @returns {Promise<Array>} - List of genre objects
 */
export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres || [];
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};
