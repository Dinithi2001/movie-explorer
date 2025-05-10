import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import FavoritesList from '../components/FavoritesList';
import { useMovie } from '../context/MovieContext';

const Favorites = () => {
  const { favorites } = useMovie();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Favorites
      </Typography>
      {favorites.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary">
            You haven't added any movies to your favorites yet.
          </Typography>
        </Box>
      ) : (
        <FavoritesList movies={favorites} />
      )}
    </Container>
  );
};

export default Favorites;
