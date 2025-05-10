import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { useMovie } from '../context/MovieContext';

const Home = () => {
  const {
    movies,
    trendingMovies,
    loading,
    error,
    genres,
    selectedGenre,
    selectedYear,
    selectedRating,
    setSelectedGenre,
    setSelectedYear,
    setSelectedRating,
    loadMore,
    hasMore,
  } = useMovie();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setSelectedRating(newValue);
  };

  const displayMovies = movies.length > 0 ? movies : trendingMovies;
  const title = movies.length > 0 ? 'Search Results' : 'Trending Movies';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <SearchBar />
      </Box>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                value={selectedGenre || ''}
                label="Genre"
                onChange={handleGenreChange}
              >
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear || ''}
                label="Year"
                onChange={handleYearChange}
              >
                <MenuItem value="">All Years</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom>Minimum Rating</Typography>
            <Slider
              value={selectedRating || 0}
              onChange={handleRatingChange}
              min={0}
              max={5}
              step={0.5}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: 'Any' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
              ]}
            />
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      {loading && displayMovies.length === 0 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : displayMovies.length === 0 ? (
        <Typography align="center">
          No movies found. Try adjusting your filters or search for something else!
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {displayMovies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          {hasMore && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
