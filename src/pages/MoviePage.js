import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import MovieDetails from '../components/MovieDetails';
import { useMovie } from '../context/MovieContext';

const MoviePage = () => {
  const { id } = useParams();
  const { getMovieDetails } = useMovie();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, getMovieDetails]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {movie && <MovieDetails movie={movie} />}
    </Container>
  );
};

export default MoviePage;
