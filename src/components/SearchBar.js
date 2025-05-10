import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMovie } from '../context/MovieContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { searchMovies } = useMovie();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;