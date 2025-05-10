import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Chip,
  Rating,
  Divider,
  Paper,
} from '@mui/material';
import FavoriteButton from './FavoriteButton';
import { useMovie } from '../context/MovieContext';

const MovieDetails = ({ movie }) => {
  const { toggleFavorite, favorites } = useMovie();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const trailer = movie.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{ height: '100%', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {movie.release_date?.split('-')[0]} • {movie.runtime} min
                </Typography>
              </Box>
              <FavoriteButton movie={movie} />
            </Box>

            <Box display="flex" alignItems="center" gap={1} my={2}>
              <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({movie.vote_average.toFixed(1)}/10)
              </Typography>
            </Box>

            <Box my={2}>
              {movie.genres?.map(genre => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            {movie.credits?.cast && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Top Cast
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                  {movie.credits.cast.slice(0, 6).map(actor => (
                    <Paper key={actor.id} sx={{ p: 1, minWidth: 120 }}>
                      <Typography variant="subtitle2" noWrap>
                        {actor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {actor.character}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </>
            )}

            {trailer && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Trailer
                </Typography>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              </>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MovieDetails;