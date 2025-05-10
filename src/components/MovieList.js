// src/components/MovieList.js
import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useMovie } from '../context/MovieContext';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <Typography variant="h6" align="center">No movies found</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6">{movie.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.release_date} • Rating: {movie.vote_average}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;