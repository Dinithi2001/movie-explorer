import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
} from '@mui/material';
import FavoriteButton from './FavoriteButton';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const rating = movie.vote_average / 2; // Convert to 5-star scale

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="400"
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-poster.jpg'
        }
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" component="h2" gutterBottom>
            {movie.title}
          </Typography>
          <FavoriteButton movie={movie} onClick={(e) => e.stopPropagation()} />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {movie.release_date?.split('-')[0] || 'N/A'}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({rating.toFixed(1)})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
