import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMovie } from '../context/MovieContext';

const FavoriteButton = ({ movie }) => {
  // Safely destructure context with defaults
  const { favorites = [], toggleFavorite = () => {} } = useMovie?.() || {};
  
  // Return null if movie data is invalid
  if (!movie?.id) {
    console.warn('FavoriteButton: Invalid movie prop');
    return null;
  }

  const isFavorite = favorites.some(fav => fav?.id === movie.id);

  const handleClick = () => {
    try {
      toggleFavorite(movie);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
      <IconButton
        onClick={handleClick}
        color={isFavorite ? 'error' : 'default'}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

FavoriteButton.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // Add other required movie properties here
  })
};

FavoriteButton.defaultProps = {
  movie: null
};

export default FavoriteButton;